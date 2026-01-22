'use client';

import { useState } from 'react';
import Shell from '@/components/layout/Shell';
import { Wallet, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, CreditCard, Plus, ArrowRight } from 'lucide-react';

export default function WithdrawPage() {
    const [amount, setAmount] = useState('');

    return (
        <Shell>
            <div className="space-y-8 max-w-6xl mx-auto">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Money Withdraw</h2>
                    <p className="text-gray-600 focus:outline-none">Manage your earnings and withdrawal requests</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-6">
                        {/* Balance Card */}
                        <div className="premium-card p-6 bg-gradient-to-br from-primary-600 to-indigo-700 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Wallet className="w-32 h-32" />
                            </div>
                            <p className="text-sm font-medium text-white/80 mb-1">Available Balance</p>
                            <h3 className="text-4xl font-bold mb-6">$12,845.50</h3>
                            <div className="flex items-center gap-4 text-xs">
                                <div className="bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">Pending: $1,240.00</div>
                                <div className="bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">Last: $4,500.00</div>
                            </div>
                        </div>

                        {/* Withdrawal Methods */}
                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-gray-900">Withdraw To</h4>
                                <button className="text-primary-600 hover:text-primary-700 transition-colors">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: 'Bank Account', details: '**** 5842', active: true },
                                    { name: 'PayPal', details: 'seller@example.com', active: false },
                                ].map((method, idx) => (
                                    <div key={idx} className={`p-4 border rounded-2xl cursor-pointer transition-all ${method.active ? 'border-primary-500 bg-primary-50/50 ring-1 ring-primary-500' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${method.active ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                                <CreditCard className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{method.name}</p>
                                                <p className="text-xs text-gray-500">{method.details}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        {/* Request Form */}
                        <div className="glass-card p-6">
                            <h4 className="font-bold text-gray-900 mb-6">Request Withdrawal</h4>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Amount to Withdraw</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Minimum withdrawal: $100.00 | Fee: $0.00</p>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    {[500, 1000, 2500, 5000].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => setAmount(val.toString())}
                                            className="py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all"
                                        >
                                            ${val}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setAmount('12845.50')}
                                        className="col-span-2 py-3 px-4 bg-primary-50 border border-primary-100 rounded-xl text-sm font-bold text-primary-600 hover:bg-primary-100 transition-all font-outfit"
                                    >
                                        Withdraw Max Balance
                                    </button>
                                </div>

                                <button className="btn-primary w-full py-4 text-lg shadow-xl shadow-primary-200 group">
                                    Proceed to Withdrawal
                                    <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Recent History */}
                        <div className="glass-card p-6">
                            <h4 className="font-bold text-gray-900 mb-6">Recent Transactions</h4>
                            <div className="space-y-4">
                                {[
                                    { id: 'TX-8542', amount: 4500.00, status: 'completed', date: 'Jan 15, 2026' },
                                    { id: 'TX-8541', amount: 1200.00, status: 'pending', date: 'Jan 20, 2026' },
                                    { id: 'TX-8540', amount: 3000.00, status: 'completed', date: 'Jan 02, 2026' },
                                ].map((tx, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${tx.status === 'completed' ? 'bg-success-100 text-success-600' : 'bg-warning-100 text-warning-600'}`}>
                                                {tx.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{tx.id}</p>
                                                <p className="text-xs text-gray-500">{tx.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-900">${tx.amount.toLocaleString()}</p>
                                            <p className={`text-[10px] font-bold uppercase ${tx.status === 'completed' ? 'text-success-600' : 'text-warning-600'}`}>
                                                {tx.status}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
