import { useState } from 'react';
import FloatingCopilot from '@/components/FloatingCopilot';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Bell, Users, BarChart3, Brain, ShieldAlert,
  MessageSquare, Settings, GraduationCap, BookOpen, Target,
  ClipboardList, Bot, LogOut, ChevronLeft, ChevronRight, Zap, CalendarCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const leadNavItems = [
  { path: '/lead/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/lead/wellbeing-risks', label: 'Wellbeing & Risks', icon: ShieldAlert, badge: 3 },
  { path: '/lead/team', label: 'Team', icon: Users },
  { path: '/lead/delivery', label: 'Delivery', icon: BarChart3 },
  { path: '/lead/skills', label: 'Skills', icon: Brain },
  { path: '/lead/one-on-ones', label: '1:1 Planner', icon: CalendarCheck },
  { path: '/lead/settings', label: 'Settings', icon: Settings },
];

const memberNavItems = [
  { path: '/member/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/member/signals', label: 'Signals', icon: Bell, badge: 2 },
  { path: '/member/skills', label: 'Skills', icon: Brain },
  { path: '/member/learning', label: 'Learning', icon: BookOpen },
  { path: '/member/idp', label: 'Dev Plan', icon: Target },
  { path: '/member/delivery', label: 'Delivery', icon: ClipboardList },
  { path: '/member/one-on-one-prep', label: '1:1 Prep', icon: MessageSquare },
  { path: '/member/coach', label: 'AI Coach', icon: GraduationCap },
  { path: '/member/settings', label: 'Settings', icon: Settings },
];

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { role, userName, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = role === 'team-lead' ? leadNavItems : memberNavItems;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.2 }}
        className="h-full flex flex-col border-r border-border bg-card/50 backdrop-blur-sm z-20"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-bold text-lg text-gradient"
              >
                LogIQ
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Role badge */}
        {!collapsed && (
          <div className="px-4 py-3">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {role === 'team-lead' ? 'Team Lead' : 'Team Member'}
            </div>
            <div className="text-sm font-semibold text-foreground mt-0.5">{userName}</div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && !collapsed && (
                  <span className="w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-border p-2 space-y-1">
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Sign Out</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>

      <FloatingCopilot />
    </div>
  );
};

export default AppShell;
