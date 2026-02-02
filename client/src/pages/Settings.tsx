import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Building2,
  FileText,
  TrendingUp,
  Newspaper,
  User,
  Users,
  Shield,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Plus,
  Edit2,
  MoreHorizontal,
  BookOpen,
  DollarSign,
  UserCog,
  ClipboardCheck,
  Menu,
  Bell,
  Check,
  X,
  Server,
  ChevronDown,
  Lock,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";

const users = [
  { id: 1, name: "John Kim", email: "john.kim@company.com", role: "Admin", status: "Active", lastLogin: "2025-01-09 14:32" },
  { id: 2, name: "Sarah Lee", email: "sarah.lee@company.com", role: "Editor", status: "Active", lastLogin: "2025-01-09 11:45" },
  { id: 3, name: "Mike Park", email: "mike.park@company.com", role: "Viewer", status: "Active", lastLogin: "2025-01-08 16:20" },
  { id: 4, name: "Emily Choi", email: "emily.choi@company.com", role: "Editor", status: "Inactive", lastLogin: "2025-01-05 09:15" },
  { id: 5, name: "David Jung", email: "david.jung@company.com", role: "Viewer", status: "Active", lastLogin: "2025-01-09 10:00" },
];

const permissions = [
  { id: 1, role: "Admin", description: "Full access to all features", users: 2, permissions: ["View", "Create", "Edit", "Delete", "Export", "Settings"] },
  { id: 2, role: "Editor", description: "Can view and edit data", users: 5, permissions: ["View", "Create", "Edit", "Export"] },
  { id: 3, role: "Viewer", description: "Read-only access", users: 12, permissions: ["View"] },
];

const notificationCategories = [
  { id: "company", name: "Company Data", icon: Building2, description: "Alerts for company data updates and errors" },
  { id: "patent", name: "Patent Data", icon: FileText, description: "Alerts for new patents and crawling issues" },
  { id: "paper", name: "Paper Data", icon: BookOpen, description: "Alerts for paper database changes" },
  { id: "stock", name: "Stock Data", icon: TrendingUp, description: "Alerts for stock data anomalies" },
  { id: "news", name: "News Data", icon: Newspaper, description: "Alerts for news API errors" },
  { id: "finance", name: "Finance Data", icon: DollarSign, description: "Alerts for finance data updates" },
  { id: "employment", name: "Employment Data", icon: UserCog, description: "Alerts for employment entry/exit data" },
  { id: "server", name: "Server Status", icon: Server, description: "Alerts for server health and outages" },
  { id: "qa", name: "QA Reports", icon: ClipboardCheck, description: "Alerts for QA test results and failures" },
];

function ProfileTab() {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    // Navigate to login page
    setLocation("/login");
  };

  return (
    <div className="space-y-6">
      <div className="chart-container-light">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Profile Information</h3>
        <div className="flex items-start gap-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">A</div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors" data-testid="change-avatar">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
              <Input defaultValue="Admin" className="border-slate-200" data-testid="first-name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
              <Input defaultValue="User" className="border-slate-200" data-testid="last-name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input defaultValue="admin@company.com" className="pl-10 border-slate-200" data-testid="email" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input defaultValue="+82 10-1234-5678" className="pl-10 border-slate-200" data-testid="phone" />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input defaultValue="Data Engineering Team" className="pl-10 border-slate-200" data-testid="department" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input type="password" placeholder="Enter new password" className="pl-10 border-slate-200" data-testid="new-password" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input type="password" placeholder="Confirm new password" className="pl-10 border-slate-200" data-testid="confirm-password" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
          <Button 
            variant="outline" 
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>

          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" data-testid="save-profile">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

function UsersTab() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    role: "Viewer",
    status: "Active",
  });

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tempPassword: "",
    confirmPassword: "",
    phone: "",
    department: "",
    role: "Viewer"
  });
  const [userList, setUserList] = useState(users);

  const handleAddUser = () => {
    if (newUser.firstName && newUser.lastName && newUser.email) {
      const newId = userList.length + 1;
      setUserList([...userList, {
        id: newId,
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        role: newUser.role,
        status: "Active",
        lastLogin: "-"
      }]);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        tempPassword: "",
        confirmPassword: "",
        phone: "",
        department: "",
        role: "Viewer"
      });
      setShowAddModal(false);
    }
  };

  const openEditUser = (id: number) => {
    const u = userList.find((x) => x.id === id);
    if (!u) return;
    setEditUserId(id);
    setEditUser({
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
    });
    setShowEditModal(true);
  };

  const handleSaveEditUser = () => {
    if (editUserId == null) return;
    setUserList((prev) =>
      prev.map((u) =>
        u.id === editUserId
          ? { ...u, role: editUser.role, status: editUser.status }
          : u
      )
    );
    setShowEditModal(false);
    setEditUserId(null);
  };

  const closeEditUser = () => {
    setShowEditModal(false);
    setEditUserId(null);
  };

  return (
    <div className="space-y-6">
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeEditUser}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            data-testid="modal-edit-user"
          >
            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-semibold text-slate-900" data-testid="title-edit-user">Edit User</h3>
                <p className="text-sm text-slate-500 mt-1" data-testid="text-edit-user-hint">Update role and status for this user.</p>
              </div>
              <button
                onClick={closeEditUser}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                data-testid="button-close-edit-user"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">User</label>
                  <div className="h-10 px-3 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-between" data-testid="display-edit-user-identity">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{editUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{editUser.email}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                  <select
                    value={editUser.role}
                    onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-testid="select-edit-user-role"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                  <select
                    value={editUser.status}
                    onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-testid="select-edit-user-status"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <Button variant="outline" onClick={closeEditUser} data-testid="button-cancel-edit-user">
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveEditUser} data-testid="button-save-edit-user">
                Save
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Add New User</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                  <Input
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    placeholder="Enter first name"
                    className="border-slate-200"
                    data-testid="new-user-firstname"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                  <Input
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    placeholder="Enter last name"
                    className="border-slate-200"
                    data-testid="new-user-lastname"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                  className="border-slate-200"
                  data-testid="new-user-email"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Temporary Password</label>
                  <Input
                    type="password"
                    value={newUser.tempPassword}
                    onChange={(e) => setNewUser({ ...newUser, tempPassword: e.target.value })}
                    placeholder="Enter password"
                    className="border-slate-200"
                    data-testid="new-user-password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                  <Input
                    type="password"
                    value={newUser.confirmPassword}
                    onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                    placeholder="Confirm password"
                    className="border-slate-200"
                    data-testid="new-user-confirm-password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                <Input
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="border-slate-200"
                  data-testid="new-user-phone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
                <Input
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  placeholder="Enter department"
                  className="border-slate-200"
                  data-testid="new-user-department"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-testid="new-user-role"
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
              <Button variant="outline" onClick={() => setShowAddModal(false)} data-testid="cancel-add-user">
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddUser} data-testid="confirm-add-user">
                Add User
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="chart-container-light">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">User Management</h3>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddModal(true)} data-testid="add-user">
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="users-table">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Role</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Last Login</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50" data-testid={`user-row-${user.id}`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-medium">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.role === "Admin" ? "bg-purple-100 text-purple-700" : user.role === "Editor" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${user.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-slate-500">{user.lastLogin}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={() => openEditUser(user.id)}
                        data-testid={`edit-user-${user.id}`}
                      >
                        <Edit2 className="w-4 h-4 text-slate-500" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" data-testid={`delete-user-${user.id}`}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PermissionsTab() {
  const [roles, setRoles] = useState(permissions);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleModalMode, setRoleModalMode] = useState<"add" | "edit">("add");
  const [roleName, setRoleName] = useState("");
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
  const [editRoleId, setEditRoleId] = useState<number | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  const permissionOptions = ["View", "Create", "Edit", "Delete", "Export", "Settings"];

  const openAddRole = () => {
    setRoleModalMode("add");
    setEditRoleId(null);
    setRoleName("");
    setSelectedPerms(["View"]);
    setShowRoleModal(true);
  };

  const openEditRole = (id: number) => {
    const r = roles.find((x) => x.id === id);
    if (!r) return;
    setRoleModalMode("edit");
    setEditRoleId(id);
    setRoleName(r.role);
    setSelectedPerms(r.permissions);
    setShowRoleModal(true);
    setMenuOpenId(null);
  };

  const closeRoleModal = () => {
    setShowRoleModal(false);
    setEditRoleId(null);
  };

  const togglePerm = (p: string) => {
    setSelectedPerms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const saveRole = () => {
    if (roleModalMode === "add") {
      const nextId = Math.max(...roles.map((r) => r.id)) + 1;
      setRoles((prev) => [
        ...prev,
        {
          id: nextId,
          role: roleName.trim() || `Role ${nextId}`,
          description: "Custom role",
          users: 0,
          permissions: selectedPerms.length ? selectedPerms : ["View"],
        },
      ]);
      setShowRoleModal(false);
      return;
    }

    if (editRoleId == null) return;
    setRoles((prev) =>
      prev.map((r) =>
        r.id === editRoleId
          ? {
              ...r,
              role: r.role,
              permissions: selectedPerms.length ? selectedPerms : ["View"],
            }
          : r
      )
    );
    setShowRoleModal(false);
    setEditRoleId(null);
  };

  const deleteRole = (id: number) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    setMenuOpenId(null);
  };

  const roleColorClasses: Record<string, string> = {
    View: "bg-slate-50 text-slate-700 border border-slate-100",
    Create: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    Edit: "bg-blue-50 text-blue-700 border border-blue-100",
    Delete: "bg-red-50 text-red-700 border border-red-100",
    Export: "bg-amber-50 text-amber-700 border border-amber-100",
    Settings: "bg-purple-50 text-purple-700 border border-purple-100",
  };

  return (
    <div className="space-y-6">
      {showRoleModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeRoleModal}
          data-testid="modal-role"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-semibold text-slate-900" data-testid="title-role-modal">
                  {roleModalMode === "add" ? "Add Role" : "Edit Role"}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5" data-testid="text-role-modal-hint">
                  {roleModalMode === "add"
                    ? "Name the role and choose permissions."
                    : "Update permissions for this role."}
                </p>
              </div>
              <button
                onClick={closeRoleModal}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                data-testid="button-close-role-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role Name</label>
                {roleModalMode === "add" ? (
                  <Input
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="e.g., QA Lead"
                    className="border-slate-200"
                    data-testid="input-role-name"
                  />
                ) : (
                  <div
                    className="h-10 px-3 border border-slate-200 rounded-lg bg-slate-50 flex items-center"
                    data-testid="text-role-name-readonly"
                  >
                    <span className="text-sm font-medium text-slate-800">{roleName}</span>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-700">Permissions</label>
                  <span className="text-xs text-slate-500" data-testid="text-role-perms-count">
                    {selectedPerms.length} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2" data-testid="wrap-role-perms">
                  {permissionOptions.map((p) => {
                    const active = selectedPerms.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => togglePerm(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          active
                            ? roleColorClasses[p]
                            : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                        }`}
                        data-testid={`tag-perm-${p}`}
                        type="button"
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <Button variant="outline" onClick={closeRoleModal} data-testid="button-cancel-role-modal">
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={saveRole}
                disabled={roleModalMode === "add" && !roleName.trim()}
                data-testid="button-save-role-modal"
              >
                Save
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="chart-container-light">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Permission Management</h3>
          <Button
            className="gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={openAddRole}
            data-testid="add-role"
          >
            <Plus className="w-4 h-4" />
            Add Role
          </Button>
        </div>
        <div className="space-y-4">
          {roles.map((perm) => (
            <div
              key={perm.id}
              className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors"
              data-testid={`permission-${perm.id}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-slate-800" data-testid={`text-role-${perm.id}`}>{perm.role}</h4>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600" data-testid={`text-role-users-${perm.id}`}>
                      {perm.users} users
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1" data-testid={`text-role-desc-${perm.id}`}>{perm.description}</p>
                </div>

                {perm.role !== "Admin" && (
                  <div className="relative">
                    <button
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      onClick={() => setMenuOpenId(menuOpenId === perm.id ? null : perm.id)}
                      data-testid={`button-role-menu-${perm.id}`}
                      type="button"
                    >
                      <MoreHorizontal className="w-5 h-5 text-slate-400" />
                    </button>

                    {menuOpenId === perm.id && (
                      <div
                        className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-10"
                        data-testid={`menu-role-${perm.id}`}
                      >
                        <button
                          className="w-full px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                          onClick={() => openEditRole(perm.id)}
                          data-testid={`menu-role-edit-${perm.id}`}
                          type="button"
                        >
                          Edit
                          <Edit2 className="w-4 h-4 text-slate-400" />
                        </button>
                        <button
                          className="w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center justify-between"
                          onClick={() => deleteRole(perm.id)}
                          data-testid={`menu-role-delete-${perm.id}`}
                          type="button"
                        >
                          Delete
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2" data-testid={`wrap-role-tags-${perm.id}`}>
                {perm.permissions.map((p) => (
                  <span
                    key={p}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${roleColorClasses[p] || "bg-slate-50 text-slate-600 border border-slate-100"}`}
                    data-testid={`tag-role-${perm.id}-${p}`}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [notificationSettings, setNotificationSettings] = useState<Record<string, number[]>>({
    company: [1, 2],
    patent: [1, 2, 3],
    paper: [2],
    stock: [1, 4],
    news: [1, 2, 3],
    finance: [1],
    employment: [2, 5],
    server: [1, 2],
    qa: [1, 2, 3, 4],
  });
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleUser = (categoryId: string, userId: number) => {
    setNotificationSettings(prev => {
      const current = prev[categoryId] || [];
      if (current.includes(userId)) {
        return { ...prev, [categoryId]: current.filter(id => id !== userId) };
      } else {
        return { ...prev, [categoryId]: [...current, userId] };
      }
    });
  };

  const getAssignedUsers = (categoryId: string) => {
    const userIds = notificationSettings[categoryId] || [];
    return users.filter(u => userIds.includes(u.id));
  };

  return (
    <div className="space-y-6">
      <div className="chart-container-light">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Email Notifications</h3>
            <p className="text-sm text-slate-500 mt-1">Configure which users receive email alerts for each category</p>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" data-testid="save-notifications">
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </div>

        <div className="space-y-3">
          {notificationCategories.map((category) => {
            const Icon = category.icon;
            const assignedUsers = getAssignedUsers(category.id);
            const isExpanded = expandedCategory === category.id;

            return (
              <div key={category.id} className="border border-slate-200 rounded-xl overflow-hidden" data-testid={`notification-category-${category.id}`}>
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">{category.name}</h4>
                      <p className="text-xs text-slate-500">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {assignedUsers.slice(0, 4).map((user) => (
                        <div
                          key={user.id}
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                          title={user.name}
                        >
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                      ))}
                      {assignedUsers.length > 4 && (
                        <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600 border-2 border-white">
                          +{assignedUsers.length - 4}
                        </div>
                      )}
                      {assignedUsers.length === 0 && (
                        <span className="text-xs text-slate-400">No recipients</span>
                      )}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </div>
                </div>

                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-100 bg-slate-50 p-4"
                  >
                    <p className="text-xs text-slate-500 mb-3">Select users to receive notifications:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {users.map((user) => {
                        const isAssigned = (notificationSettings[category.id] || []).includes(user.id);
                        return (
                          <button
                            key={user.id}
                            onClick={() => toggleUser(category.id, user.id)}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                              isAssigned
                                ? "bg-blue-50 border-blue-200 text-blue-700"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                            data-testid={`notification-user-${category.id}-${user.id}`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                              isAssigned ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-600"
                            }`}>
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs opacity-70">{user.email}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              isAssigned ? "bg-blue-500" : "border border-slate-300"
                            }`}>
                              {isAssigned && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 flex-shrink-0 z-40">
          <div className="px-4 md:px-8 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-800">Settings</h1>
                <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Manage your profile and system settings</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-slate-50/50 overflow-x-hidden">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-slate-100 border border-slate-200 mb-6">
                <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm" data-testid="tab-profile">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="users" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm" data-testid="tab-users">
                  <Users className="w-4 h-4" />
                  User Management
                </TabsTrigger>
                <TabsTrigger value="permissions" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm" data-testid="tab-permissions">
                  <Shield className="w-4 h-4" />
                  Permission Management
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-sm" data-testid="tab-notifications">
                  <Bell className="w-4 h-4" />
                  Email Notifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <ProfileTab />
              </TabsContent>
              <TabsContent value="users">
                <UsersTab />
              </TabsContent>
              <TabsContent value="permissions">
                <PermissionsTab />
              </TabsContent>
              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
