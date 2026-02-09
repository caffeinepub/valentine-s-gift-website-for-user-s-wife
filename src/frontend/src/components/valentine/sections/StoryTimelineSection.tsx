import { ScrollReveal } from '../animation/ScrollReveal';
import { Separator } from '@/components/ui/separator';
import type { PersonalizationContent } from '../personalization/defaultContent';

interface StoryTimelineSectionProps {
  id: string;
  content: PersonalizationContent;
}

export function StoryTimelineSection({ id, content }: StoryTimelineSectionProps) {
  return (
    <section id={id} className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <h2 className="font-display text-4xl sm:text-5xl text-center text-primary mb-4">
            Our Story
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            The beautiful journey we've shared together
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden sm:block" />

          <div className="space-y-12">
            {content.timeline.map((milestone, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <div className="relative pl-0 sm:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-primary border-4 border-background hidden sm:block" />
                  
                  <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-romantic border border-primary/10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                      <h3 className="font-display text-2xl text-primary">
                        {milestone.title}
                      </h3>
                      <span className="text-sm text-muted-foreground font-medium">
                        {milestone.date}
                      </span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
