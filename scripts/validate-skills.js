#!/usr/bin/env node

/**
 * Validate Skills Repository Structure
 * Checks SKILL.md frontmatter, directory structure, and content integrity
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.join(__dirname, '..');
const SOURCES_DIR = path.join(REPO_ROOT, 'sources');

const REQUIRED_FIELDS = ['name', 'description'];

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = match[1];
  const metadata = {};

  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      metadata[key.trim()] = value.replace(/^['"]|['"]$/g, '');
    }
  });

  return Object.keys(metadata).length > 0 ? metadata : null;
}

function validateSkillFile(filePath) {
  const result = { valid: true, errors: [], warnings: [], path: filePath };

  try {
    if (!fs.existsSync(filePath)) {
      result.valid = false;
      result.errors.push('File does not exist');
      return result;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const metadata = extractFrontmatter(content);

    if (!metadata) {
      result.valid = false;
      result.errors.push('No frontmatter found (expected --- key: value --- format)');
      return result;
    }

    REQUIRED_FIELDS.forEach(field => {
      if (!metadata[field]) {
        result.valid = false;
        result.errors.push(`Missing required field: ${field}`);
      }
    });

    if (content.split('\n').length < 5) {
      result.warnings.push('Skill file seems too short');
    }
  } catch (error) {
    result.valid = false;
    result.errors.push(`Error reading file: ${error.message}`);
  }

  return result;
}

function main() {
  console.log('🔍 Validating skills repository structure...\n');

  const sourceDirs = fs.readdirSync(SOURCES_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(SOURCES_DIR, entry.name));

  let totalValid = 0;
  let totalErrors = 0;
  let totalWarnings = 0;

  sourceDirs.forEach(sourceDir => {
    if (!fs.existsSync(sourceDir)) return;

    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

    entries.forEach(entry => {
      let skillPath;
      if (entry.isFile() && entry.name.endsWith('.md')) {
        skillPath = path.join(sourceDir, entry.name);
      } else if (entry.isDirectory()) {
        skillPath = path.join(sourceDir, entry.name, 'SKILL.md');
        if (!fs.existsSync(skillPath)) return;
      } else {
        return;
      }

      const result = validateSkillFile(skillPath);
      if (result.valid) {
        totalValid++;
        console.log(`✅ ${result.path}`);
      } else {
        totalErrors += result.errors.length;
        console.log(`❌ ${result.path}`);
        result.errors.forEach(err => console.log(`   ERROR: ${err}`));
      }

      totalWarnings += result.warnings.length;
      result.warnings.forEach(warn => console.log(`   ⚠️  WARNING: ${warn}`));
    });
  });

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Valid: ${totalValid}`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log(`   ⚠️  Warnings: ${totalWarnings}`);

  process.exit(totalErrors > 0 ? 1 : 0);
}

main();
