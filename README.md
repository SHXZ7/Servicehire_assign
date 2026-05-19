# ServiceHive Leads Dashboard

A full-stack, enterprise-grade lead management dashboard built with Next.js, Node.js, and MongoDB. Featuring a premium "Minimal Sharp + Kinetic" UI aesthetic with fully functional Dark/Light modes.

## 🚀 Core Features

- **Authentication System**: Secure JWT-based registration and login, password hashing (bcrypt), and protected frontend routes.
- **Role-Based Access Control (RBAC)**: Admin and Sales user roles with distinct UI badges and backend endpoint protection.
- **Leads Management (CRUD)**: Create, Read, Update, and Delete leads seamlessly via a slide-in sheet modal.
- **Advanced Filtering & Search**: Debounced search by Name/Email, combined with Status and Source dropdown filters.
- **Server-Side Pagination**: Efficient MongoDB skip/limit queries handling 10 records per page.
- **CSV Export**: Instantly export the current filtered table view to a `.csv` file.
- **Premium UI/UX**: Custom Tailwind CSS v4 `@theme`, shimmer loading skeletons, animated transitions, and empty states.
- **Dark/Light Mode**: Full theme persistence using Zustand and local storage, avoiding the flash of unstyled content on reload.

## 🛠 Tech Stack

**Frontend:**
- React 19 / Next.js 16 (App Router)
- Tailwind CSS v4
- Zustand (Global State)
- React Hook Form + Zod (Validation)
- Axios

**Backend:**
- Node.js / Express
- TypeScript
- MongoDB / Mongoose
- JSONWebToken (JWT) / BcryptJS

## 🐳 Running with Docker (Recommended)

The easiest way to run the entire application (Database, Backend, and Frontend) is using Docker Compose.

1. Ensure Docker and Docker Compose are installed on your machine.
2. Clone this repository.
3. Run the following command from the root directory:

```bash
docker-compose up --build
```

- The **Frontend** will be available at `http://localhost:3000`
- The **Backend API** will be available at `http://localhost:5000`
- The **MongoDB** instance will be mapped to `localhost:27017`

## 💻 Running Locally (Without Docker)

If you prefer to run the services manually without Docker, follow these steps:

### Prerequisites
- Node.js v20+
- A running local instance of MongoDB (port 27017)

### 1. Environment Variables
Create a `.env` file in the **backend** directory and the **frontend** directory using the provided `.env.example` as a reference.

### 2. Start the Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Start the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

The frontend will be accessible at `http://localhost:3000`.

## 🎨 Design Philosophy
This project strictly follows the **Minimal Sharp + Kinetic** aesthetic:
- **Colors**: Slate/Acid system with dark `#0D0F12` bases and bright `#00E5B0` accents.
- **Typography**: Syne (Headings), DM Sans (Body), JetBrains Mono (Data/Numbers).
- **Interactions**: Ghost buttons, pulse animations, and staggered entrance loading.
