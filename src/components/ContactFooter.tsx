import React, { useState } from 'react';
import { Check, Copy, LogIn, LogOut, Moon, Send, Sun } from 'lucide-react';
import { Language, PublicProfile } from '../types/portfolio';

interface ContactFooterProps {
  profile: PublicProfile;
  lang: Language;
  theme: 'light' | 'dark';
  userEmail: string | null;
  isOwner: boolean;
  onToggleTheme: () => void;
  onToggleLang: () => void;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onSendMessage: (input: {
    senderName: string;
    senderContact: string;
    body: string;
  }) => Promise<void>;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  profile,
  lang,
  theme,
  userEmail,
  isOwner,
  onToggleTheme,
  onToggleLang,
  onSignIn,
  onSignOut,
  onSendMessage,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleCopyEmail = async () => {
    if (!profile.contactEmail) return;
    try {
      await navigator.clipboard.writeText(profile.contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Ignore clipboard permission failure
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (senderName.trim().length < 2 || senderContact.trim().length < 3 || body.trim().length < 5) {
      setErrorMsg(
        lang === 'uz'
          ? 'Iltimos, ismingiz, aloqa manzilingiz va xabar matnini kiriting.'
          : 'Please enter your name, contact info, and a brief message.'
      );
      return;
    }

    setErrorMsg('');
    setSending(true);
    try {
      await onSendMessage({
        senderName: senderName.trim(),
        senderContact: senderContact.trim(),
        body: body.trim(),
      });
      setSubmitted(true);
      setSenderName('');
      setSenderContact('');
      setBody('');
    } catch {
      setErrorMsg(
        lang === 'uz'
          ? 'Xabar yuborishda xatolik yuz berdi. Qayta urinib ko‘ring.'
          : 'Could not send message. Please try again.'
      );
    } finally {
      setSending(false);
    }
  };

  const handleLoginClick = async () => {
    setAuthError('');
    try {
      await onSignIn();
    } catch {
      setAuthError(
        lang === 'uz'
          ? 'Kirish bekor qilindi yoki xatolik yuz berdi.'
          : 'Sign-in cancelled or failed.'
      );
    }
  };

  return (
    <footer
      id="boglanish"
      className="pt-16 sm:pt-24 pb-10 border-t border-black/[0.08] dark:border-white/[0.08]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <p className="text-sm font-medium text-[#D9381E] mb-2">
                {lang === 'uz' ? "Bog'lanish" : 'Get in Touch'}
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#F4F4F5]"
                style={{ textWrap: 'balance' }}
              >
                {lang === 'uz'
                  ? "Hamkorlik yoki savollar uchun yozing."
                  : 'Have a project or question? Send a note.'}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A4945] dark:text-[#B4B4BC]">
                {lang === 'uz'
                  ? "Xabarlaringiz to'g'ridan-to'g'ri shaxsiy kabinetimga yetib keladi."
                  : 'Your message lands directly in my portfolio inbox.'}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-black/[0.08] dark:border-white/[0.08]">
              {profile.contactEmail && (
                <div>
                  <div className="text-xs text-[#6B6A65] dark:text-[#A1A1AA] mb-1">Email</div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <a
                      href={`mailto:${profile.contactEmail}`}
                      className="font-medium text-base text-[#141413] dark:text-[#F4F4F5] hover:text-[#D9381E] transition-colors"
                    >
                      {profile.contactEmail}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-black/10 dark:border-white/10 text-[#575652] dark:text-[#A1A1AA] hover:text-[#141413] dark:hover:text-[#F4F4F5] cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#D9381E]" />
                          <span>{lang === 'uz' ? 'Nusxalandi' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'uz' ? 'Nusxalash' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {profile.telegram && (
                <div>
                  <div className="text-xs text-[#6B6A65] dark:text-[#A1A1AA] mb-1">Telegram</div>
                  <a
                    href={`https://t.me/${profile.telegram.replace(/^@/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-tabular text-sm font-medium text-[#141413] dark:text-[#F4F4F5] hover:text-[#D9381E] transition-colors"
                  >
                    {profile.telegram.startsWith('@')
                      ? profile.telegram
                      : `@${profile.telegram}`}
                  </a>
                </div>
              )}

              <div>
                <div className="text-xs text-[#6B6A65] dark:text-[#A1A1AA] mb-1">
                  {lang === 'uz' ? 'Manzil' : 'Location'}
                </div>
                <span className="text-sm font-medium text-[#141413] dark:text-[#F4F4F5]">
                  {lang === 'uz' ? "Toshkent, O'zbekiston" : 'Tashkent, Uzbekistan'}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-[#F3F1EC] dark:bg-[#131316] border border-black/[0.08] dark:border-white/[0.08] space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="visitor-name"
                    className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5"
                  >
                    {lang === 'uz' ? 'Ismingiz' : 'Your Name'}
                  </label>
                  <input
                    id="visitor-name"
                    type="text"
                    maxLength={80}
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder={lang === 'uz' ? 'Masalan, Sardor' : 'e.g. Alex'}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="visitor-contact"
                    className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5"
                  >
                    {lang === 'uz' ? 'Telegram yoki Email' : 'Telegram or Email'}
                  </label>
                  <input
                    id="visitor-contact"
                    type="text"
                    maxLength={120}
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    placeholder="@username / email@domain.com"
                    className="w-full px-4 py-3 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="visitor-body"
                  className="block text-xs font-medium text-[#575652] dark:text-[#A1A1AA] mb-1.5"
                >
                  {lang === 'uz' ? 'Xabar matni' : 'Message'}
                </label>
                <textarea
                  id="visitor-body"
                  rows={4}
                  maxLength={1500}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={
                    lang === 'uz'
                      ? 'Taklifingiz yoki savolingizni yozing...'
                      : 'Write your message here...'
                  }
                  className="w-full px-4 py-3 text-sm rounded-xl bg-white dark:bg-[#09090B] border border-black/10 dark:border-white/10 text-[#141413] dark:text-[#F4F4F5] focus:outline-none focus:border-[#D9381E] resize-none"
                />
              </div>

              {errorMsg && (
                <p role="alert" className="text-xs font-medium text-[#D9381E]">
                  {errorMsg}
                </p>
              )}

              {submitted && (
                <div
                  role="status"
                  className="p-3.5 rounded-xl bg-white dark:bg-[#1E1E24] border border-black/10 dark:border-white/10 text-sm text-[#141413] dark:text-[#F4F4F5] flex items-center gap-2.5"
                >
                  <Check className="w-4 h-4 text-[#D9381E] shrink-0" />
                  <span>
                    {lang === 'uz'
                      ? 'Xabaringiz yuborildi! Tez orada javob beraman.'
                      : 'Message sent! I will reply soon.'}
                  </span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#D9381E] hover:bg-[#B82D16] rounded-xl transition-colors duration-150 cursor-pointer disabled:opacity-50"
                >
                  <span>
                    {sending
                      ? lang === 'uz'
                        ? 'Yuborilmoqda...'
                        : 'Sending...'
                      : lang === 'uz'
                        ? 'Xabar yuborish'
                        : 'Send Message'}
                  </span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Footer Links & Controls */}
        <div className="pt-8 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6B6A65] dark:text-[#A1A1AA]">
          <div className="flex flex-wrap items-center gap-3">
            <span>
              © {new Date().getFullYear()} {profile.brandName}.
            </span>
            {profile.githubUrl && (
              <>
                <span aria-hidden="true">·</span>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#141413] dark:hover:text-[#F4F4F5]"
                >
                  GitHub
                </a>
              </>
            )}
            {profile.behanceUrl && (
              <>
                <span aria-hidden="true">·</span>
                <a
                  href={profile.behanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#141413] dark:hover:text-[#F4F4F5]"
                >
                  Behance
                </a>
              </>
            )}
            {profile.instagramUrl && (
              <>
                <span aria-hidden="true">·</span>
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#141413] dark:hover:text-[#F4F4F5]"
                >
                  Instagram
                </a>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {authError && <span className="text-[#D9381E] mr-2">{authError}</span>}

            {userEmail ? (
              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:text-[#141413] dark:hover:text-[#F4F4F5] transition-colors cursor-pointer whitespace-nowrap"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>
                  {isOwner
                    ? lang === 'uz'
                      ? 'Chiqish (Muallif)'
                      : 'Sign out (Owner)'
                    : `${userEmail} · ${lang === 'uz' ? 'Chiqish' : 'Sign out'}`}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLoginClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:text-[#141413] dark:hover:text-[#F4F4F5] transition-colors cursor-pointer whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{lang === 'uz' ? 'Muallif kirishi' : 'Owner Sign-In'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onToggleLang}
              className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 font-mono-tabular hover:text-[#141413] dark:hover:text-[#F4F4F5] transition-colors cursor-pointer whitespace-nowrap"
            >
              {lang === 'uz' ? 'UZ / EN' : 'EN / UZ'}
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Yorug‘ rejim' : 'Tungi rejim'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:text-[#141413] dark:hover:text-[#F4F4F5] transition-colors cursor-pointer whitespace-nowrap"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span>{lang === 'uz' ? 'Yorug‘' : 'Light'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>{lang === 'uz' ? 'Tungi' : 'Dark'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
