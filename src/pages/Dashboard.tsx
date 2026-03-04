import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FolderKanban,
  HeadphonesIcon,
  CreditCard,
  LogOut,
  Zap,
  MessageSquare,
  User,
  Globe,
} from 'lucide-react';

type TabKey = 'overview' | 'projects' | 'support' | 'billing';

interface ProjectStatus {
  name: string;
  status: 'in_progress' | 'deployed' | 'planning';
  description: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const sidebarItems: { key: TabKey; icon: React.ElementType; label: string }[] = [
    { key: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { key: 'projects', icon: FolderKanban, label: 'My Projects' },
    { key: 'support', icon: HeadphonesIcon, label: 'Support' },
    { key: 'billing', icon: CreditCard, label: 'Billing' },
  ];

  const mockProjects: ProjectStatus[] = [
    {
      name: 'AI Customer Intelligence Suite',
      status: 'in_progress',
      description: 'Optimizing automation workflows. Next: Sprint Review.',
    },
    {
      name: 'Smart SaaS Financial Dashboard',
      status: 'deployed',
      description: 'System Live. Your AI integration is now scaling operations.',
    },
  ];

  const statusColors: Record<string, string> = {
    in_progress: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    deployed: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    planning: 'text-primary bg-primary/10 border-primary/30',
  };

  const statusLabels: Record<string, string> = {
    in_progress: 'In Progress',
    deployed: 'Deployed',
    planning: 'Planning',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const userName = user?.email?.split('@')[0] || 'Client';

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-primary/20 bg-card/50 backdrop-blur-sm flex flex-col relative overflow-hidden">
        {/* Cyberpunk accent line */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
        <div className="p-6 border-b border-primary/20">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center font-display text-sm font-bold text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
              NS
            </div>
            <span className="font-display text-lg font-bold gradient-text">Tech-Noah</span>
          </a>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => navigate('/home')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all text-muted-foreground hover:text-foreground hover:bg-muted/50 mb-2 border border-border/30"
          >
            <Globe className="w-4 h-4" />
            Back to Website
          </button>
          {sidebarItems.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                activeTab === key
                  ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border/30">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start gap-2 text-muted-foreground">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header with neon welcome */}
        <header className="border-b border-border/30 p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              Welcome back, <span className="gradient-text glow-text">{userName}</span>.
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Your AI systems are running at optimal performance.
            </p>
          </motion.div>
        </header>

        <div className="p-6 md:p-8">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Active Projects', value: '2', icon: FolderKanban },
                  { label: 'System Uptime', value: '99.9%', icon: Zap },
                  { label: 'Support Tickets', value: '0 Open', icon: HeadphonesIcon },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{label}</span>
                    </div>
                    <span className="text-2xl font-bold text-foreground">{value}</span>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <h2 className="font-display text-xl font-bold text-foreground">Your Projects</h2>
              <div className="grid gap-4">
                {mockProjects.map((project) => (
                  <div key={project.name} className="glass-card p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display text-lg font-semibold text-foreground">{project.name}</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
                        {statusLabels[project.status]}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">My Projects</h2>
              {mockProjects.map((project) => (
                <div key={project.name} className="glass-card p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-lg font-semibold text-foreground">{project.name}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
                      {statusLabels[project.status]}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="font-display text-xl font-bold text-foreground">Support</h2>
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  Direct Access to Lead Engineer
                </h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
                  Have a technical question? Message Noah directly.<br />
                  Response time: <span className="text-primary font-semibold">&lt;4 hrs</span>
                </p>
                <Button asChild>
                  <a href="mailto:kontakt@noahsamawi.de" className="gap-2">
                    <Mail className="w-4 h-4" /> Send Message
                  </a>
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === 'billing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="font-display text-xl font-bold text-foreground">Billing</h2>
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  No Active Subscription
                </h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Your billing details will appear here once a service retainer or support plan is activated.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

// Need Mail icon import fix
const Mail = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default Dashboard;
