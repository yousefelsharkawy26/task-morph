import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { TaskColumn } from './TaskColumn';
import { TaskCard, Task } from './TaskCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddTaskForm } from './AddTaskForm';
import { Plus } from 'lucide-react';

interface Column {
  id: string;
  title: string;
}

const columns: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design user interface mockups',
    description: 'Create wireframes and high-fidelity designs for the new dashboard',
    priority: 'high',
    assignee: 'Alex Chen',
    dueDate: new Date(2024, 0, 25),
  },
  {
    id: '2',
    title: 'Set up project repository',
    description: 'Initialize Git repo and configure CI/CD pipeline',
    priority: 'medium',
    assignee: 'Sarah Kim',
    dueDate: new Date(2024, 0, 22),
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all endpoints with examples and response schemas',
    priority: 'low',
    assignee: 'Mike Johnson',
    dueDate: new Date(2024, 0, 30),
  },
];

const initialTaskAssignments = {
  todo: ['1', '2'],
  'in-progress': ['3'],
  done: [],
};

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskAssignments, setTaskAssignments] = useState(initialTaskAssignments);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string>('todo');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which columns the active and over items are in
    const activeColumn = Object.keys(taskAssignments).find(columnId =>
      taskAssignments[columnId].includes(activeId)
    );
    const overColumn = columns.find(col => col.id === overId)?.id ||
      Object.keys(taskAssignments).find(columnId =>
        taskAssignments[columnId].includes(overId)
      );

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setTaskAssignments(prev => {
      const activeItems = [...prev[activeColumn]];
      const overItems = [...prev[overColumn]];

      const activeIndex = activeItems.findIndex(id => id === activeId);
      const overIndex = overItems.findIndex(id => id === overId);

      activeItems.splice(activeIndex, 1);
      overItems.splice(overIndex >= 0 ? overIndex : overItems.length, 0, activeId);

      return {
        ...prev,
        [activeColumn]: activeItems,
        [overColumn]: overItems,
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = Object.keys(taskAssignments).find(columnId =>
      taskAssignments[columnId].includes(activeId)
    );

    if (!activeColumn) return;

    // If dropping on a column, move to end
    const targetColumn = columns.find(col => col.id === overId);
    if (targetColumn) {
      setTaskAssignments(prev => {
        const newAssignments = { ...prev };
        newAssignments[activeColumn] = newAssignments[activeColumn].filter(id => id !== activeId);
        newAssignments[targetColumn.id] = [...newAssignments[targetColumn.id], activeId];
        return newAssignments;
      });
      return;
    }

    // Reordering within the same column
    const overColumn = Object.keys(taskAssignments).find(columnId =>
      taskAssignments[columnId].includes(overId)
    );

    if (activeColumn === overColumn) {
      setTaskAssignments(prev => {
        const items = [...prev[activeColumn]];
        const oldIndex = items.findIndex(id => id === activeId);
        const newIndex = items.findIndex(id => id === overId);
        return {
          ...prev,
          [activeColumn]: arrayMove(items, oldIndex, newIndex),
        };
      });
    }
  };

  const handleAddTask = (columnId: string) => {
    setSelectedColumnId(columnId);
    setDialogOpen(true);
  };

  const handleTaskSubmit = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };

    setTasks(prev => [...prev, task]);
    setTaskAssignments(prev => ({
      ...prev,
      [selectedColumnId]: [...prev[selectedColumnId], task.id],
    }));
    setDialogOpen(false);
  };

  return (
    <div className="h-full p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-muted bg-clip-text text-transparent">
            Task Board
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your projects with drag-and-drop simplicity
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground shadow-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <AddTaskForm onSubmit={handleTaskSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-x-auto pb-6 col-3">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={taskAssignments[column.id].map(id => 
                tasks.find(task => task.id === id)!
              ).filter(Boolean)}
              onAddTask={handleAddTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}