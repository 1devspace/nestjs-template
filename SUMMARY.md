# NestJS Template - Quick Reference

## 📂 File Structure Overview

```
nestjs-template/
├── src/                          # Source code
│   ├── main.ts                  # Application entry point (Fastify setup)
│   ├── app.module.ts            # Root module (all imports)
│   ├── app.controller.ts        # Root controller
│   ├── modules/                 # Feature modules
│   │   ├── auth/               # Authentication (Clerk)
│   │   │   ├── guards/         # Auth, Admin, SuperAdmin guards
│   │   │   └── services/       # Auth service
│   │   └── mail/               # Email service
│   │       ├── services/       # Mail service
│   │       └── controllers/    # Mail controller
│   ├── database/               # MongoDB models registry
│   ├── email-templates/        # Handlebars email templates
│   └── utils/                  # Utilities
│       ├── Exceptions.filter.ts    # Global error handler
│       └── transform-mongo-id.ts   # MongoDB ID transformer
├── scripts/                    # Utility scripts
│   └── setup.js               # Interactive setup script
├── test/                      # E2E tests
├── .env.example              # Environment template
├── Dockerfile                # Production Docker image
├── docker-compose.yml        # Docker Compose (optional)
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript config
├── nest-cli.json            # Nest CLI config
├── eslint.config.mjs        # ESLint config
├── .prettierrc              # Prettier config
├── README.md                # Main documentation
├── SETUP.md                 # Quick setup guide
├── TEMPLATE_USAGE.md        # How to use as template
└── PUBLISH.md               # Publishing guide
```

## 🎯 Quick Commands

```bash
# Setup
npm run setup          # Interactive setup wizard
npm install           # Install dependencies

# Development
npm run dev           # Start with hot-reload
npm start            # Start without watch
npm run start:debug   # Start with debugger

# Production
npm run build         # Build for production
npm run start:prod    # Start production server

# Code Quality
npm run lint          # Lint code
npm run format        # Format code

# Testing
npm run test          # Unit tests
npm run test:watch    # Tests in watch mode
npm run test:cov      # Test coverage
npm run test:e2e      # End-to-end tests

# Docker
docker build -t app . # Build image
docker-compose up     # Run with Docker Compose
```

## 🔑 Environment Variables Quick Reference

```env
# Required (Always needed)
PORT=3001
NODE_ENV=development
API_URL=http://localhost:3001
BASE_URL=http://localhost:3000

# Database (Optional - MongoDB)
MONGODB_URI=mongodb://localhost:27017/db-name

# Auth (Optional - Clerk)
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_KEY=...
CLERK_ISSUER=https://...

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=email@example.com
EMAIL_PASSWORD=app-password
EMAIL_SENDER=noreply@app.com
FRONTEND_LOGIN_URL=http://localhost:3000/login

# Security (Optional)
ENABLE_CSP=false
```

## 🚀 Three Ways to Use This Template

### 1. Nest CLI (Fastest)

```bash
nest new my-app -p npm -g https://github.com/1devspace/nestjs-template
cd my-app
npm run setup
npm run dev
```

### 2. GitHub Template Button

1. Click "Use this template" on GitHub
2. Create new repository
3. Clone and install

### 3. Manual Clone

```bash
git clone https://github.com/1devspace/nestjs-template.git my-app
cd my-app
rm -rf .git && git init
npm install && npm run setup
```

## 📦 What's Included

| Feature            | Package                      | Removable      |
| ------------------ | ---------------------------- | -------------- |
| **Fastify**        | `@nestjs/platform-fastify`   | ❌ Core        |
| **MongoDB**        | `@nestjs/mongoose`           | ✅ Yes         |
| **Authentication** | `@clerk/backend`             | ✅ Yes         |
| **Email**          | `@nestjs-modules/mailer`     | ✅ Yes         |
| **Scheduling**     | `@nestjs/schedule`           | ✅ Yes         |
| **WebSocket**      | `@nestjs/platform-socket.io` | ✅ Yes         |
| **Swagger**        | `@nestjs/swagger`            | ⚠️ Recommended |
| **Validation**     | `class-validator`            | ⚠️ Recommended |
| **Security**       | `@fastify/helmet`            | ⚠️ Recommended |

## 🎨 Module Structure Pattern

When creating new modules, follow this pattern:

```
modules/
└── feature-name/
    ├── feature.module.ts          # Module definition
    ├── controllers/
    │   └── feature.controller.ts  # HTTP endpoints
    ├── services/
    │   └── feature.service.ts     # Business logic
    ├── dto/
    │   ├── create-feature.dto.ts  # Input validation
    │   └── update-feature.dto.ts
    ├── entities/
    │   └── feature.entity.ts      # Database model
    └── guards/
        └── feature.guard.ts       # Authorization
```

## 🛡️ Using Guards

```typescript
// Require authentication
@UseGuards(AuthGuard)
@Get('protected')
protectedRoute() { }

// Require admin role
@UseGuards(AdminGuard)
@Get('admin')
adminRoute() { }

// Require super admin role
@UseGuards(SuperAdminGuard)
@Get('super-admin')
superAdminRoute() { }

// Get current user
@Get('me')
@UseGuards(AuthGuard)
getCurrentUser(@Request() req) {
  return req.user;
}
```

## 📧 Sending Emails

```typescript
constructor(private mailService: MailService) {}

async sendEmail() {
  await this.mailService.sendEmail(
    'user@example.com',
    'John',
    'Doe'
  );
}
```

## 🗄️ Database Operations

```typescript
// Inject model
constructor(
  @InjectModel(User.name)
  private userModel: Model<User>
) {}

// Create
await this.userModel.create({ name: 'John' });

// Find
await this.userModel.findOne({ email: 'user@example.com' });

// Update
await this.userModel.findByIdAndUpdate(id, { name: 'Jane' });

// Delete
await this.userModel.findByIdAndDelete(id);
```

## 📝 API Documentation (Swagger)

```typescript
@ApiTags('Users') // Group endpoints
@Controller('users')
export class UsersController {
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {}
}
```

Access Swagger at: `http://localhost:3001/api/docs`

## 🎯 Validation DTOs

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe', minLength: 2 })
  @IsString()
  @MinLength(2)
  name: string;
}
```

## 🔄 Scheduled Tasks

```typescript
import { Cron, CronExpression } from '@nestjs/schedule';

@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
handleCron() {
  console.log('Running daily task');
}

@Cron('0 0 * * 0') // Every Sunday at midnight
weeklyTask() {
  console.log('Running weekly task');
}
```

## 🌐 API Endpoints

| Endpoint    | Method | Description     | Auth   |
| ----------- | ------ | --------------- | ------ |
| `/`         | GET    | Welcome message | No     |
| `/health`   | GET    | Health check    | No     |
| `/api/*`    | ALL    | API routes      | Varies |
| `/api/docs` | GET    | Swagger UI      | No     |
| `/public/*` | GET    | Static files    | No     |

## 🐳 Docker Quick Reference

```bash
# Build
docker build -t my-app .

# Run
docker run -p 3001:3001 --env-file .env my-app

# With Docker Compose
docker-compose up -d          # Start in background
docker-compose logs -f        # View logs
docker-compose down           # Stop and remove
```

## 🔧 Remove Unused Features

### MongoDB

```bash
npm uninstall @nestjs/mongoose mongoose
# Remove MongooseModule from app.module.ts
```

### Authentication

```bash
npm uninstall @clerk/backend @clerk/fastify
rm -rf src/modules/auth
```

### Email

```bash
npm uninstall @nestjs-modules/mailer handlebars
rm -rf src/modules/mail src/email-templates
# Remove MailerModule from app.module.ts
```

### Scheduling

```bash
npm uninstall @nestjs/schedule
# Remove ScheduleModule from app.module.ts
```

### WebSocket

```bash
npm uninstall @nestjs/platform-socket.io socket.io
# Remove SocketAdapter from main.ts
```

## 📊 Project Health Checklist

- [ ] All environment variables configured in `.env`
- [ ] Removed unused features
- [ ] Updated `package.json` with project details
- [ ] Swagger docs accessible and working
- [ ] Health check endpoint responding
- [ ] Tests passing (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Application starts successfully (`npm run dev`)
- [ ] Docker build succeeds (if using)
- [ ] Documentation updated for your project

## 🆘 Common Issues

| Problem                  | Solution                                         |
| ------------------------ | ------------------------------------------------ |
| Port already in use      | Change `PORT` in `.env`                          |
| MongoDB connection error | Check `MONGODB_URI` and MongoDB running          |
| Email not sending        | Verify SMTP settings, use app password for Gmail |
| Auth errors              | Check Clerk keys and API_URL                     |
| Module not found         | Run `npm install`                                |
| TypeScript errors        | Run `npm run build` to see details               |

## 📚 Documentation Files

- **README.md** - Complete documentation (you are here)
- **SETUP.md** - Quick 5-minute setup guide
- **TEMPLATE_USAGE.md** - How to use this as a template
- **PUBLISH.md** - How to publish to GitHub
- **CONTRIBUTING.md** - Contribution guidelines
- **LICENSE** - MIT License

## 🎓 Learning Resources

- [NestJS Docs](https://docs.nestjs.com)
- [Fastify Docs](https://www.fastify.io)
- [Mongoose Docs](https://mongoosejs.com)
- [Clerk Docs](https://clerk.com/docs)
- [Swagger/OpenAPI](https://swagger.io/docs/)

## 💡 Pro Tips

1. **Use Swagger**: Always test APIs at `/api/docs`
2. **Environment First**: Configure `.env` before coding
3. **DTOs Always**: Validate all inputs with DTOs
4. **Guard Your Routes**: Use guards for protected endpoints
5. **Error Handling**: Global filter handles all errors
6. **Type Everything**: Leverage TypeScript fully
7. **Test Early**: Write tests as you code
8. **Document APIs**: Use Swagger decorators
9. **Security First**: Never commit `.env` file
10. **Keep It Updated**: Regularly update dependencies

---

**This is your starting point. Customize, build, and ship! 🚀**
