import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, CheckCircle2, BarChart3, Brain, TrendingDown, Zap, Users, Shield, Globe, ChevronDown, Moon, Sun } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
  onRegisterClick?: () => void;
  onPortalClick?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export function LandingPage({ onLoginClick, onRegisterClick,
  onPortalClick, theme = 'light', onToggleTheme }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <span className="text-xl">AgentStock AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">How It Works</a>
            <a href="#benefits" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Benefits</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Contact</a>
             <button
  onClick={onPortalClick}
  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
>
  Portals
</button>
          </div>
         

          <div className="flex items-center gap-3">
            {onToggleTheme && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            )}
            <Button variant="outline" onClick={onLoginClick}>Login</Button>
            <Button onClick={onRegisterClick || onLoginClick}>
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Powered by Multi-Agent AI</span>
              </div>
              <h1 className="text-5xl lg:text-6xl mb-6">
                AI-Powered Multi-Agent Inventory Optimization
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Reduce stockouts, minimize overstock, and make smarter decisions in real time with our intelligent agent coordination system.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={onRegisterClick || onLoginClick}>
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={onLoginClick}>
                  View Live Demo
                </Button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl mb-1 text-indigo-600">85%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Reduced Stockouts</div>
                </div>
                <div>
                  <div className="text-3xl mb-1 text-green-600">$2.4M</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Annual Savings</div>
                </div>
                <div>
                  <div className="text-3xl mb-1 text-blue-600">40%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Lower Overstock</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Real-time Agent Status</span>
                    <span className="flex items-center gap-2 text-green-600 text-sm">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                      Active
                    </span>
                  </div>
                  <div className="space-y-3">
                    {['Demand Forecasting', 'Inventory Optimization', 'Supplier Coordination', 'Risk Analysis'].map((agent, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded flex items-center justify-center">
                          <Brain className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm">{agent}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                              <div className="bg-indigo-600 h-1 rounded-full" style={{ width: `${85 + i * 3}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-500">{85 + i * 3}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-white text-2xl mb-1">1,247</div>
                    <div className="text-indigo-100 text-sm">Active SKUs</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-white text-2xl mb-1">99.2%</div>
                    <div className="text-indigo-100 text-sm">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our multi-agent AI system coordinates intelligent decisions across your entire supply chain
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: BarChart3, title: 'Data Collection', desc: 'Aggregates sales, inventory, and market data in real-time' },
              { icon: Brain, title: 'AI Analysis', desc: 'Multiple specialized agents analyze patterns and trends' },
              { icon: Zap, title: 'Smart Decisions', desc: 'Coordinated recommendations for optimal inventory levels' },
              { icon: TrendingDown, title: 'Impact', desc: 'Reduce costs, prevent stockouts, improve efficiency' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300 dark:text-gray-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section id="benefits" className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Key Benefits</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Transform your inventory management with AI-powered intelligence
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: TrendingDown, title: 'Reduced Inventory Cost', desc: 'Lower holding costs by up to 40% with optimal stock levels', color: 'text-green-600' },
              { icon: Zap, title: 'Faster Replenishment', desc: 'Automated reorder recommendations in real-time', color: 'text-blue-600' },
              { icon: Brain, title: 'Real-time Demand Prediction', desc: 'ML-powered forecasting with 95%+ accuracy', color: 'text-purple-600' },
              { icon: CheckCircle2, title: 'Explainable AI Decisions', desc: 'Full transparency into why each decision was made', color: 'text-indigo-600' },
              { icon: Users, title: 'Role-Based Insights', desc: 'Customized dashboards for every stakeholder', color: 'text-orange-600' },
              { icon: Shield, title: 'Risk Mitigation', desc: 'Proactive alerts for potential stockouts and issues', color: 'text-red-600' },
            ].map((benefit, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <benefit.icon className={`w-10 h-10 ${benefit.color} mb-4`} />
                <h3 className="text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Uses This */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Who Uses AgentStock AI</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Trusted by leading companies across industries
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: '🏪', title: 'Retail Chains', desc: '500+ stores' },
              { icon: '🛒', title: 'E-commerce', desc: 'Online retailers' },
              { icon: '⚡', title: 'Quick Commerce', desc: '15-min delivery' },
              { icon: '🏭', title: 'Manufacturing', desc: 'Production planning' },
              { icon: '📦', title: 'Warehousing', desc: 'Distribution centers' },
            ].map((industry, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="mb-1">{industry.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-blue-700 dark:from-indigo-900 dark:to-blue-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl mb-6">Ready to Transform Your Inventory?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join leading companies using AI to optimize their supply chain
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-indigo-600 hover:bg-indigo-50" onClick={onLoginClick}>
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={onLoginClick}>
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-indigo-600" />
                <span className="text-lg">AgentStock AI</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enterprise-grade multi-agent inventory optimization platform
              </p>
            </div>
            <div>
              <h4 className="mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Use Cases</div>
                <div>Documentation</div>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Tech Stack</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>React + TypeScript</div>
                <div>Multi-Agent AI</div>
                <div>Real-time Analytics</div>
                <div>Enterprise Security</div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 AgentStock AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Terms of Service</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
