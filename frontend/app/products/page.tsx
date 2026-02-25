'use client';

import { useState, useEffect } from 'react';
import Shell from '@/components/layout/Shell';
import { Plus, Search, Filter, Grid, List, MoreVertical, Edit, Trash2, Tag, LayoutGrid, Package, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Fetch stats for category counts and plan info
            const statsRes = await api.get('/sellers/stats');
            if (statsRes.success) {
                setStats(statsRes.stats);
            }

            // Fetch products
            const url = `/products/my-products${searchQuery ? `?keyword=${searchQuery}` : ''}`;
            const response = await api.get(url);
            if (response.success) {
                setProducts(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching products page data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user, searchQuery]);

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const handleDeleteProduct = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
        try {
            const response = await api.delete(`/products/${id}`);
            if (response.success) {
                fetchData();
            }
        } catch (error: any) {
            alert('Error deleting product: ' + error.message);
        }
    };

    if (authLoading || (!user)) return null;

    return (
        <Shell>
            <div className="space-y-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Products</h2>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">Inventory Management</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Header Stats Tokens */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-2xl shadow-sm">
                            <Package className="w-4 h-4 text-primary-500" />
                            <div className="flex flex-col">
                                <span className="text-[10px] items-center font-bold text-gray-400 uppercase leading-none">Total Products</span>
                                <span className="text-sm font-black text-gray-900 leading-none mt-1">{stats?.totalProducts || 0}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-2xl shadow-sm">
                            <AlertCircle className="w-4 h-4 text-warning-500" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">Remaining</span>
                                <span className="text-sm font-black text-gray-900 leading-none mt-1">{stats?.remainingProducts || 0}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-indigo-700 rounded-2xl shadow-lg border-none">
                            <CheckCircle2 className="w-4 h-4 text-white/80" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-white/60 uppercase leading-none">Purchased Plan</span>
                                <span className="text-sm font-black text-white leading-none mt-1">{stats?.planName || 'Free Plan'}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/storehouse')}
                            className="bg-success-600 hover:bg-success-700 text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-success-100 ml-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Product
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    {/* Category Sidebar */}
                    <div className="lg:col-span-1 space-y-4 sticky top-24">
                        <div className="glass-card p-4">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Filter className="w-4 h-4 text-primary-500" />
                                Categories
                            </h3>
                            <div className="space-y-1">
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === 'All' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <span>All Products</span>
                                    <span className={selectedCategory === 'All' ? 'text-white' : 'text-gray-400'}>{stats?.totalProducts || 0}</span>
                                </button>
                                {stats?.categoryCounts?.map((cat: any) => (
                                    <button
                                        key={cat._id}
                                        onClick={() => setSelectedCategory(cat._id === null ? 'Unknown' : cat._id)}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === (cat._id === null ? 'Unknown' : cat._id) ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <span className="truncate mr-2">{cat._id || 'Uncategorized'}</span>
                                        <span className={selectedCategory === (cat._id === null ? 'Unknown' : cat._id) ? 'text-white' : 'text-gray-400'}>{cat.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search in Categories Area */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-bold"
                            />
                        </div>
                    </div>

                    {/* Compact Product List */}
                    <div className="lg:col-span-3">
                        <div className="glass-card overflow-hidden">
                            {isLoading ? (
                                <div className="text-center py-20 text-gray-500">Loading products...</div>
                            ) : filteredProducts?.length === 0 ? (
                                <div className="text-center py-20 text-gray-500 flex flex-col items-center gap-4">
                                    <Package className="w-12 h-12 text-gray-200" />
                                    <p className="font-bold">No products found in this category.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Product Info</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hidden md:table-cell">Details</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pricing</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredProducts.map((product) => (
                                                <tr key={product.link_id || product._id} className="group hover:bg-gray-50/80 transition-all">
                                                    <td className="px-6 py-3">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center p-1 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                                                {product.image ? (
                                                                    <img
                                                                        src={product.image.startsWith('http') ? product.image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${product.image}`}
                                                                        alt={product.name}
                                                                        className="w-full h-full object-contain"
                                                                    />
                                                                ) : (
                                                                    <Tag className="w-6 h-6 text-gray-200" />
                                                                )}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <h4 className="text-sm font-black text-gray-900 truncate leading-tight">{product.name}</h4>
                                                                <p className="text-[10px] font-bold text-primary-500 uppercase tracking-widest mt-1">{product.category || 'Standard'}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3 hidden md:table-cell">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold text-gray-500 truncate max-w-[150px]">{product.brand || 'No Brand'}</p>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] font-black px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">Stock: {product.stock || 0}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] font-bold text-gray-400 uppercase">Selling:</span>
                                                                <span className="text-sm font-black text-gray-900">${(product.selling_price || product.price || 0).toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] font-bold text-gray-400 uppercase">Cost:</span>
                                                                <span className="text-[11px] font-bold text-gray-500">${(product.price || 0).toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button
                                                                onClick={() => router.push(`/products/edit/${product._id}`)}
                                                                className="p-2 hover:bg-white hover:shadow-md rounded-xl text-gray-400 hover:text-primary-500 transition-all"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProduct(product._id, product.name)}
                                                                className="p-2 hover:bg-white hover:shadow-md rounded-xl text-gray-400 hover:text-danger-500 transition-all"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                            <button className="p-2 hover:bg-white hover:shadow-md rounded-xl text-gray-400 transition-all">
                                                                <MoreVertical className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
