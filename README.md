
# 💼 JobTracker– Job Application Tracker

**JobTracker** is a lightweight fullstack web application that helps you track and manage your job applications during your job search. Built with modern technologies for both frontend and backend.

---

## 🧰 Tech Stack

**Frontend:**

- React + TypeScript
- Vite
- Material UI

**Backend:**

- .NET 8 Web API
- Entity Framework Core
- SQL Server

---

## 📁 Project Structure

job-application-tracker/
├─ backend/
│ ├─ JobTracker/
│ │ ├─ (.NET 8 Web API backend)
│ │ ├─ Migrations/
│ │ │ ├─ 20250719_InitialCreate.sql
├─ frontend/
│ ├─ JobTrackerClient/
│ │ ├─ (React + Vite frontend)

---

## 🚀 Getting Started

### ✅ Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js & npm](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

---

### ⚙️ Backend Setup

1. **Set the database connection string:**

The API expects an environment variable: **JOB_TRACKER_DB_CONNECTION_STRING**

Alternatively, you can modify the existing connection string in:
`backend\JobTracker\JobTracker.API\Properties\launchSettings.json`

2. **Run the SQL migration script:**

Before launching the API, execute this script to create the required schema:
`backend\JobTracker\Migrations\20250719_InitialCreate.sql`

3. **Run the backend API:**

```bash
cd backend\JobTracker\JobTracker.API
dotnet run
```

4. The API also serves the **pre-built frontend** from its `wwwroot` folder — available at `http://localhost:5131`.

### 🖥️ Frontend Setup (Optional)

> You don’t need to build or run the frontend separately unless you’re making changes to it.

To modify or develop the frontend:

1.  **Install dependencies**

```bash
cd frontend\JobTrackerClient
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

The app will start on `http://localhost:5173`

3.  **Build the frontend to update static files in the backend:**

```bash
npm run build
```

This will output files to:
`backend\JobTracker\JobTracker.API\wwwroot\`
