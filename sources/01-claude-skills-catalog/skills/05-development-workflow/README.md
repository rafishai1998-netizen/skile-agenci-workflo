# Development Workflow

> TDD, pair programming, code review, deployment, Docker, database migrations, API design, security review, E2E testing, and code quality practices.

## When to Use These Skills
- Starting a new feature with test-driven development
- Pair programming through a complex implementation
- Reviewing code for quality, security, or architectural concerns
- Setting up deployment pipelines, Docker configs, or database migrations

## Quick Reference

| Skill | Difficulty | Trigger Phrase | Best For |
|-------|-----------|----------------|----------|
| pair-programming | Beginner | `/pair-programming` | Guided collaborative development |
| tdd-workflow | Intermediate | `/tdd-workflow` | Red-green-refactor test-first development |
| simplify | Beginner | `/simplify` | Reducing code complexity |
| search-first | Beginner | `/search-first` | Finding existing solutions before writing new code |
| codebase-onboarding | Beginner | `/codebase-onboarding` | Understanding a new codebase quickly |
| blueprint | Intermediate | `/blueprint` | Feature planning and implementation blueprint |
| coding-standards | Beginner | `/coding-standards` | Enforcing consistent code style and conventions |
| api-design | Intermediate | `/api-design` | RESTful and GraphQL API design patterns |
| deployment-patterns | Intermediate | `/deployment-patterns` | CI/CD and deployment strategy |
| database-migrations | Intermediate | `/database-migrations` | Safe schema migration workflows |
| docker-patterns | Intermediate | `/docker-patterns` | Dockerfile and docker-compose best practices |
| security-review | Advanced | `/security-review` | Security vulnerability analysis |
| e2e-testing | Intermediate | `/e2e-testing` | End-to-end test setup and execution |
| verification-loop | Intermediate | `/verification-loop` | Iterative verification and quality gates |
| plankton-code-quality | Intermediate | `/plankton-code-quality` | Automated code quality scoring |
| architecture-decision-records | Beginner | `/architecture-decision-records` | Documenting architectural decisions (ADRs) |

## Start Here
If you're new to this category, start with **pair-programming** for guided development or **tdd-workflow** for test-first methodology. Use **codebase-onboarding** when joining an unfamiliar project, and **search-first** before writing anything new.

## Skill Relationships
**search-first** and **codebase-onboarding** are discovery skills that should be used before implementation begins. **blueprint** creates the implementation plan that **pair-programming** and **tdd-workflow** execute against. **tdd-workflow** produces code that feeds into **verification-loop** and **e2e-testing** for quality assurance. **security-review** and **plankton-code-quality** are review skills that validate output from any implementation skill. **api-design**, **database-migrations**, **docker-patterns**, and **deployment-patterns** are infrastructure skills used during specific phases of a project. **architecture-decision-records** documents the "why" behind choices made using any of these skills. **simplify** is a refactoring pass applicable after any implementation.
