# Claude Flow V3

> Claude Flow V3 architecture skills covering domain-driven design, security, CLI tooling, MCP optimization, memory unification, performance tuning, and swarm coordination.

## When to Use These Skills
- Working on the claude-flow project architecture or implementation
- Optimizing MCP server performance or memory systems
- Implementing domain-driven design patterns in the claude-flow codebase
- Configuring swarm coordination or security for claude-flow deployments

## Quick Reference

| Skill | Difficulty | Trigger Phrase | Best For |
|-------|-----------|----------------|----------|
| claude-flow-ddd | Advanced | `/claude-flow-ddd` | Domain-driven design for claude-flow |
| claude-flow-security | Advanced | `/claude-flow-security` | Security architecture and hardening |
| claude-flow-cli | Intermediate | `/claude-flow-cli` | CLI tool development and patterns |
| claude-flow-mcp | Advanced | `/claude-flow-mcp` | MCP server optimization |
| claude-flow-memory | Advanced | `/claude-flow-memory` | Unified memory architecture |
| claude-flow-performance | Advanced | `/claude-flow-performance` | Performance profiling and optimization |
| claude-flow-swarm | Advanced | `/claude-flow-swarm` | Swarm coordination internals |
| claude-flow-testing | Intermediate | `/claude-flow-testing` | Testing strategies for claude-flow |
| claude-flow-architecture | Advanced | `/claude-flow-architecture` | Overall system architecture decisions |

## Start Here
These are implementation skills specific to the claude-flow project. If you are contributing to claude-flow, start with **claude-flow-architecture** for a system overview, then dive into the specific subsystem you are working on.

## Skill Relationships
**claude-flow-architecture** provides the high-level system overview that contextualizes all other skills. **claude-flow-ddd** defines the bounded contexts and domain model that the codebase follows. **claude-flow-cli** handles the user-facing command interface, which invokes subsystems covered by **claude-flow-mcp** (server optimization), **claude-flow-memory** (unified memory), and **claude-flow-swarm** (multi-agent coordination). **claude-flow-security** is a cross-cutting concern that applies to all subsystems. **claude-flow-performance** profiles and optimizes the entire stack. **claude-flow-testing** provides testing strategies that validate changes across all subsystems.
