import React from 'react';
import { Language } from '../types/portfolio';

interface MarqueeDividerProps {
  lang: Language;
}

export const MarqueeDivider: React.FC<MarqueeDividerProps> = ({ lang }) => {
  const items =
    lang === 'uz'
      ? [
          'oracle apex',
          "sug'urta dasturiy ta'minoti",
          'telegram botlar',
          'ios mobil ilovalar',
          "sun'iy intellekt avtomatizatsiyasi",
          'bajarilgan loyihalar',
        ]
      : [
          'oracle apex',
          'insurance software systems',
          'telegram bots',
          'ios mobile apps',
          'ai business automation',
          'completed works',
        ];

  const track = [...items, ...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden py-4 border-b border-black/[0.07] dark:border-white/[0.08] bg-[#F3F1EC] dark:bg-[#111114]"
    >
      <div className="animate-marquee flex items-center gap-8 text-sm font-medium text-[#575652] dark:text-[#A1A1AA] select-none">
        {track.map((text, idx) => (
          <React.Fragment key={`${text}-${idx}`}>
            <span className="whitespace-nowrap">{text}</span>
            <span className="text-[#D9381E]">·</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
