import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User } from 'lucide-react';

interface ProfileSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  onProfileUpdate: (profile: { first_name: string; last_name: string; company_name: string }) => void;
}

const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({ open, onOpenChange, userId, onProfileUpdate }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    if (open && userId) {
      supabase
        .from('profiles')
        .select('first_name, last_name, company_name')
        .eq('user_id', userId)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setFirstName(data.first_name || '');
            setLastName(data.last_name || '');
            setCompanyName(data.company_name || '');
          }
        });
    }
  }, [open, userId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          first_name: firstName.trim() || null,
          last_name: lastName.trim() || null,
          company_name: companyName.trim() || null,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (error) throw error;

      onProfileUpdate({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        company_name: companyName.trim(),
      });

      toast({ title: 'Profile updated', description: 'Your changes have been saved.' });
      onOpenChange(false);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> Profile Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Noah" className="bg-card/50 border-border/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Al-Samawi" className="bg-card/50 border-border/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Acme Corp" className="bg-card/50 border-border/50" />
          </div>
          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettingsModal;
