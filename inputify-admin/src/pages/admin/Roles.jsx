import { useEffect, useState } from "react";
import { Plus, Shield, Trash2, Users, X } from "lucide-react";
import api from "../../services/api";
import MainLayout from "../../components/layout/MainLayout";
import "../../styles/module.css";

const MODULES = [
  "users",
  "projects",
  "clients",
  "vendors",
  "reports",
  "integrations"
];

const ACTIONS = [
  "view",
  "create",
  "edit",
  "delete"
];

const INITIAL_FORM = {
  name: "",
  description: "",
  permissions: {}
};

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const res = await api.get("/roles");
      setRoles(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const saveRole = async () => {
    try {
      await api.post("/roles", formData);
      setShowModal(false);
      setFormData(INITIAL_FORM);
      loadRoles();
    } catch (err) {
      console.log(err);
      alert("Failed to save role");
    }
  };

  const deleteRole = async (id) => {
    if (!window.confirm("Delete this role?")) {
      return;
    }

    try {
      await api.delete(`/roles/${id}`);
      loadRoles();
    } catch (err) {
      console.log(err);
    }
  };

  const getEnabledModules = (role) => {
    const permissions = role.permissions || {};

    return MODULES.filter((module) => {
      const modulePermissions = permissions[module] || {};
      return Object.values(modulePermissions).some(Boolean);
    });
  };

  const getPermissionCount = (role) => {
    if (typeof role.permission_count === "number") {
      return role.permission_count;
    }

    if (Array.isArray(role.permissions)) {
      return role.permissions.length;
    }

    const permissions = role.permissions || {};

    return Object.values(permissions).reduce((total, modulePermissions) => {
      return total + Object.values(modulePermissions || {}).filter(Boolean).length;
    }, 0);
  };

  const getMemberCount = (role) => {
    if (typeof role.member_count === "number") {
      return role.member_count;
    }

    if (typeof role.members_count === "number") {
      return role.members_count;
    }

    if (Array.isArray(role.members)) {
      return role.members.length;
    }

    if (Array.isArray(role.users)) {
      return role.users.length;
    }

    return 0;
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
                Roles & permissions
              </h1>
              <p className="mt-2 max-w-2xl text-[15px] text-[#64748b]">
                Design role templates with fine-grained module access for your workspace.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex h-[42px] items-center gap-2 rounded-[14px] bg-[#3b82f6] px-5 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(59,130,246,0.22)] transition hover:bg-[#2563eb] active:scale-[0.99]"
            >
              <Plus size={16} />
              New role
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {roles.map((role) => {
              const enabledModules = getEnabledModules(role);
              const memberCount = getMemberCount(role);
              const permissionCount = getPermissionCount(role);

              return (
                <div
                  key={role.id}
                  className="rounded-[22px] border border-[#dbe3ee] bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeafe] text-[#3b82f6]">
                      <Shield size={18} />
                    </div>

                    <button
                      onClick={() => deleteRole(role.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#64748b] transition hover:bg-[#fef2f2] hover:text-[#ef4444]"
                      aria-label={`Delete ${role.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-[18px] font-semibold text-[#0f172a]">
                      {role.name}
                    </h3>
                    <p className="mt-2 min-h-[52px] text-[15px] leading-6 text-[#64748b]">
                      {role.description || "No description provided."}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-3 py-1 text-[13px] font-medium text-[#334155]">
                      <Users size={13} />
                      {memberCount} members
                    </span>

                    <span className="inline-flex rounded-full bg-[#dbeafe] px-3 py-1 text-[13px] font-medium text-[#3b82f6]">
                      {permissionCount} permissions
                    </span>
                  </div>

                  <div className="mt-5 border-t border-[#dbe3ee] pt-4">
                    <div className="flex flex-wrap gap-2">
                      {enabledModules.length ? (
                        enabledModules.map((module) => (
                          <span
                            key={module}
                            className="inline-flex rounded-full bg-[#f8fafc] px-3 py-1 text-[12px] font-medium capitalize text-[#64748b]"
                          >
                            {module}
                          </span>
                        ))
                      ) : (
                        <span className="text-[13px] text-[#94a3b8]">
                          No modules assigned
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
              <div className="flex items-start justify-between border-b border-[#dbe3ee] px-6 py-5">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3b82f6]">
                    Administration
                  </div>
                  <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.03em] text-[#0f172a]">
                    Create role
                  </h2>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#64748b] transition hover:bg-[#f8fafc] hover:text-[#0f172a]"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[calc(90vh-84px)] overflow-y-auto px-6 py-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Role name">
                    <input
                      className="h-12 w-full rounded-xl border border-[#d6dfeb] bg-white px-4 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#93c5fd] focus:ring-4 focus:ring-[#dbeafe]"
                      placeholder="Role name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value
                        })
                      }
                    />
                  </Field>

                  <Field label="Description">
                    <textarea
                      className="min-h-[48px] w-full rounded-xl border border-[#d6dfeb] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#93c5fd] focus:ring-4 focus:ring-[#dbeafe]"
                      rows="3"
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value
                        })
                      }
                    />
                  </Field>
                </div>

                <div className="mt-6 overflow-hidden rounded-[20px] border border-[#dbe3ee]">
                  <table className="min-w-full border-collapse">
                    <thead className="bg-[#f8fafc]">
                      <tr className="text-left text-[13px] uppercase tracking-[0.08em] text-[#64748b]">
                        <th className="px-4 py-3 font-medium">Module</th>
                        {ACTIONS.map((action) => (
                          <th key={action} className="px-4 py-3 text-center font-medium">
                            {action}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {MODULES.map((module) => (
                        <tr key={module} className="border-t border-[#dbe3ee]">
                          <td className="px-4 py-3 text-[14px] font-medium capitalize text-[#0f172a]">
                            {module}
                          </td>

                          {ACTIONS.map((action) => (
                            <td key={action} className="px-4 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={
                                  formData.permissions?.[module]?.[action] || false
                                }
                                onChange={(e) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    permissions: {
                                      ...prev.permissions,
                                      [module]: {
                                        ...prev.permissions?.[module],
                                        [action]: e.target.checked
                                      }
                                    }
                                  }));
                                }}
                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={saveRole}
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3b82f6] px-6 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(59,130,246,0.22)] transition hover:bg-[#2563eb] active:scale-[0.99]"
                  >
                    Save role
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium text-[#334155]">{label}</div>
      {children}
    </div>
  );
}
