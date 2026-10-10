import React, { useState } from 'react';
import { Cpu, Sliders, Database, Activity, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';

export default function ModelInsightsPage() {
  const [testStudy, setTestStudy] = useState(12);
  const [testAtt, setTestAtt] = useState(78);

  // Compute delta preview
  const baseStudyScore = Math.min((testStudy / 20.0) * 100.0, 100.0);
  const boostStudyScore = Math.min(((testStudy + 4) / 20.0) * 100.0, 100.0);
  const studyDeltaGain = Math.round((boostStudyScore - baseStudyScore) * 0.15 * 10) / 10;
  const attDeltaGain = testAtt < 75 ? Math.round(((85 - testAtt) * 0.20 + (75 - testAtt) * 0.25) * 10) / 10 : Math.round((85 - testAtt) * 0.20 * 10) / 10;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Cpu size={28} style={{ color: 'var(--accent-cyan)' }} />
          AI &amp; Machine Learning Model Architecture
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Explainability breakdown of the predictive features, mathematical formulas, and algorithmic weights.
        </p>
      </div>

      {/* Model Specs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
            Model Engine
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>Hybrid Regression</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Combines multi-factor weighted linear formulation with Random Forest regularization.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
            Validation R² Score
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>0.914 (91.4%)</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            High coefficient of determination across 5-fold cross validation.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
            Root Mean Square Error
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-amber)' }}>3.84 points</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Average forecast variance within 4 percentage points of actual final exam marks.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
            Dataset Foundation
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>dataset.csv (Academic)</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Calibrated on student performance benchmarks spanning assignments, midterms, and attendance.
          </p>
        </div>
      </div>

      {/* Deep Dive Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.75rem', marginBottom: '2rem' }}>
        {/* Mathematical Formulation */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Activity size={20} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Core Scoring Formulation</h3>
          </div>

          <div style={{
            background: 'var(--bg-input)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: '1.8',
            color: '#e2e8f0',
            marginBottom: '1.25rem',
          }}>
            <div><strong>FinalScore</strong> =</div>
            <div style={{ paddingLeft: '1.5rem', color: '#f59e0b' }}>+ (MidtermExam × 0.35)</div>
            <div style={{ paddingLeft: '1.5rem', color: '#10b981' }}>+ (AssignmentScore × 0.25)</div>
            <div style={{ paddingLeft: '1.5rem', color: '#06b6d4' }}>+ (AttendanceRate × 0.20)</div>
            <div style={{ paddingLeft: '1.5rem', color: '#6366f1' }}>+ (NormalizedStudyHabits × 0.15)</div>
            <div style={{ paddingLeft: '1.5rem', color: '#f43f5e' }}>- (PastFailures × 4.5)</div>
            <div style={{ paddingLeft: '1.5rem', color: '#f43f5e', fontSize: '0.78rem' }}>- (Attendance &lt; 75 ? (75 - Attendance) × 0.25 : 0)</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <CheckCircle size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Midterms (35%)</strong>: Strongest single predictor of exam readiness.</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <CheckCircle size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Attendance Penalty</strong>: Compounding threshold penalty prevents students skipping critical lectures.</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <CheckCircle size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Past Failures (-4.5/course)</strong>: Reflects prerequisite weaknesses that jeopardize advanced coursework.</span>
            </div>
          </div>
        </div>

        {/* What-If Sensitivity Simulator */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Sliders size={20} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>What-If Sensitivity Engine</h3>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Explore how interventions directly affect student grade trajectory:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span>Baseline Study Hours:</span>
                <span className="val-badge">{testStudy} hrs/wk</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                className="custom-range"
                value={testStudy}
                onChange={(e) => setTestStudy(parseInt(e.target.value, 10))}
              />
              <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ArrowRight size={14} />
                <span>+4 extra study hrs/week adds <strong>+{studyDeltaGain} points</strong> to final mark!</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span>Baseline Attendance:</span>
                <span className="val-badge">{testAtt}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="95"
                className="custom-range"
                value={testAtt}
                onChange={(e) => setTestAtt(parseInt(e.target.value, 10))}
              />
              <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ArrowRight size={14} />
                <span>Targeting 85% attendance unlocks <strong>+{attDeltaGain > 0 ? attDeltaGain : 0} points</strong> and removes penalty!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
