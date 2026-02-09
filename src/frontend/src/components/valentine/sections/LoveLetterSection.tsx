import { ScrollReveal } from '../animation/ScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import type { PersonalizationContent } from '../personalization/defaultContent';

interface LoveLetterSectionProps {
  id: string;
  content: PersonalizationContent;
}

export function LoveLetterSection({ id, content }: LoveLetterSectionProps) {
  return (
    <section id={id} className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="font-display text-4xl sm:text-5xl text-center text-primary mb-12">
            A Letter From My Heart
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <Card className="bg-card/80 backdrop-blur-sm shadow-romantic-lg border-2 border-primary/20">
            <CardContent className="p-8 sm:p-12 space-y-6">
              {content.loveLetterParagraphs.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed text-foreground/90 first-letter:text-5xl first-letter:font-display first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                  {paragraph}
                </p>
              ))}
              <div className="pt-6 text-right">
                <p className="text-xl font-display text-primary">Forever yours,</p>
                <p className="text-lg text-muted-foreground italic">{content.senderName}</p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
