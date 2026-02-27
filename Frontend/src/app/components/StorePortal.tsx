import React, { useState } from 'react';
import { Package, AlertCircle, TrendingUp, Clock, CheckCircle2, Truck, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Topbar } from './Topbar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface StorePortalProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const lowStockItems = [
  { sku: 'SKU-2847', name: 'Winter Jacket - Blue L', current: 12, reorder: 50, recommended: 150, urgency: 'high' },
  { sku: 'SKU-4521', name: 'Running Shoes - Size 10', current: 34, reorder: 75, recommended: 200, urgency: 'medium' },
  { sku: 'SKU-1923', name: 'Yoga Mat - Purple', current: 18, reorder: 40, recommended: 120, urgency: 'high' },
  { sku: 'SKU-7842', name: 'Water Bottle - 32oz', current: 67, reorder: 100, recommended: 250, urgency: 'low' },
];

const reorderRecommendations = [
  { sku: 'SKU-9876', name: 'Hiking Boots - Size 9', qty: 180, reason: 'High demand forecast', savings: 420, confidence: 96 },
  { sku: 'SKU-5432', name: 'Camping Tent - 4P', qty: 75, reason: 'Seasonal demand peak', savings: 320, confidence: 94 },
  { sku: 'SKU-3421', name: 'Sleeping Bag - Winter', qty: 120, reason: 'Below optimal level', savings: 280, confidence: 92 },
];

const incomingShipments = [
  { po: 'PO-8472', supplier: 'Global Sports Co.', items: 847, eta: '2 days', status: 'on-track' },
  { po: 'PO-7361', supplier: 'Outdoor Gear Ltd.', items: 523, eta: '4 days', status: 'on-track' },
  { po: 'PO-6245', supplier: 'Fashion Wholesale Inc.', items: 1247, eta: '1 day', status: 'delayed' },
];

const todayTasks = [
  { task: 'Review 12 critical low-stock alerts', priority: 'high', completed: false },
  { task: 'Process 47 AI reorder recommendations', priority: 'high', completed: false },
  { task: 'Verify incoming shipment PO-6245', priority: 'medium', completed: true },
  { task: 'Update seasonal inventory plan', priority: 'low', completed: false },
];

export function StorePortal({ onBack, theme, onToggleTheme }: StorePortalProps) {

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    quantity: 0
  });

  const handleAddProduct = () => {
    if (!newProduct.id || !newProduct.name) return;
    setProducts(prev => [...prev, newProduct]);
    setNewProduct({ id: '', name: '', price: 0, quantity: 0 });
  };

  const combinedInventory = [
    ...lowStockItems.map(item => ({
      id: item.sku,
      name: item.name,
      current: item.current,
      reorder: item.reorder,
      recommended: item.recommended,
      urgency: item.urgency,
      price: 0
    })),
    ...products.map(product => ({
      id: product.id,
      name: product.name,
      current: product.quantity,
      reorder: 50,
      recommended: 0,
      urgency:
        product.quantity <= 20 ? 'high' :
        product.quantity <= 40 ? 'medium' :
        'low',
      price: product.price
    }))
  ];

  const filteredInventory = combinedInventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Topbar 
        title="Store Operations Dashboard" 
        portalName="Store / Warehouse Portal"
        onBack={onBack}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <div className="p-6">
        <Tabs defaultValue="inventory">
          <TabsList className="mb-6">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="reorders">Reorder Queue</TabsTrigger>
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="tasks">Daily Tasks</TabsTrigger>
          </TabsList>

          {/* ================= INVENTORY TAB ================= */}
          <TabsContent value="inventory" className="space-y-6">

            {/* ORIGINAL KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Current Stock</CardDescription>
                  <CardTitle className="text-3xl">3,421</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Optimal levels</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Low Stock Items</CardDescription>
                  <CardTitle className="text-3xl text-red-600">47</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Action needed</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Reorder Today</CardDescription>
                  <CardTitle className="text-3xl">12</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Recommended by AI</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Fill Rate</CardDescription>
                  <CardTitle className="text-3xl">94.3%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-blue-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Above target</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* SEARCH + ADD PRODUCT */}
            <Card>
              <CardHeader>
                <CardTitle>Product Search</CardTitle>
                <CardDescription>Search by Product ID or Name</CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  placeholder="Search product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Product</CardTitle>
                <CardDescription>Manual Entry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input type="text" placeholder="Product ID"
                    value={newProduct.id}
                    onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                    className="p-2 border rounded" />
                  <input type="text" placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="p-2 border rounded" />
                  <input type="number" placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="p-2 border rounded" />
                  <input type="number" placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                    className="p-2 border rounded" />
                </div>
                <Button onClick={handleAddProduct}>Add Product</Button>
              </CardContent>
            </Card>

            {/* ORIGINAL LOW STOCK SECTION (SEARCHABLE) */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      Low Stock Alerts
                    </CardTitle>
                    <CardDescription>Items below reorder point</CardDescription>
                  </div>
                  <Button>View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInventory.map((item, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{item.id}</span>
                            <Badge variant={
                              item.urgency === 'high' ? 'destructive' :
                              item.urgency === 'medium' ? 'outline' :
                              'secondary'
                            }>
                              {item.urgency} urgency
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.name}</p>
                        </div>
                        <Button size="sm">Quick Reorder</Button>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Current Stock</span>
                          <span className="font-medium text-red-600">{item.current}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Reorder Point</span>
                          <span className="font-medium">{item.reorder}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">
                            {item.price ? 'Price' : 'AI Recommends'}
                          </span>
                          <span className="font-medium text-green-600">
                            {item.price ? `₹ ${item.price}` : item.recommended}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">Stock Level</span>
                          <span className="text-gray-500">
                            {Math.round((item.current / item.reorder) * 100)}%
                          </span>
                        </div>
                        <Progress value={(item.current / item.reorder) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          {/* ================= REORDERS TAB ================= */}
          <TabsContent value="reorders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI-Powered Reorder Recommendations</CardTitle>
                    <CardDescription>Smart suggestions based on demand forecasts</CardDescription>
                  </div>
                  <Button>Approve All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reorderRecommendations.map((rec, i) => (
                    <div key={i} className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{rec.sku}</span>
                            <Badge className="bg-indigo-600">AI Recommended</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{rec.name}</p>
                          <p className="text-sm text-indigo-700 dark:text-indigo-300">
                            <strong>Reason:</strong> {rec.reason}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Adjust</Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Recommended Qty</span>
                          <span className="font-medium text-lg">{rec.qty}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Est. Savings</span>
                          <span className="font-medium text-lg text-green-600">${rec.savings}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Confidence</span>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${rec.confidence}%` }}></div>
                            </div>
                            <span className="font-medium">{rec.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= SHIPMENTS TAB ================= */}
          <TabsContent value="shipments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  Incoming Shipments
                </CardTitle>
                <CardDescription>Track purchase orders and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomingShipments.map((shipment, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{shipment.po}</span>
                            <Badge variant={shipment.status === 'on-track' ? 'default' : 'destructive'}>
                              {shipment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{shipment.supplier}</p>
                        </div>
                        <Button size="sm" variant="outline">Track</Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">{shipment.items} items</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">ETA: {shipment.eta}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= TASKS TAB ================= */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily AI Task List</CardTitle>
                <CardDescription>Prioritized actions for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayTasks.map((task, i) => (
                    <div key={i} className={`p-4 rounded-lg border ${
                      task.completed 
                        ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={task.completed} readOnly className="w-5 h-5 rounded" />
                        <div className="flex-1">
                          <p className={task.completed ? 'line-through text-gray-500' : ''}>{task.task}</p>
                        </div>
                        <Badge variant={
                          task.priority === 'high' ? 'destructive' :
                          task.priority === 'medium' ? 'outline' :
                          'secondary'
                        }>
                          {task.priority}
                        </Badge>
                      </div>
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