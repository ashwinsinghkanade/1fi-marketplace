import React, { useState } from 'react';
import {
  Search,
  Grid,
  Smartphone,
  Laptop,
  Headphones,
  Tablet,
  Gamepad2,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Percent,
  Star,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export const MarketplaceView = ({
  products,
  loading,
  error,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectProduct,
  onRetry,
  onToggleErrorSim,
  isErrorSimulated
}) => {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone size={16} />;
      case 'Laptop': return <Laptop size={16} />;
      case 'Headphones': return <Headphones size={16} />;
      case 'Tablet': return <Tablet size={16} />;
      case 'Gamepad2': return <Gamepad2 size={16} />;
      default: return <Grid size={16} />;
    }
  };

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* Promo Banner */}
      <div style={styles.promoBanner}>
        <div style={styles.promoContent}>
          <div style={styles.promoBadge}>
            <Zap size={14} fill="#10B981" color="#10B981" />
            <span>1Fi Zero-Cost EMI Fest</span>
          </div>
          <h1 style={styles.promoTitle}>
            Upgrade to Flagship Tech with <span style={styles.highlightText}>₹0 Down Payment</span>
          </h1>
          <p style={styles.promoSubtitle}>
            Instant 1Fi Credit Approval up to ₹2,00,000. Flexible EMI tenures up to 24 months with no documentation.
          </p>
          <div style={styles.promoPerks}>
            <div style={styles.perkItem}>
              <CheckCircle2 size={15} color="#10B981" />
              <span>0% Interest EMIs</span>
            </div>
            <div style={styles.perkItem}>
              <ShieldCheck size={15} color="#10B981" />
              <span>Instant Loan Disbursal</span>
            </div>
            <div style={styles.perkItem}>
              <Percent size={15} color="#10B981" />
              <span>Zero Processing Fees on 6M</span>
            </div>
          </div>
        </div>
        <div style={styles.bannerGraphic}>
          <div style={styles.graphicBadge}>
            <span style={{ fontSize: '28px', fontWeight: '800', color: '#10B981' }}>0%</span>
            <span style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase' }}>Interest Plans</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Error Simulation Toggle */}
      <div style={styles.controlsRow}>
        <div style={styles.searchWrapper}>
          <Search size={18} color="#9CA3AF" style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search products by name, brand, or model..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Debug / Dev state toggle for evaluating error handling requirement */}
        <button
          onClick={onToggleErrorSim}
          style={{
            ...styles.errorSimBtn,
            background: isErrorSimulated ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            borderColor: isErrorSimulated ? '#EF4444' : 'rgba(255, 255, 255, 0.1)'
          }}
          title="Toggle API Error state to evaluate resilience"
        >
          <AlertTriangle size={15} color={isErrorSimulated ? '#EF4444' : '#9CA3AF'} />
          <span style={{ color: isErrorSimulated ? '#FCA5A5' : '#9CA3AF', fontSize: '12px' }}>
            {isErrorSimulated ? 'Simulating API Error' : 'Simulate API Error'}
          </span>
        </button>
      </div>

      {/* Categories Horizontal Chips */}
      <div style={styles.categoriesRow}>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                ...styles.categoryChip,
                background: isActive ? '#10B981' : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#FFFFFF' : '#9CA3AF',
                borderColor: isActive ? '#10B981' : 'rgba(255, 255, 255, 0.08)',
                boxShadow: isActive ? '0 4px 14px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Error State */}
      {error && (
        <div style={styles.errorContainer}>
          <AlertTriangle size={36} color="#EF4444" style={{ marginBottom: '12px' }} />
          <h3 style={{ color: '#F9FAFB', fontSize: '18px', fontWeight: '700' }}>Oops! Failed to load products</h3>
          <p style={{ color: '#9CA3AF', fontSize: '14px', margin: '8px 0 20px' }}>{error}</p>
          <button onClick={onRetry} className="btn-primary">
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && !error && (
        <div style={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} style={styles.skeletonCard}>
              <div className="skeleton-box" style={{ height: '180px', width: '100%', borderRadius: '12px' }}></div>
              <div className="skeleton-box" style={{ height: '20px', width: '70%', marginTop: '16px' }}></div>
              <div className="skeleton-box" style={{ height: '14px', width: '90%', marginTop: '8px' }}></div>
              <div className="skeleton-box" style={{ height: '24px', width: '50%', marginTop: '16px' }}></div>
              <div className="skeleton-box" style={{ height: '40px', width: '100%', marginTop: '16px' }}></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty Filter State */}
      {!loading && !error && products.length === 0 && (
        <div style={styles.emptyResults}>
          <Search size={40} color="#4B5563" style={{ marginBottom: '12px' }} />
          <h3 style={{ color: '#F9FAFB', fontSize: '18px', fontWeight: '700' }}>No products found</h3>
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
            Try searching for another keyword or selecting a different category.
          </p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && products.length > 0 && (
        <div>
          <div style={styles.resultsCountHeader}>
            <span style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: '600' }}>
              Showing {products.length} product{products.length > 1 ? 's' : ''} available on 1Fi Instant EMI
            </span>
          </div>

          <div style={styles.grid}>
            {products.map((prod) => {
              const lowestEMI = prod.emiPlans[1] || prod.emiPlans[0]; // 6-month recommended plan
              
              return (
                <div
                  key={prod.id}
                  style={styles.card}
                  onClick={() => onSelectProduct(prod)}
                  className="glass-panel"
                >
                  {/* Card Badges */}
                  <div style={styles.cardBadges}>
                    {prod.isZeroInterest && (
                      <span className="badge-tag badge-zero-interest">0% Interest EMI</span>
                    )}
                    {prod.badge && (
                      <span className="badge-tag badge-popular">{prod.badge}</span>
                    )}
                  </div>

                  {/* Image Container */}
                  <div style={styles.imageContainer}>
                    <img src={prod.image} alt={prod.name} style={styles.productImg} />
                  </div>

                  {/* Product Info */}
                  <div style={styles.cardBody}>
                    <div style={styles.brandRatingRow}>
                      <span style={styles.brandName}>{prod.brand}</span>
                      <div style={styles.ratingBadge}>
                        <Star size={12} fill="#F59E0B" color="#F59E0B" />
                        <span>{prod.rating}</span>
                        <span style={{ color: '#6B7280' }}>({prod.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 style={styles.productTitle}>{prod.name}</h3>
                    <p style={styles.productTagline}>{prod.tagline}</p>

                    {/* Pricing Breakdown */}
                    <div style={styles.priceContainer}>
                      <div style={styles.priceRow}>
                        <span style={styles.basePrice}>₹{prod.basePrice.toLocaleString('en-IN')}</span>
                        {prod.originalPrice && (
                          <span style={styles.originalPrice}>₹{prod.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                        {prod.discountPercent > 0 && (
                          <span style={styles.discountBadge}>{prod.discountPercent}% OFF</span>
                        )}
                      </div>
                    </div>

                    {/* 1Fi EMI Highlight Banner */}
                    <div style={styles.emiHighlightBox}>
                      <div>
                        <span style={styles.emiLabel}>EMIs starting from</span>
                        <div style={styles.emiAmount}>
                          ₹{lowestEMI.monthlyEMI.toLocaleString('en-IN')}
                          <span style={{ fontSize: '12px', fontWeight: '500', color: '#9CA3AF' }}>/mo</span>
                        </div>
                      </div>
                      <span style={styles.emiTenureBadge}>{lowestEMI.tenureMonths} Months</span>
                    </div>

                    {/* Select CTA */}
                    <button style={styles.cardCtaBtn}>
                      <span>Select EMI Plan</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '0 0 60px',
  },
  promoBanner: {
    background: 'linear-gradient(135deg, #111827 0%, #1a2333 50%, #0f2420 100%)',
    borderRadius: '24px',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    padding: '32px 36px',
    marginBottom: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  promoContent: {
    maxWidth: '620px',
    zIndex: 2,
  },
  promoBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(16, 185, 129, 0.15)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    color: '#34D399',
    fontSize: '12px',
    fontWeight: '700',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '14px',
    textTransform: 'uppercase',
  },
  promoTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: '1.25',
    marginBottom: '12px',
  },
  highlightText: {
    color: '#10B981',
  },
  promoSubtitle: {
    fontSize: '14px',
    color: '#9CA3AF',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  promoPerks: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '18px',
  },
  perkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#E5E7EB',
  },
  bannerGraphic: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(0,0,0,0) 70%)',
    border: '2px dashed rgba(16, 185, 129, 0.3)',
  },
  graphicBadge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  controlsRow: {
    display: 'flex',
    gap: '14px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    flex: 1,
    minWidth: '280px',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  searchInput: {
    width: '100%',
    background: 'rgba(17, 24, 39, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '14px',
    padding: '12px 16px 12px 46px',
    color: '#F9FAFB',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  errorSimBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '14px',
    border: '1px solid',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  categoriesRow: {
    display: 'flex',
    gap: '10px',
    overflowX: 'auto',
    paddingBottom: '10px',
    marginBottom: '24px',
  },
  categoryChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    borderRadius: '20px',
    border: '1px solid',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
  },
  resultsCountHeader: {
    marginBottom: '16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  skeletonCard: {
    background: '#111827',
    borderRadius: '20px',
    padding: '20px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  card: {
    borderRadius: '20px',
    padding: '18px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  cardBadges: {
    position: 'absolute',
    top: '14px',
    left: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    zIndex: 2,
  },
  imageContainer: {
    height: '180px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '14px',
    background: '#0b0f19',
    borderRadius: '14px',
    overflow: 'hidden',
  },
  productImg: {
    maxHeight: '160px',
    maxWidth: '100%',
    objectFit: 'contain',
    transition: 'transform 0.3s ease',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  brandRatingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  brandName: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#10B981',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  ratingBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#F9FAFB',
  },
  productTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#F9FAFB',
    lineHeight: '1.3',
    marginBottom: '4px',
  },
  productTagline: {
    fontSize: '12px',
    color: '#9CA3AF',
    lineHeight: '1.4',
    marginBottom: '14px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  priceContainer: {
    marginBottom: '12px',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  basePrice: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#FFFFFF',
  },
  originalPrice: {
    fontSize: '13px',
    color: '#6B7280',
    textDecoration: 'line-through',
  },
  discountBadge: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#EF4444',
    background: 'rgba(239, 68, 68, 0.1)',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  emiHighlightBox: {
    background: 'rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '12px',
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '14px',
  },
  emiLabel: {
    fontSize: '11px',
    color: '#9CA3AF',
    display: 'block',
  },
  emiAmount: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#10B981',
  },
  emiTenureBadge: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#34D399',
    background: 'rgba(16, 185, 129, 0.15)',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  cardCtaBtn: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.06)',
    color: '#FFFFFF',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '10px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'rgba(239, 68, 68, 0.05)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '20px',
    marginBottom: '30px',
  },
  emptyResults: {
    textAlign: 'center',
    padding: '60px 20px',
    background: '#111827',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
};
