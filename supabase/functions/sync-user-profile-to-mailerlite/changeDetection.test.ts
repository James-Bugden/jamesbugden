import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { diffWatchedFields, type ProfileRow } from "./changeDetection.ts";

const base: ProfileRow = {
  user_id: "u-1",
  email: "user@example.com",
  full_name: "Jane Doe",
  job_title: "Software Engineer",
  company: "Acme Corp",
  country: "Taiwan",
  linkedin_url: "https://linkedin.com/in/janedoe",
};

Deno.test("diffWatchedFields: null when no watched field changed", () => {
  assertEquals(diffWatchedFields(base, { ...base }), null);
});

Deno.test("diffWatchedFields: null when only unwatched fields changed", () => {
  const next: ProfileRow = {
    ...base,
    updated_at: "2026-04-28T05:00:00Z",
    job_search_stage: "applying",
    tuesday_email_opted_in: true,
  };
  assertEquals(diffWatchedFields(base, next), null);
});

Deno.test("diffWatchedFields: returns subset when one watched field changed", () => {
  const next: ProfileRow = { ...base, job_title: "Staff Engineer" };
  assertEquals(diffWatchedFields(base, next), { job_title: "Staff Engineer" });
});

Deno.test("diffWatchedFields: returns all five when each watched field changed", () => {
  const next: ProfileRow = {
    ...base,
    full_name: "John Doe",
    job_title: "CTO",
    company: "StartupCo",
    country: "Singapore",
    linkedin_url: "https://linkedin.com/in/johndoe",
  };
  assertEquals(diffWatchedFields(base, next), {
    full_name: "John Doe",
    job_title: "CTO",
    company: "StartupCo",
    country: "Singapore",
    linkedin_url: "https://linkedin.com/in/johndoe",
  });
});

Deno.test("diffWatchedFields: emits non-null fields on INSERT (no old_record)", () => {
  const next: ProfileRow = {
    user_id: "u-2",
    email: "new@example.com",
    full_name: "New User",
    job_title: "Recruiter",
    company: null,
    country: null,
    linkedin_url: null,
  };
  assertEquals(diffWatchedFields(null, next), {
    full_name: "New User",
    job_title: "Recruiter",
  });
});

Deno.test("diffWatchedFields: empty INSERT with all null watched fields → null", () => {
  const next: ProfileRow = {
    user_id: "u-3",
    email: "empty@example.com",
    full_name: null,
    job_title: null,
    company: null,
    country: null,
    linkedin_url: null,
  };
  assertEquals(diffWatchedFields(null, next), null);
});

Deno.test("diffWatchedFields: includes watched field flipped to null", () => {
  const next: ProfileRow = { ...base, company: null };
  assertEquals(diffWatchedFields(base, next), { company: null });
});

Deno.test("diffWatchedFields: non-string value coerced to null", () => {
  const next: ProfileRow = { ...base, linkedin_url: 12345 as unknown as string };
  assertEquals(diffWatchedFields(base, next), { linkedin_url: null });
});
