# Booking System - Invenco

A serverless booking system built with TypeScript, Express.js, Prisma ORM, and AWS Lambda using the Serverless Framework.

## Features

- TypeScript for type safety and better development experience
- RESTful API for managing bookings
- SQLite database with Prisma ORM
- Serverless deployment with AWS Lambda
- Local development with serverless-offline

## API Endpoints

## Setup Instructions

### Prerequisites

- Node.js 22 or higher
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npm run prisma:generate
```

3. Run database migrations:

```bash
npm run prisma:migrate
```

### Development

Build and start the local development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

### API Usage

#### Create a booking

```bash
curl -X POST http://localhost:3000/bookings \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "date": "2024-01-15T10:00:00Z"}'
```

#### Get all bookings

```bash
curl http://localhost:3000/bookings
```

#### Health check

```bash
curl http://localhost:3000/health
```

### Deployment

Deploy to AWS:

```bash
npm run deploy
```

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **SQLite** - Database
- **Serverless Framework** - Deployment and local development
- **AWS Lambda** - Serverless compute
- **@vendia/serverless-express** - Express to Lambda adapter
