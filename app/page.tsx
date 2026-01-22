'use client';

import { useState, useEffect } from 'react';
import {
    AmountReceivablesCard,
    TotalLifetimeSalesCard,
    TodaySalesCard,
    ThisMonthSalesCard,
    LastMonthSalesCard
} from '@/components/dashboard/MetricCard';
import SalesChart from '@/components/dashboard/SalesChart';
import FeaturedProductsCarousel from '@/components/products/FeaturedProductsCarousel';
import StoreHealthDashboard from '@/components/health/StoreHealthDashboard';
import {
    mockSalesStats,
    mockChartData,
    mockProducts,
    mockStoreHealthScore
} from '@/lib/mockData';
import { TrendingUp, Package, Heart, Zap, Sparkles, Activity, ArrowUpRight, Globe } from 'lucide-react';
import Shell from '@/components/layout/Shell';

export default function DashboardPage() {
    const [stats, setStats] = useState(mockSalesStats);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate data fetching
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                todaySales: prev.todaySales + Math.random() * 50,
            }));
        }, 15000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 animate-pulse" />
                <div className="text-center relative z-10">
                    <div className="relative mb-8 inline-block">
                        <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary-600 animate-pulse" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black gradient-text mb-2">Syncing your Store...</h3>
                    <p className="text-gray-400 font-medium animate-pulse">Initializing premium experience</p>
                </div>
            </div>
        );
    }

    return (
        <Shell>
            <div className="space-y-10 pb-20 max-w-[1600px] mx-auto">
                {/* Hero Welcome Section */}
                <section className="relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-700 rounded-[2.5rem] opacity-90 group-hover:opacity-100 transition-opacity duration-1000 shadow-[0_20px_50px_rgba(79,70,229,0.3)]"></div>
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                    {/* Floating Decorative Elements */}
                    <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float-slow"></div>
                    <div className="absolute bottom-[-20%] left-[10%] w-48 h-48 bg-purple-400/20 rounded-full blur-3xl animate-float"></div>

                    <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="text-white space-y-4 md:space-y-6 max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-fade-in shadow-inner">
                                <Zap className="w-3 md:w-4 h-3 md:h-4 text-yellow-300 fill-yellow-300" />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Live Store Intelligence</span>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl sm:text-4xl lg:text-7xl font-black tracking-tight animate-slide-up leading-tight">
                                    Hello, <span className="text-yellow-300">Demo Seller</span>!
                                </h1>
                                <p className="text-base md:text-xl text-primary-50 opacity-90 animate-slide-up stagger-1 max-w-lg mx-auto md:mx-0">
                                    Your store is performing <span className="font-bold text-white underline decoration-success-400 decoration-2 underline-offset-4 pointer-events-auto cursor-help" title="12% better than average">12% better</span> today. Ready to scale?
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 md:pt-4">
                                <button className="px-6 py-3 md:px-8 md:py-4 bg-white text-primary-600 rounded-2xl font-black hover:scale-105 transition-all shadow-xl flex items-center gap-2 group/btn text-sm md:text-base">
                                    Analyze Growth
                                    <ArrowUpRight className="w-4 md:w-5 h-4 md:h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </button>
                                <button className="px-6 py-3 md:px-8 md:py-4 bg-primary-900/40 backdrop-blur-md text-white rounded-2xl font-black border border-white/20 hover:bg-primary-900/60 transition-all flex items-center gap-2 text-sm md:text-base">
                                    <Globe className="w-4 md:w-5 h-4 md:h-5" />
                                    Global Stats
                                </button>
                            </div>
                        </div>

                        {/* Interactive Metric Highlight */}
                        <div className="relative group/metric animate-scale-in stagger-2 hidden lg:block">
                            <div className="glass-card !bg-white/10 border-white/20 p-8 w-72 h-84 backdrop-blur-2xl shadow-2xl rotate-3 group-hover/metric:rotate-0 transition-transform duration-700 relative overflow-hidden">
                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                            <Activity className="w-8 h-8 text-white" />
                                        </div>
                                        <span className="text-[10px] font-black text-white px-3 py-1 bg-[#00C06A] rounded-full tracking-wider shadow-lg shadow-emerald-900/20">ACTIVE</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white/60 font-bold text-[10px] uppercase tracking-[0.2em]">Store Health</p>
                                        <h4 className="text-[3.5rem] font-black text-white leading-none tracking-tight">98.4%</h4>
                                    </div>
                                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-[98%] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                                    </div>
                                    <p className="text-white/70 text-[11px] font-medium leading-relaxed italic">
                                        "Excellent response time and order fulfillment rating."
                                    </p>
                                </div>
                            </div>

                            {/* Uptime Card - Updated to match image (White card, green text) */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-[1.5rem] shadow-2xl shadow-black/20 -rotate-6 group-hover/metric:-rotate-3 transition-transform duration-700 border border-gray-100">
                                <p className="text-gray-300 text-[9px] font-black tracking-[0.2em] uppercase mb-1">Uptime</p>
                                <p className="text-2xl font-black text-[#00C06A]">99.9%</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Stats Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 animate-slide-up stagger-1">
                    <div className="sm:col-span-2 lg:col-span-2">
                        <AmountReceivablesCard amount={stats.amountReceivables} />
                    </div>
                    <div className="sm:col-span-2 lg:col-span-2">
                        <TotalLifetimeSalesCard amount={stats.totalLifetimeSales} />
                    </div>
                    <div className="sm:col-span-2 sm:col-start-1 md:col-start-auto lg:col-span-1">
                        <TodaySalesCard amount={stats.todaySales} change={stats.todayChange} />
                    </div>
                </section>

                {/* Sub Stats & Net Profit Row */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up stagger-2">
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ThisMonthSalesCard amount={stats.thisMonthSales} change={stats.thisMonthChange} />
                        <LastMonthSalesCard amount={stats.lastMonthSales} />
                    </div>

                    {/* Enhanced Net Profit Highlight */}
                    <div className="premium-card relative overflow-hidden group/profit min-h-[250px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-success-600 to-emerald-700 group-hover:scale-110 transition-transform duration-700 opacity-95"></div>
                        <div className="absolute top-0 right-0 w-full h-full opacity-10 blur-xl pointer-events-none bg-[radial-gradient(circle_at_top_right,white,transparent)]"></div>

                        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between text-white">
                            <div className="flex justify-between items-start gap-3">
                                <div className="min-w-0">
                                    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-success-200 truncate">Total Net Profit</p>
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mt-2 leading-none truncate">
                                        ${stats.netProfit.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                    </h3>
                                </div>
                                <div className="p-3 md:p-4 bg-white/20 rounded-2xl shadow-xl backdrop-blur-md group-hover/profit:rotate-12 transition-transform shrink-0">
                                    <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />
                                </div>
                            </div>

                            <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-white/20">
                                <div className="flex justify-between items-end gap-2">
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider truncate">Margin Percentage</p>
                                        <p className="text-2xl md:text-3xl font-black text-yellow-300">{stats.netProfitMargin}%</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="flex items-center gap-1 text-success-300 font-bold justify-end">
                                            <ArrowUpRight className="w-4 h-4" />
                                            <span className="text-xs md:text-sm">High</span>
                                        </div>
                                        <p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest font-bold">Profit Status</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/profit:opacity-100 transition-opacity animate-shimmer pointer-events-none"></div>
                    </div>
                </section>

                {/* Analytics & Featured Split */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <section className="xl:col-span-2 animate-slide-up stagger-3">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 px-4 gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[1.2rem] shrink-0 border border-gray-100">
                                    <TrendingUp className="w-6 h-6 text-[#4F46E5]" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-[#0F172A] leading-none tracking-tight">Performance</h2>
                                    <p className="text-sm text-slate-400 font-semibold mt-1.5 tracking-wide">Real-time revenue stream tracking</p>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-none px-6 py-2.5 bg-white rounded-xl text-xs font-bold text-slate-600 hover:text-[#4F46E5] hover:bg-slate-50 shadow-sm transition-all border border-gray-200 text-center tracking-wide">Weekly</button>
                                <button className="flex-1 sm:flex-none px-6 py-2.5 bg-[#4F46E5] rounded-xl text-xs font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-600 active:scale-95 text-center tracking-wide">Monthly</button>
                            </div>
                        </div>
                        <SalesChart data={mockChartData} />
                    </section>

                    <section className="animate-slide-up stagger-4 space-y-8">
                        {/* Live Feed Component Placeholder */}
                        <div className="glass-card p-6 !bg-white/40 border-white/60">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-primary-600" />
                                    Live Shop Feed
                                </h3>
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
                                </span>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { msg: 'New order #9822 from New York', time: '2m ago', icon: Package, color: 'text-indigo-600' },
                                    { msg: 'Payment verified from client', time: '15m ago', icon: Zap, color: 'text-yellow-600' },
                                    { msg: 'Stock alert: Wireless Mouse low', time: '1h ago', icon: Activity, color: 'text-danger-600' },
                                ].map((feed, i) => (
                                    <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-white/60 transition-colors border border-transparent hover:border-white animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                                        <div className={`p-2 rounded-lg bg-white shadow-sm h-fit ${feed.color}`}>
                                            <feed.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-sm font-bold text-gray-800 truncate leading-tight">{feed.msg}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{feed.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-3 text-xs font-bold text-primary-600 hover:bg-white rounded-xl transition-all uppercase tracking-widest">
                                View Full Console
                            </button>
                        </div>

                        <div className="premium-card p-6 bg-gradient-to-br from-slate-900 to-indigo-900 text-white relative overflow-hidden group">
                            <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-white/5 group-hover:rotate-12 transition-transform" />
                            <h3 className="text-xl font-bold mb-2">Automated Insights</h3>
                            <p className="text-sm text-indigo-100/60 leading-relaxed mb-4">You can save <span className="text-success-400 font-bold">$450/month</span> by optimizing your inventory routes.</p>
                            <button className="text-xs font-bold text-white underline decoration-primary-500 decoration-2 underline-offset-4 hover:text-primary-400 transition-colors">Apply Strategy</button>
                        </div>
                    </section>
                </div>

                {/* Sections */}
                <section className="animate-slide-up stagger-4">
                    <div className="flex items-center justify-between mb-8 px-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white shadow-xl rounded-2xl">
                                <Package className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 leading-none">Trending Items</h2>
                                <p className="text-sm text-gray-400 font-medium mt-1">Products getting the most heat lately</p>
                            </div>
                        </div>
                    </div>
                    <FeaturedProductsCarousel products={mockProducts} />
                </section>

                <section className="animate-slide-up stagger-5">
                    <div className="flex items-center justify-between mb-8 px-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white shadow-xl rounded-2xl">
                                <Heart className="w-6 h-6 text-danger-600" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 leading-none">Store Vitals</h2>
                                <p className="text-sm text-gray-400 font-medium mt-1">Health & fulfillment metrics dashboard</p>
                            </div>
                        </div>
                    </div>
                    <StoreHealthDashboard healthScore={mockStoreHealthScore} />
                </section>

                {/* Footer */}
                <footer className="text-center pt-16 mt-16 border-t border-gray-100">
                    <div className="space-y-4">
                        <div className="flex justify-center items-center gap-6">
                            <span className="text-xs font-black text-gray-300 uppercase tracking-[0.3em]">Privacy</span>
                            <span className="text-xs font-black text-gray-300 uppercase tracking-[0.3em]">Terms</span>
                            <span className="text-xs font-black text-gray-300 uppercase tracking-[0.3em]">Help</span>
                        </div>
                        <p className="text-sm font-medium text-gray-400">
                            © 2026 <span className="gradient-text font-black tracking-tighter">SmartSeller Pro</span>.
                            Built with precision for futuristic commerce.
                        </p>
                    </div>
                </footer>
            </div>
        </Shell>
    );
}

function SalesChartIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m19 20-3.5-3.5" />
            <path d="m2 2 10 10" />
            <path d="m22 2-10 10" />
            <path d="M20 16a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
            <path d="M4 16a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
        </svg>
    );
}
