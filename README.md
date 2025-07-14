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

| Layer        | Technologies |
|--------------|--------------|
| Frontend     | ReactJS, Tailwind CSS, Redux Toolkit, Ant Design |
| Backend      | (Handled via separate API) |
| API Communication | REST API (Axios or Fetch) |
| Authentication | JWT / Role-based Auth (Backend) |
| Deployment   | Vercel / Netlify / Custom Domain |

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
git clone https://github.com/your-org/south-mirror-news-frontend.git
cd south-mirror-news-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm run dev
