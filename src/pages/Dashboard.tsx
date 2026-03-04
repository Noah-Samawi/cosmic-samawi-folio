import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import ProfileSettingsModal from '@/components/ProfileSettingsModal';
import NewProjectDialog from '@/components/NewProjectDialog';
import {
  LayoutDashboard,
  FolderKanban,
  HeadphonesIcon,
  CreditCard,
  LogOut,
  Zap,
  MessageSquare,
  Globe,
  UserCog,
  Rocket,
  Plus,
  Calendar,
  DollarSign,
} from 'lucide-react';

type TabKey = 'overview' | 'projects' | 'support' | 'billing';

interface Project {
  id: string;
  title: string;
  status: string;
  budget: string | null;
  timeline: string | null;
  description: string | null;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = useCallback(async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProjects(data as Project[]);
  }, []);

  useEffect(() => {
    const init = async (userId: string) => {
      const { data } = await supabase
        .from('profiles')
        .select('first_name')
        .eq('user_id', userId)
        .maybeSingle();
      if (data?.first_name) setProfileName(data.first_name);
      await fetchProjects();
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) { navigate('/login'); return; }
      setUser(session.user);
      init(session.user.id);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate('/login'); return; }
      setUser(session.user);
      init(session.user.id);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate, fetchProjects]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const userName = profileName ||
    user?.user_metadata?.first_name ||
    user?.user_metadata?.full_name?.split(' ')[0] ||
    'Partner';

  const sidebarItems: { key: TabKey; icon: React.ElementType; label: string }[] = [
    { key: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { key: 'projects', icon: FolderKanban, label: 'My Projects' },
    { key: 'support', icon: HeadphonesIcon, label: 'Support' },
    { key: 'billing', icon: CreditCard, label: 'Billing' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'In Review': return 'bg-yellow-500/20 text-yellow-400';
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Completed': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 border border-border/50 hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display text-lg font-bold text-foreground">{project.title}</h3>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      {project.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
      )}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {project.budget && (
          <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{project.budget}</span>
        )}
        {project.timeline && (
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.timeline}</span>
        )}
        <span className="ml-auto">{new Date(project.created_at).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-10 text-center border border-primary/20"
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6">
        <Rocket className="w-10 h-10 text-primary" />
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-3">Start Your First Project</h3>
      <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
        Ready to build something extraordinary? Tell us about your vision and we'll bring it to life.
      </p>
      <Button onClick={() => setNewProjectOpen(true)} size="lg" className="gap-2 px-8">
        <Zap className="w-4 h-4" /> Launch Project
      </Button>
    </motion.div>
  );

  const ProjectsList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-foreground">
          {activeTab === 'overview' ? 'Your Projects' : 'My Projects'}
        </h2>
        <Button onClick={() => setNewProjectOpen(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </div>
      {projects.length === 0 ? <EmptyState /> : (
        <div className="grid gap-4">
          {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-primary/20 bg-card/50 backdrop-blur-sm flex flex-col relative overflow-hidden">
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
            onClick={() => navigate('/')}
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

        <div className="p-4 border-t border-border/30 space-y-1">
          <Button variant="ghost" size="sm" onClick={() => setProfileModalOpen(true)} className="w-full justify-start gap-2 text-muted-foreground">
            <UserCog className="w-4 h-4" /> Profile Settings
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start gap-2 text-muted-foreground">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="border-b border-border/30 p-6 md:p-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              Welcome, <span className="gradient-text glow-text">{userName}</span>.
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Your command center is ready.</p>
          </motion.div>
        </header>

        <div className="p-6 md:p-8">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Active Projects', value: String(projects.length), icon: FolderKanban },
                  { label: 'System Status', value: 'Online', icon: Zap },
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
              <ProjectsList />
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProjectsList />
            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="font-display text-xl font-bold text-foreground">Support</h2>
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">Direct Access to Lead Engineer</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
                  Have a technical question? Message Noah directly.<br />
                  Response time: <span className="text-primary font-semibold">&lt;4 hrs</span>
                </p>
                <Button asChild>
                  <a href="mailto:kontakt@noahsamawi.de" className="gap-2">
                    <MailIcon className="w-4 h-4" /> Send Message
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
                <h3 className="font-display text-lg font-bold text-foreground mb-2">No Active Subscription</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Your billing details will appear here once a service retainer or support plan is activated.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {user && (
        <>
          <ProfileSettingsModal
            open={profileModalOpen}
            onOpenChange={setProfileModalOpen}
            userId={user.id}
            onProfileUpdate={(p) => { if (p.first_name) setProfileName(p.first_name); }}
          />
          <NewProjectDialog
            open={newProjectOpen}
            onOpenChange={setNewProjectOpen}
            userId={user.id}
            onProjectCreated={fetchProjects}
          />
        </>
      )}
    </div>
  );
};

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default Dashboard;
