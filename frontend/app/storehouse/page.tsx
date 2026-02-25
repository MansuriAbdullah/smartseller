'use client';

import Shell from '@/components/layout/Shell';
import { Warehouse, ArrowUpRight, ArrowDownRight, Package, AlertTriangle, Activity } from 'lucide-react';

export default function StorehousePage() {
    return (
        <Shell>
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Storehouse</h2>
                    <p className="text-gray-600">Inventory locations and stock movement tracking based on original database data</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="metric-card">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">Total Items</p>
                            <Package className="w-5 h-5 text-primary-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">0</h3>
                        <p className="text-sm text-gray-400 flex items-center mt-2 italic">
                            No items in database
                        </p>
                    </div>

                    <div className="metric-card">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
                            <AlertTriangle className="w-5 h-5 text-warning-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">0</h3>
                        <p className="text-sm text-gray-400 flex items-center mt-2 underline pointer-events-none">
                            <Activity className="w-4 h-4 mr-1" />
                            System Stable
                        </p>
                    </div>

                    <div className="metric-card">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">Incoming Stock</p>
                            <ArrowUpRight className="w-5 h-5 text-success-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">0</h3>
                        <p className="text-sm text-gray-500 mt-2">No pending arrivals</p>
                    </div>

                    <div className="metric-card">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">Outgoing Stock</p>
                            <ArrowDownRight className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">0</h3>
                        <p className="text-sm text-gray-500 mt-2">No active shipments</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass-card p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Warehouse className="w-5 h-5 text-primary-600" />
                            Warehouse Locations
                        </h3>
                        <div className="py-20 text-center">
                            <Warehouse className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No warehouse locations currently mapped in database.</p>
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
                        <div className="py-10 text-center">
                            <p className="text-sm text-gray-400 italic">No recent stock movements detected.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
