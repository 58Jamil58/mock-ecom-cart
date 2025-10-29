# Mock E-commerce Cart

A full-stack mock e-commerce application with a React frontend and Node.js/Express backend using MongoDB.

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone or download the project.

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - In the `backend` folder, create a `.env` file with:
     ```
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

## Running the Project

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```
   The backend will run on http://localhost:5000

2. Start the frontend:
   ```
   cd frontend
   npm start
   ```
   The frontend will run on http://localhost:3001

Open http://localhost:3001 in your browser to view the application.
