import { ScrollReveal } from '../animation/ScrollReveal';
import type { PersonalizationContent } from '../personalization/defaultContent';

interface GallerySectionProps {
  id: string;
  content: PersonalizationContent;
}

export function GallerySection({ id, content }: GallerySectionProps) {
  const placeholderImages = [
    '/assets/generated/photo-frame-1.dim_800x600.png',
    '/assets/generated/photo-frame-2.dim_800x600.png',
    '/assets/generated/photo-frame-3.dim_800x600.png',
    '/assets/generated/photo-frame-4.dim_800x600.png',
    '/assets/generated/photo-frame-5.dim_800x600.png',
    '/assets/generated/photo-frame-6.dim_800x600.png',
  ];

  const galleryImages = placeholderImages.map((placeholder, index) => ({
    src: content.galleryPhotos[index] || placeholder,
    caption: content.galleryCaptions[index] || '',
  }));

  return (
    <section id={id} className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="font-display text-4xl sm:text-5xl text-center text-primary mb-4">
            Our Memories
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Moments captured, memories cherished forever
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="group relative overflow-hidden rounded-xl shadow-romantic hover:shadow-romantic-lg transition-all duration-300">
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 text-sm font-medium">
                    {image.caption}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
