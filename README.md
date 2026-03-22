# Web World

Welcome to **Web World**, a real-time multiplayer arcade ecosystem! Dive into an interactive virtual world where you can meet, chat, and explore a shared top-down map together in real time.

## ✨ Features

- **Create a Room**: Host a private world of your own or join an existing room seamlessly using a secure 6-digit PIN.
- **Have an Avatar**: Select and customize your very own character to represent you in the shared world.
- **Enjoy with Friends**: Explore the map, interact, and share experiences with your friends in the same active room.

### 🕥 Pending Features

- **Cafeteria Meetings**: Gather in the virtual cafeteria area on the map to hold casual or important meetings.
- **Voice and Video Chat (Currently Working)**: Communicate in real-time with other players using our fully functional built-in voice and video chat system.
- **Side Missions**: Look forward to engaging secondary quests to unlock achievements and spice up your adventure!

---

## 🛠️ Installation Guide

To get Web World running locally, you need to set up the environment variables for both the frontend and the backend.

### 1. Environment Setup

You will find a `.env.sample` file in the root directory (for the frontend) and inside the `backend/` directory (for the backend). These serve as your base configurations.

- Copy `.env.sample` to `.env` in the **root** folder and fill in the required frontend keys (e.g., AWS S3 credentials, Base URLs).
- Copy `.env.sample` to `.env` inside the **`backend/`** folder and fill in the required backend keys (e.g., Database URL, JWT Secrets, AWS credentials).

### 2. Local Setup

1. Open a terminal in the **root** directory and run `npm install`.
2. Open another terminal in the **`backend/`** directory and run `npm install`.
3. Start both development servers using `npm run dev` in their respective directories. You're ready to play!

---

## 🐳 Docker Setup

For a much faster, containerized setup, the project includes `Dockerfile`s and a `docker-compose.yml` to automatically orchestrate the frontend, backend, and PostgreSQL database.

1.  Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.
2.  Ensure your `.env` files are fully configured by following the **Environment Setup** section.
3.  From the root of the project, run the following command to build and start the entire application:
    ```bash
    docker compose up --build
    ```
4.  Docker will spin up these services simultaneously:
    - A **PostgreSQL Database** container (`db`).
    - The **Node.js Backend** container running on port `4000`.
    - The **React/Vite Frontend** container running on port `5173`.
5.  Once the containers are successfully running, open your browser and access the platform at `http://localhost:5173`.
