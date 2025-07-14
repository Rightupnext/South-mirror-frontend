# South Mirror News Frontend

## 📚 Table of Contents
- [Project Overview](#project-overview)  
- [Key Features](#key-features)  
- [Tech Stack](#tech-stack)  
- [Architecture](#architecture)  
- [Setup & Installation](#setup--installation)  
- [Usage](#usage)  
- [Environment Variables](#environment-variables)  
- [Testing](#testing)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## 📌 Project Overview

**South Mirror News** is a fast, responsive, and scalable news portal built using ReactJS for the frontend. It allows users to explore categorized news articles, featured posts, user comments, and more. The application interacts with a backend API for content management, authentication, and user handling.

---

## ✨ Key Features

- Dynamic news listing with categories and subcategories  
- Featured posts and breaking news carousel  
- Full article page with rich content and images  
- Comment system with moderation (admin control)  
- Admin and writer login roles  
- Protected routes for content management  
- Responsive design for mobile, tablet, and desktop  
- Redux Toolkit for global state (auth, posts, comments)

---

## 🛠 Tech Stack

| Layer            | Technologies                              |
|------------------|--------------------------------------------|
| Frontend         | ReactJS, Tailwind CSS, Redux Toolkit, Ant Design |
| Backend          | (Handled via separate API)                 |
| API Communication| REST API (Axios or Fetch)                 |
| Authentication   | JWT / Role-based Auth (Backend)           |
| Deployment       | Vercel / Netlify / Custom Domain          |

---

## 🧱 Architecture

The South Mirror News frontend is a **Single Page Application (SPA)** built with **ReactJS**. All article and user data is fetched via **RESTful API**. It uses **Redux Toolkit** for global state like logged-in user and article cache. Styling is handled via **Tailwind CSS**, and components use **Ant Design** where applicable for uniform design.

---

## ⚙️ Setup & Installation

### ✅ Prerequisites

- Node.js v16 or higher  
- npm (Node Package Manager)  
- Access to backend API (local or deployed)

### 🛠 Steps

```bash
# Clone the repository
git clone https://github.com/Rightupnext/South-mirror-frontend.git
cd South-mirror-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm run dev
🧪 Usage
Visit: http://localhost:5173 (or configured port)

Browse and click any news card to open full view

Login as Admin or Writer to access dashboard

Add, update, or moderate news posts and comments

🔐 Environment Variables
Make sure to configure your .env file like:

env
Copy
Edit
VITE_API_BASE_URL=https://your-api-domain.com
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
🧪 Testing
Manual testing across Chrome, Firefox, Safari

Optionally add automated tests using:

React Testing Library

Jest

🚀 Deployment
You can deploy this app to:

Vercel — auto-deploy from GitHub

Netlify — connect repo, use npm run dev

Custom domain — via DNS + CNAME setup

🤝 Contributing
Pull requests are welcome!
For major changes, please open an issue first.
Make sure to update/add tests where needed.

📄 License
This project is licensed under the MIT License — free to use and modify.

👨‍💻 Developer Profile
Name: Vishwa S

Contact: +91-6385557221

Frontend Repository: South Mirror Frontend

Backend Repository: Coming Soon

📅 Project Timeline
Start Date: July 05, 2025

Status: Ongoing

Expected Completion: 20 Days

Target Completion Date: July 25, 2025
