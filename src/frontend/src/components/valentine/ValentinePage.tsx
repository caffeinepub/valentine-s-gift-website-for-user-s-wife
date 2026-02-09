import { useState, useEffect } from 'react';
import { ValentineNav } from './ValentineNav';
import { HeroSection } from './sections/HeroSection';
import { LoveLetterSection } from './sections/LoveLetterSection';
import { ReasonsSection } from './sections/ReasonsSection';
import { StoryTimelineSection } from './sections/StoryTimelineSection';
import { GallerySection } from './sections/GallerySection';
import { ClosingSection } from './sections/ClosingSection';
import { PersonalizeDialog } from './personalization/PersonalizeDialog';
import { usePersonalization } from './personalization/usePersonalization';
import { SurpriseModal } from './SurpriseModal';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import type { PersonalizationContent } from './personalization/defaultContent';

export function ValentinePage() {
  const [personalizeOpen, setPersonalizeOpen] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const { content, updateContent, resetToDefault, saveError } = usePersonalization();
  
  // Draft state for live preview while dialog is open
  const [draftContent, setDraftContent] = useState<PersonalizationContent>(content);

  // Initialize draft content when dialog opens
  useEffect(() => {
    if (personalizeOpen) {
      setDraftContent(content);
    }
  }, [personalizeOpen, content]);

  // Use draft content when dialog is open, saved content when closed
  const displayContent = personalizeOpen ? draftContent : content;

  const handleSave = (newContent: PersonalizationContent): boolean => {
    const success = updateContent(newContent);
    if (success) {
      setPersonalizeOpen(false);
    }
    return success;
  };

  const handleReset = (): boolean => {
    const success = resetToDefault();
    if (success) {
      setDraftContent(content);
    }
    return success;
  };

  const handleCancel = () => {
    setDraftContent(content);
    setPersonalizeOpen(false);
  };

  return (
    <div className="relative">
      <ValentineNav />
      
      {/* Floating personalize button */}
      <Button
        onClick={() => setPersonalizeOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full w-14 h-14 shadow-romantic-lg"
        size="icon"
        title="Personalize this page"
      >
        <Settings className="h-5 w-5" />
      </Button>

      <main>
        <HeroSection id="hero" content={displayContent} />
        <LoveLetterSection id="love-letter" content={displayContent} />
        <ReasonsSection id="reasons" content={displayContent} />
        <StoryTimelineSection id="story" content={displayContent} />
        <GallerySection id="gallery" content={displayContent} />
        <ClosingSection id="closing" content={displayContent} onOpenSurprise={() => setSurpriseOpen(true)} />
      </main>

      <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© 2026. Built with <span className="text-primary">♥</span> using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">caffeine.ai</a></p>
      </footer>

      <PersonalizeDialog 
        open={personalizeOpen} 
        draftContent={draftContent}
        setDraftContent={setDraftContent}
        onSave={handleSave}
        onReset={handleReset}
        onCancel={handleCancel}
        saveError={saveError}
      />
      <SurpriseModal open={surpriseOpen} onOpenChange={setSurpriseOpen} content={displayContent} />
    </div>
  );
}
