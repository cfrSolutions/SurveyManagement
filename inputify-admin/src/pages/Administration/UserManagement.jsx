import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  EllipsisVertical,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
  X
} from "lucide-react";
import api from "../../services/api";
import MainLayout from "../../components/layout/MainLayout";
import "../../styles/module.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  role_id: "",
  manager_id: "",
  is_active: true
};

const ROLE_OPTIONS = [
  { value: "ALL", label: "All roles" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "ADMIN", label: "Admin" },
  { value: "PROJECT_MANAGER", label: "Project Manager" },
  { value: "CLIENT_MANAGER", label: "Client Manager" },
  { value: "VENDOR_MANAGER", label: "Vendor Manager" }
];

const roleLabelMap = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  PROJECT_MANAGER: "Project Manager",
  CLIENT_MANAGER: "Client Manager",
  VENDOR_MANAGER: "Vendor Manager"
};

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const loadRoles = async () => {
    const res = await api.get("/roles");
    setRoles(res.data || []);
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async () => {
    try {
      const payload = {
        ...formData,
        manager_id: formData.manager_id || null
      };

      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, payload);
      } else {
        await api.post("/users", payload);
      }

      setShowDrawer(false);
      setEditingUser(null);
      setFormData(INITIAL_FORM);
      setOpenMenuId(null);
      loadUsers();
    } catch (err) {
      console.log(err);
      alert("Failed to save user");
    }
  };

  const normalizeRole = (user) => {
    if (!user) return "";
    if (typeof user.role === "string") return user.role;
    return user.role?.code || user.role?.name || user.role_name || "";
  };

  const getRoleLabel = (user) => {
    const role = normalizeRole(user);
    return roleLabelMap[role] || user.role?.name || user.role || "-";
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const name = `${user.name || ""}`.toLowerCase();
      const email = `${user.email || ""}`.toLowerCase();
      const roleValue = normalizeRole(user).toUpperCase();

      const matchesSearch =
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "ALL" ||
        roleValue === roleFilter ||
        roleValue.replace(/\s+/g, "_") === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.is_active).length;
  const inactiveUsers = users.filter((user) => !user.is_active).length;
  const adminUsers = users.filter((user) =>
    normalizeRole(user).toUpperCase().includes("ADMIN")
  ).length;

  const openCreateDrawer = () => {
    setEditingUser(null);
    setFormData(INITIAL_FORM);
    setShowDrawer(true);
    setOpenMenuId(null);
  };

  const openEditDrawer = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role_id: user.role_id || "",
      manager_id: user.manager_id || "",
      is_active: user.is_active
    });
    setShowDrawer(true);
    setOpenMenuId(null);
  };

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
                User management
              </h1>
              <p className="mt-2 max-w-2xl text-[15px] text-[#64748b]">
                Invite teammates, assign roles, and control access across the workspace.
              </p>
            </div>

            <button
              onClick={openCreateDrawer}
              className="inline-flex h-[42px] items-center gap-2 rounded-[14px] bg-[#3b82f6] px-5 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(59,130,246,0.22)] transition hover:bg-[#2563eb] active:scale-[0.99]"
            >
              <Plus size={16} />
              Add user
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total users"
              value={totalUsers}
              icon={<Users size={18} />}
              iconClass="bg-[#dbeafe] text-[#3b82f6]"
            />
            <StatCard
              title="Active"
              value={activeUsers}
              icon={<UserCheck size={18} />}
              iconClass="bg-[#dcfce7] text-[#10b981]"
            />
            <StatCard
              title="Inactive"
              value={inactiveUsers}
              icon={<UserX size={18} />}
              iconClass="bg-[#fee2e2] text-[#ef4444]"
            />
            <StatCard
              title="Admins"
              value={adminUsers}
              icon={<ShieldCheck size={18} />}
              iconClass="bg-[#fef3c7] text-[#f59e0b]"
            />
          </div>

          <div className="mt-7 overflow-hidden rounded-[22px] border border-[#dbe3ee] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]"
                />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="h-[48px] w-full rounded-[12px] border border-[#d6dfeb] bg-white px-10 text-[15px] text-[#0f172a] shadow-[0_1px_3px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-[#64748b] focus:border-[#93c5fd] focus:ring-4 focus:ring-[#dbeafe]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="relative w-full lg:w-[210px]">
                <select
                  className="h-[48px] w-full appearance-none rounded-[12px] border border-[#d6dfeb] bg-white px-4 pr-10 text-[15px] text-[#0f172a] shadow-[0_1px_3px_rgba(15,23,42,0.06)] outline-none transition focus:border-[#93c5fd] focus:ring-4 focus:ring-[#dbeafe]"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                />
              </div>
            </div>

            <div className="overflow-x-auto border-t border-[#dbe3ee]">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="text-left text-[14px] text-[#475569]">
                    <th className="px-4 py-3.5 font-medium">User</th>
                    <th className="px-4 py-3.5 font-medium">Role</th>
                    <th className="px-4 py-3.5 font-medium">Status</th>
                    <th className="px-4 py-3.5 font-medium">Last login</th>
                    <th className="px-4 py-3.5 font-medium text-right" />
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-16 text-center text-sm text-slate-500">
                        Loading users...
                      </td>
                    </tr>
                  ) : filteredUsers.length ? (
                    filteredUsers.map((user) => {
                      const initials = (user.name || "?")
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")
                        .toUpperCase();

                      return (
                        <tr
                          key={user.id}
                          className="border-t border-[#dbe3ee] text-[14px] hover:bg-[#f8fafc]"
                        >
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[13px] font-semibold text-[#3b82f6]">
                                {initials}
                              </div>
                              <div className="min-w-0">
                                <div className="truncate text-[14px] font-semibold text-[#0f172a]">
                                  {user.name || "-"}
                                </div>
                                <div className="truncate text-[13px] text-[#64748b]">
                                  {user.email || "-"}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-2.5">
                            <span className="inline-flex rounded-full bg-[#f1f5f9] px-3 py-[5px] text-[12px] font-medium text-[#475569]">
                              {getRoleLabel(user)}
                            </span>
                          </td>

                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-2 text-[14px] text-[#0f172a]">
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  user.is_active ? "bg-emerald-500" : "bg-slate-400"
                                }`}
                              />
                              {user.is_active ? "Active" : "Inactive"}
                            </div>
                          </td>

                          <td className="px-4 py-2.5 text-[14px] text-[#64748b]">
                            {user.last_login
                              ? new Date(user.last_login).toLocaleDateString()
                              : "-"}
                          </td>

                          <td className="px-4 py-2.5 text-right">
                            <div className="relative inline-flex">
                              <button
                                onClick={() =>
                                  setOpenMenuId(openMenuId === user.id ? null : user.id)
                                }
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#334155] transition hover:bg-[#eff6ff]"
                                aria-label={`Open actions for ${user.name || "user"}`}
                              >
                                <EllipsisVertical size={18} />
                              </button>

                              {openMenuId === user.id && (
                                <div className="absolute right-0 top-full z-20 mt-2 w-[120px] overflow-hidden rounded-[14px] border border-[#dbe3ee] bg-white p-1 shadow-[0_12px_24px_rgba(15,23,42,0.12)]">
                                  <button
                                    onClick={() => openEditDrawer(user)}
                                    className="flex w-full items-center rounded-[10px] bg-[#dbeafe] px-3 py-2 text-left text-[14px] text-[#2563eb]"
                                  >
                                    Edit
                                  </button>

                                  <button
                                    onClick={async () => {
                                      await api.patch(`/users/${user.id}/status`, {
                                        is_active: !user.is_active
                                      });
                                      setOpenMenuId(null);
                                      loadUsers();
                                    }}
                                    className="mt-1 flex w-full items-center rounded-[10px] px-3 py-2 text-left text-[14px] text-[#0f172a] hover:bg-[#f8fafc]"
                                  >
                                    {user.is_active ? "Deactivate" : "Activate"}
                                  </button>

                                  <button
                                    onClick={async () => {
                                      if (!window.confirm("Delete this user?")) {
                                        return;
                                      }
                                      await api.delete(`/users/${user.id}`);
                                      setOpenMenuId(null);
                                      loadUsers();
                                    }}
                                    className="mt-1 flex w-full items-center rounded-[10px] px-3 py-2 text-left text-[14px] text-[#ef4444] hover:bg-[#fef2f2]"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-16 text-center text-sm text-slate-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showDrawer && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-[2px]">
            <div className="flex h-full w-full max-w-[520px] flex-col bg-white shadow-2xl">
              <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    {editingUser ? "Edit user" : "Create user"}
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900">
                    {editingUser ? "Update user" : "Add new user"}
                  </h2>
                </div>

                <button
                  onClick={() => setShowDrawer(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close drawer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="space-y-5">
                  <Field label="Full name">
                    <input
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value
                        })
                      }
                    />
                  </Field>

                  <Field label="Email address">
                    <input
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value
                        })
                      }
                    />
                  </Field>

                  {!editingUser && (
                    <Field label="Password">
                      <input
                        type="password"
                        className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                        placeholder="Set account password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value
                          })
                        }
                      />
                    </Field>
                  )}

                  <Field label="Role">
                    <select
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                      value={formData.role_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role_id: e.target.value
                        })
                      }
                    >
                      <option value="">Select role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Manager ID">
                    <input
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                      placeholder="Optional manager ID"
                      value={formData.manager_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          manager_id: e.target.value
                        })
                      }
                    />
                  </Field>

                  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_active: e.target.checked
                        })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    Active user
                  </label>
                </div>
              </div>

              <div className="border-t border-slate-200 px-6 py-5">
                <button
                  onClick={saveUser}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  {editingUser ? "Save changes" : "Create user"}
                </button>
              </div>
            </div>
          </div>
        )}
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

function Field({ label, children }) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      {children}
    </div>
  );
}
