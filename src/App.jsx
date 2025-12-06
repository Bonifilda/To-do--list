import { useState, useEffect, useRef } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  const TASK_WIDTH = 180;
  const TASK_HEIGHT = 70;
  const SPACING = 10;
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  
  const isOverlapping = (taskA, taskB) => {
    return !(
      taskA.x + TASK_WIDTH + SPACING < taskB.x ||
      taskA.x > taskB.x + TASK_WIDTH + SPACING ||
      taskA.y + TASK_HEIGHT + SPACING < taskB.y ||
      taskA.y > taskB.y + TASK_HEIGHT + SPACING
    );
  };
  const findFreePosition = (x, y, skipIndex = null) => {
    let newX = x;
    let newY = y;
    let collision = true;

    while (collision) {
      collision = false;
      for (let i = 0; i < tasks.length; i++) {
        if (i === skipIndex) continue;
        const t = tasks[i];
        if (isOverlapping({ x: newX, y: newY }, t)) {
          newY += TASK_HEIGHT + SPACING;
          collision = true;
          break;
        }
      }
    }

    const maxX = window.innerWidth - TASK_WIDTH - 10;
    const maxY = window.innerHeight - TASK_HEIGHT - 10;
    if (newX > maxX) newX = maxX;
    if (newY > maxY) newY = maxY;

    return { x: newX, y: newY };
  };

  
  const addTask = () => {
    if (newTask.trim() === "") return;

    const inputBox = inputRef.current?.getBoundingClientRect();
    const startX = inputBox ? inputBox.left : 100;
    const startY = inputBox ? inputBox.bottom + 20 : 100;

    const { x, y } = findFreePosition(startX, startY);
    const updated = [...tasks, { text: newTask, x, y }];
    setTasks(updated);
    setNewTask("");
  };

  
  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };


  const handleMouseDown = (e, index) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const task = tasks[index];

    const offsetX = startX - task.x;
    const offsetY = startY - task.y;

    const onMouseMove = (event) => {
      let newX = event.clientX - offsetX;
      let newY = event.clientY - offsetY;

  
      const maxX = window.innerWidth - TASK_WIDTH - 10;
      const maxY = window.innerHeight - TASK_HEIGHT - 10;
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX > maxX) newX = maxX;
      if (newY > maxY) newY = maxY;

      setTasks((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], x: newX, y: newY };
        return updated;
      });
    };

    const onMouseUp = () => {

      setTasks((prev) => {
        const updated = [...prev];
        const moved = updated[index];
        const { x, y } = findFreePosition(moved.x, moved.y, index);
        updated[index] = { ...moved, x, y };
        return updated;
      });

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="relative min-h-screen bg-blue-100 overflow-hidden">
    
      <div className="p-4 flex justify-center items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a new task..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-white"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-pink-400 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

    
      {tasks.map((task, index) => (
        <div
          key={index}
          onMouseDown={(e) => handleMouseDown(e, index)}
          style={{
            position: "absolute",
            left: `${task.x}px`,
            top: `${task.y}px`,
            width: `${TASK_WIDTH}px`,
            height: `${TASK_HEIGHT}px`,
            userSelect: "none",
          }}
          className="bg-white shadow-lg rounded-xl p-3 text-gray-800 flex justify-between items-center cursor-move active:scale-95 transition-transform"
        >
          <span>{task.text}</span>
          <button
            onClick={() => deleteTask(index)}
            className="text-red-500 hover:text-red-700"
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
