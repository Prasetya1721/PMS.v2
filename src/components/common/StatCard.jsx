import React from 'react';

export default function StatCard({ title, value, meta, icon: Icon, color = 'blue', trend }) {
  const colorStyles = {
    blue: { bg: '#eff6ff', color: '#2563eb' },
    green: { bg: '#ecfdf5', color: '#059669' },
    amber: { bg: '#fffbeb', color: '#d97706' },
    rose: { bg: '#fff1f2', color: '#e11d48' },
    purple: { bg: '#f5f3ff', color: '#7c3aed' },
    cyan: { bg: '#f0f9ff', color: '#0284c7' }
  }[color] || { bg: '#eff6ff', color: '#2563eb' };

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-title">{title}</span>
        {Icon && (
          <div
            className="stat-icon-wrap"
            style={{ backgroundColor: colorStyles.bg, color: colorStyles.color }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="stat-value">{value}</div>
      {meta && (
        <div className="stat-meta">
          {trend && <span style={{ fontWeight: 600 }}>{trend}</span>}
          <span>{meta}</span>
        </div>
      )}
    </div>
  );
}
