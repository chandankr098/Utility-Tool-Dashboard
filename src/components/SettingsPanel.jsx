
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Settings, Globe, Volume2 } from 'lucide-react';

const SettingsPanel = ({ settings, onSettingsChange, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-4 top-4 bottom-4 w-80 z-40"
    >
      <Card className="h-full glass-effect border-purple-500/30">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-full">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <span className="gradient-text">Settings</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium">Language</span>
            </div>
            <Select value={settings.language} onValueChange={(value) => onSettingsChange('language', value)}>
              <SelectTrigger className="bg-white/5 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium">Tone</span>
            </div>
            <Select value={settings.tone} onValueChange={(value) => onSettingsChange('tone', value)}>
              <SelectTrigger className="bg-white/5 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Current Settings</span>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Language:</span>
                  <span className="text-blue-400">{settings.language.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tone:</span>
                  <span className="text-purple-400 capitalize">{settings.tone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20">
              <p className="text-xs text-muted-foreground">
                These settings will affect how the AI tools process and respond to your requests.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SettingsPanel;
