# Quick Setup Guide

This guide will help you get started with the NestJS template in minutes.

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` and set the required values:

```env
PORT=3001
NODE_ENV=development
API_URL=http://localhost:3001
BASE_URL=http://localhost:3000
```

### Step 3: Start the Application

```bash
npm run dev
```

That's it! Your API is now running at:

- **API**: http://localhost:3001/api
- **Swagger Docs**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/health

## 📦 What's Included?

### ✅ Already Set Up

- ✅ Fastify server with performance optimizations
- ✅ Swagger API documentation
- ✅ CORS and security headers (Helmet)
- ✅ Global exception handling
- ✅ Validation pipes
- ✅ File upload support
- ✅ Static file serving

### 🔧 Optional Features (Configure as Needed)

#### MongoDB

**When to use:** If you need a database

1. Install MongoDB locally or use MongoDB Atlas
2. Set in `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/your-db-name
```

**Don't need it?** Remove from `app.module.ts` and uninstall:

```bash
npm uninstall @nestjs/mongoose mongoose
```

#### Authentication (Clerk)

**When to use:** If you need user authentication

1. Create a Clerk account at https://clerk.com
2. Get your keys from Clerk Dashboard
3. Set in `.env`:

```env
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_KEY=your_jwt_key
```

**Don't need it?** Delete `src/modules/auth/` and uninstall:

```bash
npm uninstall @clerk/backend @clerk/fastify
```

#### Email Service

**When to use:** If you need to send emails

1. Get SMTP credentials (Gmail, SendGrid, etc.)
2. For Gmail: Use App Password (not regular password)
3. Set in `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_SENDER=noreply@yourapp.com
```

**Don't need it?** Delete `src/modules/mail/` and `src/email-templates/`, then uninstall:

```bash
npm uninstall @nestjs-modules/mailer handlebars
```

#### Task Scheduling

**When to use:** If you need cron jobs or scheduled tasks

Already included! Just use `@Cron()` decorator in your services.

**Don't need it?** Remove from `app.module.ts` and uninstall:

```bash
npm uninstall @nestjs/schedule
```

#### WebSocket Support

**When to use:** If you need real-time features

Already included! Socket.IO adapter is ready in `main.ts`.

**Don't need it?** Remove `SocketAdapter` from `main.ts` and uninstall:

```bash
npm uninstall @nestjs/platform-socket.io socket.io
```

## 🎯 Next Steps

### 1. Create Your First Module

```bash
# Generate a new module
nest g module modules/users
nest g controller modules/users/controllers/users
nest g service modules/users/services/users
```

### 2. Add Your First Endpoint

Edit `src/modules/users/controllers/users.controller.ts`:

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return { users: [] };
  }
}
```

### 3. View in Swagger

Visit http://localhost:3001/api/docs to see your new endpoint!

### 4. Add Database Models (If Using MongoDB)

Create a schema in `src/database/schemas/user.schema.ts`:

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

Register in `src/database/index.ts`:

```typescript
import { User, UserSchema } from './schemas/user.schema';

export const MONGOOSE_MODELS = [{ name: User.name, schema: UserSchema }];
```

## 🛠️ Common Tasks

### Add a Protected Route

```typescript
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './modules/auth/guards/auth.guard';

@Get('protected')
@UseGuards(AuthGuard)
getProtectedData() {
  return { message: 'This is protected' };
}
```

### Send an Email

```typescript
constructor(private mailService: MailService) {}

async sendWelcome() {
  await this.mailService.sendEmail(
    'user@example.com',
    'John',
    'Doe'
  );
}
```

### Add Validation

Create a DTO with validation decorators:

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;
}
```

Use in controller:

```typescript
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return { message: 'User created', data: createUserDto };
}
```

## 🐛 Troubleshooting

### Port Already in Use

Change the `PORT` in `.env` to another value (e.g., 3002)

### MongoDB Connection Error

- Check if MongoDB is running
- Verify the `MONGODB_URI` in `.env`
- For local MongoDB: `mongodb://localhost:27017/your-db-name`

### Email Not Sending

- For Gmail: Enable 2FA and create an App Password
- Check SMTP settings match your provider
- Verify firewall isn't blocking SMTP port (587)

### Authentication Not Working

- Verify Clerk keys are correct
- Check `API_URL` matches your server address
- Ensure Clerk JWT settings match in dashboard

## 📚 Learn More

- [NestJS Documentation](https://docs.nestjs.com)
- [Fastify Documentation](https://www.fastify.io)
- [Swagger/OpenAPI](https://swagger.io)
- [MongoDB with Mongoose](https://mongoosejs.com)
- [Clerk Authentication](https://clerk.com/docs)

## 💡 Tips

1. **Use Swagger**: Always check `/api/docs` to test your endpoints
2. **Environment Variables**: Never commit `.env` file
3. **Type Safety**: Use DTOs for request/response validation
4. **Error Handling**: The global exception filter handles all errors
5. **Code Quality**: Run `npm run lint` before committing

## 🆘 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Open an issue on GitHub
- Check NestJS Discord community

Happy coding! 🚀
