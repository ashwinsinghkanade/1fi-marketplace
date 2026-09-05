import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Zap,
  CreditCard,
  Calendar,
  Lock,
  ArrowRight,
  Sparkles,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { submitEMIPlanOrder } from '../services/api';

export const CheckoutModal = ({ orderDetails, onClose, onSuccess }) => {
  const [submitting, setSubmitting] = useState(true);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { product, selectedColor, selectedStorage, calculatedPrice, selectedEMI } = orderDetails;

  useEffect(() => {
    let isMounted = true;
    
    const executeLoanSubmission = async () => {
      try {
        setSubmitting(true);
        setErrorMsg(null);
        
        const payload = {
          productId: product.id,
          productName: product.name,
          variantColor: selectedColor?.name,
          variantStorage: selectedStorage?.name,
          totalPrice: calculatedPrice,
          selectedEMI: selectedEMI
        };
        
        const res = await submitEMIPlanOrder(payload);
        if (isMounted) {
          setResult(res);
          setSubmitting(false);
        }
      } catch (err) {
        if (isMounted) {
          setErrorMsg(err.message || 'Credit sanction process encountered an issue.');
          setSubmitting(false);
        }
      }
    };

    executeLoanSubmission();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div style={styles.overlay} className="animate-fade-in">
      <div style={styles.modal} className="glass-panel">
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="#10B981" />
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>
              1Fi Instant EMI Credit Mandate
            </h2>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={18} color="#9CA3AF" />
          </button>
        </div>

        <div style={styles.body}>
          {/* Submitting Animation State */}
          {submitting && (
            <div style={styles.loadingBox}>
              <Loader2 size={48} color="#10B981" style={{ animation: 'spin 1s linear infinite' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', marginTop: '16px' }}>
                Verifying 1Fi Pre-approved Limit...
              </h3>
              <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '6px' }}>
                Performing instant zero-documentation credit check for ₹{calculatedPrice.toLocaleString('en-IN')}
              </p>
              
              <div style={styles.checkingSteps}>
                <div style={styles.checkStepItem}>
                  <CheckCircle2 size={14} color="#10B981" />
                  <span>1Fi Platinum Credit Bureau Verification</span>
                </div>
                <div style={styles.checkStepItem}>
                  <CheckCircle2 size={14} color="#10B981" />
                  <span>Zero-cost EMI sanction & Merchant tie-up</span>
                </div>
                <div style={styles.checkStepItem}>
                  <CheckCircle2 size={14} color="#10B981" />
                  <span>Setting up monthly e-NACH Auto Debit</span>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {!submitting && errorMsg && (
            <div style={styles.errorBox}>
              <AlertCircle size={44} color="#EF4444" />
              <h3 style={{ color: '#FFFFFF', fontSize: '18px', margin: '12px 0 6px' }}>Credit Processing Error</h3>
              <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '20px' }}>{errorMsg}</p>
              <button onClick={onClose} className="btn-secondary">
                Return to Product
              </button>
            </div>
          )}

          {/* Approved Success State */}
          {!submitting && result && (
            <div>
              <div style={styles.successHeader}>
                <div style={styles.successIconCircle}>
                  <CheckCircle2 size={36} color="#10B981" />
                </div>
                <h3 style={styles.successTitle}>1Fi Instant Credit Approved!</h3>
                <p style={styles.successSub}>
                  Application ID: <strong style={{ color: '#10B981' }}>{result.applicationId}</strong>
                </p>
              </div>

              {/* Summary Card */}
              <div style={styles.summaryCard}>
                <div style={styles.productRow}>
                  <img src={product.image} alt={product.name} style={styles.prodThumb} />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF' }}>{product.name}</h4>
                    <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
                      {selectedColor?.name} • {selectedStorage?.name}
                    </p>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#10B981', marginTop: '4px' }}>
                      Total: ₹{calculatedPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div style={styles.divider}></div>

                {/* Plan Terms */}
                <div style={styles.termsGrid}>
                  <div style={styles.termItem}>
                    <span style={styles.termLabel}>Monthly EMI:</span>
                    <span style={styles.termVal}>₹{selectedEMI.monthlyEMI.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div style={styles.termItem}>
                    <span style={styles.termLabel}>Tenure:</span>
                    <span style={styles.termVal}>{selectedEMI.tenureMonths} Months</span>
                  </div>
                  <div style={styles.termItem}>
                    <span style={styles.termLabel}>Interest Type:</span>
                    <span style={styles.termVal}>{selectedEMI.isZeroInterest ? '0% Zero Interest' : 'Standard'}</span>
                  </div>
                  <div style={styles.termItem}>
                    <span style={styles.termLabel}>First EMI Due:</span>
                    <span style={styles.termVal}>{result.firstEMIDate}</span>
                  </div>
                </div>

                <div style={styles.autoDebitInfoBox}>
                  <ShieldCheck size={16} color="#10B981" style={{ flexShrink: 0 }} />
                  <span>
                    Auto-debit mandate active on registered bank account. Monthly debits will happen on 5th of every month.
                  </span>
                </div>
              </div>

              {/* Final CTA */}
              <button
                onClick={() => {
                  onSuccess();
                  onClose();
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', marginTop: '20px' }}
              >
                <span>Back to 1Fi Shop</span>
              </button>
            </div>
          )}
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
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1100,
    padding: '20px',
  },
  modal: {
    width: '100%',
    maxWidth: '540px',
    borderRadius: '24px',
    background: '#0F172A',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  body: {
    padding: '24px',
  },
  loadingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 10px',
    textAlign: 'center',
  },
  checkingSteps: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '24px',
    textAlign: 'left',
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '14px 18px',
    borderRadius: '12px',
    width: '100%',
  },
  checkStepItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#D1D5DB',
  },
  errorBox: {
    textAlign: 'center',
    padding: '30px 10px',
  },
  successHeader: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  successIconCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'rgba(16, 185, 129, 0.15)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
  },
  successTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#FFFFFF',
  },
  successSub: {
    fontSize: '13px',
    color: '#9CA3AF',
    marginTop: '4px',
  },
  summaryCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  productRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  prodThumb: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
    background: '#090D16',
    borderRadius: '8px',
    padding: '4px',
  },
  divider: {
    height: '1px',
    background: 'rgba(255, 255, 255, 0.08)',
    margin: '14px 0',
  },
  termsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginBottom: '14px',
  },
  termItem: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
  },
  termLabel: {
    color: '#9CA3AF',
  },
  termVal: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: '13px',
    marginTop: '2px',
  },
  autoDebitInfoBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    background: 'rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    padding: '10px 12px',
    borderRadius: '10px',
    fontSize: '11px',
    color: '#34D399',
    lineHeight: '1.4',
  },
};
