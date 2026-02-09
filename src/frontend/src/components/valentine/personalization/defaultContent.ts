export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
}

export interface PersonalizationContent {
  wifeName: string;
  senderName: string;
  year: string;
  loveLetterParagraphs: string[];
  reasons: string[];
  timeline: TimelineEntry[];
  galleryCaptions: string[];
  galleryPhotos: (string | null)[];
}

export const defaultContent: PersonalizationContent = {
  wifeName: "My Darling",
  senderName: "Your Loving Husband",
  year: "2026",
  loveLetterParagraphs: [
    "My dearest love, as I sit down to write this letter, my heart overflows with emotions that words can barely capture. You are the most precious gift life has ever given me, and every moment with you is a treasure I hold close to my heart.",
    "From the first day we met, I knew there was something magical about you. Your smile lights up my darkest days, your laughter is the sweetest melody I've ever heard, and your love has transformed my life in ways I never imagined possible. You've shown me what it means to truly love and be loved in return.",
    "Through every challenge we've faced and every joy we've celebrated, you've been my constant, my anchor, my home. You've made me a better person simply by being yourself. Your kindness, your strength, your compassion – these are just a few of the countless qualities that make me fall in love with you more deeply each day.",
    "As we celebrate another Valentine's Day together, I want you to know that my love for you grows stronger with each passing moment. You are my yesterday, my today, and all of my tomorrows. Thank you for choosing to walk this beautiful journey of life with me."
  ],
  reasons: [
    "Your beautiful smile that brightens even my darkest days",
    "The way you laugh at my silly jokes, even when they're not funny",
    "Your incredible kindness and compassion for everyone around you",
    "How you always know exactly what I need, even before I do",
    "Your unwavering support in everything I do",
    "The way you make our house feel like a warm, loving home",
    "Your strength and courage in facing life's challenges",
    "How you inspire me to be a better person every single day",
    "The little things you do that show how much you care"
  ],
  timeline: [
    {
      date: "The Beginning",
      title: "The Day We Met",
      description: "I'll never forget the moment our eyes first met. Time seemed to stand still, and I knew in that instant that my life was about to change forever. You walked into my world and filled it with light."
    },
    {
      date: "Our First Date",
      title: "Falling in Love",
      description: "Our first date was magical. We talked for hours, and it felt like we'd known each other for a lifetime. That night, I realized I was falling deeply in love with you, and I've been falling ever since."
    },
    {
      date: "A Special Moment",
      title: "When I Knew You Were The One",
      description: "There was a moment when I looked at you and just knew – you were the one I wanted to spend the rest of my life with. Your love, your spirit, your soul – everything about you felt like home."
    },
    {
      date: "Our Wedding Day",
      title: "Forever Begins",
      description: "The day we said 'I do' was the happiest day of my life. Standing there with you, promising to love you forever, I felt complete. You are my partner, my best friend, my everything."
    },
    {
      date: "Today",
      title: "Our Love Story Continues",
      description: "Every day with you is a new chapter in our beautiful love story. Through ups and downs, laughter and tears, our love only grows stronger. I'm so grateful for every moment we share together."
    }
  ],
  galleryCaptions: [
    "A moment of pure joy together",
    "Making beautiful memories",
    "Our love captured in time",
    "Smiling because of you",
    "Adventures with my favorite person",
    "Forever grateful for these moments"
  ],
  galleryPhotos: [null, null, null, null, null, null]
};
