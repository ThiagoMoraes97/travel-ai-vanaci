import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';

interface FloatingChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasUnread?: boolean;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ 
  isOpen, 
  onClick, 
  hasUnread = false 
}) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={`
        fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-xl
        transition-all duration-300 transform hover:scale-110
        ${isOpen 
          ? 'bg-destructive hover:bg-destructive/90' 
          : 'bg-gradient-to-r from-primary to-secondary hover:shadow-2xl'
        }
      `}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <div className="relative">
          <MessageCircle className="h-6 w-6" />
          {hasUnread && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
        </div>
      )}
      
      {!isOpen && (
        <div className="absolute -top-12 right-0 bg-foreground text-background px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Fale com nossa IA
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
        </div>
      )}
    </Button>
  );
};

export default FloatingChatButton;