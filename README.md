# Dashboard Backend

This is the backend service for the **Dashboard** project, a lightweight internal CRM system used to manage student interactions on [undergraduation.com](#). The backend provides APIs for student data management, communication logs, application tracking, and integration with LLMs using **LangChain4j**.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [LLM Integration](#llm-integration)
- [Testing](#testing)
- [License](#license)

---

## Features
- **Student Management**
  - Fetch student list
  - Track application progress
  - Store interaction history
- **Communication Logs**
  - Record emails, SMS, or notes
  - Add, edit, and delete internal notes
- **LLM Integration**
  - Connects with Google Gemini via LangChain4j for AI-driven student insights
  - Provides AI-generated guidance or summaries for each student
- **Security**
  - JWT-based authentication
  - Role-based access control

---

## Tech Stack
- **Java 24**
- **Spring Boot 3.5.5**
- **Spring Data JPA** – for database interaction
- **Spring Security** – authentication & authorization
- **MySQL Connector** – database driver
- **LangChain4j** – AI integration for LLM connections
- **Lombok** – reduces boilerplate code
- **Maven** – build and dependency management

---

## Getting Started

### Prerequisites
- Java 24+
- Maven 3.8+
- MySQL 8+
- (Optional) Postman for API testing



### Clone the Repository
git clone <your-repo-url>
cd dashboard
git checkout dashboard-Backend


### Demonstration
https://www.loom.com/share/e84a508c2a0843188a8228ca769442e4








