
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ToolCard = ({ icon: Icon, title, description, onClick, isActive }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`tool-card cursor-pointer ${isActive ? 'ring-2 ring-primary' : ''}`} onClick={onClick}>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-blue-500/30 hover:from-blue-500/20 hover:to-purple-600/20"
            >
              Use Tool
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ToolCard;
