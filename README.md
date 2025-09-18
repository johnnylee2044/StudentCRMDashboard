# Undergraduate CRM Frontend

This is the frontend of the internal CRM dashboard for **undergraduation.com**, built with **React** and **Ant Design**. The application allows internal staff to manage student interactions, monitor application progress, communicate with students, and leverage AI for academic assistance.

---

## Features

### AI Chat
- Chat with an AI academic advisor using a modern chat interface.
- Messages are streamed line by line from the backend.
- Shows AI and user avatars with timestamps.
- Handles errors gracefully if the backend fails to respond.

### Student Directory
- Table view of all students with quick search and filters.
- Key columns:
  - Name
  - Email
  - Country
  - Application Status (`Exploring`, `Shortlisting`, `Applying`, `Submitted`)
  - Last Active
- Click on a student to open their detailed profile.

### Student Profile
- **Basic Info**: Name, email, phone, grade, country, application status, and last active.
- **Interaction Timeline**: Login activity, AI questions, document submissions.
- **Communications**: Logs of emails, SMS, and other communications.
- **Internal Notes**: Add, edit, or delete internal notes about the student.
- **Progress Bar**: Visual indicator of application stage.

### Communication Tools
- Log communications manually (e.g., "Called student to discuss essays").
- Mock follow-up email functionality.
- Schedule reminders or tasks for internal team members.

### Filters & Insights
- Quick filters such as:
  - Students not contacted in 7 days
  - High intent
  - Needs essay help
- Display summary stats like:
  - Number of active students
  - Students in essay stage
- Search bar to find students by name, email, or country.

---

## Tech Stack
- **React** (with TypeScript)
- **Ant Design** for UI components
- **Axios** for API requests
- **React Router** for navigation
- **CSS Modules / Custom CSS** for styling




