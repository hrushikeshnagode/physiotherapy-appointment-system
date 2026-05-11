# Physiotherapy Appointment System 🩺

A professional, role-based healthcare platform built with **Java (Spring Boot)** and **React (Vite)**. The system allows patients to discover physiotherapists, book 30-minute slots with mock payments, and manage their recovery journey, while physiotherapists can manage their availability and patient schedules.

## 🚀 Step-by-Step Development Overview

### Phase 1: Backend Foundation (Spring Boot)
1.  **Architecture Setup**: Initialized a Spring Boot 3.2.5 project with Java 17, JPA, MySQL, and Security.
2.  **Entity Modeling**: Defined `User` (Role-based), `PhysiotherapistProfile`, `AppointmentSlot`, and `Appointment` entities.
3.  **Security Layer**: Implemented JWT-based stateless authentication with `JwtAuthFilter` and `SecurityConfig`.
4.  **Service Logic**: 
    *   **Slot Generation**: Built an automated logic for physiotherapists to generate 30-min slots for any given date.
    *   **Auto-Reschedule**: Implemented a "Pro" feature where booking a new slot on a day automatically releases the patient's previous slot on that same day.
    *   **Availability Tracking**: Created efficient queries to identify doctors with open slots for "Today".

### Phase 2: Frontend "Pro" Overhaul (React + Vite)
1.  **Design System**: Built a custom, high-end CSS framework in `index.css` featuring:
    *   **Glassmorphism**: Translucent cards and navigation.
    *   **Premium Palette**: Modern Indigo and Medical Teal.
    *   **Typography**: Clean look using the 'Outfit' font family.
2.  **Navigation**: Developed a sticky, glassmorphic Navbar with dynamic links based on user roles.
3.  **Hero Section**: Created a professional landing page with value-propositions and visual mockups.
4.  **Dashboard Experience**:
    *   **Patient**: A gallery of physiotherapists with real-time "⚡ Available Today" badges.
    *   **Physio**: A management console for publishing slots and updating consultation fees.
5.  **Booking Flow**: A focused, sidebar-driven booking page with specialized date selectors and time grids.

### Phase 3: Polish & Reliability
1.  **Duplicate Protection**: Restricted patients to one appointment per day across the platform.
2.  **Global Exception Handling**: Implemented a unified error response system for better debugging and UX.
3.  **Responsive UI**: Optimized all layouts for a smooth desktop and mobile experience.

---

## 🛠️ Tech Stack
*   **Backend**: Java 17, Spring Boot, Spring Security (JWT), Hibernate, MySQL.
*   **Frontend**: React 18, Vite, Bootstrap 5, Axios, React Router 6.
*   **Design**: Custom CSS, Glassmorphism, Google Fonts (Outfit).

---

## 💻 How to Run

### Prerequisites
*   MySQL Server (Database: `physio_db`)
*   JDK 17+
*   Node.js & npm

### Start Backend
```powershell
cd physiotherapy-appointment-system
.\mvnw spring-boot:run
```

### Start Frontend
```powershell
cd physiotherapy-appointment-system/frontend
npm install
npm run dev
```

---

## 🔑 Key Credentials (for testing)
*   **Patient**: Register via Signup toggle.
*   **Physio**: Register via Signup toggle (requires qualification/fees).
*   **Mock Payment**: All payments are automatically approved for demo purposes.