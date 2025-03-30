# MERN Project - Containerized with Docker Compose

## Description
This project contains a MERN (MongoDB, Express, React, Node.js) stack that has been containerized using Docker Compose with a YAML configuration.

## Prerequisites
- Docker installed
- Docker Compose  installed

## Commands to Run the Project

### 1. Build and Start the Containers
```sh
docker-compose up --build -d
```

### 2. Check Running Containers
```sh
docker ps
```

### 3. Stop the Containers
```sh
docker-compose down
```

### 4. Restart Containers Without Rebuilding
```sh
docker-compose up -d
```

### 5. Remove All Containers and Volumes
```sh
docker-compose down -v
```

## Project Structure
```
.
├──CONTAINERIZATION_OF_MERN_APPLICATION
│   ├── Brainly        # Backend (Node.js + Express)
│   ├── Brainly-frontend  # Frontend (React)
│
├── docker-compose.yml  # Docker Compose configuration
└── README.md          # Documentation
```

## Notes
- The backend service runs on port `3000`
- The frontend service runs on port `5173`
- MongoDB is mapped to port `27017`

