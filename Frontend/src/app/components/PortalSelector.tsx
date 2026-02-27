import React from 'react';
import { Building2, Package, Truck, Brain, TrendingUp, ArrowRight, Users, Warehouse, BarChart3, Shield, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';


type PortalType = 'super_admin' | 'store' | 'supplier' | 'analyst' | 'demo';

interface Portal {
  id: PortalType;
  name: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  whoIsThisFor: string;
  useThisIf: string[];
  responsibilities: string[];
  accessLevel: {
    label: string;
    type: 'full' | 'operational' | 'limited' | 'analytics' | 'readonly';
  };
  stats: Array<{ label: string; value: string }>;
}

const portals: Portal[] = [
  {
    id: 'super_admin',
    name: 'Super Admin / HQ Portal',
    subtitle: 'Strategic Command Center',
    description: 'Global oversight and strategic control',
    icon: Building2,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
    whoIsThisFor: 'Company leadership and central operations team',
    useThisIf: [
      'CXO or Supply Chain Head',
      'HQ Operations Manager',
      'Director of Inventory Planning'
    ],
    responsibilities: [
      'Global inventory oversight across all locations',
      'AI system performance monitoring and optimization',
      'Strategic decision-making and policy configuration'
    ],
    accessLevel: {
      label: 'Full Control',
      type: 'full'
    },
    stats: [
      { label: 'Total SKUs', value: '12,847' },
      { label: 'Active Stores', value: '247' },
      { label: 'Cost Savings', value: '$2.4M' },
    ],
  },
  {
    id: 'store',
    name: 'Store / Warehouse Portal',
    subtitle: 'Operational Hub',
    description: 'Local inventory and operations management',
    icon: Warehouse,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    whoIsThisFor: 'Store and warehouse operators',
    useThisIf: [
      'Store Manager',
      'Inventory Executive',
      'Warehouse Supervisor'
    ],
    responsibilities: [
      'Monitor stock levels and stockout risks',
      'Act on AI reorder recommendations',
      'Track incoming shipments and deliveries'
    ],
    accessLevel: {
      label: 'Operational',
      type: 'operational'
    },
    stats: [
      { label: 'Current Stock', value: '3,421' },
      { label: 'Low Stock Items', value: '47' },
      { label: 'Reorder Today', value: '12' },
    ],
  },
  {
    id: 'supplier',
    name: 'Supplier / Logistics Portal',
    subtitle: 'Supply Chain Partner',
    description: 'Supply chain coordination and fulfillment',
    icon: Truck,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    whoIsThisFor: 'External suppliers and logistics partners',
    useThisIf: [
      'Supplier Manager',
      'Logistics Coordinator',
      'Vendor Account Manager'
    ],
    responsibilities: [
      'Manage purchase orders and fulfillment',
      'Update delivery timelines and ETAs',
      'Review demand forecasts and planning data'
    ],
    accessLevel: {
      label: 'Limited Operations',
      type: 'limited'
    },
    stats: [
      { label: 'Open Orders', value: '89' },
      { label: 'On-Time Rate', value: '96.2%' },
      { label: 'Avg Lead Time', value: '3.2 days' },
    ],
  },
  {
    id: 'analyst',
    name: 'AI / Analyst Portal',
    subtitle: 'Intelligence Center',
    description: 'Deep insights and model management',
    icon: Brain,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    whoIsThisFor: 'AI, data, and analytics teams',
    useThisIf: [
      'Data Analyst',
      'ML Engineer',
      'Product Analyst'
    ],
    responsibilities: [
      'Monitor model accuracy and performance',
      'Review AI decision logs and conflicts',
      'Analyze explainability and edge cases'
    ],
    accessLevel: {
      label: 'Analytics',
      type: 'analytics'
    },
    stats: [
      { label: 'Model Accuracy', value: '95.8%' },
      { label: 'Active Agents', value: '7' },
      { label: 'Predictions', value: '14,203' },
    ],
  },
  {
    id: 'demo',
    name: 'Demo / Investor Portal',
    subtitle: 'Executive Overview',
    description: 'ROI showcase and business impact',
    icon: TrendingUp,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    whoIsThisFor: 'Investors, judges, and stakeholders',
    useThisIf: [
      'Investor or Venture Partner',
      'Client Evaluating Solution',
      'Demo Viewer or Judge'
    ],
    responsibilities: [
      'View ROI and business impact metrics',
      'Compare before vs after performance',
      'Understand system value proposition'
    ],
    accessLevel: {
      label: 'Read-Only',
      type: 'readonly'
    },
    stats: [
      { label: 'Stockouts', value: '-85%' },
      { label: 'Overstock', value: '-40%' },
      { label: 'ROI', value: '340%' },
    ],
  },
];

interface PortalSelectorProps {
  onSelectPortal: (portalId: PortalType) => void;
  userRole?: PortalType | null;
}

const getAccessLevelColor = (type: string) => {
  switch (type) {
    case 'full':
      return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700';
    case 'operational':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700';
    case 'limited':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700';
    case 'analytics':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-300 dark:border-purple-700';
    case 'readonly':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300 dark:border-orange-700';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 border-gray-300 dark:border-gray-700';
  }
};

export function PortalSelector({ onSelectPortal, userRole }: PortalSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl">AgentStock AI</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Multi-Agent Inventory Optimization Platform
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            Select your role-specific portal to access relevant features and insights
          </p>
          {userRole && (
            <Badge variant="outline" className="mt-2 border-indigo-300 dark:border-indigo-700">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Recommended: {portals.find(p => p.id === userRole)?.name}
            </Badge>
          )}
        </div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {portals.map((portal) => {
            const Icon = portal.icon;
            const isRecommended = portal.id === userRole;

            return (
              <Card 
                key={portal.id}
                className={`relative hover:shadow-xl transition-all cursor-pointer border-2 group ${
                  isRecommended 
                    ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800 shadow-lg' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
                onClick={() => onSelectPortal(portal.id)}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-indigo-600 text-white shadow-lg">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Recommended for You
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={`w-14 h-14 ${portal.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 ${portal.color}`} />
                    </div>
                    <Badge className={`${getAccessLevelColor(portal.accessLevel.type)} border text-xs font-medium`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {portal.accessLevel.label}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-1">{portal.name}</CardTitle>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">{portal.subtitle}</p>
                  <CardDescription className="text-sm">{portal.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Who is this for */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                      Who is this for?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {portal.whoIsThisFor}
                    </p>
                  </div>

                  {/* Use this if you are */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                      Use this portal if you are...
                    </h4>
                    <div className="space-y-1.5">
                      {portal.useThisIf.map((role, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${portal.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')}`}></div>
                          <span>{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Responsibilities */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                      Primary Responsibilities
                    </h4>
                    <div className="space-y-1.5">
                      {portal.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${portal.color}`} />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-3 gap-3">
                      {portal.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className={`text-lg font-semibold ${portal.color}`}>{stat.value}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" variant={isRecommended ? "default" : "outline"}>
                    Enter Portal
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-center text-lg font-semibold mb-8 text-gray-900 dark:text-gray-100">
            Why Role-Based Portals?
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Tailored Experience</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Each portal is customized for specific user needs, permissions, and workflows
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Real-Time Intelligence</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All dashboards update in real-time with the latest data and AI insights
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">AI-Powered Decisions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Multi-agent AI coordination drives intelligent, explainable recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
