'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, Trash2, Edit2, RefreshCw, X, Check } from 'lucide-react';

const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'completed', 'cancelled'];
const STATUS_COLORS: any = {
    pending: { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)' },
    processing: { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.3)' },
    shipped: { color: '#818cf8', bg: 'rgba(129,140,248,0.12)', border: 'rgba(129,140,248,0.3)' },
    delivered: { color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
    completed: { color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
    cancelled: { color: '#f87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)' },
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [editModal, setEditModal] = useState<any>(null);
    const [editStatus, setEditStatus] = useState('');
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        const params = new URLSearchParams({ page: String(page), keyword, status: statusFilter });
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders?${params}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
            setOrders(data.orders);
            setTotal(data.total);
            setPages(data.pages);
        }
        setLoading(false);
    }, [page, keyword, statusFilter]);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this order?')) return;
        setActionLoading(id);
        const token = localStorage.getItem('adminToken');
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${id}`, {
            method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
        });
        await fetchOrders();
        setActionLoading(null);
    };

    const handleUpdateStatus = async () => {
        if (!editModal) return;
        setActionLoading(editModal._id);
        const token = localStorage.getItem('adminToken');
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${editModal._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status: editStatus })
        });
        setEditModal(null);
        await fetchOrders();
        setActionLoading(null);
    };

    return (
        <div style={{ padding: '32px', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 4px' }}>All Orders</h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>{total} total orders</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['all', ...ORDER_STATUSES].map(s => (
                        <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }} style={{
                            padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '600',
                            border: statusFilter === s ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.08)',
                            background: statusFilter === s ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                            color: statusFilter === s ? '#a5b4fc' : 'rgba(255,255,255,0.4)',
                            cursor: 'pointer', textTransform: 'capitalize'
                        }}>{s}</button>
                    ))}
                </div>
            </div>

            {/* Search */}
            <div style={{ position: 'relative', maxWidth: '380px', marginBottom: '20px' }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                <input
                    value={keyword}
                    onChange={e => { setKeyword(e.target.value); setPage(1); }}
                    placeholder="Search by name, order code, phone..."
                    style={{
                        width: '100%', padding: '10px 10px 10px 36px',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box'
                    }}
                />
            </div>

            <div style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', overflow: 'hidden'
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                {['Order Code', 'Customer', 'Seller/Shop', 'Total', 'Cost', 'Status', 'Payment', 'Date', 'Actions'].map(h => (
                                    <th key={h} style={{
                                        padding: '13px 14px', textAlign: 'left', fontSize: '10px',
                                        fontWeight: '700', color: 'rgba(255,255,255,0.4)',
                                        textTransform: 'uppercase', letterSpacing: '0.05em'
                                    }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={9} style={{ padding: '50px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading...</td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan={9} style={{ padding: '50px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No orders found</td></tr>
                            ) : orders.map(o => {
                                const sc = STATUS_COLORS[o.status] || STATUS_COLORS.pending;
                                return (
                                    <tr key={o._id}
                                        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                    >
                                        <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: '#a5b4fc', fontSize: '12px', fontWeight: '600' }}>
                                            {o.order_code}
                                        </td>
                                        <td style={{ padding: '12px 14px' }}>
                                            <div style={{ fontWeight: '600', fontSize: '13px' }}>{o.customer_name}</div>
                                            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{o.customer_phone || ''}</div>
                                        </td>
                                        <td style={{ padding: '12px 14px' }}>
                                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{o.seller?.name || '—'}</div>
                                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{o.seller?.shop_name || ''}</div>
                                        </td>
                                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#10b981' }}>
                                            ₹{parseFloat(o.order_total || '0').toFixed(2)}
                                        </td>
                                        <td style={{ padding: '12px 14px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                                            ₹{(o.cost_amount || 0).toFixed(2)}
                                        </td>
                                        <td style={{ padding: '12px 14px' }}>
                                            <span style={{
                                                padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
                                                background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color,
                                                textTransform: 'capitalize'
                                            }}>{o.status}</span>
                                        </td>
                                        <td style={{ padding: '12px 14px' }}>
                                            <span style={{
                                                padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600',
                                                background: o.payment_status === 'paid' ? 'rgba(16,185,129,0.12)' : 'rgba(251,191,36,0.12)',
                                                color: o.payment_status === 'paid' ? '#10b981' : '#fbbf24',
                                                textTransform: 'capitalize'
                                            }}>{o.payment_status}</span>
                                        </td>
                                        <td style={{ padding: '12px 14px', color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
                                            {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '—'}
                                        </td>
                                        <td style={{ padding: '12px 14px' }}>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <button
                                                    onClick={() => { setEditModal(o); setEditStatus(o.status); }}
                                                    style={{
                                                        background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                                                        borderRadius: '7px', padding: '6px 8px', cursor: 'pointer',
                                                        color: '#818cf8', display: 'flex'
                                                    }}
                                                ><Edit2 size={13} /></button>
                                                <button
                                                    onClick={() => handleDelete(o._id)}
                                                    disabled={actionLoading === o._id}
                                                    style={{
                                                        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                                                        borderRadius: '7px', padding: '6px 8px', cursor: 'pointer',
                                                        color: '#f87171', display: 'flex'
                                                    }}
                                                ><Trash2 size={13} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {pages > 1 && (
                    <div style={{ padding: '16px', display: 'flex', justifyContent: 'center', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        {Array.from({ length: Math.min(pages, 10) }, (_, i) => i + 1).map(p => (
                            <button key={p} onClick={() => setPage(p)} style={{
                                width: '36px', height: '36px', borderRadius: '8px', border: 'none',
                                background: p === page ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.06)',
                                color: p === page ? 'white' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer', fontWeight: '600', fontSize: '14px'
                            }}>{p}</button>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: '#1a1740', border: '1px solid rgba(99,102,241,0.3)',
                        borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '380px'
                    }}>
                        <h3 style={{ margin: '0 0 6px', color: 'white', fontSize: '18px', fontWeight: '700' }}>Update Order Status</h3>
                        <p style={{ margin: '0 0 20px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontFamily: 'monospace' }}>{editModal.order_code}</p>
                        <select
                            value={editStatus}
                            onChange={e => setEditStatus(e.target.value)}
                            style={{
                                width: '100%', padding: '12px', background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                                color: 'white', fontSize: '14px', outline: 'none', marginBottom: '20px',
                                textTransform: 'capitalize'
                            }}
                        >
                            {ORDER_STATUSES.map(s => (
                                <option key={s} value={s} style={{ background: '#1a1740', textTransform: 'capitalize' }}>{s}</option>
                            ))}
                        </select>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => setEditModal(null)} style={{
                                flex: 1, padding: '11px', background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                                color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontWeight: '600'
                            }}>Cancel</button>
                            <button onClick={handleUpdateStatus} style={{
                                flex: 1, padding: '11px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer', fontWeight: '700',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                            }}><Check size={16} /> Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
