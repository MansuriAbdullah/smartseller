'use client';

import { useState } from 'react';
import { mockProducts } from '@/lib/mockData';
import Shell from '@/components/layout/Shell';
import { Plus, Search, Filter, Grid, List, MoreVertical, Edit, Trash2, Tag } from 'lucide-react';
import Image from 'next/image';

export default function ProductsPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Shell>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Products</h2>
                        <p className="text-gray-600 focus:outline-none">Manage your inventory and product listings</p>
                    </div>
                    <button className="btn-primary w-full md:w-auto">
                        <Plus className="w-5 h-5 mr-2 inline" />
                        Add New Product
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button className="btn-secondary flex-1 md:flex-none">
                            <Filter className="w-4 h-4 mr-2 inline" />
                            Filters
                        </button>
                        <div className="h-10 w-[1px] bg-gray-200 mx-2 hidden md:block"></div>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-primary-600' : 'text-gray-400'}`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-primary-600' : 'text-gray-400'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {mockProducts.map((product) => (
                            <div key={product.id} className="premium-card group overflow-hidden flex flex-col h-full">
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <div className="absolute top-2 left-2 z-10">
                                        {product.isFeatured && (
                                            <span className="badge badge-success">FEATURED</span>
                                        )}
                                    </div>
                                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-white/90 backdrop-blur rounded-full shadow hover:bg-white transition-colors">
                                            <MoreVertical className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                    <div className="w-full h-full flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-500">
                                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                                            <Tag className="w-12 h-12 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="mb-2">
                                        <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">{product.name}</h3>
                                        <p className="text-sm text-gray-500">{product.category}</p>
                                    </div>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
                                            <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 hover:bg-primary-50 text-gray-400 hover:text-primary-600 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-danger-50 text-gray-400 hover:text-danger-600 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-card overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Product</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Category</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Price</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Stock</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mockProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900">${product.price.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <span className={`badge ${product.stock > 10 ? 'badge-success' : 'badge-warning'}`}>
                                                {product.stock > 10 ? 'In Stock' : 'Low Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg hover:text-primary-600 transition-all"><Edit className="w-4 h-4" /></button>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg hover:text-danger-600 transition-all"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Shell>
    );
}
