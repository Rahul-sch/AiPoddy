export interface User {
  id: string;
  email: string;
  name?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  defaultLanguage: string;
  voiceId: string;
  playbackSpeed: number;
  defaultPodcastLength: number;
}

export interface PodcastRequest {
  topic: string;
  length: number;
  language: string;
  voiceId: string;
  style: "conversational" | "formal";
}

export interface Podcast {
  id: string;
  title: string;
  content: string;
  audioUrl: string;
  transcript: string;
  duration: number;
  createdAt: string;
  userId: string;
  topic: string;
}
