import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { AboutSkillsSection } from './components/AboutSkillsSection';
import { ContactFooter } from './components/ContactFooter';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HeroSection } from './components/HeroSection';
import { MarqueeDivider } from './components/MarqueeDivider';
import { MessagesDrawer } from './components/MessagesDrawer';
import { Navbar } from './components/Navbar';
import { ProfileEditorModal } from './components/ProfileEditorModal';
import { ProjectLightbox } from './components/ProjectLightbox';
import { ShowcaseGrid } from './components/ShowcaseGrid';
import { WorkEditorModal } from './components/WorkEditorModal';
import { ADMIN_EMAIL, DEFAULT_PROFILE, STARTER_WORKS } from './data/portfolioData';
import { auth, googleProvider } from './lib/firebase';
import {
  createPortfolioWork,
  deletePortfolioWork,
  deleteVisitorMessage,
  importStarterWorksToFirestore,
  markMessageRead,
  savePublicProfile,
  subscribePortfolioWorks,
  subscribePublicProfile,
  subscribeVisitorMessages,
  submitVisitorMessage,
  updatePortfolioWork,
} from './lib/portfolioService';
import { Language, PortfolioWork, PublicProfile, VisitorMessage } from './types/portfolio';

const STORAGE_THEME_KEY = 'vitrina_portfolio_theme_v1';
const STORAGE_LANG_KEY = 'vitrina_portfolio_lang_v1';

function PortfolioApp() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      return saved === 'en' ? 'en' : 'uz';
    } catch {
      return 'uz';
    }
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY);
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const [profile, setProfile] = useState<PublicProfile>(DEFAULT_PROFILE);
  const [firestoreWorks, setFirestoreWorks] = useState<PortfolioWork[]>([]);
  const [worksLoading, setWorksLoading] = useState(true);
  const [messages, setMessages] = useState<VisitorMessage[]>([]);

  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const [workEditorOpen, setWorkEditorOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<PortfolioWork | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);

  const isOwner = Boolean(
    user && user.emailVerified && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );

  // Sync theme on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_THEME_KEY, theme);
    } catch {
      // Ignore storage error
    }
  }, [theme]);

  // Sync language
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // Ignore storage error
    }
  }, [lang]);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
    });
    return unsub;
  }, []);

  // Public profile listener
  useEffect(() => {
    const unsub = subscribePublicProfile((remote) => {
      if (remote) {
        setProfile({ ...DEFAULT_PROFILE, ...remote });
      }
    });
    return unsub;
  }, []);

  // Portfolio works listener
  useEffect(() => {
    if (!authReady) return;
    setWorksLoading(true);
    const fallbackTimer = setTimeout(() => {
      setWorksLoading(false);
    }, 4000);
    const unsub = subscribePortfolioWorks(
      isOwner,
      (items) => {
        clearTimeout(fallbackTimer);
        setFirestoreWorks(items);
        setWorksLoading(false);
      },
      () => {
        clearTimeout(fallbackTimer);
        setWorksLoading(false);
      }
    );
    return () => {
      clearTimeout(fallbackTimer);
      unsub();
    };
  }, [authReady, isOwner]);

  // Visitor messages listener (owner only)
  useEffect(() => {
    if (!authReady || !isOwner) {
      setMessages([]);
      return;
    }
    const unsub = subscribeVisitorMessages((items) => {
      setMessages(items);
    });
    return unsub;
  }, [authReady, isOwner]);

  const displayedWorks = firestoreWorks.length > 0 ? firestoreWorks : STARTER_WORKS;
  const selectedIndex = displayedWorks.findIndex((w) => w.id === selectedWorkId);
  const selectedWork = selectedIndex >= 0 ? displayedWorks[selectedIndex] : null;
  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const scrollToContact = () => {
    const el = document.getElementById('boglanish');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveWork = async (
    payload: Omit<PortfolioWork, 'id' | 'ownerUid' | 'createdAt' | 'updatedAt'>,
    existingId?: string
  ) => {
    if (existingId) {
      await updatePortfolioWork(existingId, payload);
    } else {
      await createPortfolioWork(payload);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#141413] dark:bg-[#09090B] dark:text-[#F4F4F5] transition-colors duration-200">
      <Navbar brandName={profile.brandName} lang={lang} onContactClick={scrollToContact} />

      <main>
        <HeroSection
          profile={profile}
          lang={lang}
          worksCount={displayedWorks.length}
        />

        <MarqueeDivider lang={lang} />

        <ShowcaseGrid
          works={displayedWorks}
          lang={lang}
          isOwner={isOwner}
          isLoading={worksLoading}
          hasFirestoreWorks={firestoreWorks.length > 0}
          unreadMessagesCount={unreadMessagesCount}
          onSelectWork={(work) => setSelectedWorkId(work.id)}
          onCreateWork={() => {
            setEditingWork(null);
            setWorkEditorOpen(true);
          }}
          onEditWork={(work) => {
            setEditingWork(work);
            setWorkEditorOpen(true);
          }}
          onOpenProfileEditor={() => setProfileModalOpen(true)}
          onOpenMessages={() => setMessagesOpen(true)}
          onImportStarters={importStarterWorksToFirestore}
        />

        <AboutSkillsSection profile={profile} lang={lang} />
      </main>

      <ContactFooter
        profile={profile}
        lang={lang}
        theme={theme}
        userEmail={user?.email ?? null}
        isOwner={isOwner}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        onToggleLang={() => setLang((prev) => (prev === 'uz' ? 'en' : 'uz'))}
        onSignIn={async () => {
          await signInWithPopup(auth, googleProvider);
        }}
        onSignOut={async () => {
          await signOut(auth);
        }}
        onSendMessage={submitVisitorMessage}
      />

      <ProjectLightbox
        work={selectedWork}
        lang={lang}
        isOwner={isOwner}
        onClose={() => setSelectedWorkId(null)}
        onPrev={() => {
          if (selectedIndex < 0) return;
          const prevIdx = (selectedIndex - 1 + displayedWorks.length) % displayedWorks.length;
          setSelectedWorkId(displayedWorks[prevIdx].id);
        }}
        onNext={() => {
          if (selectedIndex < 0) return;
          const nextIdx = (selectedIndex + 1) % displayedWorks.length;
          setSelectedWorkId(displayedWorks[nextIdx].id);
        }}
        onEdit={(work) => {
          setEditingWork(work);
          setWorkEditorOpen(true);
        }}
        onDelete={deletePortfolioWork}
      />

      {workEditorOpen && (
        <WorkEditorModal
          key={editingWork?.id ?? 'new-work'}
          isOpen={workEditorOpen}
          editingWork={editingWork}
          lang={lang}
          onClose={() => {
            setWorkEditorOpen(false);
            setEditingWork(null);
          }}
          onSave={handleSaveWork}
        />
      )}

      {profileModalOpen && (
        <ProfileEditorModal
          key={`${profile.brandName}-${profileModalOpen}`}
          isOpen={profileModalOpen}
          profile={profile}
          lang={lang}
          onClose={() => setProfileModalOpen(false)}
          onSave={savePublicProfile}
        />
      )}

      <MessagesDrawer
        isOpen={messagesOpen}
        messages={messages}
        lang={lang}
        onClose={() => setMessagesOpen(false)}
        onToggleRead={markMessageRead}
        onDelete={deleteVisitorMessage}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <PortfolioApp />
    </ErrorBoundary>
  );
}
