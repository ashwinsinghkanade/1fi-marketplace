// Mock database for 1Fi Marketplace

export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'Grid' },
  { id: 'smartphones', name: 'Smartphones', icon: 'Smartphone' },
  { id: 'laptops', name: 'Laptops & Mac', icon: 'Laptop' },
  { id: 'audio', name: 'Audio & Wearables', icon: 'Headphones' },
  { id: 'tablets', name: 'Tablets & iPads', icon: 'Tablet' },
  { id: 'gaming', name: 'Gaming Consoles', icon: 'Gamepad2' },
];

export const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Apple iPhone 15 Pro',
    category: 'smartphones',
    tagline: 'Titanium design with A17 Pro Chip & Action Button',
    brand: 'Apple',
    rating: 4.8,
    reviewsCount: 1420,
    basePrice: 134900,
    originalPrice: 144900,
    discountPercent: 7,
    isZeroInterest: true,
    isPopular: true,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop'
    ],
    variants: {
      colors: [
        { id: 'nat-tit', name: 'Natural Titanium', hex: '#BEB8AC' },
        { id: 'blu-tit', name: 'Blue Titanium', hex: '#2F3C4B' },
        { id: 'blk-tit', name: 'Black Titanium', hex: '#212122' },
        { id: 'wht-tit', name: 'White Titanium', hex: '#F2F1EC' }
      ],
      storage: [
        { id: '128gb', name: '128 GB', priceMultiplier: 1.0 },
        { id: '256gb', name: '256 GB', priceMultiplier: 1.08 },
        { id: '512gb', name: '512 GB', priceMultiplier: 1.25 }
      ]
    },
    features: [
      '6.1-inch Super Retina XDR display with ProMotion',
      'A17 Pro chip with 6-core GPU',
      '48MP Main camera with 3x Telephoto',
      'USB-C connector with USB 3 support',
      'All-day battery life up to 23 hours video playback'
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyEMI: 44967, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 6, monthlyEMI: 22483, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: true, isZeroInterest: true },
      { tenureMonths: 9, monthlyEMI: 14988, interestRate: 0, processingFee: 199, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 12, monthlyEMI: 11241, interestRate: 0, processingFee: 299, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 18, monthlyEMI: 8140, interestRate: 11.5, processingFee: 499, downPayment: 0, isRecommended: false, isZeroInterest: false },
      { tenureMonths: 24, monthlyEMI: 6310, interestRate: 12.0, processingFee: 699, downPayment: 0, isRecommended: false, isZeroInterest: false }
    ]
  },
  {
    id: 'prod-2',
    name: 'Samsung Galaxy S24 Ultra 5G',
    category: 'smartphones',
    tagline: 'Galaxy AI is here with S-Pen & 200MP Camera',
    brand: 'Samsung',
    rating: 4.7,
    reviewsCount: 980,
    basePrice: 129999,
    originalPrice: 139999,
    discountPercent: 7,
    isZeroInterest: true,
    isPopular: true,
    badge: 'AI Powered',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop'
    ],
    variants: {
      colors: [
        { id: 'titanium-gray', name: 'Titanium Gray', hex: '#636569' },
        { id: 'titanium-black', name: 'Titanium Black', hex: '#1C1D1F' },
        { id: 'titanium-violet', name: 'Titanium Violet', hex: '#4B3F72' }
      ],
      storage: [
        { id: '256gb', name: '256 GB', priceMultiplier: 1.0 },
        { id: '512gb', name: '512 GB', priceMultiplier: 1.15 },
        { id: '1tb', name: '1 TB', priceMultiplier: 1.38 }
      ]
    },
    features: [
      'Live Translate & Circle to Search with Google',
      '200MP Main Camera with Quad Telephoto System',
      'Snapdragon 8 Gen 3 for Galaxy',
      'Built-in S Pen for effortless notes & drawing',
      'Titanium Frame with Gorilla Armor screen'
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyEMI: 43333, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 6, monthlyEMI: 21666, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: true, isZeroInterest: true },
      { tenureMonths: 9, monthlyEMI: 14444, interestRate: 0, processingFee: 199, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 12, monthlyEMI: 10833, interestRate: 0, processingFee: 299, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 18, monthlyEMI: 7840, interestRate: 11.5, processingFee: 499, downPayment: 0, isRecommended: false, isZeroInterest: false },
      { tenureMonths: 24, monthlyEMI: 6080, interestRate: 12.0, processingFee: 699, downPayment: 0, isRecommended: false, isZeroInterest: false }
    ]
  },
  {
    id: 'prod-3',
    name: 'Apple MacBook Air M3 (2024)',
    category: 'laptops',
    tagline: 'Lean. Mean. M3 machine with 18-hr battery',
    brand: 'Apple',
    rating: 4.9,
    reviewsCount: 640,
    basePrice: 114900,
    originalPrice: 124900,
    discountPercent: 8,
    isZeroInterest: true,
    isPopular: true,
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop'
    ],
    variants: {
      colors: [
        { id: 'midnight', name: 'Midnight', hex: '#1C2630' },
        { id: 'starlight', name: 'Starlight', hex: '#E2D8C9' },
        { id: 'space-gray', name: 'Space Gray', hex: '#636569' },
        { id: 'silver', name: 'Silver', hex: '#E3E4E5' }
      ],
      storage: [
        { id: '256gb', name: '8GB / 256GB SSD', priceMultiplier: 1.0 },
        { id: '512gb', name: '16GB / 512GB SSD', priceMultiplier: 1.20 }
      ]
    },
    features: [
      'Apple M3 chip with 8-core CPU and 10-core GPU',
      '13.6-inch Liquid Retina display with 500 nits brightness',
      'Fanless quiet design with up to 18 hours battery life',
      '1080p FaceTime HD camera & 3-mic array',
      'MagSafe 3 charging port & two Thunderbolt ports'
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyEMI: 38300, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 6, monthlyEMI: 19150, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: true, isZeroInterest: true },
      { tenureMonths: 12, monthlyEMI: 9575, interestRate: 0, processingFee: 299, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 18, monthlyEMI: 6930, interestRate: 11.5, processingFee: 499, downPayment: 0, isRecommended: false, isZeroInterest: false },
      { tenureMonths: 24, monthlyEMI: 5375, interestRate: 12.0, processingFee: 699, downPayment: 0, isRecommended: false, isZeroInterest: false }
    ]
  },
  {
    id: 'prod-4',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'audio',
    tagline: 'Industry-leading noise canceling with Auto NC Optimizer',
    brand: 'Sony',
    rating: 4.8,
    reviewsCount: 2150,
    basePrice: 26990,
    originalPrice: 34990,
    discountPercent: 23,
    isZeroInterest: true,
    isPopular: false,
    badge: 'Deal of the Day',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop'
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Black', hex: '#111111' },
        { id: 'silver', name: 'Silver Platinum', hex: '#D7D6D2' },
        { id: 'blue', name: 'Smoky Blue', hex: '#314255' }
      ],
      storage: [
        { id: 'std', name: 'Standard Edition', priceMultiplier: 1.0 }
      ]
    },
    features: [
      '8 microphones and Auto NC Optimizer for precision noise cancellation',
      'Up to 30-hour battery life with quick charging (3 min = 3 hours)',
      'Magnificent sound engineered with HD Noise Canceling Processor QN1',
      'Speak-to-Chat technology automatically pauses music during conversation',
      'Multipoint connection lets you pair two Bluetooth devices simultaneously'
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyEMI: 8996, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: true, isZeroInterest: true },
      { tenureMonths: 6, monthlyEMI: 4498, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 9, monthlyEMI: 2999, interestRate: 0, processingFee: 99, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 12, monthlyEMI: 2249, interestRate: 0, processingFee: 149, downPayment: 0, isRecommended: false, isZeroInterest: true }
    ]
  },
  {
    id: 'prod-5',
    name: 'Apple iPad Air 11-inch (M2)',
    category: 'tablets',
    tagline: 'Fresh air with M2 chip & Liquid Retina display',
    brand: 'Apple',
    rating: 4.7,
    reviewsCount: 430,
    basePrice: 59900,
    originalPrice: 64900,
    discountPercent: 8,
    isZeroInterest: true,
    isPopular: false,
    badge: 'New Launch',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop'
    ],
    variants: {
      colors: [
        { id: 'space-gray', name: 'Space Gray', hex: '#636569' },
        { id: 'blue', name: 'Blue', hex: '#879EB5' },
        { id: 'purple', name: 'Purple', hex: '#9E9BB3' },
        { id: 'starlight', name: 'Starlight', hex: '#E2D8C9' }
      ],
      storage: [
        { id: '128gb', name: '128 GB (Wi-Fi)', priceMultiplier: 1.0 },
        { id: '256gb', name: '256 GB (Wi-Fi)', priceMultiplier: 1.16 }
      ]
    },
    features: [
      'Supercharged by Apple M2 chip',
      '11-inch Liquid Retina display with P3 wide color and True Tone',
      'Landscape 12MP Ultra Wide front camera with Center Stage',
      'Works with Apple Pencil Pro and Magic Keyboard',
      'Fast Wi-Fi 6E connectivity'
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyEMI: 19967, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 6, monthlyEMI: 9983, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: true, isZeroInterest: true },
      { tenureMonths: 9, monthlyEMI: 6655, interestRate: 0, processingFee: 149, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 12, monthlyEMI: 4991, interestRate: 0, processingFee: 199, downPayment: 0, isRecommended: false, isZeroInterest: true }
    ]
  },
  {
    id: 'prod-6',
    name: 'Sony PlayStation 5 Slim Console',
    category: 'gaming',
    tagline: 'Play Has No Limits with Ultra-High Speed SSD',
    brand: 'Sony',
    rating: 4.9,
    reviewsCount: 1890,
    basePrice: 54990,
    originalPrice: 59990,
    discountPercent: 8,
    isZeroInterest: true,
    isPopular: true,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop'
    ],
    variants: {
      colors: [
        { id: 'white', name: 'White Slim Edition', hex: '#FFFFFF' }
      ],
      storage: [
        { id: '1tb-disc', name: '1TB Disc Edition', priceMultiplier: 1.0 },
        { id: '1tb-digital', name: '1TB Digital Edition', priceMultiplier: 0.88 }
      ]
    },
    features: [
      '1TB Ultra-High Speed Custom SSD for near instant load times',
      'Ray Tracing technology for realistic reflections and lighting',
      '4K-TV Gaming at up to 120fps with 120Hz output',
      'DualSense Wireless Controller with Haptic Feedback & Adaptive Triggers',
      'Tempest 3D AudioTech for immersive soundscapes'
    ],
    emiPlans: [
      { tenureMonths: 3, monthlyEMI: 18330, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 6, monthlyEMI: 9165, interestRate: 0, processingFee: 0, downPayment: 0, isRecommended: true, isZeroInterest: true },
      { tenureMonths: 9, monthlyEMI: 6110, interestRate: 0, processingFee: 149, downPayment: 0, isRecommended: false, isZeroInterest: true },
      { tenureMonths: 12, monthlyEMI: 4582, interestRate: 0, processingFee: 199, downPayment: 0, isRecommended: false, isZeroInterest: true }
    ]
  }
];

export const USER_CREDIT_INFO = {
  name: 'Ashwin Kanade',
  availableCredit: 150000,
  totalCreditLimit: 200000,
  tier: '1Fi Platinum Member',
  preApproved: true,
  activeEMICount: 1,
  nextDueDate: '15th Sept 2026'
};
