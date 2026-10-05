/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_TEACHERS, INITIAL_TRIBUTES } from './data/initialData';
import { Teacher, TributeMessage, CustomizationSettings } from './types';
import { sounds } from './utils/audio';
import { Navbar } from './components/Navbar';
import { CursorGlow } from './components/CursorGlow';
import { ScrollProgress } from './components/ScrollProgress';
import { StarParticlesBackground } from './components/StarParticlesBackground';
import { Hero } from './components/Hero';
import { BehindEveryDev } from './components/BehindEveryDev';
import { TeacherSpotlight } from './components/TeacherSpotlight';
import { WhatYouTaughtUs } from './components/WhatYouTaughtUs';
import { CodeTransformation } from './components/CodeTransformation';
import { DebuggingLife } from './components/DebuggingLife';
import { TeacherSuperpowers } from './components/TeacherSuperpowers';
import { TeacherImpactNetwork } from './components/TeacherImpactNetwork';
import { CommunityMemoriesWall } from './components/CommunityMemoriesWall';
import { DigitalCard3D } from './components/DigitalCard3D';
import { ThankYouMegaButton } from './components/ThankYouMegaButton';
import { CinematicFinale } from './components/CinematicFinale';
import { Footer } from './components/Footer';
import { TeacherPersonalizerModal } from './components/TeacherPersonalizerModal';
import { TeacherCustomizerDrawer } from './components/TeacherCustomizerDrawer';
import { EasterEggModal } from './components/EasterEggModal';

export default function App() {
  // 1. Central editable teachers config
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    try {
      const saved = localStorage.getItem('tribute_teachers_list');
      if (saved) return JSON.parse(saved);
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
    return INITIAL_TEACHERS[0].id;
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
      soundEnabled: true,
    };
  });

  // 4. Community tributes
  const [tributes, setTributes] = useState<TributeMessage[]>(() => {
    try {
      const saved = localStorage.getItem('tribute_messages');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_TRIBUTES;
  });

  // Modals & Panels state
  const [personalizerOpen, setPersonalizerOpen] = useState(false);
  const [customizerDrawerOpen, setCustomizerDrawerOpen] = useState(false);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  // Sync settings sound state with audio utility
  useEffect(() => {
    sounds.enabled = settings.soundEnabled;
  }, [settings.soundEnabled]);

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

  const handleQuickPersonalize = (name: string, subject: string, photo?: string) => {
    const updated = {
      ...currentTeacher,
      name,
      subject,
      ...(photo ? { photo } : {}),
    };
    handleUpdateTeacher(updated);
  };

  const handleUpdateSettings = (newSettings: CustomizationSettings) => {
    setSettings(newSettings);
    localStorage.setItem('tribute_settings', JSON.stringify(newSettings));
  };

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

  const handleToggleSound = () => {
    const next = !settings.soundEnabled;
    handleUpdateSettings({
      ...settings,
      soundEnabled: next,
    });
  };

  return (
    <div className="relative min-h-screen bg-gray-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient Star Particles Across Entire Application */}
      {settings.particlesEnabled !== false && <StarParticlesBackground />}

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
      />

      <main className="relative z-10">
        {/* 1. Hero Entrance with Terminal Typing & Personalized Dedication */}
        <Hero
          currentTeacher={currentTeacher}
          onOpenPersonalizer={() => setPersonalizerOpen(true)}
        />

        {/* 2. Behind Every Developer Is a Teacher */}
        <BehindEveryDev />

        {/* 3. Teacher Spotlight & Multi-Teacher Showcase */}
        <TeacherSpotlight
          teachers={teachers}
          currentTeacher={currentTeacher}
          onSelectTeacher={handleSelectTeacher}
          onRemoveTeacher={handleRemoveTeacher}
          onUpdateTeacher={handleUpdateTeacher}
        />

        {/* 4. What You Taught Us (Animated Bento Grid) */}
        <WhatYouTaughtUs />

        {/* 5. Code -> Knowledge Transformation Interactive Machine */}
        <CodeTransformation />

        {/* 6. "The Debugging Life" Fun Section */}
        <DebuggingLife currentTeacher={currentTeacher} />

        {/* 7. Teacher Superpowers Spotlight Cards */}
        <TeacherSuperpowers />

        {/* 8. Teacher Impact Network Interactive Visualization */}
        <TeacherImpactNetwork currentTeacher={currentTeacher} />

        {/* 9. Shared Community Memories & Heartfelt Thank You Wall */}
        <CommunityMemoriesWall
          tributes={tributes}
          currentTeacher={currentTeacher}
          onAddTribute={handleAddTribute}
          onLikeTribute={handleLikeTribute}
          onRemoveTribute={handleRemoveTribute}
        />

        {/* 10. Interactive 3D Digital Teachers' Day Card */}
        <DigitalCard3D
          currentTeacher={currentTeacher}
          studentName={settings.studentName}
          customNote={settings.customNote}
        />

        {/* 11. Epic "SAY THANK YOU ❤️" Mega Button & Particle Burst */}
        <ThankYouMegaButton currentTeacher={currentTeacher} />

        {/* 12. Full-Screen Cinematic Finale */}
        <CinematicFinale currentTeacher={currentTeacher} />
      </main>

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
