import React from 'react';

/**
 * Universal Modern Maritime Emblem (White-label Commercial Vector)
 * Sleek Navy & Cyan Nautical Compass Star with Ship Helm and Anchor accents.
 */
export const MaritimeEmblem = ({ size = 48, className = '', style = {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
    >
      <defs>
        <linearGradient id="maritimeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="maritimeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* Outer Helm Ring */}
      <circle cx="50" cy="50" r="44" stroke="url(#maritimeGrad1)" strokeWidth="3" opacity="0.35" />
      <circle cx="50" cy="50" r="38" stroke="url(#maritimeGrad1)" strokeWidth="2.5" />

      {/* Helm Handles / Spoke Nodes (8-point) */}
      <line x1="50" y1="2" x2="50" y2="12" stroke="url(#maritimeGrad1)" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="50" y1="88" x2="50" y2="98" stroke="url(#maritimeGrad1)" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="2" y1="50" x2="12" y2="50" stroke="url(#maritimeGrad1)" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="88" y1="50" x2="98" y2="50" stroke="url(#maritimeGrad1)" strokeWidth="3.5" strokeLinecap="round" />

      <line x1="16" y1="16" x2="23" y2="23" stroke="url(#maritimeGrad1)" strokeWidth="3" strokeLinecap="round" />
      <line x1="77" y1="77" x2="84" y2="84" stroke="url(#maritimeGrad1)" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="84" x2="23" y2="77" stroke="url(#maritimeGrad1)" strokeWidth="3" strokeLinecap="round" />
      <line x1="77" y1="23" x2="84" y2="16" stroke="url(#maritimeGrad1)" strokeWidth="3" strokeLinecap="round" />

      {/* Inner Dynamic Waves */}
      <path
        d="M 22 56 Q 36 48 50 56 T 78 56"
        stroke="url(#maritimeGrad1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 28 64 Q 39 58 50 64 T 72 64"
        stroke="url(#maritimeGrad1)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* Central Ship Bow / Stylized Vessel Hull */}
      <path
        d="M 50 20 L 66 48 L 50 42 L 34 48 Z"
        fill="url(#goldGrad)"
      />

      {/* Center Core Compass Point */}
      <circle cx="50" cy="50" r="4.5" fill="#38bdf8" />
    </svg>
  );
};

/**
 * Universal Corporate Maritime Logo & Typography Component
 * White-label commercial design ready for any shipping company.
 */
export const MaritimeLogo = ({
  variant = 'white', // 'white' | 'dark'
  size = 'lg', // 'sm' | 'md' | 'lg' | 'xl'
  companyName = 'SISTEM PMS ARMADA MARITIM',
  tagline = 'Planned Maintenance System & Fleet Management',
  showText = true,
  className = '',
  style = {}
}) => {
  const config = {
    sm: { emblemSize: 24, fontSize: '0.88rem', gap: '0.5rem', letterSpacing: '0.02em' },
    md: { emblemSize: 32, fontSize: '1.1rem', gap: '0.65rem', letterSpacing: '0.025em' },
    lg: { emblemSize: 42, fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)', gap: '0.85rem', letterSpacing: '0.025em' },
    xl: { emblemSize: 52, fontSize: '1.7rem', gap: '1.1rem', letterSpacing: '0.03em' }
  }[size] || { emblemSize: 42, fontSize: '1.35rem', gap: '0.85rem', letterSpacing: '0.025em' };

  const textColor = variant === 'dark' ? '#0f172a' : '#ffffff';

  return (
    <div
      className={`maritime-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: config.gap,
        userSelect: 'none',
        lineHeight: 1.1,
        maxWidth: '100%',
        ...style
      }}
    >
      {/* Vector Emblem */}
      <MaritimeEmblem size={config.emblemSize} />

      {/* Corporate Typography */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: config.fontSize,
              fontWeight: 800,
              letterSpacing: config.letterSpacing,
              lineHeight: 1.15,
              color: textColor,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              textShadow: variant === 'white' ? '0 2px 10px rgba(0, 0, 0, 0.4)' : 'none'
            }}
          >
            {companyName}
          </span>
          {tagline && (
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 500,
                color: variant === 'dark' ? '#64748b' : 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.04em',
                marginTop: '0.15rem'
              }}
            >
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Official Report Header Logo for Official Documents & Print Reports
 * Tailored for official print documents, audit headers, and certificates.
 */
export const MaritimeReportLogo = ({ emblemSize = 34, className = '', style = {} }) => {
  return (
    <div
      className={`maritime-report-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        lineHeight: 1,
        userSelect: 'none',
        ...style
      }}
    >
      <MaritimeEmblem size={emblemSize} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
        <span style={{ fontSize: '6.5pt', fontWeight: 700, color: '#334155', letterSpacing: '0.4px', lineHeight: 1.15, fontFamily: "'Segoe UI', Arial, sans-serif" }}>
          SISTEM MANAJEMEN
        </span>
        <span
          style={{
            fontSize: '8.5pt',
            fontWeight: 900,
            color: '#0284c7',
            letterSpacing: '0.4px',
            lineHeight: 1.15,
            fontFamily: "'Inter', Arial, sans-serif"
          }}
        >
          PMS ARMADA
        </span>
        <span style={{ fontSize: '6pt', fontWeight: 800, color: '#0369a1', letterSpacing: '0.8px', lineHeight: 1.15, fontFamily: "'Segoe UI', Arial, sans-serif" }}>
          MARITIM
        </span>
      </div>
    </div>
  );
};

// Aliases
export const BrandEmblem = MaritimeEmblem;
export const BrandLogo = MaritimeLogo;
export const ReportLogo = MaritimeReportLogo;
export default MaritimeLogo;

