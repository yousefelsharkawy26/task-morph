import { ref, push, get, update, remove } from "firebase/database";
import { db, login } from '../firebase'; // Adjust the import path as necessary

// login first
async function doLogin() {
  try {
    await login("test@example.com", "123456");
    console.log("✅ Logged in successfully");
  } catch (err) {
    console.error("❌ Login failed:", err);
  }
}

// ✅ 1. Create Task
export const createTask = async (task: {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: string;
  dueDate: string;
  processNumber?: number; // Optional field for process number
}) => {
  const tasksRef = ref(db, "tasks");
  const newTaskRef = await push(tasksRef, task);
  return { id: newTaskRef.key, ...task };
};

// ✅ 2. Read All Tasks
export const getTasks = async () => {
  const snapshot = await get(ref(db, "tasks"));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  }
  return [];
};

// ✅ 3. Update Task
export const updateTask = async (
  taskId: string,
  updates: Partial<{
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    assignee: string;
    dueDate: string;
    processNumber: number;
  }>
) => {
  const taskRef = ref(db, `tasks/${taskId}`);
  await update(taskRef, updates);
};

// ✅ 4. Delete Task
export const deleteTask = async (taskId: string) => {
  const taskRef = ref(db, `tasks/${taskId}`);
  await remove(taskRef);
};

// Example usage
// (async () => {
//   await doLogin();
//   await createTask({
//     title: "Learn Firebase Auth",
//     description: "Protect Realtime Database",
//     priority: "high",
//     assignee: "Yousef",
//     dueDate: "2025-08-20"
//   });
// })();