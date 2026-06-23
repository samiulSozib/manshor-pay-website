import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification, Transaction, User } from '@/types';
import { currentUser, notifications as seedNotifications, transactions as seedTransactions } from '@/data/mock';

type Theme = 'dark' | 'light';

interface AppState {
  user: User | null;
  isAuthed: boolean;
  walletBalance: number;
  theme: Theme;
  transactions: Transaction[];
  notifications: Notification[];
  // actions
  login: (email: string) => void;
  register: (name: string, email: string, phone: string) => void;
  logout: () => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  addMoney: (amount: number, source: string) => void;
  withdraw: (amount: number, dest: string) => void;
  sendMoney: (amount: number, to: string) => void;
  recharge: (operator: string, phone: string, amount: number) => Transaction;
  buyPackage: (operator: string, phone: string, title: string, price: number) => Transaction;
  buyService: (name: string, amount: number) => Transaction;
  markAllNotificationsRead: () => void;
  updateProfile: (patch: Partial<User>) => void;
}

const newId = () => 't' + Math.floor(Math.random() * 1e6);

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      user: currentUser,
      isAuthed: true,
      walletBalance: 12480,
      theme: 'dark',
      transactions: seedTransactions,
      notifications: seedNotifications,

      login: (email) => set({
        isAuthed: true,
        user: { ...currentUser, email, name: email.split('@')[0] || currentUser.name },
      }),
      register: (name, email, phone) => set({
        isAuthed: true,
        user: { ...currentUser, name, email, phone, kyc: 'unverified' },
      }),
      logout: () => set({ isAuthed: false, user: null }),

      setTheme: (theme) => {
        document.documentElement.classList.toggle('light', theme === 'light');
        set({ theme });
      },
      toggleTheme: () => {
        const next: Theme = get().theme === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.toggle('light', next === 'light');
        set({ theme: next });
      },

      addMoney: (amount, source) => {
        const t: Transaction = { id: newId(), type: 'wallet-add', title: 'Add Money', meta: source, amount, status: 'success', date: new Date().toISOString() };
        set(s => ({ walletBalance: s.walletBalance + amount, transactions: [t, ...s.transactions] }));
      },
      withdraw: (amount, dest) => {
        const t: Transaction = { id: newId(), type: 'wallet-withdraw', title: 'Withdraw', meta: dest, amount: -amount, status: 'success', date: new Date().toISOString() };
        set(s => ({ walletBalance: Math.max(0, s.walletBalance - amount), transactions: [t, ...s.transactions] }));
      },
      sendMoney: (amount, to) => {
        const t: Transaction = { id: newId(), type: 'wallet-send', title: 'Sent Money', meta: to, amount: -amount, status: 'success', date: new Date().toISOString() };
        set(s => ({ walletBalance: Math.max(0, s.walletBalance - amount), transactions: [t, ...s.transactions] }));
      },
      recharge: (operator, phone, amount) => {
        const t: Transaction = { id: newId(), type: 'recharge', title: `${operator} Recharge`, meta: phone, amount: -amount, status: 'success', date: new Date().toISOString() };
        set(s => ({ walletBalance: Math.max(0, s.walletBalance - amount), transactions: [t, ...s.transactions] }));
        return t;
      },
      buyPackage: (operator, phone, title, price) => {
        const t: Transaction = { id: newId(), type: 'package', title: `${title} • ${operator}`, meta: phone, amount: -price, status: 'success', date: new Date().toISOString() };
        set(s => ({ walletBalance: Math.max(0, s.walletBalance - price), transactions: [t, ...s.transactions] }));
        return t;
      },
      buyService: (name, amount) => {
        const t: Transaction = { id: newId(), type: 'service', title: name, amount: -amount, status: 'success', date: new Date().toISOString() };
        set(s => ({ walletBalance: Math.max(0, s.walletBalance - amount), transactions: [t, ...s.transactions] }));
        return t;
      },
      markAllNotificationsRead: () => set(s => ({ notifications: s.notifications.map(n => ({ ...n, read: true })) })),
      updateProfile: (patch) => set(s => ({ user: s.user ? { ...s.user, ...patch } : s.user })),
    }),
    {
      name: 'teknur-pay',
      partialize: (s) => ({ theme: s.theme, walletBalance: s.walletBalance, user: s.user, isAuthed: s.isAuthed, transactions: s.transactions, notifications: s.notifications }),
    },
  ),
);
