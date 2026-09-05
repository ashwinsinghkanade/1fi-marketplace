import { MOCK_PRODUCTS, CATEGORIES, USER_CREDIT_INFO } from '../data/mockData';

// Simulated latency helper
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchProducts = async (category = 'all', searchQuery = '', shouldFail = false) => {
  await delay(500);
  
  if (shouldFail) {
    throw new Error('Failed to fetch marketplace products. Please check your network connection.');
  }
  
  let filtered = [...MOCK_PRODUCTS];
  
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }
  
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
    );
  }
  
  return filtered;
};

export const fetchProductById = async (id, shouldFail = false) => {
  await delay(350);
  
  if (shouldFail) {
    throw new Error('Product not found or unavailable at this moment.');
  }
  
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  if (!product) {
    throw new Error('Product details could not be loaded.');
  }
  
  return product;
};

export const fetchUserCreditInfo = async () => {
  await delay(200);
  return USER_CREDIT_INFO;
};

export const submitEMIPlanOrder = async (orderPayload) => {
  await delay(1200); // Simulate loan application & credit check latency
  
  // Basic validation check
  if (!orderPayload || !orderPayload.productId || !orderPayload.selectedEMI) {
    throw new Error('Invalid EMI application request. Please select a valid plan.');
  }
  
  return {
    success: true,
    applicationId: `1FI-EMI-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'PRE_APPROVED_AND_ACTIVATED',
    approvedAmount: orderPayload.totalPrice,
    monthlyEMI: orderPayload.selectedEMI.monthlyEMI,
    tenureMonths: orderPayload.selectedEMI.tenureMonths,
    firstEMIDate: '05 Oct 2026',
    autoDebitStatus: 'MANDATE_ENABLED',
    message: 'Congratulations! Your 1Fi Instant EMI credit has been sanctioned.'
  };
};
