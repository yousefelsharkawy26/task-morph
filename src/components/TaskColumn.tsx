import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard, Task } from './TaskCard';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onAddTask: (columnId: string) => void;
}

const columnStyles = {
  todo: 'column-todo border-l-4 border-l-blue-400',
  'in-progress': 'column-progress border-l-4 border-l-yellow-400',
  done: 'column-done border-l-4 border-l-green-400',
};

export function TaskColumn({ id, title, tasks, onAddTask }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const columnStyle = columnStyles[id as keyof typeof columnStyles] || 'bg-muted/50';

  return (
    <div className="flex flex-col min-w-80 max-w-80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-foreground">{title}</h2>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddTask(id)}
          className="h-8 w-8 p-0 hover:bg-primary/10"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div
        ref={setNodeRef}
        className={`task-column ${columnStyle} ${
          isOver ? 'ring-2 ring-primary/50 bg-primary/5' : ''
        }`}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted/50 flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-sm">Drop tasks here or click + to add</p>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}