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
import EmailNotifications from "./settings/EmailNotifications";

const users = [
  { id: 1, name: "John Kim", email: "john.kim@company.com", role: "Admin", status: "Active", lastLogin: "2025-01-09 14:32" },
  { id: 2, name: "Sarah Lee", email: "sarah.lee@company.com", role: "Editor", status: "Active", lastLogin: "2025-01-09 11:45" },
  { id: 3, name: "Mike Park", email: "mike.park@company.com", role: "Viewer", status: "Active", lastLogin: "2025-01-08 16:20" },
  { id: 4, name: "Emily Choi", email: "emily.choi@company.com", role: "Editor", status: "Inactive", lastLogin: "2025-01-05 09:15" },
  { id: 5, name: "David Jung", email: "david.jung@company.com", role: "Viewer", status: "Active", lastLogin: "2025-01-09 10:00" },
];

// Types
type PermissionType = "View" | "Create" | "Create/Delete" | "Edit" | "Delete" | "Export" | "Inspect";

interface ModuleConfig {
  id: string;
  name: string;
}

interface Role {
  id: number;
  role: string;
  type: "admin" | "service";
  description: string;
  users: number;
  // Map module ID to list of allowed permissions
  permissions: Record<string, PermissionType[]>;
}

const modules: ModuleConfig[] = [
  { id: "qa-report", name: "QA Report" },
  { id: "company-data", name: "Company Data" },
  { id: "disclosure-data", name: "Disclosure Data" },
  { id: "patent-data", name: "Patent Data" },
  { id: "paper-data", name: "Paper Data" },
  { id: "stock-data", name: "Stock Data" },
  { id: "news-data", name: "News Data" },
  { id: "finance-data", name: "Finance Data" },
  { id: "employment-data", name: "Employment Data" },
  { id: "aws", name: "Server (AWS)" },
  { id: "gcp", name: "Server (GCP)" },
  { id: "idc", name: "Server (IDC)" },
  { id: "user-management", name: "User Management" },
  { id: "permission-management", name: "Role Management" },
  { id: "email-notifications", name: "Email Notifications" },
];

const permissionTypes: PermissionType[] = ["View", "Create", "Edit", "Delete", "Export"];
const qaPermissionTypes: PermissionType[] = ["View", "Create", "Edit", "Delete", "Export"]; // Changed to match other modules as requested

// Initial data with updated structure
const initialRoles: Role[] = [
  { 
    id: 1, 
    role: "Admin", 
    type: "admin",
    description: "Full access to all features", 
    users: 2, 
    permissions: modules.reduce((acc, mod) => ({
      ...acc,
      [mod.id]: mod.id === "qa-report" ? qaPermissionTypes : permissionTypes // Admin has all permissions for all modules
    }), {} as Record<string, PermissionType[]>)
  },
  { 
    id: 2, 
    role: "Editor", 
    type: "service",
    description: "Can view and edit data", 
    users: 5, 
    permissions: modules.reduce((acc, mod) => {
      // Editor permissions logic
      if (mod.id === "qa-report") return { ...acc, [mod.id]: ["View", "Inspect", "Export"] };
      return { ...acc, [mod.id]: ["View", "Edit", "Export"] };
    }, {} as Record<string, PermissionType[]>)
  },
  { 
    id: 3, 
    role: "Viewer", 
    type: "service",
    description: "Read-only access", 
    users: 12, 
    permissions: modules.reduce((acc, mod) => ({
      ...acc,
      [mod.id]: ["View"] // Viewer only has View
    }), {} as Record<string, PermissionType[]>)
  },
];

const getPermissionCount = (perms: Record<string, PermissionType[]>) => {
  return Object.values(perms).reduce((acc, curr) => acc + curr.length, 0);
};

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
    roleType: "service",
    role: "Viewer",
    status: "Active",
  });

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tempPassword: "",
    confirmPassword: "",
    roleType: "service",
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
        roleType: "service",
        role: "Viewer"
      });
      setShowAddModal(false);
    }
  };

  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const openEditUser = (id: number) => {
    const u = userList.find((x) => x.id === id);
    if (!u) return;
    setEditUserId(id);
    setEditUser({
      name: u.name,
      email: u.email,
      roleType: u.role === "Admin" ? "admin" : "service",
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

  const handleDeleteUser = (id: number) => {
    setDeleteUserId(id);
    setShowDeleteUserModal(true);
  };

  const confirmDeleteUser = () => {
    if (deleteUserId) {
      setUserList(userList.filter(u => u.id !== deleteUserId));
      setShowDeleteUserModal(false);
      setDeleteUserId(null);
    }
  };

  const closeEditUser = () => {
    setShowEditModal(false);
    setEditUserId(null);
  };

  return (
    <div className="space-y-6">
      {/* Delete User Confirmation Modal */}
      {showDeleteUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]" onClick={() => setShowDeleteUserModal(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-2 text-red-600">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-slate-800">Delete User</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete this user?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDeleteUserModal(false)}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={confirmDeleteUser}>Delete User</Button>
            </div>
          </motion.div>
        </div>
      )}

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

                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">User Type</label>
                    <select
                      value={"service"}
                      onChange={(e) => {
                        const newType = e.target.value;
                        setEditUser({ 
                          ...editUser, 
                          roleType: newType,
                          role: newType === "admin" ? "Admin" : "Viewer" // Reset role when type changes
                        });
                      }}
                      className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      data-testid="select-edit-user-role-type"
                    >
                      <option value="admin">Administrator</option>
                      <option value="service">Service User</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                    <select
                      value={editUser.role}
                      onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                      className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      data-testid="select-edit-user-role"
                    >
                      {(initialRoles || [])
                        .filter(r => r.type === "service")
                        .map(r => (
                          <option key={r.id} value={r.role}>{r.role}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <div className="col-span-2">
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


              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">User Type</label>
                  <select
                    value={"service"}
                    onChange={(e) => {
                      const newType = e.target.value;
                      setNewUser({ 
                        ...newUser, 
                        roleType: newType,
                        role: newType === "admin" ? "Admin" : "Viewer"
                      });
                    }}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-testid="new-user-role-type"
                  >
                    <option value="admin">Administrator</option>
                    <option value="service">Service User</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-testid="new-user-role"
                  >
                    {(initialRoles || [])
                      .filter(r => r.type === "service")
                      .map(r => (
                        <option key={r.id} value={r.role}>{r.role}</option>
                      ))
                    }
                  </select>
                </div>
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
                        type="button"
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative z-10"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          openEditUser(user.id);
                        }}
                        data-testid={`edit-user-${user.id}`}
                      >
                        <Edit2 className="w-4 h-4 text-slate-500" />
                      </button>
                      <button 
                        type="button"
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors relative z-10" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteUser(user.id);
                        }}
                        data-testid={`delete-user-${user.id}`}
                      >
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
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleModalMode, setRoleModalMode] = useState<"add" | "edit">("add");
  const [roleName, setRoleName] = useState("");
  // Determine if it's admin role or service role
  const [roleType, setRoleType] = useState<"admin" | "service">("service");
  
  // Admin specific toggles
  const [adminToggles, setAdminToggles] = useState({
    permissionManagement: true,
    userManagement: true,
    emailNotifications: false,
    qaGroupAdmin: false,
    internalDataGroupAdmin: false,
    serverGroupAdmin: false
  });

  // Selected permissions state: Map of ModuleID -> PermissionType[]
  const [selectedPerms, setSelectedPerms] = useState<Record<string, PermissionType[]>>({});
  
  const [editRoleId, setEditRoleId] = useState<number | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState<number | null>(null);
  const [deleteRoleName, setDeleteRoleName] = useState(" ");
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);

  const openAddRole = () => {
    setRoleModalMode("add");
    setRoleName("");
    setRoleType("service");
    setAdminToggles({
      permissionManagement: true,
      userManagement: true,
      emailNotifications: false,
      qaGroupAdmin: false,
      internalDataGroupAdmin: false,
      serverGroupAdmin: false
    });
    // Default permissions: View only for all modules
    const defaults = modules.reduce((acc, mod) => ({
      ...acc,
      [mod.id]: ["View"] as PermissionType[]
    }), {} as Record<string, PermissionType[]>);
    setSelectedPerms(defaults);
    setEditRoleId(null);
    setShowRoleModal(true);
  };

  const openEditRole = (id: number) => {
    const role = roles.find((r) => r.id === id);
    if (!role) return;
    setRoleModalMode("edit");
    setRoleName(role.role);
    setRoleType(role.role === "Admin" ? "admin" : "service"); // Basic check for demo
    setSelectedPerms(role.permissions);
    setEditRoleId(id);
    setShowRoleModal(true);
    setMenuOpenId(null);
  };

  const handleSaveRole = () => {
    if (roleName.trim() === "") return;

    if (roleModalMode === "add") {
      const newRole: Role = { 
        type: roleType, 
        id: roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1,
        role: roleName,
        description: roleType === "admin" ? "Administrator role" : "Service role",
        users: 0,
        permissions: selectedPerms
      };
      setRoles([...roles, newRole]);
      setShowRoleModal(false);
    } else if (roleModalMode === "edit" && editRoleId) {
      setShowEditConfirmModal(true);
    }
  };

  const confirmEditRole = () => {
    if (editRoleId) {
      setRoles(roles.map(r => r.id === editRoleId ? { ...r, role: roleName, permissions: selectedPerms } : r));
      setShowEditConfirmModal(false);
      setShowRoleModal(false);
    }
  };

  const requestDeleteRole = (id: number) => {
    const role = roles.find(r => r.id === id);
    if (role) {
      setDeleteRoleId(id);
      setDeleteRoleName(role.role);
      setShowDeleteRoleModal(true);
      setMenuOpenId(null);
    }
  };

  const confirmDeleteRole = () => {
    if (deleteRoleId) {
      setRoles(roles.filter(r => r.id !== deleteRoleId));
      setShowDeleteRoleModal(false);
      setDeleteRoleId(null);
    }
  };

  const togglePermission = (moduleId: string, type: PermissionType) => {
    setSelectedPerms(prev => {
      const modulePerms = prev[moduleId] || [];
      
      if (modulePerms.includes(type)) {
        // If unchecking, and it's View being unchecked, we might need to uncheck Execute too if it's QA report (if they depend on View)
        // But the requirement is: "inspect(Execute)는 클릭할 경우 view가 자동으로 켜지도록, 즉 inspect는 되는데 view가 안되는 케이스는 없도록"
        let newPerms = modulePerms.filter(p => p !== type);
        
        // If unchecking View, must uncheck Inspect as well because Inspect requires View
        if (moduleId === "qa-report" && type === "View") {
          // No longer needed as Inspect is removed from QA Report
        }
        
        return { ...prev, [moduleId]: newPerms };
      } else {
        // If checking
        let newPerms = [...modulePerms, type];
        
        // If checking Inspect, must also check View
        if (moduleId === "qa-report" && type === "Inspect" && !modulePerms.includes("View")) {
          // No longer needed as Inspect is removed from QA Report
        }
        
        return { ...prev, [moduleId]: newPerms };
      }
    });
  };

  const toggleAllInModule = (moduleId: string) => {
    setSelectedPerms(prev => {
      const modulePerms = prev[moduleId] || [];
      const currentTypes = moduleId === "qa-report" ? qaPermissionTypes : permissionTypes;
      if (modulePerms.length === currentTypes.length) {
        // Deselect all
        return { ...prev, [moduleId]: [] };
      } else {
        // Select all
        return { ...prev, [moduleId]: [...currentTypes] };
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Edit Role Confirmation Modal */}
      {showEditConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]" onClick={() => setShowEditConfirmModal(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-2 text-blue-600">
                <Shield className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-slate-800">Apply Role Changes?</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              You are about to update the permissions for the <span className="font-bold text-slate-800">{roleName}</span> role.
              <br/><br/>
              <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">Note:</span> These changes will be immediately applied to all users currently assigned to this role.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowEditConfirmModal(false)}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={confirmEditRole}>Apply Changes</Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]" onClick={() => setShowDeleteRoleModal(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-2 text-red-600">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-slate-800">Delete Role</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete the <span className="font-bold">{deleteRoleName}</span> role?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDeleteRoleModal(false)}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={confirmDeleteRole}>Delete Role</Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Role Edit/Add Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowRoleModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">
                {roleModalMode === "add" ? "Create New Role" : "Edit Role Permissions"}
              </h3>
              <button onClick={() => setShowRoleModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Role Name</label>
                  <Input 
                    value={roleName} 
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="e.g. Content Manager"
                    className="max-w-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">User Type</label>
                  <div className="flex gap-4">
                    {(roleModalMode === "add" || roleType === "admin") && (
                      <div 
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all flex-1 ${
                          roleModalMode === "edit" 
                            ? "border-purple-500 bg-purple-50 cursor-default" 
                            : `cursor-pointer ${roleType === "admin" ? "border-purple-500 bg-purple-50" : "border-slate-200 hover:border-purple-200"}`
                        }`}
                        onClick={() => roleModalMode === "add" && setRoleType("admin")}
                      >
                        {roleModalMode === "add" && (
                          <input
                            type="radio"
                            checked={roleType === "admin"}
                            onChange={() => setRoleType("admin")}
                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                          />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900">Admin Role</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">슈퍼 관리자</span>
                          </div>
                          <span className="block text-xs text-slate-500 mt-1">시스템·그룹 관리 권한 설정</span>
                        </div>
                      </div>
                    )}

                    {(roleModalMode === "add" || roleType === "service") && (
                      <div 
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all flex-1 ${
                          roleModalMode === "edit" 
                            ? "border-blue-500 bg-blue-50 cursor-default" 
                            : `cursor-pointer ${roleType === "service" ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-200"}`
                        }`}
                        onClick={() => roleModalMode === "add" && setRoleType("service")}
                      >
                        {roleModalMode === "add" && (
                          <input
                            type="radio"
                            checked={roleType === "service"}
                            onChange={() => setRoleType("service")}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          />
                        )}
                        <div>
                          <span className="block text-sm font-semibold text-slate-900">Service Role</span>
                          <span className="block text-xs text-slate-500 mt-1">메뉴별 View/Create/Edit/Delete/Export 설정</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {roleType === "admin" ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-purple-500" />
                        System Management
                      </h4>
                      <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-800">Role Management</p>
                            <p className="text-xs text-slate-500 mt-0.5">서비스 이용 권한 role 설정 (관리자 권한 제외)</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={adminToggles.permissionManagement} onChange={(e) => setAdminToggles({...adminToggles, permissionManagement: e.target.checked})} className="sr-only peer" />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <div className="h-px bg-slate-100 my-2"></div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-800">User Management</p>
                            <p className="text-xs text-slate-500 mt-0.5">구성원 초대·제거·역할 변경</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={adminToggles.userManagement} onChange={(e) => setAdminToggles({...adminToggles, userManagement: e.target.checked})} className="sr-only peer" />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <div className="h-px bg-slate-100 my-2"></div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-800">Email Notifications</p>
                            <p className="text-xs text-slate-500 mt-0.5">시스템 알림 설정 관리</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={adminToggles.emailNotifications} onChange={(e) => setAdminToggles({...adminToggles, emailNotifications: e.target.checked})} className="sr-only peer" />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        Group Management
                      </h4>
                      <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-800">QA Report 그룹 관리</p>
                            <p className="text-xs text-slate-500 mt-0.5">inspector 배정, 일정·검사 항목 관리</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={adminToggles.qaGroupAdmin} onChange={(e) => setAdminToggles({...adminToggles, qaGroupAdmin: e.target.checked})} className="sr-only peer" />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="h-px bg-slate-100 my-2"></div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-800">Internal Data 그룹 관리</p>
                            <p className="text-xs text-slate-500 mt-0.5">데이터 항목 전체 관리</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={adminToggles.internalDataGroupAdmin} onChange={(e) => setAdminToggles({...adminToggles, internalDataGroupAdmin: e.target.checked})} className="sr-only peer" />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="h-px bg-slate-100 my-2"></div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-800">Server Management 그룹 관리</p>
                            <p className="text-xs text-slate-500 mt-0.5">서버 항목 전체 관리</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={adminToggles.serverGroupAdmin} onChange={(e) => setAdminToggles({...adminToggles, serverGroupAdmin: e.target.checked})} className="sr-only peer" />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <label className="block text-sm font-medium text-slate-700 mb-4">Module Permissions</label>
                    <div className="space-y-6">
                      
                      {/* Group 1: QA Report */}
                      <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="bg-blue-50/50 border-b border-blue-100 px-4 py-2 font-semibold text-blue-800 text-xs uppercase tracking-wider">
                          Group 1 — QA Report
                        </div>
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-3 font-medium text-slate-600 w-1/3">Module</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">View</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Create</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Edit</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Delete</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Export</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center w-24">All</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {modules.filter(m => m.id === "qa-report").map(mod => (
                              <tr key={mod.id} className="hover:bg-slate-50/50">
                                <td className="px-4 py-3 font-medium text-slate-700">{mod.name}</td>
                                {qaPermissionTypes.map(type => {
                                  const isSelected = (selectedPerms[mod.id] || []).includes(type);
                                  return (
                                    <td key={type} className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => togglePermission(mod.id, type)}
                                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors mx-auto ${
                                          isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white hover:border-blue-400"
                                        }`}
                                      >
                                        {isSelected && <Check className="w-3 h-3" />}
                                      </button>
                                    </td>
                                  );
                                })}
                                <td className="px-4 py-3 text-center">
                                  <button
                                    onClick={() => toggleAllInModule(mod.id)}
                                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors mx-auto ${
                                      (selectedPerms[mod.id] || []).length === qaPermissionTypes.length ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white hover:border-blue-400"
                                    }`}
                                  >
                                    {(selectedPerms[mod.id] || []).length === qaPermissionTypes.length && <Check className="w-3 h-3" />}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Group 2: Internal Data */}
                      <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="bg-emerald-50/50 border-b border-emerald-100 px-4 py-2 font-semibold text-emerald-800 text-xs uppercase tracking-wider">
                          Group 2 — Internal Data
                        </div>
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-3 font-medium text-slate-600 w-1/3">Module</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">View</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Create</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Edit</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Delete</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Export</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center w-24">All</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {modules.filter(m => ["company-data", "disclosure-data", "patent-data", "paper-data", "stock-data", "news-data", "finance-data", "employment-data"].includes(m.id)).map(mod => (
                              <tr key={mod.id} className="hover:bg-slate-50/50">
                                <td className="px-4 py-3 font-medium text-slate-700">{mod.name}</td>
                                {permissionTypes.map(type => {
                                  const isSelected = (selectedPerms[mod.id] || []).includes(type);
                                  return (
                                    <td key={type} className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => togglePermission(mod.id, type)}
                                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors mx-auto ${
                                          isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white hover:border-blue-400"
                                        }`}
                                      >
                                        {isSelected && <Check className="w-3 h-3" />}
                                      </button>
                                    </td>
                                  );
                                })}
                                <td className="px-4 py-3 text-center">
                                  <button
                                    onClick={() => toggleAllInModule(mod.id)}
                                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors mx-auto ${
                                      (selectedPerms[mod.id] || []).length === permissionTypes.length ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white hover:border-blue-400"
                                    }`}
                                  >
                                    {(selectedPerms[mod.id] || []).length === permissionTypes.length && <Check className="w-3 h-3" />}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Group 3: Server Management */}
                      <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="bg-amber-50/50 border-b border-amber-100 px-4 py-2 font-semibold text-amber-800 text-xs uppercase tracking-wider">
                          Group 3 — Server Management
                        </div>
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-3 font-medium text-slate-600 w-1/3">Module</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">View</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Create</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Edit</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Delete</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center">Export</th>
                              <th className="px-4 py-3 font-medium text-slate-600 text-center w-24">All</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {modules.filter(m => ["aws", "gcp", "idc"].includes(m.id)).map(mod => (
                              <tr key={mod.id} className="hover:bg-slate-50/50">
                                <td className="px-4 py-3 font-medium text-slate-700">{mod.name}</td>
                                {permissionTypes.map(type => {
                                  const isSelected = (selectedPerms[mod.id] || []).includes(type);
                                  return (
                                    <td key={type} className="px-4 py-3 text-center">
                                      <button
                                        onClick={() => togglePermission(mod.id, type)}
                                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors mx-auto ${
                                          isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white hover:border-blue-400"
                                        }`}
                                      >
                                        {isSelected && <Check className="w-3 h-3" />}
                                      </button>
                                    </td>
                                  );
                                })}
                                <td className="px-4 py-3 text-center">
                                  <button
                                    onClick={() => toggleAllInModule(mod.id)}
                                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors mx-auto ${
                                      (selectedPerms[mod.id] || []).length === permissionTypes.length ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white hover:border-blue-400"
                                    }`}
                                  >
                                    {(selectedPerms[mod.id] || []).length === permissionTypes.length && <Check className="w-3 h-3" />}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowRoleModal(false)}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveRole}>Save Role</Button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="chart-container-light">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Role Management</h3>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={openAddRole}>
            <Plus className="w-4 h-4" />
            Add Role
          </Button>
        </div>
        <div className="space-y-4">
          {(roles || []).map((perm) => {
            const roleUsers = users.filter(u => u.role === perm.role);
            return (
            <div
              key={perm.id}
              className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all bg-white shadow-sm flex flex-col"
              data-testid={`permission-${perm.id}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-bold text-slate-800" data-testid={`text-role-${perm.id}`}>{perm.role}</h4>
                  {perm.type === "admin" ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
                      Admin Role
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                      Service Role
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-auto pt-4 flex justify-between items-center border-t border-slate-50">
                 <div className="flex flex-wrap gap-2">
                    {roleUsers.length === 0 ? (
                      <span className="text-sm text-slate-400 italic">No users assigned</span>
                    ) : (
                      <>
                        {roleUsers.slice(0, 5).map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-full border border-slate-200 shadow-sm"
                            title={user.name}
                          >
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[10px] font-bold">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <span className="text-xs font-medium text-slate-700 pr-1">{user.name}</span>
                          </div>
                        ))}
                        {roleUsers.length > 5 && (
                          <div className="flex items-center justify-center px-2 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200 shadow-sm">
                            +{roleUsers.length - 5} more
                          </div>
                        )}
                      </>
                    )}
                 </div>
                 <div className="flex items-center gap-2">
                   <button 
                     type="button"
                     onClick={(e) => {
                       e.preventDefault();
                       e.stopPropagation();
                       openEditRole(perm.id);
                     }}
                     className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm relative z-10"
                   >
                     <Edit2 className="w-3.5 h-3.5" />
                     Edit Role
                   </button>
                   {perm.role !== "Admin" && (
                     <button
                       className="flex items-center justify-center w-9 h-9 bg-white hover:bg-red-50 border border-slate-200 text-red-600 hover:border-red-200 rounded-lg transition-colors shadow-sm relative z-10"
                       onClick={(e) => {
                         e.preventDefault();
                         e.stopPropagation();
                         requestDeleteRole(perm.id);
                       }}
                       data-testid={`button-role-delete-${perm.id}`}
                       title="Delete Role"
                       type="button"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   )}
                 </div>
              </div>
            </div>
            );
          })}
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
                  Role Management
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
                <EmailNotifications />
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
