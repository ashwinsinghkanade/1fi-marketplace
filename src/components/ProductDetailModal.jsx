import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Star,
  Zap,
  ShieldCheck,
  Percent,
  Calendar,
  CreditCard,
  ArrowRight,
  Info,
  Sparkles
} from 'lucide-react';

export const ProductDetailModal = ({ product, onClose, onProceedToCheckout }) => {
  if (!product) return null;

  // Selected state
  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.variants.storage[0]);
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedEMI, setSelectedEMI] = useState(product.emiPlans.find(p => p.isRecommended) || product.emiPlans[0]);
  const [filterZeroCost, setFilterZeroCost] = useState(false);

  // Dynamic price calculation based on variant storage multiplier
  const calculatedPrice = Math.round(product.basePrice * (selectedStorage?.priceMultiplier || 1.0));

  // Recalculate EMI amounts dynamically based on variant price
  const calculatedEMIPlans = product.emiPlans.map(plan => {
    let monthly = Math.round(calculatedPrice / plan.tenureMonths);
    if (plan.interestRate > 0) {
      // Annual interest calculation
      const monthlyRate = plan.interestRate / 12 / 100;
      monthly = Math.round(
        (calculatedPrice * monthlyRate * Math.pow(1 + monthlyRate, plan.tenureMonths)) /
        (Math.pow(1 + monthlyRate, plan.tenureMonths) - 1)
      );
    }
    return {
      ...plan,
      monthlyEMI: monthly,
      totalPayable: monthly * plan.tenureMonths + plan.processingFee
    };
  });

  // Active plans based on zero-cost filter
  const displayedPlans = filterZeroCost
    ? calculatedEMIPlans.filter(p => p.isZeroInterest)
    : calculatedEMIPlans;

  // Sync selected EMI if plans change
  useEffect(() => {
    if (!displayedPlans.some(p => p.tenureMonths === selectedEMI.tenureMonths)) {
      setSelectedEMI(displayedPlans[0] || calculatedEMIPlans[0]);
    }
  }, [filterZeroCost]);

  return (
    <div style={styles.overlay} className="animate-fade-in">
      <div style={styles.modal} className="glass-panel">
        {/* Header Close */}
        <div style={styles.modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge-tag badge-zero-interest">1Fi Verified Merchant</span>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Category: {product.category}</span>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={20} color="#9CA3AF" />
          </button>
        </div>

        <div style={styles.modalBody}>
          {/* Left Column: Product Media & Gallery */}
          <div style={styles.leftCol}>
            <div style={styles.mainImgBox}>
              <img src={activeImage} alt={product.name} style={styles.mainImg} />
            </div>

            {product.gallery && product.gallery.length > 1 && (
              <div style={styles.galleryRow}>
                {product.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(img)}
                    style={{
                      ...styles.galleryThumb,
                      borderColor: activeImage === img ? '#10B981' : 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <img src={img} alt={`Thumb ${i}`} style={styles.thumbImg} />
                  </div>
                ))}
              </div>
            )}

            {/* Product Key Features */}
            <div style={styles.featuresBox}>
              <h4 style={styles.sectionTitle}>Key Specifications</h4>
              <ul style={styles.featureList}>
                {product.features.map((feat, idx) => (
                  <li key={idx} style={styles.featureItem}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0 }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Product Variants & EMI Selection */}
          <div style={styles.rightCol}>
            {/* Title & Brand */}
            <span style={styles.brandTag}>{product.brand}</span>
            <h1 style={styles.productTitle}>{product.name}</h1>
            <p style={styles.productTagline}>{product.tagline}</p>

            {/* Rating */}
            <div style={styles.ratingRow}>
              <Star size={14} fill="#F59E0B" color="#F59E0B" />
              <span style={{ fontWeight: '700', color: '#F9FAFB' }}>{product.rating}</span>
              <span style={{ color: '#6B7280' }}>({product.reviewsCount} customer reviews)</span>
            </div>

            {/* Price Display */}
            <div style={styles.priceBox}>
              <span style={styles.calculatedPrice}>₹{calculatedPrice.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span style={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              <span style={styles.discountBadge}>Instant 1Fi Approval</span>
            </div>

            {/* Variant 1: Color Selection */}
            {product.variants.colors && (
              <div style={styles.variantSection}>
                <label style={styles.variantLabel}>
                  Color: <strong style={{ color: '#F9FAFB' }}>{selectedColor.name}</strong>
                </label>
                <div style={styles.colorRow}>
                  {product.variants.colors.map((color) => {
                    const isSelected = selectedColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        style={{
                          ...styles.colorCircleBtn,
                          borderColor: isSelected ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
                          boxShadow: isSelected ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none'
                        }}
                        title={color.name}
                      >
                        <span style={{ ...styles.colorDot, background: color.hex }}></span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Variant 2: Storage / RAM Selection */}
            {product.variants.storage && (
              <div style={styles.variantSection}>
                <label style={styles.variantLabel}>
                  Storage / Edition: <strong style={{ color: '#F9FAFB' }}>{selectedStorage.name}</strong>
                </label>
                <div style={styles.storageRow}>
                  {product.variants.storage.map((st) => {
                    const isSelected = selectedStorage.id === st.id;
                    return (
                      <button
                        key={st.id}
                        onClick={() => setSelectedStorage(st)}
                        style={{
                          ...styles.storageBtn,
                          background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                          borderColor: isSelected ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
                          color: isSelected ? '#34D399' : '#9CA3AF'
                        }}
                      >
                        {st.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* EMI Calculator Matrix Section */}
            <div style={styles.emiSection}>
              <div style={styles.emiHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={18} color="#10B981" />
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF' }}>Select 1Fi EMI Plan</h3>
                </div>

                {/* Filter toggle */}
                <button
                  onClick={() => setFilterZeroCost(!filterZeroCost)}
                  style={{
                    ...styles.zeroCostFilterBtn,
                    background: filterZeroCost ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                    borderColor: filterZeroCost ? '#10B981' : 'rgba(255, 255, 255, 0.12)'
                  }}
                >
                  <Percent size={12} color="#10B981" />
                  <span>0% Interest Only</span>
                </button>
              </div>

              {/* EMI Tenure Cards */}
              <div style={styles.emiGrid}>
                {displayedPlans.map((plan) => {
                  const isSelected = selectedEMI.tenureMonths === plan.tenureMonths;
                  return (
                    <div
                      key={plan.tenureMonths}
                      onClick={() => setSelectedEMI(plan)}
                      style={{
                        ...styles.emiCard,
                        background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        borderColor: isSelected ? '#10B981' : 'rgba(255, 255, 255, 0.08)',
                        boxShadow: isSelected ? '0 0 16px rgba(16, 185, 129, 0.25)' : 'none'
                      }}
                    >
                      {plan.isRecommended && (
                        <div style={styles.recommendedBadge}>Recommended</div>
                      )}
                      
                      <span style={styles.tenureTitle}>{plan.tenureMonths} Months</span>
                      <div style={styles.emiPriceText}>
                        ₹{plan.monthlyEMI.toLocaleString('en-IN')}
                        <span style={{ fontSize: '11px', color: '#9CA3AF' }}>/mo</span>
                      </div>
                      
                      <div style={styles.interestTag}>
                        {plan.isZeroInterest ? (
                          <span style={{ color: '#34D399', fontWeight: '700' }}>0% Interest</span>
                        ) : (
                          <span style={{ color: '#9CA3AF' }}>{plan.interestRate}% p.a.</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Plan Breakdown Summary */}
              {selectedEMI && (
                <div style={styles.planSummaryBox}>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Monthly Installment:</span>
                    <strong style={{ color: '#10B981', fontSize: '16px' }}>
                      ₹{selectedEMI.monthlyEMI.toLocaleString('en-IN')} x {selectedEMI.tenureMonths} months
                    </strong>
                  </div>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Down Payment:</span>
                    <strong style={{ color: '#34D399' }}>₹0 (Zero Downpayment)</strong>
                  </div>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Processing Fee:</span>
                    <strong style={{ color: selectedEMI.processingFee === 0 ? '#34D399' : '#E5E7EB' }}>
                      {selectedEMI.processingFee === 0 ? 'FREE (₹0)' : `₹${selectedEMI.processingFee}`}
                    </strong>
                  </div>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Total Payable Amount:</span>
                    <strong style={{ color: '#F9FAFB' }}>
                      ₹{(selectedEMI.monthlyEMI * selectedEMI.tenureMonths + selectedEMI.processingFee).toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {/* Action CTA Button */}
            <button
              onClick={() => onProceedToCheckout({ product, selectedColor, selectedStorage, calculatedPrice, selectedEMI })}
              className="btn-primary"
              style={styles.proceedCtaBtn}
            >
              <span>Proceed with {selectedEMI.tenureMonths}-Month EMI Plan</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.82)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    width: '100%',
    maxWidth: '1020px',
    maxHeight: '90vh',
    overflowY: 'auto',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    background: '#0F172A',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 28px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  closeBtn: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: 'none',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  modalBody: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.3fr',
    gap: '32px',
    padding: '28px',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  mainImgBox: {
    width: '100%',
    height: '320px',
    background: '#090D16',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
  },
  mainImg: {
    maxHeight: '280px',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  galleryRow: {
    display: 'flex',
    gap: '10px',
  },
  galleryThumb: {
    width: '64px',
    height: '64px',
    borderRadius: '12px',
    background: '#090D16',
    border: '2px solid',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbImg: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  featuresBox: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '16px',
    padding: '18px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: '12px',
  },
  featureList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '12px',
    color: '#9CA3AF',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandTag: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#10B981',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  productTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#FFFFFF',
    margin: '2px 0 6px',
  },
  productTagline: {
    fontSize: '13px',
    color: '#9CA3AF',
    marginBottom: '10px',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    marginBottom: '18px',
  },
  priceBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '14px',
    marginBottom: '20px',
  },
  calculatedPrice: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#FFFFFF',
  },
  originalPrice: {
    fontSize: '15px',
    color: '#6B7280',
    textDecoration: 'line-through',
  },
  discountBadge: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#34D399',
    background: 'rgba(16, 185, 129, 0.15)',
    padding: '4px 10px',
    borderRadius: '8px',
    marginLeft: 'auto',
  },
  variantSection: {
    marginBottom: '18px',
  },
  variantLabel: {
    fontSize: '13px',
    color: '#9CA3AF',
    display: 'block',
    marginBottom: '8px',
  },
  colorRow: {
    display: 'flex',
    gap: '10px',
  },
  colorCircleBtn: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'transparent',
    border: '2px solid',
    padding: '2px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorDot: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  storageRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  storageBtn: {
    padding: '8px 16px',
    borderRadius: '10px',
    border: '1px solid',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  emiSection: {
    background: 'rgba(17, 24, 39, 0.8)',
    borderRadius: '18px',
    padding: '18px',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    marginBottom: '20px',
  },
  emiHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '14px',
  },
  zeroCostFilterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px solid',
    color: '#34D399',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  emiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '16px',
  },
  emiCard: {
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  recommendedBadge: {
    position: 'absolute',
    top: '-8px',
    right: '8px',
    background: '#10B981',
    color: '#FFFFFF',
    fontSize: '9px',
    fontWeight: '800',
    padding: '2px 6px',
    borderRadius: '4px',
    textTransform: 'uppercase',
  },
  tenureTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#9CA3AF',
    display: 'block',
  },
  emiPriceText: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#FFFFFF',
    margin: '2px 0',
  },
  interestTag: {
    fontSize: '11px',
  },
  planSummaryBox: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
  },
  summaryLabel: {
    color: '#9CA3AF',
  },
  proceedCtaBtn: {
    width: '100%',
    padding: '14px',
    fontSize: '15px',
  },
};
