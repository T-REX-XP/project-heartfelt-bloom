import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Users, User, Shield, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import type { Role } from '@/domain/types';

const roles: { role: Role; label: string; desc: string; icon: React.ElementType; path: string }[] = [
  { role: 'team-lead', label: 'Team Lead', desc: 'View team dashboards, signals, risks, and prepare for 1:1s with AI copilot assistance.', icon: Users, path: '/lead/dashboard' },
  { role: 'team-member', label: 'Team Member', desc: 'Track your growth, receive private coaching, manage your development plan, and prepare for 1:1s.', icon: User, path: '/member/dashboard' },
  { role: 'admin', label: 'Demo Viewer', desc: 'Explore both experiences and see the full platform capabilities.', icon: Shield, path: '/lead/dashboard' },
];

const DemoSelector = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const select = (r: typeof roles[0]) => {
    login(r.role);
    navigate(r.path);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center mesh-bg relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-gradient">LogIQ</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Choose Your Experience</h1>
          <p className="text-muted-foreground mb-12">Select a role to explore the LogIQ platform demo.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((r, i) => (
            <motion.button
              key={r.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              onClick={() => select(r)}
              className="glass rounded-2xl p-8 text-left hover:glow-primary hover:scale-[1.03] transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <r.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{r.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoSelector;
