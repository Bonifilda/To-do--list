 Draggable Tasks App
This project is a simple React draggable tasks application where users can:
Add tasks
Drag tasks anywhere on the screen
Auto-prevent overlapping between tasks
Save tasks in localStorage so they persist after refresh
Delete tasks
It uses React Hooks (useState, useEffect, useRef) and pure mouse events for drag-and-drop.
 Features
- Add Tasks
Users can type a task and click Add.
The task appears below the input in the nearest free space.
- Draggable Cards
Each task card can be dragged anywhere on the window.
It automatically stays inside the viewport.
- Auto Collision Avoidance
Tasks will never overlap.
If a dragged task overlaps, it moves to the nearest free position.
- Local Storage
All tasks are saved in the browser, so refreshing the page will not delete them.

- Delete Tasks
Click ❌ to remove a task from the list.
* Project Structure
src/
 └── App.jsx
 └── index.js

-Technologies Used
React.js

TailwindCSS (for styling)

LocalStorage (for saving tasks)

JavaScript mouse events (drag & drop)

▶ How to Run the Project

Clone the repository

git clone your-repo-link
Install dependencies
npm install
Start the development server
npm run dev
Future Improvements

Add animations when dragging

Add categories or colors

Add deadlines and reminders

Enable resizing task boxes

📄 License

This project is free to use. Customize it as you like for learning or personal projects.
