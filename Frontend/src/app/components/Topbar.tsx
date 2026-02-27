import React from 'react';
import { Bell, User, LogOut, Moon, Sun, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from './AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface TopbarProps {
  title: string;
  portalName: string;
  onBack?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export function Topbar({ title, portalName, onBack, theme, onToggleTheme }: TopbarProps) {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              ← Back
            </Button>
          )}
          <div>
            <h1 className="text-xl">{title}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">{portalName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-3 space-y-3 max-h-96 overflow-y-auto">
                <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm">Low Stock Alert</span>
                    <Badge variant="destructive" className="text-xs">Critical</Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">SKU-2847 below safety threshold</p>
                  <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm">Delivery Delay</span>
                    <Badge variant="outline" className="text-xs">Warning</Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">PO-4521 delayed by 1 day</p>
                  <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm">Optimization Complete</span>
                    <Badge className="text-xs bg-green-600">Success</Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">AI agents processed 1,247 SKUs</p>
                  <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          {onToggleTheme && (
            <Button variant="ghost" size="icon" onClick={onToggleTheme}>
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          )}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-sm">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
