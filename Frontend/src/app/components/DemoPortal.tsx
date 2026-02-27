import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, Zap, Users, BarChart3, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Topbar } from './Topbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

interface DemoPortalProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const beforeAfterMetrics = [
  { metric: 'Inventory Value', before: 53.6, after: 47.2, unit: '$M', improvement: -12 },
  { metric: 'Stockout Rate', before: 18.4, after: 2.7, unit: '%', improvement: -85 },
  { metric: 'Overstock Value', before: 8.4, after: 5.0, unit: '$M', improvement: -40 },
  { metric: 'Fill Rate', before: 88.5, after: 96.8, unit: '%', improvement: 9 },
  { metric: 'Days of Inventory', before: 67, after: 52, unit: 'days', improvement: -22 },
  { metric: 'Carrying Costs', before: 4.2, after: 2.8, unit: '$M/yr', improvement: -33 },
];

const roiBreakdown = [
  { category: 'Reduced Overstock', value: 842000 },
  { category: 'Prevented Stockouts', value: 567000 },
  { category: 'Optimized Shipping', value: 423000 },
  { category: 'Dynamic Pricing', value: 298000 },
  { category: 'Labor Efficiency', value: 270000 },
];

const adoptionTimeline = [
  { phase: 'Month 1', value: 20, label: 'Setup & Integration' },
  { phase: 'Month 2', value: 45, label: 'Training & Calibration' },
  { phase: 'Month 3', value: 75, label: 'Partial Rollout' },
  { phase: 'Month 4', value: 90, label: 'Full Deployment' },
  { phase: 'Month 5', value: 100, label: 'Optimization' },
  { phase: 'Month 6+', value: 100, label: 'Continuous Improvement' },
];

const agentCollaboration = [
  { from: 'Demand Agent', to: 'Inventory Agent', exchanges: 2847, success: 98.2 },
  { from: 'Inventory Agent', to: 'Supplier Agent', exchanges: 1923, success: 96.7 },
  { from: 'Risk Agent', to: 'Pricing Agent', exchanges: 1456, success: 94.3 },
  { from: 'Supplier Agent', to: 'Logistics Agent', exchanges: 1234, success: 97.1 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function DemoPortal({ onBack, theme, onToggleTheme }: DemoPortalProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Topbar 
        title="Business Impact Dashboard" 
        portalName="Demo / Investor Portal"
        onBack={onBack}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <div className="p-6">
        <Tabs defaultValue="before-after">
          <TabsList className="mb-6">
            <TabsTrigger value="before-after">Before vs After</TabsTrigger>
            <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
            <TabsTrigger value="simulation">Live Simulation</TabsTrigger>
            <TabsTrigger value="collaboration">Agent Collaboration</TabsTrigger>
          </TabsList>

          {/* BEFORE VS AFTER TAB */}
          <TabsContent value="before-after" className="space-y-6">
            {/* Hero Stats */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 dark:from-indigo-900 dark:to-blue-900 rounded-xl p-8 text-white mb-6">
              <h2 className="text-3xl mb-2">Transformative Impact</h2>
              <p className="text-indigo-100 mb-8">Real-world results from AI-powered multi-agent inventory optimization</p>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl mb-1">85%</div>
                  <div className="text-indigo-100">Stockout Reduction</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl mb-1">$2.4M</div>
                  <div className="text-indigo-100">Annual Savings</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl mb-1">340%</div>
                  <div className="text-indigo-100">ROI in Year 1</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="text-3xl mb-1">6 Mo</div>
                  <div className="text-indigo-100">Payback Period</div>
                </div>
              </div>
            </div>

            {/* Before vs After Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Before vs After Comparison</CardTitle>
                <CardDescription>Key metrics improvement after AI implementation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {beforeAfterMetrics.map((metric, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">{metric.metric}</span>
                        <Badge variant={metric.improvement < 0 ? 'default' : 'outline'} className={
                          metric.improvement < 0 ? 'bg-green-600' : 'bg-blue-600'
                        }>
                          {metric.improvement > 0 ? '+' : ''}{metric.improvement}%
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-xs text-gray-500 block mb-1">Before AI</span>
                          <div className="text-2xl text-gray-600 dark:text-gray-400">
                            {metric.before}{metric.unit}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block mb-1">After AI</span>
                          <div className="text-2xl text-green-600">
                            {metric.after}{metric.unit}
                          </div>
                        </div>
                      </div>

                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="absolute h-full bg-gray-400 dark:bg-gray-600 rounded-full"
                          style={{ width: '50%' }}
                        ></div>
                        <div 
                          className="absolute h-full bg-green-600 rounded-full"
                          style={{ 
                            width: '50%',
                            left: '50%',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Visual Impact */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Reduction Breakdown</CardTitle>
                  <CardDescription>$2.4M total annual savings</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={roiBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {roiBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Implementation Timeline</CardTitle>
                  <CardDescription>Typical deployment & adoption curve</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={adoptionTimeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="phase" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366f1" name="Adoption %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ROI ANALYSIS TAB */}
          <TabsContent value="roi" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Investment</CardDescription>
                  <CardTitle className="text-3xl">$700K</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Software License</span>
                      <span>$300K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Implementation</span>
                      <span>$250K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Training & Support</span>
                      <span>$150K</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Annual Returns</CardDescription>
                  <CardTitle className="text-3xl text-green-600">$2.4M</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Recurring annual benefit</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Based on 12-month average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Return on Investment</CardDescription>
                  <CardTitle className="text-3xl text-indigo-600">340%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">First year ROI</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Payback in 6 months</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>5-Year Financial Projection</CardTitle>
                <CardDescription>Cumulative savings and ROI over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={[
                    { year: 'Year 0', investment: -700, savings: 0, cumulative: -700 },
                    { year: 'Year 1', investment: -700, savings: 2400, cumulative: 1700 },
                    { year: 'Year 2', investment: -700, savings: 4800, cumulative: 4100 },
                    { year: 'Year 3', investment: -700, savings: 7200, cumulative: 6500 },
                    { year: 'Year 4', investment: -700, savings: 9600, cumulative: 8900 },
                    { year: 'Year 5', investment: -700, savings: 12000, cumulative: 11300 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}K`} />
                    <Legend />
                    <Line type="monotone" dataKey="investment" stroke="#ef4444" name="Investment" strokeWidth={2} />
                    <Line type="monotone" dataKey="savings" stroke="#10b981" name="Cumulative Savings" strokeWidth={2} />
                    <Line type="monotone" dataKey="cumulative" stroke="#6366f1" name="Net Benefit" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tangible Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { benefit: 'Reduced inventory carrying costs', value: '$1.4M/year' },
                      { benefit: 'Prevented lost sales from stockouts', value: '$567K/year' },
                      { benefit: 'Optimized logistics and shipping', value: '$423K/year' },
                      { benefit: 'Reduced labor costs (automation)', value: '$270K/year' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                        <span className="text-sm flex-1">{item.benefit}</span>
                        <span className="text-sm font-medium text-green-600">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Intangible Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      'Improved customer satisfaction',
                      'Better decision-making speed',
                      'Reduced manual workload',
                      'Scalable infrastructure',
                      'Competitive advantage',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <Brain className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SIMULATION TAB */}
          <TabsContent value="simulation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live System Simulation</CardTitle>
                <CardDescription>Watch the AI agents work in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg p-12 text-center border border-indigo-200 dark:border-indigo-800">
                  <div className="max-w-2xl mx-auto">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-indigo-200 dark:bg-indigo-800 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-indigo-400 dark:bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Brain className="w-12 h-12 text-indigo-600 relative z-10" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl mb-4">Interactive Demo Available</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      See how agents coordinate decisions, resolve conflicts, and optimize inventory in real-time. Watch as demand forecasts trigger automatic reorders, risk alerts prevent stockouts, and pricing strategies clear overstock.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button size="lg">
                        <Zap className="mr-2 w-5 h-5" />
                        Start Simulation
                      </Button>
                      <Button size="lg" variant="outline">
                        Watch Demo Video
                      </Button>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                        <div className="text-2xl text-indigo-600 mb-1">7</div>
                        <div className="text-gray-600 dark:text-gray-400">AI Agents</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                        <div className="text-2xl text-green-600 mb-1">Real-time</div>
                        <div className="text-gray-600 dark:text-gray-400">Processing</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                        <div className="text-2xl text-blue-600 mb-1">1000s</div>
                        <div className="text-gray-600 dark:text-gray-400">Decisions/Day</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* COLLABORATION TAB */}
          <TabsContent value="collaboration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  Agent Collaboration Network
                </CardTitle>
                <CardDescription>How AI agents work together to optimize inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentCollaboration.map((collab, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1">
                          <Badge variant="outline">{collab.from}</Badge>
                          <div className="flex-1 flex items-center gap-2">
                            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                            <span className="text-xs text-gray-500">{collab.exchanges.toLocaleString()} exchanges</span>
                            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                          </div>
                          <Badge variant="outline">{collab.to}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Success Rate:</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${collab.success}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-green-600">{collab.success}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <h4 className="mb-4 text-indigo-900 dark:text-indigo-100">Why Multi-Agent Architecture?</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { icon: Brain, title: 'Specialized Expertise', desc: 'Each agent masters one domain' },
                      { icon: Zap, title: 'Parallel Processing', desc: 'Multiple decisions simultaneously' },
                      { icon: Users, title: 'Coordinated Actions', desc: 'Agents negotiate conflicts' },
                      { icon: TrendingUp, title: 'Continuous Learning', desc: 'Each agent improves independently' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <item.icon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-medium mb-1">{item.title}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
