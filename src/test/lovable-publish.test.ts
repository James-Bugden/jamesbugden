import { describe, test, expect } from "vitest";
import { spawnSync } from "child_process";
import path from "path";

const SCRIPT = path.resolve(process.cwd(), "scripts/lovable-publish.mjs");

describe("lovable-publish CLI", () => {
  test("exits 1 when LOVABLE_EMAIL is not set", () => {
    const result = spawnSync(process.execPath, [SCRIPT], {
      env: { ...process.env, LOVABLE_EMAIL: "", LOVABLE_PASSWORD: "pw" },
      encoding: "utf8",
      timeout: 5000,
    });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("LOVABLE_EMAIL");
  });

  test("exits 1 when LOVABLE_PASSWORD is not set", () => {
    const result = spawnSync(process.execPath, [SCRIPT], {
      env: { ...process.env, LOVABLE_EMAIL: "e@test.com", LOVABLE_PASSWORD: "" },
      encoding: "utf8",
      timeout: 5000,
    });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("LOVABLE_PASSWORD");
  });
});
