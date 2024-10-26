# Rule-Engine Evaluator

Develop a simple 3-tier rule engine application (Simple UI, API, and Backend) to determine user eligibility based on attributes like age, department, income, and experience. This application utilizes an Abstract Syntax Tree (AST) for flexible and dynamic rule creation, combination, and modification.

## Table of Contents

- [Features](#features)
- [Design Choices](#design-choices)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Folder Structure](#folder-structure)
 - [Build Instructions](#build-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
  - [Running the Backend](#running-the-backend)
  - [Running the Frontend](#running-the-frontend)
- [API Documentation](#api-documentation)
  - [Create Rule](#create-rule-api)
  - [Evaluate Rule](#evaluate-rule-api)
- [Environment Variables](#environment-variables)
- [License](#license)

 ---

## Features

- Flexible Rule Creation: Define eligibility rules dynamically using an AST structure, making it easy to adapt to different conditions and combinations.
- Rule Combination: Combine multiple rules into a single AST, allowing for complex, layered conditions with minimal redundancy.
- Efficient Rule Evaluation: Evaluate user data against the rule AST to determine eligibility with optimized performance.
- JSON-Based Data Input: Accepts JSON format for user data, allowing integration with various data sources and easy handling of structured information.
- API-Driven Architecture: Expose rule creation, combination, and evaluation functionality through RESTful APIs for seamless integration into other systems.

---

## Design Choices:

### 1.**Frontend (React with bootstrap)**
- Framework: Chose React for a responsive and modular UI.
- Component Structure: Built reusable components for rule creation, modification, and evaluation.
- State Management: Used Context API/Redux to manage rule states and user data across components.
- Form Handling: Implemented form validation and conditional inputs for rule attributes.
- Error Handling: Added user-friendly error messages for invalid rule inputs or evaluation failures.
- API Integration: Used Axios to handle API requests to backend endpoints for rule processing.

### 2.**Backend (Node.js and MongoDB)**
- Framework: Node.js with Express for handling RESTful APIs.
- AST Creation and Parsing: Developed custom functions to parse rule strings into AST and vice versa.
- Rule Combination Logic: Implemented logic to merge multiple ASTs, prioritizing common operators for efficiency.
- Database: Used MongoDB/PostgreSQL for rule storage and metadata, allowing flexible schema for complex rules.
- Data Validation: Used JSON schema validation to ensure incoming data aligns with expected structure.

 ---
 
  ## Tech Stack

### Frontend

- **Framework:** React – For building a modular and responsive user interface.
- **State Management:** Context API / Redux – To manage application state and user data.
- **HTTP Client:** Axios – For handling API requests and responses.

### Backend

- **Server Framework:** Node.js with Express – For building and managing RESTful APIs.
- **Rule Parsing and AST:**  Custom AST functions – For converting rules into Abstract Syntax Trees.
- **Database:** MongoDB / PostgreSQL – For storing rule definitions and application metadata.

---

## Dependencies
Install these dependencies by running npm install in the frontend and backend directories:

### Frontend 

- **React:** ^17.0.2
- **Bootstrap:** (v5+)
- **Redux:** (or Context API if using Context) ^4.1.0
- **Axios:** ^0.21.1
- **Styled Components:** (if using) ^5.3.0


### Backend 

- **Express:** ^4.17.1
- **Mongoose** (if using MongoDB): ^5.13.7
- **Node.js:** (v20.16.0)
- **JSEP** (for parsing and evaluating rule conditions)
- **dotenv** (for environment variable management
 
---

## Folder Structure
```
project-root/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Application pages
│   │   ├── services/            # API service (e.g., Axios instance)
│   │   ├── store/               # State management (Redux/Context)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/         # Route controllers
│   │   ├── models/              # Database models
│   │   ├── routes/              # API routes
│   │   ├── utils/               # Utility functions (e.g., AST parser)
│   │   ├── config/              # Configuration files (e.g., DB connection)
│   │   └── app.js               # Express app setup
│   └── package.json
├── docker-compose.yml           # Docker configuration
└── README.md
```
---

## Build Instructions

### Backend Setup

1. **Clone the repository:**

   ``` bash
   git clone https://github.com/RathlavathRahul/Rule-Engine.git
   cd backend
   ```
   

2. **Install backend dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env `file in the `/backend`directory with the following contents:

   ```
   MONGO_URI="mongodb+srv://rathlavathrahul3276:Rahul@cluster0.oo6ux.mongodb.net/userDB?retryWrites=true&w=majority&appName=Cluster0"
   PORT=3001
   ```

4. **Start the backend server:**

   ```bash
   node app.js
   ```

   The server will run on `http://localhost:3001`.

---

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend app:**

   ```bash
   npm start
   ```

   The React app will run on `http://localhost:3000`.

---

## Running the Application

### Running the Backend

To start the backend server, run:

```bash
npm start
```

### Running the Frontend

To start the React app, run:

```bash
npm start
```

Navigate to `http://localhost:3000` in your browser to interact with the Rule Engine.

---

## API Documentation

### Create Rule API

-**Endpoint:** POST /api/rules/create
-**Description:** Creates a new rule and saves it to the database.
-**Request Body:**
  ```json
  {
    "ruleString": "age > 30 && department == 'IT'"
  }
  ```

-**Response:**
  ```json
  {
    "message": "Rule created",
    "rule": {
      "_id": "60a7c70f7c8e4a0015f7e7e6",
      "ruleString": "age > 30 && department == 'IT'",
      "ast": { ... }  // Parsed AST of the rule
    }
  }
  ```

### Evaluate Rule API

-**Endpoint:** POST /api/rules/evaluate
-**Description:** Evaluates a rule against provided user data.
-**Request Body:**
  ```json
  {
    "ast": { ... },  // AST representation of the rule
    "data": {
      "age": 35,
      "department": "IT"
    }
  }
  ```

-**Response:**
  ```json
  {
    "result": true  // or false if the rule fails
  }
  ```

---

## Environment Variables
In both the backend and frontend, you'll need to configure environment variables:

### Backend

- **MONGO_URI**: MongoDB connection string
- **PORT**: The port on which the backend server will run (default: 3001)

### Frontend
- No specific environment variables are required unless necessary.

---

## License
This project is licensed under the MIT License.

---


