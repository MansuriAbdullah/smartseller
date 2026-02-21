'use client';

import Shell from '@/components/layout/Shell';
import { Truck, Package, Box, Search, CheckCircle2, Star, Zap, ShoppingCart, ArrowRight, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

export default function PackagesPage() {
    const packages = [
        {
            id: 'STA-001',
            name: 'Starter Merchant',
            price: '$50',
            duration: 'Month',
            description: 'Perfect for new sellers starting their journey.',
            features: ['5 Products Limit', 'Basic Analytics', 'Community Support', 'Standard Shipping Rates'],
            color: 'from-blue-500 to-cyan-500',
            popular: false,
            bgLight: 'bg-blue-50',
            textLight: 'text-blue-600'
        },
        {
            id: 'PRO-002',
            name: 'Professional Seller',
            price: '$150',
            duration: 'Month',
            description: 'Scale your business with advanced tools.',
            features: ['Unlimited Products', 'Advanced AI Insights', 'Priority 24/7 Support', 'Discounted Shipping', 'Custom Branding'],
            color: 'from-primary-600 to-purple-700',
            popular: true,
            bgLight: 'bg-primary-50',
            textLight: 'text-primary-600'
        },
        {
            id: 'ENT-003',
            name: 'Enterprise Pro',
            price: '$450',
            duration: 'Month',
            description: 'Complete solution for large scale operations.',
            features: ['Multiple Storefronts', 'Dedicated Account Manager', 'API Access', 'Global Logistics Network', 'Whiteglove Onboarding'],
            color: 'from-slate-800 to-slate-900',
            popular: false,
            bgLight: 'bg-gray-100',
            textLight: 'text-gray-900'
        }
    ];

    return (
        <Shell>
            <div className="space-y-10 pb-20 max-w-[1600px] mx-auto">
                {/* Hero Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto py-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-xs font-black uppercase tracking-[0.2em] animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        Expansion Packages
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tight leading-none">
                        Choose Your <span className="gradient-text">Growth Path</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                        Select a package that fits your business needs. Upgrade or downgrade anytime as you scale your store to new heights.
                    </p>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-10">
                    {packages.map((pkg, idx) => (
                        <div key={pkg.id} className={`relative flex flex-col group ${pkg.popular ? 'md:-translate-y-4' : ''}`}>
                            {pkg.popular && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                                    <div className="bg-yellow-400 text-yellow-950 text-[11px] font-black px-6 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        MOST POPULAR
                                    </div>
                                </div>
                            )}

                            <div className={`flex-1 glass-card p-10 flex flex-col border-2 transition-all duration-700 ${pkg.popular
                                    ? 'border-primary-500 shadow-[0_30px_60px_rgba(79,70,229,0.15)] ring-8 ring-primary-500/5'
                                    : 'border-transparent hover:border-gray-200 hover:shadow-2xl'
                                }`}>
                                {/* Icon & Name */}
                                <div className="mb-8">
                                    <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                                        <Package className={`w-8 h-8 text-white`} />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900">{pkg.name}</h3>
                                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">ID: {pkg.id}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-8 pb-8 border-b border-gray-100">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-gray-900 tracking-tighter">{pkg.price}</span>
                                        <span className="text-gray-400 font-black uppercase text-xs tracking-widest">/ {pkg.duration}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium mt-3 leading-relaxed">{pkg.description}</p>
                                </div>

                                {/* Features */}
                                <div className="flex-1 space-y-5 mb-10">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">What&apos;s Included</p>
                                    {pkg.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="p-1 bg-success-50 rounded-lg mt-0.5 shrink-0">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-success-600" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700 leading-snug">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Action */}
                                <button className={`w-full py-5 rounded-[1.5rem] font-black transition-all flex items-center justify-center gap-2 group/btn ${pkg.popular
                                        ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/30 hover:bg-primary-500 hover:scale-[1.02]'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-white'
                                    }`}>
                                    Activate Package
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 px-6">
                    {[
                        { icon: ShieldCheck, title: 'Secure Payment', desc: 'Encrypted transactions with fraud protection.' },
                        { icon: Zap, title: 'Instant Activation', desc: 'Your features go live immediately after upgrade.' },
                        { icon: TrendingUp, title: 'Scale Freely', desc: 'Switch plans anytime as your volume grows.' },
                    ].map((trust, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                            <div className="p-3 bg-white shadow-lg rounded-2xl group-hover:scale-110 transition-transform">
                                <trust.icon className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900 leading-none">{trust.title}</h4>
                                <p className="text-xs text-gray-400 font-medium mt-1">{trust.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legacy Tracking Section (moved to bottom as secondary) */}
                <div className="pt-20 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900">Shipment Logistics</h3>
                            <p className="text-gray-400 font-medium">Track your existing packages and container shipments</p>
                        </div>
                        <button className="flex items-center gap-2 text-primary-600 font-black text-sm hover:gap-3 transition-all">
                            Manage All Shipments
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="glass-card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-gray-400 font-black text-[10px] uppercase tracking-widest border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-5">Shipment ID</th>
                                        <th className="px-8 py-5">Carrier</th>
                                        <th className="px-8 py-5">Destination</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { id: 'PKG-1025', carrier: 'FedEx', dest: 'New York, NY', status: 'In Transit', date: 'Jan 22, 2026' },
                                        { id: 'PKG-1024', carrier: 'UPS', dest: 'London, UK', status: 'Delivered', date: 'Jan 20, 2026' },
                                    ].map((ship, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                                            <td className="px-8 py-6 font-bold text-gray-900 flex items-center gap-3">
                                                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                                                    <Truck className="w-4 h-4" />
                                                </div>
                                                {ship.id}
                                            </td>
                                            <td className="px-8 py-6 text-gray-500 font-medium">{ship.carrier}</td>
                                            <td className="px-8 py-6 text-gray-600 font-semibold">{ship.dest}</td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${ship.status === 'Delivered' ? 'bg-success-50 text-success-600' : 'bg-blue-50 text-blue-600'
                                                    }`}>
                                                    {ship.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right text-gray-400 font-bold">{ship.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
