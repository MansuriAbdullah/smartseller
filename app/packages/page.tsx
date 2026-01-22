'use client';

import Shell from '@/components/layout/Shell';
import { Truck, Package, Box, Search, MapPin, ExternalLink, Calendar, ChevronRight } from 'lucide-react';

export default function PackagesPage() {
    return (
        <Shell>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Packages</h2>
                        <p className="text-gray-600 focus:outline-none">Shipment tracking and logistics management</p>
                    </div>
                    <button className="btn-primary">
                        <Box className="w-5 h-5 mr-2 inline" />
                        Create Shipment
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 space-y-6">
                        {/* Active Shipments */}
                        <div className="glass-card overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-primary-600" />
                                    Active Shipments
                                </h3>
                                <div className="flex bg-gray-100 p-1 rounded-lg text-xs font-semibold">
                                    <button className="px-3 py-1 bg-white shadow rounded text-primary-600">All (12)</button>
                                    <button className="px-3 py-1 rounded text-gray-500">In Transit (8)</button>
                                    <button className="px-3 py-1 rounded text-gray-500">Delivered (4)</button>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {[
                                    { id: 'PKG-1025', status: 'In Transit', origin: 'SF Warehouse', dest: 'New York, NY', carrier: 'FedEx', date: '2026-01-22' },
                                    { id: 'PKG-1024', status: 'Out for Delivery', origin: 'NJ Hub', dest: 'Jersey City, NJ', carrier: 'UPS', date: '2026-01-21' },
                                    { id: 'PKG-1023', status: 'Processing', origin: 'Main Warehouse', dest: 'Los Angeles, CA', carrier: 'DHL', date: '2026-01-20' },
                                    { id: 'PKG-1022', status: 'In Transit', origin: 'TX Center', dest: 'Austin, TX', carrier: 'Local', date: '2026-01-20' },
                                ].map((pkg, idx) => (
                                    <div key={idx} className="p-6 hover:bg-gray-50/50 transition-colors group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-primary-50 rounded-2xl group-hover:bg-primary-100 transition-colors">
                                                    <Package className="w-6 h-6 text-primary-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{pkg.id}</p>
                                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" /> {pkg.date}
                                                    </p>
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">{pkg.carrier}</span>
                                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pkg.status === 'Out for Delivery' ? 'bg-success-100 text-success-700' :
                                                                pkg.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-warning-100 text-warning-700'
                                                            }`}>{pkg.status}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-1 items-center gap-4 max-w-md">
                                                <div className="shrink-0 text-center">
                                                    <p className="text-xs font-semibold text-gray-400 uppercase">Origin</p>
                                                    <p className="text-sm font-bold text-gray-700">{pkg.origin}</p>
                                                </div>
                                                <div className="flex-1 h-px bg-dashed border-t-2 border-gray-200 relative">
                                                    <Truck className={`w-4 h-4 text-primary-500 absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ${pkg.status === 'In Transit' ? 'left-1/2' : 'left-[80%]'}`} />
                                                </div>
                                                <div className="shrink-0 text-center text-right">
                                                    <p className="text-xs font-semibold text-gray-400 uppercase">Destination</p>
                                                    <p className="text-sm font-bold text-gray-700">{pkg.dest}</p>
                                                </div>
                                            </div>

                                            <button className="p-2 hover:bg-primary-50 rounded-xl text-primary-600 transition-all self-end md:self-center">
                                                <ExternalLink className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-6">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Truck className="w-4 h-4 text-primary-600" />
                                Carrier Performance
                            </h4>
                            <div className="space-y-4">
                                {[
                                    { name: 'FedEx', rate: 98.5, time: '1.2 days' },
                                    { name: 'UPS', rate: 96.2, time: '2.5 days' },
                                    { name: 'DHL', rate: 94.8, time: '3.1 days' },
                                ].map((carrier, idx) => (
                                    <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-bold text-gray-700">{carrier.name}</span>
                                            <span className="text-xs font-bold text-success-600">{carrier.rate}%</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500">Avg Delivery: {carrier.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="premium-card p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                            <Box className="w-8 h-8 opacity-50 mb-4" />
                            <h4 className="font-bold mb-1">Quick Tracking</h4>
                            <p className="text-xs text-white/80 mb-4 focus:outline-none">Enter tracking ID for instant info</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Order or PKG ID"
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white/50"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/20 rounded-lg">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
