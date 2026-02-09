import { ScrollReveal } from '../animation/ScrollReveal';
import type { PersonalizationContent } from '../personalization/defaultContent';

interface HeroSectionProps {
  id: string;
  content: PersonalizationContent;
}

export function HeroSection({ id, content }: HeroSectionProps) {
  return (
    <section id={id} className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="text-center md:text-left space-y-6">
              <div className="inline-block">
                <img
                  src="/assets/generated/heart-mark.dim_128x128.png"
                  alt="Heart"
                  className="w-16 h-16 mx-auto md:mx-0 animate-heart-beat"
                />
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-primary leading-tight">
                Happy Valentine's Day
              </h1>
              <p className="text-2xl sm:text-3xl text-foreground/80">
                To my beloved {content.wifeName}
              </p>
              <p className="text-lg text-muted-foreground max-w-lg">
                This website is a small token of my endless love for you. Every word, every memory, every moment we've shared is a treasure I hold dear in my heart.
              </p>
              <p className="text-sm text-muted-foreground italic">
                With all my love, {content.senderName}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              <img
                src="/assets/generated/valentine-hero.dim_1600x900.png"
                alt="Valentine's Day celebration"
                className="w-full h-auto rounded-2xl shadow-romantic-lg"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
