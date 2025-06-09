import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ChatInterface = ({ activeTool, onClose, settings }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (activeTool) {
      let initialMessage = `Hi! I'm ready to help you with ${activeTool.title.toLowerCase()}. What would you like me to do?`;
      if (activeTool.type === 'chat') {
        initialMessage = `Hello! I'm your AI Assistant. How can I help you today? Feel free to ask me anything or request a task.`;
      }
      if (activeTool.type === 'translate') {
        initialMessage = `Hi! I can translate English text to Hindi for you. Please enter the English text.`;
      }
      setMessages([{
        id: Date.now(),
        type: 'bot',
        content: initialMessage
      }]);
    }
  }, [activeTool]);

  const translateTextToHindi = async (text) => {
    if (!text.trim()) {
      return "Please provide some English text to translate.";
    }
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      if (data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      } else if (data.matches && data.matches.length > 0) {
        const bestMatch = data.matches.find(match => match.translation && match.quality > 70) || data.matches[0];
        if (bestMatch && bestMatch.translation) {
          return bestMatch.translation;
        }
      }
      throw new Error("Translation not found in API response.");
    } catch (error) {
      console.error("Translation API error:", error);
      return `Sorry, I couldn't translate that. Error: ${error.message}. Please try again.`;
    }
  };


  const simulateAIResponse = async (userInput, toolType, currentSettings) => {
    const { language, tone } = currentSettings; 
    let responsePrefix = `(Tone: ${tone}) `;
    
    if (toolType !== 'translate') {
      responsePrefix = `(Using language: ${language.toUpperCase()}, tone: ${tone}) ` + responsePrefix;
    }


    switch (toolType) {
      case 'summarize':
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!userInput.trim()) {
          return `${responsePrefix}Please provide some text for me to summarize.`;
        }
        return `${responsePrefix}Here's a summary of your text:\n\n• Main points extracted from your content (influenced by ${tone} tone).\n• Key insights and important details highlighted.\n• Concise overview maintaining essential information.\n\nThe text appears to focus on "${userInput.split(' ').slice(0, 5).join(' ')}..." and I've condensed it for you.`;
      
      case 'translate':
        if (!userInput.trim()) {
          return `Please provide English text for translation to Hindi.`;
        }
        const translatedText = await translateTextToHindi(userInput);
        return `Original (English): "${userInput}"\n\nTranslation (Hindi):\n"${translatedText}"\n\n(Translation by MyMemory API. Tone setting '${tone}' is not applicable for this direct translation.)`;
      
      case 'email':
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!userInput.trim()) {
          return `${responsePrefix}Please describe the email you want me to generate (e.g., "an email to my boss asking for a raise").`;
        }
        return `${responsePrefix}I've generated a ${tone} email for you regarding "${userInput.slice(0,30)}...":\n\n**Subject:** Regarding Your Request: ${userInput.slice(0,20)}...\n\n**Body:**\nDear [Recipient Name],\n\nI hope this email finds you well. I am writing to you concerning ${userInput.slice(0, 50)}...\n\nConsidering your input, I have crafted this message with a ${tone} tone, focusing on clarity and achieving your objective. This draft is in ${language.toUpperCase()}.\n\nBest regards,\n[Your Name]`;
      
      case 'chat':
        await new Promise(resolve => setTimeout(resolve, 1000));
         if (!userInput.trim()) {
          return `${responsePrefix}What can I assist you with today? Ask me anything!`;
        }
        return `${responsePrefix}Okay, I'm processing your request: "${userInput}".\n\nAs your general AI assistant, I can help with various tasks. For instance, if you asked me to write a poem, I'd try my best! This response is tailored with a ${tone} style and in ${language.toUpperCase()}.\n\nSimulated Action: Scheduling a meeting for tomorrow at 10 AM based on your request.`;

      default:
        await new Promise(resolve => setTimeout(resolve, 1000));
        return `${responsePrefix}I've processed your request: "${userInput}". This is a simulated response demonstrating the ${toolType} functionality.`;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await simulateAIResponse(currentInput, activeTool?.type, settings);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response
      };

      setMessages(prev => [...prev, botMessage]);
      toast({
        title: "Task processed!",
        description: `${activeTool?.title} operation completed.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Something went wrong. ${error.message || "Please try again."}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  let placeholderText = `Type your request for ${activeTool?.title.toLowerCase()}...`;
  if (activeTool?.type === 'summarize') placeholderText = "Paste or type the text you want to summarize...";
  else if (activeTool?.type === 'translate') placeholderText = "Enter English text to translate to Hindi...";
  else if (activeTool?.type === 'email') placeholderText = "Describe the email (e.g., 'Draft an email to a client about project updates')...";
  else if (activeTool?.type === 'chat') placeholderText = "Ask me anything or describe the task...";


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 p-4 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <Card className="relative w-full max-w-2xl h-full max-h-[90vh] md:max-h-[700px] glass-effect border-blue-500/30 flex flex-col">
        <CardHeader className="border-b border-white/10 flex-shrink-0">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-50"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                  {activeTool?.icon && <activeTool.icon className="h-5 w-5 text-white" />}
                </div>
              </div>
              <span className="gradient-text">{activeTool?.title}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full self-start mt-1 ${message.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                      {message.type === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                    </div>
                    <div className={`p-3 rounded-lg chat-bubble ${
                      message.type === 'user' 
                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-100' 
                        : 'bg-purple-500/20 border border-purple-500/30 text-purple-100'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2">
                  <div className="p-2 rounded-full bg-purple-500 mt-1">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-300" />
                      <span className="text-sm text-purple-200">Processing...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-white/10 p-4 flex-shrink-0">
            <div className="flex space-x-2 items-end">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholderText}
                className="flex-1 min-h-[60px] max-h-[150px] resize-none bg-white/5 border-white/20 placeholder:text-muted-foreground/70"
                disabled={isLoading}
                rows={1}
              />
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-[60px]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ChatInterface;