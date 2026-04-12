"use client";

import { useState, useEffect } from "react";
import { getSiteSettings, updateSiteSettings } from "@/lib/firestore";
import { CloudinaryUploadWidget } from "@/components/admin/CloudinaryUploadWidget";
import { Save, Loader2, PlaySquare } from "lucide-react";
import type { SiteSettings } from "@/types";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSiteSettings();
        if (data) {
          setSettings(data);
          setHeroVideoUrl(data.heroVideoUrl || "");
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage("");
    try {
      await updateSiteSettings({ heroVideoUrl });
      setSuccessMessage("Settings saved successfully.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-[#94A3B8]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] flex items-center gap-3">
          <PlaySquare className="text-[#3B82F6]" size={28} /> Site Settings
        </h1>
        <p className="text-[#94A3B8] mt-2">
          Manage global site configuration and media.
        </p>
      </div>

      <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-white mb-6">Hero Section</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#F8FAFC] mb-2">
              Background Video
            </label>
            <p className="text-sm text-[#94A3B8] mb-4">
              Upload an MP4 or WebM video to display in the background of the landing page hero section. Wait for the upload to complete before saving.
            </p>
            <CloudinaryUploadWidget
              onUpload={(url) => setHeroVideoUrl(url)}
              currentUrl={heroVideoUrl}
              label="Hero Background Video"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div>
            {successMessage && (
              <span className="text-emerald-400 text-sm">{successMessage}</span>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
