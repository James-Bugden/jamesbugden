// HIR-68: detect which of the four watched columns changed between a
// Supabase database webhook's `old_record` and `record` payloads. Returns
// null when nothing watched changed (so we can short-circuit before any
// MailerLite call) and otherwise the exact subset to send to MailerLite —
// preserves acceptance criterion 3 (do not modify fields that did not
// change in profiles).

export const WATCHED_COLUMNS = [
  "target_role",
  "target_industry",
  "job_search_stage",
  "tuesday_email_opted_in",
] as const;

export type WatchedColumn = (typeof WATCHED_COLUMNS)[number];

// Loose row shape — the webhook payload is JSON, may include columns we
// don't care about, and may have nullable values for any of the four.
export interface ProfileRow {
  user_id?: string;
  target_role?: string | null;
  target_industry?: string | null;
  job_search_stage?: string | null;
  tuesday_email_opted_in?: boolean | null;
  // Anything else (career_phase, daily_task_completed_at, updated_at, …)
  // is intentionally ignored.
  [key: string]: unknown;
}

export type WatchedDiff = Partial<Record<WatchedColumn, string | boolean | null>>;

// Guard the value we'll send to MailerLite. The three text columns must be
// string-or-null; tuesday_email_opted_in must be boolean-or-null. Anything
// else (a future migration changes a column to JSON, an upstream caller
// passes a number) gets coerced to null rather than smuggled into the
// MailerLite custom field as an unexpected JSON value.
function coerce(col: WatchedColumn, raw: unknown): string | boolean | null {
  if (raw === null || raw === undefined) return null;
  if (col === "tuesday_email_opted_in") {
    return typeof raw === "boolean" ? raw : null;
  }
  return typeof raw === "string" ? raw : null;
}

export function diffWatchedFields(
  oldRecord: ProfileRow | null | undefined,
  newRecord: ProfileRow,
): WatchedDiff | null {
  const diff: WatchedDiff = {};
  let changed = false;

  for (const col of WATCHED_COLUMNS) {
    const next = coerce(col, newRecord[col]);
    const prev = oldRecord ? coerce(col, oldRecord[col]) : null;

    // INSERT (no old_record): emit any non-null current value as "changed"
    // so the first sync lands the present state. If a column is null on
    // INSERT we leave it out — sending `null` would clobber whatever the
    // user already had in MailerLite.
    if (!oldRecord) {
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
