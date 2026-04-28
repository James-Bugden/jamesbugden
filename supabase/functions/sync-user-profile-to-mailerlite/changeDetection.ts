// HIR-146: detect which of the five profile-identity columns changed between
// a Supabase database webhook's old_record and record payloads. Returns null
// when nothing watched changed (so we can skip any MailerLite call) and
// otherwise the exact subset to send — avoids clobbering unchanged fields.

export const WATCHED_COLUMNS = [
  "full_name",
  "job_title",
  "company",
  "country",
  "linkedin_url",
] as const;

export type WatchedColumn = (typeof WATCHED_COLUMNS)[number];

export interface ProfileRow {
  user_id?: string;
  email?: string | null;
  full_name?: string | null;
  job_title?: string | null;
  company?: string | null;
  country?: string | null;
  linkedin_url?: string | null;
  [key: string]: unknown;
}

export type WatchedDiff = Partial<Record<WatchedColumn, string | null>>;

function coerce(raw: unknown): string | null {
  if (raw === null || raw === undefined) return null;
  // Non-string primitives (number, boolean) are treated as absent rather than
  // coerced to string, so a future schema change can't smuggle unexpected types
  // into MailerLite custom fields.
  return typeof raw === "string" ? raw : null;
}

export function diffWatchedFields(
  oldRecord: ProfileRow | null | undefined,
  newRecord: ProfileRow,
): WatchedDiff | null {
  const diff: WatchedDiff = {};
  let changed = false;

  for (const col of WATCHED_COLUMNS) {
    const next = coerce(newRecord[col]);
    const prev = oldRecord ? coerce(oldRecord[col]) : null;

    if (!oldRecord) {
      // INSERT path: emit any non-null present value.
      if (next !== null) {
        diff[col] = next;
        changed = true;
      }
      continue;
    }

    if (next !== prev) {
      diff[col] = next;
      changed = true;
    }
  }

  return changed ? diff : null;
}
