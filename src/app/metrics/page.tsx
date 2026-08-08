"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredLeads, getStoredMetrics, trackSectionClick, LeadEntry, SectionMetric } from "@/lib/metrics-store";

export default function MetricsDashboardPage() {
  const [leads, setLeads] = useState<LeadEntry[]>([]);
  const [metrics, setMetrics] = useState<SectionMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"leads" | "heatmap" | "traffic">("leads");

  useEffect(() => {
    Promise.all([getStoredLeads(), getStoredMetrics()])
      .then(([leadsData, metricsData]) => {
        setLeads(leadsData);
        setMetrics(metricsData.length > 0 ? metricsData : [
          { id: "sec-hero", name: "Hero CTA & Banner Clicks", views: 0, clicks: 0, lastActive: "—" },
          { id: "sec-whatsapp", name: "WhatsApp Quick Inquiry", views: 0, clicks: 0, lastActive: "—" },
          { id: "sec-contact-form", name: "Contact Form Submissions", views: 0, clicks: 0, lastActive: "—" }
        ]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.product && l.product.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Phone", "Email", "Requirement", "Source Page", "Timestamp"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${l.product || ""}"`,
      `"${l.sourcePage}"`,
      `"${l.timestamp}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalClicks = metrics.reduce((acc, curr) => acc + curr.clicks, 0);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <img src="/reverbex-logo.png" alt="Reverbex Logo" className="w-8 h-8 rounded object-contain bg-white/10 p-1" />
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Client Analytics & Lead Intelligence</h1>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Powered &amp; Engineered by{" "}
            <a href="https://reverbex.in" target="_blank" rel="noreferrer" className="text-amber-400 font-semibold hover:underline">
              Reverbex Technology
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-sm transition-all shadow-md flex items-center gap-2"
          >
            Export Leads (CSV)
          </button>
          <Link href="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all">
            Back to Website
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 space-y-8">
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading analytics data...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#161b22] border border-white/10 rounded-xl p-5 shadow-lg">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Leads Captured</span>
                <div className="text-3xl font-extrabold text-amber-400 mt-2">{leads.length}</div>
                <span className="text-[11px] text-emerald-400 mt-1 block">Inquiry form submissions</span>
              </div>

              <div className="bg-[#161b22] border border-white/10 rounded-xl p-5 shadow-lg">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Section Clicks</span>
                <div className="text-3xl font-extrabold text-sky-400 mt-2">{totalClicks}</div>
                <span className="text-[11px] text-sky-400 mt-1 block">Active user interactions</span>
              </div>

              <div className="bg-[#161b22] border border-white/10 rounded-xl p-5 shadow-lg">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Latest Lead</span>
                <div className="text-lg font-bold text-white mt-2 truncate">
                  {leads[0]?.name || "No leads yet"}
                </div>
                <span className="text-[11px] text-gray-400 mt-1 block">
                  {leads[0]?.phone || "—"}
                </span>
              </div>

              <div className="bg-[#161b22] border border-white/10 rounded-xl p-5 shadow-lg">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Trackable Sections</span>
                <div className="text-3xl font-extrabold text-purple-400 mt-2">{metrics.length}</div>
                <span className="text-[11px] text-purple-400 mt-1 block">Analytics endpoints active</span>
              </div>
            </div>

            <div className="flex border-b border-white/10 gap-6">
              <button
                onClick={() => setActiveTab("leads")}
                className={`pb-3 font-semibold text-sm transition-all border-b-2 ${
                  activeTab === "leads" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Leads & Phone Submissions ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab("heatmap")}
                className={`pb-3 font-semibold text-sm transition-all border-b-2 ${
                  activeTab === "heatmap" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Section Click Heatmap
              </button>
              <button
                onClick={() => setActiveTab("traffic")}
                className={`pb-3 font-semibold text-sm transition-all border-b-2 ${
                  activeTab === "traffic" ? "border-amber-400 text-amber-400" : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Traffic Overview
              </button>
            </div>

            {activeTab === "leads" && (
              <div className="bg-[#161b22] border border-white/10 rounded-xl overflow-hidden shadow-lg">
                <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
                  <input
                    type="text"
                    placeholder="Search leads by name, phone, or product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-80 px-4 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-[#0d1117] text-xs uppercase text-gray-400 border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Contact Name</th>
                        <th className="py-3 px-4">Phone Number</th>
                        <th className="py-3 px-4">Requirement</th>
                        <th className="py-3 px-4">Source</th>
                        <th className="py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-white">{lead.name}</td>
                          <td className="py-3.5 px-4 text-emerald-400 font-mono font-medium">{lead.phone}</td>
                          <td className="py-3.5 px-4 text-gray-200">{lead.product || "General Inquiry"}</td>
                          <td className="py-3.5 px-4 text-xs font-mono text-amber-300">{lead.sourcePage}</td>
                          <td className="py-3.5 px-4 text-xs text-gray-400">
                            {new Date(lead.timestamp).toLocaleDateString()} {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                      {filteredLeads.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-gray-500">
                            No leads found. Leads will appear here as visitors submit inquiries.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "heatmap" && (
              <div className="bg-[#161b22] border border-white/10 rounded-xl p-6 shadow-lg space-y-6">
                <h3 className="text-lg font-bold text-white">Section Engagement &amp; Click Share</h3>
                <div className="space-y-4">
                  {metrics.map((m) => {
                    const percentage = totalClicks > 0 ? Math.round((m.clicks / totalClicks) * 100) : 0;
                    return (
                      <div key={m.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-gray-200">{m.name}</span>
                          <span className="text-xs text-amber-400 font-mono">{m.clicks} clicks</span>
                        </div>
                        <div className="w-full bg-[#0d1117] h-3 rounded-full overflow-hidden border border-white/5">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-sky-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(percentage, 2)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "traffic" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#161b22] border border-white/10 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-4">Traffic Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Leads:</span>
                      <span className="font-semibold text-emerald-400">{leads.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Clicks:</span>
                      <span className="font-semibold text-sky-400">{totalClicks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Sections:</span>
                      <span className="font-semibold text-purple-400">{metrics.length}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#161b22] border border-white/10 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-4">AI Discovery Status</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      GPTBot: Allowed
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      ClaudeBot: Allowed
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      PerplexityBot: Allowed
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      llms.txt: Active
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
