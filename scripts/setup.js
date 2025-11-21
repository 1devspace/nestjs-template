#!/usr/bin/env node

/**
 * Post-installation setup script for NestJS Template
 * This script helps users customize the template after creating a new project
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function setup() {
  log('\n🚀 Welcome to NestJS Template Setup!\n', 'bright');
  log('This script will help you customize your new project.\n', 'cyan');

  // Get project details
  const projectName = await question(
    '📦 Project name (e.g., my-awesome-app): ',
  );
  const projectDescription = await question('📝 Project description: ');
  const authorName = await question('👤 Author name: ');

  log('\n🔧 Configuring your project...\n', 'yellow');

  // Update package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName || 'my-nestjs-app';
    packageJson.description = projectDescription || '';
    packageJson.author = authorName || '';
    packageJson.version = '0.0.1';
    delete packageJson.scripts.setup; // Remove setup script after first run

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n',
    );
    log('✅ Updated package.json', 'green');
  }

  // Create .env from .env.example
  const envExamplePath = path.join(process.cwd(), '.env.example');
  const envPath = path.join(process.cwd(), '.env');

  if (fs.existsSync(envExamplePath) && !fs.existsSync(envPath)) {
    fs.copyFileSync(envExamplePath, envPath);
    log('✅ Created .env file from .env.example', 'green');
  }

  log('\n📋 Optional Features Setup:\n', 'bright');

  const useDatabase = await question('❓ Will you use MongoDB? (y/n): ');
  const useAuth = await question(
    '❓ Will you use Clerk authentication? (y/n): ',
  );
  const useEmail = await question('❓ Will you use email service? (y/n): ');
  const useSchedule = await question(
    '❓ Will you use task scheduling? (y/n): ',
  );
  const useWebSocket = await question('❓ Will you use WebSockets? (y/n): ');

  log('\n🎯 Recommendations based on your choices:\n', 'cyan');

  if (useDatabase.toLowerCase() !== 'y') {
    log('  • Remove MongooseModule from src/app.module.ts', 'yellow');
    log('  • Run: npm uninstall @nestjs/mongoose mongoose', 'yellow');
  }

  if (useAuth.toLowerCase() !== 'y') {
    log('  • Delete src/modules/auth/ folder', 'yellow');
    log('  • Run: npm uninstall @clerk/backend @clerk/fastify', 'yellow');
  }

  if (useEmail.toLowerCase() !== 'y') {
    log(
      '  • Delete src/modules/mail/ and src/email-templates/ folders',
      'yellow',
    );
    log('  • Remove MailerModule from src/app.module.ts', 'yellow');
    log('  • Run: npm uninstall @nestjs-modules/mailer handlebars', 'yellow');
  }

  if (useSchedule.toLowerCase() !== 'y') {
    log('  • Remove ScheduleModule from src/app.module.ts', 'yellow');
    log('  • Run: npm uninstall @nestjs/schedule', 'yellow');
  }

  if (useWebSocket.toLowerCase() !== 'y') {
    log('  • Remove SocketAdapter class from src/main.ts', 'yellow');
    log(
      '  • Run: npm uninstall @nestjs/platform-socket.io socket.io',
      'yellow',
    );
  }

  log('\n✨ Setup complete!\n', 'green');
  log('📚 Next steps:', 'bright');
  log('  1. Review and update your .env file', 'cyan');
  log('  2. Remove unused features (see recommendations above)', 'cyan');
  log('  3. Run: npm run dev', 'cyan');
  log('  4. Visit: http://localhost:3001/api/docs\n', 'cyan');

  log('📖 For more information, check:', 'bright');
  log('  • README.md - Full documentation', 'blue');
  log('  • SETUP.md - Quick setup guide\n', 'blue');

  log('Happy coding! 🎉\n', 'green');

  rl.close();
}

// Run setup
setup().catch((error) => {
  console.error('Error during setup:', error);
  rl.close();
  process.exit(1);
});
