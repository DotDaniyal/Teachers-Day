export interface Teacher {
  id: string;
  name: string;
  subject: string;
  photo: string;
  message: string;
  quote: string;
  specialty: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface TributeMessage {
  id: string;
  teacherId: string;
  authorName: string;
  message: string;
  category: 'memories' | 'lesson' | 'gratitude' | 'humor';
  createdAt: string;
  likes: number;
  avatarSeed: string;
}

export interface CustomizationSettings {
  activeTeacherId: string;
  studentName: string;
  customNote: string;
  themeColor: 'cyan' | 'violet' | 'emerald' | 'amber';
  soundEnabled: boolean;
  particlesEnabled?: boolean;
}
