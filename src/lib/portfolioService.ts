import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { STARTER_WORKS } from '../data/portfolioData';
import { PortfolioWork, PublicProfile, VisitorMessage } from '../types/portfolio';
import { auth, db, handleFirestoreError, OperationType } from './firebase';

function trimStr(value: string | undefined, maxLen: number): string {
  return (value ?? '').trim().slice(0, maxLen);
}

function getTimestampMillis(ts: unknown): number {
  if (!ts) return 0;
  if (typeof ts === 'object' && ts !== null && 'toMillis' in ts) {
    const fn = (ts as { toMillis?: () => number }).toMillis;
    if (typeof fn === 'function') return fn();
  }
  return 0;
}

export function subscribePublicProfile(
  onData: (profile: PublicProfile | null) => void,
  onError?: (err: unknown) => void
) {
  const path = 'site/public_profile';
  return onSnapshot(
    doc(db, 'site', 'public_profile'),
    (snap) => {
      if (snap.exists()) {
        onData(snap.data() as PublicProfile);
      } else {
        onData(null);
      }
    },
    (error) => {
      if (onError) onError(error);
      try {
        handleFirestoreError(error, OperationType.GET, path);
      } catch {
        // Surfaced to caller
      }
    }
  );
}

export async function savePublicProfile(profile: PublicProfile): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('Avtorizatsiya talab qilinadi');

  const path = 'site/public_profile';
  const ref = doc(db, 'site', 'public_profile');
  const existingSnap = await getDoc(ref);

  const sanitizedSkills = profile.skills
    .map((s) => s.trim().slice(0, 40))
    .filter(Boolean)
    .slice(0, 12);

  const basePayload = {
    brandName: trimStr(profile.brandName, 60) || 'Portfolio',
    specialty: trimStr(profile.specialty, 120) || 'Dizayner',
    headline: trimStr(profile.headline, 160) || 'Mening portfoliom',
    subheadline: trimStr(profile.subheadline, 400) || 'Bajarilgan ishlar jamlanmasi.',
    aboutBio: trimStr(profile.aboutBio, 1200) || 'Shaxsiy portfolio.',
    experienceYears: trimStr(profile.experienceYears, 20) || '1+ yil',
    skills: sanitizedSkills,
    contactEmail: trimStr(profile.contactEmail, 120),
    telegram: trimStr(profile.telegram, 80),
    githubUrl: trimStr(profile.githubUrl, 250),
    behanceUrl: trimStr(profile.behanceUrl, 250),
    instagramUrl: trimStr(profile.instagramUrl, 250),
    updatedAt: serverTimestamp(),
  };

  try {
    if (existingSnap.exists()) {
      await updateDoc(ref, basePayload);
    } else {
      await setDoc(ref, {
        ownerUid: user.uid,
        ...basePayload,
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribePortfolioWorks(
  isOwner: boolean,
  onData: (works: PortfolioWork[]) => void,
  onError?: (err: unknown) => void
) {
  const path = 'projects';
  const q = isOwner
    ? query(collection(db, 'projects'))
    : query(collection(db, 'projects'), where('isPublished', '==', true));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: PortfolioWork[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<PortfolioWork, 'id'>),
      }));

      items.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt);
      });

      onData(items);
    },
    (error) => {
      if (onError) onError(error);
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch {
        // Surfaced to caller
      }
    }
  );
}

export async function createPortfolioWork(
  work: Omit<PortfolioWork, 'id' | 'ownerUid' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error('Avtorizatsiya talab qilinadi');

  const path = 'projects';
  const cleanYear = /^[0-9]{4}(-[0-9]{4})?$/.test(work.year.trim())
    ? work.year.trim()
    : String(new Date().getFullYear());

  const cleanTools = work.tools
    .map((t) => t.trim().slice(0, 32))
    .filter(Boolean)
    .slice(0, 8);

  const payload = {
    ownerUid: user.uid,
    title: trimStr(work.title, 140),
    category: work.category,
    year: cleanYear,
    client: trimStr(work.client, 100),
    role: trimStr(work.role, 100),
    summary: trimStr(work.summary, 500),
    details: trimStr(work.details, 2500),
    imageUrl: trimStr(work.imageUrl, 500000),
    liveUrl: trimStr(work.liveUrl, 300),
    tools: cleanTools,
    featured: Boolean(work.featured),
    isPublished: Boolean(work.isPublished),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(collection(db, 'projects'), payload);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updatePortfolioWork(
  id: string,
  work: Omit<PortfolioWork, 'id' | 'ownerUid' | 'createdAt' | 'updatedAt'>
): Promise<void> {
  const path = `projects/${id}`;
  const cleanYear = /^[0-9]{4}(-[0-9]{4})?$/.test(work.year.trim())
    ? work.year.trim()
    : String(new Date().getFullYear());

  const cleanTools = work.tools
    .map((t) => t.trim().slice(0, 32))
    .filter(Boolean)
    .slice(0, 8);

  const payload = {
    title: trimStr(work.title, 140),
    category: work.category,
    year: cleanYear,
    client: trimStr(work.client, 100),
    role: trimStr(work.role, 100),
    summary: trimStr(work.summary, 500),
    details: trimStr(work.details, 2500),
    imageUrl: trimStr(work.imageUrl, 500000),
    liveUrl: trimStr(work.liveUrl, 300),
    tools: cleanTools,
    featured: Boolean(work.featured),
    isPublished: Boolean(work.isPublished),
    updatedAt: serverTimestamp(),
  };

  try {
    await updateDoc(doc(db, 'projects', id), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deletePortfolioWork(id: string): Promise<void> {
  const path = `projects/${id}`;
  try {
    await deleteDoc(doc(db, 'projects', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function importStarterWorksToFirestore(): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('Avtorizatsiya talab qilinadi');

  for (const item of STARTER_WORKS) {
    const ref = doc(db, 'projects', item.id);
    const snap = await getDoc(ref);
    if (snap.exists()) continue;

    try {
      await setDoc(ref, {
        ownerUid: user.uid,
        title: trimStr(item.title, 140),
        category: item.category,
        year: item.year,
        client: trimStr(item.client, 100),
        role: trimStr(item.role, 100),
        summary: trimStr(item.summary, 500),
        details: trimStr(item.details, 2500),
        imageUrl: trimStr(item.imageUrl, 500000),
        liveUrl: trimStr(item.liveUrl, 300),
        tools: item.tools.slice(0, 8),
        featured: Boolean(item.featured),
        isPublished: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `projects/${item.id}`);
    }
  }
}

export async function submitVisitorMessage(input: {
  senderName: string;
  senderContact: string;
  body: string;
}): Promise<void> {
  const path = 'messages';
  const payload = {
    senderName: trimStr(input.senderName, 80),
    senderContact: trimStr(input.senderContact, 120),
    body: trimStr(input.body, 1500),
    isRead: false,
    createdAt: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, 'messages'), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeVisitorMessages(
  onData: (messages: VisitorMessage[]) => void,
  onError?: (err: unknown) => void
) {
  const path = 'messages';
  return onSnapshot(
    collection(db, 'messages'),
    (snapshot) => {
      const items: VisitorMessage[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<VisitorMessage, 'id'>),
      }));
      items.sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt));
      onData(items);
    },
    (error) => {
      if (onError) onError(error);
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch {
        // Surfaced to caller
      }
    }
  );
}

export async function markMessageRead(id: string, isRead: boolean): Promise<void> {
  const path = `messages/${id}`;
  try {
    await updateDoc(doc(db, 'messages', id), { isRead });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteVisitorMessage(id: string): Promise<void> {
  const path = `messages/${id}`;
  try {
    await deleteDoc(doc(db, 'messages', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
