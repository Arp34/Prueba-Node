# RiwiMediCare Plus - Medical Supply & Inventory API

## Coder Information
* Full Name: Axel David Ruiz Polo
* Clan: Centurion
* Module: Node.js
* GitHub Repository: https://github.com/Arp34/Prueba-Node.git

## Project Description
RESTful API built with Node.js, Express, TypeScript, Sequelize ORM, and PostgreSQL to manage medical inventory, supply requests, clinics, warehouses, and users with Role-Based Access Control (RBAC).

## Environment Variables (.env.example)
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=adminpassword
DB_NAME=riwimedicare_db
JWT_SECRET=super_secret_jwt_key

## Tech Stack
* Node.js & Express (TypeScript)
* Sequelize ORM & PostgreSQL
* Docker & Docker Compose
* Jest & Supertest
* Swagger JSDoc & Swagger UI
* Multer

## Installation & Setup Instructions
1. Clone the repository:
   git clone https://github.com/Arp34/Prueba-Node.git
   cd api-template

2. Install dependencies:
   npm install

3. Run PostgreSQL using Docker Compose:
   docker compose up -d

4. Start the server in development mode:
   npm run dev

## Bulk JSON Seeder (Multer Endpoint)
To populate the database using the provided JSON file, make a POST request:
* Endpoint: POST http://localhost:3000/api/seeders/seed
* Request Type: form-data
* Key: file (Type: File)
* Value: Attach the data-seed.json file located at the project root.

## API Documentation (Swagger UI)
Access the interactive Swagger UI documentation at:
http://localhost:3000/api-docs

## GitHub Repository
https://github.com/Arp34/Prueba-Node