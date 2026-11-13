
# CampusFlow — Student Task Management Dashboard

A simple and responsive task management website built using React.js, JavaScript, and CSS. This project helps students organize their daily tasks, manage deadlines, and track their progress.

## Features

- Add new tasks with a title and deadline.
- Mark tasks as completed or pending.
- Edit and delete existing tasks.
- Filter tasks by All, Pending, and Completed.
- View total, completed, and pending task counts.
- Track task completion using a progress bar.
- View upcoming deadlines.
- Save tasks using browser Local Storage.
- Responsive design for desktop and mobile devices.

## Technologies Used

- **React.js** — Building reusable UI components
- **JavaScript** — Task management functionality
- **HTML5** — Webpage structure
- **CSS3** — Styling and responsive layout
- **Vite** — Development and build tool
- **Local Storage** — Saving tasks in the browser
- **Git & GitHub** — Version control

## Project Structure

```text
student-task-dashboard/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── StatCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskItem.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/student-task-dashboard.git
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Open the Project Folder

```bash
cd student-task-dashboard
```

### 3. Install Dependencies

Make sure Node.js and npm are installed.

```bash
npm install
```

### 4. Run the Application

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

http://localhost:5173/

## How It Works

1. Users enter a task title and select a deadline.
2. The task is added to the dashboard.
3. Users can edit, delete, or mark tasks as completed.
4. Tasks can be filtered based on their completion status.
5. The dashboard automatically updates the task statistics.
6. Tasks are stored in browser Local Storage, so they remain available after refreshing the page.

## Future Improvements

- Add task priority levels (High, Medium, Low).
- Implement task search functionality.
- Add task categories such as Study, Placement, and Personal.
- Add a dark mode option.
- Integrate a backend using Node.js and Express.js.
- Store tasks in a database.
- Add user authentication.

## Learning Outcomes

Through this project, I am learning:

- React components and props
- React Hooks such as useState and useEffect
- Handling forms and user interactions
- Managing application state
- Working with browser Local Storage
- Building responsive web interfaces
- Organizing a frontend project into reusable components
- Using Git and GitHub for version control

## Author

Developed as a frontend development learning project using React.js.
