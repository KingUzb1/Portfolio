import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Language, PublicProfile } from '../types/portfolio';

interface ProfileEditorModalProps {
  isOpen: boolean;
  profile: PublicProfile;
  lang: Language;
  onClose: () => void;
  onSave: (updated: PublicProfile) => Promise<void>;
}

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  isOpen,
  profile,
  lang,
  onClose,
  onSave,
}) => {
  const [brandName, setBrandName] = useState(profile.brandName);
  const [specialty, setSpecialty] = useState(profile.specialty);
  const [headline, setHeadline] = useState(profile.headline);
  const [subheadline, setSubheadline] = useState(profile.subheadline);
  const [aboutBio, setAboutBio] = useState(profile.aboutBio);
  const [experienceYears, setExperienceYears] = useState(profile.experienceYears);
  const [skillsText, setSkillsText] = useState(profile.skills.join(', '));
  const [contactEmail, setContactEmail] = useState(profile.contactEmail);
  const [telegram, setTelegram] = useState(profile.telegram);
  const [githubUrl, setGithubUrl] = useState(profile.githubUrl);
  const [behanceUrl, setBehanceUrl] = useState(profile.behanceUrl);
  const [instagramUrl, setInstagramUrl] = useState(profile.instagramUrl);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const skills = skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 12);

      await onSave({
        ...profile,
        brandName: brandName.trim() || profile.brandName,
        specialty: specialty.trim() || profile.specialty,
        headline: headline.trim() || profile.headline,
        subheadline: subheadline.trim() || profile.subheadline,
        aboutBio: aboutBio.trim() || profile.aboutBio,
        experienceYears: experienceYears.trim() || profile.experienceYears,
        skills,
        contactEmail: contactEmail.trim(),
        telegram: telegram.trim(),
        githubUrl: githubUrl.trim(),
        behanceUrl: behanceUrl.trim(),
        instagramUrl: instagramUrl.trim(),
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profilni saqlashda xatolik');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'uz' ? 'Profilni tahrirlash' : 'Edit Profile'}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#FAF9F6] dark:bg-[#111114] border border-black/10 dark:border-white/10 p-6 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
          <h2 className="font-display text-xl font-bold text-[#141413] dark:text-[#F4F4F5]">
            {lang === 'uz' ? "Shaxsiy profilni tahrirlash" : 'Edit Public Profile'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'uz' ? 'Yopish' : 'Close'}
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                {lang === 'uz' ? 'Ism / Brend' : 'Name / Brand'}
              </label>
              <input
                type="text"
                maxLength={60}
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                {lang === 'uz' ? 'Mutaxassislik' : 'Specialty'}
              </label>
              <input
                type="text"
                maxLength={120}
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
              {lang === 'uz' ? 'Asosiy sarlavha' : 'Headline'}
            </label>
            <input
              type="text"
              maxLength={160}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
              {lang === 'uz' ? 'Qisqa kirish matni' : 'Intro Subtitle'}
            </label>
            <textarea
              rows={2}
              maxLength={400}
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
              {lang === 'uz' ? "O'zingiz haqingizda (Men haqimda)" : 'About Bio'}
            </label>
            <textarea
              rows={3}
              maxLength={1200}
              value={aboutBio}
              onChange={(e) => setAboutBio(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                {lang === 'uz' ? 'Ish joyi / Kompaniya' : 'Company / Workplace'}
              </label>
              <input
                type="text"
                maxLength={20}
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                {lang === 'uz'
                  ? "Ko'nikmalar (vergul bilan, max 12)"
                  : 'Skills (comma-separated, max 12)'}
              </label>
              <input
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                Email
              </label>
              <input
                type="email"
                maxLength={120}
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                Telegram
              </label>
              <input
                type="text"
                maxLength={80}
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                GitHub URL
              </label>
              <input
                type="url"
                maxLength={250}
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                Behance URL
              </label>
              <input
                type="url"
                maxLength={250}
                value={behanceUrl}
                onChange={(e) => setBehanceUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                maxLength={250}
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
              />
            </div>
          </div>

          {error && <p className="text-xs font-medium text-[#D9381E]">{error}</p>}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium rounded-xl border border-black/10 dark:border-white/10 text-[#575652] dark:text-[#A1A1AA] cursor-pointer"
            >
              {lang === 'uz' ? 'Bekor qilish' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-[#D9381E] text-white hover:bg-[#B82D16] cursor-pointer disabled:opacity-50"
            >
              {saving
                ? lang === 'uz'
                  ? 'Saqlanmoqda...'
                  : 'Saving...'
                : lang === 'uz'
                  ? 'Saqlash'
                  : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
