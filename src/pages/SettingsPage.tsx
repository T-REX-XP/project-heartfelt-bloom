import { Settings } from 'lucide-react';

const SettingsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-muted-foreground text-sm mt-1">Manage your preferences and account</p>
    </div>
    <div className="glass rounded-xl p-12 text-center">
      <Settings className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">Settings Coming Soon</h3>
      <p className="text-sm text-muted-foreground">Account preferences, notifications, and integrations will be available here.</p>
    </div>
  </div>
);

export default SettingsPage;
