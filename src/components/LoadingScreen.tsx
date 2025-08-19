import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const steps = [
    'Initializing workspace...',
    'Loading your tasks...',
    'Setting up board...',
    'Ready to go!',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        const newProgress = prev + 2;
        const newStep = Math.floor((newProgress / 100) * steps.length);
        setStep(Math.min(newStep, steps.length - 1));
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-8 animate-fade-in">
        {/* Logo/Icon */}
        <div className="relative">
          <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-glow animate-bounce-gentle">
            <CheckCircle className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-muted bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <p className="text-muted-foreground">
            Your modern task management solution
          </p>
        </div>

        {/* Progress */}
        <div className="w-80 space-y-4">
          <div className="relative">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full gradient-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {steps[step]}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {progress}% Complete
          </div>
        </div>
      </div>
    </div>
  );
}