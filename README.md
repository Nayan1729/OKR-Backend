# OKR Backend

A robust NestJS-based backend application for managing Objectives and Key Results (OKRs). This application provides a RESTful API for creating, reading, updating, and deleting objectives and their associated key results.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Scripts](#scripts)

## ✨ Features

- **Objective Management**: Create, read, update, and delete objectives
- **Key Results Tracking**: Manage key results associated with objectives
- **Progress Tracking**: Monitor current and target progress for key results
- **Database Persistence**: PostgreSQL database with Prisma ORM
- **API Documentation**: Swagger/OpenAPI documentation
- **CORS Support**: Configured for frontend integration
- **Docker Support**: Containerized PostgreSQL database
- **Comprehensive Testing**: Unit and E2E tests with Testcontainers

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) v11
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/) v7
- **Testing**: Jest with Testcontainers
- **Containerization**: Docker & Docker Compose
- **Package Manager**: pnpm

## 📦 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** ([Install](https://pnpm.io/installation))
- **Docker** & Docker Compose ([Download](https://www.docker.com/))
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/incubyte-org/okt-nayan.git
cd okt-nayan/OKR-Backend
```

### 2. Install Dependencies

```bash
pnpm install
```

## ⚙️ Environment Configuration

Create a `.env` file in the root directory with the following configuration:

```env
# Application Port
PORT=3000

# Database Connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/okrs"
```

## 🗄️ Database Setup

### 1. Start PostgreSQL

```bash
docker compose up -d
```

### 2. Generate Prisma Client

```bash
pnpm prisma generate
```

### 3. Run Database Migrations

```bash
# For development (push schema without migrations)
pnpm prisma db push

# OR for production (using migrations)
pnpm prisma migrate deploy
```

**Database Schema:**

- **Objective**: Represents a high-level goal
  - `id`: Auto-incrementing primary key
  - `title`: Objective title
  - `description`: Detailed description
  - `isCompleted`: Completion status
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp

- **KeyResult**: Measurable outcomes for objectives
  - `id`: Auto-incrementing primary key
  - `description`: Key result description
  - `currentProgress`: Current progress value
  - `targetProgress`: Target progress value
  - `objectiveId`: Foreign key to Objective
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp

### 4. View Database (Optional)

```bash
pnpm prisma studio  # Opens at http://localhost:5555
```

## 🏃 Running the Application

### Development Mode

```bash
pnpm start:dev  # Runs at http://localhost:3000
```

### Production Mode

```bash
pnpm build
pnpm start:prod
```

### Debug Mode

```bash
pnpm start:debug
```

## 🧪 Testing

### Test Setup

The project uses **Testcontainers** for E2E tests, which automatically spins up a PostgreSQL container for testing. This ensures tests run in an isolated environment without affecting your development database.

**Test Configuration:**

- **Unit Tests**: Located in `src/**/*.spec.ts`
- **E2E Tests**: Located in `test/**/*.e2e-spec.ts`
- **Test Setup**: `test/test-setup.e2e.ts` configures Testcontainers

### Prerequisites for Testing

1. **Docker must be running** - Testcontainers requires Docker to create test databases
2. **Sufficient Docker resources** - Ensure Docker has enough memory allocated

### Running Tests

#### Run All Unit Tests

```bash
pnpm test
```

#### Run Tests in Watch Mode

```bash
pnpm test:watch
```

#### Run E2E Tests

```bash
pnpm test:e2e
```

**What happens during E2E tests:**

1. Testcontainers starts a PostgreSQL container
2. Prisma migrations are applied to the test database
3. Tests execute against the containerized database
4. Container is automatically stopped and cleaned up after tests

**E2E Test Timeout:**

The first E2E test run may take longer (up to 60 seconds) as Docker pulls the PostgreSQL image. Subsequent runs will be faster.

#### Run Tests with Coverage

```bash
pnpm test:cov
```

#### Debug Tests

```bash
pnpm test:debug
```



### Troubleshooting Tests

**Issue: Docker not running**
```
Error: Docker is not running
```
**Solution**: Start Docker Desktop or Docker daemon

**Issue: Port already in use**
```
Error: Port 5432 is already allocated
```
**Solution**: Stop the development PostgreSQL container or use a different port

**Issue: Timeout during E2E tests**
```
Error: Timeout - Async callback was not invoked within the 5000 ms timeout
```
**Solution**: Increase the timeout in `test/test-setup.e2e.ts` (already set to 60000ms)

## 📚 API Documentation

### Swagger UI

Once the application is running, access the interactive API documentation:

**URL**: [http://localhost:3000/okr](http://localhost:3000/okr)

### API Endpoints

#### Objectives

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/okr/objectives` | Get all objectives |
| `POST` | `/okr/objectives` | Create a new objective |
| `GET` | `/okr/objectives/:id` | Get a specific objective |
| `PATCH` | `/okr/objectives/:id` | Update an objective |
| `DELETE` | `/okr/objectives/:id` | Delete an objective |

**Example Request - Create Objective:**
```bash
curl -X POST http://localhost:3000/okr/objectives \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Improve Customer Satisfaction",
    "description": "Increase customer satisfaction scores by 20%"
  }'
```

#### Key Results

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/okr/objectives/:objectiveId/keyResults` | Get all key results for an objective |
| `POST` | `/okr/objectives/:objectiveId/keyResults` | Create a new key result |
| `GET` | `/okr/objectives/:objectiveId/keyResults/:id` | Get a specific key result |
| `PATCH` | `/okr/objectives/:objectiveId/keyResults/:id` | Update a key result |
| `DELETE` | `/okr/objectives/:objectiveId/keyResults/:id` | Delete a key result |

**Example Request - Create Key Result:**
```bash
curl -X POST http://localhost:3000/okr/objectives/1/keyResults \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Achieve NPS score of 50",
    "currentProgress": 35,
    "targetProgress": 50
  }'
```

## 📁 Project Structure

```
OKR-Backend/
├── src/
│   ├── objective/           # Objective module
│   │   ├── objective.controller.ts
│   │   ├── objective.service.ts
│   │   ├── objective.module.ts
│   │   └── dto/            # Data Transfer Objects
│   ├── key-result/         # Key Result module
│   │   ├── key-result.controller.ts
│   │   ├── key-result.service.ts
│   │   ├── key-result.module.ts
│   │   └── dto/
│   ├── app.module.ts       # Root module
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── main.ts            # Application entry point
│   └── prisma.service.ts  # Prisma service
├── test/
│   ├── objective.e2e-spec.ts    # E2E tests
│   ├── test-setup.e2e.ts        # Testcontainers setup
│   └── jest-e2e.json            # E2E Jest config
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── generated/
│   └── prisma/            # Generated Prisma client
├── docker-compose.yml     # Docker configuration
├── .env                   # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm start` | Start the application |
| `pnpm start:dev` | Start in development mode with hot-reload |
| `pnpm start:debug` | Start in debug mode |
| `pnpm start:prod` | Start in production mode |
| `pnpm build` | Build the application |
| `pnpm test` | Run unit tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:e2e` | Run E2E tests with Testcontainers |
| `pnpm test:cov` | Run tests with coverage |
| `pnpm test:debug` | Debug tests |
| `pnpm lint` | Lint and fix code |
| `pnpm format` | Format code with Prettier |
| `pnpm prisma generate` | Generate Prisma client |
| `pnpm prisma db push` | Push schema to database |
| `pnpm prisma migrate deploy` | Run migrations |
| `pnpm prisma studio` | Open Prisma Studio |

## 🔧 Development Workflow

1. **Start the database**: `docker compose up -d`
2. **Run migrations**: `pnpm prisma db push`
3. **Start development server**: `pnpm start:dev`
4. **Make changes**: Edit files in `src/`
5. **Run tests**: `pnpm test` or `pnpm test:e2e`
6. **Format code**: `pnpm format`
7. **Lint code**: `pnpm lint`

## 🐛 Troubleshooting

### Database Connection Issues

**Problem**: Cannot connect to database
```
Error: P1001: Can't reach database server at localhost:5432
```

**Solutions**:
1. Ensure Docker is running: `docker ps`
2. Check if PostgreSQL container is running: `docker compose ps`
3. Restart the container: `docker compose restart`
4. Verify DATABASE_URL in `.env` matches Docker configuration

### Port Already in Use

**Problem**: Port 3000 is already in use

**Solutions**:
1. Change PORT in `.env` to a different value (e.g., 3001)
2. Kill the process using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -ti:3000 | xargs kill -9
   ```

### Prisma Client Issues

**Problem**: Prisma client is not generated

**Solution**: Run `pnpm prisma generate`

### Docker Issues

**Problem**: Docker container won't start

**Solutions**:
1. Check Docker logs: `docker compose logs`
2. Remove volumes and restart: `docker compose down -v && docker compose up -d`
3. Ensure port 5432 is not in use by another PostgreSQL instance

## 📄 License

UNLICENSED - Private project

## 👥 Authors

Incubyte Team

---

**Need Help?** Check the [NestJS Documentation](https://docs.nestjs.com/) or [Prisma Documentation](https://www.prisma.io/docs/)

