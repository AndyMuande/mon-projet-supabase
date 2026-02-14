'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cog, Package, Bell, Shield, Code } from 'lucide-react';

type SettingsState = {
  libraryName: string;
  description: string;
  lowStockThreshold: number;
  lowStockAlerts: boolean;
  newBookUpdates: boolean;
  systemNotifications: boolean;
};

const STORAGE_KEY = 'bookvault.settings';

const DEFAULT_SETTINGS: SettingsState = {
  libraryName: 'BookVault',
  description: 'Your personal book library management system',
  lowStockThreshold: 5,
  lowStockAlerts: true,
  newBookUpdates: false,
  systemNotifications: true,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  useEffect(() => {
    try {
      const rawSettings = localStorage.getItem(STORAGE_KEY);
      if (!rawSettings) return;

      const parsed = JSON.parse(rawSettings) as Partial<SettingsState>;
      setSettings({
        libraryName: parsed.libraryName ?? DEFAULT_SETTINGS.libraryName,
        description: parsed.description ?? DEFAULT_SETTINGS.description,
        lowStockThreshold: parsed.lowStockThreshold ?? DEFAULT_SETTINGS.lowStockThreshold,
        lowStockAlerts: parsed.lowStockAlerts ?? DEFAULT_SETTINGS.lowStockAlerts,
        newBookUpdates: parsed.newBookUpdates ?? DEFAULT_SETTINGS.newBookUpdates,
        systemNotifications: parsed.systemNotifications ?? DEFAULT_SETTINGS.systemNotifications,
      });
    } catch {
      setSaveStatus('error');
    }
  }, []);

  const handleSaveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch {
      setSaveStatus('error');
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-slate-400">Manage your preferences and library settings</p>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* General Settings */}
        <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 ring-1 ring-blue-500/30">
                <Cog className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">General Settings</h2>
            </div>
          </div>
          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Library Name</label>
              <input
                type="text"
                value={settings.libraryName}
                onChange={(event) =>
                  setSettings((previous) => ({
                    ...previous,
                    libraryName: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-slate-500 transition-colors focus:border-blue-500/50 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Description</label>
              <textarea
                value={settings.description}
                onChange={(event) =>
                  setSettings((previous) => ({
                    ...previous,
                    description: event.target.value,
                  }))
                }
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-slate-500 transition-colors focus:border-blue-500/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 ring-1 ring-orange-500/30">
                <Bell className="h-5 w-5 text-orange-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </div>
          </div>
          <div className="space-y-4 p-6">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.lowStockAlerts}
                onChange={(event) =>
                  setSettings((previous) => ({
                    ...previous,
                    lowStockAlerts: event.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-white/20 bg-slate-800 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-300">Low stock alerts</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.newBookUpdates}
                onChange={(event) =>
                  setSettings((previous) => ({
                    ...previous,
                    newBookUpdates: event.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-white/20 bg-slate-800 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-300">New book updates</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.systemNotifications}
                onChange={(event) =>
                  setSettings((previous) => ({
                    ...previous,
                    systemNotifications: event.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-white/20 bg-slate-800 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-300">System notifications</span>
            </label>
          </div>
        </div>

        {/* Inventory */}
        <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 ring-1 ring-green-500/30">
                <Package className="h-5 w-5 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Inventory</h2>
            </div>
          </div>
          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Low Stock Threshold</label>
              <input
                type="number"
                value={settings.lowStockThreshold}
                onChange={(event) =>
                  setSettings((previous) => ({
                    ...previous,
                    lowStockThreshold: Number(event.target.value || DEFAULT_SETTINGS.lowStockThreshold),
                  }))
                }
                min="1"
                max="100"
                className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-4 py-2 text-white placeholder-slate-500 transition-colors focus:border-blue-500/50 focus:outline-none"
              />
              <p className="text-xs text-slate-500">Books with stock below this value will be flagged</p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 ring-1 ring-purple-500/30">
                <Shield className="h-5 w-5 text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Security</h2>
            </div>
          </div>
          <div className="space-y-3 p-6">
            <div className="rounded-lg border border-white/10 bg-slate-800/30 p-3">
              <p className="text-sm text-slate-400">Last login: Today at 10:32 AM</p>
            </div>
            <button className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
              Change Password
            </button>
          </div>
        </div>

        {/* Developer */}
        <div className="md:col-span-2 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-600/30 ring-1 ring-white/10">
                <Code className="h-5 w-5 text-slate-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Developer</h2>
            </div>
          </div>
          <div className="space-y-4 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs text-slate-400">API Base URL</p>
                <code className="block rounded bg-slate-800 px-3 py-2 text-xs text-slate-300">
                  /api
                </code>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-slate-400">Database</p>
                <code className="block rounded bg-slate-800 px-3 py-2 text-xs text-slate-300">
                  Supabase PostgreSQL
                </code>
              </div>
            </div>
            <Link
              href="/api-docs"
              className="block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              View API Documentation
            </Link>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSaveSettings}
          className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
      <div className="mt-3 text-right">
        {saveStatus === 'saved' && (
          <p className="text-sm text-green-400">Settings saved successfully.</p>
        )}
        {saveStatus === 'error' && (
          <p className="text-sm text-red-400">Unable to save settings. Please try again.</p>
        )}
      </div>
    </div>
  );
}
