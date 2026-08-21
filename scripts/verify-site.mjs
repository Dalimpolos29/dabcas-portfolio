#!/usr/bin/env node
/**
 * Acceptance checks for the portfolio. This repo has no unit-test framework;
 * these assertions are the test cycle. Run with `npm run verify`.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const failures = [];
const fail = (msg) => failures.push(msg);

/** Every file under a directory, recursively, matching the given extensions. */
function walk(dir, exts) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full, exts);
    return exts.includes(extname(full)) ? [full] : [];
  });
}

const sourceFiles = [
  ...walk("src", [".ts", ".tsx", ".css"]),
  ...walk("content", [".mdx", ".md"]),
];

// --- 1. No placeholder text survives anywhere in shipped content ------------
const BANNED = [
  "TODO",
  "20XX",
  "Sample",
  "sample-",
  "example.com",
  "hello@dabcas.dev",
  "Add your",
];
for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  for (const needle of BANNED) {
    if (text.includes(needle)) fail(`${file}: contains banned placeholder "${needle}"`);
  }
}

// --- 2. The wrong email must never ship ------------------------------------
for (const file of sourceFiles) {
  if (readFileSync(file, "utf8").includes("mr.dennisalimpolos@gmail.com")) {
    fail(`${file}: uses the wrong contact email`);
  }
}

// --- 3. Exactly the four real projects exist -------------------------------
const EXPECTED_PROJECTS = [
  "lopez-payroll",
  "merit-demerit-tracker",
  "sulyap-alumni",
  "sisters-and-mom-pastry",
];
const projectFiles = existsSync("content/projects")
  ? readdirSync("content/projects").filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""))
  : [];
for (const slug of EXPECTED_PROJECTS) {
  if (!projectFiles.includes(slug)) fail(`content/projects/${slug}.mdx is missing`);
}
for (const slug of projectFiles) {
  if (!EXPECTED_PROJECTS.includes(slug)) fail(`content/projects/${slug}.mdx is not an approved project`);
}

// --- 4. The payroll case study must not link the live app -----------------
const payrollPath = "content/projects/lopez-payroll.mdx";
if (existsSync(payrollPath)) {
  const payroll = readFileSync(payrollPath, "utf8");
  if (payroll.includes("lopez-industries-payroll-system.vercel.app")) {
    fail(`${payrollPath}: must not link the live payroll app (real employee wage data)`);
  }
}

// --- 5. The services page is gone; DABCAS is demoted -----------------------
if (existsSync("src/app/services")) fail("src/app/services still exists — it should be deleted");

// --- 6. Real facts are present in site.ts ---------------------------------
const sitePath = "src/lib/site.ts";
if (existsSync(sitePath)) {
  const siteSrc = readFileSync(sitePath, "utf8");
  const REQUIRED = [
    "imdennisalimpolos@gmail.com",
    "dennis-alimpolos-228753210",
    "Saint Paul American School",
    "Polytechnic University of the Philippines",
    "Mabalacat",
  ];
  for (const needle of REQUIRED) {
    if (!siteSrc.includes(needle)) fail(`${sitePath}: missing required fact "${needle}"`);
  }
} else {
  fail(`${sitePath} is missing`);
}

// --- 7. Every motion primitive honours reduced motion ---------------------
for (const file of walk("src/components/motion", [".tsx"])) {
  if (!readFileSync(file, "utf8").includes("useReducedMotion")) {
    fail(`${file}: motion primitive does not call useReducedMotion()`);
  }
}

if (failures.length > 0) {
  console.error(`\nverify-site: ${failures.length} failure(s)\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("");
  process.exit(1);
}
console.log("verify-site: all checks passed");
