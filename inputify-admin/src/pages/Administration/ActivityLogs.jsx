import { useEffect, useState } from "react";
import {
  Activity,
  CalendarDays,
  ClipboardList,
  FolderKanban,
  Funnel,
  Search
} from "lucide-react";
import api from "../../services/api";
import MainLayout from "../../components/layout/MainLayout";
import "../../styles/module.css";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      setLoading(true);

      const res = await api.get("/activity-logs");

      setLogs(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const fullName = (log.employees?.name || "").toLowerCase();
    const query = search.toLowerCase();

    return (
      fullName.includes(query) ||
      log.action?.toLowerCase().includes(query) ||
      log.module?.toLowerCase().includes(query) ||
      String(log.record_id || "").toLowerCase().includes(query)
    );
  });

  const todayCount = logs.filter((log) => {
    const today = new Date().toDateString();
    return new Date(log.created_at).toDateString() === today;
  }).length;

  return (
    <MainLayout>
      <div className="module-page bg-[#f8fafc] px-10 py-8">
        <div className="w-full">
          <div className="flex flex-col gap-5 border-b border-[#dbe3ee] pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#3b82f6]">
                Administration
              </div>
              <h1 className="mt-2 text-[33px] font-semibold tracking-[-0.04em] text-[#0f172a]">
                Activity logs
              </h1>
              <p className="mt-2 max-w-2xl text-[15px] text-[#64748b]">
                A complete audit trail of every change made across modules.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-[42px] items-center gap-2 rounded-[14px] border border-[#d6dfeb] bg-white px-5 text-[14px] font-semibold text-[#0f172a] shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition hover:bg-[#f8fafc]"
            >
              <Funnel size={16} />
              Filters
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total events"
              value={logs.length}
              icon={<ClipboardList size={18} />}
              iconClass="bg-[#dbeafe] text-[#3b82f6]"
            />
            <StatCard
              title="User actions"
              value={logs.filter((log) => log.module === "USERS").length}
              icon={<Activity size={18} />}
              iconClass="bg-[#dcfce7] text-[#10b981]"
            />
            <StatCard
              title="Project actions"
              value={logs.filter((log) => log.module === "PROJECTS").length}
              icon={<FolderKanban size={18} />}
              iconClass="bg-[#fef3c7] text-[#f59e0b]"
            />
            <StatCard
              title="Today"
              value={todayCount}
              icon={<CalendarDays size={18} />}
              iconClass="bg-[#fee2e2] text-[#ef4444]"
            />
          </div>

          <div className="mt-7 overflow-hidden rounded-[22px] border border-[#dbe3ee] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="px-4 py-4">
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]"
                />
                <input
                  type="text"
                  placeholder="Search by user, module, action, or record ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-[48px] w-full rounded-[12px] border border-[#d6dfeb] bg-white px-10 text-[15px] text-[#0f172a] shadow-[0_1px_3px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-[#64748b] focus:border-[#93c5fd] focus:ring-4 focus:ring-[#dbeafe]"
                />
              </div>
            </div>

            <div className="overflow-x-auto border-t border-[#dbe3ee]">
              {loading ? (
                <div className="px-4 py-16 text-center text-sm text-[#64748b]">
                  Loading activity logs...
                </div>
              ) : (
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="text-left text-[14px] text-[#475569]">
                      <th className="px-4 py-3.5 font-medium">User</th>
                      <th className="px-4 py-3.5 font-medium">Action</th>
                      <th className="px-4 py-3.5 font-medium">Module</th>
                      <th className="px-4 py-3.5 font-medium">Record</th>
                      <th className="px-4 py-3.5 font-medium">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredLogs.map((log) => {
                      const name = log.employees?.name || "-";
                      const initials = name
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")
                        .toUpperCase();

                      return (
                        <tr
                          key={log.id}
                          className="border-t border-[#dbe3ee] text-[14px] hover:bg-[#f8fafc]"
                        >
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[13px] font-semibold text-[#3b82f6]">
                                {initials || "-"}
                              </div>
                              <div className="min-w-0 truncate text-[14px] font-semibold text-[#0f172a]">
                                {name}
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-2.5">
                            <span className={getActionBadgeClass(log.action)}>
                              {log.action}
                            </span>
                          </td>

                          <td className="px-4 py-2.5 text-[14px] text-[#64748b]">
                            {log.module || "-"}
                          </td>

                          <td className="px-4 py-2.5 font-mono text-[13px] text-[#64748b]">
                            {log.record_id || "-"}
                          </td>

                          <td className="px-4 py-2.5 text-[14px] text-[#64748b]">
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}

                    {!filteredLogs.length && (
                      <tr>
                        <td colSpan={5} className="px-4 py-16 text-center text-sm text-[#64748b]">
                          No activity logs found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function StatCard({ title, value, icon, iconClass }) {
  return (
    <div className="rounded-[22px] border border-[#dbe3ee] bg-white px-5 py-[18px] shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#475569]">
            {title}
          </div>
          <div className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.04em] text-[#0f172a]">
            {value}
          </div>
        </div>

        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${iconClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function getActionBadgeClass(action) {
  const baseClass = "inline-flex rounded-full px-3 py-[5px] text-[12px] font-semibold";

  if (action === "CREATE") {
    return `${baseClass} bg-[#dcfce7] text-[#10b981]`;
  }

  if (action === "UPDATE") {
    return `${baseClass} bg-[#dbeafe] text-[#2563eb]`;
  }

  if (action === "DELETE") {
    return `${baseClass} bg-[#fee2e2] text-[#ef4444]`;
  }

  if (action === "LOGIN") {
    return `${baseClass} bg-[#fef3c7] text-[#f59e0b]`;
  }

  return `${baseClass} bg-[#f1f5f9] text-[#475569]`;
}




