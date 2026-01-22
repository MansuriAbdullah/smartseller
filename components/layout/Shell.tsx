'use client';

import { useState } from 'react';
import Navigation from './Navigation';
import { LayoutDashboard, Menu, Bell, Search, LogOut, ChevronDown } from 'lucide-react';

export default function Shell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60] lg:hidden transition-all duration-500"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 bottom-0 z-[70] w-80 bg-white/80 backdrop-blur-3xl border-r border-white/20 
                transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
            `}>
                {/* Decorative Mesh Gradient over Sidebar */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100" />

                <div className="flex flex-col h-full relative z-10">
                    {/* Brand Section */}
                    <div className="p-8">
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative p-3 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl shadow-xl">
                                    <LayoutDashboard className="w-7 h-7 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tighter gradient-text">SmartSeller</h1>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-success-500 rounded-full animate-ping" />
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Pro Account</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <div className="flex-1 overflow-y-auto px-4 custom-scrollbar scroll-smooth">
                        <Navigation />
                    </div>

                    {/* Footer / Profile Section */}
                    <div className="p-6">
                        <div className="glass-card !bg-white/40 border-white/40 p-4 group cursor-pointer hover:!bg-white/60 transition-all duration-300">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-tr from-primary-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:rotate-6 transition-transform">
                                        DS
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 border-2 border-white rounded-full" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-bold text-gray-900 truncate">Demo Store</p>
                                    <p className="text-[10px] text-gray-500 font-semibold truncate">General Manager</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                            </div>

                            {/* Hidden Stats on Hover */}
                            <div className="mt-4 pt-4 border-t border-gray-100/50 hidden group-hover:block animate-slide-up">
                                <button className="w-full flex items-center justify-center gap-2 text-xs font-bold text-danger-500 hover:bg-danger-50 py-2 rounded-lg transition-colors">
                                    <LogOut className="w-3 h-3" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:pl-80 flex flex-col min-h-screen relative z-10">
                {/* Top Header */}
                <header className="h-20 bg-white/40 backdrop-blur-xl border-b border-white/20 sticky top-0 z-[50] flex items-center justify-between px-6 lg:px-12 transition-all">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-3 bg-white/50 hover:bg-white rounded-2xl lg:hidden shadow-sm transition-all"
                    >
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>

                    <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
                        <div className="relative w-full group">
                            <div className="absolute inset-0 bg-primary-500/5 rounded-2xl blur-xl group-focus-within:bg-primary-500/10 transition-all" />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Universal search (cmd + k)..."
                                className="w-full pl-12 pr-6 py-3.5 bg-white/50 border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all text-sm font-medium shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-6">
                        <div className="flex items-center bg-white/50 p-1 rounded-2xl border border-white/40 shadow-sm sm:flex hidden">
                            <button className="p-2.5 hover:bg-white rounded-xl text-gray-500 transition-all">
                                <Smartphone size={20} />
                            </button>
                            <button className="p-2.5 bg-white shadow-sm rounded-xl text-primary-600 transition-all">
                                <LayoutDashboard size={20} />
                            </button>
                        </div>

                        <div className="h-10 w-[1px] bg-gray-200 hidden sm:block mx-1"></div>

                        <button className="p-3 bg-white/50 hover:bg-white rounded-2xl relative group shadow-sm transition-all">
                            <Bell className="w-5 h-5 text-gray-600 group-hover:text-primary-500 transition-colors" />
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-danger-500 rounded-full border-[2.5px] border-white animate-pulse"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-12 animate-fade-in relative">
                    {children}
                </main>
            </div>
        </div>
    );
}

function Smartphone({ size = 24, className = "" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
            <path d="M12 18h.01" />
        </svg>
    );
}
