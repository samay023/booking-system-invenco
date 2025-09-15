# Booking System - Invenco

A serverless booking system built with TypeScript, Express.js, Prisma ORM, and AWS Lambda using the Serverless Framework.

## Features

- TypeScript for type safety and better development experience
- RESTful API for managing bookings
- SQLite database with Prisma ORM
- Serverless deployment with AWS Lambda
- Local development with serverless-offline

## API Endpoints

- **GET /classes**: List all classes
- **POST /classes/:id/bookings**: Book a class

## Setup Instructions

For mac users

```
npm run initial:setup:mac
```

For windows users

```
npm run initial:setup:windows
```

### Prerequisites

- Node.js 22 or higher
- npm

### Development

Build and start the local development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **SQLite** - Database
- **Serverless Framework** - Deployment and local development
- **AWS Lambda** - Serverless compute
- **@vendia/serverless-express** - Express to Lambda adapter
