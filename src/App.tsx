/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_TEACHERS, INITIAL_TRIBUTES, INITIAL_POLAROIDS } from './data/initialData';
import { Teacher, TributeMessage, MemoryPolaroid, CustomizationSettings } from './types';
import { sounds } from './utils/audio';
import { Navbar } from './components/Navbar';
import { CursorGlow } from './components/CursorGlow';
import { ScrollProgress } from './components/ScrollProgress';
import { StarParticlesBackground } from './components/StarParticlesBackground';
import { CinematicIntro } from './components/CinematicIntro';
import { Hero } from './components/Hero';
import { BehindEveryDev } from './components/BehindEveryDev';
import { TeacherSpotlight } from './components/TeacherSpotlight';
import { InteractiveClassroom } from './components/InteractiveClassroom';
import { WhatYouTaughtUs } from './components/WhatYouTaughtUs';
import { CodeTransformation } from './components/CodeTransformation';
import { DebuggingLife } from './components/DebuggingLife';
import { TeacherSuperpowers } from './components/TeacherSuperpowers';
import { MemoryGallery } from './components/MemoryGallery';
import { TeacherImpactNetwork } from './components/TeacherImpactNetwork';
import { CommunityMemoriesWall } from './components/CommunityMemoriesWall';
import { AwardCertificateGenerator } from './components/AwardCertificateGenerator';
import { DigitalCard3D } from './components/DigitalCard3D';
import { ThankYouMegaButton } from './components/ThankYouMegaButton';
import { CinematicFinale } from './components/CinematicFinale';
import { Footer } from './components/Footer';
import { FloatingAudioPlayer } from './components/FloatingAudioPlayer';
import { TeacherPersonalizerModal } from './components/TeacherPersonalizerModal';
import { TeacherCustomizerDrawer } from './components/TeacherCustomizerDrawer';
import { EasterEggModal } from './components/EasterEggModal';

export default function App() {
  // 1. Central editable teachers config (ensuring Sir Zuhaib is permanently included)
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    try {
      const saved = localStorage.getItem('tribute_teachers_list');
      if (saved) {
        const parsed: Teacher[] = JSON.parse(saved);
        const hasZuhaib = parsed.some((t) => t.id === 'zuhaib' || t.name.toLowerCase().includes('zuhaib'));
        if (!hasZuhaib) {
          const merged = [INITIAL_TEACHERS[0], ...parsed];
          localStorage.setItem('tribute_teachers_list', JSON.stringify(merged));
          localStorage.setItem('tribute_active_teacher_id', 'zuhaib');
          return merged;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_TEACHERS;
  });

  // 2. Active teacher
  const [activeTeacherId, setActiveTeacherId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem('tribute_active_teacher_id');
      if (savedId) return savedId;
    } catch {
      // ignore
    }
    return 'zuhaib';
  });

  // 3. Customization settings
  const [settings, setSettings] = useState<CustomizationSettings>(() => {
    try {
      const saved = localStorage.getItem('tribute_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      activeTeacherId: INITIAL_TEACHERS[0].id,
      studentName: 'Your Grateful Students',
      customNote: '',
      themeColor: 'cyan',
      themeMode: 'dark',
      soundEnabled: true,
      particlesEnabled: true,
    };
  });

  // 4. Community tributes
  const [tributes, setTributes] = useState<TributeMessage[]>(() => {
    try {
      const saved = localStorage.getItem('tribute_messages');
      if (saved) {
        const parsed: TributeMessage[] = JSON.parse(saved);
        if (!parsed.some((t) => t.id === 't-0')) {
          const merged = [INITIAL_TRIBUTES[0], ...parsed];
          localStorage.setItem('tribute_messages', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_TRIBUTES;
  });

  // 5. Polaroid Memory Gallery
  const [polaroids, setPolaroids] = useState<MemoryPolaroid[]>(() => {
    try {
      const saved = localStorage.getItem('tribute_polaroids');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_POLAROIDS;
  });

  // Modals & Panels state
  const [showIntro, setShowIntro] = useState(true);
  const [personalizerOpen, setPersonalizerOpen] = useState(false);
  const [customizerDrawerOpen, setCustomizerDrawerOpen] = useState(false);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  // Sync settings sound state with audio utility
  useEffect(() => {
    sounds.enabled = settings.soundEnabled;
  }, [settings.soundEnabled]);

  // Sync Dark / Light mode class on document.documentElement
  useEffect(() => {
    const isLight = settings.themeMode === 'light';
    document.documentElement.classList.toggle('light', isLight);
    document.documentElement.classList.toggle('dark', !isLight);
  }, [settings.themeMode]);

  // Derive current teacher object safely
  const currentTeacher =
    teachers.find((t) => t.id === activeTeacherId) || teachers[0] || INITIAL_TEACHERS[0];

  // Handlers for updating teachers & localStorage
  const handleSelectTeacher = (teacher: Teacher) => {
    setActiveTeacherId(teacher.id);
    localStorage.setItem('tribute_active_teacher_id', teacher.id);
  };

  const handleUpdateTeacher = (updated: Teacher) => {
    const updatedList = teachers.map((t) => (t.id === updated.id ? updated : t));
    setTeachers(updatedList);
    localStorage.setItem('tribute_teachers_list', JSON.stringify(updatedList));
  };

  const handleAddNewTeacher = (newTeacher: Teacher) => {
    const updatedList = [...teachers, newTeacher];
    setTeachers(updatedList);
    setActiveTeacherId(newTeacher.id);
    localStorage.setItem('tribute_teachers_list', JSON.stringify(updatedList));
    localStorage.setItem('tribute_active_teacher_id', newTeacher.id);
  };

  const handleRemoveTeacher = (teacherId: string) => {
    if (teachers.length <= 1) return;
    const updatedList = teachers.filter((t) => t.id !== teacherId);
    setTeachers(updatedList);
    localStorage.setItem('tribute_teachers_list', JSON.stringify(updatedList));
    if (activeTeacherId === teacherId && updatedList.length > 0) {
      setActiveTeacherId(updatedList[0].id);
      localStorage.setItem('tribute_active_teacher_id', updatedList[0].id);
    }
  };

  const handleResetTeachers = () => {
    setTeachers(INITIAL_TEACHERS);
    setActiveTeacherId(INITIAL_TEACHERS[0].id);
    localStorage.setItem('tribute_teachers_list', JSON.stringify(INITIAL_TEACHERS));
    localStorage.setItem('tribute_active_teacher_id', INITIAL_TEACHERS[0].id);
  };

  const handleQuickPersonalize = (
    name: string,
    subject: string,
    photo?: string,
    studentName?: string,
    customNote?: string
  ) => {
    const updated = {
      ...currentTeacher,
      name,
      subject,
      ...(photo ? { photo } : {}),
    };
    handleUpdateTeacher(updated);
    handleUpdateSettings({
      ...settings,
      studentName: studentName ?? settings.studentName,
      customNote: customNote !== undefined ? customNote : settings.customNote,
    });
  };

  const handleResetTribute = () => {
    handleResetTeachers();
    handleUpdateSettings({
      ...settings,
      studentName: 'Your Grateful Students',
      customNote: '',
    });
  };

  const handleUpdateSettings = (newSettings: CustomizationSettings) => {
    setSettings(newSettings);
    localStorage.setItem('tribute_settings', JSON.stringify(newSettings));
  };

  // Tribute Wall CRUD handlers
  const handleAddTribute = (newTribute: Omit<TributeMessage, 'id' | 'createdAt' | 'likes'>) => {
    const fullTribute: TributeMessage = {
      ...newTribute,
      id: `trib-${Date.now()}`,
      createdAt: 'Just now',
      likes: 1,
    };
    const updated = [fullTribute, ...tributes];
    setTributes(updated);
    localStorage.setItem('tribute_messages', JSON.stringify(updated));
  };

  const handleEditTribute = (
    id: string,
    updatedFields: {
      teacherName: string;
      subjectTag?: string;
      authorName: string;
      message: string;
      category: TributeMessage['category'];
    }
  ) => {
    const updated = tributes.map((t) =>
      t.id === id
        ? {
            ...t,
            ...updatedFields,
            avatarSeed: updatedFields.authorName.charAt(0).toUpperCase() || 'S',
          }
        : t
    );
    setTributes(updated);
    localStorage.setItem('tribute_messages', JSON.stringify(updated));
  };

  const handleLikeTribute = (id: string) => {
    const updated = tributes.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t));
    setTributes(updated);
    localStorage.setItem('tribute_messages', JSON.stringify(updated));
  };

  const handleRemoveTribute = (id: string) => {
    const updated = tributes.filter((t) => t.id !== id);
    setTributes(updated);
    localStorage.setItem('tribute_messages', JSON.stringify(updated));
  };

  const handleClearTributes = () => {
    setTributes([]);
    localStorage.setItem('tribute_messages', JSON.stringify([]));
  };

  const handleRestoreDefaultTributes = () => {
    setTributes(INITIAL_TRIBUTES);
    localStorage.setItem('tribute_messages', JSON.stringify(INITIAL_TRIBUTES));
  };

  // Polaroid Gallery CRUD handlers
  const handleAddPolaroid = (newPolaroid: Omit<MemoryPolaroid, 'id'>) => {
    const fullPolaroid: MemoryPolaroid = {
      ...newPolaroid,
      id: `mem-${Date.now()}`,
    };
    const updated = [fullPolaroid, ...polaroids];
    setPolaroids(updated);
    localStorage.setItem('tribute_polaroids', JSON.stringify(updated));
  };

  const handleUpdatePolaroidPhoto = (id: string, imageUrl: string) => {
    const updated = polaroids.map((p) => (p.id === id ? { ...p, imageUrl } : p));
    setPolaroids(updated);
    localStorage.setItem('tribute_polaroids', JSON.stringify(updated));
  };

  const handleRemovePolaroid = (id: string) => {
    const updated = polaroids.filter((p) => p.id !== id);
    setPolaroids(updated);
    localStorage.setItem('tribute_polaroids', JSON.stringify(updated));
  };

  const handleResetPolaroids = () => {
    setPolaroids(INITIAL_POLAROIDS);
    localStorage.setItem('tribute_polaroids', JSON.stringify(INITIAL_POLAROIDS));
  };

  const handleToggleSound = () => {
    const next = !settings.soundEnabled;
    handleUpdateSettings({
      ...settings,
      soundEnabled: next,
    });
  };

  const handleToggleThemeMode = () => {
    const nextMode = settings.themeMode === 'light' ? 'dark' : 'light';
    handleUpdateSettings({
      ...settings,
      themeMode: nextMode,
    });
  };

  const isLightMode = settings.themeMode === 'light';

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 selection:bg-cyan-500/30 selection:text-cyan-200 ${
        isLightMode ? 'theme-light bg-slate-50 text-slate-900' : 'bg-gray-950 text-slate-100'
      }`}
    >
      {/* Full-Screen Cinematic Opening Sequence */}
      <CinematicIntro
        isOpen={showIntro}
        currentTeacher={currentTeacher}
        onComplete={() => setShowIntro(false)}
      />

      {/* Ambient Star Particles Across Entire Application */}
      {settings.particlesEnabled !== false && (
        <StarParticlesBackground themeMode={settings.themeMode || 'dark'} />
      )}

      {/* Scroll Progress Bar at Top */}
      <ScrollProgress />

      {/* Subtle Cursor Light Trailer on Desktop */}
      <CursorGlow />

      {/* Floating Modern Navigation */}
      <Navbar
        currentTeacher={currentTeacher}
        onOpenCustomizer={() => setCustomizerDrawerOpen(true)}
        onOpenEasterEgg={() => setEasterEggOpen(true)}
        settings={settings}
        onToggleSound={handleToggleSound}
        onToggleThemeMode={handleToggleThemeMode}
      />

      <main className="relative z-10">
        {/* SECTION 1: Cinematic Intro & Welcome Hero */}
        <Hero
          currentTeacher={currentTeacher}
          studentName={settings.studentName}
          customNote={settings.customNote}
          onOpenPersonalizer={() => setPersonalizerOpen(true)}
          onResetTribute={handleResetTribute}
          onReplayIntro={() => setShowIntro(true)}
        />

        {/* SECTION 2: Behind Every Developer Is a Teacher */}
        <BehindEveryDev />

        {/* SECTION 3: Faculty Spotlight & Multi-Teacher Showcase */}
        <TeacherSpotlight
          teachers={teachers}
          currentTeacher={currentTeacher}
          onSelectTeacher={handleSelectTeacher}
          onRemoveTeacher={handleRemoveTeacher}
          onUpdateTeacher={handleUpdateTeacher}
        />

        {/* SECTION 4: Interactive Classroom Studio */}
        <InteractiveClassroom currentTeacher={currentTeacher} />

        {/* SECTION 5: What You Taught Us (Animated Bento Grid) */}
        <WhatYouTaughtUs />

        {/* SECTION 6: Code -> Knowledge Transformation Interactive Machine */}
        <CodeTransformation />

        {/* SECTION 7: "The Debugging Life" Fun Section */}
        <DebuggingLife currentTeacher={currentTeacher} />

        {/* SECTION 8: Collectible Teacher Superpowers */}
        <TeacherSuperpowers />

        {/* SECTION 9: Polaroid Memory Gallery */}
        <MemoryGallery
          polaroids={polaroids}
          currentTeacher={currentTeacher}
          onAddPolaroid={handleAddPolaroid}
          onUpdatePolaroidPhoto={handleUpdatePolaroidPhoto}
          onRemovePolaroid={handleRemovePolaroid}
          onResetPolaroids={handleResetPolaroids}
        />

        {/* SECTION 10: Student Appreciation Wall (Add / Edit / Delete / Clear) */}
        <CommunityMemoriesWall
          tributes={tributes}
          currentTeacher={currentTeacher}
          onAddTribute={handleAddTribute}
          onEditTribute={handleEditTribute}
          onLikeTribute={handleLikeTribute}
          onRemoveTribute={handleRemoveTribute}
          onClearTributes={handleClearTributes}
          onRestoreDefaultTributes={handleRestoreDefaultTributes}
        />

        {/* SECTION 11: The Impact of a Teacher (Glowing Path + Constellation) */}
        <TeacherImpactNetwork currentTeacher={currentTeacher} />

        {/* SECTION 12: Award Certificate Generator */}
        <AwardCertificateGenerator
          currentTeacher={currentTeacher}
          defaultStudentName={settings.studentName}
        />

        {/* SECTION 13: Interactive 3D Digital Teachers' Day Flip Card */}
        <DigitalCard3D
          currentTeacher={currentTeacher}
          studentName={settings.studentName}
          customNote={settings.customNote}
        />

        {/* SECTION 14: Epic "SAY THANK YOU ❤️" Mega Button & Particle Burst */}
        <ThankYouMegaButton currentTeacher={currentTeacher} />

        {/* SECTION 15: Final Surprise Section ("One more thing..." -> "Thank You, Teachers.") */}
        <CinematicFinale currentTeacher={currentTeacher} />
      </main>

      {/* Floating Background Ambient Music Player with Visualizer */}
      <FloatingAudioPlayer />

      {/* Footer */}
      <Footer
        currentTeacher={currentTeacher}
        onOpenCustomizer={() => setCustomizerDrawerOpen(true)}
        onOpenEasterEgg={() => setEasterEggOpen(true)}
      />

      {/* Personalizer Quick Onboarding Modal */}
      <TeacherPersonalizerModal
        isOpen={personalizerOpen}
        onClose={() => setPersonalizerOpen(false)}
        onSave={handleQuickPersonalize}
        teachers={teachers}
        currentTeacher={currentTeacher}
        onSelectTeacher={handleSelectTeacher}
        defaultStudentName={settings.studentName}
        defaultCustomNote={settings.customNote}
      />

      {/* Developer Customization Drawer */}
      <TeacherCustomizerDrawer
        isOpen={customizerDrawerOpen}
        onClose={() => setCustomizerDrawerOpen(false)}
        teachers={teachers}
        currentTeacher={currentTeacher}
        onUpdateTeacher={handleUpdateTeacher}
        onAddNewTeacher={handleAddNewTeacher}
        onRemoveTeacher={handleRemoveTeacher}
        onResetTeachers={handleResetTeachers}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Developer Easter Egg Modal */}
      <EasterEggModal
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
        teacherName={currentTeacher.name}
      />
    </div>
  );
}
