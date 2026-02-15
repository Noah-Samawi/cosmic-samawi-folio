import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { Loader2, ArrowLeft, Mail, Lock, Sparkles } from 'lucide-react';

// Google icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Apple icon
const AppleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<'login' | 'signup' | 'magic'>('login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate('/dashboard');
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/dashboard');
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleOAuth = async (provider: 'google' | 'apple') => {
    const { error } = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({ title: 'Error', description: String(error), variant: 'destructive' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'magic') {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({ title: 'Check your email', description: 'We sent you a magic link to sign in.' });
      } else if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({ title: 'Account created!', description: 'Please check your email to verify your account.' });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-4 relative z-10"
      >
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="mb-6 gap-2 text-muted-foreground">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="glass-card p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-display text-sm text-primary font-medium">Tech-Noah Solutions</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              {mode === 'login' ? 'Client Login' : mode === 'signup' ? 'Create Account' : 'Magic Link'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === 'magic' ? 'Sign in with a link sent to your email' : mode === 'login' ? 'Access your project dashboard' : 'Join Tech-Noah Solutions'}
            </p>
          </div>

          {/* OAuth Providers */}
          <div className="flex gap-3 mb-6">
            <Button variant="outline" className="flex-1 h-12 gap-2" onClick={() => handleOAuth('google')}>
              <GoogleIcon /> Google
            </Button>
            <Button variant="outline" className="flex-1 h-12 gap-2" onClick={() => handleOAuth('apple')}>
              <AppleIcon /> Apple
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com" className="pl-10 bg-card/50 border-border/50 h-12" required />
              </div>
            </div>

            {mode !== 'magic' && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" className="pl-10 bg-card/50 border-border/50 h-12" required minLength={6} />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> :
                mode === 'magic' ? 'Send Magic Link' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 space-y-2 text-center">
            {mode !== 'magic' && (
              <button onClick={() => setMode('magic')} className="text-sm text-primary hover:underline block mx-auto">
                Sign in with Magic Link (passwordless)
              </button>
            )}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-sm text-muted-foreground hover:text-primary transition-colors block mx-auto"
            >
              {mode === 'login' || mode === 'magic' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
