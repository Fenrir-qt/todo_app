# 📝 Tadaa! A to-do app

A simple and responsive **To-Do List Application** built with **HTML**, **Node.js**, and **Tailwind CSS**, using **REST API** and the **Fetch API** for CRUD operations.

---

## 🚀 Features

- **Add Tasks** – Create new tasks easily from the input form.
- **View Tasks** – Display a list of tasks fetched from the backend.
- **Mark as Completed** – Update task status with a single click.
- **Delete Tasks** – Remove tasks from the list.
- **Responsive UI** – Styled with Tailwind CSS for a modern look.
- **REST API Integration** – Uses Node.js for backend and Fetch API for frontend requests.

---

## 🛠️ Tech Stack

**Frontend**
- HTML5
- Tailwind CSS
- JavaScript (Fetch API)

**Backend**
- Node.js
- Mongoose
- MongoDB
- Express.js
- REST API

---

## ⚙️ Installation

1. **Clone the repository**
   git clone https://github.com/Fenrir-qt/todo_app.git
   cd todo_app

2. **Install dependencies**

   **Frontend (for Tailwind CLI)**
   npm install

   **Backend**
   cd backend
   npm install

3. **Run the Tailwind CLI build process**
   npx @tailwindcss/cli -i styles/style.css -o styles/output.css --watch

4. **Run the backend server**
   node server.js

   The app will be available at: **http://localhost:3000**

---

## 💡 Notes

- This project is intended for learning purposes.
- Backend uses MongoDB as the database, with Mongoose for object data modeling (ODM).
- Tailwind CSS is set up using the Tailwind CLI for custom builds.
- Styles are generated from `style.css` into `output.css` using:
  npx @tailwindcss/cli -i styles/style.css -o styles/output.css --watch
