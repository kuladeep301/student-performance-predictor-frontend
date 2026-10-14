# Deploying EduPredict AI Frontend to Vercel

This guide explains how to deploy the React (Vite) frontend to **Vercel** with zero-downtime routing and live API connectivity.

---

## ⚡ Option 1: Deploy via Vercel Web Dashboard (Recommended)

1. **Push your repository to GitHub / GitLab / Bitbucket**:
   ```bash
   git add .
   git commit -m "Prepare frontend for Vercel deployment"
   git push origin main
   ```

2. **Import Project into Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New..."** ➔ **"Project"**.
   - Select your Git repository.

3. **Configure Project Settings**:
   - **Framework Preset**: `Vite` (automatically detected).
   - **Root Directory**: Click *Edit* and select **`frontend`**.
   - **Build Command**: `npm run build` (or `vite build`).
   - **Output Directory**: `dist`.
   - **Install Command**: `npm install`.

4. **Environment Variables (Optional)**:
   If your Spring Boot backend is deployed (e.g., on Render, Railway, AWS, or Heroku):
   - Add variable: `VITE_API_BASE_URL`
   - Value: `https://your-backend-api-url.com/api`
   *(If not set, the app runs in Intelligent Client AI Mode with full interactive demo data and client inference).*

5. **Deploy**:
   - Click **Deploy**. Vercel will build and assign you a free `https://<project-name>.vercel.app` URL.

---

## 💻 Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```

2. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

3. **Run deployment**:
   ```bash
   vercel
   ```
   Follow the CLI prompts (accept defaults).

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

---

## ⚙️ Key Configuration Files Added

1. **`frontend/vercel.json`**:
   Configures Single-Page Application (SPA) rewrites to prevent 404 errors when reloading routes, plus caching headers for static assets.

2. **`frontend/.env.example`**:
   Template demonstrating the `VITE_API_BASE_URL` variable for connecting to external backends.

3. **`frontend/src/services/api.js`**:
   - Supports `VITE_API_BASE_URL` dynamically.
   - Automatic graceful fallback: If the live backend is unreachable or returning HTML, it falls back to the client-side predictive inference engine and localStorage without errors.

4. **`backend/src/main/resources/application.properties` & CORS Configs**:
   - Backend configured with `allowedOriginPatterns` to support all `https://*.vercel.app` domains without CORS rejection.
