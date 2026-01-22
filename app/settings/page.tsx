'use client';

import Shell from '@/components/layout/Shell';
import { Settings, Store, Globe, Bell, Shield, Palette, Save, Camera, Smartphone } from 'lucide-react';

export default function SettingsPage() {
    return (
        <Shell>
            <div className="space-y-8 max-w-5xl mx-auto">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Shop Setting</h2>
                    <p className="text-gray-600 focus:outline-none">Manage your store profile and configuration</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="md:col-span-1 space-y-2">
                        {[
                            { name: 'Profile', icon: Store, active: true },
                            { name: 'Regional', icon: Globe, active: false },
                            { name: 'Notifications', icon: Bell, active: false },
                            { name: 'Security', icon: Shield, active: false },
                            { name: 'Appearance', icon: Palette, active: false },
                        ].map((tab, idx) => (
                            <button
                                key={idx}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${tab.active
                                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-200'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Profile Section */}
                        <div className="glass-card p-8">
                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                                <div className="relative group">
                                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border border-gray-200 overflow-hidden">
                                        <Store className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 p-2 bg-primary-500 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">Store Logo & Info</h4>
                                    <p className="text-sm text-gray-500">Update your shop's visual identity</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Shop Name</label>
                                    <input type="text" defaultValue="Demo Store" className="input-field" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Tagline</label>
                                    <input type="text" defaultValue="Smart E-Commerce Management" className="input-field" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Store Description</label>
                                    <textarea rows={4} className="input-field py-3" defaultValue="Providing high-quality products to our customers with excellence in service."></textarea>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Business Email</label>
                                    <input type="email" defaultValue="contact@demostore.com" className="input-field" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                    <input type="tel" defaultValue="+1 (555) 001-2233" className="input-field" />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button className="btn-primary px-8">
                                    <Save className="w-4 h-4 mr-2 inline" />
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        {/* Store Status */}
                        <div className="glass-card p-6 border-l-4 border-success-500">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-success-50 text-success-600 rounded-xl">
                                        <Smartphone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Store Visibility</h4>
                                        <p className="text-sm text-gray-500">Your store is currently public and accepting orders</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-500"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
