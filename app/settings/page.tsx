'use client';

import { useState } from 'react';
import Shell from '@/components/layout/Shell';
import { Settings, Store, Globe, Bell, Shield, Palette, Save, Camera, Smartphone, Moon, Sun, Lock, Mail, Languages, CreditCard } from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('Profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return <ProfileSettings />;
            case 'Regional':
                return <RegionalSettings />;
            case 'Notifications':
                return <NotificationSettings />;
            case 'Security':
                return <SecuritySettings />;
            case 'Appearance':
                return <AppearanceSettings />;
            default:
                return <ProfileSettings />;
        }
    };

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
                            { name: 'Profile', icon: Store },
                            { name: 'Regional', icon: Globe },
                            { name: 'Notifications', icon: Bell },
                            { name: 'Security', icon: Shield },
                            { name: 'Appearance', icon: Palette },
                        ].map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.name
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
                        {renderContent()}
                    </div>
                </div>
            </div>
        </Shell>
    );
}

function ProfileSettings() {
    const [shopName, setShopName] = useState('Demo Store');
    const [tagline, setTagline] = useState('Smart E-Commerce Management');
    const [description, setDescription] = useState('Providing high-quality products to our customers with excellence in service.');
    const [email, setEmail] = useState('contact@demostore.com');
    const [phone, setPhone] = useState('+1 (555) 001-2233');
    const [isVisible, setIsVisible] = useState(true);

    return (
        <>
            <div className="glass-card p-8 animate-fade-in">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                    <div className="relative group cursor-pointer">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border border-gray-200 overflow-hidden group-hover:border-primary-300 transition-colors">
                            <Store className="w-10 h-10 text-gray-400 group-hover:text-primary-500 transition-colors" />
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2 bg-primary-500 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">Store Logo & Info</h4>
                        <p className="text-sm text-gray-500">Update your shop&apos;s visual identity</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Shop Name</label>
                        <input
                            type="text"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Tagline</label>
                        <input
                            type="text"
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Store Description</label>
                        <textarea
                            rows={4}
                            className="input-field py-3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Business Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button className="btn-primary px-8">
                        <Save className="w-4 h-4 mr-2 inline" />
                        Save Changes
                    </button>
                </div>
            </div>

            <div className={`glass-card p-6 border-l-4 transition-colors duration-300 animate-slide-up ${isVisible ? 'border-success-500' : 'border-gray-300 bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl transition-colors ${isVisible ? 'bg-success-50 text-success-600' : 'bg-gray-200 text-gray-500'}`}>
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Store Visibility</h4>
                            <p className="text-sm text-gray-500">
                                {isVisible ? 'Your store is currently public and accepting orders' : 'Your store is currently hidden from customers'}
                            </p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isVisible}
                            onChange={(e) => setIsVisible(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-500"></div>
                    </label>
                </div>
            </div>
        </>
    );
}

function RegionalSettings() {
    const [currency, setCurrency] = useState('USD');
    const [language, setLanguage] = useState('English (US)');
    const [timezone, setTimezone] = useState('UTC');

    return (
        <div className="glass-card p-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Globe className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900">Regional Preference</h4>
                    <p className="text-sm text-gray-500">Set your store&apos;s currency and language</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 max-w-2xl">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" /> Currency
                    </label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="input-field"
                    >
                        <option value="USD">USD - US Dollar ($)</option>
                        <option value="EUR">EUR - Euro (€)</option>
                        <option value="GBP">GBP - British Pound (£)</option>
                        <option value="INR">INR - Indian Rupee (₹)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Languages className="w-4 h-4 text-gray-400" /> Language
                    </label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="input-field"
                    >
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Timezone</label>
                    <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="input-field"
                    >
                        <option value="UTC">UTC (Coordinated Universal Time)</option>
                        <option value="EST">EST (Eastern Standard Time)</option>
                        <option value="PST">PST (Pacific Standard Time)</option>
                        <option value="IST">IST (Indian Standard Time)</option>
                    </select>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button className="btn-primary px-8">
                    <Save className="w-4 h-4 mr-2 inline" />
                    Save Settings
                </button>
            </div>
        </div>
    );
}

function NotificationSettings() {
    const [notifications, setNotifications] = useState({
        orders: true,
        stock: true,
        reviews: false,
        reports: false,
    });

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="glass-card p-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                    <Bell className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900">Notifications</h4>
                    <p className="text-sm text-gray-500">Manage how you receive alerts</p>
                </div>
            </div>

            <div className="space-y-6">
                {[
                    { id: 'orders', title: 'New Order Alerts', desc: 'Get notified when a new order is received' },
                    { id: 'stock', title: 'Low Stock Warnings', desc: 'Alert when product stock falls below threshold' },
                    { id: 'reviews', title: 'Customer Reviews', desc: 'Receive notifications for new product reviews' },
                    { id: 'reports', title: 'Daily Sales Report', desc: 'Receive a daily summary of sales via email' },
                ].map((item) => (
                    <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl transition-colors ${notifications[item.id as keyof typeof notifications] ? 'bg-primary-50 border border-primary-100' : 'bg-gray-50 border border-transparent'}`}>
                        <div>
                            <h5 className={`font-bold transition-colors ${notifications[item.id as keyof typeof notifications] ? 'text-primary-900' : 'text-gray-900'}`}>{item.title}</h5>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications[item.id as keyof typeof notifications]}
                                onChange={() => toggleNotification(item.id as keyof typeof notifications)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-end">
                <button className="btn-primary px-8">
                    <Save className="w-4 h-4 mr-2 inline" />
                    Save Preferences
                </button>
            </div>
        </div>
    );
}

function SecuritySettings() {
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className="glass-card p-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                    <Shield className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900">Security</h4>
                    <p className="text-sm text-gray-500">Protect your account and store</p>
                </div>
            </div>

            <div className="max-w-xl space-y-6">
                <div>
                    <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-gray-400" /> Change Password
                    </h5>
                    <div className="space-y-4">
                        <input type="password" placeholder="Current Password" className="input-field" />
                        <input type="password" placeholder="New Password" className="input-field" />
                        <input type="password" placeholder="Confirm New Password" className="input-field" />
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h5 className="font-bold text-gray-900">Two-Factor Authentication</h5>
                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={twoFactor}
                                onChange={(e) => setTwoFactor(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button className="btn-primary px-8">
                    <Save className="w-4 h-4 mr-2 inline" />
                    Update Security
                </button>
            </div>
        </div>
    );
}

function AppearanceSettings() {
    const [theme, setTheme] = useState('light');
    const [accentColor, setAccentColor] = useState('bg-blue-500');

    return (
        <div className="glass-card p-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <Palette className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900">Appearance</h4>
                    <p className="text-sm text-gray-500">Customize the look and feel</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h5 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Theme Mode</h5>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setTheme('light')}
                            className={`flex-1 p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${theme === 'light' ? 'border-primary-500 bg-primary-50' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
                        >
                            <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-primary-600' : 'text-gray-400'}`} />
                            <span className={`font-bold ${theme === 'light' ? 'text-primary-700' : 'text-gray-600'}`}>Light</span>
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`flex-1 p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${theme === 'dark' ? 'border-primary-500 bg-primary-50' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
                        >
                            <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-primary-600' : 'text-gray-400'}`} />
                            <span className={`font-medium ${theme === 'dark' ? 'text-primary-700' : 'text-gray-600'}`}>Dark</span>
                        </button>
                    </div>
                </div>

                <div>
                    <h5 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Accent Color</h5>
                    <div className="flex gap-4">
                        {['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-rose-500'].map((color, idx) => (
                            <button
                                key={idx}
                                onClick={() => setAccentColor(color)}
                                className={`w-10 h-10 rounded-full ${color} shadow-lg hover:scale-110 transition-transform ${accentColor === color ? 'ring-4 ring-gray-200 ring-offset-2' : ''}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button className="btn-primary px-8">
                    <Save className="w-4 h-4 mr-2 inline" />
                    Save Appearance
                </button>
            </div>
        </div>
    );
}
