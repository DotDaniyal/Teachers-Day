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
  teacherName?: string;
  authorName: string;
  message: string;
  category: 'memories' | 'lesson' | 'gratitude' | 'humor';
  createdAt: string;
  likes: number;
  avatarSeed: string;
}

export interface MemoryPolaroid {
  id: string;
  title: string;
  caption: string;
  dateLabel: string;
  imageUrl?: string;
  placeholderTheme?: string;
  rotation: number;
}

export interface CustomizationSettings {
  activeTeacherId: string;
  studentName: string;
  customNote: string;
  themeColor: 'cyan' | 'violet' | 'emerald' | 'amber';
  themeMode?: 'dark' | 'light';
  soundEnabled: boolean;
  particlesEnabled?: boolean;
}
