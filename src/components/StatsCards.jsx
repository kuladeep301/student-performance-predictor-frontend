import React from 'react';
import { Users, FileText, Target, AlertTriangle, TrendingUp } from 'lucide-react';

export default function StatsCards({ summary }) {
  const {
    totalStudents = 0,
    totalPredictions = 0,
    averagePredictedScore = 0,
    highRiskCount = 0,
    mediumRiskCount = 0,
    lowRiskCount = 0,
  } = summary || {};

  return (
    <div className="stats-grid">
      {/* Total Students */}
      <div className="glass-card stat-card" style={{ '--card-accent': '#6366f1' }}>
        <div>
          <div className="stat-label">Total Students</div>
          <div className="stat-value">{totalStudents}</div>
          <div className="stat-trend">
            <Users size={14} style={{ color: '#6366f1' }} />
            <span>Active enrolled profiles</span>
          </div>
        </div>
        <div className="stat-icon" style={{ '--card-accent': '#6366f1' }}>
          <Users size={24} />
        </div>
      </div>

      {/* Predictions Run */}
      <div className="glass-card stat-card" style={{ '--card-accent': '#06b6d4' }}>
        <div>
          <div className="stat-label">Model Predictions</div>
          <div className="stat-value">{totalPredictions}</div>
          <div className="stat-trend">
            <FileText size={14} style={{ color: '#06b6d4' }} />
            <span>Evaluations recorded</span>
          </div>
        </div>
        <div className="stat-icon" style={{ '--card-accent': '#06b6d4' }}>
          <FileText size={24} />
        </div>
      </div>

      {/* Average Projected Score */}
      <div className="glass-card stat-card" style={{ '--card-accent': '#10b981' }}>
        <div>
          <div className="stat-label">Cohort Avg Score</div>
          <div className="stat-value">{averagePredictedScore}%</div>
          <div className="stat-trend">
            <Target size={14} style={{ color: '#10b981' }} />
            <span>Target: 75.0% benchmark</span>
          </div>
        </div>
        <div className="stat-icon" style={{ '--card-accent': '#10b981' }}>
          <TrendingUp size={24} />
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="glass-card stat-card" style={{ '--card-accent': '#f43f5e' }}>
        <div>
          <div className="stat-label">Academic Risk Status</div>
          <div className="stat-value" style={{ fontSize: '1.75rem', display: 'flex', gap: '0.6rem', alignItems: 'baseline' }}>
            <span style={{ color: '#f43f5e' }}>{highRiskCount}</span>
            <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>high /</span>
            <span style={{ color: '#f59e0b', fontSize: '1.4rem' }}>{mediumRiskCount}</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>med</span>
          </div>
          <div className="stat-trend">
            <AlertTriangle size={14} style={{ color: '#f43f5e' }} />
            <span style={{ color: '#10b981' }}>{lowRiskCount} low-risk students</span>
          </div>
        </div>
        <div className="stat-icon" style={{ '--card-accent': '#f43f5e' }}>
          <AlertTriangle size={24} />
        </div>
      </div>
    </div>
  );
}
