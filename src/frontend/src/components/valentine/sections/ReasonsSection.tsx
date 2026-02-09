import { ScrollReveal } from '../animation/ScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import type { PersonalizationContent } from '../personalization/defaultContent';

interface ReasonsSectionProps {
  id: string;
  content: PersonalizationContent;
}

export function ReasonsSection({ id, content }: ReasonsSectionProps) {
  return (
    <section id={id} className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-display text-4xl sm:text-5xl text-center text-primary mb-4">
            Reasons I Love You
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            There are countless reasons, but here are just a few...
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.reasons.map((reason, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <Card className="h-full bg-card/80 backdrop-blur-sm hover:shadow-romantic transition-all duration-300 hover:-translate-y-1 border-primary/10">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary fill-current" />
                  </div>
                  <p className="text-lg leading-relaxed">{reason}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
