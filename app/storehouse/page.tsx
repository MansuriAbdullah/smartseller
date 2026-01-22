'use client';

import Shell from '@/components/layout/Shell';
import { Warehouse, ArrowUpRight, ArrowDownRight, Package, AlertTriangle, Activity } from 'lucide-react';

export default function StorehousePage() {
    return (
        <Shell>
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Storehouse</h2>
                    <p className="text-gray-600">Inventory locations and stock movement tracking</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="metric-card">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">Total Items</p>
                            <Package className="w-5 h-5 text-primary-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">12,458</h3>
                        <p className="text-sm text-success-600 flex items-center mt-2">
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                            +4.5% vs last week
                        </p>
                    </div>

                    <div className="metric-card">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
                            <AlertTriangle className="w-5 h-5 text-warning-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">24</h3>
                        <p className="text-sm text-danger-600 flex items-center mt-2">
                            <Activity className="w-4 h-4 mr-1" />
                            Requires attention
                        </p>
                    </div>

                    <div className="metric-card">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">Incoming Stock</p>
                            <ArrowUpRight className="w-5 h-5 text-success-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">1,200</h3>
                        <p className="text-sm text-gray-500 mt-2">Expected by tomorrow</p>
                    </div>

                    <div className="metric-card">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">Outgoing Stock</p>
                            <ArrowDownRight className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">842</h3>
                        <p className="text-sm text-gray-500 mt-2">Being processed</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass-card p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Warehouse className="w-5 h-5 text-primary-600" />
                            Warehouse Locations
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Main Warehouse (A1)', capacity: 85, location: 'San Francisco, CA', items: 8450 },
                                { name: 'East Coast Hub (B2)', capacity: 62, location: 'Newark, NJ', items: 3208 },
                                { name: 'Regional Center (C1)', capacity: 45, location: 'Austin, TX', items: 800 },
                            ].map((wh, idx) => (
                                <div key={idx} className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50/50 transition-colors">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{wh.name}</h4>
                                            <p className="text-sm text-gray-500">{wh.location}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">{wh.items.toLocaleString()} items</p>
                                            <p className="text-xs text-gray-500">{wh.capacity}% full</p>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${wh.capacity > 80 ? 'bg-danger-500' : 'bg-primary-500'}`}
                                            style={{ width: `${wh.capacity}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
                        <div className="space-y-6">
                            {[
                                { event: 'Stock In: Headphones', time: '2 mins ago', type: 'in' },
                                { event: 'Stock Out: Smartwatch', time: '15 mins ago', type: 'out' },
                                { event: 'Stock Adjusted: Camera', time: '45 mins ago', type: 'adj' },
                                { event: 'New Item: Drone X5', time: '1 hour ago', type: 'new' },
                                { event: 'Threshold Alert: Monitor', time: '3 hours ago', type: 'alert' },
                            ].map((act, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${act.type === 'in' ? 'bg-success-500' :
                                            act.type === 'out' ? 'bg-primary-500' :
                                                act.type === 'alert' ? 'bg-danger-500' : 'bg-warning-500'
                                        }`}></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{act.event}</p>
                                        <p className="text-xs text-gray-500">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 bg-gray-50 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                            View Full Log
                        </button>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
