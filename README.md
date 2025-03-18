# FlagExplorerApp
## About the project
Flag Explorer is a user-friendly website that provides detailed information about countries, including their population, flag, and capital. The application features a simple interface with a home page displaying an overview of countries and a dedicated country details page for more in-depth information.

## Built With
- **Java** - Used for back-end
- **React** - Used for front-end
- **OpenAPI** - Used for API specification

This project makes use of the [RestCountries](https://restcountries.com) API found here . This project does not make use of a database.

## CI/CD
This project makes use of GitHub's CI/CD pipeline technologies. Using YAML files I've defined the CI/CD processes

```
name: CI/CD Pipeline

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  test:
    name: Run Tests
    runs-on: windows-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Set Up Java (Backend)
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '21'

      - name: Set Up Node.js (Frontend)
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Backend Dependencies
        run: |
          cd backend/flagExplorerBackend
          mvn clean install

      - name: Run Backend Tests
        run: |
          cd backend/flagExplorerBackend
          mvn test

      - name: Install Frontend Dependencies
        run: |
          cd frontend/flagExplorerFrontend
          npm install

      - name: Run Frontend Tests
        run: |
          cd frontend/flagExplorerFrontend
          npm test

  build:
    name: Build and Package
    needs: test
    runs-on: windows-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Set Up Java (Backend)
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '21'

      - name: Set Up Node.js (Frontend)
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Build Backend (Java Spring Boot)
        run: |
          cd backend/flagExplorerBackend
          mvn package

      - name: Build Frontend (React)
        run: |
          cd frontend/flagExplorerFrontend
          npm install
          npm run build
```
## Setup

**Backend**
- mvn clean compile
- mvn package
- Will start a server on localhost:8080 by default

**Frontend**
- npm install
- npm run dev
- Go to the url provided ()

****

## Usage
Go to **insert url** and click on a country you would like to know more about