<div align="center">

# ⚡ Syntax.AI

### An AI-powered IDE that runs in your browser

## 🎯 About the Project

**Syntax.AI** is a full-stack, Cursor-style online code editor. Instead of only suggesting code, its AI agent can **actually modify your project**: it reads your file tree, creates folders, writes files and updates existing code using tool calls.

It is built as a **microservices backend** (auth, projects, files, AI, terminal, payments) behind an **API gateway**, with a modern **React + Vite** frontend.

> 💡 Built to explore how real products combine AI agents, real-time terminals, payments and scalable service design in one app.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🔐 | **Google Sign-In** | Secure login with Firebase Authentication |
| 📁 | **Project Management** | Create, star, open and delete projects |
| 🗂️ | **File Explorer** | Nested folders and files, just like VS Code |
| 📝 | **Monaco Editor** | The same editor engine that powers VS Code |
| 💻 | **Integrated Terminal** | Real shell in the browser via xterm.js, node-pty and Socket.IO |
| 🤖 | **AI Coding Agent** | LangGraph agent that creates and edits files using tools |
| 👀 | **Live Preview** | Instantly renders your `index.html`, CSS and JS in an iframe |
| 💳 | **Credits and Payments** | Credit-based AI usage, top up with Razorpay |

---

## 🛠️ Tech Stack

**Frontend**
- React, Vite, React Router
- Redux Toolkit for state management
- Tailwind CSS, Motion, Lucide Icons
- Monaco Editor, xterm.js, Socket.IO client

**Backend**
- Node.js, Express (microservices)
- MongoDB with Mongoose
- Redis with ioredis
- Socket.IO with node-pty for the real terminal
- Docker Compose for Redis

**AI**
- LangChain and LangGraph
- OpenRouter (DeepSeek model)
- Zod for tool schemas

**Auth and Payments**
- Firebase Authentication (Google)
- Razorpay

---

## 📂 Project Structure

```
Syntax.AI/
│
├── frontend/                      # React + Vite client
│   └── src/
│       ├── components/            # Editor, Explorer, Terminal, AiChat, Preview...
│       ├── pages/                 # Dashboard, ProjectPage, Plan
│       ├── features/              # API calls (login, file, project, payment)
│       ├── redux/                 # Store and slices
│       └── utils/                 # Axios setup, icon helpers
│
└── backend/
    ├── docker-compose.yml         # Redis container
    ├── shared/redis/              # Shared Redis client
    │
    ├── gateway/                   # API Gateway (entry point)
    │   ├── middleware/protect.js  # Auth guard
    │   └── index.js               # Proxy routes
    │
    └── services/
        ├── auth/                  # Firebase login, users, credits
        ├── project/               # Project CRUD, star/unstar
        ├── File/                  # Files, folders, file tree
        ├── ai/                    # LangGraph agent and file tools
        ├── terminal/              # Socket.IO and node-pty shell
        └── payment/               # Razorpay orders and verification
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Docker](https://www.docker.com/) (for Redis) or any Redis instance
- A [Firebase](https://firebase.google.com/) project with Google sign-in enabled
- A [Razorpay](https://razorpay.com/) account (test mode is fine)
- An [OpenRouter](https://openrouter.ai/) API key


⭐ **If you like this project, give it a star!** ⭐

</div>
