import React, { useState } from 'react';
import { Building2, Lock, Mail, ArrowLeft, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from './AuthContext';


export function LoginPage({
  onRegisterClick,
  onBack,
}: {
  onRegisterClick?: () => void;
  onBack?: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password); // ✅ backend login
      alert("Login successful");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-700 dark:from-indigo-900 dark:to-blue-900 p-12 items-center justify-center">
        <div className="max-w-lg text-white">
          <div className="mb-8">
            <Building2 className="w-16 h-16 mb-4" />
            <h1 className="text-4xl mb-4">AI-Powered Inventory Optimization</h1>
            <p className="text-indigo-100 text-lg">
              Reduce stockouts by 85%, minimize overstock, and make smarter decisions in real-time with our multi-agent AI system.
            </p>
          </div>

          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Enterprise-Grade Security</h3>
                <p className="text-indigo-100 text-sm">Bank-level encryption and compliance</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Multi-Agent Intelligence</h3>
                <p className="text-indigo-100 text-sm">Coordinated AI agents working together</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {onBack && (
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="mb-6 text-gray-700 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          )}

          <div className="text-center mb-8">
            <h2 className="text-3xl mb-2">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Try: admin@company.com, store@company.com, supplier@company.com
              </p>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                Forgot password?
              </button>
            </div>

            <Button
              type="button"
              className="w-full"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onRegisterClick}
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium"
              >
                Create Account
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500">
              🔒 Enterprise-grade security • SOC 2 Type II Certified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
