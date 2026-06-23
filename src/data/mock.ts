// import { DigitalService, Notification, Operator, RechargePackage, Transaction, User } from '@/types';

// export const operators: Operator[] = [
//   { id: 'gp', name: 'Grameenphone', code: 'GP', color: 'from-sky-500 to-blue-600', logo: 'GP' },
//   { id: 'robi', name: 'Robi', code: 'ROBI', color: 'from-rose-500 to-red-600', logo: 'R' },
//   { id: 'bl', name: 'Banglalink', code: 'BL', color: 'from-orange-400 to-amber-600', logo: 'BL' },
//   { id: 'airtel', name: 'Airtel', code: 'AIR', color: 'from-red-500 to-rose-700', logo: 'A' },
//   { id: 'tt', name: 'Teletalk', code: 'TT', color: 'from-emerald-500 to-teal-600', logo: 'TT' },
// ];

// const mk = (i: number, op: string, cat: RechargePackage['category'], title: string, validity: string, price: number, extra: Partial<RechargePackage> = {}): RechargePackage => ({
//   id: `pkg-${op}-${i}`, operatorId: op, title, validity, category: cat, price, ...extra,
// });

// export const packages: RechargePackage[] = [
//   mk(1, 'gp', 'daily', '1 GB Daily', '1 day', 49, { data: '1 GB' }),
//   mk(2, 'gp', 'daily', '2 GB + 50 Min', '2 days', 89, { data: '2 GB', minutes: '50 min', popular: true }),
//   mk(3, 'gp', 'weekly', '5 GB Weekly', '7 days', 179, { data: '5 GB' }),
//   mk(4, 'gp', 'monthly', '15 GB Monthly', '30 days', 499, { data: '15 GB', popular: true }),
//   mk(5, 'gp', 'unlimited', 'Unlimited Social', '30 days', 799, { data: 'Unlimited Social' }),

//   mk(1, 'robi', 'daily', '1.5 GB Daily', '1 day', 55, { data: '1.5 GB' }),
//   mk(2, 'robi', 'weekly', '4 GB + 100 Min', '7 days', 199, { data: '4 GB', minutes: '100 min', popular: true }),
//   mk(3, 'robi', 'monthly', '20 GB Monthly', '30 days', 549, { data: '20 GB' }),
//   mk(4, 'robi', 'unlimited', 'Unlimited Night', '30 days', 699, { data: 'Unlimited 12am-9am' }),

//   mk(1, 'bl', 'daily', '500 MB Daily', '1 day', 29, { data: '500 MB' }),
//   mk(2, 'bl', 'weekly', '3 GB Weekly', '7 days', 149, { data: '3 GB' }),
//   mk(3, 'bl', 'monthly', '12 GB Monthly', '30 days', 399, { data: '12 GB', popular: true }),

//   mk(1, 'airtel', 'daily', '1 GB + 30 Min', '1 day', 59, { data: '1 GB', minutes: '30 min' }),
//   mk(2, 'airtel', 'weekly', '6 GB Weekly', '7 days', 219, { data: '6 GB', popular: true }),
//   mk(3, 'airtel', 'monthly', '25 GB Monthly', '30 days', 599, { data: '25 GB' }),

//   mk(1, 'tt', 'daily', '1 GB Daily', '1 day', 39, { data: '1 GB' }),
//   mk(2, 'tt', 'monthly', '10 GB Monthly', '30 days', 349, { data: '10 GB', popular: true }),
// ];

// export const digitalServices: DigitalService[] = [
//   { id: 'pubg', name: 'PUBG UC', icon: '🎮', category: 'gaming', startingFrom: 99 },
//   { id: 'ff', name: 'Free Fire Diamonds', icon: '💎', category: 'gaming', startingFrom: 49 },
//   { id: 'topup', name: 'Mobile Topup', icon: '📱', category: 'topup', startingFrom: 10 },
//   { id: 'gift-amazon', name: 'Amazon Gift Card', icon: '🎁', category: 'gift', startingFrom: 500 },
//   { id: 'gift-google', name: 'Google Play Card', icon: '🛍️', category: 'gift', startingFrom: 200 },
//   { id: 'steam', name: 'Steam Wallet', icon: '🕹️', category: 'gaming', startingFrom: 500 },
//   { id: 'netflix', name: 'Netflix Subscription', icon: '🎬', category: 'gift', startingFrom: 350 },
//   { id: 'spotify', name: 'Spotify Premium', icon: '🎵', category: 'gift', startingFrom: 199 },
//   { id: 'wifi', name: 'Broadband Bill', icon: '📶', category: 'internet', startingFrom: 100 },
// ];

// export const transactions: Transaction[] = [
//   { id: 't1001', type: 'recharge', title: 'GP Recharge', meta: '+880 17xx xxxxxx', amount: -200, status: 'success', date: '2026-05-14T10:32:00Z' },
//   { id: 't1002', type: 'wallet-add', title: 'Add Money', meta: 'bKash', amount: 1500, status: 'success', date: '2026-05-13T08:21:00Z' },
//   { id: 't1003', type: 'package', title: '15 GB Monthly • GP', meta: '+880 17xx xxxxxx', amount: -499, status: 'success', date: '2026-05-12T19:02:00Z' },
//   { id: 't1004', type: 'service', title: 'PUBG UC 660', meta: 'Player ID 5xxxxx', amount: -899, status: 'pending', date: '2026-05-11T15:45:00Z' },
//   { id: 't1005', type: 'wallet-send', title: 'Sent to Rakib', meta: '+880 19xx xxxxxx', amount: -300, status: 'success', date: '2026-05-10T11:10:00Z' },
//   { id: 't1006', type: 'recharge', title: 'Robi Recharge', meta: '+880 18xx xxxxxx', amount: -100, status: 'failed', date: '2026-05-09T07:50:00Z' },
//   { id: 't1007', type: 'wallet-withdraw', title: 'Withdraw to Bank', meta: 'DBBL ****4421', amount: -2000, status: 'success', date: '2026-05-08T16:00:00Z' },
//   { id: 't1008', type: 'package', title: '6 GB Weekly • Airtel', amount: -219, status: 'success', date: '2026-05-07T20:14:00Z' },
//   { id: 't1009', type: 'wallet-add', title: 'Add Money', meta: 'Card ****1142', amount: 5000, status: 'success', date: '2026-05-06T09:00:00Z' },
//   { id: 't1010', type: 'service', title: 'Free Fire 100 Diamonds', amount: -79, status: 'success', date: '2026-05-05T14:30:00Z' },
//   { id: 't1011', type: 'recharge', title: 'Banglalink Recharge', amount: -50, status: 'pending', date: '2026-05-04T12:15:00Z' },
//   { id: 't1012', type: 'recharge', title: 'Teletalk Recharge', amount: -150, status: 'success', date: '2026-05-03T18:42:00Z' },
// ];

// export const notifications: Notification[] = [
//   { id: 'n1', title: 'Recharge successful', body: 'GP recharge of ৳200 was successful.', type: 'recharge', date: '2026-05-14T10:33:00Z' },
//   { id: 'n2', title: 'Money added', body: '৳1,500 added to your wallet from bKash.', type: 'wallet', date: '2026-05-13T08:22:00Z' },
//   { id: 'n3', title: 'Weekend offer 🎉', body: 'Get 5% cashback on all monthly packages this weekend.', type: 'promo', date: '2026-05-12T09:00:00Z' },
//   { id: 'n4', title: 'KYC verification pending', body: 'Complete your KYC to unlock higher transfer limits.', type: 'system', date: '2026-05-10T11:00:00Z', read: true },
// ];

// export const currentUser: User = {
//   id: 'u1',
//   name: 'Arman Hossain',
//   email: 'arman@teknurpay.com',
//   phone: '+8801712345678',
//   kyc: 'verified',
//   joined: '2025-01-12',
// };

// export const monthlyRecharge = [
//   { month: 'Jan', amount: 1240 },
//   { month: 'Feb', amount: 1820 },
//   { month: 'Mar', amount: 2140 },
//   { month: 'Apr', amount: 1890 },
//   { month: 'May', amount: 2680 },
//   { month: 'Jun', amount: 3120 },
// ];

// export const weeklyActivity = [
//   { day: 'Mon', value: 320 }, { day: 'Tue', value: 480 }, { day: 'Wed', value: 290 },
//   { day: 'Thu', value: 610 }, { day: 'Fri', value: 720 }, { day: 'Sat', value: 540 }, { day: 'Sun', value: 410 },
// ];

import { DigitalService, Notification, Operator, RechargePackage, Transaction, User } from '@/types';

export const operators: Operator[] = [
  // Afghanistan Operators
  { id: 'af-awcc', name: 'Afghan Wireless', code: 'AWCC', color: 'from-red-600 to-green-700', logo: 'AWCC' },
  { id: 'af-ros', name: 'Roshan', code: 'ROSHAN', color: 'from-blue-500 to-purple-600', logo: 'R' },
  { id: 'af-mtn', name: 'MTN Afghanistan', code: 'MTN-AF', color: 'from-yellow-500 to-orange-600', logo: 'MTN' },
  { id: 'af-salaam', name: 'Salaam', code: 'SALAAM', color: 'from-green-500 to-emerald-600', logo: 'S' },
  
  // Iran Operators
  { id: 'ir-mci', name: 'Hamrahe Aval', code: 'MCI', color: 'from-teal-500 to-cyan-600', logo: 'MCI' },
  { id: 'ir-irancell', name: 'Irancell', code: 'IRANCELL', color: 'from-purple-500 to-pink-600', logo: 'IC' },
  { id: 'ir-rightel', name: 'Rightel', code: 'RIGHTEL', color: 'from-blue-600 to-indigo-700', logo: 'RTL' },
  { id: 'ir-taliya', name: 'Taliya', code: 'TALIYA', color: 'from-orange-500 to-red-600', logo: 'T' },
  
  // Turkey Operators
  { id: 'tr-turkcell', name: 'Turkcell', code: 'TURKCELL', color: 'from-red-600 to-rose-700', logo: 'TC' },
  { id: 'tr-vodafone', name: 'Vodafone Turkey', code: 'VODAFONE', color: 'from-red-500 to-pink-600', logo: 'V' },
  { id: 'tr-turktelekom', name: 'Turk Telekom', code: 'TT', color: 'from-blue-500 to-cyan-600', logo: 'TT' },
];

const mk = (i: number, op: string, cat: RechargePackage['category'], title: string, validity: string, price: number, extra: Partial<RechargePackage> = {}): RechargePackage => ({
  id: `pkg-${op}-${i}`, operatorId: op, title, validity, category: cat, price, ...extra,
});

export const packages: RechargePackage[] = [
  // Afghanistan Packages (AFN)
  mk(1, 'af-awcc', 'daily', '1 GB Daily', '1 day', 50, { data: '1 GB' }),
  mk(2, 'af-awcc', 'daily', '2 GB + 100 Min', '2 days', 95, { data: '2 GB', minutes: '100 min', popular: true }),
  mk(3, 'af-awcc', 'weekly', '7 GB Weekly', '7 days', 190, { data: '7 GB' }),
  mk(4, 'af-awcc', 'monthly', '20 GB Monthly', '30 days', 550, { data: '20 GB', popular: true }),
  
  mk(1, 'af-ros', 'daily', '1.5 GB Daily', '1 day', 60, { data: '1.5 GB' }),
  mk(2, 'af-ros', 'weekly', '5 GB + 150 Min', '7 days', 210, { data: '5 GB', minutes: '150 min', popular: true }),
  mk(3, 'af-ros', 'monthly', '25 GB Monthly', '30 days', 600, { data: '25 GB' }),
  
  mk(1, 'af-mtn', 'daily', '500 MB Daily', '1 day', 35, { data: '500 MB' }),
  mk(2, 'af-mtn', 'weekly', '4 GB Weekly', '7 days', 160, { data: '4 GB' }),
  mk(3, 'af-mtn', 'monthly', '15 GB Monthly', '30 days', 450, { data: '15 GB', popular: true }),
  
  mk(1, 'af-salaam', 'daily', '1 GB Daily', '1 day', 45, { data: '1 GB' }),
  mk(2, 'af-salaam', 'monthly', '12 GB Monthly', '30 days', 400, { data: '12 GB', popular: true }),

  // Iran Packages (IRR - in thousands)
  mk(1, 'ir-mci', 'daily', '1 GB Daily', '1 day', 15, { data: '1 GB' }),
  mk(2, 'ir-mci', 'daily', '3 GB + 200 Min', '2 days', 30, { data: '3 GB', minutes: '200 min', popular: true }),
  mk(3, 'ir-mci', 'weekly', '10 GB Weekly', '7 days', 60, { data: '10 GB' }),
  mk(4, 'ir-mci', 'monthly', '30 GB Monthly', '30 days', 180, { data: '30 GB', popular: true }),
  mk(5, 'ir-mci', 'unlimited', 'Unlimited Social', '30 days', 250, { data: 'Unlimited Social' }),

  mk(1, 'ir-irancell', 'daily', '1.5 GB Daily', '1 day', 20, { data: '1.5 GB' }),
  mk(2, 'ir-irancell', 'weekly', '8 GB + 300 Min', '7 days', 70, { data: '8 GB', minutes: '300 min', popular: true }),
  mk(3, 'ir-irancell', 'monthly', '40 GB Monthly', '30 days', 220, { data: '40 GB' }),
  mk(4, 'ir-irancell', 'unlimited', 'Unlimited Night', '30 days', 300, { data: 'Unlimited 12am-9am' }),

  mk(1, 'ir-rightel', 'daily', '500 MB Daily', '1 day', 10, { data: '500 MB' }),
  mk(2, 'ir-rightel', 'weekly', '6 GB Weekly', '7 days', 50, { data: '6 GB' }),
  mk(3, 'ir-rightel', 'monthly', '20 GB Monthly', '30 days', 150, { data: '20 GB', popular: true }),

  mk(1, 'ir-taliya', 'daily', '1 GB + 50 Min', '1 day', 18, { data: '1 GB', minutes: '50 min' }),
  mk(2, 'ir-taliya', 'monthly', '15 GB Monthly', '30 days', 140, { data: '15 GB', popular: true }),

  // Turkey Packages (TRY)
  mk(1, 'tr-turkcell', 'daily', '2 GB Daily', '1 day', 25, { data: '2 GB' }),
  mk(2, 'tr-turkcell', 'daily', '4 GB + 150 Min', '2 days', 45, { data: '4 GB', minutes: '150 min', popular: true }),
  mk(3, 'tr-turkcell', 'weekly', '15 GB Weekly', '7 days', 90, { data: '15 GB' }),
  mk(4, 'tr-turkcell', 'monthly', '50 GB Monthly', '30 days', 290, { data: '50 GB', popular: true }),
  mk(5, 'tr-turkcell', 'unlimited', 'Unlimited Social', '30 days', 399, { data: 'Unlimited Social' }),

  mk(1, 'tr-vodafone', 'daily', '2.5 GB Daily', '1 day', 30, { data: '2.5 GB' }),
  mk(2, 'tr-vodafone', 'weekly', '12 GB + 250 Min', '7 days', 100, { data: '12 GB', minutes: '250 min', popular: true }),
  mk(3, 'tr-vodafone', 'monthly', '45 GB Monthly', '30 days', 320, { data: '45 GB' }),
  mk(4, 'tr-vodafone', 'unlimited', 'Unlimited Night', '30 days', 450, { data: 'Unlimited 11pm-7am' }),

  mk(1, 'tr-turktelekom', 'daily', '1 GB Daily', '1 day', 20, { data: '1 GB' }),
  mk(2, 'tr-turktelekom', 'weekly', '8 GB Weekly', '7 days', 75, { data: '8 GB' }),
  mk(3, 'tr-turktelekom', 'monthly', '30 GB Monthly', '30 days', 250, { data: '30 GB', popular: true }),
];

export const digitalServices: DigitalService[] = [
  // Afghanistan services (AFN)
  { id: 'af-gaming', name: 'Game Credits', icon: '🎮', category: 'gaming', startingFrom: 50 },
  { id: 'af-topup', name: 'Mobile Topup', icon: '📱', category: 'topup', startingFrom: 10 },
  { id: 'af-gift', name: 'Gift Cards', icon: '🎁', category: 'gift', startingFrom: 200 },
  
  // Iran services (IRR - in thousands)
  { id: 'ir-donate', name: 'Charity Donation', icon: '🤝', category: 'gift', startingFrom: 50 },
  { id: 'ir-topup', name: 'Mobile Topup', icon: '📱', category: 'topup', startingFrom: 5 },
  { id: 'ir-gaming', name: 'Game Credits', icon: '🎮', category: 'gaming', startingFrom: 30 },
  
  // Turkey services (TRY)
  { id: 'tr-gaming', name: 'Game Credits', icon: '🎮', category: 'gaming', startingFrom: 25 },
  { id: 'tr-topup', name: 'Mobile Topup', icon: '📱', category: 'topup', startingFrom: 10 },
  { id: 'tr-gift', name: 'Gift Cards', icon: '🎁', category: 'gift', startingFrom: 50 },
  { id: 'tr-utility', name: 'Utility Bills', icon: '💰', category: 'internet', startingFrom: 100 },
];

export const transactions: Transaction[] = [
  // Afghanistan transactions
  { id: 't1001', type: 'recharge', title: 'AWCC Recharge', meta: '+93 77xx xxxxxx', amount: -150, status: 'success', date: '2026-06-14T10:32:00Z' },
  { id: 't1002', type: 'wallet-add', title: 'Add Money', meta: 'Bank Transfer', amount: 5000, status: 'success', date: '2026-06-13T08:21:00Z' },
  { id: 't1003', type: 'package', title: '20 GB Monthly • AWCC', meta: '+93 77xx xxxxxx', amount: -550, status: 'success', date: '2026-06-12T19:02:00Z' },
  { id: 't1004', type: 'service', title: 'Game Credits 1000', meta: 'User ID 5xxxxx', amount: -300, status: 'pending', date: '2026-06-11T15:45:00Z' },
  { id: 't1005', type: 'wallet-send', title: 'Sent to Ahmad', meta: '+93 79xx xxxxxx', amount: -200, status: 'success', date: '2026-06-10T11:10:00Z' },
  
  // Iran transactions (IRR - in thousands)
  { id: 't1006', type: 'recharge', title: 'MCI Recharge', meta: '+98 91x xxxxxxx', amount: -20, status: 'failed', date: '2026-06-09T07:50:00Z' },
  { id: 't1007', type: 'wallet-add', title: 'Add Money', meta: 'Bank Transfer', amount: 1000, status: 'success', date: '2026-06-08T16:00:00Z' },
  { id: 't1008', type: 'package', title: '30 GB Monthly • MCI', meta: '+98 91x xxxxxxx', amount: -180, status: 'success', date: '2026-06-07T20:14:00Z' },
  { id: 't1009', type: 'wallet-add', title: 'Add Money', meta: 'Card ****1142', amount: 500, status: 'success', date: '2026-06-06T09:00:00Z' },
  { id: 't1010', type: 'service', title: 'Game Credits 500', meta: 'User ID 3xxxxx', amount: -50, status: 'success', date: '2026-06-05T14:30:00Z' },
  
  // Turkey transactions (TRY)
  { id: 't1011', type: 'recharge', title: 'Turkcell Recharge', meta: '+90 5xx xxxxxx', amount: -50, status: 'pending', date: '2026-06-04T12:15:00Z' },
  { id: 't1012', type: 'recharge', title: 'Vodafone Recharge', meta: '+90 5xx xxxxxx', amount: -100, status: 'success', date: '2026-06-03T18:42:00Z' },
  { id: 't1013', type: 'package', title: '50 GB Monthly • Turkcell', meta: '+90 5xx xxxxxx', amount: -290, status: 'success', date: '2026-06-02T14:30:00Z' },
  { id: 't1014', type: 'wallet-add', title: 'Add Money', meta: 'Bank Transfer', amount: 2000, status: 'success', date: '2026-06-01T10:00:00Z' },
  { id: 't1015', type: 'service', title: 'Utility Bill - Electricity', meta: 'Invoice #E-2026-01', amount: -350, status: 'success', date: '2026-05-31T09:15:00Z' },
];

export const notifications: Notification[] = [
  // Afghanistan
  { id: 'n1', title: 'Recharge successful', body: 'AWCC recharge of ؋150 was successful.', type: 'recharge', date: '2026-06-14T10:33:00Z' },
  { id: 'n2', title: 'Money added', body: '؋5,000 added to your wallet from Bank Transfer.', type: 'wallet', date: '2026-06-13T08:22:00Z' },
  
  // Iran
  { id: 'n3', title: 'Weekend offer 🎉', body: 'Get 10% cashback on all monthly packages this weekend.', type: 'promo', date: '2026-06-12T09:00:00Z' },
  { id: 'n4', title: 'KYC verification pending', body: 'Complete your KYC to unlock higher transfer limits.', type: 'system', date: '2026-06-10T11:00:00Z', read: true },
  
  // Turkey
  { id: 'n5', title: 'Recharge successful', body: 'Turkcell recharge of ₺50 was successful.', type: 'recharge', date: '2026-06-04T12:16:00Z' },
  { id: 'n6', title: 'Payment successful', body: '₺350 electricity bill paid successfully.', type: 'system', date: '2026-05-31T09:16:00Z' },
];

export const currentUser: User = {
  id: 'u1',
  name: 'Ahmed Karimi',
  email: 'ahmed@payhub.com',
  phone: '+937712345678',
  kyc: 'verified',
  joined: '2025-01-12',
};

export const monthlyRecharge = [
  { month: 'Jan', amount: 1240 },
  { month: 'Feb', amount: 1820 },
  { month: 'Mar', amount: 2140 },
  { month: 'Apr', amount: 1890 },
  { month: 'May', amount: 2680 },
  { month: 'Jun', amount: 3120 },
];

export const weeklyActivity = [
  { day: 'Mon', value: 320 }, { day: 'Tue', value: 480 }, { day: 'Wed', value: 290 },
  { day: 'Thu', value: 610 }, { day: 'Fri', value: 720 }, { day: 'Sat', value: 540 }, { day: 'Sun', value: 410 },
];