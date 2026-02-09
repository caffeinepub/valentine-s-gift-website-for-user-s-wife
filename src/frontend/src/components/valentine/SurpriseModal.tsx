import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Heart } from 'lucide-react';
import type { PersonalizationContent } from './personalization/defaultContent';

interface SurpriseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: PersonalizationContent;
}

export function SurpriseModal({ open, onOpenChange, content }: SurpriseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-2 border-primary/30">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Heart className="h-16 w-16 text-primary fill-current animate-heart-beat" />
          </div>
          <DialogTitle className="text-3xl font-display text-center text-primary">
            My Promise to You
          </DialogTitle>
          <DialogDescription className="text-center text-lg pt-4 space-y-4">
            <p className="text-foreground/90 leading-relaxed">
              {content.wifeName}, you are the light of my life, the beat of my heart, and the reason I smile every day.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              I promise to love you more with each passing day, to support your dreams, to laugh with you in joy, and to hold you close in times of sorrow.
            </p>
            <p className="text-foreground/90 leading-relaxed font-medium">
              You are my forever Valentine, today and always.
            </p>
            <p className="text-primary font-display text-xl pt-4">
              I love you endlessly ❤️
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
