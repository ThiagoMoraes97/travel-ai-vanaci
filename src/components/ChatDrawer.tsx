import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersUpdate: (filters: any) => void;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose, onFiltersUpdate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou sua assistente inteligente de viagens 🤖✈️\n\nPosso ajudá-lo a:\n• Filtrar hotéis por preferências\n• Encontrar melhores preços\n• Sugerir destinos\n• Personalizar sua busca\n\nComo posso ajudá-lo hoje?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callAIWebhook = async (userMessage: string): Promise<string> => {
    try {
      // URL do webhook do n8n - substitua pela sua URL real
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/chat-ai';
      
      const response = await axios.post(webhookUrl, {
        message: userMessage,
        context: 'hotel_search',
        timestamp: new Date().toISOString(),
        id: crypto.randomUUID()
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 segundos de timeout
      });

      // Processa a resposta da IA
      const aiResponse = response.data;

      console.log('Resposta da IA:', aiResponse);
      
      // Se a IA retornou filtros para aplicar
      if (aiResponse.filters) {
        setTimeout(() => {
          onFiltersUpdate(aiResponse.filters);
        }, 2000);
      }
      
      // Retorna a mensagem da IA
      return aiResponse.message || aiResponse.response || 'Desculpe, não consegui processar sua solicitação no momento.';
      
    } catch (error) {
      console.error('Erro ao chamar webhook da IA:', error);
      
      // Fallback para resposta local em caso de erro
      return 'Desculpe, estou com problemas de conexão no momento. Tente novamente em alguns instantes.\n\nEnquanto isso, você pode usar os filtros manuais para encontrar hotéis específicos.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Chama o webhook da IA
      const aiResponse = await callAIWebhook(messageToSend);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erro ao processar resposta da IA:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickSuggestions = [
    "Hotéis baratos no Rio",
    "Opções de luxo com spa",
    "Hotéis com piscina",
    "Melhores para família"
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col">
        <SheetHeader className="p-4 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            Assistente IA
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            Sua busca personalizada em tempo real
          </p>
        </SheetHeader>

        <ScrollArea className="flex-1 p-4 chat-scroll">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-chat-user-bg text-chat-user-text ml-auto'
                      : 'bg-chat-ai-bg text-chat-ai-text'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-chat-ai-bg text-chat-ai-text rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.1s]"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Quick Suggestions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-b bg-muted/20">
            <p className="text-xs font-medium text-muted-foreground mb-2">Sugestões rápidas:</p>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setInputValue(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ex: 'Hotéis baratos com piscina'"
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon"
              disabled={!inputValue.trim() || isTyping}
              className="bg-primary hover:bg-primary-hover"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            A IA atualiza os filtros automaticamente
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatDrawer;