import { ScrollReveal } from '../animation/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';
import { HeartConfetti } from '../animation/HeartConfetti';
import { useState } from 'react';
import { useMotionSettings } from '../animation/useMotionSettings';
import type { PersonalizationContent } from '../personalization/defaultContent';

interface ClosingSectionProps {
  id: string;
  content: PersonalizationContent;
  onOpenSurprise: () => void;
}

export function ClosingSection({ id, content, onOpenSurprise }: ClosingSectionProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { motionEnabled } = useMotionSettings();

  const handleSurpriseClick = () => {
    if (motionEnabled) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
    onOpenSurprise();
  };

  return (
    <section id={id} className="py-20 px-4 min-h-[60vh] flex items-center justify-center relative overflow-hidden">
      {showConfetti && <HeartConfetti />}
      
      <div className="container mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <div className="space-y-8">
            <Heart className="h-16 w-16 text-primary fill-current mx-auto animate-heart-beat" />
            
            <h2 className="font-display text-4xl sm:text-5xl text-primary">
              You Are My Everything
            </h2>
            
            <p className="text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Every day with you is a gift. Thank you for being my partner, my best friend, and the love of my life. Here's to many more Valentine's Days together, and to a lifetime of love and happiness.
            </p>

            <div className="pt-8">
              <Button
                onClick={handleSurpriseClick}
                size="lg"
                className="text-lg px-8 py-6 shadow-romantic-lg hover:shadow-romantic transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Open Your Surprise
              </Button>
            </div>

            <div className="pt-12 space-y-2">
              <p className="text-2xl font-display text-primary">
                All my love, always and forever
              </p>
              <p className="text-xl text-muted-foreground italic">
                {content.senderName}
              </p>
              <p className="text-sm text-muted-foreground">
                Valentine's Day {content.year}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
