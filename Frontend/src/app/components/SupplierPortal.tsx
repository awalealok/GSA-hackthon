import React, { useState } from 'react';
import { Truck, Package, TrendingUp, Clock, CheckCircle2, AlertTriangle, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Topbar } from './Topbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SupplierPortalProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

interface PurchaseOrder {
  po: string;
  items: number;
  value: number;
  due: string;
  status: string;
  priority: string;
}

export function SupplierPortal({ onBack, theme, onToggleTheme }: SupplierPortalProps) {

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    { po: 'PO-9876', items: 847, value: 42300, due: '2026-01-09', status: 'pending', priority: 'high' },
    { po: 'PO-9875', items: 523, value: 28900, due: '2026-01-11', status: 'confirmed', priority: 'medium' },
    { po: 'PO-9874', items: 1247, value: 67800, due: '2026-01-12', status: 'in-transit', priority: 'low' },
    { po: 'PO-9873', items: 342, value: 18500, due: '2026-01-14', status: 'confirmed', priority: 'medium' },
  ]);

  const demandForecast = [
    { week: 'W1', predicted: 2400, actual: 2350 },
    { week: 'W2', predicted: 2600, actual: 2580 },
    { week: 'W3', predicted: 2800, actual: 2820 },
    { week: 'W4', predicted: 3200, actual: null },
    { week: 'W5', predicted: 3400, actual: null },
    { week: 'W6', predicted: 3100, actual: null },
  ];

  const slaMetrics = [
    { metric: 'On-Time Delivery', current: 96.2, target: 95, trend: 'up' },
    { metric: 'Order Accuracy', current: 98.7, target: 98, trend: 'up' },
    { metric: 'Lead Time', current: 3.2, target: 4.0, trend: 'down', unit: 'days' },
    { metric: 'Fill Rate', current: 97.8, target: 95, trend: 'up' },
  ];

  const aiCommunications = [
    { time: '2 hours ago', type: 'forecast', message: 'Predicted 40% demand increase for SKU-2847 next week', action: 'Increase production allocation' },
    { time: '5 hours ago', type: 'alert', message: 'Potential delay detected in shipment PO-9876', action: 'Confirm revised ETA' },
    { time: '1 day ago', type: 'optimization', message: 'Consolidation opportunity: Combine PO-9875 and PO-9874 for 15% cost savings', action: 'Review proposal' },
  ];

  const confirmOrder = (poNumber: string) => {
    setPurchaseOrders(prev =>
      prev.map(order =>
        order.po === poNumber ? { ...order, status: 'confirmed' } : order
      )
    );
  };

  const openOrders = purchaseOrders.length;
  const pendingOrders = purchaseOrders.filter(o => o.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Topbar
        title="Supplier Operations Center"
        portalName="Supplier / Logistics Portal"
        onBack={onBack}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <div className="p-6">
        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="forecast">Demand Forecast</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="ai">AI Communications</TabsTrigger>
          </TabsList>

          {/* ================= ORDERS TAB ================= */}
          <TabsContent value="orders" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Open Orders</CardDescription>
                  <CardTitle className="text-3xl">{openOrders}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">{pendingOrders} pending action</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>On-Time Rate</CardDescription>
                  <CardTitle className="text-3xl text-green-600">96.2%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Above SLA</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Avg Lead Time</CardDescription>
                  <CardTitle className="text-3xl">3.2 days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-green-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">20% faster</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Value</CardDescription>
                  <CardTitle className="text-3xl">$4.2M</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-blue-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">This month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Purchase Orders</CardTitle>
                    <CardDescription>Orders requiring attention</CardDescription>
                  </div>
                  <Button>Export</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseOrders.map((order, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-lg">{order.po}</span>
                            <Badge variant={
                              order.status === 'pending' ? 'destructive' :
                              order.status === 'confirmed' ? 'default' :
                              'outline'
                            }>
                              {order.status}
                            </Badge>
                            <Badge variant="outline">{order.priority} priority</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500 block">Items</span>
                              <span className="font-medium">{order.items.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Value</span>
                              <span className="font-medium">${order.value.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Due Date</span>
                              <span className="font-medium">{order.due}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          {order.status === 'pending' && (
                            <Button size="sm" onClick={() => confirmOrder(order.po)}>
                              Confirm
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= FORECAST TAB ================= */}
          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Demand Forecast Preview</CardTitle>
                <CardDescription>6-week rolling prediction to optimize production planning</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={demandForecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} dot={{ r: 5 }} />
                    <Line type="monotone" dataKey="predicted" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= PERFORMANCE TAB ================= */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  SLA Metrics & Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {slaMetrics.map((metric, i) => (
                  <div key={i} className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span>{metric.metric}</span>
                      <span>{metric.current}{metric.unit || '%'} / {metric.target}{metric.unit || '%'}</span>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${Math.min((metric.current / (metric.target * 1.1)) * 100, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= AI TAB ================= */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Communication Panel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiCommunications.map((comm, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-900/50">
                      <p className="text-sm font-medium">{comm.message}</p>
                      <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                        Suggested Action: {comm.action}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}