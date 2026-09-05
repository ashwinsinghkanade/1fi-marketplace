import React, { useState, useEffect } from 'react';
import {
  Store,
  Tag,
  Grid,
  CreditCard,
  User,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Search,
  Bell
} from 'lucide-react';
import { fetchProducts, fetchUserCreditInfo } from './services/api';
import { MarketplaceView } from './components/MarketplaceView';
import { EmptyStateView } from './components/EmptyStateView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  // Navigation Tabs: 'top-brands', 'nearby-stores', 'marketplace'
  const [activeTab, setActiveTab] = useState('marketplace');

  // Products & API Data State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isErrorSimulated, setIsErrorSimulated] = useState(false);

  // Modals & Selection State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutPayload, setCheckoutPayload] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // User Credit Info
  const [userInfo, setUserInfo] = useState(null);

  // Load User & Products Data
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(selectedCategory, searchQuery, isErrorSimulated);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Error loading marketplace data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCreditInfo().then(setUserInfo);
  }, []);

  useEffect(() => {
    if (activeTab === 'marketplace') {
      loadProducts();
    }
  }, [selectedCategory, searchQuery, activeTab, isErrorSimulated]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div style={styles.appContainer}>
      {/* 1. Top Global Navigation Bar */}
      <header style={styles.globalHeader} className="glass-panel">
        <div style={styles.headerContent}>
          {/* Brand Logo */}
          <div style={styles.logoGroup}>
            <div style={styles.logoBadge}>
              <span style={{ fontSize: '20px', fontWeight: '900', color: '#10B981' }}>1Fi</span>
            </div>
            <div style={styles.logoTextGroup}>
              <span style={styles.appName}>1Fi Shop & Pay</span>
              <span style={styles.appSub}>Smart Instant EMI Platform</span>
            </div>
          </div>

          {/* User Credit Limit Badge */}
          {userInfo && (
            <div style={styles.creditCardBadge}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={14} fill="#10B981" color="#10B981" />
                <span style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: '700' }}>
                  1Fi Approved Credit Limit
                </span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>
                ₹{userInfo.availableCredit.toLocaleString('en-IN')}{' '}
                <span style={{ fontSize: '11px', color: '#34D399', fontWeight: '600' }}>Available</span>
              </div>
            </div>
          )}

          {/* User Actions */}
          <div style={styles.userActions}>
            <button style={styles.iconBtn} title="Notifications">
              <Bell size={18} color="#9CA3AF" />
            </button>
            <div style={styles.profileChip}>
              <div style={styles.avatar}>
                <User size={16} color="#10B981" />
              </div>
              <div style={styles.profileText}>
                <span style={styles.userName}>{userInfo?.name || 'Ashwin'}</span>
                <span style={styles.userTier}>{userInfo?.tier || 'Platinum Member'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Shop Page Main Container */}
      <main style={styles.mainContent}>
        {/* Shop Page Navigation Header with required 3 options */}
        <div style={styles.shopNavHeader}>
          <div>
            <h1 style={styles.pageTitle}>Shop</h1>
            <p style={styles.pageSubtitle}>
              Choose from top brands, nearby retail stores, or shop directly on 1Fi Marketplace with instant 0% EMI
            </p>
          </div>

          {/* 3 Main Tabs: Top Brands, Nearby Stores, 1Fi Marketplace */}
          <div style={styles.tabsRow}>
            {/* Tab A: Top Brands */}
            <button
              onClick={() => setActiveTab('top-brands')}
              style={{
                ...styles.tabBtn,
                background: activeTab === 'top-brands' ? '#10B981' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'top-brands' ? '#FFFFFF' : '#9CA3AF',
                borderColor: activeTab === 'top-brands' ? '#10B981' : 'rgba(255, 255, 255, 0.08)',
                boxShadow: activeTab === 'top-brands' ? '0 4px 16px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              <Tag size={16} />
              <span>Top Brands</span>
            </button>

            {/* Tab B: Nearby Stores */}
            <button
              onClick={() => setActiveTab('nearby-stores')}
              style={{
                ...styles.tabBtn,
                background: activeTab === 'nearby-stores' ? '#10B981' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'nearby-stores' ? '#FFFFFF' : '#9CA3AF',
                borderColor: activeTab === 'nearby-stores' ? '#10B981' : 'rgba(255, 255, 255, 0.08)',
                boxShadow: activeTab === 'nearby-stores' ? '0 4px 16px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              <Store size={16} />
              <span>Nearby Stores</span>
            </button>

            {/* Tab C: 1Fi Marketplace (Featured Active Section) */}
            <button
              onClick={() => setActiveTab('marketplace')}
              style={{
                ...styles.tabBtn,
                background: activeTab === 'marketplace' ? '#10B981' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === 'marketplace' ? '#FFFFFF' : '#9CA3AF',
                borderColor: activeTab === 'marketplace' ? '#10B981' : 'rgba(255, 255, 255, 0.08)',
                boxShadow: activeTab === 'marketplace' ? '0 4px 16px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              <Sparkles size={16} fill={activeTab === 'marketplace' ? '#FFFFFF' : 'none'} />
              <span>1Fi Marketplace</span>
              <span style={styles.activePillBadge}>Active</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'top-brands' && (
          <EmptyStateView
            type="top-brands"
            onSwitchToMarketplace={() => setActiveTab('marketplace')}
          />
        )}

        {activeTab === 'nearby-stores' && (
          <EmptyStateView
            type="nearby-stores"
            onSwitchToMarketplace={() => setActiveTab('marketplace')}
          />
        )}

        {activeTab === 'marketplace' && (
          <MarketplaceView
            products={products}
            loading={loading}
            error={error}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectProduct={setSelectedProduct}
            onRetry={loadProducts}
            onToggleErrorSim={() => setIsErrorSimulated(!isErrorSimulated)}
            isErrorSimulated={isErrorSimulated}
          />
        )}
      </main>

      {/* Product Detail & EMI Selector Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onProceedToCheckout={(payload) => {
            setSelectedProduct(null);
            setCheckoutPayload(payload);
          }}
        />
      )}

      {/* Instant Credit Order Sanction Checkout Modal */}
      {checkoutPayload && (
        <CheckoutModal
          orderDetails={checkoutPayload}
          onClose={() => setCheckoutPayload(null)}
          onSuccess={() => {
            showToast('🎉 Instant 1Fi EMI credit approved and order confirmed!');
          }}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div style={styles.toast} className="animate-fade-in">
          <CheckCircle2 size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: '100vh',
    background: '#090D16',
    color: '#F9FAFB',
  },
  globalHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: '14px 32px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoBadge: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    background: 'rgba(16, 185, 129, 0.15)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTextGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  appName: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#FFFFFF',
  },
  appSub: {
    fontSize: '11px',
    color: '#9CA3AF',
  },
  creditCardBadge: {
    background: 'rgba(17, 24, 39, 0.9)',
    border: '1px solid rgba(16, 185, 129, 0.25)',
    borderRadius: '14px',
    padding: '8px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  iconBtn: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: 'none',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  profileChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '6px 14px 6px 6px',
    borderRadius: '30px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(16, 185, 129, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userTier: {
    fontSize: '10px',
    color: '#34D399',
  },
  mainContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 32px 60px',
  },
  shopNavHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '24px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: '4px',
  },
  pageSubtitle: {
    fontSize: '14px',
    color: '#9CA3AF',
    maxWidth: '540px',
  },
  tabsRow: {
    display: 'flex',
    gap: '10px',
    background: 'rgba(17, 24, 39, 0.7)',
    padding: '6px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  tabBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    borderRadius: '12px',
    border: '1px solid',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activePillBadge: {
    fontSize: '10px',
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '2px 6px',
    borderRadius: '4px',
    marginLeft: '4px',
  },
  toast: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    background: '#111827',
    border: '1px solid #10B981',
    borderRadius: '14px',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    zIndex: 2000,
    fontSize: '14px',
    fontWeight: '600',
    color: '#FFFFFF',
  },
};
