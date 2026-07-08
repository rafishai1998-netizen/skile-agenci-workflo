#!/usr/bin/env node

/**
 * Normalize Skills Metadata
 * Standardizes SKILL.md frontmatter format across all skills
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.join(__dirname, '..');
const SOURCES_DIR = path.join(REPO_ROOT, 'sources');

const DEFAULT_METADATA = {
  version: '1.0.0',
  author: 'ProofPilot Team',
  license: 'MIT'
};

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/);
  if (!match) return { metadata: null, body: content };

  const frontmatterStr = match[1];
  const body = match[2];
  const metadata = {};

  frontmatterStr.split('\n').forEach(line => {
    if (!line.trim()) return;
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      const cleanValue = value.replace(/^['"]|['"]$/g, '');
      metadata[key.trim()] = cleanValue;
    }
  });

  return { metadata, body };
}

function formatFrontmatter(metadata) {
  const lines = ['---'];
  const orderedKeys = ['name', 'description', 'category', 'version', 'author', 'license', 'tags'];
  const otherKeys = Object.keys(metadata).filter(k => !orderedKeys.includes(k));

  [...orderedKeys, ...otherKeys].forEach(key => {
    if (metadata[key]) {
      lines.push(`${key}: "${metadata[key]}"`);
    }
  });

  lines.push('---');
  return lines.join('\n');
}

function normalizeSkillFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filePath}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const { metadata, body } = extractFrontmatter(content);

    if (!metadata) {
      console.warn(`⚠️  No frontmatter in: ${filePath}`);
      return false;
    }

    const normalized = { ...DEFAULT_METADATA, ...metadata };
    const newContent = `${formatFrontmatter(normalized)}\n${body}`;
    fs.writeFileSync(filePath, newContent, 'utf-8');

    console.log(`✅ Normalized: ${path.relative(REPO_ROOT, filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error normalizing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 Normalizing skills metadata...\n');

  const sourceDirs = fs.readdirSync(SOURCES_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .sort()
    .map(entry => path.join(SOURCES_DIR, entry.name));

  let totalProcessed = 0;

  sourceDirs.forEach(sourceDir => {
    const dirName = path.basename(sourceDir);
    console.log(`\n📁 Processing ${dirName}...`);

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

      if (normalizeSkillFile(skillPath)) totalProcessed++;
    });
  });

  console.log(`\n✅ Normalization complete! Processed ${totalProcessed} skill files.`);
}

main();
