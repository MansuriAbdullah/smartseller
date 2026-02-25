'use client';

import { useState, useEffect } from 'react';
import Shell from '@/components/layout/Shell';
import { Wallet, ShieldCheck, CreditCard, ArrowRight, Zap, Info, CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DepositPage() {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [depositType, setDepositType] = useState<'main' | 'guarantee'>('main');
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    const handleDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: 'Deposit feature is coming soon to your region. Please contact support.', type: 'info' });
        setTimeout(() => setIsSubmitting(false), 1000);
    };

    if (authLoading || !user) return null;

    return (
        <Shell>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Deposit Funds</h2>
                    <p className="text-gray-600">Add funds to your Main Wallet or Security Guarantee Wallet</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        onClick={() => setDepositType('main')}
                        className={`premium-card p-6 cursor-pointer transition-all ${depositType === 'main' ? 'ring-2 ring-primary-500 bg-primary-50/30 shadow-lg' : 'hover:bg-gray-50'}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className={`p-4 rounded-2xl ${depositType === 'main' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                <Wallet className="w-8 h-8" />
                            </div>
                            {depositType === 'main' && <CheckCircle2 className="w-6 h-6 text-primary-500" />}
                        </div>
                        <h3 className="text-xl font-bold mt-6 text-gray-900">Main Wallet</h3>
                        <p className="text-sm text-gray-500 mt-2">Used for advertising, purchasing packages, and general store operations.</p>
                    </div>

                    <div
                        onClick={() => setDepositType('guarantee')}
                        className={`premium-card p-6 cursor-pointer transition-all ${depositType === 'guarantee' ? 'ring-2 ring-success-500 bg-success-50/30 shadow-lg' : 'hover:bg-gray-50'}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className={`p-4 rounded-2xl ${depositType === 'guarantee' ? 'bg-success-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            {depositType === 'guarantee' && <CheckCircle2 className="w-6 h-6 text-success-500" />}
                        </div>
                        <h3 className="text-xl font-bold mt-6 text-gray-900">Guarantee Wallet</h3>
                        <p className="text-sm text-gray-500 mt-2">Mandatory security deposit for store verification and advanced trust ratings.</p>
                    </div>
                </div>

                <div className="glass-card p-8">
                    <form onSubmit={handleDeposit} className="space-y-6">
                        {message.text && (
                            <div className={`p-4 rounded-2xl flex items-start gap-3 ${message.type === 'info' ? 'bg-blue-50 text-blue-700' : 'bg-success-50 text-success-700'}`}>
                                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                                <p className="text-sm font-bold">{message.text}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Amount to Deposit ($) *</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-300">$</span>
                                <input
                                    required
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-12 pr-6 py-6 bg-gray-50 border border-gray-100 rounded-[2rem] text-3xl font-black text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:bg-white transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {[100, 500, 1000, 5000].map(val => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setAmount(val.toString())}
                                    className="py-3 px-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95"
                                >
                                    ${val}
                                </button>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !amount}
                            className={`btn-primary w-full py-6 text-xl rounded-[2rem] shadow-2xl flex items-center justify-center gap-3 group transition-all ${isSubmitting || !amount ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                        >
                            <Zap className={`w-6 h-6 fill-white ${isSubmitting ? 'animate-pulse' : 'group-hover:scale-125 transition-transform'}`} />
                            {isSubmitting ? 'Processing...' : `Deposit to ${depositType === 'main' ? 'Main' : 'Guarantee'} Wallet`}
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </form>
                </div>

                <div className="flex items-center gap-3 p-6 bg-amber-50 rounded-3xl border border-amber-100">
                    <div className="p-3 bg-white rounded-2xl shadow-sm">
                        <CreditCard className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-amber-900 tracking-tight">Security Note</p>
                        <p className="text-xs text-amber-700 mt-1">All deposits are processed through secure 256-bit encrypted gateways. Guarantee funds are held in escrow.</p>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
