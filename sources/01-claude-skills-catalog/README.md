# Claude Skills Catalog

> 300+ skills, 120+ commands, and 267+ agents organized into searchable categories

This is ProofPilot's central reference for all Claude Code capabilities. Browse by category to find the right tool, understand when to use it, and learn how it works.

## Quick Start

| I want to... | Use this | Command |
|--------------|----------|---------|
| Audit a website's SEO | `seo-audit` | `/seo-audit` |
| Audit ad campaigns | `ads` | `/ads audit` |
| Write an article | `article-writing` | `/article-writing` |
| Scrape a webpage | `firecrawl-scrape` | `/firecrawl-scrape` |
| Search the web | `firecrawl-search` | `/firecrawl-search` |
| Start a new project | GSD commands | `/gsd:new-project` |
| Pair program with AI | `pair-programming` | `/pair-programming` |
| Create a proposal | `proofpilot-proposals` | `/proofpilot-proposals` |
| Review code | GitHub commands | `/github:code-review` |
| Build a UI component | `frontend-design` | `/frontend-design` |
| Look up library docs | `documentation-lookup` | `/docs` |

---

## Skill Categories

| # | Category | Skills | Description | Start Here |
|---|----------|--------|-------------|------------|
| 01 | [SEO](skills/01-seo/) | 18 | Website audits, technical SEO, content quality, schema, GEO | `seo` or `seo-audit` |
| 02 | [Paid Advertising](skills/02-paid-advertising/) | 15 | Google, Meta, LinkedIn, TikTok, Microsoft ad audits & strategy | `ads` |
| 03 | [Content Creation](skills/03-content-creation/) | 11 | Articles, social media, video, AI media, writing quality | `article-writing` |
| 04 | [Web Scraping](skills/04-web-scraping/) | 8 | Scrape, search, crawl, map, download, extract, automate | `firecrawl` |
| 05 | [Development Workflow](skills/05-development-workflow/) | 16 | TDD, pair programming, deployment, Docker, security, testing | `pair-programming` |
| 06 | [Language-Specific](skills/06-language-specific/) | 50+ | TS/JS, Python, Go, Rust, Kotlin, Java, C++, Swift, Perl, Flutter, Laravel, Django | `{lang}-patterns` |
| 07 | [AI Agents](skills/07-ai-agents/) | 15 | Claude API, MCP servers, autonomous loops, agent engineering | `claude-api` |
| 08 | [Agent Orchestration](skills/08-agent-orchestration/) | 10 | Swarm coordination, SPARC, DevFleet, multi-agent workflows | `swarm-orchestration` |
| 09 | [GitHub & CI/CD](skills/09-github-cicd/) | 5 | Workflow automation, code review, releases, project management | `github-code-review` |
| 10 | [UI/UX Design](skills/10-ui-ux-design/) | 4 | 50 design styles, frontend code, Lovable.dev, website strategy | `ui-ux-pro-max` |
| 11 | [Memory & Databases](skills/11-memory-databases/) | 7 | AgentDB, vector search, PostgreSQL, ClickHouse | `postgres-patterns` |
| 12 | [Verification & Quality](skills/12-verification-quality/) | 7 | Truth scoring, verification loops, skill health, context budgets | `verification-loop` |
| 13 | [Business & Research](skills/13-business-research/) | 7 | Market research, deep research, investor materials & outreach | `deep-research` |
| 14 | [ProofPilot Ops](skills/14-proofpilot-ops/) | 7 | Brand styling, proposals, P&L, SOWs, Amped onboarding | `proofpilot-brand` |
| 15 | [Claude Flow V3](skills/15-claude-flow-v3/) | 9 | V3 architecture, DDD, security, performance, swarm coordination | Project-specific |
| 16 | [Session & Learning](skills/16-session-learning/) | 5 | Continuous learning, prompt optimization, documentation lookup | `documentation-lookup` |
| 17 | [Document Processing](skills/17-document-processing/) | 4 | PDF/DOCX processing, translation, video/audio, X/Twitter API | Domain-specific |
| 18 | [Domain Expertise](skills/18-domain-expertise/) | 8 | Energy, inventory, manufacturing, logistics, customs, quality | Industry-specific |

---

## Command Suites

| Suite | Commands | Description | Key Commands |
|-------|----------|-------------|--------------|
| [GSD](commands/gsd/) | 31 | Full project management lifecycle | `/gsd:new-project`, `/gsd:plan-phase`, `/gsd:execute-phase` |
| [SPARC](commands/sparc/) | 25 | Development methodology modes | `/sparc:architect`, `/sparc:coder`, `/sparc:tester` |
| [GitHub](commands/github/) | 21 | GitHub operations | `/github:code-review`, `/github:pr-manager` |
| [Hooks](commands/hooks/) | 10 | Event-driven automation | `/hooks:setup`, `/hooks:pre-task` |
| [Analysis](commands/analysis/) | 9 | Performance and token analysis | `/analysis:performance-report` |
| [Automation](commands/automation/) | 9 | Smart agent spawning, workflows | `/automation:smart-spawn` |
| [Monitoring](commands/monitoring/) | 8 | Real-time status and metrics | `/monitoring:status` |
| [Optimization](commands/optimization/) | 8 | Parallel execution, caching | `/optimization:parallel-execute` |
| [Slack](commands/slack/) | 7 | Channel summaries, standup, search | `/slack:summarize-channel` |
| [Superpowers](commands/superpowers/) | 12 | Planning, debugging, TDD workflows | `/superpowers:brainstorming` |
| [Commit](commands/commit-commands/) | 3 | Git commit and PR workflows | `/commit`, `/commit-push-pr` |
| [Memory](commands/episodic-memory/) | 2 | Search conversation history | `/search-conversations` |

---

## Agents (267+)

Agents are specialized sub-processes spawned by Claude Code for focused tasks. They're organized into 39 categories:

| Category | Examples |
|----------|---------|
| **Core** | planner, coder, reviewer, tester, researcher |
| **Marketing** | SEO specialists, content strategists |
| **Paid Media** | Google Ads auditor, Meta auditor, budget analyst |
| **Development** | Backend developer, frontend developer, mobile developer |
| **DevOps** | CI/CD engineer, SRE, infrastructure maintainer |
| **Design** | UI designer, UX researcher, brand guardian |
| **Sales** | Deal strategist, outbound strategist, pipeline analyst |
| **Project Management** | Studio producer, project shepherd, experiment tracker |
| **Game Development** | Unity, Unreal, Godot, Roblox specialists |
| **Spatial Computing** | XR developer, visionOS engineer |

See [agents/README.md](agents/README.md) for the full catalog.

---

## Installation

See [GUIDE.md](GUIDE.md) for detailed installation instructions.

```bash
# Quick install — all skills
git clone git@github.com:get-proofpilot/claude-skills-catalog.git
cd claude-skills-catalog
./scripts/install.sh --all --target ~/.claude/skills/

# Install just marketing skills
./scripts/install.sh --categories "01-seo,02-paid-advertising" --target ~/.claude/skills/
```

---

## Skill Sources

| Source | Count | Origin |
|--------|-------|--------|
| ProofPilot Custom | ~85 | Built by the ProofPilot team |
| Everything Claude Code | ~116 | [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) |
| Community | ~10 | stop-slop, nano-banana, k-dense, etc. |
| GSD Framework | 31 | Project management commands |
| SPARC Framework | 25 | Development methodology |
| Ralph | 2 | PRD generation |

---

## Contributing

1. Create a new skill directory in the appropriate category
2. Add a `SKILL.md` with YAML frontmatter (name, description)
3. Test locally by copying to `~/.claude/skills/`
4. Run `./scripts/validate.sh` to check frontmatter
5. Open a PR
