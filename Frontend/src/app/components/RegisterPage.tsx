import React, { useState } from 'react';
import { Building2, Lock, Mail, ArrowLeft, ArrowRight, Shield, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from './AuthContext';
import { registerUser } from "../../api/auth.api";




type UserRole = 'super_admin' | 'store' | 'supplier' | 'analyst' | 'demo';

export function RegisterPage({
  onBackToLogin,
  onBack,
}: {
  onBackToLogin: () => void;
  onBack?: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('demo');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  if (password.length < 6) {
    setError('Password must be at least 6 characters');
    return;
  }

  setIsLoading(true);
  try {
    // ✅ CORRECT ORDER
    await signup(name, email, password, role);

    alert("Registration successful");
  } catch (error: any) {
    console.error('Registration failed:', error);
    setError(
      error.response?.data?.message || 
      'Registration failed. Please try again.'
    );
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
            <h1 className="text-4xl mb-4">Join Our AI-Powered Platform</h1>
            <p className="text-indigo-100 text-lg">
              Start optimizing your inventory with advanced multi-agent AI systems. Reduce costs, prevent stockouts, and make data-driven decisions.
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

      {/* Right side - Registration Form */}
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
            <h2 className="text-3xl mb-2">Create Account</h2>
            <p className="text-gray-600 dark:text-gray-400">Get started with your inventory optimization journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

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
            </div>

            <div>
              <Label htmlFor="role">Account Type</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="demo">Demo / Investor</option>
                <option value="store">Store / Warehouse Manager</option>
                <option value="supplier">Supplier / Logistics</option>
                <option value="analyst">AI Analyst</option>
                <option value="super_admin">Super Admin / HQ</option>
              </select>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                'Creating account...'
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium"
              >
                Sign In
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
