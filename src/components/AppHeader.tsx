import React from 'react';
import { MessageSquare, Plane, User, Heart, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AppHeader = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Plane className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Travel AI</h1>
                <p className="text-xs text-muted-foreground">Hospedagem Inteligente</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Hotéis
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Voos
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Pacotes
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Experiências
              </a>
            </nav>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>Chat IA disponível</span>
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            </Button>
            
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;