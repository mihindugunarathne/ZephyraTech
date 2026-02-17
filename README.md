# How to Run This Project

## Prerequisites

- Node.js 18+
- npm

## 1) Install Dependencies

From project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## 2) Configure Backend Environment

In `backend`, create `.env` from example:

```bash
cp .env.example .env
```

PowerShell alternative:

```powershell
Copy-Item .env.example .env
```

Set a value for `JWT_SECRET` in `backend/.env`.

## 3) Start the Backend

Open terminal 1:

```bash
cd backend
npm run dev
```

Backend runs at: `http://localhost:5000`

## 4) Start the Frontend

Open terminal 2:

```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

## 5) Login

Open `http://localhost:5173` and use:

- Email: `admin@test.com`
- Password: `Admin@123`
