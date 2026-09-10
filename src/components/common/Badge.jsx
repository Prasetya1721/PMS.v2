import React from 'react';

export default function Badge({ children, variant = 'gray', icon: Icon, className = '' }) {
  const variantClass = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    purple: 'badge-purple',
    gray: 'badge-gray'
  }[variant] || 'badge-gray';

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {Icon && <Icon size={12} style={{ marginRight: '2px' }} />}
      {children}
    </span>
  );
}
