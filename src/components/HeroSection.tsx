import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/portfolioData';
import { Language, PublicProfile } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  profile: PublicProfile;
  lang: Language;
  worksCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  lang,
  worksCount,
}) => {
  const stats =
    lang === 'uz'
      ? [
          { value: profile.experienceYears || 'Fincube', label: "Sug'urta dasturlari bo'limi" },
          { value: 'Oracle APEX', label: 'Asosiy texnologiya' },
          { value: `${worksCount} ta`, label: 'Portfoliyodagi loyihalar' },
          { value: `${profile.skills.length} ta`, label: 'Texnologiya va vositalar' },
        ]
      : [
          { value: profile.experienceYears || 'Fincube', label: 'Insurance software division' },
          { value: 'Oracle APEX', label: 'Primary technology' },
          { value: `${worksCount}`, label: 'Published projects' },
          { value: `${profile.skills.length}`, label: 'Core skills & tools' },
        ];

  return (
    <section id="top" className="pt-10 sm:pt-14 pb-12 sm:pb-16">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#6B6A65] dark:text-[#A1A1AA] mb-5">
                {profile.specialty}
              </p>

              <h1
                className="font-display text-[clamp(2.35rem,4.5vw,3.95rem)] font-bold tracking-tight leading-[1.06] text-[#141413] dark:text-[#F4F4F5] mb-6"
                style={{ textWrap: 'balance' }}
              >
                {profile.headline}
              </h1>

              <p className="text-base sm:text-lg leading-[1.65] text-[#4A4945] dark:text-[#B4B4BC] max-w-[56ch]">
                {profile.subheadline}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#ishlar"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#D9381E] hover:bg-[#B82D16] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9381E]"
              >
                <span>{lang === 'uz' ? "Ishlarimni ko'rish" : 'View My Works'}</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#haqida"
                className="inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-[#141413] dark:text-[#F4F4F5] hover:text-[#D9381E] dark:hover:text-[#D9381E] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>{lang === 'uz' ? 'Men haqimda' : 'About Me'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-[#EFECE5] dark:bg-[#131316]">
              <ResilientImage
                src={HERO_IMAGE}
                alt={`${profile.brandName} — portfolio studio`}
                fallbackTitle={profile.brandName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 pb-8 border-t border-b border-black/[0.08] dark:border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#141413] dark:text-[#F4F4F5] tabular-nums">
                {item.value}
              </div>
              <div className="text-sm text-[#6B6A65] dark:text-[#A1A1AA]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
