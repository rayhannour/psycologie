"use client";

interface SectionHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeader = ({ title, highlight, subtitle, centered = true }: SectionHeaderProps) => {
  return (
    <div className={`mb-20 ${centered ? 'text-center' : 'text-left'}`}>
      <div className={`flex items-center gap-2 mb-6 ${centered ? 'justify-center' : ''}`}>
        <div className="w-8 h-[1px] bg-primary" />
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Découvrir</span>
      </div>
      <h2 className="text-5xl md:text-6xl font-bold mb-6 display-font tracking-tighter">
        {title} {highlight && <span className="text-primary">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className={`text-lg text-secondary max-w-2xl ${centered ? 'mx-auto' : ''} leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
