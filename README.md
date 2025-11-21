# NestJS Production-Ready Template

A modern, production-ready NestJS template with Fastify, MongoDB, authentication, email support, and comprehensive security features.

## 🎯 Quick Start - Use This Template

### Method 1: Using Nest CLI (Recommended)

```bash
# Create a new project using this template
nest new my-app -p npm -g https://github.com/1devspace/nestjs-template

# Navigate to your project
cd my-app

# Run the interactive setup (optional)
npm run setup

# Start developing
npm run dev
```

### Method 2: GitHub Template Button

1. Click the **"Use this template"** button at the top of this repository
2. Create your new repository
3. Clone your new repository:

```bash
git clone https://github.com/1devspace/your-new-repo.git
cd your-new-repo
npm install
npm run setup  # Interactive setup
npm run dev
```

### Method 3: Manual Clone

```bash
# Clone this repository
git clone https://github.com/1devspace/nestjs-template.git my-app
cd my-app

# Remove git history and start fresh
rm -rf .git
git init
git add .
git commit -m "Initial commit"

# Install and setup
npm install
npm run setup  # Interactive setup
npm run dev
```

## 🚀 Features

- **⚡ Fastify** - High-performance web framework (faster than Express)
- **🔐 Authentication** - Ready-to-use Clerk authentication with role-based guards
- **📧 Email Service** - Mailer module with Handlebars templates
- **🗄️ MongoDB** - Mongoose integration (easily removable if not needed)
- **📝 API Documentation** - Swagger/OpenAPI documentation
- **🛡️ Security** - Helmet, CORS, validation pipes
- **🎨 Code Quality** - ESLint, Prettier, TypeScript
- **📦 File Uploads** - Multipart/form-data support
- **🔌 WebSocket Support** - Socket.IO integration
- **⏰ Task Scheduling** - Cron jobs and intervals support
- **🐳 Docker** - Production-ready Dockerfile
- **🧪 Testing** - Jest setup for unit and e2e tests

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn or bun
- MongoDB (if using database features)
- Clerk account (if using authentication features)

## 🛠️ Manual Installation

If you didn't use the quick start methods above:

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Interactive Setup (Optional)

```bash
npm run setup
```

This will guide you through:

- Setting project name, description, and author
- Creating `.env` file from template
- Identifying which features you'll use

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Required
PORT=3001
NODE_ENV=development
API_URL=http://localhost:3001
BASE_URL=http://localhost:3000

# Optional - Remove if not using MongoDB
MONGODB_URI=mongodb://localhost:27017/your-database-name

# Optional - Remove if not using Clerk
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_JWT_KEY=your_clerk_jwt_key

# Optional - Remove if not using email
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_SENDER=noreply@yourapp.com
```

## 🚦 Running the Application

```bash
# Development mode with watch
npm run dev

# Development mode
npm start

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The API will be available at:

- **API**: http://localhost:3001/api
- **Swagger Docs**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/health

## 📚 Project Structure

```
src/
├── app.module.ts              # Root module
├── main.ts                    # Application entry point
├── app.controller.ts          # Root controller
├── database/
│   └── index.ts              # MongoDB models registry
├── email-templates/
│   └── email.hbs             # Email templates (Handlebars)
├── modules/
│   ├── auth/                 # Authentication module
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   └── guards/
│   │       ├── auth.guard.ts        # Basic auth guard
│   │       ├── admin.guard.ts       # Admin role guard
│   │       └── super-admin.guard.ts # Super admin guard
│   └── mail/                 # Email module
│       ├── services/
│       │   └── mail.service.ts
│       └── controllers/
│           └── mail.controller.ts
└── utils/
    ├── Exceptions.filter.ts  # Global exception filter
    └── transform-mongo-id.ts # MongoDB ObjectId transformer
```

## 🔧 Configuration

### Remove Unused Features

This template includes several optional features that can be easily removed:

#### Remove MongoDB

1. Remove from `app.module.ts`:

```typescript
// Remove this import block
MongooseModule.forRootAsync({ ... })
```

2. Remove dependencies:

```bash
npm uninstall @nestjs/mongoose mongoose
```

#### Remove Authentication (Clerk)

1. Delete `src/modules/auth/` folder
2. Remove from `package.json`:

```bash
npm uninstall @clerk/backend @clerk/fastify
```

#### Remove Email Service

1. Delete `src/modules/mail/` folder
2. Delete `src/email-templates/` folder
3. Remove from `app.module.ts`:

```typescript
// Remove MailerModule.forRootAsync({ ... })
```

4. Remove dependencies:

```bash
npm uninstall @nestjs-modules/mailer handlebars
```

#### Remove Task Scheduling

1. Remove from `app.module.ts`:

```typescript
// Remove ScheduleModule.forRoot()
```

2. Remove dependency:

```bash
npm uninstall @nestjs/schedule
```

#### Remove WebSocket Support

1. Remove from `main.ts`:

```typescript
// Remove SocketAdapter class
```

2. Remove dependencies:

```bash
npm uninstall @nestjs/platform-socket.io socket.io
```

## 🛡️ Authentication & Authorization

### Using Guards

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { AdminGuard } from './modules/auth/guards/admin.guard';

@Controller('protected')
export class ProtectedController {
  // Requires authentication
  @Get('user')
  @UseGuards(AuthGuard)
  getUserData() {
    return { message: 'Protected route' };
  }

  // Requires admin role
  @Get('admin')
  @UseGuards(AdminGuard)
  getAdminData() {
    return { message: 'Admin only route' };
  }
}
```

### Getting Current User

```typescript
import { Request } from '@nestjs/common';

@Get('profile')
@UseGuards(AuthGuard)
getProfile(@Request() req) {
  return req.user; // User data from JWT
}
```

## 📧 Sending Emails

```typescript
import { MailService } from './modules/mail/services/mail.service';

constructor(private mailService: MailService) {}

async sendWelcomeEmail() {
  await this.mailService.sendEmail(
    'user@example.com',
    'John',
    'Doe'
  );
}
```

### Customizing Email Templates

Edit `src/email-templates/email.hbs` with your HTML content. You can use Handlebars variables:

```handlebars
<h1>Hello {{firstName}} {{lastName}}!</h1>
<p>Your email is: {{email}}</p>
<a href='{{actionUrl}}'>Click here</a>
```

## 🗃️ Database (MongoDB)

### Creating Models

1. Create your schema:

```typescript
// src/database/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

2. Register in `src/database/index.ts`:

```typescript
import { User, UserSchema } from './schemas/user.schema';

export const MONGOOSE_MODELS = [{ name: User.name, schema: UserSchema }];
```

3. Use in your module:

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_MODELS } from 'src/database';

@Module({
  imports: [MongooseModule.forFeature(MONGOOSE_MODELS)],
})
export class YourModule {}
```

## 🐳 Docker

### Build and Run

```bash
# Build the image
docker build -t nestjs-app .

# Run the container
docker run -p 3001:3001 --env-file .env nestjs-app
```

### Docker Compose (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3001:3001'
    environment:
      - NODE_ENV=production
      - PORT=3001
    env_file:
      - .env

  mongodb:
    image: mongo:latest
    ports:
      - '27017:27017'
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 📝 Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## 🔒 Security Features

- **Helmet** - Sets security HTTP headers
- **CORS** - Configurable cross-origin resource sharing
- **Validation** - Class-validator for DTO validation
- **Rate Limiting** - (Add if needed)
- **JWT Authentication** - Token-based auth with Clerk
- **Role-Based Access Control** - Admin and Super Admin guards

## 📖 API Documentation

Swagger documentation is automatically generated and available at:

```
http://localhost:3001/api/docs
```

### Adding Swagger Decorators

```typescript
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  findAll() {
    return [];
  }
}
```

## 🚀 Deployment

### Environment Variables

Ensure all required environment variables are set in production:

- Set `NODE_ENV=production`
- Set `ENABLE_CSP=true` for Content Security Policy
- Use strong secrets for authentication keys
- Configure proper CORS origins

### Build for Production

```bash
npm run build
npm run start:prod
```

### Deployment Platforms

- **Heroku**: Add `Procfile`
- **AWS**: Use Docker with ECS or Elastic Beanstalk
- **DigitalOcean**: Use App Platform or Droplets
- **Vercel/Netlify**: Use with serverless adapters
- **Railway**: Direct deployment support

## 📤 Publishing This Template

### For First-Time Setup on GitHub

1. **Create a new repository on GitHub** (without initializing)

2. **Update package.json** with your repository URL:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/1devspace/nestjs-template.git"
  }
}
```

3. **Push to GitHub**:

```bash
git remote add origin https://github.com/1devspace/nestjs-template.git
git branch -M main
git push -u origin main
```

4. **Enable as Template Repository**:
   - Go to your repository on GitHub
   - Click **Settings**
   - Check ✅ **Template repository** (under "General")

5. **Share with others**:

```bash
# Others can now use it with Nest CLI
nest new my-app -p npm -g https://github.com/1devspace/nestjs-template
```

For detailed usage instructions, see [TEMPLATE_USAGE.md](TEMPLATE_USAGE.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The progressive Node.js framework
- [Fastify](https://www.fastify.io/) - Fast and low overhead web framework
- [Clerk](https://clerk.com/) - Authentication and user management
- [MongoDB](https://www.mongodb.com/) - NoSQL database

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the [NestJS documentation](https://docs.nestjs.com)
- Join the [NestJS Discord](https://discord.gg/G7Qnnhy)

---

**Happy Coding! 🎉**
