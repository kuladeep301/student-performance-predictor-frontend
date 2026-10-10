import React, { useState } from 'react';
import { 
  Award, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Copy, 
  Check, 
  Sliders, 
  Clock 
} from 'lucide-react';

export default function PredictionResultCard({ prediction }) {
  const [copied, setCopied] = useState(false);

  if (!prediction) {
    return (
      <div className="glass-card result-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem',
          color: '#6366f1',
        }}>
          <Sparkles size={32} />
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>
          Awaiting Assessment
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '280px', margin: '0 auto' }}>
          Adjust the academic parameters on the left and click <strong>Generate Official AI Prediction</strong> to see comprehensive analytics.
        </p>
      </div>
    );
  }

  const {
    studentName = 'Student',
    predictedScore = 0,
    predictedGrade = 'B',
    riskLevel = 'LOW',
    confidenceScore = 90.0,
    actionItems = [],
    featureContributions = {},
    createdAt,
  } = prediction;

  const handleCopyReport = () => {
    const text = `Academic Performance Forecast for ${studentName}:
• Predicted Score: ${predictedScore}% (Grade: ${predictedGrade})
• Risk Assessment: ${riskLevel} Risk
• AI Confidence: ${confidenceScore}%
• Key Recommendations:
${actionItems.map(item => `  - ${item}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gradeColors = {
    A: { bg: 'var(--grad-emerald)', shadow: '0 0 25px rgba(16, 185, 129, 0.4)' },
    B: { bg: 'var(--grad-primary)', shadow: '0 0 25px rgba(99, 102, 241, 0.4)' },
    C: { bg: 'var(--grad-amber)', shadow: '0 0 25px rgba(245, 158, 11, 0.4)' },
    D: { bg: 'linear-gradient(135deg, #f97316, #ea580c)', shadow: '0 0 25px rgba(249, 115, 22, 0.4)' },
    F: { bg: 'var(--grad-rose)', shadow: '0 0 25px rgba(244, 63, 94, 0.4)' },
  };

  const currentGradeStyle = gradeColors[predictedGrade] || gradeColors.B;

  return (
    <div className="glass-card result-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.05em' }}>
            AI Forecast Output
          </span>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 800 }}>{studentName}</h3>
        </div>
        <button
          onClick={handleCopyReport}
          title="Copy report summary"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
          }}
        >
          {copied ? <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={14} />}
          <span>{copied ? 'Copied' : 'Export'}</span>
        </button>
      </div>

      {/* Hero Score Display */}
      <div className="score-hero">
        <div className="score-number-wrap">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
            <span className="score-big">{predictedScore}</span>
            <span className="score-max">/100</span>
          </div>
          <span className="score-label">Predicted Final Mark</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
            Model Confidence: <strong style={{ color: 'var(--accent-cyan)' }}>{confidenceScore}%</strong>
          </span>
        </div>

        <div 
          className="grade-badge-huge" 
          style={{ background: currentGradeStyle.bg, boxShadow: currentGradeStyle.shadow }}
        >
          {predictedGrade}
        </div>
      </div>

      {/* Risk Alert Banner */}
      <div className={`risk-banner risk-${riskLevel}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {riskLevel === 'LOW' && <CheckCircle2 size={20} />}
          {riskLevel === 'MEDIUM' && <TrendingUp size={20} />}
          {riskLevel === 'HIGH' && <ShieldAlert size={20} />}
          <span>Academic Risk Level: <strong>{riskLevel} RISK</strong></span>
        </div>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {riskLevel === 'LOW' ? 'On Track' : riskLevel === 'MEDIUM' ? 'Needs Focus' : 'Urgent Action'}
        </span>
      </div>

      {/* Feature Contributions Breakdown */}
      <div className="contributions-section">
        <div className="section-subtitle">
          <Sliders size={14} />
          <span>Factor Impact Analysis</span>
        </div>

        <div className="contrib-bar-wrap">
          <div className="contrib-header">
            <span>Midterm Exam (35%)</span>
            <span>{featureContributions.midtermWeight || 35}% weight</span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: '85%', background: '#f59e0b' }}></div>
          </div>
        </div>

        <div className="contrib-bar-wrap">
          <div className="contrib-header">
            <span>Continuous Assignments (25%)</span>
            <span>{featureContributions.assignmentWeight || 25}% weight</span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: '70%', background: '#10b981' }}></div>
          </div>
        </div>

        <div className="contrib-bar-wrap">
          <div className="contrib-header">
            <span>Attendance Consistency (20%)</span>
            <span>{featureContributions.attendanceWeight || 20}% weight</span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: '60%', background: '#06b6d4' }}></div>
          </div>
        </div>

        <div className="contrib-bar-wrap">
          <div className="contrib-header">
            <span>Study Hours & Workload (15%)</span>
            <span>{featureContributions.studyHabitsWeight || 15}% weight</span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: '50%', background: '#6366f1' }}></div>
          </div>
        </div>
      </div>

      {/* Tailored AI Action Items */}
      <div>
        <div className="section-subtitle">
          <Award size={14} />
          <span>Tailored Intervention Roadmap</span>
        </div>
        <ul className="action-items-list">
          {actionItems && actionItems.length > 0 ? (
            actionItems.map((item, idx) => (
              <li key={idx} className="action-item">
                <CheckCircle2 size={16} className="action-item-icon" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="action-item">
              <CheckCircle2 size={16} className="action-item-icon" />
              <span>Continue current cadence and prepare for honors assessments.</span>
            </li>
          )}
        </ul>
      </div>

      {createdAt && (
        <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
          <Clock size={12} />
          <span>Evaluated on {new Date(createdAt).toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}
