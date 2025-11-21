# How to Use This Template

This guide explains different ways to use this NestJS template to kickstart your new projects.

## 📋 Table of Contents

- [Method 1: Nest CLI (Recommended)](#method-1-nest-cli-recommended)
- [Method 2: GitHub Template](#method-2-github-template)
- [Method 3: Manual Clone](#method-3-manual-clone)
- [After Installation](#after-installation)
- [Publishing Your Own Template](#publishing-your-own-template)

---

## Method 1: Nest CLI (Recommended)

The fastest way to create a new project using this template:

```bash
# Install Nest CLI globally (if you haven't already)
npm install -g @nestjs/cli

# Create new project from this template
nest new my-awesome-app -p npm -g https://github.com/1devspace/nestjs-template

# Navigate to your project
cd my-awesome-app

# Run interactive setup
npm run setup

# Start development server
npm run dev
```

### Options:

- `-p npm` - Use npm (you can also use `yarn` or `pnpm`)
- `-g <url>` - Git repository URL to use as template
- `--skip-git` - Skip git initialization
- `--skip-install` - Skip package installation

**Example with options:**

```bash
nest new my-app -p yarn -g https://github.com/1devspace/nestjs-template --skip-git
```

---

## Method 2: GitHub Template

Use GitHub's template feature for a clean start:

### Step 1: Create Repository from Template

1. Go to: https://github.com/1devspace/nestjs-template
2. Click the green **"Use this template"** button
3. Choose **"Create a new repository"**
4. Fill in:
   - Repository name
   - Description (optional)
   - Public or Private
5. Click **"Create repository from template"**

### Step 2: Clone Your New Repository

```bash
# Clone your new repository
git clone https://github.com/1devspace/your-new-repo.git
cd your-new-repo

# Install dependencies
npm install

# Run interactive setup
npm run setup

# Start developing
npm run dev
```

### Advantages:

- ✅ Clean git history (starts fresh)
- ✅ No connection to original template
- ✅ Easy to maintain and update
- ✅ GitHub automatically sets up repository

---

## Method 3: Manual Clone

For complete control over the process:

```bash
# Clone the template repository
git clone https://github.com/1devspace/nestjs-template.git my-project

# Navigate to directory
cd my-project

# Remove existing git history
rm -rf .git

# Initialize new git repository
git init

# Install dependencies
npm install

# Run setup script
npm run setup

# Create initial commit
git add .
git commit -m "Initial commit from nestjs-template"

# Add your remote repository (if you have one)
git remote add origin https://github.com/1devspace/your-new-repo.git
git branch -M main
git push -u origin main
```

---

## After Installation

### 1. Run Interactive Setup

The setup script will help you configure your project:

```bash
npm run setup
```

This will:

- ✅ Update `package.json` with your project details
- ✅ Create `.env` file from `.env.example`
- ✅ Ask which features you plan to use
- ✅ Provide recommendations for unused features

### 2. Configure Environment Variables

Edit the `.env` file created by the setup:

```env
# Required
PORT=3001
NODE_ENV=development
API_URL=http://localhost:3001
BASE_URL=http://localhost:3000

# Optional - Configure only what you need
MONGODB_URI=mongodb://localhost:27017/your-db-name
CLERK_SECRET_KEY=your_clerk_secret_key
EMAIL_HOST=smtp.gmail.com
# ... etc
```

### 3. Remove Unused Features

Based on your needs, remove features you don't need:

**Don't need MongoDB?**

```bash
npm uninstall @nestjs/mongoose mongoose
# Then remove MongooseModule from src/app.module.ts
```

**Don't need Authentication?**

```bash
npm uninstall @clerk/backend @clerk/fastify
# Then delete src/modules/auth/
```

**Don't need Email?**

```bash
npm uninstall @nestjs-modules/mailer handlebars
# Then delete src/modules/mail/ and src/email-templates/
```

See [SETUP.md](SETUP.md) for detailed instructions.

### 4. Start Development

```bash
# Development mode with hot-reload
npm run dev

# Access your API
# - API: http://localhost:3001/api
# - Swagger: http://localhost:3001/api/docs
# - Health: http://localhost:3001/health
```

---

## Publishing Your Own Template

Want to create your own customized template for your team or organization?

### 1. Fork or Clone This Template

```bash
git clone https://github.com/1devspace/nestjs-template.git my-custom-template
cd my-custom-template
```

### 2. Customize It

- Add your preferred packages
- Configure default settings
- Add custom modules
- Update branding and documentation

### 3. Update package.json

```json
{
  "name": "your-custom-nestjs-template",
  "description": "Your custom template description",
  "author": "Your Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/1devspace/your-template.git"
  }
}
```

### 4. Push to GitHub

```bash
git add .
git commit -m "Create custom NestJS template"
git remote add origin https://github.com/1devspace/your-template.git
git push -u origin main
```

### 5. Enable Template Repository

1. Go to your repository on GitHub
2. Click **Settings**
3. Check ✅ **Template repository**

### 6. Share with Your Team

Now your team can use it:

```bash
nest new new-project -p npm -g https://github.com/1devspace/your-template
```

---

## Best Practices

### For Template Users

1. **Run setup first**: Always run `npm run setup` after installation
2. **Review features**: Remove what you don't need early
3. **Update dependencies**: Check for updates regularly
4. **Customize**: Make it yours - change branding, add features
5. **Git history**: Keep clean commits from the start

### For Template Maintainers

1. **Keep updated**: Regularly update dependencies
2. **Document changes**: Maintain clear CHANGELOG
3. **Test thoroughly**: Ensure all features work out of the box
4. **Stay minimal**: Don't add too many opinions
5. **Examples**: Provide good examples and documentation

---

## Troubleshooting

### "nest: command not found"

```bash
# Install Nest CLI globally
npm install -g @nestjs/cli
```

### "Permission denied" when running setup

```bash
# Make setup script executable
chmod +x scripts/setup.js
```

### Git clone fails

```bash
# Use HTTPS instead of SSH
git clone https://github.com/username/repo.git

# Or use GitHub CLI
gh repo clone username/repo
```

### Dependencies installation fails

```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## Quick Reference

### Nest CLI with Template

```bash
# Basic
nest new my-app -g https://github.com/username/template

# With npm
nest new my-app -p npm -g https://github.com/username/template

# With yarn
nest new my-app -p yarn -g https://github.com/username/template

# Skip git init
nest new my-app -g https://github.com/username/template --skip-git

# Skip install
nest new my-app -g https://github.com/username/template --skip-install
```

### GitHub CLI

```bash
# Create from template
gh repo create my-app --template username/template --public

# Clone and install
gh repo clone username/my-app
cd my-app
npm install
npm run setup
```

---

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Nest CLI Documentation](https://docs.nestjs.com/cli/overview)
- [GitHub Templates](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
- [This Template's README](README.md)
- [Quick Setup Guide](SETUP.md)

---

## Support

Need help?

- 📖 Check [README.md](README.md) for detailed documentation
- 🚀 See [SETUP.md](SETUP.md) for quick setup guide
- 🐛 [Open an issue](https://github.com/1devspace/nestjs-template/issues)
- 💬 [Start a discussion](https://github.com/1devspace/nestjs-template/discussions)

---

**Happy Coding! 🎉**
