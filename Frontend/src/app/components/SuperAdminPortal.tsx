import React, { useState, useEffect } from 'react';
import { getUsers } from "../../api/user.api";
import { TrendingUp, TrendingDown, Package, AlertTriangle, DollarSign, BarChart3, Activity, Zap, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AgentStatusPanel } from './AgentStatusPanel';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { Topbar } from './Topbar';
import { AnimatedCounter } from './ui/animated-counter';
import { AIExplainability } from './ui/ai-explainability';
import { StatusBadge } from './ui/status-badge';
import { LastUpdated } from './ui/last-updated';
import { EmptyState } from './ui/empty-state';

interface SuperAdminPortalProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

// Mock data
const inventoryTrendData = [
  { date: 'Jan 1', optimal: 85, actual: 78, stockouts: 5 },
  { date: 'Jan 8', optimal: 85, actual: 82, stockouts: 3 },
  { date: 'Jan 15', optimal: 85, actual: 84, stockouts: 2 },
  { date: 'Jan 22', optimal: 85, actual: 86, stockouts: 1 },
  { date: 'Jan 29', optimal: 85, actual: 87, stockouts: 1 },
  { date: 'Feb 5', optimal: 85, actual: 88, stockouts: 0 },
  { date: 'Today', optimal: 85, actual: 89, stockouts: 0 },
];

const savingsData = [
  { category: 'Reduced Overstock', value: 842000 },
  { category: 'Prevented Stockouts', value: 567000 },
  { category: 'Optimized Shipping', value: 423000 },
  { category: 'Dynamic Pricing', value: 298000 },
  { category: 'Supplier Negotiations', value: 270000 },
];

const storePerformance = [
  { store: 'NYC Flagship', sku: 2847, fill_rate: 98.2, savings: 142000, status: 'excellent' },
  { store: 'LA West', sku: 1923, fill_rate: 96.7, savings: 98000, status: 'good' },
  { store: 'Chicago Loop', sku: 2145, fill_rate: 94.3, savings: 87000, status: 'good' },
  { store: 'Houston Central', sku: 1654, fill_rate: 91.2, savings: 76000, status: 'warning' },
  { store: 'Miami Beach', sku: 1432, fill_rate: 88.7, savings: 65000, status: 'warning' },
];

const criticalAlerts = [
  {
    sku: 'SKU-2847',
    item: 'Winter Jacket - Blue L',
    stock: 12,
    threshold: 50,
    risk: 'high',
    store: 'NYC Flagship',
    aiRecommendation: 'Order 150 units immediately',
    aiReasons: [
      'Seasonal demand spike detected (+45% vs last week)',
      'Current stock will deplete in 2.3 days at current velocity',
      'Supplier lead time: 5-7 days'
    ],
    confidence: 94
  },
  {
    sku: 'SKU-4521',
    item: 'Running Shoes - Size 10',
    stock: 34,
    threshold: 75,
    risk: 'medium',
    store: 'LA West',
    aiRecommendation: 'Order 100 units within 48 hours',
    aiReasons: [
      'Consistent sales trend (12-15 units/day)',
      'Popular size - historically quick sellout risk',
      'Next delivery window: 3 days'
    ],
    confidence: 87
  },
  {
    sku: 'SKU-1923',
    item: 'Yoga Mat - Purple',
    stock: 18,
    threshold: 40,
    risk: 'high',
    store: 'Chicago Loop',
    aiRecommendation: 'Order 80 units + review pricing',
    aiReasons: [
      'New year fitness trend driving demand (+62%)',
      'Competitor stockout creating opportunity',
      'Price elasticity analysis suggests 8% increase possible'
    ],
    confidence: 91
  },
];

export function SuperAdminPortal({ onBack, theme, onToggleTheme }: SuperAdminPortalProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.users);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const [selectedTab, setSelectedTab] = useState('overview');


  return (
    <div>
      <Topbar
        title="Admin Portel"
        portalName="Super Admin / HQ Portal"
        onBack={onBack}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <main className="p-6">
        {/* System Status Bar */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <StatusBadge status="live" pulse={true} />
              <span className="text-sm text-gray-600 dark:text-gray-400">System Operational</span>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2">
              <StatusBadge status="active" />
              <span className="text-sm text-gray-600 dark:text-gray-400">7 AI Agents Running</span>
            </div>
          </div>
          <LastUpdated />
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agent Status</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="simulation">What-If Simulation</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Total Inventory Value</CardDescription>
                  <StatusBadge status="live" size="sm" />
                </div>
                <CardTitle className="text-3xl">
                  $<AnimatedCounter value={47.2} decimals={1} />M
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm">12% reduction YoY</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optimized from $53.6M</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Active SKUs</CardDescription>
                  <StatusBadge status="active" size="sm" />
                </div>
                <CardTitle className="text-3xl">
                  <AnimatedCounter value={12847} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-blue-600">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">247 stores</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Across all locations</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Cost Savings (YTD)</CardDescription>
                  <StatusBadge status="ai-recommended" size="sm" />
                </div>
                <CardTitle className="text-3xl text-green-600">
                  $<AnimatedCounter value={2.4} decimals={1} />M
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">340% ROI</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI-driven optimization</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Fill Rate</CardDescription>
                  <StatusBadge status="success" size="sm" />
                </div>
                <CardTitle className="text-3xl">
                  <AnimatedCounter value={96.8} decimals={1} />%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+8.3% vs target</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target: 88.5%</p>
              </CardContent>
            </Card>
          </div>

          {/* Critical Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Critical Alerts
                  </CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status="manual-review" />
                  <Badge variant="destructive">{criticalAlerts.length} Critical</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalAlerts.map((alert, i) => (
                  <div key={i} className={`rounded-lg border-l-4 ${alert.risk === 'high' ? 'bg-red-50 dark:bg-red-950/30 border-red-500' :
                    'bg-orange-50 dark:bg-orange-950/30 border-orange-500'
                    }`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 dark:text-gray-100">{alert.sku}</span>
                            <Badge variant={alert.risk === 'high' ? 'destructive' : 'outline'} className="text-xs">
                              {alert.risk} risk
                            </Badge>
                            <StatusBadge status="ai-recommended" size="sm" />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{alert.item}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>Current: <span className="font-medium text-gray-900 dark:text-gray-100">{alert.stock}</span></span>
                            <span>Threshold: <span className="font-medium">{alert.threshold}</span></span>
                            <span>Store: <span className="font-medium">{alert.store}</span></span>
                          </div>
                        </div>
                        <Button size="sm" className="ml-4">
                          Reorder
                          <ChevronRight className="ml-1 w-4 h-4" />
                        </Button>
                      </div>
                      <AIExplainability
                        recommendation={alert.aiRecommendation}
                        reasons={alert.aiReasons}
                        confidence={alert.confidence}
                        variant="compact"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Inventory Performance Trend</CardTitle>
                    <CardDescription>Actual vs Optimal levels over time</CardDescription>
                  </div>
                  <StatusBadge status="live" pulse={true} size="sm" />
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={inventoryTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Area type="monotone" dataKey="optimal" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} name="Optimal Level" />
                    <Area type="monotone" dataKey="actual" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Actual Level" />
                  </AreaChart>
                </ResponsiveContainer>
                <LastUpdated className="mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Cost Savings Breakdown</CardTitle>
                    <CardDescription>Total: $2.4M saved year-to-date</CardDescription>
                  </div>
                  <StatusBadge status="ai-recommended" size="sm" />
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={savingsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={140} />
                    <RechartsTooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                    <Bar dataKey="value" fill="#10b981" name="Savings ($)" />
                  </BarChart>
                </ResponsiveContainer>
                <LastUpdated className="mt-4" />
              </CardContent>
            </Card>
          </div>

          {/* Store Performance Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Store Performance Overview</CardTitle>
                  <CardDescription>Top performing locations</CardDescription>
                </div>
                <LastUpdated />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Store</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Active SKUs</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Fill Rate</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Savings (YTD)</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storePerformance.map((store, i) => (
                      <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">{store.store}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{store.sku.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 min-w-[60px] bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${store.fill_rate >= 95 ? 'bg-green-600' :
                                  store.fill_rate >= 90 ? 'bg-blue-600' :
                                    'bg-orange-600'
                                  }`}
                                style={{ width: `${store.fill_rate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{store.fill_rate}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-semibold text-green-600">${(store.savings / 1000).toFixed(0)}K</td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            store.status === 'excellent' ? 'default' :
                              store.status === 'good' ? 'outline' :
                                'destructive'
                          }>
                            {store.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AGENTS TAB */}
        <TabsContent value="agents">
          <AgentStatusPanel />
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Demand Forecast Accuracy</CardTitle>
                    <CardDescription>7-day rolling accuracy by category</CardDescription>
                  </div>
                  <StatusBadge status="live" pulse={true} size="sm" />
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { day: 'Mon', electronics: 94, apparel: 96, home: 92 },
                    { day: 'Tue', electronics: 95, apparel: 95, home: 93 },
                    { day: 'Wed', electronics: 96, apparel: 97, home: 94 },
                    { day: 'Thu', electronics: 95, apparel: 96, home: 95 },
                    { day: 'Fri', electronics: 97, apparel: 98, home: 96 },
                    { day: 'Sat', electronics: 96, apparel: 97, home: 95 },
                    { day: 'Sun', electronics: 95, apparel: 96, home: 94 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[85, 100]} />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="electronics" stroke="#6366f1" name="Electronics" strokeWidth={2} />
                    <Line type="monotone" dataKey="apparel" stroke="#10b981" name="Apparel" strokeWidth={2} />
                    <Line type="monotone" dataKey="home" stroke="#f59e0b" name="Home Goods" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
                <LastUpdated className="mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Decision Impact</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Reorder Recommendations</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">847</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Price Adjustments</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">234</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Risk Alerts</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">47</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full transition-all" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Supplier Orders</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">89</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                Top AI Insights & Recommendations
              </CardTitle>
              <CardDescription>Strategic recommendations from multi-agent analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AIExplainability
                recommendation="Increase safety stock for electronics category by 15% for next month"
                reasons={[
                  'Historical data shows 23% spike in electronics demand during February',
                  'Current supplier lead times increased from 3 to 5 days',
                  'Competitor analysis shows similar category trending upward'
                ]}
                confidence={89}
              />
              <AIExplainability
                recommendation="Negotiate improved terms with Supplier #247 (Home Goods)"
                reasons={[
                  'On-time delivery rate declined to 82% (below 90% SLA)',
                  'Alternative suppliers offer 12% better pricing with similar quality',
                  'Contract renewal opportunity in 45 days'
                ]}
                confidence={76}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SIMULATION TAB */}
        <TabsContent value="simulation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What-If Analysis Tool</CardTitle>
              <CardDescription>Simulate inventory scenarios and predict outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Zap}
                title="Interactive Simulation Coming Soon"
                description="Test different demand scenarios, supplier lead times, and pricing strategies to see predicted impacts on inventory levels, costs, and fill rates. Our AI agents will provide real-time feedback on your simulation parameters."
                action={{
                  label: 'Configure Simulation',
                  onClick: () => alert('Simulation configuration coming soon!')
                }}
                variant="info"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </main>
    </div>
  );
}
