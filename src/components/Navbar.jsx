import React from 'react';
import { GraduationCap, LayoutDashboard, Sparkles, Users, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isLiveBackend }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-wrapper" onClick={() => setActiveTab('dashboard')}>
          <div className="brand-icon-box">
            <GraduationCap size={24} strokeWidth={2.4} />
          </div>
          <div>
            <div className="brand-title">EduPredict AI</div>
            <div className="brand-subtitle">Academic Intelligence Engine</div>
          </div>
        </div>

        <nav className="nav-links">
          <button
            id="nav-tab-dashboard"
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            id="nav-tab-predictor"
            className={`nav-btn ${activeTab === 'predictor' ? 'active' : ''}`}
            onClick={() => setActiveTab('predictor')}
          >
            <Sparkles size={18} />
            <span>Predictor</span>
          </button>

          <button
            id="nav-tab-students"
            className={`nav-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <Users size={18} />
            <span>Students</span>
          </button>

          <button
            id="nav-tab-insights"
            className={`nav-btn ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            <Cpu size={18} />
            <span>AI Insights</span>
          </button>
        </nav>

        <div className="nav-actions">
          <div 
            className="status-badge" 
            title={isLiveBackend ? "Connected to Spring Boot API on port 8080" : "Running on Intelligent Client Engine with Spring Boot Fallback"}
          >
            <span className={`status-dot ${isLiveBackend ? 'online' : 'demo'}`}></span>
            <span>{isLiveBackend ? 'Spring Boot 8080' : 'Predictor Engine Active'}</span>
          </div>

          <button 
            id="btn-quick-predict"
            className="btn-primary" 
            style={{ width: 'auto', padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('predictor')}
          >
            <Zap size={16} />
            <span>New Prediction</span>
          </button>
        </div>
      </div>
    </header>
  );
}
