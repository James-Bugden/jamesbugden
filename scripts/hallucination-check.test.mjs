import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  stripCommentsAndStrings,
  findImportSpecs,
  findFromCalls,
  findRpcCalls,
  findEnvVars,
} from "./hallucination-check.mjs";

describe("stripCommentsAndStrings", () => {
  it("scrubs block comment content but preserves line numbers", () => {
    const src = "/*\n * import.meta.env.X here\n */\nconst real = 1;";
    const out = stripCommentsAndStrings(src);
    assert.equal(out.split("\n").length, src.split("\n").length);
    assert.ok(!out.includes("import.meta.env.X"));
    assert.ok(out.includes("const real = 1;"));
  });

  it("scrubs line comment content", () => {
    const src = `const a = 1; // import "fake-pkg";\nconst b = 2;`;
    const out = stripCommentsAndStrings(src);
    assert.ok(!out.includes("fake-pkg"));
    assert.ok(out.includes("const a = 1;"));
    assert.ok(out.includes("const b = 2;"));
  });

  it("scrubs template literal content including ${} expressions", () => {
    const src = "const msg = `import '${spec}' but bad`;";
    const out = stripCommentsAndStrings(src);
    assert.ok(!out.includes("${spec}"));
    assert.ok(!out.includes("import '"));
    assert.ok(out.startsWith("const msg = `"));
    assert.ok(out.endsWith("`;"));
  });

  it("scrubs single- and double-quoted string contents", () => {
    const src = `const a = 'import "fake"'; const b = "import 'fake2'";`;
    const out = stripCommentsAndStrings(src);
    assert.ok(!out.includes("fake"));
    assert.ok(!out.includes("fake2"));
    assert.ok(out.includes("const a = '"));
    assert.ok(out.includes("const b = \""));
  });

  it("preserves length 1:1 (replacement uses spaces)", () => {
    const src = `// hello\nconst x = 'world';\n/* multi\n line */\nconst y = \`tpl ${"${"}var}\`;`;
    const out = stripCommentsAndStrings(src);
    assert.equal(out.length, src.length);
  });

  it("handles escaped quotes inside strings", () => {
    const src = `const s = "hello \\"there\\""; const real = 1;`;
    const out = stripCommentsAndStrings(src);
    assert.equal(out.length, src.length);
    assert.ok(out.includes("const real = 1;"));
  });
});

describe("regex helpers (run on scrubbed text, capture from original)", () => {
  it("findImportSpecs detects real import after scrubbing-aware extraction", () => {
    const orig = `import x from "lucide-react";`;
    const scrubbed = stripCommentsAndStrings(orig);
    const specs = findImportSpecs(scrubbed, orig);
    assert.deepEqual(specs, ["lucide-react"]);
  });

  it("findImportSpecs ignores import in line comment", () => {
    const orig = `// import x from "fake-pkg";`;
    const scrubbed = stripCommentsAndStrings(orig);
    const specs = findImportSpecs(scrubbed, orig);
    assert.deepEqual(specs, []);
  });

  it("findImportSpecs ignores import inside template literal", () => {
    const orig = "const msg = `import \"fake\" failed`;";
    const scrubbed = stripCommentsAndStrings(orig);
    const specs = findImportSpecs(scrubbed, orig);
    assert.deepEqual(specs, []);
  });

  it("findFromCalls ignores .from() in line comment", () => {
    const orig = `// .from("table") example`;
    const scrubbed = stripCommentsAndStrings(orig);
    const calls = findFromCalls(scrubbed, orig);
    assert.deepEqual(calls, []);
  });

  it("findFromCalls detects real .from() call", () => {
    const orig = `await supabase.from("users").select();`;
    const scrubbed = stripCommentsAndStrings(orig);
    const calls = findFromCalls(scrubbed, orig);
    assert.deepEqual(calls, ["users"]);
  });

  it("findEnvVars ignores docstring example", () => {
    const orig = ` * import.meta.env.X / process.env.X are placeholders`;
    const scrubbed = stripCommentsAndStrings("/*\n" + orig + "\n*/");
    const vars = findEnvVars(scrubbed, "/*\n" + orig + "\n*/");
    assert.deepEqual(vars, []);
  });

  it("findEnvVars detects real env access", () => {
    const orig = `if (import.meta.env.VITE_SUPABASE_URL) {}`;
    const scrubbed = stripCommentsAndStrings(orig);
    const vars = findEnvVars(scrubbed, orig);
    assert.deepEqual(vars, ["VITE_SUPABASE_URL"]);
  });
});
