import { describe, test, expect } from "vitest";
import { spawnSync } from "child_process";
import path from "path";

const SCRIPT = path.resolve(process.cwd(), "scripts/lovable-publish.mjs");

describe("lovable-publish CLI", () => {
  test("exits 1 when LOVABLE_STORAGE_STATE is not set", () => {
    const result = spawnSync(process.execPath, [SCRIPT], {
      env: { ...process.env, LOVABLE_STORAGE_STATE: "" },
      encoding: "utf8",
      timeout: 5000,
    });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("LOVABLE_STORAGE_STATE");
  });

  test("exits 1 when LOVABLE_STORAGE_STATE is invalid base64 JSON", () => {
    const result = spawnSync(process.execPath, [SCRIPT], {
      env: { ...process.env, LOVABLE_STORAGE_STATE: "not-valid-base64-json!!!" },
      encoding: "utf8",
      timeout: 5000,
    });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("LOVABLE_STORAGE_STATE");
  });
});
