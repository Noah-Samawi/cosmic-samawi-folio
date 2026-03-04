import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Rocket } from 'lucide-react';

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  onProjectCreated: () => void;
}

const NewProjectDialog: React.FC<NewProjectDialogProps> = ({
  open,
  onOpenChange,
  userId,
  onProjectCreated,
}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    budget: '',
    timeline: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Project name is required.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('projects').insert({
      user_id: userId,
      title: form.title.trim(),
      status: 'In Review',
      budget: form.budget.trim() || null,
      timeline: form.timeline.trim() || null,
      description: form.description.trim() || null,
    });

    setLoading(false);

    if (error) {
      toast.error('Failed to create project. Please try again.');
      return;
    }

    toast.success('Project created successfully!');
    setForm({ title: '', budget: '', timeline: '', description: '' });
    onOpenChange(false);
    onProjectCreated();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-primary/20 bg-card">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-lg bg-primary/10">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="font-display text-xl">New Project</DialogTitle>
          </div>
          <DialogDescription>
            Tell us about your project. We'll review it and get back to you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Project Name *</Label>
            <Input
              id="title"
              placeholder="e.g. AI Dashboard Redesign"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              maxLength={100}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                placeholder="e.g. €5,000"
                value={form.budget}
                onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                placeholder="e.g. 4 weeks"
                value={form.timeline}
                onChange={(e) => setForm((f) => ({ ...f, timeline: e.target.value }))}
                maxLength={50}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project goals, requirements, and any other details..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              maxLength={2000}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Rocket className="w-4 h-4" />
              )}
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
