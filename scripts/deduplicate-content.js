#!/usr/bin/env node

/**
 * Deduplicate Content Across Skills Repository
 *
 * Safe behavior:
 * - Default mode is dry-run/report only.
 * - Real deletion requires explicit --apply.
 * - This script scans sources/ only and never edits files outside sources/.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.join(__dirname, '..');
const SOURCES_DIR = path.join(REPO_ROOT, 'sources');
const APPLY = process.argv.includes('--apply');
const DRY_RUN = !APPLY;

function calculateHash(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(content).digest('hex');
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error.message);
    return '';
  }
}

function collectFiles(dir, fileMap = new Map()) {
  if (!fs.existsSync(dir)) return fileMap;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'archive', '.github'].includes(entry.name)) return;
      collectFiles(fullPath, fileMap);
    } else if (entry.isFile()) {
      if (['.gitignore', '.gitattributes', 'MANIFEST', '.DS_Store'].includes(entry.name)) return;

      const hash = calculateHash(fullPath);
      if (!hash) return;

      const relativePath = path.relative(SOURCES_DIR, fullPath);
      const size = fs.statSync(fullPath).size;

      if (!fileMap.has(hash)) fileMap.set(hash, []);
      fileMap.get(hash).push({ path: relativePath, hash, size });
    }
  });

  return fileMap;
}

function findDuplicates(fileMap) {
  return Array.from(fileMap.values()).filter(files => files.length > 1);
}

function removeDuplicate(filePath) {
  const fullPath = path.join(SOURCES_DIR, filePath);

  if (!fullPath.startsWith(SOURCES_DIR + path.sep)) {
    console.error(`   ❌ Refusing to touch path outside sources/: ${filePath}`);
    return false;
  }

  if (DRY_RUN) {
    console.log(`   [DRY-RUN] Would delete: ${filePath}`);
    return true;
  }

  try {
    fs.unlinkSync(fullPath);
    console.log(`   ✅ Deleted: ${filePath}`);

    let dir = path.dirname(fullPath);
    while (dir !== SOURCES_DIR && fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      if (files.length === 0) {
        fs.rmdirSync(dir);
        console.log(`   📁 Removed empty directory: ${path.relative(SOURCES_DIR, dir)}`);
        dir = path.dirname(dir);
      } else {
        break;
      }
    }

    return true;
  } catch (error) {
    console.error(`   ❌ Error deleting ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔍 Scanning for duplicate files...');
  console.log(DRY_RUN ? 'Mode: dry-run/report only. Use --apply to delete.\n' : 'Mode: APPLY. Duplicate copies may be deleted.\n');

  if (!fs.existsSync(SOURCES_DIR)) {
    console.error('❌ sources/ directory not found. Aborting.');
    process.exitCode = 1;
    return;
  }

  const fileMap = collectFiles(SOURCES_DIR);
  const duplicates = findDuplicates(fileMap);

  if (duplicates.length === 0) {
    console.log('✅ No duplicates found!');
    return;
  }

  console.log(`Found ${duplicates.length} groups of duplicate files:\n`);

  let totalDuplicateCopies = 0;
  let totalBytesAffected = 0;

  duplicates.forEach((files, index) => {
    console.log(`📋 Duplicate Group ${index + 1} (${files.length} copies, ${files[0].size} bytes each):`);
    console.log(`   Keeping: ${files[0].path}`);

    files.slice(1).forEach(file => {
      if (removeDuplicate(file.path)) {
        totalDuplicateCopies++;
        totalBytesAffected += file.size;
      }
    });

    console.log();
  });

  const sizeInMB = (totalBytesAffected / 1024 / 1024).toFixed(2);
  console.log('\n📊 Summary:');
  console.log(`   Duplicate copies ${DRY_RUN ? 'identified' : 'removed'}: ${totalDuplicateCopies}`);
  console.log(`   Space ${DRY_RUN ? 'potentially freed' : 'freed'}: ${sizeInMB} MB`);

  if (DRY_RUN) {
    console.log('\n   ℹ️  Dry-run mode: no files were deleted.');
    console.log('   To apply deletion intentionally, run: node scripts/deduplicate-content.js --apply');
  }
}

main();
