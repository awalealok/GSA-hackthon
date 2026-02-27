import React from 'react';
import { Brain, Activity, AlertTriangle, CheckCircle2, TrendingUp, Zap, FileText, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Topbar } from './Topbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AgentStatusPanel } from './AgentStatusPanel';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AnalystPortalProps {
  onBack: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const accuracyTrend = [
  { date: 'Jan 1', demand: 94.2, inventory: 91.8, pricing: 89.5, risk: 87.3 },
  { date: 'Jan 3', demand: 94.8, inventory: 92.3, pricing: 90.1, risk: 88.7 },
  { date: 'Jan 5', demand: 95.2, inventory: 92.8, pricing: 90.8, risk: 89.2 },
  { date: 'Jan 7', demand: 95.8, inventory: 92.3, pricing: 91.4, risk: 89.7 },
];

const agentDecisions = [
  { time: '2 min ago', agent: 'Demand Forecasting', decision: 'Updated forecast for SKU-2847', confidence: 96, outcome: 'pending' },
  { time: '15 min ago', agent: 'Inventory Optimization', decision: 'Adjusted reorder point for 47 items', confidence: 94, outcome: 'success' },
  { time: '1 hour ago', agent: 'Risk Analysis', decision: 'Flagged potential stockout in Store NYC', confidence: 92, outcome: 'success' },
  { time: '2 hours ago', agent: 'Pricing Strategy', decision: 'Recommended clearance for 234 items', confidence: 89, outcome: 'success' },
  { time: '3 hours ago', agent: 'Supplier Coordination', decision: 'Generated PO-9876 for urgent restock', confidence: 97, outcome: 'success' },
];

const conflicts = [
  { id: 'C-001', agents: ['Demand Forecasting', 'Inventory Optimization'], issue: 'Conflicting stock level recommendations', resolution: 'Prioritized demand signal', status: 'resolved' },
  { id: 'C-002', agents: ['Pricing Strategy', 'Risk Analysis'], issue: 'Price reduction vs stockout risk', resolution: 'Balanced approach applied', status: 'resolved' },
  { id: 'C-003', agents: ['Supplier Coordination', 'Logistics Routing'], issue: 'Delivery timing conflict', resolution: 'Pending agent negotiation', status: 'active' },
];

const modelMetrics = [
  { model: 'Demand Forecasting LSTM', accuracy: 95.8, mape: 4.2, last_trained: '2 days ago', status: 'optimal' },
  { model: 'Inventory Optimization RL', accuracy: 92.3, savings: 2.4, last_trained: '1 day ago', status: 'optimal' },
  { model: 'Price Elasticity Model', accuracy: 91.4, uplift: 12.3, last_trained: '3 days ago', status: 'good' },
  { model: 'Risk Prediction XGBoost', accuracy: 89.7, precision: 91.2, last_trained: '5 days ago', status: 'retrain-soon' },
];

export function AnalystPortal({ onBack, theme, onToggleTheme }: AnalystPortalProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Topbar 
        title="AI Analytics & Control Center" 
        portalName="AI / Analyst Portal"
        onBack={onBack}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <div className="p-6">
        <Tabs defaultValue="metrics">
          <TabsList className="mb-6">
            <TabsTrigger value="metrics">Model Metrics</TabsTrigger>
            <TabsTrigger value="decisions">Decision Logs</TabsTrigger>
            <TabsTrigger value="conflicts">Conflict Resolution</TabsTrigger>
            <TabsTrigger value="explainability">Explainability</TabsTrigger>
          </TabsList>

          {/* METRICS TAB */}
          <TabsContent value="metrics" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>System Accuracy</CardDescription>
                  <CardTitle className="text-3xl text-green-600">94.2%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+2.1% this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active Agents</CardDescription>
                  <CardTitle className="text-3xl">7</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm">All operational</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Predictions (24h)</CardDescription>
                  <CardTitle className="text-3xl">14,203</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">592/hour avg</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Conflicts Resolved</CardDescription>
                  <CardTitle className="text-3xl">147</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-purple-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">98.6% auto-resolved</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Accuracy Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Model Accuracy Trends</CardTitle>
                <CardDescription>7-day rolling accuracy by agent type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={accuracyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="demand" stroke="#6366f1" name="Demand Forecasting" strokeWidth={2} />
                    <Line type="monotone" dataKey="inventory" stroke="#10b981" name="Inventory Optimization" strokeWidth={2} />
                    <Line type="monotone" dataKey="pricing" stroke="#f59e0b" name="Pricing Strategy" strokeWidth={2} />
                    <Line type="monotone" dataKey="risk" stroke="#ef4444" name="Risk Analysis" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Model Details */}
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Details</CardTitle>
                <CardDescription>Current production models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modelMetrics.map((model, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{model.model}</span>
                            <Badge variant={
                              model.status === 'optimal' ? 'default' :
                              model.status === 'good' ? 'outline' :
                              'destructive'
                            }>
                              {model.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500 block">Accuracy</span>
                              <span className="font-medium text-green-600">{model.accuracy}%</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">
                                {model.mape ? 'MAPE' : model.savings ? 'Savings' : model.uplift ? 'Uplift' : 'Precision'}
                              </span>
                              <span className="font-medium">
                                {model.mape ? `${model.mape}%` : 
                                 model.savings ? `$${model.savings}M` :
                                 model.uplift ? `${model.uplift}%` :
                                 `${model.precision}%`}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Last Trained</span>
                              <span className="font-medium">{model.last_trained}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {model.status === 'retrain-soon' && (
                                <Button size="sm" variant="outline">
                                  <Settings className="w-3 h-3 mr-1" />
                                  Retrain
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DECISIONS TAB */}
          <TabsContent value="decisions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Agent Decision Log
                </CardTitle>
                <CardDescription>Real-time tracking of all AI decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agentDecisions.map((decision, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{decision.agent}</Badge>
                            <span className="text-xs text-gray-500">{decision.time}</span>
                            {decision.outcome === 'success' && (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-sm mb-2">{decision.decision}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Confidence:</span>
                            <div className="flex items-center gap-1">
                              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div 
                                  className={`h-1.5 rounded-full ${
                                    decision.confidence >= 95 ? 'bg-green-600' :
                                    decision.confidence >= 90 ? 'bg-blue-600' :
                                    'bg-orange-600'
                                  }`}
                                  style={{ width: `${decision.confidence}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">{decision.confidence}%</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONFLICTS TAB */}
          <TabsContent value="conflicts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Conflict Resolution Dashboard
                </CardTitle>
                <CardDescription>When agents disagree, the system mediates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conflicts.map((conflict, i) => (
                    <div key={i} className={`p-4 rounded-lg border ${
                      conflict.status === 'active' ?
                        'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800' :
                        'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{conflict.id}</span>
                            <Badge variant={conflict.status === 'active' ? 'destructive' : 'default'}>
                              {conflict.status}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2"><strong>Issue:</strong> {conflict.issue}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {conflict.agents.map((agent, j) => (
                              <Badge key={j} variant="outline" className="text-xs">
                                {agent}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Resolution:</strong> {conflict.resolution}
                          </p>
                        </div>
                        {conflict.status === 'active' && (
                          <Button size="sm">
                            Intervene
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <h4 className="mb-2 text-indigo-900 dark:text-indigo-100">Conflict Resolution Stats</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-indigo-600 text-2xl block">147</span>
                      <span className="text-indigo-700 dark:text-indigo-300">Total Conflicts (7d)</span>
                    </div>
                    <div>
                      <span className="text-indigo-600 text-2xl block">145</span>
                      <span className="text-indigo-700 dark:text-indigo-300">Auto-Resolved</span>
                    </div>
                    <div>
                      <span className="text-indigo-600 text-2xl block">98.6%</span>
                      <span className="text-indigo-700 dark:text-indigo-300">Success Rate</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* EXPLAINABILITY TAB */}
          <TabsContent value="explainability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Explainability Dashboard</CardTitle>
                <CardDescription>Understand why the AI made each decision</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Example Explanation */}
                  <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <h4 className="mb-4 text-indigo-900 dark:text-indigo-100">Example: Reorder Recommendation for SKU-2847</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Decision</h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded">
                          Recommend ordering 150 units of Winter Jacket - Blue L
                        </p>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-2">Key Factors</h5>
                        <div className="space-y-2">
                          {[
                            { factor: 'Historical demand pattern', weight: 35, impact: 'positive' },
                            { factor: 'Current stock level (12 units)', weight: 30, impact: 'negative' },
                            { factor: 'Seasonal trend analysis', weight: 20, impact: 'positive' },
                            { factor: 'Supplier lead time (3.2 days)', weight: 15, impact: 'neutral' },
                          ].map((item, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">{item.factor}</span>
                                <Badge variant={
                                  item.impact === 'positive' ? 'default' :
                                  item.impact === 'negative' ? 'destructive' :
                                  'outline'
                                }>
                                  {item.weight}% weight
                                </Badge>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div 
                                  className={`h-1.5 rounded-full ${
                                    item.impact === 'positive' ? 'bg-green-600' :
                                    item.impact === 'negative' ? 'bg-red-600' :
                                    'bg-gray-400'
                                  }`}
                                  style={{ width: `${item.weight}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-2">Confidence Score</h5>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                              <div className="bg-green-600 h-3 rounded-full" style={{ width: '96%' }}></div>
                            </div>
                            <span className="font-medium">96%</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            High confidence based on 6 months of historical data and current market conditions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature Importance */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Global Feature Importance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { feature: 'Historical Sales', importance: 42 },
                            { feature: 'Seasonality', importance: 28 },
                            { feature: 'Current Stock Level', importance: 18 },
                            { feature: 'Promotional Events', importance: 12 },
                          ].map((item, i) => (
                            <div key={i}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">{item.feature}</span>
                                <span className="text-sm font-medium">{item.importance}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${item.importance}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Model Transparency</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span>SHAP values available</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span>Decision path traceable</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span>Counterfactual explanations</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span>Audit trail maintained</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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