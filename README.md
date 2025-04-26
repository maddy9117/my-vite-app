# My Vite App

This repository contains an e-commerce application built using **React** and **Vite**. The application is implemented primarily in **TypeScript**, with additional usage of **CSS**, **JavaScript**, and **HTML**. It connects to a **Spring Boot REST API** for backend services and requires a **MongoDB** database.

## Features

- Efficient and fast development setup using **Vite**.
- **React**-based front-end for building interactive user interfaces.
- TypeScript for robust and type-safe development.
- Integration with **Spring Boot REST API** for backend functionality.
- **MongoDB** for storing and managing application data.
- Secure **authentication** to manage user accounts and sessions.
- E-commerce functionality, including product listing, cart, and checkout.
- Responsive and modern styling with **Tailwind CSS**.

## Tech Stack

### Frontend
- **React**: Front-end library for building user interfaces.
- **Vite**: Next-generation front-end tooling for fast builds and development.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For styling the application.

### Backend
- **Spring Boot**: REST API for backend services, including user authentication and data management.
- **MongoDB**: NoSQL database for storing application data.

## Installation

### Prerequisites
Ensure the following are installed and running on your machine:
1. **Node.js** (for running the frontend).
2. **MongoDB** ( database ).
3. **Spring Boot REST API** ( backend ).

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/maddy9117/my-vite-app.git
   cd my-vite-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to view the application.

### Backend Setup

Ensure you have the **Spring Boot REST API** running and connected to the **MongoDB** database. 

### MongoDB Configuration

The backend application will use MongoDB to store data such as user information and product, cart and order details.

## Authentication

The application includes secure user authentication features:
- **Login** functionality to authenticate users.
- **Session management** to maintain user sessions.
- **Protected routes** that are accessible only to authenticated users.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build locally.

## Folder Structure

The project structure is organized as follows:

```
my-vite-app/
├── src/
│   ├── components/    # Reusable React components
│   ├── pages/         # Application pages
│   ├── assets/        # Images, fonts, and other assets
│   ├── styles/        # CSS or SCSS for styling
│   └── App.tsx        # Main app entry point
├── public/            # Static files
├── package.json       # Project dependencies and scripts
└── vite.config.ts     # Vite configuration
```

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## Acknowledgements

- Thanks to the maintainers of **React**, **Vite**, **Spring Boot**, **MongoDB**, and other open-source libraries used in this project.
