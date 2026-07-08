#!/usr/bin/env node

/**
 * Deduplicate Content Across Skills Repository
 * Identifies and removes exact duplicate files across sources
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.join(__dirname, '..');
const SOURCES_DIR = path.join(REPO_ROOT, 'sources');
const DRY_RUN = process.argv.includes('--dry-run');

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
  try {
    const fullPath = path.join(SOURCES_DIR, filePath);

    if (DRY_RUN) {
      console.log(`   [DRY-RUN] Would delete: ${filePath}`);
      return true;
    }

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
  console.log('🔍 Scanning for duplicate files...\n');

  const fileMap = collectFiles(SOURCES_DIR);
  const duplicates = findDuplicates(fileMap);

  if (duplicates.length === 0) {
    console.log('✅ No duplicates found!');
    return;
  }

  console.log(`Found ${duplicates.length} groups of duplicate files:\n`);

  let totalDuplicatesRemoved = 0;
  let totalBytesFreed = 0;

  duplicates.forEach((files, index) => {
    console.log(`📋 Duplicate Group ${index + 1} (${files.length} copies, ${files[0].size} bytes each):`);

    files.slice(1).forEach(file => {
      if (removeDuplicate(file.path)) {
        totalDuplicatesRemoved++;
        totalBytesFreed += file.size;
      }
    });

    console.log();
  });

  const sizeInMB = (totalBytesFreed / 1024 / 1024).toFixed(2);
  console.log(`\n📊 Summary:`);
  console.log(`   Duplicate files removed: ${totalDuplicatesRemoved}`);
  console.log(`   Space freed: ${sizeInMB} MB`);

  if (DRY_RUN) {
    console.log('\n   ℹ️  Dry-run mode: No files were actually deleted');
    console.log('   Run with: npm run deduplicate (without --dry-run) to actually remove files');
  }
}

main();
