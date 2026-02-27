import React from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle2, Activity, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface AgentStatus {
  name: string;
  status: 'active' | 'idle' | 'error';
  accuracy: number;
  lastAction: string;
  decisions: number;
  description: string;
}

const agents: AgentStatus[] = [
  {
    name: 'Demand Forecasting Agent',
    status: 'active',
    accuracy: 95.8,
    lastAction: 'Updated 1,247 SKU forecasts',
    decisions: 2847,
    description: 'Predicts future demand using historical data, seasonality, and market trends',
  },
  {
    name: 'Inventory Optimization Agent',
    status: 'active',
    accuracy: 92.3,
    lastAction: 'Optimized reorder points for 547 items',
    decisions: 1923,
    description: 'Calculates optimal stock levels to balance cost and service level',
  },
  {
    name: 'Supplier Coordination Agent',
    status: 'active',
    accuracy: 96.2,
    lastAction: 'Generated 47 purchase orders',
    decisions: 1456,
    description: 'Manages supplier relationships and automates procurement decisions',
  },
  {
    name: 'Risk Analysis Agent',
    status: 'active',
    accuracy: 89.7,
    lastAction: 'Identified 12 stockout risks',
    decisions: 2134,
    description: 'Monitors supply chain risks and proactively alerts to potential issues',
  },
  {
    name: 'Pricing Strategy Agent',
    status: 'active',
    accuracy: 91.4,
    lastAction: 'Adjusted prices for 234 clearance items',
    decisions: 987,
    description: 'Optimizes pricing to clear overstock and maximize margins',
  },
  {
    name: 'Logistics Routing Agent',
    status: 'idle',
    accuracy: 94.1,
    lastAction: 'Scheduled next run in 2 hours',
    decisions: 734,
    description: 'Optimizes delivery routes and warehouse-to-store transfers',
  },
  {
    name: 'Conflict Resolution Agent',
    status: 'active',
    accuracy: 97.5,
    lastAction: 'Resolved 3 agent conflicts',
    decisions: 456,
    description: 'Coordinates between agents when recommendations conflict',
  },
];

export function AgentStatusPanel() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              Multi-Agent System Status
            </CardTitle>
            <CardDescription>Real-time monitoring of AI agent performance</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600">
              <Activity className="w-3 h-3 mr-1" />
              {agents.filter(a => a.status === 'active').length} Active
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                agent.status === 'active' ? 'bg-green-100 dark:bg-green-950/30' :
                agent.status === 'error' ? 'bg-red-100 dark:bg-red-950/30' :
                'bg-gray-100 dark:bg-gray-800'
              }`}>
                {agent.status === 'active' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : agent.status === 'error' ? (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                ) : (
                  <Brain className="w-5 h-5 text-gray-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="truncate">{agent.name}</h4>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{agent.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {agent.lastAction}
                </p>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Accuracy:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            agent.accuracy >= 95 ? 'bg-green-600' :
                            agent.accuracy >= 90 ? 'bg-blue-600' :
                            'bg-orange-600'
                          }`}
                          style={{ width: `${agent.accuracy}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">{agent.accuracy}%</span>
                    </div>
                  </div>
                  <div className="text-gray-500">
                    {agent.decisions.toLocaleString()} decisions
                  </div>
                </div>
              </div>

              <Badge variant={
                agent.status === 'active' ? 'default' :
                agent.status === 'error' ? 'destructive' :
                'outline'
              }>
                {agent.status}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="mb-1 text-indigo-900 dark:text-indigo-100">System Performance</h4>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                All agents operating at 94.2% average accuracy. System has prevented 47 potential stockouts and identified $284K in cost savings opportunities today.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
