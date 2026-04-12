"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/lib/firestore";
import { ServiceForm } from "@/components/admin/ServiceForm";
import type { Service } from "@/types";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Briefcase,
  RefreshCw,
  Search,
} from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleCreate(
    data: Omit<Service, "id" | "createdAt" | "updatedAt">
  ) {
    await createService(data);
    setShowForm(false);
    await fetchData();
  }

  async function handleUpdate(
    data: Omit<Service, "id" | "createdAt" | "updatedAt">
  ) {
    if (!editingService?.id) return;
    await updateService(editingService.id, data);
    setEditingService(undefined);
    setShowForm(false);
    await fetchData();
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteService(id);
      await fetchData();
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setDeletingId(null);
    }
  }

  function openCreate() {
    setEditingService(undefined);
    setShowForm(true);
  }

  function openEdit(service: Service) {
    setEditingService(service);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingService(undefined);
  }

  const filteredServices = services.filter((s) =>
    s.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F8FAFC]">Services</h1>
          <p className="text-[#94A3B8] text-sm mt-1">
            Manage your service offerings.
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

      {/* Form */}
      {showForm && (
        <ServiceForm
          initialData={editingService}
          onSubmit={editingService ? handleUpdate : handleCreate}
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
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1E293B] border border-white/5 rounded-lg pl-11 pr-4 py-3 text-[#F8FAFC] placeholder-white/30 focus:outline-none focus:border-[#3B82F6] transition-colors text-sm"
          />
        </div>
      )}

      {/* List */}
      {!showForm && (
        <>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#1E293B] rounded-xl border border-white/5 p-6 animate-pulse"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-lg mb-4" />
                  <div className="h-5 w-32 bg-white/5 rounded mb-2" />
                  <div className="h-4 w-full bg-white/5 rounded" />
                </div>
              ))}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="bg-[#1E293B] rounded-xl border border-white/5 p-12 text-center">
              <Briefcase
                size={40}
                className="text-[#94A3B8]/30 mx-auto mb-4"
              />
              <p className="text-[#94A3B8]">
                {searchQuery
                  ? "No services match your search."
                  : "No services yet. Click \"Add New\" to create one."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-[#1E293B] rounded-xl border border-white/5 p-6 hover:border-white/10 transition-all group"
                >
                  {/* Icon */}
                  {service.icon_url ? (
                    <div className="w-12 h-12 rounded-lg bg-[#0F172A] border border-white/5 overflow-hidden mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.icon_url}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                      <Briefcase size={20} className="text-[#3B82F6]" />
                    </div>
                  )}

                  <h3 className="text-base font-semibold text-[#F8FAFC] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] line-clamp-3 mb-4">
                    {service.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(service)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#3B82F6] bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 rounded-lg transition-colors"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>
                    <button
                      onClick={() => service.id && handleDelete(service.id)}
                      disabled={deletingId === service.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deletingId === service.id ? (
                        <X size={12} className="animate-spin" />
                      ) : (
                        <Trash2 size={12} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredServices.length > 0 && (
            <p className="text-xs text-[#94A3B8] text-center">
              {filteredServices.length} service
              {filteredServices.length === 1 ? "" : "s"}
            </p>
          )}
        </>
      )}
    </div>
  );
}
