
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square,
  Settings,
  Languages
} from "lucide-react";

export default function TextToSpeech({ text, language = "en", autoPlay = false, showControls = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([0.8]);
  const [speed, setSpeed] = useState([1]);
  const [voice, setVoice] = useState("default");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  const voices = {
    en: [
      { id: "default", name: "Default Voice" },
      { id: "female", name: "Female Voice" },
      { id: "male", name: "Male Voice" }
    ],
    hi: [
      { id: "default", name: "डिफ़ॉल्ट आवाज़" },
      { id: "female", name: "महिला आवाज़" },
      { id: "male", name: "पुरुष आवाज़" }
    ]
  };

  const currentVoices = voices[language] || voices.en;

  // Cleanup function
  const cleanup = useCallback(() => {
    try {
      if (currentUtterance) {
        window.speechSynthesis.cancel();
        setCurrentUtterance(null);
      }
      setIsPlaying(false);
    } catch (error) {
      console.warn('Error during cleanup:', error);
    }
  }, [currentUtterance]);

  // Generate and play audio using Web Speech API - removed 'voice' from dependencies
  const generateAndPlayAudio = useCallback(async () => {
    if (!text || text.trim().length === 0) return;

    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      alert(language === "en" ? "Speech synthesis not supported" : "वाक संश्लेषण समर्थित नहीं");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Cancel any ongoing speech
      cleanup();
      
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
      utterance.rate = speed[0];
      utterance.pitch = 1;
      utterance.volume = volume[0];

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsGenerating(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentUtterance(null);
      };

      utterance.onerror = (event) => {
        console.warn('Speech synthesis error:', event.error);
        // Only show alert for non-interruption errors
        if (event.error !== 'interrupted') {
          console.error('Speech error:', event.error);
        }
        setIsPlaying(false);
        setCurrentUtterance(null);
      };

      utterance.onpause = () => {
        setIsPlaying(false);
      };

      utterance.onresume = () => {
        setIsPlaying(true);
      };

      setCurrentUtterance(utterance);
      window.speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Error generating audio:', error);
      setIsGenerating(false);
      setIsPlaying(false);
    }
  }, [text, language, speed, volume, cleanup]);

  const playAudio = () => {
    generateAndPlayAudio();
  };

  const pauseAudio = () => {
    try {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
      }
    } catch (error) {
      console.warn('Error pausing audio:', error);
    }
  };

  const stopAudio = () => {
    cleanup();
  };

  const resumeAudio = () => {
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        generateAndPlayAudio();
      }
    } catch (error) {
      console.warn('Error resuming audio:', error);
    }
  };

  // Auto-play on text change
  useEffect(() => {
    if (autoPlay && text && text.trim().length > 0) {
      generateAndPlayAudio();
    }
  }, [text, autoPlay, generateAndPlayAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  if (!showControls) {
    return (
      <Button
        onClick={isPlaying ? stopAudio : playAudio}
        disabled={isGenerating}
        variant="ghost"
        size="sm"
        className="p-2 hover:bg-blue-50"
      >
        {isGenerating ? (
          <div className="w-4 h-4 animate-spin border-2 border-blue-600 border-t-transparent rounded-full" />
        ) : isPlaying ? (
          <VolumeX className="w-4 h-4 text-blue-600" />
        ) : (
          <Volume2 className="w-4 h-4 text-blue-600" />
        )}
      </Button>
    );
  }

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-[var(--primary-blue)]">
          <Languages className="w-5 h-5" />
          {language === "en" ? "Text-to-Speech" : "पाठ-से-भाषण"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Controls */}
        <div className="flex items-center gap-3">
          <Button
            onClick={isPlaying ? stopAudio : playAudio}
            disabled={isGenerating || !text}
            className="bg-[var(--primary-blue)] hover:bg-blue-700"
          >
            {isGenerating ? (
              <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full mr-2" />
            ) : isPlaying ? (
              <Square className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isGenerating ? 
              (language === "en" ? "Generating..." : "बना रहे हैं...") :
              isPlaying ? 
                (language === "en" ? "Stop" : "रोकें") :
                (language === "en" ? "Play" : "चलाएं")
            }
          </Button>

          {isPlaying && (
            <Button
              onClick={window.speechSynthesis.paused ? resumeAudio : pauseAudio}
              variant="outline"
            >
              {window.speechSynthesis.paused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>

        {/* Settings */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium min-w-16">
              {language === "en" ? "Volume" : "आवाज़"}
            </label>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={1}
              min={0}
              step={0.1}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 min-w-8">{Math.round(volume[0] * 100)}%</span>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium min-w-16">
              {language === "en" ? "Speed" : "गति"}
            </label>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              max={2}
              min={0.5}
              step={0.1}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 min-w-8">{speed[0]}x</span>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium min-w-16">
              {language === "en" ? "Voice" : "आवाज़"}
            </label>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currentVoices.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {text && (
          <div className="p-3 bg-white rounded-lg border text-sm">
            <p className="text-gray-600 line-clamp-3">
              {text.slice(0, 200)}
              {text.length > 200 && "..."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
