import { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useMotionSettings } from '../animation/useMotionSettings';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { resizeAndCompressImage } from '@/utils/imageResize';
import type { PersonalizationContent } from './defaultContent';

interface PersonalizeDialogProps {
  open: boolean;
  draftContent: PersonalizationContent;
  setDraftContent: (content: PersonalizationContent) => void;
  onSave: (content: PersonalizationContent) => boolean;
  onReset: () => boolean;
  onCancel: () => void;
  saveError: Error | null;
}

export function PersonalizeDialog({ 
  open, 
  draftContent,
  setDraftContent,
  onSave,
  onReset,
  onCancel,
  saveError
}: PersonalizeDialogProps) {
  const { motionEnabled, setMotionEnabled } = useMotionSettings();
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSave = () => {
    const success = onSave(draftContent);
    if (success) {
      toast.success('Your personalization has been saved!');
    } else {
      toast.error(
        'Failed to save personalization. Your images may be too large. Try using smaller images or removing some photos.',
        { duration: 5000 }
      );
    }
  };

  const handleReset = () => {
    const success = onReset();
    if (success) {
      toast.success('Content reset to default');
    } else {
      toast.error('Failed to reset content');
    }
  };

  const updateLocalField = <K extends keyof PersonalizationContent>(
    field: K,
    value: PersonalizationContent[K]
  ) => {
    setDraftContent({ ...draftContent, [field]: value });
  };

  const handlePhotoUpload = async (index: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading(`Processing photo ${index + 1}...`);
      
      // Resize and compress the image
      const dataUrl = await resizeAndCompressImage(file, 800, 800, 0.8);
      
      // Update draft content immediately for live preview
      const newPhotos = [...draftContent.galleryPhotos];
      newPhotos[index] = dataUrl;
      updateLocalField('galleryPhotos', newPhotos);
      
      toast.dismiss(loadingToast);
      toast.success(`Photo ${index + 1} uploaded`);
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to process image. Please try a different photo.'
      );
    }
  };

  const handlePhotoRemove = (index: number) => {
    const newPhotos = [...draftContent.galleryPhotos];
    newPhotos[index] = null;
    updateLocalField('galleryPhotos', newPhotos);
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = '';
    }
    toast.success(`Photo ${index + 1} removed`);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-card/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-primary">
            Personalize Your Valentine's Gift
          </DialogTitle>
          <DialogDescription>
            Customize the content to make this gift truly special and unique
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="letter">Letter</TabsTrigger>
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] mt-4">
            <TabsContent value="basic" className="space-y-4 pr-4">
              <div className="space-y-2">
                <Label htmlFor="wifeName">Your Wife's Name</Label>
                <Input
                  id="wifeName"
                  value={draftContent.wifeName}
                  onChange={(e) => updateLocalField('wifeName', e.target.value)}
                  placeholder="My Darling"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senderName">Your Name</Label>
                <Input
                  id="senderName"
                  value={draftContent.senderName}
                  onChange={(e) => updateLocalField('senderName', e.target.value)}
                  placeholder="Your Loving Husband"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={draftContent.year}
                  onChange={(e) => updateLocalField('year', e.target.value)}
                  placeholder="2026"
                />
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label>Reasons You Love Her (one per line)</Label>
                <Textarea
                  value={draftContent.reasons.join('\n')}
                  onChange={(e) =>
                    updateLocalField('reasons', e.target.value.split('\n').filter(Boolean))
                  }
                  rows={10}
                  placeholder="Enter each reason on a new line"
                />
              </div>

              <div className="space-y-2">
                <Label>Gallery Captions (one per line, 6 total)</Label>
                <Textarea
                  value={draftContent.galleryCaptions.join('\n')}
                  onChange={(e) =>
                    updateLocalField('galleryCaptions', e.target.value.split('\n').slice(0, 6))
                  }
                  rows={6}
                  placeholder="Enter 6 captions, one per line"
                />
              </div>
            </TabsContent>

            <TabsContent value="photos" className="space-y-4 pr-4">
              <div className="space-y-2 mb-4">
                <Label>Gallery Photos (up to 6)</Label>
                <p className="text-sm text-muted-foreground">
                  Upload your personal photos for the gallery. Photos are stored locally in your browser and automatically compressed to save space.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="space-y-2 p-4 border rounded-lg bg-background/50">
                    <Label className="text-sm font-medium">Photo {index + 1}</Label>
                    
                    {draftContent.galleryPhotos[index] ? (
                      <div className="relative">
                        <img
                          src={draftContent.galleryPhotos[index]!}
                          alt={`Gallery photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => handlePhotoRemove(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md bg-muted/30">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => fileInputRefs.current[index]?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {draftContent.galleryPhotos[index] ? 'Replace' : 'Upload'}
                      </Button>
                      {draftContent.galleryPhotos[index] && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePhotoRemove(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <input
                      ref={(el) => {
                        fileInputRefs.current[index] = el;
                      }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handlePhotoUpload(index, file);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="letter" className="space-y-4 pr-4">
              <div className="space-y-2">
                <Label>Love Letter Paragraphs</Label>
                <p className="text-sm text-muted-foreground">
                  Edit each paragraph of your love letter below
                </p>
              </div>

              {draftContent.loveLetterParagraphs.map((paragraph, index) => (
                <div key={index} className="space-y-2">
                  <Label>Paragraph {index + 1}</Label>
                  <Textarea
                    value={paragraph}
                    onChange={(e) => {
                      const newParagraphs = [...draftContent.loveLetterParagraphs];
                      newParagraphs[index] = e.target.value;
                      updateLocalField('loveLetterParagraphs', newParagraphs);
                    }}
                    rows={4}
                  />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="story" className="space-y-4 pr-4">
              <div className="space-y-2">
                <Label>Timeline Milestones</Label>
                <p className="text-sm text-muted-foreground">
                  Edit the key moments in your love story
                </p>
              </div>

              {draftContent.timeline.map((milestone, index) => (
                <div key={index} className="space-y-3 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Date/Period</Label>
                    <Input
                      value={milestone.date}
                      onChange={(e) => {
                        const newTimeline = [...draftContent.timeline];
                        newTimeline[index] = { ...milestone, date: e.target.value };
                        updateLocalField('timeline', newTimeline);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={milestone.title}
                      onChange={(e) => {
                        const newTimeline = [...draftContent.timeline];
                        newTimeline[index] = { ...milestone, title: e.target.value };
                        updateLocalField('timeline', newTimeline);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={milestone.description}
                      onChange={(e) => {
                        const newTimeline = [...draftContent.timeline];
                        newTimeline[index] = { ...milestone, description: e.target.value };
                        updateLocalField('timeline', newTimeline);
                      }}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 pr-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Show scroll animations and confetti effects
                    </p>
                  </div>
                  <Switch checked={motionEnabled} onCheckedChange={setMotionEnabled} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Reset Content</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Restore all content to the original default values
                  </p>
                  <Button variant="destructive" onClick={handleReset} className="w-full">
                    Reset to Default
                  </Button>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
