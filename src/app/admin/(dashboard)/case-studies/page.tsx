"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getCaseStudies,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from "@/lib/firestore";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import type { CaseStudy } from "@/types";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  FileText,
  RefreshCw,
  Search,
} from "lucide-react";

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCaseStudies();
      setCaseStudies(data);
    } catch (err) {
      console.error("Failed to fetch case studies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleCreate(
    data: Omit<CaseStudy, "id" | "createdAt" | "updatedAt">
  ) {
    await createCaseStudy(data);
    setShowForm(false);
    await fetchData();
  }

  async function handleUpdate(
    data: Omit<CaseStudy, "id" | "createdAt" | "updatedAt">
  ) {
    if (!editingStudy?.id) return;
    await updateCaseStudy(editingStudy.id, data);
    setEditingStudy(undefined);
    setShowForm(false);
    await fetchData();
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteCaseStudy(id);
      await fetchData();
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setDeletingId(null);
    }
  }

  function openCreate() {
    setEditingStudy(undefined);
    setShowForm(true);
  }

  function openEdit(study: CaseStudy) {
    setEditingStudy(study);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingStudy(undefined);
  }

  const filteredStudies = caseStudies.filter(
    (cs) =>
      cs.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryBadgeColor: Record<string, string> = {
    Studies: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Success Stories": "bg-green-500/10 text-green-400 border-green-500/20",
    "Stills & Motions": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F8FAFC]">Case Studies</h1>
          <p className="text-[#94A3B8] text-sm mt-1">
            Manage your portfolio case studies.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white text-sm rounded-lg border border-white/5 transition-all"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all"
          >
            <Plus size={16} />
            Add New
          </button>
        </div>
      </div>

      {/* Form (shown inline) */}
      {showForm && (
        <CaseStudyForm
          initialData={editingStudy}
          onSubmit={editingStudy ? handleUpdate : handleCreate}
          onCancel={closeForm}
        />
      )}

      {/* Search */}
      {!showForm && (
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />
          <input
            type="text"
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1E293B] border border-white/5 rounded-lg pl-11 pr-4 py-3 text-[#F8FAFC] placeholder-white/30 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm"
          />
        </div>
      )}

      {/* Table */}
      {!showForm && (
        <>
          {loading ? (
            <div className="bg-[#1E293B] rounded-xl border border-white/5 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="px-6 py-5 border-b border-white/5 animate-pulse flex items-center gap-4"
                >
                  <div className="h-4 w-32 bg-white/5 rounded" />
                  <div className="h-4 w-20 bg-white/5 rounded" />
                  <div className="h-4 w-24 bg-white/5 rounded ml-auto" />
                </div>
              ))}
            </div>
          ) : filteredStudies.length === 0 ? (
            <div className="bg-[#1E293B] rounded-xl border border-white/5 p-12 text-center">
              <FileText
                size={40}
                className="text-[#94A3B8]/30 mx-auto mb-4"
              />
              <p className="text-[#94A3B8]">
                {searchQuery
                  ? "No case studies match your search."
                  : "No case studies yet. Click \"Add New\" to create one."}
              </p>
            </div>
          ) : (
            <div className="bg-[#1E293B] rounded-xl border border-white/5 overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-[1fr_120px_160px_100px] gap-4 px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Title / Client
                </span>
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Category
                </span>
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Metrics
                </span>
                <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider text-right">
                  Actions
                </span>
              </div>

              {/* Rows */}
              {filteredStudies.map((study) => (
                <div
                  key={study.id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_120px_160px_100px] gap-2 md:gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors items-center"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#F8FAFC] truncate">
                      {study.title}
                    </p>
                    <p className="text-xs text-[#94A3B8] truncate">
                      {study.client}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full border ${
                        categoryBadgeColor[study.category] ||
                        "bg-white/5 text-[#94A3B8] border-white/10"
                      }`}
                    >
                      {study.category}
                    </span>
                  </div>
                  <div className="text-xs text-[#94A3B8] truncate">
                    {study.metrics?.join(", ") || "—"}
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => openEdit(study)}
                      className="p-2 text-[#94A3B8] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => study.id && handleDelete(study.id)}
                      disabled={deletingId === study.id}
                      className="p-2 text-[#94A3B8] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === study.id ? (
                        <X size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredStudies.length > 0 && (
            <p className="text-xs text-[#94A3B8] text-center">
              {filteredStudies.length} case{" "}
              {filteredStudies.length === 1 ? "study" : "studies"}
            </p>
          )}
        </>
      )}
    </div>
  );
}
