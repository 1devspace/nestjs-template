# Publishing Your Template to GitHub

This guide walks you through publishing this template to GitHub and making it available for others to use with the Nest CLI.

## 📦 Prerequisites

- Git installed on your machine
- A GitHub account
- Repository with your customized template ready

## 🚀 Step-by-Step Guide

### Step 1: Prepare Your Template

1. **Customize the template** with your preferences
2. **Test everything works**:

```bash
npm install
npm run dev
npm run test
npm run build
```

3. **Update documentation**:
   - [ ] Update `package.json` with your details
   - [ ] Update `README.md`
   - [ ] Update `LICENSE` if needed
   - [ ] Remove or update example code

### Step 2: Update Repository Information

Edit `package.json`:

```json
{
  "name": "your-nestjs-template",
  "version": "1.0.0",
  "description": "Your custom NestJS template",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/1devspace/your-template-repo.git"
  },
  "bugs": {
    "url": "https://github.com/1devspace/your-template-repo/issues"
  },
  "homepage": "https://github.com/1devspace/your-template-repo#readme"
}
```

### Step 3: Create GitHub Repository

#### Option A: Via GitHub Website

1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `nestjs-template` (or your preferred name)
   - **Description**: Brief description of your template
   - **Visibility**: Public (so others can use it)
3. **Don't** initialize with README, .gitignore, or license (you already have these)
4. Click **"Create repository"**

#### Option B: Via GitHub CLI

```bash
# Install GitHub CLI if you haven't
# macOS: brew install gh
# Windows: winget install GitHub.cli

# Login
gh auth login

# Create repository
gh repo create your-nestjs-template --public --source=. --remote=origin --push
```

### Step 4: Push Your Code

If you created the repo via website:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: NestJS production template"

# Add remote (replace with your URL)
git remote add origin https://github.com/1devspace/your-template-repo.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 5: Enable Template Repository

1. Go to your repository on GitHub: `https://github.com/1devspace/your-template-repo`
2. Click **Settings** tab
3. Scroll to **"Template repository"** section
4. Check ✅ **"Template repository"**
5. Save changes

### Step 6: Add Topics/Tags (Optional but Recommended)

1. On your repository homepage, click ⚙️ next to "About"
2. Add topics:
   - `nestjs`
   - `template`
   - `starter`
   - `typescript`
   - `fastify`
   - `mongodb`
   - `docker`
3. Click **"Save changes"**

### Step 7: Create a Release (Optional)

```bash
# Tag the current version
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push the tag
git push origin v1.0.0
```

Or via GitHub:

1. Go to **Releases** → **"Create a new release"**
2. Tag: `v1.0.0`
3. Title: `v1.0.0 - Initial Release`
4. Description: List features and changes
5. Click **"Publish release"**

## ✅ Verify Your Template Works

Test that others can use it:

```bash
# In a different directory
cd /tmp

# Test with Nest CLI
nest new test-app -p npm -g https://github.com/1devspace/your-template-repo

# Verify it works
cd test-app
npm run dev
```

## 📢 Share Your Template

### Update Your Repository README

Add a badge at the top of your README:

```markdown
[![Use this template](https://img.shields.io/badge/Use%20this-Template-brightgreen?style=for-the-badge)](https://github.com/1devspace/your-template-repo/generate)
```

### Share the Usage Command

Tell others they can use it with:

```bash
nest new my-app -p npm -g https://github.com/1devspace/your-template-repo
```

### Create GitHub Template Button Link

Share this link for one-click template creation:

```
https://github.com/1devspace/your-template-repo/generate
```

## 🔄 Updating Your Template

When you make improvements:

```bash
# Make your changes
git add .
git commit -m "feat: add new feature"
git push

# Create a new release
git tag -a v1.1.0 -m "Version 1.1.0"
git push origin v1.1.0
```

## 📋 Maintenance Checklist

Regular maintenance tasks:

- [ ] Update dependencies monthly
- [ ] Test with latest NestJS version
- [ ] Update documentation
- [ ] Review and merge pull requests
- [ ] Respond to issues
- [ ] Keep security advisories addressed

## 🔐 Security Best Practices

1. **Never commit secrets**:
   - Ensure `.env` is in `.gitignore`
   - Remove any API keys or passwords
   - Use `.env.example` with placeholder values

2. **Review before pushing**:

```bash
# Check what you're committing
git status
git diff

# Check for secrets
git secrets --scan
```

3. **Enable security features**:
   - Go to Settings → Security
   - Enable Dependabot alerts
   - Enable security advisories

## 📊 Analytics and Insights

Track your template usage:

1. Go to **Insights** → **Traffic**
   - See clones and visits
   - Monitor popularity

2. Check **Dependency graph**
   - View dependencies
   - Monitor security alerts

## 🆘 Troubleshooting

### "Repository not found" when using template

- Ensure repository is **public**
- Check the URL is correct
- Verify you've pushed to GitHub

### Template not showing "Use this template" button

- Repository must be public
- Must enable "Template repository" in settings
- Refresh the page

### Others can't clone with Nest CLI

- Verify URL: `https://github.com/username/repo.git`
- Ensure repository is public
- Check repository exists

## 📚 Resources

- [GitHub Templates Documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)
- [Nest CLI Documentation](https://docs.nestjs.com/cli/overview)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub CLI Documentation](https://cli.github.com/manual/)

## 💡 Tips

1. **Good README**: Make it comprehensive with examples
2. **Clear License**: Choose appropriate license (MIT recommended)
3. **Active Maintenance**: Respond to issues and PRs
4. **Version Tags**: Use semantic versioning
5. **CHANGELOG**: Keep track of changes
6. **Examples**: Provide working examples
7. **Tests**: Include test examples
8. **CI/CD**: Add GitHub Actions (optional)

## 🎉 Success!

Your template is now published and ready to use!

Share it with:

- Your team
- The NestJS community
- On Twitter/Reddit/Dev.to
- In your portfolio

---

**Need help?** Open an issue or check the [TEMPLATE_USAGE.md](TEMPLATE_USAGE.md) guide.
