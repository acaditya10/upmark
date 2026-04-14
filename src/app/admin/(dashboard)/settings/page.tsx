"use client";

import { useState, useEffect } from "react";
import { getSiteSettings, updateSiteSettings } from "@/lib/firestore";
import { CloudinaryUploadWidget } from "@/components/admin/CloudinaryUploadWidget";
import { Save, Loader2, PlaySquare, ChevronDown, Plus, Trash2, Mail, Phone, MapPin, BarChart3, Lightbulb, ListOrdered, Film, Award } from "lucide-react";
import { revalidatePathAction } from "@/app/actions";
import type { SiteSettings, HeroMetric, PhilosophyPointer, ProcessStep, ContentItem, Advantage } from "@/types";

// ─── Collapsible Section Component ──────────────────────────

function Section({ title, icon: Icon, children, defaultOpen = false }: { title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[#1E293B] border border-white/10 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon size={20} className="text-[#3B82F6]" />
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        <ChevronDown size={18} className={`text-[#94A3B8] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-6 pb-6 border-t border-white/5 pt-6">{children}</div>}
    </div>
  );
}

// ─── Reusable input class ──────────────────────────────────

const inputClass = "w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-3 text-[#F8FAFC] placeholder-white/30 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Hero
  const [heroVideoUrl, setHeroVideoUrl] = useState("");
  const [heroMetrics, setHeroMetrics] = useState<HeroMetric[]>([
    { value: "120", suffix: "+", label: "Projects Delivered" },
    { value: "98", suffix: "%", label: "Client Retention" },
    { value: "3x", label: "Average ROI", isGold: true },
  ]);

  // Contact
  const [contactEmail, setContactEmail] = useState("hello@upmark.co");
  const [contactPhone, setContactPhone] = useState("+44 (0) 20 0000 0000");
  const [contactAddress, setContactAddress] = useState("London, United Kingdom");

  // Homepage content 
  const [philosophyPointers, setPhilosophyPointers] = useState<PhilosophyPointer[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [studioCapabilities, setStudioCapabilities] = useState<string[]>([]);
  const [advantages, setAdvantages] = useState<Advantage[]>([]);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSiteSettings();
        if (data) {
          setHeroVideoUrl(data.heroVideoUrl || "");
          if (data.heroMetrics?.length) setHeroMetrics(data.heroMetrics);
          if (data.contactEmail) setContactEmail(data.contactEmail);
          if (data.contactPhone) setContactPhone(data.contactPhone);
          if (data.contactAddress) setContactAddress(data.contactAddress);
          if (data.philosophyPointers?.length) setPhilosophyPointers(data.philosophyPointers);
          if (data.processSteps?.length) setProcessSteps(data.processSteps);
          if (data.contentItems?.length) setContentItems(data.contentItems);
          if (data.studioCapabilities?.length) setStudioCapabilities(data.studioCapabilities);
          if (data.advantages?.length) setAdvantages(data.advantages);
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
      await updateSiteSettings({
        heroVideoUrl,
        heroMetrics,
        contactEmail,
        contactPhone,
        contactAddress,
        philosophyPointers: philosophyPointers.length > 0 ? philosophyPointers : undefined,
        processSteps: processSteps.length > 0 ? processSteps : undefined,
        contentItems: contentItems.length > 0 ? contentItems : undefined,
        studioCapabilities: studioCapabilities.length > 0 ? studioCapabilities : undefined,
        advantages: advantages.length > 0 ? advantages : undefined,
      });
      // Revalidate all public pages
      await Promise.all([
        revalidatePathAction("/"),
        revalidatePathAction("/contact"),
        revalidatePathAction("/services"),
        revalidatePathAction("/work"),
        revalidatePathAction("/case-studies"),
      ]);
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
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F8FAFC] flex items-center gap-3">
            <PlaySquare className="text-[#3B82F6]" size={28} /> Site Settings
          </h1>
          <p className="text-[#94A3B8] mt-2">
            Manage global site configuration and content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {successMessage && (
            <span className="text-emerald-400 text-sm">{successMessage}</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save All
          </button>
        </div>
      </div>

      {/* ─── Hero Section ─────────────────────────────────── */}
      <Section title="Hero Section" icon={PlaySquare} defaultOpen={true}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#F8FAFC] mb-2">Background Video</label>
            <p className="text-sm text-[#94A3B8] mb-4">Upload an MP4 or WebM video for the hero background.</p>
            <CloudinaryUploadWidget
              onUpload={(url) => setHeroVideoUrl(url)}
              currentUrl={heroVideoUrl}
              label="Hero Background Video"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F8FAFC] mb-4">Hero Metrics</label>
            <div className="flex flex-col gap-3">
              {heroMetrics.map((metric, i) => (
                <div key={i} className="grid grid-cols-[1fr_80px_1fr_auto_auto] gap-2 items-center">
                  <input
                    value={metric.value}
                    onChange={(e) => { const m = [...heroMetrics]; m[i] = { ...m[i], value: e.target.value }; setHeroMetrics(m); }}
                    placeholder="Value (e.g. 120)"
                    className={inputClass}
                  />
                  <input
                    value={metric.suffix || ""}
                    onChange={(e) => { const m = [...heroMetrics]; m[i] = { ...m[i], suffix: e.target.value }; setHeroMetrics(m); }}
                    placeholder="+"
                    className={inputClass}
                  />
                  <input
                    value={metric.label}
                    onChange={(e) => { const m = [...heroMetrics]; m[i] = { ...m[i], label: e.target.value }; setHeroMetrics(m); }}
                    placeholder="Label"
                    className={inputClass}
                  />
                  <label className="flex items-center gap-1 text-xs text-[#94A3B8] cursor-pointer whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={metric.isGold || false}
                      onChange={(e) => { const m = [...heroMetrics]; m[i] = { ...m[i], isGold: e.target.checked }; setHeroMetrics(m); }}
                      className="accent-[#F59E0B]"
                    />
                    Gold
                  </label>
                  {heroMetrics.length > 1 && (
                    <button type="button" onClick={() => setHeroMetrics(heroMetrics.filter((_, j) => j !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setHeroMetrics([...heroMetrics, { value: "", label: "" }])} className="flex items-center gap-2 text-sm text-[#3B82F6] hover:text-blue-400 self-start">
                <Plus size={16} /> Add Metric
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Contact Info ─────────────────────────────────── */}
      <Section title="Contact Information" icon={Mail}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#F8FAFC] flex items-center gap-2"><Mail size={14} className="text-[#3B82F6]" /> Email</label>
            <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="hello@upmark.co" className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#F8FAFC] flex items-center gap-2"><Phone size={14} className="text-[#3B82F6]" /> Phone</label>
            <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+44 (0) 20 0000 0000" className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#F8FAFC] flex items-center gap-2"><MapPin size={14} className="text-[#3B82F6]" /> Address</label>
            <input value={contactAddress} onChange={(e) => setContactAddress(e.target.value)} placeholder="London, United Kingdom" className={inputClass} />
          </div>
        </div>
      </Section>

      {/* ─── Philosophy Pointers ──────────────────────────── */}
      <Section title="Philosophy Pointers" icon={Lightbulb}>
        <p className="text-sm text-[#94A3B8] mb-4">Override the 4 philosophy pointer cards on the homepage. Leave empty to use defaults.</p>
        <div className="flex flex-col gap-3">
          {philosophyPointers.map((p, i) => (
            <div key={i} className="grid grid-cols-[200px_1fr_auto] gap-2 items-start">
              <input value={p.title} onChange={(e) => { const arr = [...philosophyPointers]; arr[i] = { ...arr[i], title: e.target.value }; setPhilosophyPointers(arr); }} placeholder="Title" className={inputClass} />
              <textarea value={p.desc} onChange={(e) => { const arr = [...philosophyPointers]; arr[i] = { ...arr[i], desc: e.target.value }; setPhilosophyPointers(arr); }} placeholder="Description" className={`${inputClass} resize-none`} rows={2} />
              <button type="button" onClick={() => setPhilosophyPointers(philosophyPointers.filter((_, j) => j !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg mt-1"><Trash2 size={14} /></button>
            </div>
          ))}
          <button type="button" onClick={() => setPhilosophyPointers([...philosophyPointers, { title: "", desc: "" }])} className="flex items-center gap-2 text-sm text-[#3B82F6] hover:text-blue-400 self-start">
            <Plus size={16} /> Add Pointer
          </button>
        </div>
      </Section>

      {/* ─── Process Steps ────────────────────────────────── */}
      <Section title="Process Steps" icon={ListOrdered}>
        <p className="text-sm text-[#94A3B8] mb-4">Override the 6-step process on the homepage. Leave empty to use defaults.</p>
        <div className="flex flex-col gap-3">
          {processSteps.map((s, i) => (
            <div key={i} className="grid grid-cols-[40px_200px_1fr_auto] gap-2 items-start">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#94A3B8] text-xs font-bold mt-1">{i + 1}</div>
              <input value={s.title} onChange={(e) => { const arr = [...processSteps]; arr[i] = { ...arr[i], title: e.target.value }; setProcessSteps(arr); }} placeholder="Step title" className={inputClass} />
              <textarea value={s.description} onChange={(e) => { const arr = [...processSteps]; arr[i] = { ...arr[i], description: e.target.value }; setProcessSteps(arr); }} placeholder="Step description" className={`${inputClass} resize-none`} rows={2} />
              <button type="button" onClick={() => setProcessSteps(processSteps.filter((_, j) => j !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg mt-1"><Trash2 size={14} /></button>
            </div>
          ))}
          <button type="button" onClick={() => setProcessSteps([...processSteps, { title: "", description: "" }])} className="flex items-center gap-2 text-sm text-[#3B82F6] hover:text-blue-400 self-start">
            <Plus size={16} /> Add Step
          </button>
        </div>
      </Section>

      {/* ─── Content Items ────────────────────────────────── */}
      <Section title="Content Studio Items" icon={Film}>
        <p className="text-sm text-[#94A3B8] mb-4">Override the content studio grid on the homepage. Leave empty to use defaults.</p>
        <div className="flex flex-col gap-3">
          {contentItems.map((c, i) => (
            <div key={i} className="grid grid-cols-[150px_150px_1fr_auto] gap-2 items-start">
              <input value={c.title} onChange={(e) => { const arr = [...contentItems]; arr[i] = { ...arr[i], title: e.target.value }; setContentItems(arr); }} placeholder="Title" className={inputClass} />
              <input value={c.subtitle} onChange={(e) => { const arr = [...contentItems]; arr[i] = { ...arr[i], subtitle: e.target.value }; setContentItems(arr); }} placeholder="Subtitle" className={inputClass} />
              <textarea value={c.description} onChange={(e) => { const arr = [...contentItems]; arr[i] = { ...arr[i], description: e.target.value }; setContentItems(arr); }} placeholder="Description" className={`${inputClass} resize-none`} rows={2} />
              <button type="button" onClick={() => setContentItems(contentItems.filter((_, j) => j !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg mt-1"><Trash2 size={14} /></button>
            </div>
          ))}
          <button type="button" onClick={() => setContentItems([...contentItems, { title: "", subtitle: "", description: "" }])} className="flex items-center gap-2 text-sm text-[#3B82F6] hover:text-blue-400 self-start">
            <Plus size={16} /> Add Item
          </button>
        </div>
      </Section>

      {/* ─── Studio Capabilities ──────────────────────────── */}
      <Section title="Studio Capabilities" icon={Award}>
        <p className="text-sm text-[#94A3B8] mb-4">Override the studio capabilities list. Leave empty to use defaults.</p>
        <div className="flex flex-col gap-2">
          {studioCapabilities.map((cap, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={cap} onChange={(e) => { const arr = [...studioCapabilities]; arr[i] = e.target.value; setStudioCapabilities(arr); }} placeholder="Capability" className={`${inputClass} flex-1`} />
              <button type="button" onClick={() => setStudioCapabilities(studioCapabilities.filter((_, j) => j !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
            </div>
          ))}
          <button type="button" onClick={() => setStudioCapabilities([...studioCapabilities, ""])} className="flex items-center gap-2 text-sm text-[#3B82F6] hover:text-blue-400 self-start">
            <Plus size={16} /> Add Capability
          </button>
        </div>
      </Section>

      {/* ─── Advantages ───────────────────────────────────── */}
      <Section title="Why Upmark — Advantages" icon={BarChart3}>
        <p className="text-sm text-[#94A3B8] mb-4">Override the 6 advantage cards on the homepage. Leave empty to use defaults.</p>
        <div className="flex flex-col gap-3">
          {advantages.map((a, i) => (
            <div key={i} className="grid grid-cols-[200px_1fr_auto] gap-2 items-start">
              <input value={a.title} onChange={(e) => { const arr = [...advantages]; arr[i] = { ...arr[i], title: e.target.value }; setAdvantages(arr); }} placeholder="Title" className={inputClass} />
              <textarea value={a.desc} onChange={(e) => { const arr = [...advantages]; arr[i] = { ...arr[i], desc: e.target.value }; setAdvantages(arr); }} placeholder="Description" className={`${inputClass} resize-none`} rows={2} />
              <button type="button" onClick={() => setAdvantages(advantages.filter((_, j) => j !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg mt-1"><Trash2 size={14} /></button>
            </div>
          ))}
          <button type="button" onClick={() => setAdvantages([...advantages, { title: "", desc: "" }])} className="flex items-center gap-2 text-sm text-[#3B82F6] hover:text-blue-400 self-start">
            <Plus size={16} /> Add Advantage
          </button>
        </div>
      </Section>

      {/* Bottom save */}
      <div className="flex items-center justify-between py-4">
        <div>
          {successMessage && <span className="text-emerald-400 text-sm">{successMessage}</span>}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save All Settings
        </button>
      </div>
    </div>
  );
}
