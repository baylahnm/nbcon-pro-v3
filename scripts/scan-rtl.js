#!/usr/bin/env node

/**
 * RTL Directional Utilities Scanner
 * Scans for banned directional classes and reports usage
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const BANNED_PATTERNS = [
  /\b(text-left|text-right)\b/g,
  /\b(ml-|mr-|pl-|pr-)\d+\b/g,
  /\b(left-|right-)\d+\b/g,
  /\b(float-left|float-right)\b/g,
  /\b(rounded-l|rounded-r)\b/g
];

const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', '.next'];

function scanFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const issues = [];
    
    BANNED_PATTERNS.forEach((pattern, index) => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const lines = content.substring(0, content.indexOf(match)).split('\n');
          const lineNumber = lines.length;
          issues.push({
            pattern: pattern.source,
            match,
            line: lineNumber,
            file: filePath
          });
        });
      }
    });
    
    return issues;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dirPath, allIssues = []) {
  try {
    const items = readdirSync(dirPath);
    
    for (const item of items) {
      if (IGNORE_DIRS.includes(item)) continue;
      
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath, allIssues);
      } else if (EXTENSIONS.includes(extname(item))) {
        const issues = scanFile(fullPath);
        allIssues.push(...issues);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error.message);
  }
  
  return allIssues;
}

function main() {
  const srcDir = 'src';
  console.log('🔍 Scanning for banned directional utilities...\n');
  
  const issues = scanDirectory(srcDir);
  
  if (issues.length === 0) {
    console.log('✅ No banned directional utilities found!');
    return;
  }
  
  console.log(`❌ Found ${issues.length} banned directional utility usage(s):\n`);
  
  // Group by file
  const issuesByFile = issues.reduce((acc, issue) => {
    if (!acc[issue.file]) acc[issue.file] = [];
    acc[issue.file].push(issue);
    return acc;
  }, {});
  
  Object.entries(issuesByFile).forEach(([file, fileIssues]) => {
    console.log(`📁 ${file}:`);
    fileIssues.forEach(issue => {
      console.log(`  Line ${issue.line}: "${issue.match}" (pattern: ${issue.pattern})`);
    });
    console.log('');
  });
  
  console.log('💡 Replace with logical utilities:');
  console.log('  text-left/right → text-start/end');
  console.log('  ml-/mr- → ms-/me-');
  console.log('  pl-/pr- → ps-/pe-');
  console.log('  left-/right- → inset-s-/inset-e-');
  console.log('  float-left/right → float-start/end');
  console.log('  rounded-l/r → rounded-s/e');
  
  process.exit(1);
}

main();
