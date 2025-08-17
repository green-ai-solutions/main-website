# Green AI Solutions

## Overview

Green AI Solutions is a comprehensive technology company website built as a multi-page React application with Express.js backend. The application showcases AI and technology services with a focus on sustainable and ethical AI development. The site features a modern design using the Inter font family, a green/teal color palette, and includes pages for services, solutions, case studies, about information, blog, careers, and contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with 8 main pages (home, services, solutions, case studies, about, blog, careers, contact)
- **UI Components**: Radix UI primitives with custom shadcn/ui components for consistent design
- **Styling**: Tailwind CSS with custom CSS variables for theming, featuring forest green (#0A4A3A) and bright teal (#2EC4B6) color palette
- **State Management**: TanStack React Query for server state management and form handling with React Hook Form
- **Animations**: Intersection Observer API for scroll-triggered animations and transitions

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API with endpoints for contact form submissions and newsletter subscriptions
- **Development Setup**: Vite middleware integration for hot module replacement in development
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Logging**: Request/response logging with duration tracking for API endpoints

### Data Storage Solutions
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe queries
- **Database**: PostgreSQL configured via Neon Database serverless connection
- **Schema**: Well-defined tables for users, contact submissions, and newsletter subscriptions with UUID primary keys
- **Validation**: Zod schemas for runtime type validation on both client and server
- **Development Storage**: In-memory storage implementation for development/testing scenarios

### Authentication and Authorization
- **Session Management**: PostgreSQL session store using connect-pg-simple for persistent sessions
- **Basic Structure**: User authentication schema prepared but not fully implemented
- **Security**: CORS and security headers configured for production deployment

### External Dependencies
- **Database**: Neon Database serverless PostgreSQL for production data storage
- **UI Library**: Extensive Radix UI component library for accessible, unstyled primitives
- **Build Tools**: Vite for frontend bundling with esbuild for backend compilation
- **Development**: Replit integration with error overlay and cartographer plugins for enhanced development experience
- **Fonts**: Google Fonts integration for Inter font family
- **Icons**: Lucide React for consistent iconography throughout the application