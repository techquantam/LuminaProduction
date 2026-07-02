import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderKanban, ShieldCheck, LogOut, MessageSquare, Plus, Edit2, Trash2, CheckCircle, Mail, Globe, Award, Lock, Users } from 'lucide-react';
import TransitionEffect from '../components/TransitionEffect';

const AdminDashboard = () => {
  const { admin, login, logout, token, isStandalone, API_URL } = useAuth();
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Collection States
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [clients, setClients] = useState([]);
  const [team, setTeam] = useState([]);

  // Form States (Creates & Updates)
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Project Form
  const [projectForm, setProjectForm] = useState({ title: '', description: '', category: 'Pop-ups & Experiential Exhibitions', client: '', date: '', featured: false, videoUrl: '', servicesDone: '', subImages: '', location: 'Singapore', year: '2025' });
  const [projectFile, setProjectFile] = useState(null);
  const [subImageFiles, setSubImageFiles] = useState([]);

  // Service Form
  const [serviceForm, setServiceForm] = useState({ name: '', description: '', icon: 'Sparkles', features: '', details: '' });

  // Testimonial Form
  const [testimonialForm, setTestimonialForm] = useState({ clientName: '', company: '', feedback: '', rating: 5 });
  const [testimonialFile, setTestimonialFile] = useState(null);

  // Client Form
  const [clientForm, setClientForm] = useState({ name: '' });
  const [clientFile, setClientFile] = useState(null);
  const [brokenLogos, setBrokenLogos] = useState({});

  const handleLogoError = (id) => {
    setBrokenLogos(prev => ({
      ...prev,
      [id]: true
    }));
  };

  // Team Form
  const [teamForm, setTeamForm] = useState({ name: '', role: '' });
  const [teamFile, setTeamFile] = useState(null);

  // UI Status Alerts
  const [alert, setAlert] = useState({ type: '', msg: '' });

  // Load All Collections on Authentication
  useEffect(() => {
    if (admin) {
      fetchCollections();
    }
  }, [admin]);

  const triggerAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert({ type: '', msg: '' }), 5000);
  };

  const fetchCollections = async () => {
    try {
      // Projects
      const pRes = await fetch(`${API_URL}/projects`);
      const pData = await pRes.json();
      if (pData.success) setProjects(pData.data);

      // Services
      const sRes = await fetch(`${API_URL}/services`);
      const sData = await sRes.json();
      if (sData.success) setServices(sData.data);

      // Testimonials
      const tRes = await fetch(`${API_URL}/testimonials`);
      const tData = await tRes.json();
      if (tData.success) setTestimonials(tData.data);

      // Contacts
      const cRes = await fetch(`${API_URL}/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const cData = await cRes.json();
      if (cData.success) setContacts(cData.data);

      // Clients
      const clRes = await fetch(`${API_URL}/clients`);
      const clData = await clRes.json();
      if (clData.success) setClients(clData.data);

      // Team
      const teamRes = await fetch(`${API_URL}/team`);
      const teamData = await teamRes.json();
      if (teamData.success) setTeam(teamData.data);
    } catch (err) {
      console.warn('API is offline. Loading mock interactive collections in memory.');
      loadMockCollections();
    }
  };

  const loadMockCollections = () => {
    setProjects([
      { _id: '1', title: 'Couture Horizon Runway', category: 'Fashion Show', client: 'AURA COUTURE', date: '2026-03-12', featured: true, imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400' },
      { _id: '2', title: 'The Obsidian Gala', category: 'Corporate Gala', client: 'VERTU ENTERPRISE', date: '2026-04-05', featured: true, imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400' }
    ]);
    setServices([
      { _id: '1', name: 'Luxury Events', description: 'Gala dinners & private celeb celebrations.', icon: 'Sparkles' },
      { _id: '2', name: 'Corporate Conferences', description: 'Elite stage AV & streamed broadcasts.', icon: 'Award' }
    ]);
    setTestimonials([
      { _id: '1', clientName: 'Alexander Vance', company: 'Aura Couture', feedback: 'Grand Mirror Runway cliff constructs were sheer genius.', rating: 5 }
    ]);
    setContacts([
      { _id: '1', name: 'Gilles Delacroix', email: 'gilles@chanel.com', subject: 'Paris Runway Curation 2026', message: 'We want to orchestrate an ethereal show.', status: 'unread' }
    ]);
    setClients([
      { _id: '1', name: 'Chanel', logoUrl: 'https://logo.clearbit.com/chanel.com' },
      { _id: '2', name: 'Cartier', logoUrl: 'https://logo.clearbit.com/cartier.com' },
      { _id: '3', name: 'BMW', logoUrl: 'https://logo.clearbit.com/bmw.com' }
    ]);
    setTeam([
      { _id: '1', name: 'Gilles Delacroix', role: 'Managing Director & Scenographer', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400' },
      { _id: '2', name: 'Sophia Laurent', role: 'Creative Director & Fashion Producer', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400' },
      { _id: '3', name: 'Marcus Vance', role: 'Chief Technical Officer & AV Architect', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400' },
      { _id: '4', name: 'Elena Rostova', role: 'Head of Experience & Client Relations', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400' }
    ]);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await login(loginEmail, loginPassword);
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  // ==========================================
  // PROJECT CRUD OPERATIONS
  // ==========================================
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    
    // Standalone fallback handling
    if (isStandalone || !token) {
      const mockProj = {
        _id: isEditing ? editId : Math.random().toString(36).substring(2, 11),
        imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400',
        ...projectForm
      };
      
      if (isEditing) {
        setProjects(prev => prev.map(p => p._id === editId ? mockProj : p));
        triggerAlert('success', 'Project Updated (Standalone Sandbox).');
      } else {
        setProjects(prev => [...prev, mockProj]);
        triggerAlert('success', 'Project Created (Standalone Sandbox).');
      }
      resetProjectForm();
      return;
    }

    try {
      const formPayload = new FormData();
      Object.keys(projectForm).forEach(key => formPayload.append(key, projectForm[key]));
      if (projectFile) formPayload.append('image', projectFile);
      subImageFiles.forEach(file => {
        formPayload.append('subImages', file);
      });

      const url = isEditing ? `${API_URL}/projects/${editId}` : `${API_URL}/projects`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formPayload
      });

      const data = await response.json();
      if (data.success) {
        triggerAlert('success', isEditing ? 'Project Updated.' : 'Project Created.');
        fetchCollections();
        resetProjectForm();
      } else {
        triggerAlert('error', data.message);
      }
    } catch (err) {
      triggerAlert('error', 'Error performing project operation.');
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this spectacle archive?')) return;
    if (isStandalone) {
      setProjects(prev => prev.filter(p => p._id !== id));
      triggerAlert('success', 'Project Deleted (Standalone Sandbox).');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        triggerAlert('success', 'Project Deleted.');
        fetchCollections();
      }
    } catch (e) {
      triggerAlert('error', 'Error deleting project.');
    }
  };

  const editProject = (proj) => {
    setIsEditing(true);
    setEditId(proj._id);
    setProjectForm({
      title: proj.title,
      description: proj.description || '',
      category: proj.category,
      client: proj.client,
      date: proj.date ? proj.date.split('T')[0] : '',
      featured: proj.featured || false,
      videoUrl: proj.videoUrl || '',
      servicesDone: proj.servicesDone ? proj.servicesDone.join(', ') : '',
      subImages: proj.subImages ? proj.subImages.join(', ') : '',
      location: proj.location || 'Singapore',
      year: proj.year || '2025'
    });
  };

  const resetProjectForm = () => {
    setProjectForm({ title: '', description: '', category: 'Pop-ups & Experiential Exhibitions', client: '', date: '', featured: false, videoUrl: '', servicesDone: '', subImages: '', location: 'Singapore', year: '2025' });
    setProjectFile(null);
    setSubImageFiles([]);
    setIsEditing(false);
    setEditId(null);
  };

  // ==========================================
  // SERVICE CRUD OPERATIONS
  // ==========================================
  const handleServiceSubmit = async (e) => {
    e.preventDefault();

    if (isStandalone) {
      const mockSvc = {
        _id: isEditing ? editId : Math.random().toString(36).substring(2, 11),
        ...serviceForm
      };
      if (isEditing) {
        setServices(prev => prev.map(s => s._id === editId ? mockSvc : s));
      } else {
        setServices(prev => [...prev, mockSvc]);
      }
      triggerAlert('success', 'Service action completed in Sandbox.');
      resetServiceForm();
      return;
    }

    try {
      const url = isEditing ? `${API_URL}/services/${editId}` : `${API_URL}/services`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(serviceForm)
      });

      const data = await response.json();
      if (data.success) {
        triggerAlert('success', isEditing ? 'Service Updated.' : 'Service Created.');
        fetchCollections();
        resetServiceForm();
      } else {
        triggerAlert('error', data.message);
      }
    } catch (e) {
      triggerAlert('error', 'Error managing service.');
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Delete this service profile?')) return;
    if (isStandalone) {
      setServices(prev => prev.filter(s => s._id !== id));
      triggerAlert('success', 'Service Deleted (Sandbox).');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if ((await res.json()).success) {
        triggerAlert('success', 'Service Deleted.');
        fetchCollections();
      }
    } catch (e) {
      triggerAlert('error', 'Error deleting service.');
    }
  };

  const editService = (svc) => {
    setIsEditing(true);
    setEditId(svc._id);
    setServiceForm({
      name: svc.name,
      description: svc.description,
      icon: svc.icon || 'Sparkles',
      features: svc.features ? svc.features.join(', ') : '',
      details: svc.details || ''
    });
  };

  const resetServiceForm = () => {
    setServiceForm({ name: '', description: '', icon: 'Sparkles', features: '', details: '' });
    setIsEditing(false);
    setEditId(null);
  };

  // ==========================================
  // CONTACT OPERATIONS
  // ==========================================
  const markContactRead = async (id) => {
    if (isStandalone) {
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status: 'read' } : c));
      triggerAlert('success', 'Inquiry marked read.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'read' })
      });
      if ((await res.json()).success) {
        triggerAlert('success', 'Inquiry marked read.');
        fetchCollections();
      }
    } catch (e) {
      triggerAlert('error', 'Error updating inbox.');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete submission?')) return;
    if (isStandalone) {
      setContacts(prev => prev.filter(c => c._id !== id));
      triggerAlert('success', 'Inquiry Deleted.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if ((await res.json()).success) {
        triggerAlert('success', 'Inquiry Deleted.');
        fetchCollections();
      }
    } catch (e) {
      triggerAlert('error', 'Error deleting contact.');
    }
  };

  // ==========================================
  // CLIENT CRUD OPERATIONS
  // ==========================================
  const handleClientSubmit = async (e) => {
    e.preventDefault();

    if (isStandalone || !token) {
      const mockCli = {
        _id: Math.random().toString(36).substring(2, 11),
        name: clientForm.name || '',
        logoUrl: 'https://cdn.logo.wine/logo/Chanel/Chanel-Logo.wine.svg'
      };
      setClients(prev => [mockCli, ...prev]);
      triggerAlert('success', 'Client Added (Sandbox).');
      resetClientForm();
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append('name', clientForm.name);
      if (clientFile) formPayload.append('logo', clientFile);

      const response = await fetch(`${API_URL}/clients`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formPayload
      });

      const data = await response.json();
      if (data.success) {
        triggerAlert('success', 'Client Brand added successfully.');
        fetchCollections();
        resetClientForm();
      } else {
        triggerAlert('error', data.message);
      }
    } catch (err) {
      triggerAlert('error', 'Error adding client.');
    }
  };

  const deleteClient = async (id) => {
    if (!window.confirm('Delete this client brand?')) return;
    if (isStandalone) {
      setClients(prev => prev.filter(c => c._id !== id));
      triggerAlert('success', 'Client Deleted (Sandbox).');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/clients/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        triggerAlert('success', 'Client Brand removed.');
        fetchCollections();
      }
    } catch (e) {
      triggerAlert('error', 'Error deleting client.');
    }
  };

  const resetClientForm = () => {
    setClientForm({ name: '' });
    setClientFile(null);
  };

  // ==========================================
  // TEAM CRUD OPERATIONS
  // ==========================================
  const handleTeamSubmit = async (e) => {
    e.preventDefault();

    if (isStandalone || !token) {
      const mockMember = {
        _id: Math.random().toString(36).substring(2, 11),
        name: teamForm.name,
        role: teamForm.role,
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400'
      };
      setTeam(prev => [mockMember, ...prev]);
      triggerAlert('success', 'Team Member Added (Sandbox).');
      resetTeamForm();
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append('name', teamForm.name);
      formPayload.append('role', teamForm.role);
      if (teamFile) formPayload.append('image', teamFile);

      const response = await fetch(`${API_URL}/team`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formPayload
      });

      const data = await response.json();
      if (data.success) {
        triggerAlert('success', 'Team member added successfully.');
        fetchCollections();
        resetTeamForm();
      } else {
        triggerAlert('error', data.message);
      }
    } catch (err) {
      triggerAlert('error', 'Error adding team member.');
    }
  };

  const deleteTeamMember = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    if (isStandalone) {
      setTeam(prev => prev.filter(m => m._id !== id));
      triggerAlert('success', 'Team Member Deleted (Sandbox).');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/team/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        triggerAlert('success', 'Team member removed.');
        fetchCollections();
      }
    } catch (e) {
      triggerAlert('error', 'Error deleting team member.');
    }
  };

  const resetTeamForm = () => {
    setTeamForm({ name: '', role: '' });
    setTeamFile(null);
  };

  // 1. RENDER LOGIN SCREEN
  if (!admin) {
    return (
      <>
        <TransitionEffect />
        <div className="min-h-screen bg-luxury-bg dark:bg-luxury-bgDark flex items-center justify-center pt-24 px-6 transition-colors">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white dark:bg-[#0E0E0E] p-8 border border-luxury-gold/15 shadow-2xl space-y-8"
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mx-auto">
                <Lock size={20} />
              </div>
              <h1 className="font-editorial text-3xl font-light tracking-wide">Lumina Admin</h1>
              <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Authorized Staff Access Only</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold font-light"
                  placeholder="admin@luminalive.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold font-light"
                  placeholder="••••••••"
                  required
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-500 bg-red-950/10 border border-red-500/20 p-3 rounded">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-luxury-gold text-luxury-black font-semibold text-xs uppercase tracking-widest py-3 flex items-center justify-center space-x-2 hover:bg-luxury-black hover:text-white dark:hover:bg-white dark:hover:text-luxury-black transition-colors"
              >
                <ShieldCheck size={14} />
                <span>Verify Credentials</span>
              </button>
            </form>

            <div className="border-t border-luxury-gold/10 pt-4 text-center">
              <p className="text-[9px] uppercase tracking-wider text-luxury-black/40 dark:text-white/40 leading-relaxed">
                Demo Key Fallback Available:<br />
                admin@luminalive.com / admin123
              </p>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  // 2. RENDER MAIN DASHBOARD VIEW
  return (
    <>
      <TransitionEffect />
      <div className="min-h-screen bg-luxury-bg dark:bg-luxury-bgDark transition-colors pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header Dashboard Banner */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-luxury-gold/20 pb-8 mb-12">
            <div>
              <p className="text-xs uppercase tracking-extreme text-luxury-gold font-bold">
                {isStandalone ? 'Client Sandbox Mode' : 'Connected to API'}
              </p>
              <h1 className="font-editorial text-4xl font-light text-luxury-black dark:text-white mt-1">
                Concierge Console
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs font-semibold uppercase text-luxury-gold">{admin.username}</p>
                <p className="text-[10px] text-luxury-black/40 dark:text-white/40">{admin.email}</p>
              </div>
              <button
                onClick={logout}
                className="p-3 bg-red-950/20 text-red-500 rounded-full border border-red-900/30 hover:bg-red-500 hover:text-white transition-colors"
                title="Log Out Console"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Status Alerts */}
          {alert.msg && (
            <div className={`p-4 mb-8 text-xs uppercase tracking-widest font-semibold border rounded ${alert.type === 'success' ? 'bg-luxury-gold/15 border-luxury-gold/45 text-luxury-gold animate-pulse' : 'bg-red-950/15 border-red-800 text-red-400'}`}>
              {alert.msg}
            </div>
          )}

          {/* Sidebar & Tabs Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-3">
              <button
                onClick={() => { setActiveTab('overview'); resetProjectForm(); resetServiceForm(); }}
                className={`w-full text-left flex items-center space-x-4 px-6 py-4 text-xs uppercase tracking-widest font-bold border transition-all ${activeTab === 'overview' ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/5' : 'border-luxury-gold/10 text-luxury-black/60 dark:text-white/60 hover:border-luxury-gold/30'}`}
              >
                <LayoutDashboard size={14} />
                <span>Overview</span>
              </button>

              <button
                onClick={() => { setActiveTab('projects'); resetProjectForm(); }}
                className={`w-full text-left flex items-center space-x-4 px-6 py-4 text-xs uppercase tracking-widest font-bold border transition-all ${activeTab === 'projects' ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/5' : 'border-luxury-gold/10 text-luxury-black/60 dark:text-white/60 hover:border-luxury-gold/30'}`}
              >
                <FolderKanban size={14} />
                <span>Spectacles CRUD</span>
              </button>

              {/* Services CRUD Button Removed */}

              <button
                onClick={() => { setActiveTab('contacts'); }}
                className={`w-full text-left flex items-center space-x-4 px-6 py-4 text-xs uppercase tracking-widest font-bold border transition-all ${activeTab === 'contacts' ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/5' : 'border-luxury-gold/10 text-luxury-black/60 dark:text-white/60 hover:border-luxury-gold/30'}`}
              >
                <MessageSquare size={14} />
                <span>Concierge Inbox ({contacts.filter(c => c.status === 'unread').length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('clients'); resetClientForm(); }}
                className={`w-full text-left flex items-center space-x-4 px-6 py-4 text-xs uppercase tracking-widest font-bold border transition-all ${activeTab === 'clients' ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/5' : 'border-luxury-gold/10 text-luxury-black/60 dark:text-white/60 hover:border-luxury-gold/30'}`}
              >
                <Award size={14} />
                <span>Clients CRUD</span>
              </button>

              <button
                onClick={() => { setActiveTab('team'); resetTeamForm(); }}
                className={`w-full text-left flex items-center space-x-4 px-6 py-4 text-xs uppercase tracking-widest font-bold border transition-all ${activeTab === 'team' ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/5' : 'border-luxury-gold/10 text-luxury-black/60 dark:text-white/60 hover:border-luxury-gold/30'}`}
              >
                <Users size={14} />
                <span>Team CRUD</span>
              </button>
            </div>

            {/* main Content Area */}
            <div className="lg:col-span-9 bg-white dark:bg-[#0E0E0E] p-8 border border-luxury-gold/15 shadow-xl">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-12">
                  <h2 className="font-editorial text-2xl font-light text-luxury-gold">Overview Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 border border-luxury-gold/15 space-y-2">
                      <h4 className="text-xs uppercase tracking-widest text-luxury-black/40 dark:text-white/40 font-bold">Spectacle Archives</h4>
                      <p className="font-editorial text-4xl text-luxury-gold font-light">{projects.length}</p>
                    </div>
                    <div className="p-6 border border-luxury-gold/15 space-y-2">
                      <h4 className="text-xs uppercase tracking-widest text-luxury-black/40 dark:text-white/40 font-bold">Inbox Submissions</h4>
                      <p className="font-editorial text-4xl text-luxury-gold font-light">
                        {contacts.filter(c => c.status === 'unread').length} <span className="text-xs uppercase tracking-widest text-red-500 font-sans font-semibold">unread</span>
                      </p>
                    </div>
                  </div>

                  {/* Latest Inquiries lists */}
                  <div className="space-y-4">
                    <h3 className="font-editorial text-xl font-light border-b border-luxury-gold/10 pb-2">Latest Inbox Inquiries</h3>
                    <div className="space-y-3">
                      {contacts.slice(0, 3).map(con => (
                        <div key={con._id} className="p-4 border border-luxury-gold/10 rounded flex justify-between items-center gap-4 text-xs font-light">
                          <div className="space-y-1">
                            <p className="font-semibold text-luxury-gold">{con.name} &bull; {con.email}</p>
                            <p className="text-[10px] uppercase font-bold text-luxury-black/50 dark:text-white/50">{con.subject}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full uppercase tracking-widest text-[9px] font-bold ${con.status === 'unread' ? 'bg-red-950/20 text-red-400' : 'bg-green-950/20 text-green-400'}`}>
                            {con.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS CRUD */}
              {activeTab === 'projects' && (
                <div className="space-y-12">
                  <div className="flex justify-between items-center border-b border-luxury-gold/10 pb-4">
                    <h2 className="font-editorial text-2xl font-light text-luxury-gold">
                      {isEditing ? 'Edit Spectacle' : 'Add New Spectacle'}
                    </h2>
                    {isEditing && (
                      <button onClick={resetProjectForm} className="text-xs uppercase tracking-widest border border-luxury-gold/30 px-4 py-2 hover:border-luxury-gold transition-all">Cancel Edit</button>
                    )}
                  </div>

                  {/* Create / Edit Form */}
                  <form onSubmit={handleProjectSubmit} className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Spectacle Title</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold"
                        placeholder="ENTER SPECTACLE NAME"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold"
                        required
                      >
                        <option value="Pop-ups & Experiential Exhibitions">Pop-ups & Experiential Exhibitions</option>
                        <option value="Luxury, Fashion, Lifestyle Events & Galas">Luxury, Fashion, Lifestyle Events & Galas</option>
                        <option value="Corporate Events & Conferences">Corporate Events & Conferences</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Client</label>
                      <input
                        type="text"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, client: e.target.value }))}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold"
                        placeholder="ENTER CLIENT NAME"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Event Date</label>
                      <input
                        type="date"
                        value={projectForm.date}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Location Coordinates</label>
                      <input
                        type="text"
                        value={projectForm.location}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold"
                        placeholder="Singapore"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Chronology Year</label>
                      <input
                        type="text"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, year: e.target.value }))}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold"
                        placeholder="2025"
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Curation Checklist (Comma Separated)</label>
                      <input
                        type="text"
                        value={projectForm.servicesDone}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, servicesDone: e.target.value }))}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold"
                        placeholder="Runway Engineering, Light Plotting, Acoustic Design"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Sub-Images (Comma Separated URLs)</label>
                      <input
                        type="text"
                        value={projectForm.subImages}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, subImages: e.target.value }))}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold"
                        placeholder="https://image1.com, https://image2.com"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Spectacle Narrative</label>
                      <textarea
                        value={projectForm.description}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold resize-none"
                        placeholder="DESCRIBE SPECTACLE OBJECTIVES..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Main Image Upload</label>
                      <input
                        type="file"
                        onChange={(e) => setProjectFile(e.target.files[0])}
                        className="w-full text-xs text-luxury-black/60 dark:text-white/60"
                        accept="image/*"
                        required={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Sub-Images Upload (Multiple Files)</label>
                      <input
                        type="file"
                        onChange={(e) => setSubImageFiles(Array.from(e.target.files))}
                        className="w-full text-xs text-luxury-black/60 dark:text-white/60"
                        accept="image/*"
                        multiple
                      />
                    </div>

                    <div className="flex items-center space-x-3 py-2">
                      <input
                        type="checkbox"
                        checked={projectForm.featured}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, featured: e.target.checked }))}
                        id="featured"
                        className="w-4 h-4 accent-luxury-gold"
                      />
                      <label htmlFor="featured" className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold select-none cursor-pointer">
                        Feature on Hero Page
                      </label>
                    </div>

                    <div className="md:col-span-2 pt-4">
                      <button type="submit" className="w-full bg-luxury-gold text-luxury-black font-semibold text-xs uppercase tracking-widest py-3 hover:bg-luxury-black hover:text-white dark:hover:bg-white dark:hover:text-luxury-black transition-colors">
                        {isEditing ? 'Apply Spectacle Update' : 'Publish Spectacle Archive'}
                      </button>
                    </div>
                  </form>

                  {/* Archives List View */}
                  <div className="space-y-4 pt-12 border-t border-luxury-gold/10">
                    <h3 className="font-editorial text-xl font-light">Spectacle Archives</h3>
                    <div className="space-y-3">
                      {projects.map(proj => (
                        <div key={proj._id} className="p-4 border border-luxury-gold/10 rounded flex justify-between items-center gap-4">
                          <div className="flex items-center space-x-4">
                            {proj.imageUrl && (
                              <img src={proj.imageUrl} alt={proj.title} className="w-12 h-12 object-cover border border-luxury-gold/20" />
                            )}
                            <div className="text-xs font-light">
                              <p className="font-semibold text-luxury-gold">{proj.title}</p>
                              <p className="text-[10px] uppercase text-luxury-black/40 dark:text-white/40">{proj.category} &bull; {proj.client}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button onClick={() => editProject(proj)} className="p-2 border border-luxury-gold/20 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all" title="Edit">
                              <Edit2 size={12} />
                            </button>
                            <button onClick={() => deleteProject(proj._id)} className="p-2 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all" title="Delete">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SERVICES CRUD REMOVED */}

              {/* TAB 4: CONCIERGE INBOX */}
              {activeTab === 'contacts' && (
                <div className="space-y-12">
                  <h2 className="font-editorial text-2xl font-light text-luxury-gold border-b border-luxury-gold/10 pb-4">
                    Concierge Inbox ({contacts.length} Inquiries)
                  </h2>

                  <div className="space-y-6">
                    {contacts.length === 0 ? (
                      <p className="text-sm font-light text-luxury-black/50 dark:text-white/40 italic">No inquiries received yet.</p>
                    ) : (
                      contacts.map(con => (
                        <div
                          key={con._id}
                          className={`p-6 border rounded space-y-4 transition-all ${con.status === 'unread' ? 'border-luxury-gold bg-luxury-gold/5' : 'border-luxury-gold/15'}`}
                        >
                          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                            <div>
                              <p className="text-sm font-semibold text-luxury-gold">{con.name} &bull; {con.email}</p>
                              <p className="text-xs font-bold text-luxury-black/60 dark:text-white/60 mt-1 uppercase tracking-wide">
                                Theme: {con.subject}
                              </p>
                            </div>
                            <span className={`self-start md:self-auto px-3 py-1 rounded-full uppercase tracking-widest text-[9px] font-bold ${con.status === 'unread' ? 'bg-red-950/20 text-red-400' : 'bg-green-950/20 text-green-400'}`}>
                              {con.status}
                            </span>
                          </div>

                          <p className="text-xs font-light text-luxury-black/85 dark:text-white/70 leading-relaxed border-t border-luxury-gold/10 pt-4 italic">
                            "{con.message}"
                          </p>

                          <div className="flex justify-end space-x-3 pt-2">
                            {con.status === 'unread' && (
                              <button
                                onClick={() => markContactRead(con._id)}
                                className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold border border-luxury-gold/25 px-4 py-2 hover:border-luxury-gold hover:text-luxury-gold transition-colors text-luxury-black dark:text-white"
                              >
                                <CheckCircle size={12} />
                                <span>Mark Read</span>
                              </button>
                            )}
                            <button
                              onClick={() => deleteContact(con._id)}
                              className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold border border-red-500/25 px-4 py-2 hover:border-red-500 hover:text-white hover:bg-red-500 transition-colors text-red-500"
                            >
                              <Trash2 size={12} />
                              <span>Delete Inquiry</span>
                            </button>
                          </div>

                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: CLIENTS CRUD */}
              {activeTab === 'clients' && (
                <div className="space-y-12">
                  <div className="flex justify-between items-center border-b border-luxury-gold/10 pb-4">
                    <h2 className="font-editorial text-2xl font-light text-luxury-gold">Add Brand Partner</h2>
                  </div>

                  {/* Create Form */}
                  <form onSubmit={handleClientSubmit} className="space-y-6 max-w-xl">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Brand Name</label>
                      <input
                        type="text"
                        value={clientForm.name}
                        onChange={(e) => setClientForm({ name: e.target.value })}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold font-light"
                        placeholder="ENTER BRAND NAME (E.G. DIOR)"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Brand Logo Image</label>
                      <input
                        type="file"
                        onChange={(e) => setClientFile(e.target.files[0])}
                        className="w-full text-xs text-luxury-black/60 dark:text-white/60"
                        accept="image/*"
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="w-full bg-luxury-gold text-luxury-black font-semibold text-xs uppercase tracking-widest py-3 hover:bg-luxury-black hover:text-white dark:hover:bg-white dark:hover:text-luxury-black transition-colors">
                        Add Client Partner
                      </button>
                    </div>
                  </form>

                  {/* Clients Grid */}
                  <div className="space-y-4 pt-12 border-t border-luxury-gold/10">
                    <h3 className="font-editorial text-xl font-light">Client Partners ({clients.length})</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {clients.map(cli => (
                        <div key={cli._id} className="p-4 border border-luxury-gold/10 rounded flex flex-col justify-between items-center text-center gap-3 bg-luxury-black/[0.01] dark:bg-white/[0.01]">
                          <div className="w-24 h-12 flex items-center justify-center overflow-hidden border border-luxury-gold/10 bg-white p-1">
                            {cli.logoUrl && !brokenLogos[cli._id] ? (
                              <img 
                                src={cli.logoUrl} 
                                alt={cli.name || 'Brand Logo'} 
                                className="h-8 w-auto max-w-[95%] object-contain filter grayscale" 
                                onError={() => handleLogoError(cli._id)}
                              />
                            ) : (
                              <span className="font-editorial text-xs tracking-wider text-luxury-gold uppercase font-bold text-center leading-none px-1">
                                {cli.name || 'Brand'}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] uppercase font-bold text-luxury-black/75 dark:text-white/70">{cli.name || 'Unnamed Brand'}</span>
                          <button
                            onClick={() => deleteClient(cli._id)}
                            className="w-full py-1 text-[8px] uppercase tracking-widest font-semibold text-red-500 border border-red-500/25 hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: TEAM CRUD */}
              {activeTab === 'team' && (
                <div className="space-y-12">
                  <div className="flex justify-between items-center border-b border-luxury-gold/10 pb-4">
                    <h2 className="font-editorial text-2xl font-light text-luxury-gold">Add Team Member</h2>
                  </div>

                  {/* Create Form */}
                  <form onSubmit={handleTeamSubmit} className="space-y-6 max-w-xl">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Full Name</label>
                      <input
                        type="text"
                        value={teamForm.name}
                        onChange={(e) => setTeamForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold font-light"
                        placeholder="ENTER FULL NAME"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Role / Designation</label>
                      <input
                        type="text"
                        value={teamForm.role}
                        onChange={(e) => setTeamForm(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full bg-transparent border-b border-luxury-gold/20 py-2 text-sm focus:outline-none focus:border-luxury-gold font-light"
                        placeholder="E.G. CREATIVE DIRECTOR"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Member Image</label>
                      <input
                        type="file"
                        onChange={(e) => setTeamFile(e.target.files[0])}
                        className="w-full text-xs text-luxury-black/60 dark:text-white/60"
                        accept="image/*"
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="w-full bg-luxury-gold text-luxury-black font-semibold text-xs uppercase tracking-widest py-3 hover:bg-luxury-black hover:text-white dark:hover:bg-white dark:hover:text-luxury-black transition-colors">
                        Add Team Member
                      </button>
                    </div>
                  </form>

                  {/* Team Members Grid */}
                  <div className="space-y-4 pt-12 border-t border-luxury-gold/10">
                    <h3 className="font-editorial text-xl font-light">Team Members ({team.length})</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {team.map(member => (
                        <div key={member._id} className="p-4 border border-luxury-gold/10 rounded flex flex-col justify-between items-center text-center gap-3 bg-luxury-black/[0.01] dark:bg-white/[0.01]">
                          <div className="w-24 h-24 flex items-center justify-center overflow-hidden border border-luxury-gold/10 bg-white p-1">
                            {member.imageUrl ? (
                              <img src={member.imageUrl} alt={member.name} className="h-full w-full object-cover filter grayscale" />
                            ) : (
                              <span className="text-[8px] uppercase tracking-wider text-luxury-gold font-bold">{member.name}</span>
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold text-luxury-black/75 dark:text-white/70 leading-none">{member.name}</p>
                            <p className="text-[8px] text-luxury-gold font-medium uppercase tracking-wider">{member.role}</p>
                          </div>
                          <button
                            onClick={() => deleteTeamMember(member._id)}
                            className="w-full py-1 text-[8px] uppercase tracking-widest font-semibold text-red-500 border border-red-500/25 hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
