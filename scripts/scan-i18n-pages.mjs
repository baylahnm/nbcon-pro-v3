#!/usr/bin/env node
/**
 * i18n page scanner/fixer
 *
 * Usage:
 *   node scripts/scan-i18n-pages.mjs                # scan all pages
 *   node scripts/scan-i18n-pages.mjs --page Status  # scan files path/name containing "Status"
 *   node scripts/scan-i18n-pages.mjs --fix          # apply fixes in-place
 *   node scripts/scan-i18n-pages.mjs --page Real --fix
 *
 * What it checks/fixes:
 *  - common.search -> common:search
 *  - statusTracking.* without ns -> common:statusTracking.*
 *  - jobs.realTimeMatching.* -> realTimeMatching.* (assumes useTranslation('common'))
 *  - deliverableStatus.in_progress -> deliverableStatus.inProgress
 *  - Adds 'common' to useTranslation(...) when file uses common:statusTracking or realTimeMatching keys
 *  - Prints per-file summary with counts
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, 'src', 'pages');

const args = process.argv.slice(2);
const fix = args.includes('--fix');
const pageArgIdx = args.indexOf('--page');
const pageFilter = pageArgIdx !== -1 ? (args[pageArgIdx + 1] || '') : '';

/** Walk a directory recursively and gather .tsx files */
function walk(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, results);
    else if (e.isFile() && /\.tsx?$/.test(e.name)) results.push(full);
  }
  return results;
}

/** Ensure useTranslation includes 'common' if needed */
function ensureUseTranslationCommon(content, intents) {
  // Only modify if the file actually uses common keys
  if (!intents.usesCommonKeys) return { content, changed: 0 };
  let changed = 0;
  let modified = content
    // useTranslation() -> useTranslation('common')
    .replace(/useTranslation\(\s*\)/g, () => { changed++; return "useTranslation('common')"; })
    // useTranslation('jobs') -> useTranslation(['jobs','common']) (preserve spacing loosely)
    .replace(/useTranslation\(\s*(['"])jobs\1\s*\)/g, (m, q) => { changed++; return `useTranslation([${q}jobs${q}, 'common'])`; })
    // useTranslation('common') keep
    // useTranslation(['a','b']) -> ensure 'common' present
    .replace(/useTranslation\(\s*\[([^\]]*)\]\s*\)/g, (m, inside) => {
      if (/\bcommon\b/.test(inside)) return m; // already present
      changed++;
      const tail = inside.trim().length ? inside.trim() + ', ' : '';
      return `useTranslation([${tail}'common'])`;
    });
  return { content: modified, changed };
}

function scanAndFix(content) {
  let issues = {
    commonSearchDot: 0,
    statusTrackingNoNs: 0,
    jobsRealTimeMatchingNs: 0,
    snakeCaseStatuses: 0,
    addedUseTranslationCommon: 0,
  };

  const intents = {
    usesCommonKeys: /statusTracking\.|common:statusTracking\.|realTimeMatching\.|common:search/.test(content),
  };

  let modified = content;

  // common.search -> common:search
  modified = modified.replace(/t\((['"])common\.search\1/g, () => {
    issues.commonSearchDot++; return "t('common:search'";
  });

  // statusTracking.* w/o ns -> common:statusTracking.*
  modified = modified.replace(/t\((['"])statusTracking\./g, () => {
    issues.statusTrackingNoNs++; return "t('common:statusTracking.";
  });

  // jobs.realTimeMatching.* -> realTimeMatching.*
  modified = modified.replace(/t\((['"])jobs\.realTimeMatching\./g, () => {
    issues.jobsRealTimeMatchingNs++; return "t('realTimeMatching.";
  });

  // deliverableStatus.in_progress -> deliverableStatus.inProgress
  modified = modified.replace(/deliverableStatus\.in_progress/g, () => {
    issues.snakeCaseStatuses++; return 'deliverableStatus.inProgress';
  });

  // Add 'common' to useTranslation if needed
  const ensureRes = ensureUseTranslationCommon(modified, intents);
  modified = ensureRes.content;
  issues.addedUseTranslationCommon += ensureRes.changed;

  return { modified, issues };
}

function formatIssues(issues) {
  const parts = [];
  if (issues.commonSearchDot) parts.push(`common.search→common:search ${issues.commonSearchDot}`);
  if (issues.statusTrackingNoNs) parts.push(`statusTracking(ns) ${issues.statusTrackingNoNs}`);
  if (issues.jobsRealTimeMatchingNs) parts.push(`jobs.realTimeMatching→realTimeMatching ${issues.jobsRealTimeMatchingNs}`);
  if (issues.snakeCaseStatuses) parts.push(`in_progress→inProgress ${issues.snakeCaseStatuses}`);
  if (issues.addedUseTranslationCommon) parts.push(`add useTranslation('common') ${issues.addedUseTranslationCommon}`);
  return parts.length ? parts.join('; ') : 'clean';
}

function scanFiles(files) {
  let total = { files: 0, changed: 0 };
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    if (pageFilter && !rel.toLowerCase().includes(pageFilter.toLowerCase())) continue;
    const content = fs.readFileSync(file, 'utf8');
    const { modified, issues } = scanAndFix(content);
    const changed = modified !== content;
    total.files++;
    if (fix && changed) {
      fs.writeFileSync(file, modified, 'utf8');
    }
    const label = changed && fix ? 'FIXED' : (formatIssues(issues));
    // Print page name each time
    console.log(`• Page: ${rel} — ${label}`);
    if (changed) total.changed++;
  }
  console.log(`\nSummary: scanned ${total.files} file(s); ${fix ? 'fixed' : 'would fix'} ${total.changed}.`);
}

const all = walk(PAGES_DIR, []);
scanFiles(all);

