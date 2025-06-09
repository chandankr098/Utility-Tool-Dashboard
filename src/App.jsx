import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, FileText, Languages, Mail, Settings, Sparkles, Zap, Brain } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import ChatInterface from '@/components/ChatInterface';
import SettingsPanel from '@/components/SettingsPanel';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';

const tools = [
  {
    id: 'summarize',
    type: 'summarize',
    icon: FileText,
    title: 'Text Summarizer',
    description: 'Condense long texts into key points and insights'
  },
  {
    id: 'translate',
    type: 'translate',
    icon: Languages,
    title: 'Smart Translator',
    description: 'Translate text between multiple languages instantly'
  },
  {
    id: 'email',
    type: 'email',
    icon: Mail,
    title: 'Email Generator',
    description: 'Create professional emails with perfect tone and structure'
  },
  {
    id: 'chat',
    type: 'chat',
    icon: MessageSquare,
    title: 'AI Assistant',
    description: 'General purpose AI helper for any task or question'
  }
];

function App() {
  const [activeTool, setActiveTool] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('smartUtilitySettings');
    return saved ? JSON.parse(saved) : {
      language: 'en',
      tone: 'professional'
    };
  });

  useEffect(() => {
    localStorage.setItem('smartUtilitySettings', JSON.stringify(settings));
  }, [settings]);

  const handleToolClick = (tool) => {
    setActiveTool(tool);
    toast({
      title: `${tool.title} activated!`,
      description: `Ready to help you with ${tool.type} tasks.`,
    });
  };

  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated!",
      description: `${key} changed to ${value}`,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Background Orbs */}
      <div className="floating-orb w-64 h-64 top-10 left-10" style={{ animationDelay: '0s' }}></div>
      <div className="floating-orb w-48 h-48 top-1/2 right-20" style={{ animationDelay: '2s' }}></div>
      <div className="floating-orb w-32 h-32 bottom-20 left-1/3" style={{ animationDelay: '4s' }}></div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-50 pulse-ring"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Smart Utility Dashboard</h1>
              <p className="text-muted-foreground">AI-powered tools for productivity and creativity</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowSettings(!showSettings)}
            className="glass-effect border-purple-500/30 hover:border-purple-500/50"
          >
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </Button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="h-6 w-6 text-yellow-400 mr-2" />
              <span className="text-2xl font-bold">4</span>
            </div>
            <p className="text-sm text-muted-foreground">AI Tools Available</p>
          </div>
          
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-6 w-6 text-blue-400 mr-2" />
              <span className="text-2xl font-bold">∞</span>
            </div>
            <p className="text-sm text-muted-foreground">Tasks Processed</p>
          </div>
          
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Brain className="h-6 w-6 text-purple-400 mr-2" />
              <span className="text-2xl font-bold">24/7</span>
            </div>
            <p className="text-sm text-muted-foreground">AI Availability</p>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Choose Your AI Tool</h2>
            <p className="text-muted-foreground">Select a tool below to get started with AI-powered assistance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ToolCard
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  onClick={() => handleToolClick(tool)}
                  isActive={activeTool?.id === tool.id}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect rounded-xl p-8"
        >
          <h3 className="text-xl font-bold mb-6 text-center">Why Choose Our Smart Utility Dashboard?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full w-fit mx-auto mb-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Lightning Fast</h4>
              <p className="text-sm text-muted-foreground">Get instant results with our optimized AI processing</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-full w-fit mx-auto mb-3">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Smart & Adaptive</h4>
              <p className="text-sm text-muted-foreground">AI that learns and adapts to your preferences</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-500 to-red-600 p-3 rounded-full w-fit mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Multiple Tools</h4>
              <p className="text-sm text-muted-foreground">All your productivity tools in one beautiful dashboard</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Chat Interface Modal */}
      <AnimatePresence>
        {activeTool && (
          <ChatInterface
            activeTool={activeTool}
            onClose={() => setActiveTool(null)}
            settings={settings}
          />
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <SettingsPanel
            settings={settings}
            onSettingsChange={handleSettingsChange}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  );
}

export default App;