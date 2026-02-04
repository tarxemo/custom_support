# Publishing Guide for @tarxemo/customer_support

## Prerequisites

1. **NPM Account**: Create an account at https://www.npmjs.com/signup
2. **Library Built**: Ensure `npm run build` completes successfully
3. **Git Repository**: Initialize git and push to GitHub (recommended)

## Step-by-Step Publishing

### 1. Login to NPM

```bash
npm login
```

Enter your NPM credentials when prompted.

### 2. Verify Package Contents

Before publishing, check what will be included:

```bash
npm pack --dry-run
```

This shows all files that will be published. Verify:
- ✅ `dist/` directory is included
- ✅ `README.md` is included
- ✅ `LICENSE` is included
- ❌ `src/` is NOT included (excluded by .npmignore)
- ❌ `node_modules/` is NOT included

### 3. Test Package Locally (Optional but Recommended)

```bash
# Create a test package
npm pack

# This creates a .tgz file like: tarxemo-customer_support-1.0.0.tgz
# You can install this in a test project:
npm install ./tarxemo-customer_support-1.0.0.tgz
```

### 4. Publish to NPM

For first-time publishing:

```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages (@tarxemo/...).

### 5. Verify Publication

After publishing, check:
1. Visit https://www.npmjs.com/package/@tarxemo/customer_support
2. Verify README displays correctly
3. Try installing in a test project:
   ```bash
   npm install @tarxemo/customer_support
   ```

## Updating the Package

### Version Bumping

Follow semantic versioning (semver):
- **Patch** (1.0.0 → 1.0.1): Bug fixes, no breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backwards compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

```bash
# Bump patch version (e.g., 1.0.0 → 1.0.1)
npm version patch

# Bump minor version (e.g., 1.0.0 → 1.1.0)
npm version minor

# Bump major version (e.g., 1.0.0 → 2.0.0)
npm version major
```

These commands will:
1. Update version in `package.json`
2. Create a git commit
3. Create a git tag

### Update Workflow

1. Make your changes
2. Update `CHANGELOG.md`:
   ```markdown
   ## [1.0.1] - 2026-02-XX
   
   ### Fixed
   - Fixed issue with...
   
   ### Added
   - Added new feature...
   ```
3. Bump version:
   ```bash
   npm version patch -m "Release v%s: Brief description"
   ```
4. Push with tags:
   ```bash
   git push && git push --tags
   ```
5. **If GitHub Actions is set up**: Publishing happens automatically
6. **If manual**: Run `npm publish`

## Setting Up Automated Publishing

### Configure GitHub Actions

1. **Generate NPM Token**:
   - Go to https://www.npmjs.com/settings/[your-username]/tokens
   - Click "Generate New Token"
   - Select "Automation" token type
   - Copy the token (starts with `npm_...`)

2. **Add Secret to GitHub**:
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your NPM token

3. **Push Version Tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

4. **Verify Workflow**:
   - Go to Actions tab in GitHub
   - Watch the "Publish to NPM" workflow run
   - Check https://www.npmjs.com/package/@tarxemo/customer_support

## Integration into Bhumwi Website

### Installation

```bash
cd /Users/ananiamtawa/Projects/bhumwi/bhumwi-website-main
npm install @tarxemo/customer_support
```

### Usage

Update your main layout file (e.g., `_app.tsx` for Next.js):

```tsx
// pages/_app.tsx or app/layout.tsx
import { CustomerSupportWidget } from '@tarxemo/customer_support';
import '@tarxemo/customer_support/dist/customer_support.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      
      <CustomerSupportWidget 
        apiKey={process.env.NEXT_PUBLIC_SITEWISE_API_KEY}
        baseUrl="https://your-sitewise-api.com/api"
        position="bottom-right"
        theme={{
          primaryColor: '#your-brand-color',
          secondaryColor: '#your-secondary-color'
        }}
        welcomeMessage="Welcome to Bhumwi! How can we help you?"
      />
    </>
  );
}
```

### Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SITEWISE_API_KEY=your-sitewise-api-key-here
```

### Testing in Bhumwi

1. Start the dev server: `npm run dev`
2. Open http://localhost:3000
3. Verify:
   - ✅ Chat button appears in bottom-right corner
   - ✅ Clicking opens chat window
   - ✅ Can send messages and receive AI responses
   - ✅ Sources are displayed with links
   - ✅ Responsive on mobile

## Common Issues

### Module Not Found

If you see `Cannot find module '@tarxemo/customer_support'`:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CSS Not Loading

Ensure you're importing the CSS:

```tsx
import '@tarxemo/customer_support/dist/customer_support.css';
```

### API Connection Errors

1. Verify SiteWise backend is running
2. Check API key is correct
3. Verify `baseUrl` points to correct endpoint
4. Check browser console for network errors

### TypeScript Errors

If TypeScript can't find types:

```bash
# Reinstall with types
npm install @tarxemo/customer_support --save
```

## Best Practices

1. **Version Control**: Always tag releases with `git tag v1.x.x`
2. **Changelog**: Keep CHANGELOG.md updated
3. **Testing**: Test locally before publishing
4. **Semantic Versioning**: Follow semver strictly
5. **Breaking Changes**: Clearly document in README and CHANGELOG
6. **Deprecations**: Warn users before removing features

## Quick Reference

```bash
# Login
npm login

# Publish new version
npm version patch
npm publish

# With automation
npm version patch
git push --tags

# Unpublish (within 72 hours only)
npm unpublish @tarxemo/customer_support@1.0.0

# Deprecate a version
npm deprecate @tarxemo/customer_support@1.0.0 "Please upgrade to 1.0.1"

## Support

- **NPM Package**: https://www.npmjs.com/package/@tarxemo/customer_support
- **GitHub**: https://github.com/tarxemo/customer_support
- **Issues**: https://github.com/tarxemo/customer_support/issues
