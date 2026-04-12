"use client";

import { useEffect, useState } from "react";
import { getLeads } from "@/lib/firestore";
import type { Lead } from "@/types";
import {
  Users,
  Mail,
  Building2,
  Calendar,
  Briefcase,
  RefreshCw,
  Search,
} from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchLeads() {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function formatDate(timestamp: Lead["createdAt"]) {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp as unknown as string);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F8FAFC]">Leads</h1>
          <p className="text-[#94A3B8] text-sm mt-1">
            Contact form submissions from the website.
          </p>
        </div>
        <button
          onClick={fetchLeads}
          className="self-start flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white text-sm rounded-lg border border-white/5 transition-all"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
        />
        <input
          type="text"
          placeholder="Search by name, email, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#1E293B] border border-white/5 rounded-lg pl-11 pr-4 py-3 text-[#F8FAFC] placeholder-white/30 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm"
        />
      </div>

      {/* Leads List */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#1E293B] rounded-xl border border-white/5 p-6 animate-pulse"
            >
              <div className="h-5 w-40 bg-white/5 rounded mb-4" />
              <div className="h-4 w-60 bg-white/5 rounded mb-2" />
              <div className="h-4 w-full bg-white/5 rounded" />
            </div>
          ))}
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-[#1E293B] rounded-xl border border-white/5 p-12 text-center">
          <Users size={40} className="text-[#94A3B8]/30 mx-auto mb-4" />
          <p className="text-[#94A3B8]">
            {searchQuery
              ? "No leads match your search."
              : "No leads yet. They'll appear here when someone submits the contact form."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-[#1E293B] rounded-xl border border-white/5 p-6 hover:border-white/10 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-[#F8FAFC] mb-3">
                    {lead.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-[#94A3B8]">
                      <Mail size={14} className="shrink-0 text-[#3B82F6]" />
                      <a
                        href={`mailto:${lead.email}`}
                        className="hover:text-[#3B82F6] transition-colors truncate"
                      >
                        {lead.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-[#94A3B8]">
                      <Building2 size={14} className="shrink-0 text-[#22C55E]" />
                      <span className="truncate">
                        {lead.company || "Not specified"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#94A3B8]">
                      <Briefcase size={14} className="shrink-0 text-[#F59E0B]" />
                      <span className="truncate">{lead.service}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#94A3B8]">
                      <Calendar size={14} className="shrink-0 text-[#94A3B8]" />
                      <span>{formatDate(lead.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
              {lead.projectDetails && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-sm text-[#94A3B8] leading-relaxed whitespace-pre-wrap">
                    {lead.projectDetails}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Count */}
      {!loading && filteredLeads.length > 0 && (
        <p className="text-xs text-[#94A3B8] text-center">
          Showing {filteredLeads.length} of {leads.length} leads
        </p>
      )}
    </div>
  );
}
