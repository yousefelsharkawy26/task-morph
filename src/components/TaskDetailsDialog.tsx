import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, Edit, Trash2 } from 'lucide-react';
import { Task } from './TaskCard';

interface TaskDetailsDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export function TaskDetailsDialog({ task, open, onOpenChange, onEdit, onDelete }: TaskDetailsDialogProps) {
  if (!task) return null;

  const handleEdit = () => {
    onEdit(task);
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-lg font-semibold">Task Details</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleEdit}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
            <Badge
              variant="secondary"
              className={`text-xs px-2 py-1 ${priorityColors[task.priority]}`}
            >
              {task.priority} priority
            </Badge>
          </div>

          {task.description && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Description</h4>
              <p className="text-sm">{task.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {task.assignee && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Assignee</h4>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{task.assignee}</span>
                </div>
              </div>
            )}

            {task.dueDate && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Due Date</h4>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}