'use client';

import { useState } from 'react';
import Shell from '@/components/layout/Shell';
import { mockOrders } from '@/lib/mockData';
import { ShoppingCart, Search, Filter, MoreHorizontal, Eye, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function OrdersPage() {
    const [statusFilter, setStatusFilter] = useState('all');

    return (
        <Shell>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Orders</h2>
                        <p className="text-gray-600">Track and manage customer orders</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="btn-secondary">Export Orders</button>
                        <button className="btn-primary">
                            <ShoppingCart className="w-5 h-5 mr-2 inline" />
                            Create Order
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'All Orders', count: 1254, icon: ShoppingCart, color: 'text-primary-600', bg: 'bg-primary-50' },
                        { label: 'Pending', count: 42, icon: Clock, color: 'text-warning-600', bg: 'bg-warning-50' },
                        { label: 'Completed', count: 1180, icon: CheckCircle, color: 'text-success-600', bg: 'bg-success-50' },
                        { label: 'Cancelled', count: 32, icon: XCircle, color: 'text-danger-600', bg: 'bg-danger-50' },
                    ].map((stat, idx) => (
                        <div key={idx} className="glass-card p-4 flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="glass-card overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by Order ID, Customer..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all whitespace-nowrap ${statusFilter === status
                                            ? 'bg-primary-500 text-white shadow-md'
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Order ID</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Customer</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Date</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Total</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Payment</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mockOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-primary-600">#{order.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">{order.customerName}</p>
                                                <p className="text-xs text-gray-500">{order.customerEmail}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-gray-900">${order.totalAmount.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`badge ${order.status === 'completed' ? 'badge-success' :
                                                    order.status === 'processing' ? 'badge-warning' : 'badge-danger'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`flex items-center gap-1.5 text-xs font-semibold ${order.paymentStatus === 'paid' ? 'text-success-600' : 'text-warning-600'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${order.paymentStatus === 'paid' ? 'bg-success-600' : 'bg-warning-600'}`}></div>
                                                {order.paymentStatus.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
