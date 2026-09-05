# 1Fi Marketplace — SDE Intern Assignment

An extension of the **1Fi App Shop Page** implementing the **1Fi Marketplace** feature section built with React, Vite, Lucide Icons, and modern Fintech UI/UX design tokens.

---

## 🚀 Features Implemented

### 1. Shop Page Navigation & 3 Required Tabs
- **Top Brands**: Clean empty state view with placeholder guidance (*No implementation required per brief*).
- **Nearby Stores**: Clean empty state view with placeholder guidance (*No implementation required per brief*).
- **1Fi Marketplace**: **Fully functional, feature-complete Marketplace experience**.

### 2. Marketplace & Product Catalog
- **Promo Hero Banner**: Highlights 1Fi's *"Zero Downpayment"*, *"0% Interest EMI"*, and *"Instant Credit Sanction"*.
- **Category Chips**: Filter items across Smartphones, Laptops, Audio & Wearables, Tablets, and Gaming.
- **Dynamic Search Bar**: Real-time filtering by product name, brand, or specifications.
- **Product Cards**: Display high-res product photos, badges (*0% Interest EMI*, *Best Seller*), original vs discounted price, and starting monthly EMI labels.

### 3. Real-Time Variant Switcher & EMI Calculator Matrix
- **Multi-Angle Gallery**: Interactive thumbnail viewer.
- **Color & Storage Variants**: Selecting storage/edition dynamically updates the base product pricing and recalculates EMI amounts.
- **Interactive EMI Plan Matrix**: 3, 6, 9, 12, 18, and 24-month tenure choices with a **"0% Interest Only"** filter toggle.
- **Plan Breakdown Box**: Displays monthly EMI, down payment (`₹0`), processing fee, total payable amount, and interest rate.

### 4. Instant Credit Approval & Checkout Flow
- **Credit Check Simulation**: Visual loading state verifying 1Fi pre-approved credit limits.
- **Order Sanction Confirmation**: Displays Application Reference ID (`1FI-EMI-XXXXXX`), first payment due date, and auto-debit mandate status.

### 5. Engineering & Data Architecture
- **Mock API Service (`src/services/api.js`)**: Asynchronous data loading simulating 400-800ms latency.
- **Error & Loading Handling**: Interactive **"Simulate API Error"** toggle button to test error states & retry logic.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with 1Fi HSL Fintech design tokens

---

## 📦 Local Setup Instructions

```bash
# Navigate to project directory
cd 1fi_marketplace

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Live Demo & Submission
- **Submission Form**: [Google Form Link](https://forms.gle/WZYqNEAJZPXonLk88)
- **Deadline**: 8th September 2026
