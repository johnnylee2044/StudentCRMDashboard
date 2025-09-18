# Undergraduate CRM Frontend

This is the frontend of the internal CRM dashboard, built with **React** and **Ant Design**. The application allows internal staff to manage student interactions, monitor application progress, communicate with students, and leverage AI for academic assistance.

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


---

## Installation

1. Clone the repository:
```bash
git clone [<frontend-repo-url>](https://github.com/johnnylee2044/StudentCRMDashboard.git)
cd dashboardFrontend

2.Install dependencies:
npm install

3.Run the development server:

npm run start

Usage

Navigate to the Student Directory to view all students.

Use filters and search to find specific students.

Click on a student to view their profile, interactions, communications, and internal notes.

Open the AI Chat to ask questions or provide guidance to students.

All communications and notes can be logged and tracked in real time.

