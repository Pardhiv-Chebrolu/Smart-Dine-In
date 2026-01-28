# Smart Dine-In

Smart Dine-In is a MERN stack based online food ordering web application developed as a major academic project.  
The project is inspired by platforms like Swiggy and focuses on implementing core functionalities such as vendor authentication, restaurant (firm) management, and frontend–backend integration.

The main goal of this project is to understand how a real-world full-stack application is designed, developed, and managed using modern web technologies.

---

## Project Overview

The application is divided into three main parts:
- Backend server built using Node.js and Express
- User-facing frontend built using React
- Vendor/Admin dashboard built using React

The backend exposes REST APIs that are consumed by the frontend applications. MongoDB is used as the database to store vendors and firm-related data. Authentication is handled using JSON Web Tokens (JWT).

---

## Features Implemented

### Vendor Module
- Vendor registration and login
- Password hashing using bcryptjs
- JWT-based authentication
- Secure access to protected routes

### Firm Module
- Add restaurant (firm) details
- Upload firm images using Multer
- Associate firms with vendors (one-to-many relationship)
- Store and retrieve data from MongoDB

### Frontend
- User interface built using React and Vite
- Separate vendor dashboard
- API integration using fetch/axios
- Component-based structure

---

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML and CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- Multer
- bcryptjs

### Tools
- Git and GitHub
- Postman
- MongoDB Compass
- Visual Studio Code

## Authentication Flow

- Vendor logs in using email and password.
- On successful login, a JSON Web Token (JWT) is generated.
- The JWT token is sent in the request headers for protected routes.
- A middleware verifies the token before allowing access to secured APIs.

---

## Learning Outcomes

Through this project, I gained practical experience in:

- Building RESTful APIs using Node.js and Express
- Implementing authentication and authorization using JWT
- Handling file uploads with Multer
- Designing MongoDB schemas and relationships using Mongoose
- Debugging real-world backend issues
- Resolving Git and version control challenges
- Managing a monorepo structure in GitHub

---

## Future Scope

The project can be extended further by implementing:

- Online payment gateway integration
- Delivery partner module
- Real-time order tracking
- Admin analytics and reporting dashboard

---

## Author

**Pardhiv Chebrolu**  
B.Tech – Artificial Intelligence & Data Science  

GitHub:  
https://github.com/Pardhiv-Chebrolu

---

## Note

This project has been developed purely for educational and learning purposes.



## How to Run the Project Locally

```bash
cd Backend_Nodejs_Suby
npm install
npm run dev


Create a .env file and add:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

cd Smart_DineIn_React
npm install
npm run dev

cd React_Suby_Backend_Dashboard
npm install
npm run dev

