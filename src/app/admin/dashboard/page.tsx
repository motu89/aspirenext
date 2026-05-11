'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  _id: string;
  id: string;
  productName: string;
  product?: string;
  selectedSize?: string;
  size?: string;
  color?: string;
  quantity?: string;
  price: string;
  totalPrice?: string;
  name?: string;
  customer?: string;
  address?: string;
  postcode?: string;
  whatsapp?: string;
  selectedImage?: string;
  paymentMethod?: string;
  unit?: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: string;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: '#fef3c7', text: '#92400e' },
  processing: { bg: '#dbeafe', text: '#1e40af' },
  completed: { bg: '#d1fae5', text: '#065f46' },
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const refreshOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem('aspire_admin_auth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    let cancelled = false;
    const loadOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (!cancelled && data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
      if (!cancelled) setLoading(false);
    };
    loadOrders();
    return () => { cancelled = true; };
  }, [router]);

  const filteredOrders = useMemo(() => {
    let result = orders;
    if (statusFilter !== 'all') {
      result = result.filter((o) => o.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id?.toLowerCase().includes(q) ||
          o.productName?.toLowerCase().includes(q) ||
          o.customer?.toLowerCase().includes(q) ||
          o.name?.toLowerCase().includes(q) ||
          o.whatsapp?.includes(q) ||
          o.postcode?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [orders, searchQuery, statusFilter]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus as Order['status'] } : o))
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        if (viewingOrder?._id === orderId) setViewingOrder(null);
      }
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('Are you sure you want to delete ALL orders? This cannot be undone.')) return;
    try {
      const res = await fetch('/api/orders', {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setOrders([]);
      }
    } catch (error) {
      console.error('Failed to delete all orders:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aspire_admin_auth');
    router.push('/admin');
  };

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const processingCount = orders.filter((o) => o.status === 'processing').length;
  const completedCount = orders.filter((o) => o.status === 'completed').length;

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f0f0f5' }}>
      {/* Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 min-h-screen text-white"
        style={{ background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' }}
      >
        <div className="p-6 border-b border-white/20">
          <h1 className="text-xl font-bold">Aspire Admin</h1>
          <p className="text-xs opacity-80 mt-1">Order Management Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/20 text-sm font-semibold"
          >
            <i className="fa fa-home" />
            Dashboard
          </a>
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            <i className="fa fa-store" />
            View Website
          </a>
        </nav>
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            <i className="fa fa-sign-out" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div
          className="lg:hidden flex items-center justify-between px-4 py-3 text-white"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <h1 className="text-lg font-bold">Aspire Admin</h1>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm">
              <i className="fa fa-store mr-1" />
              <span className="hidden sm:inline">Website</span>
            </a>
            <button onClick={handleLogout} className="text-sm">
              <i className="fa fa-sign-out mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-x-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase" style={{ color: '#8b7355' }}>Pending</p>
                  <p className="text-3xl font-bold mt-1" style={{ color: '#92400e' }}>{pendingCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fef3c7' }}>
                  <i className="fa fa-clock text-xl" style={{ color: '#92400e' }} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase" style={{ color: '#8b7355' }}>Processing</p>
                  <p className="text-3xl font-bold mt-1" style={{ color: '#1e40af' }}>{processingCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dbeafe' }}>
                  <i className="fa fa-spinner text-xl" style={{ color: '#1e40af' }} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase" style={{ color: '#8b7355' }}>Completed</p>
                  <p className="text-3xl font-bold mt-1" style={{ color: '#065f46' }}>{completedCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#d1fae5' }}>
                  <i className="fa fa-check text-xl" style={{ color: '#065f46' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="flex-1 relative">
              <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#8b7355' }} />
              <input
                type="text"
                placeholder="Search orders by ID, name, product, WhatsApp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
                style={{ borderColor: '#d4c4a8', backgroundColor: '#f5f1e9', color: '#5e3a1c' }}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-warm-accent"
                style={{ borderColor: '#d4c4a8', backgroundColor: '#f5f1e9', color: '#5e3a1c' }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={refreshOrders}
                className="px-4 py-2.5 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#667eea' }}
              >
                <i className="fa fa-refresh mr-1" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              {orders.length > 0 && (
                <button
                  onClick={handleDeleteAll}
                  className="px-4 py-2.5 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#ef3f35' }}
                >
                  <i className="fa fa-trash mr-1" />
                  <span className="hidden sm:inline">Delete All</span>
                </button>
              )}
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <i className="fa fa-spinner fa-spin text-2xl" style={{ color: '#8b5a2b' }} />
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20" style={{ color: '#8b7355' }}>
                <i className="fa fa-inbox text-4xl mb-3" style={{ color: '#d4c4a8' }} />
                <p className="font-semibold">No orders found</p>
                <p className="text-sm mt-1">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter'
                    : 'Orders will appear here when customers place them'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: '#f5f1e9' }}>
                      <th className="text-left px-4 py-3 font-semibold" style={{ color: '#5e3a1c' }}>Order ID</th>
                      <th className="text-left px-4 py-3 font-semibold" style={{ color: '#5e3a1c' }}>Customer</th>
                      <th className="text-left px-4 py-3 font-semibold" style={{ color: '#5e3a1c' }}>Product</th>
                      <th className="text-left px-4 py-3 font-semibold hidden md:table-cell" style={{ color: '#5e3a1c' }}>Size</th>
                      <th className="text-left px-4 py-3 font-semibold hidden md:table-cell" style={{ color: '#5e3a1c' }}>Colour</th>
                      <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell" style={{ color: '#5e3a1c' }}>Qty</th>
                      <th className="text-left px-4 py-3 font-semibold" style={{ color: '#5e3a1c' }}>Total</th>
                      <th className="text-left px-4 py-3 font-semibold" style={{ color: '#5e3a1c' }}>Status</th>
                      <th className="text-left px-4 py-3 font-semibold" style={{ color: '#5e3a1c' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: '#e8e2d6' }}>
                        <td className="px-4 py-3">
                          <div>
                            <span className="font-semibold text-xs" style={{ color: '#8b5a2b' }}>{order.id}</span>
                            <p className="text-xs mt-0.5" style={{ color: '#8b7355' }}>{formatDate(order.createdAt)}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-semibold" style={{ color: '#5e3a1c' }}>{order.customer || order.name}</p>
                            {order.whatsapp && (
                              <a
                                href={`https://wa.me/${order.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs flex items-center gap-1 mt-0.5"
                                style={{ color: '#25D366' }}
                              >
                                <i className="fa fa-whatsapp" />
                                {order.whatsapp}
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {order.selectedImage && (
                              <img
                                src={order.selectedImage}
                                alt=""
                                className="w-10 h-10 rounded object-cover shrink-0"
                              />
                            )}
                            <div className="min-w-0">
                              <p className="font-medium truncate" style={{ color: '#5e3a1c' }} title={order.product || order.productName}>
                                {order.productName}
                              </p>
                              {order.address && (
                                <p className="text-xs truncate max-w-[150px]" style={{ color: '#8b7355' }} title={order.address}>
                                  {order.address}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell text-xs" style={{ color: '#553b0a' }}>
                          {order.selectedSize || order.size || '-'}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell text-xs" style={{ color: '#553b0a' }}>
                          {order.color || '-'}
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell text-xs" style={{ color: '#553b0a' }}>
                          {order.quantity || '-'}
                        </td>
                        <td className="px-4 py-3 font-bold" style={{ color: '#8b5a2b' }}>
                          {order.totalPrice || order.price}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="px-2 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer"
                            style={{
                              backgroundColor: statusColors[order.status]?.bg || '#f3f4f6',
                              color: statusColors[order.status]?.text || '#374151',
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setViewingOrder(order)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                              title="View order details"
                            >
                              <i className="fa fa-eye text-xs" style={{ color: '#667eea' }} />
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(order._id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                              title="Delete order"
                            >
                              <i className="fa fa-trash text-xs" style={{ color: '#ef3f35' }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && filteredOrders.length > 0 && (
              <div className="px-4 py-3 border-t flex items-center justify-between text-xs" style={{ borderColor: '#e8e2d6', color: '#8b7355' }}>
                <span>Showing {filteredOrders.length} of {orders.length} orders</span>
                <span>Total orders: {orders.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Order Detail Modal */}
      {viewingOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setViewingOrder(null); }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#e8e2d6' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#667eea' }}>
                  <i className="fa fa-file-text text-white text-sm" />
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: '#5e3a1c' }}>Order Details</h2>
                  <p className="text-xs" style={{ color: '#8b7355' }}>{viewingOrder.id}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <i className="fa fa-times" style={{ color: '#8b7355' }} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-5">
              {/* Product Image */}
              {viewingOrder.selectedImage && (
                <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#f5f1e9' }}>
                  <img
                    src={viewingOrder.selectedImage}
                    alt={viewingOrder.productName}
                    className="w-full object-cover"
                    style={{ aspectRatio: '16/9' }}
                  />
                </div>
              )}

              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: statusColors[viewingOrder.status]?.bg || '#f3f4f6',
                    color: statusColors[viewingOrder.status]?.text || '#374151',
                  }}
                >
                  {statusLabels[viewingOrder.status] || viewingOrder.status}
                </span>
                <span className="text-xs" style={{ color: '#8b7355' }}>
                  <i className="fa fa-calendar mr-1" />
                  {formatDate(viewingOrder.createdAt)}
                </span>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: '#f5f1e9' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#8b7355' }}>Product Name</p>
                  <p className="text-sm font-bold" style={{ color: '#5e3a1c' }}>{viewingOrder.productName}</p>
                  {viewingOrder.product && viewingOrder.product !== viewingOrder.productName && (
                    <p className="text-xs mt-0.5" style={{ color: '#8b7355' }}>{viewingOrder.product}</p>
                  )}
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: '#f5f1e9' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#8b7355' }}>Total Price</p>
                  <p className="text-sm font-bold" style={{ color: '#8b5a2b' }}>{viewingOrder.totalPrice || viewingOrder.price}</p>
                  {viewingOrder.price && viewingOrder.totalPrice && viewingOrder.price !== viewingOrder.totalPrice && (
                    <p className="text-xs mt-0.5" style={{ color: '#8b7355' }}>Unit: {viewingOrder.price}</p>
                  )}
                </div>
              </div>

              {/* Customer Details */}
              <div>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#5e3a1c' }}>
                  <i className="fa fa-user" style={{ color: '#667eea' }} />
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#faf8f4' }}>
                    <i className="fa fa-user-circle text-sm" style={{ color: '#8b7355' }} />
                    <div>
                      <p className="text-xs" style={{ color: '#8b7355' }}>Name</p>
                      <p className="text-sm font-semibold" style={{ color: '#5e3a1c' }}>{viewingOrder.customer || viewingOrder.name || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#faf8f4' }}>
                    <i className="fa fa-whatsapp text-sm" style={{ color: '#25D366' }} />
                    <div>
                      <p className="text-xs" style={{ color: '#8b7355' }}>WhatsApp</p>
                      {viewingOrder.whatsapp ? (
                        <a
                          href={`https://wa.me/${viewingOrder.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold hover:underline"
                          style={{ color: '#25D366' }}
                        >
                          {viewingOrder.whatsapp}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold" style={{ color: '#5e3a1c' }}>N/A</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#faf8f4' }}>
                    <i className="fa fa-map-marker text-sm mt-0.5" style={{ color: '#ef3f35' }} />
                    <div>
                      <p className="text-xs" style={{ color: '#8b7355' }}>Delivery Address</p>
                      <p className="text-sm font-semibold" style={{ color: '#5e3a1c' }}>{viewingOrder.address || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#faf8f4' }}>
                    <i className="fa fa-location-dot text-sm" style={{ color: '#8b7355' }} />
                    <div>
                      <p className="text-xs" style={{ color: '#8b7355' }}>Postcode</p>
                      <p className="text-sm font-semibold" style={{ color: '#5e3a1c' }}>{viewingOrder.postcode || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Options */}
              <div>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: '#5e3a1c' }}>
                  <i className="fa fa-cog" style={{ color: '#667eea' }} />
                  Order Options
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f5f1e9' }}>
                    <p className="text-xs" style={{ color: '#8b7355' }}>Size</p>
                    <p className="text-sm font-bold mt-0.5" style={{ color: '#5e3a1c' }}>{viewingOrder.selectedSize || viewingOrder.size || '-'}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f5f1e9' }}>
                    <p className="text-xs" style={{ color: '#8b7355' }}>Colour</p>
                    <p className="text-sm font-bold mt-0.5" style={{ color: '#5e3a1c' }}>{viewingOrder.color || '-'}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f5f1e9' }}>
                    <p className="text-xs" style={{ color: '#8b7355' }}>Qty</p>
                    <p className="text-sm font-bold mt-0.5" style={{ color: '#5e3a1c' }}>{viewingOrder.quantity || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: '#e8f5e9' }}>
                <i className="fa fa-money" style={{ color: '#25D366' }} />
                <div>
                  <p className="text-xs" style={{ color: '#8b7355' }}>Payment Method</p>
                  <p className="text-sm font-bold" style={{ color: '#065f46' }}>{viewingOrder.paymentMethod || 'Cash on Delivery'}</p>
                </div>
              </div>

              {/* Unit info */}
              {viewingOrder.unit && (
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: '#faf8f4' }}>
                  <i className="fa fa-cube" style={{ color: '#8b7355' }} />
                  <div>
                    <p className="text-xs" style={{ color: '#8b7355' }}>Unit</p>
                    <p className="text-sm font-semibold" style={{ color: '#5e3a1c' }}>{viewingOrder.unit}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: '#e8e2d6' }}>
              {viewingOrder.whatsapp && (
                <a
                  href={`https://wa.me/${viewingOrder.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, regarding your order ${viewingOrder.id} for ${viewingOrder.productName}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <i className="fa fa-whatsapp" />
                  Message on WhatsApp
                </a>
              )}
              <button
                onClick={() => setViewingOrder(null)}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{ backgroundColor: '#f5f1e9', color: '#5e3a1c' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
