// HIR-68: bounded retry around a single MailerLite subscriber upsert.
// Acceptance criterion 4: "A failed MailerLite API call (e.g. invalid token)
// is logged and surfaced; the function retries with backoff up to 3 times
// before giving up."
//
// Retry on 429 + 5xx (transient). Fail fast on every other 4xx — those are
// shape/validation errors that more retries won't fix.

const MAILERLITE_URL = "https://connect.mailerlite.com/api/subscribers";
const DEFAULT_BACKOFF_MS = [200, 500, 1500];
const MAX_ATTEMPTS = 3;

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>;
export type Sleeper = (ms: number) => Promise<void>;

export interface CallOpts {
  apiKey: string;
  email: string;
  fields: Record<string, string | boolean | null>;
  fetcher?: Fetcher;
  sleep?: Sleeper;
  backoffMs?: number[];
}

export interface CallResult {
  ok: boolean;
  attempts: number;
  lastStatus: number;
  lastBody?: unknown;
  lastError?: string;
}

function isRetryable(status: number): boolean {
  return status === 429 || (status >= 500 && status <= 599);
}

const realSleep: Sleeper = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const realFetcher: Fetcher = (url, init) => fetch(url, init);

export async function callMailerLiteWithRetry(opts: CallOpts): Promise<CallResult> {
  const fetcher = opts.fetcher ?? realFetcher;
  const sleep = opts.sleep ?? realSleep;
  const backoff = opts.backoffMs ?? DEFAULT_BACKOFF_MS;

  // Deliberately omit the `groups` field — preserves group membership and
  // honours HIR-68 acceptance criterion 3 (do not modify unrelated fields).
  const body = JSON.stringify({ email: opts.email, fields: opts.fields });
  const init: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body,
  };

  let lastStatus = 0;
  let lastBody: unknown = undefined;
  let lastError: string | undefined = undefined;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    let res: Response;
    try {
      res = await fetcher(MAILERLITE_URL, init);
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      lastStatus = 0;
      if (attempt < MAX_ATTEMPTS) {
        await sleep(backoff[attempt - 1] ?? backoff[backoff.length - 1]);
        continue;
      }
      return { ok: false, attempts: attempt, lastStatus: 0, lastError };
    }

    lastStatus = res.status;
    try {
      lastBody = await res.json();
    } catch (_) {
      lastBody = undefined;
    }

    if (res.ok) {
      return { ok: true, attempts: attempt, lastStatus, lastBody };
    }

    if (!isRetryable(res.status)) {
      return { ok: false, attempts: attempt, lastStatus, lastBody };
    }

    if (attempt < MAX_ATTEMPTS) {
      await sleep(backoff[attempt - 1] ?? backoff[backoff.length - 1]);
    }
  }

  return { ok: false, attempts: MAX_ATTEMPTS, lastStatus, lastBody, lastError };
}
