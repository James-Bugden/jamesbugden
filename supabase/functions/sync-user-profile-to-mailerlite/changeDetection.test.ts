import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { diffWatchedFields, type ProfileRow } from "./changeDetection.ts";

const base: ProfileRow = {
  user_id: "u-1",
  target_role: "Backend Engineer",
  target_industry: "fintech",
  job_search_stage: "applying",
  tuesday_email_opted_in: false,
};

Deno.test("diffWatchedFields: null when no watched field changed", () => {
  const next: ProfileRow = { ...base };
  assertEquals(diffWatchedFields(base, next), null);
});

Deno.test("diffWatchedFields: null when only unwatched fields changed", () => {
  const next: ProfileRow = {
    ...base,
    daily_task_completed_at: "2026-04-27T05:00:00Z",
    updated_at: "2026-04-27T05:00:00Z",
    career_phase: "applying",
  };
  assertEquals(diffWatchedFields(base, next), null);
});

Deno.test("diffWatchedFields: returns subset when one watched field changed", () => {
  const next: ProfileRow = { ...base, target_role: "Staff Engineer" };
  assertEquals(diffWatchedFields(base, next), { target_role: "Staff Engineer" });
});

Deno.test("diffWatchedFields: returns all four when each watched field changed", () => {
  const next: ProfileRow = {
    ...base,
    target_role: "Founding Engineer",
    target_industry: "edtech",
    job_search_stage: "negotiating",
    tuesday_email_opted_in: true,
  };
  assertEquals(diffWatchedFields(base, next), {
    target_role: "Founding Engineer",
    target_industry: "edtech",
    job_search_stage: "negotiating",
    tuesday_email_opted_in: true,
  });
});

Deno.test("diffWatchedFields: full set when old_record is null (INSERT)", () => {
  const next: ProfileRow = { ...base, tuesday_email_opted_in: true };
  assertEquals(diffWatchedFields(null, next), {
    target_role: "Backend Engineer",
    target_industry: "fintech",
    job_search_stage: "applying",
    tuesday_email_opted_in: true,
  });
});

Deno.test("diffWatchedFields: includes a watched field that flipped to null", () => {
  const next: ProfileRow = { ...base, target_role: null };
  assertEquals(diffWatchedFields(base, next), { target_role: null });
});

Deno.test("diffWatchedFields: false-vs-false on tuesday_email_opted_in is not a change", () => {
  const next: ProfileRow = { ...base, tuesday_email_opted_in: false };
  assertEquals(diffWatchedFields(base, next), null);
});

Deno.test("diffWatchedFields: true-vs-false on tuesday_email_opted_in is a change", () => {
  const next: ProfileRow = { ...base, tuesday_email_opted_in: true };
  assertEquals(diffWatchedFields(base, next), { tuesday_email_opted_in: true });
});
