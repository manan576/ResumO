# ResumO — AI Resume Optimizer

ResumO is a full-stack AI application that analyzes a user's resume against a target job description and generates a personalized interview strategy along with an AI-tailored resume PDF.

It combines a React frontend, an Express backend, MongoDB persistence, Google Gemini for structured AI generation, and Puppeteer-based PDF rendering.

---

## Overview

A user can:

- create an account or log in
- upload a resume
- paste a target job description
- optionally add a self-description
- generate an interview preparation report
- review saved reports later
- download an AI-tailored resume PDF based on the same report context

The application is built as a production-style separated deployment:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **AI Engine:** Google Gemini

---

## Core Features

### 1. Authentication
- user registration and login
- JWT-based authentication
- token stored in an **HTTP-only cookie**
- logout with **token blacklisting**

### 2. Session Restoration
On app load, the frontend calls a current-user endpoint to restore the authenticated session from the existing cookie. This allows the user to remain effectively logged in after a refresh.

### 3. Resume + Job Description Analysis
- upload resume as a file
- submit job description text
- optionally include self-description
- backend extracts resume text and sends structured context to Gemini

### 4. AI Interview Report Generation
The generated report includes:
- match score
- technical questions
- behavioral questions
- skill gaps
- day-wise preparation roadmap

### 5. Report Persistence
Generated interview reports are stored in MongoDB and can be revisited later.

### 6. AI Tailored Resume PDF
Using a stored report context, the backend generates a tailored resume in HTML and converts it into a downloadable PDF.

---

## Tech Stack

### Frontend
- **React 19**
- **Vite**
- **React Router**
- **Axios**
- **SCSS / Sass**
- React Context for global state

### Backend
- **Node.js**
- **Express 5**
- **Mongoose**
- **bcryptjs**
- **jsonwebtoken**
- **cookie-parser**
- **cors**
- **multer**
- **pdf-parse**
- **puppeteer**
- **dotenv**

### AI / Validation
- **@google/genai**
- **zod**
- **zod-to-json-schema**

### Deployment
- **Vercel** for frontend
- **Render** for backend
- **MongoDB Atlas** for database

---

## High-Level Architecture

```text
User Browser
   ↓
React Frontend (Vercel)
   ↓
Express Backend (Render)
   ├── Auth + Middleware
   ├── Controllers + Services
   ├── Gemini Integration
   ├── PDF Generation
   ↓
MongoDB Atlas
```

### Main data flow
1. User logs in or registers
2. Backend issues JWT in an HTTP-only cookie
3. Frontend restores session on reload using the cookie
4. User uploads resume + enters job description
5. Backend parses resume text
6. Backend sends structured prompt to Gemini
7. AI response is validated and stored in MongoDB
8. Frontend fetches and displays the saved report
9. User can request a generated resume PDF from that report context

---

## Frontend Structure

### Main Pages
- `LandingPage.jsx` — public landing page
- `Login.jsx` — login form
- `Register.jsx` — signup form
- `Home.jsx` — main input page for resume and job description
- `Interview.jsx` — report display page

### Shared Components
- `AppLayout.jsx` — shared application shell
- `AppBrand.jsx` — branding / app title
- `AppLoader.jsx` — loading screen
- `Protected.jsx` — route guard for private pages

### State Management
- `AuthProvider` — manages user auth state
- `InterviewProvider` — manages report state and previous reports

### Custom Hooks
- `useAuth()` — login, register, logout, restore session
- `useInterview()` — create report, fetch report, list reports, download resume PDF

---

## Backend Structure

### Core Files
- `server.js` — server entry point
- `src/app.js` — express app setup and middleware
- `src/config/database.js` — MongoDB connection

### Routes
- auth routes
- interview/report routes

### Controllers
- `registerUserController`
- `loginUserController`
- `logoutUserController`
- `getMeController`
- `generateInterViewReportController`
- `getInterviewReportByIdController`
- `getAllInterviewReportsController`
- `generateResumePdfController`

### Middleware
- auth verification middleware
- multer file upload middleware

### Models
- `user.model.js`
- `blacklist.model.js`
- `interviewReport.model.js`

### Services
- `src/services/ai.service.js` — Gemini integration + PDF generation flow

---

## Authentication and Security

### Cookie-Based Auth
ResumO uses cookie-based authentication instead of storing tokens in localStorage.

Why this matters:
- the JWT is stored as an **HTTP-only cookie**
- frontend JavaScript cannot directly read the token
- browser automatically sends the cookie with allowed requests

### JWT Flow
- JWT is created during login and registration
- token is stored in a cookie named `token`
- middleware verifies token and attaches user info to `req.user`
- logout clears the cookie and blacklists the token

### CORS Policy
Since frontend and backend are hosted on different domains, CORS must be configured carefully:
- allowed origin = frontend URL
- `credentials: true`
- cookie settings must align with deployment environment

---

## AI Processing Pipeline

### Resume Analysis Flow
1. Resume is uploaded using `multipart/form-data`
2. Multer stores the file temporarily in memory
3. `pdf-parse` extracts text from the resume buffer
4. Backend combines:
   - resume text
   - job description
   - self-description
5. Gemini generates a structured report
6. Zod schema validates the AI response format
7. Report is stored in MongoDB

### Resume PDF Generation Flow
1. Stored report is fetched by report ID
2. Backend sends context to Gemini
3. Gemini generates HTML for the tailored resume
4. Puppeteer converts HTML into an A4 PDF
5. PDF is returned to the frontend for download

---

## Why This Project Is Impressive

- clear separation of concerns across frontend and backend
- deployed full-stack architecture using Vercel + Render
- session restoration improves real-world user experience
- secure cookie-based authentication
- JWT blacklisting on logout
- structured AI output using Zod schemas
- persistent interview report storage
- end-to-end flow from analysis to downloadable PDF

This makes ResumO more than a basic CRUD project — it is a practical AI-powered web application with real deployment and document generation features.

---

## Project Highlights for Presentation

If you are presenting this project, emphasize:

- **session restoration** through current-user fetch on app load
- **cookie + JWT auth** instead of localStorage token storage
- **CORS handling** across Vercel and Render
- **Gemini structured generation** instead of raw text output
- **MongoDB persistence** for saved interview reports
- **Puppeteer PDF generation** for tailored resume downloads
- **clean architecture** using pages, hooks, providers, routes, controllers, models, and services

---

## Possible Improvements

A few good engineering observations for future enhancement:

- add full DOCX parsing if DOCX upload is allowed in the UI
- align frontend and backend upload size limits
- improve frontend validation and user-facing error messages
- tighten authorization checks on all report-based actions
- add retry/fallback handling for AI failures
- add analytics and usage logs
- add unit and integration tests

---

## Environment Configuration

Typical environment variables would include:

```env
PORT=...
MONGODB_URI=...
JWT_SECRET=...
FRONTEND_URL=...
GEMINI_API_KEY=...
NODE_ENV=production
```

Do not commit secrets to the repository. Manage them through environment configuration on Vercel, Render, and MongoDB Atlas.

---

## Local Setup

### 1. Clone the repository
```bash
git clone <repo-url>
cd resumo
```

### 2. Setup frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Setup backend
```bash
cd backend
npm install
npm run dev
```

### 4. Configure environment variables
Create `.env` files as required for frontend and backend.

---

## Deployment Notes

### Frontend on Vercel
- build using Vite
- set backend API base URL
- ensure cookie credentials are enabled in requests

### Backend on Render
- set all required environment variables
- configure CORS with the frontend production URL
- use secure cookie settings in production

### MongoDB Atlas
- allow backend access through correct network and credentials
- store application data and generated report records

---

## Final Summary

ResumO is a full-stack AI resume optimization and interview preparation platform. It combines frontend user experience, backend API design, secure authentication, persistent storage, structured AI generation, and PDF rendering into one end-to-end application.

Its strongest technical ideas are:
- session restoration
- secure cookie-based authentication
- structured Gemini integration
- MongoDB persistence
- downloadable AI-generated PDF output

---

## License

Add your preferred license here.
