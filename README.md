# Hi, I'm Julian.

I'm a web developer.

[![CI](https://github.com/juliansv/Juliansv/actions/workflows/ci.yml/badge.svg)](https://github.com/juliansv/Juliansv/actions/workflows/ci.yml)
[![Lighthouse](https://github.com/juliansv/Juliansv/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/juliansv/Juliansv/actions/workflows/lighthouse.yml)

Visit my [personal website](https://www.julisv.com) to learn more about me and my projects.

Email me at [juliansv22@gmail.com](mailto:juliansv22@gmail.com)

---

## Tech Stack

- **Framework**: Next.js 15.3.6
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Package Manager**: pnpm
- **Deployment**: Vercel
- **Testing**: Vitest + Testing Library
- **Code Quality**: ESLint + Prettier + Husky

---

## Getting Started

### Prerequisites

- Node.js >= 22.21.0
- pnpm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/juliansv/Juliansv.git
cd Juliansv

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

---

## Available Scripts

### Development

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm analyze` - Analyze bundle size

### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm validate` - Run all checks (lint, typecheck, format, test, build)

### Testing

- `pnpm test` - Run tests in watch mode
- `pnpm test:ui` - Run tests with UI
- `pnpm test:ci` - Run tests with coverage (CI mode)
- `pnpm test:watch` - Run tests in watch mode

---

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Workflows

#### CI Pipeline (`ci.yml`)

Runs on every push and PR:

1. **Code Quality** - ESLint, TypeScript, Prettier checks
2. **Build** - Next.js production build with caching
3. **Tests** - Vitest with coverage reporting
4. **Security** - Dependency audit and license checks

#### Lighthouse (`lighthouse.yml`)

Runs on pushes to `main` and `develop`:

- Performance audits on Vercel preview deployments
- Enforces minimum scores:
  - Performance: 90
  - Accessibility: 95
  - Best Practices: 95
  - SEO: 100

#### Dependency Review (`dependency-review.yml`)

Runs on pull requests:

- Reviews dependency changes
- Blocks moderate+ severity vulnerabilities
- Prevents GPL/LGPL licenses

---

## Pre-commit Hooks

This project uses Husky + lint-staged to run checks before commits:

- Auto-format code with Prettier
- Run ESLint with auto-fix
- Ensure code quality before pushing

---

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable React components
│   └── ui/          # UI components (shadcn/ui)
├── data/            # Static data (projects, experience, etc.)
├── features/        # Feature-specific components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── providers/       # React context providers
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run validation: `pnpm validate`
5. Commit: `git commit -m "feat: add amazing feature"`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

---

## License

This project is private and proprietary.

---

## Contact

- **Website**: [julisv.com](https://www.julisv.com)
- **Email**: [juliansv22@gmail.com](mailto:juliansv22@gmail.com)
- **LinkedIn**: [Julian Suarez Vivas](https://www.linkedin.com/in/juliansuarezvivas/)
- **GitHub**: [@juliansv](https://github.com/juliansv)
