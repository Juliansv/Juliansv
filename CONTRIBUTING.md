# Contributing Guide

Thank you for considering contributing to this project! This guide will help you get started.

---

## Table of Contents

- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Code Quality Standards](#code-quality-standards)
- [Testing](#testing)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [CI/CD Pipeline](#cicd-pipeline)
- [Troubleshooting](#troubleshooting)

---

## Development Setup

### Prerequisites

- **Node.js**: >= 22.21.0
- **pnpm**: >= 9.0.0
- **Git**: Latest version

### Initial Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/Juliansv.git
   cd Juliansv
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

   This will also set up Husky pre-commit hooks automatically.

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Verify setup**
   ```bash
   pnpm validate
   ```
   This runs all checks (lint, typecheck, format, test, build).

---

## Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### 3. Run Local Checks

Before committing, ensure all checks pass:

```bash
# Run all validations
pnpm validate

# Or run individually:
pnpm lint          # ESLint
pnpm typecheck     # TypeScript
pnpm format:check  # Prettier
pnpm test:ci       # Tests with coverage
pnpm build         # Production build
```

### 4. Commit Your Changes

The pre-commit hooks will automatically:

- Format code with Prettier
- Fix ESLint issues
- Prevent commits with errors

```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub.

---

## Code Quality Standards

### ESLint

- We use `next/core-web-vitals` configuration
- No ESLint errors are allowed
- Warnings should be addressed when possible

```bash
pnpm lint
```

### TypeScript

- Strict mode is enabled
- No type errors allowed
- Use proper types, avoid `any`

```bash
pnpm typecheck
```

### Prettier

- Code must be formatted with Prettier
- Configuration: `.prettierrc.json`
- Tabs, semicolons, double quotes

```bash
# Check formatting
pnpm format:check

# Auto-format
pnpm format
```

### File Organization

- Components in `src/components/`
- Pages in `src/app/`
- Static data in `src/data/`
- Utilities in `src/lib/`
- Tests in `src/__tests__/`

---

## Testing

### Writing Tests

We use Vitest + Testing Library for testing.

**Test Files Location**: `src/__tests__/`

**Example Test**:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "@/components/MyComponent";

describe("MyComponent", () => {
	it("renders correctly", () => {
		render(<MyComponent />);
		expect(screen.getByText("Hello")).toBeInTheDocument();
	});
});
```

### Running Tests

```bash
# Watch mode
pnpm test

# With UI
pnpm test:ui

# CI mode with coverage
pnpm test:ci
```

### Testing Guidelines

1. **Data Integrity Tests**: Test data structure and validity
2. **Component Tests**: Test UI component rendering and behavior
3. **Avoid Over-Testing**: Focus on critical functionality
4. **Use Descriptive Names**: Test names should explain what they test

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples

```bash
# New feature
git commit -m "feat: add dark mode toggle"

# Bug fix
git commit -m "fix: correct navigation link on mobile"

# Documentation
git commit -m "docs: update README with deployment steps"

# Refactoring
git commit -m "refactor: simplify data fetching logic"
```

### Commit Message Rules

- Use imperative mood ("add" not "added")
- Keep subject line under 72 characters
- Capitalize subject line
- No period at the end of subject
- Separate subject from body with blank line
- Use body to explain what and why, not how

---

## Pull Request Process

### Before Submitting

1. ✅ All tests pass locally
2. ✅ Code is formatted with Prettier
3. ✅ No ESLint errors
4. ✅ No TypeScript errors
5. ✅ Build succeeds
6. ✅ Added tests for new features
7. ✅ Updated documentation if needed

### PR Title

Follow the same format as commit messages:

```
feat: add user authentication
fix: resolve mobile navigation bug
docs: improve contributing guide
```

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

Describe how you tested your changes

## Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented complex code
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests
- [ ] All tests pass locally
```

### Review Process

1. **Automated Checks**: CI pipeline must pass
2. **Code Review**: At least one approval required
3. **Testing**: Verify changes work as expected
4. **Documentation**: Ensure docs are updated
5. **Merge**: Squash and merge to main

---

## CI/CD Pipeline

### What Runs on Every PR

1. **Code Quality Checks**
   - ESLint
   - TypeScript type checking
   - Prettier formatting check

2. **Build Validation**
   - Next.js production build
   - Bundle size analysis

3. **Tests**
   - Unit and component tests
   - Coverage reporting

4. **Security**
   - Dependency vulnerability scan
   - License compliance check

5. **Dependency Review**
   - New dependency review
   - Vulnerability assessment

### Quality Gates

Your PR must pass these checks:

- ✅ ESLint (no errors)
- ✅ TypeScript (no type errors)
- ✅ Prettier (properly formatted)
- ✅ Build (succeeds without errors)
- ✅ Tests (all passing)
- ✅ Security (no high/critical vulnerabilities)

### Failed Checks?

If CI fails, check the logs:

1. Go to the "Checks" tab in your PR
2. Click on the failed job
3. Review the error messages
4. Fix issues locally
5. Push new commits

---

## Troubleshooting

### Pre-commit Hooks Not Running

```bash
# Reinstall Husky
rm -rf .husky
pnpm prepare
```

### Tests Failing Locally

```bash
# Clear cache and reinstall
rm -rf node_modules .next coverage
pnpm install
pnpm test:ci
```

### TypeScript Errors

```bash
# Check for type errors
pnpm typecheck

# Common fixes:
# 1. Add missing type definitions
# 2. Update tsconfig.json
# 3. Reinstall @types packages
```

### Build Failures

```bash
# Clear Next.js cache
rm -rf .next
pnpm build

# If still failing, check:
# 1. Import paths
# 2. Missing dependencies
# 3. Environment variables
```

### Prettier Conflicts

```bash
# Format entire codebase
pnpm format

# Check formatting
pnpm format:check
```

### pnpm Issues

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall everything
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Getting Help

- **Issues**: Check [GitHub Issues](https://github.com/juliansv/Juliansv/issues)
- **Discussions**: Start a discussion for questions
- **Email**: [juliansv22@gmail.com](mailto:juliansv22@gmail.com)

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

---

Thank you for contributing! 🎉
