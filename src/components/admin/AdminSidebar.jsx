import { useState } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  MessageSquare, 
  Briefcase,
  Globe,
  GraduationCap,
  Menu,
  X,
  LogOut,
  User,
  PenTool,
  UserPlus,
  Send
} from 'lucide-react'
import { useDashboardSettings } from '../../contexts/DashboardSettingsContext'

const AdminSidebar = ({ activeSection, setActiveSection, user, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { settings } = useDashboardSettings()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'project-requests', label: 'Project Requests', icon: Send },
        { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Globe },
    { id: 'alumni', label: 'Alumni', icon: GraduationCap },
    { id: 'team', label: 'Team', icon: UserPlus },
    { id: 'blog', label: 'Blog & Insights', icon: PenTool },
  ]

  return (
    <div 
      className={`${isCollapsed ? 'w-20' : 'w-64'} shadow-lg transition-all duration-300 min-h-screen relative`}
      style={{
        backgroundColor: settings.theme.sidebarBackground
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 text-white rounded-full p-1 hover:opacity-80 transition-colors"
        style={{
          backgroundColor: settings.theme.primaryColor
        }}
      >
        {isCollapsed ? <Menu size={16} /> : <X size={16} />}
      </button>

      {/* Logo */}
      <div 
        className="p-6 border-b"
        style={{
          borderColor: settings.theme.adminBorderColor
        }}
      >
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: settings.theme.primaryColor
            }}
          >
            <span className="text-white font-bold text-lg">A</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 
                className="text-xl font-bold"
                style={{
                  color: settings.theme.adminTextPrimary
                }}
              >Admin Panel</h1>
              <p 
                className="text-xs"
                style={{
                  color: settings.theme.adminTextSecondary
                }}
              >YugYatra Control</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  style={{
                    backgroundColor: activeSection === item.id ? settings.theme.primaryColor : 'transparent',
                    color: activeSection === item.id ? 'white' : settings.theme.sidebarText
                  }}
                >
                  <Icon size={20} />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      {!isCollapsed && (
        <div 
          className="absolute bottom-0 left-0 right-0 p-4 border-t"
          style={{
            borderColor: settings.theme.adminBorderColor
          }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: settings.theme.adminBorderColor
              }}
            >
              <User size={16} style={{ color: settings.theme.sidebarText }} />
            </div>
            <div className="flex-1 min-w-0">
              <p 
                className="text-sm font-medium truncate"
                style={{
                  color: settings.theme.adminTextPrimary
                }}
              >
                {user?.email}
              </p>
              <p 
                className="text-xs"
                style={{
                  color: settings.theme.adminTextSecondary
                }}
              >Administrator</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminSidebar
