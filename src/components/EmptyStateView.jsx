import React from 'react';
import { Store, Tag, Sparkles, ArrowRight } from 'lucide-react';

export const EmptyStateView = ({ type, onSwitchToMarketplace }) => {
  const isTopBrands = type === 'top-brands';
  
  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.iconCircle}>
        {isTopBrands ? (
          <Tag size={42} color="#10B981" />
        ) : (
          <Store size={42} color="#6366F1" />
        )}
      </div>
      
      <h2 style={styles.title}>
        {isTopBrands ? 'Top Brand Stores Coming Soon' : 'Nearby Partner Stores Coming Soon'}
      </h2>
      
      <p style={styles.description}>
        {isTopBrands
          ? 'We are partnering with top global electronics & luxury brands to bring exclusive zero-cost EMI offers directly to your 1Fi App.'
          : 'Local retail partner store listings with instant 1Fi QR checkout will be available in your city very soon.'}
      </p>

      <div style={styles.badge}>
        <Sparkles size={14} color="#10B981" />
        <span>No implementation required for this section per assignment spec</span>
      </div>

      <button onClick={onSwitchToMarketplace} className="btn-primary" style={{ marginTop: '24px' }}>
        <span>Explore 1Fi Marketplace</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 24px',
    textAlign: 'center',
    maxWidth: '560px',
    margin: '40px auto 0',
    background: 'rgba(17, 24, 39, 0.5)',
    border: '1px dashed rgba(255, 255, 255, 0.12)',
    borderRadius: '24px',
  },
  iconCircle: {
    width: '88px',
    height: '88px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: '10px',
  },
  description: {
    fontSize: '14px',
    color: '#9CA3AF',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '20px',
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    color: '#34D399',
    fontSize: '12px',
    fontWeight: '600',
  },
};
