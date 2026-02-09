import { useLocalStorageState } from '../../../hooks/useLocalStorageState';
import { defaultContent, type PersonalizationContent } from './defaultContent';

const STORAGE_KEY = 'valentine-personalization';
const STORAGE_VERSION = 2;

// Normalize and migrate old data to ensure compatibility
function normalizeContent(content: Partial<PersonalizationContent>): PersonalizationContent {
  const normalized = { ...defaultContent, ...content };
  
  // Ensure galleryPhotos exists and is exactly 6 slots
  if (!normalized.galleryPhotos || !Array.isArray(normalized.galleryPhotos)) {
    normalized.galleryPhotos = [null, null, null, null, null, null];
  } else {
    // Ensure exactly 6 slots
    normalized.galleryPhotos = normalized.galleryPhotos.slice(0, 6);
    while (normalized.galleryPhotos.length < 6) {
      normalized.galleryPhotos.push(null);
    }
  }
  
  // Ensure galleryCaptions is exactly 6 slots
  if (!normalized.galleryCaptions || !Array.isArray(normalized.galleryCaptions)) {
    normalized.galleryCaptions = defaultContent.galleryCaptions;
  } else {
    normalized.galleryCaptions = normalized.galleryCaptions.slice(0, 6);
    while (normalized.galleryCaptions.length < 6) {
      normalized.galleryCaptions.push(defaultContent.galleryCaptions[normalized.galleryCaptions.length] || '');
    }
  }
  
  return normalized;
}

export function usePersonalization() {
  const { state: rawContent, setState: setRawContent, lastError } = useLocalStorageState<PersonalizationContent>(
    STORAGE_KEY,
    defaultContent,
    STORAGE_VERSION
  );

  // Normalize content on load
  const content = normalizeContent(rawContent);

  const updateContent = (updates: Partial<PersonalizationContent>): boolean => {
    const success = setRawContent((prev) => {
      const updated = { ...prev, ...updates };
      return normalizeContent(updated);
    });
    return success;
  };

  const resetToDefault = (): boolean => {
    return setRawContent(defaultContent);
  };

  return {
    content,
    updateContent,
    resetToDefault,
    saveError: lastError,
  };
}
