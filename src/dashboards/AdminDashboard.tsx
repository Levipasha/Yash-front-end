import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Users, Video, FileText, CheckSquare, 
  BarChart, MessageSquare, Settings, LogOut, Search,
  TrendingUp, CreditCard, ShieldCheck, Database
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-purple-600 text-white shadow-md' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-purple-400'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </button>
);

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 text-white hidden lg:flex flex-col h-screen sticky top-0 overflow-y-auto pb-4">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Yash<span className="text-purple-500">Edu</span>
              <span className="text-xs ml-1 text-gray-500 font-normal border border-gray-700 px-1.5 py-0.5 rounded">Admin</span>
            </span>
          </div>
          
          <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            <nav className="flex flex-col gap-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4 px-4">Dashboard</p>
              <SidebarItem icon={BarChart} label="Analytics Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
              <SidebarItem icon={TrendingUp} label="Financial Reports" active={activeTab === 'Reports'} onClick={() => setActiveTab('Reports')} />
              
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-6 px-4">Management</p>
              <SidebarItem icon={Users} label="Students" active={activeTab === 'Students'} onClick={() => setActiveTab('Students')} />
              <SidebarItem icon={Users} label="Teachers" active={activeTab === 'Teachers'} onClick={() => setActiveTab('Teachers')} />
              <SidebarItem icon={Users} label="Parents" active={activeTab === 'Parents'} onClick={() => setActiveTab('Parents')} />
              <SidebarItem icon={BookOpen} label="Courses & Tracks" active={activeTab === 'Courses'} onClick={() => setActiveTab('Courses')} />
              <SidebarItem icon={Video} label="Live Classes" active={activeTab === 'Live Classes'} onClick={() => setActiveTab('Live Classes')} />
              <SidebarItem icon={CreditCard} label="Fee Management" active={activeTab === 'Fees'} onClick={() => setActiveTab('Fees')} />

              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-6 px-4">System</p>
              <SidebarItem icon={Database} label="CMS & Content" active={activeTab === 'CMS'} onClick={() => setActiveTab('CMS')} />
              <SidebarItem icon={MessageSquare} label="Notifications" active={activeTab === 'Notifications'} onClick={() => setActiveTab('Notifications')} />
            </nav>
          </div>
        </div>
        
        <div className="mt-auto p-6 border-t border-gray-800 bg-gray-950">
          <nav className="flex flex-col gap-2">

            <Link to="/" onClick={() => localStorage.clear()} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-white/5 transition-all font-medium mt-2">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-8 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">{activeTab}</h1>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Global Search..." className="pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 w-64 transition-all outline-none" />
            </div>
            <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin Profile" className="w-10 h-10 rounded-full border-2 border-purple-200 cursor-pointer" />
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'Overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              
              {/* Top KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-600"><Users className="w-16 h-16" /></div>
                  <h3 className="text-gray-500 text-sm font-bold mb-1">Total Active Students</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-2">52,481</p>
                  <span className="text-sm font-bold text-green-600 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> +12% this month</span>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-purple-600"><BookOpen className="w-16 h-16" /></div>
                  <h3 className="text-gray-500 text-sm font-bold mb-1">Active Courses</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-2">542</p>
                  <span className="text-sm font-bold text-green-600 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> +5 this month</span>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-red-600"><Users className="w-16 h-16" /></div>
                  <h3 className="text-gray-500 text-sm font-bold mb-1">Total Teachers</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-2">184</p>
                  <span className="text-sm font-bold text-gray-400 flex items-center gap-1">Stable</span>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-green-600"><CreditCard className="w-16 h-16" /></div>
                  <h3 className="text-gray-500 text-sm font-bold mb-1">Monthly Revenue (MRR)</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-2">$845k</p>
                  <span className="text-sm font-bold text-green-600 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> +8.4% this month</span>
                </div>
              </div>

              {/* Charts & Tables */}
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Revenue Chart Placeholder */}
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
                    <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm outline-none">
                      <option>Last 6 Months</option>
                      <option>This Year</option>
                    </select>
                  </div>
                  <div className="h-64 w-full flex items-end justify-between gap-2 pt-4">
                    {[40, 55, 45, 70, 65, 85].map((h, i) => (
                      <div key={i} className="w-full bg-purple-100 rounded-t-sm relative group">
                        <div className="absolute bottom-0 w-full bg-purple-500 rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap z-10">
                          ${(h * 12).toFixed(1)}k
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  </div>
                </div>

                {/* Recent Registrations */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Signups</h3>
                    <button className="text-purple-600 text-sm font-medium hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah Connor', role: 'Student', time: '2 mins ago' },
                      { name: 'John Doe', role: 'Teacher', time: '15 mins ago' },
                      { name: 'Mike Ross', role: 'Student', time: '1 hour ago' },
                      { name: 'Rachel Zane', role: 'Parent', time: '3 hours ago' },
                      { name: 'Harvey Specter', role: 'Teacher', time: '5 hours ago' },
                    ].map((user, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.role}</p>
                        </div>
                        <span className="text-xs text-gray-400">{user.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== 'Overview' && (
             <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeTab} Management Module</h2>
                <p className="text-gray-500 max-w-md mx-auto">This administrative module is part of the full backend implementation in Phase 2.</p>
                <button className="mt-4 px-6 py-2 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition-colors">
                  Contact Developer Team
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
