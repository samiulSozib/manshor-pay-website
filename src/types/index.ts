export type Operator = {
  id: string;
  name: string;
  code: string;
  color: string; // tailwind gradient classes
  logo: string; // initials or short
};

export type RechargePackage = {
  id: string;
  operatorId: string;
  title: string;
  data?: string;
  minutes?: string;
  sms?: string;
  validity: string; // "1 day"
  category: 'daily' | 'weekly' | 'monthly' | 'unlimited';
  price: number;
  popular?: boolean;
};

export type DigitalService = {
  id: string;
  name: string;
  icon: string;
  category: 'gaming' | 'topup' | 'gift' | 'internet';
  startingFrom: number;
};

export type TxnStatus = 'success' | 'pending' | 'failed';
export type TxnType = 'recharge' | 'package' | 'wallet-add' | 'wallet-send' | 'wallet-withdraw' | 'service';

export type Transaction = {
  id: string;
  type: TxnType;
  title: string;
  meta?: string;
  amount: number; // negative for outflow
  status: TxnStatus;
  date: string; // ISO
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  type: 'recharge' | 'wallet' | 'system' | 'promo';
  date: string;
  read?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  kyc: 'verified' | 'pending' | 'unverified';
  joined: string;
};
