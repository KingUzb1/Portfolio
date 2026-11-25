import React from 'react';
import { Language, PublicProfile } from '../types/portfolio';

interface AboutSkillsSectionProps {
  profile: PublicProfile;
  lang: Language;
}

export const AboutSkillsSection: React.FC<AboutSkillsSectionProps> = ({ profile, lang }) => {
  return (
    <section
      id="haqida"
      className="py-16 sm:py-24 border-t border-black/[0.07] dark:border-white/[0.08] bg-[#F3F1EC]/50 dark:bg-[#0D0D10]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-16">
        {/* About Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-[#D9381E] mb-2">
              {lang === 'uz' ? 'Men Haqimda' : 'About Me'}
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#F4F4F5]"
              style={{ textWrap: 'balance' }}
            >
              {profile.brandName}
            </h2>
            <p className="mt-2 text-sm text-[#6B6A65] dark:text-[#A1A1AA]">{profile.specialty}</p>
            <p className="mt-1 text-xs text-[#6B6A65] dark:text-[#A1A1AA]">
              {lang === 'uz' ? "Toshkent, O'zbekiston" : 'Tashkent, Uzbekistan'}
            </p>
          </div>

          <div className="lg:col-span-8">
            <p className="text-base sm:text-lg leading-[1.75] text-[#353430] dark:text-[#D4D4D8] max-w-[68ch] whitespace-pre-line">
              {profile.aboutBio.split('@ViloyatTaxiUzBot').map((part, idx, arr) => (
                <React.Fragment key={idx}>
                  {part}
                  {idx < arr.length - 1 && (
                    <a
                      href="https://t.me/ViloyatTaxiUzBot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#D9381E] hover:underline"
                    >
                      @ViloyatTaxiUzBot
                    </a>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* Skills & Tools Grid (Clean Editorial Rows, Zero Pills) */}
        <div
          id="konikmalar"
          className="pt-14 border-t border-black/[0.08] dark:border-white/[0.08]"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-medium text-[#D9381E] mb-2">
                {lang === 'uz' ? "Ko'nikmalar va Vositalar" : 'Skills & Stack'}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#141413] dark:text-[#F4F4F5]">
                {lang === 'uz'
                  ? 'Ishlarimda foydalanadigan asosiy texnologiyalar'
                  : 'Core disciplines and tools I work with'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2">
            {profile.skills.map((skill, idx) => (
              <div
                key={`${skill}-${idx}`}
                className="py-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-baseline gap-3"
              >
                <span className="font-mono-tabular text-xs text-[#D9381E]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-base font-medium text-[#141413] dark:text-[#F4F4F5]">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
