# Furever Health - Quick Start Guide

## What You Got

A complete pet health tracking application with:

### Eye-Catching Landing Page
- Beautiful gradient backgrounds (orange, pink, purple)
- Animated paw print decorations
- Dual-purpose login/signup form
- Pet-themed branding with custom paw icon

### Features
1. **User Authentication** - Secure JWT-based auth
2. **Pet Profiles** - Add multiple pets with full details
3. **Health Records** - Track weight with beautiful charts
4. **Medications** - Manage active and past medications
5. **Vaccinations** - Track vaccines and due dates
6. **Vet Visits** - Complete visit history with costs

### Fun Pet-Loving Design
- Custom paw print SVG icons throughout
- Warm color palette (primary reds/oranges, accent yellows)
- Playful fonts (Poppins for headings, Inter for body)
- Smooth animations and transitions
- Gradient buttons and cards
- Responsive design

## Quick Setup (3 Steps)

### 1. Install PostgreSQL
```bash
# Install PostgreSQL, then:
psql -U postgres
CREATE DATABASE furever_health;
\q
```

### 2. Start Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## First Use

1. Go to http://localhost:5173
2. Click "Sign up" and create an account
3. Click "Add Your First Pet"
4. Fill in your pet's info (name & species required)
5. Click "Add Health Record" button
6. Choose record type: Health Record, Medication, Vaccination, or Vet Visit
7. Watch the dashboard populate with beautiful visualizations!

## Cool Features to Try

- Add multiple pets and switch between them
- Track weight over time to see the chart grow
- Mark medications as active/inactive
- View different tabs: Overview, Medications, Vaccinations, Visits
- Notice the paw prints scattered throughout the UI
- Check out the gradient color scheme

## Tech Stack

**Backend:** Node.js, Express, PostgreSQL, JWT
**Frontend:** React, Vite, TailwindCSS, Chart.js, React Router

Enjoy tracking your furry friends' health! 🐾
