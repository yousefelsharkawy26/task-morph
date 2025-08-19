import { useState } from 'react';
import { TaskBoard } from '@/components/TaskBoard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LoadingScreen } from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
<<<<<<< HEAD
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-muted bg-clip-text text-transparent">
              Task Management App
=======
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary-muted bg-clip-text text-transparent">
              TaskFlow
>>>>>>> 93a310b2d750a17f73a77b431b0a21c20d89533b
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="animate-fade-in">
        <TaskBoard />
      </main>
    </div>
  );
};

export default Index;
