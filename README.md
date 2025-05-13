🏠 Rabbit Realty 🐇
Rabbit Realty is a modern, user-friendly real estate platform that allows users to browse, list, and manage properties efficiently. Built using React, Spring Boot, and MySQL, it provides a full-stack solution tailored for both real estate professionals and customers.

📋 Table of Contents
🛠 Technologies Used
🚀 Getting Started
👨‍💻 Running Locally
🌐 Deployment
📂 Folder Structure
🤖 Contributing
💬 Community & Support
📦 Git Commands
🚀 Why Rabbit Realty?
🛠 Technologies Used
Frontend

React.js
TailwindCSS
Vite
Backend

Spring Boot (Java)
MySQL
Authentication

JWT (JSON Web Tokens)
Dev Tools

ESLint
Prettier
Webpack
🚀 Getting Started
Make sure the following are installed:

Git
Node.js & npm
JDK 11+
MySQL
👨‍💻 Running Locally
1. Clone the Repository
git clone https://github.com/gorlepavan/rabbit-repo.git
cd rabbit-repo
2. Backend Setup (Spring Boot)
cd backend
Create a MySQL database named rabbit_realty_db.
Update database credentials in src/main/resources/application.properties.
Example:

spring.datasource.url=jdbc:mysql://localhost:3306/rabbit_realty_db
spring.datasource.username=root
spring.datasource.password=your_password
Run the backend:
For Linux/macOS:

./mvnw spring-boot:run
For Windows:

mvnw spring-boot:run
The API will be available at: http://localhost:8080

3. Frontend Setup (React)
cd ../frontend
npm install
npm run dev
The frontend will be available at: http://localhost:5173

🌐 Deployment
Rabbit Realty can be deployed on:

Frontend: Netlify, Vercel
Backend: Heroku, AWS, Render
Make sure your backend API is public and CORS settings are properly configured.

📂 Folder Structure
rabbit-repo/
├── backend/                  # Spring Boot backend
│   ├── src/
│   ├── target/
│   ├── pom.xml
│   └── application.properties
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
🤖 Contributing
We love contributions! Here's how you can help:

Fork the repo

Create a new branch

git checkout -b feature-name
Commit your changes

git commit -m "Add: feature-name"
Push to your branch

git push origin feature-name
Open a pull request 🚀

💬 Community & Support
Need help? Join the conversation:

GitHub Issues
Stack Overflow
(Optional) Discord/Slack link here
📦 Git Commands
# Stage changes
git add .

# Commit
git commit -m "your message"

# Push
git push origin main

# Check branch
git branch

# Create new branch
git checkout -b branch-name

# Switch branch
git checkout branch-name
🚀 Why Rabbit Realty?
✨ Modern UI – Responsive, clean, and fast 🔐 Secure – JWT-based authentication ⚙ Scalable – Modular architecture ⚡ Fast – Optimized with Vite & Spring Boot 🌍 Full-Stack – All-in-one solution for real estate apps

Thanks for checking out Rabbit Realty! 🐇 Happy Coding & Contributing! 🎉
