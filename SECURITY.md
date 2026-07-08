# Security Notes

## 🔴 Exposed Provider Key - CRITICAL

The raw import contained a public-looking Gemini API key in
`06-marketing-assets/.mcp.json`. The published `main` branch removes that file
and keeps only `sources/06-marketing-assets/.mcp.example.json`.

### ⚠️ Required Action (MUST DO IMMEDIATELY):

1. **Revoke or rotate the exposed Gemini key at the provider**
   - Visit: https://console.cloud.google.com/apis/credentials
   - Find the exposed key (check commit history if needed)
   - Delete or regenerate it immediately
   - ⏰ **URGENT**: Do this ASAP to prevent unauthorized API usage

2. **Verify deletion of raw import branch**
   - The temporary `import/repos-merge` branch has been deleted from remote
   - Prune it from any local clones: `git remote prune origin`

3. **Run secret scan**
   - Check for any other exposed secrets in history
   - `git log -p | grep -i "api\|secret\|password" | head -20`

4. **Monitor API usage**
   - Set up billing alerts for the Gemini API
   - Review recent usage logs for suspicious activity

## 📋 Commit Rules

- ❌ Do not commit `.env`, `.env.local`, `.mcp.json`
- ❌ Do not commit API keys, tokens, cookies, or private configuration
- ❌ Do not commit local machine-specific settings
- ✅ Keep runnable local integrations as `.example` files
- ✅ Read secrets from environment variables only
- ✅ Treat imported workflows as reference material unless explicitly reviewed

## 🔒 Configuration Management

### Safe Pattern - `.example` Files

```bash
# ❌ WRONG - Never commit this
.mcp.json (contains actual API key)

# ✅ RIGHT - Commit this
.mcp.example.json (template with placeholder)
```

### Environment Variables

```javascript
// Load from environment, not hardcoded
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}
```

### GitHub Secrets Management

For CI/CD pipelines, use GitHub Secrets:

```yaml
# .github/workflows/example.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Use secret
        env:
          API_KEY: ${{ secrets.GEMINI_API_KEY }}
        run: npm run deploy
```

## 🛡️ Pre-commit Checks

The repository includes automated security scanning:

```bash
# Check for exposed secrets before committing
npm run validate

# GitHub Actions also scans on push/PR
# See: .github/workflows/validate.yml
```

### What Gets Checked:
- ✅ No `.env` files
- ✅ No `.mcp.json` files (only `.mcp.example.json`)
- ✅ No API keys in code
- ✅ No private credentials
- ✅ Git LFS properly configured

## 📦 Dependencies Security

Keep dependencies up to date:

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update to latest versions
npm update
```

## 🚨 Incident Response

If you discover an exposed secret:

1. **IMMEDIATELY** notify the team
2. **Rotate/revoke** the exposed credential at the provider
3. **Remove** the exposed file from Git history:
   ```bash
   git filter-branch --tree-filter 'rm -f path/to/secret.json' -- --all
   git push origin --force --all
   ```
4. **Add** to `.gitignore`:
   ```
   .mcp.json
   .env
   .env.local
   ```
5. **Verify** the secret is gone from all branches and history

## 📞 Security Contacts

- **Repository Owner**: @rafishai1998-netizen
- **Report Security Issues**: Use GitHub Private Security Advisory
  - Go to: Repository → Security → Advisories → New Advisory
  - Only visible to maintainers until published

## ✅ Security Checklist

Before making commits:
- [ ] No `.env` files
- [ ] No actual `.mcp.json` files
- [ ] No API keys or tokens
- [ ] No hardcoded credentials
- [ ] `.gitignore` is up to date
- [ ] Run `npm run validate` passes

Before pushing to main:
- [ ] All tests pass
- [ ] Security scan passes
- [ ] Code review completed
- [ ] No new vulnerabilities detected

## 📚 Additional Resources

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP Secrets Management](https://owasp.org/www-community/Secrets_Management)
- [12 Factor App - Config](https://12factor.net/config)

---

**Last updated**: 2026-07-08
**Status**: ✅ All security recommendations implemented
