#!/usr/bin/env node
// Submits a Connect Card to the local dev server so you don't have to fill in
// the form by hand every time. The scenarios below mirror the test matrix in
// CONNECT-CARD.md §9i ("Test before going live").
//
// Usage:
//   npm run card list
//   npm run card new
//   npm run card new -- --unique          (timestamped name, always brand-new)
//   npm run card family-new
//   npm run card family-add-child
//   npm run card raw -- --json ./my-card.json
//
// Flags:
//   --url <base>      Base URL of the running site   (default http://localhost:3000)
//   --unique          Append a timestamp to name/email so it never matches
//   --ip <addr>       Value for x-forwarded-for      (default: random, dodges rate limit)
//   --json <file>     For the "raw" scenario: a JSON file with the raw payload
//   --dry-run         Print the payload instead of sending it

import { readFileSync } from "node:fs";

const BASE_DEFAULT = "http://localhost:3000";

// Every test person gets a "ZZTEST" last name so the records are easy to spot
// and delete in Breeze afterwards (see CONNECT-CARD.md §9i step 4). They also
// all get an address so the Breeze address sync is exercised every run.
const TEST_ADDRESS = {
  street: "100 Test Ave",
  city: "Brighton",
  state: "CO",
  zip: "80601",
};

const adults = {
  new: {
    firstName: "Testy",
    lastName: "ZZTEST New",
    email: "zztest.new@example.com",
    phone: "3035550101",
    attendanceStatus: "first_time",
    maritalStatus: "single",
    ...TEST_ADDRESS,
    howHeard: "website",
    contactConsent: true,
  },
  "update-email": {
    // Same email as "new" — should strong-match and update that profile.
    firstName: "Testy",
    lastName: "ZZTEST New",
    email: "zztest.new@example.com",
    phone: "3035550102",
    attendanceStatus: "visited_before",
    ...TEST_ADDRESS,
    contactConsent: true,
  },
  "update-phone": {
    // Run twice: the second run should strong-match by phone + name.
    firstName: "Phoney",
    lastName: "ZZTEST Phone",
    email: "zztest.phone@example.com",
    phone: "3035550200",
    attendanceStatus: "first_time",
    ...TEST_ADDRESS,
    contactConsent: true,
  },
  "name-only": {
    // Same name, different email/phone — should create a NEW profile and flag
    // for manual review rather than updating the existing one.
    firstName: "Dupey",
    lastName: "ZZTEST Dupe",
    email: "zztest.dupe1@example.com",
    phone: "3035550301",
    attendanceStatus: "first_time",
    ...TEST_ADDRESS,
    contactConsent: true,
  },
  "name-only-2": {
    firstName: "Dupey",
    lastName: "ZZTEST Dupe",
    email: "zztest.dupe2@example.com",
    phone: "3035550302",
    attendanceStatus: "visited_before",
    ...TEST_ADDRESS,
    contactConsent: true,
  },
  "family-new": {
    // Adult + two children, no existing family -> families/create.
    firstName: "Famly",
    lastName: "ZZTEST Family",
    email: "zztest.family@example.com",
    phone: "3035550400",
    attendanceStatus: "first_time",
    ...TEST_ADDRESS,
    hasChildren: true,
    children: [
      { firstName: "Kid One", lastName: "ZZTEST Family", grade: "nursery" },
      { firstName: "Kid Two", lastName: "ZZTEST Family", grade: "preschool" },
    ],
    contactConsent: true,
  },
  "family-add-child": {
    // Run AFTER family-new: adult matches by email, existing kids match, and
    // "Kid Three" is created and added via families/add (not families/create).
    firstName: "Famly",
    lastName: "ZZTEST Family",
    email: "zztest.family@example.com",
    phone: "3035550400",
    attendanceStatus: "visited_before",
    ...TEST_ADDRESS,
    hasChildren: true,
    children: [
      { firstName: "Kid One", lastName: "ZZTEST Family", grade: "nursery" },
      { firstName: "Kid Two", lastName: "ZZTEST Family", grade: "preschool" },
      { firstName: "Kid Three", lastName: "ZZTEST Family", grade: "kindergarten" },
    ],
    contactConsent: true,
  },
};

function parseArgs(argv) {
  const args = { scenario: null, url: BASE_DEFAULT, unique: false, ip: null, json: null, dryRun: false };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--url") args.url = argv[++i];
    else if (a === "--ip") args.ip = argv[++i];
    else if (a === "--json") args.json = argv[++i];
    else if (a === "--unique") args.unique = true;
    else if (a === "--dry-run") args.dryRun = true;
    else rest.push(a);
  }
  args.scenario = rest[0] ?? null;
  return args;
}

function listScenarios() {
  console.log("Scenarios (see CONNECT-CARD.md §9i):\n");
  for (const name of Object.keys(adults)) {
    console.log(`  ${name}`);
  }
  console.log("  raw            (payload from a JSON file via --json)");
  console.log("\nExample:  npm run card new -- --unique");
}

function buildPayload(scenario, { unique, json }) {
  if (scenario === "raw") {
    if (!json) throw new Error('The "raw" scenario needs --json <file>.');
    return JSON.parse(readFileSync(json, "utf8"));
  }
  const base = adults[scenario];
  if (!base) throw new Error(`Unknown scenario "${scenario}". Run "npm run card list".`);

  const payload = { ...base };
  if (unique) {
    const stamp = Date.now();
    payload.firstName = `${payload.firstName}${stamp}`;
    payload.lastName = `${payload.lastName} ${stamp}`;
    if (payload.email) payload.email = payload.email.replace("@", `+${stamp}@`);
  }
  return payload;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.scenario || args.scenario === "list" || args.scenario === "help" || args.scenario === "--help" || args.scenario === "-h") {
    listScenarios();
    return;
  }

  let payload;
  try {
    payload = buildPayload(args.scenario, args);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
    return;
  }

  // A fresh random IP each run avoids the in-memory rate limiter (5/10min).
  const ip = args.ip ?? `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  const url = `${args.url.replace(/\/$/, "")}/api/connect-card`;

  console.log(`Scenario: ${args.scenario}`);
  console.log(`Person:   ${payload.firstName} ${payload.lastName}${payload.email ? `  <${payload.email}>` : ""}`);
  console.log(`POST:     ${url}  (x-forwarded-for: ${ip})`);
  if (args.dryRun) {
    console.log("\nDry run — payload:");
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error(`\nCould not reach the dev server at ${args.url}. Is "npm run dev" running?`);
    console.error(err.message);
    process.exitCode = 1;
    return;
  }

  const body = await res.json().catch(() => null);
  console.log(`\nHTTP ${res.status}`);
  console.log(JSON.stringify(body, null, 2));
  if (!res.ok) process.exitCode = 1;
}

main();
