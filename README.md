
# 🦎 Terra Hub

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

**Terra Hub** is a comprehensive management application for terrarium hobbyists. It helps keepers track their exotic pets (tarantulas, geckos, snakes), manage feeding schedules, and monitor life events like molting or vet visits.

> **Project Status:** 🚧 Active Development (MVP Phase)

## 🎯 Motivation

I am a Software Engineer with 4 years of experience, primarily in the Salesforce ecosystem (LWC/Apex). **Terra Hub** is my capstone project designed to bridge the gap to the Full Stack JavaScript world.

The goal is to translate my enterprise-level knowledge (Salesforce) into a modern, open-source stack using **Next.js 16, Docker, and PostgreSQL**.


## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **Language:** TypeScript
- **Database:** PostgreSQL (running in Docker)
- **ORM:** Prisma
- **Validation:** Zod
- **Styling:** Tailwind CSS + shadcn/ui
- **Containerization:** Docker & Docker Compose


## Features

- [x]  **PostgreSQL & Docker Setup:** Fully containerized local database environment.
- [x]  **Prisma Integration:** Schema-first database modeling.
- [x]  **Manage Animals:** Add and view pets using **Server Actions** (no API endpoints required).
- [x]  **Robust Validation:** Server-side data validation using **Zod** with error feedback on the UI.
- [x]  **Hybrid Architecture:** Utilization of both Server Components (for performance) and Client Components (for interactivity).


## Roadmap

- [ ]  **Feeding Schedule:** One-to-Many relation implementation for tracking feeding tasks.
- [ ]  **Calendar View:** Visual dashboard for upcoming tasks.
- [ ]  **Image Upload:** Cloud storage integration for pet photos.
- [ ]  **Timeline:** Tracking molts, weight changes, and vet visits.
- [ ]  **PWA Support:** Mobile-first approach for easy access near the terrariums.
## Project Structure

```bash
├── app/            # Next.js App Router (Views & Routing)
├── components/     # Reusable React Components (UI)
├── actions/        # Server Actions (Controllers & Entry Points)
├── services/       # Business Logic & Database Calls (Service Layer)
├── lib/            # Configuration & Utilities (Prisma Client Singleton)
└── prisma/         # Database Schema
```
## Authors

- [@melatonina0015](https://www.github.com/octokatherine) | Amelia Kwiecińska

