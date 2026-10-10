import React, { useState } from 'react';
import StatsCards from '../components/StatsCards';
import { 
  BarChart3, 
  Search, 
  AlertTriangle, 
  Sparkles,
  ChevronRight,
  Users,
  UserPlus,
  Trash2,
  Mail,
  Building2,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function Dashboard({ 
  summary, 
  predictions, 
  students = [], 
  onSelectPrediction, 
  onNavigatePredictor,
  onPredictForStudent,
  onDeleteStudent,
  onOpenAddStudentModal
}) {
  const [activeTableTab, setActiveTableTab] = useState('students'); // 'students' or 'predictions'
  const [searchTerm, setSearchTerm] = useState('');

  const recentList = (predictions && predictions.length > 0)
    ? predictions
    : (summary?.recentPredictions || []);

  const filteredPredictions = recentList.filter(p => 
    (p.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.predictedGrade || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.riskLevel || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = (students || []).filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.studentCode || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.department || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate grade distribution counts
  const gradeCounts = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  recentList.forEach(p => {
    if (gradeCounts[p.predictedGrade] !== undefined) {
      gradeCounts[p.predictedGrade]++;
    }
  });

  const totalEvaluations = recentList.length || 1;

  // Find latest prediction for each student
  const getStudentLatestPrediction = (studentId, studentName) => {
    return recentList.find(p => 
      (studentId && p.studentId === studentId) || 
      (studentName && (p.studentName || '').toLowerCase() === studentName.toLowerCase())
    );
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            Academic Performance Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Live machine learning forecasts, student cohort tracking, and early risk intervention.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            id="dashboard-cta-add-student"
            className="nav-btn"
            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', color: '#fff', padding: '0.75rem 1.25rem' }}
            onClick={onOpenAddStudentModal}
          >
            <UserPlus size={18} style={{ color: 'var(--accent-cyan)' }} />
            <span>+ Add Student</span>
          </button>

          <button 
            id="dashboard-cta-predict"
            className="btn-primary" 
            style={{ width: 'auto', padding: '0.75rem 1.4rem' }}
            onClick={onNavigatePredictor}
          >
            <Sparkles size={18} />
            <span>Launch Predictor</span>
          </button>
        </div>
      </div>

      {/* Cohort Metric Cards */}
      <StatsCards summary={{
        ...summary,
        totalStudents: students.length || summary?.totalStudents || 0,
        totalPredictions: recentList.length || summary?.totalPredictions || 0,
      }} />

      {/* Analytics Visualization Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Grade Distribution Visualizer */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={20} style={{ color: 'var(--accent-cyan)' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Grade Distribution Projection</h3>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
              {recentList.length} total evaluations
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {[
              { grade: 'A', label: 'Grade A (85-100%)', count: gradeCounts.A, color: 'var(--grad-emerald)' },
              { grade: 'B', label: 'Grade B (70-84%)', count: gradeCounts.B, color: 'var(--grad-primary)' },
              { grade: 'C', label: 'Grade C (55-69%)', count: gradeCounts.C, color: 'var(--grad-amber)' },
              { grade: 'D', label: 'Grade D (45-54%)', count: gradeCounts.D, color: 'linear-gradient(135deg, #f97316, #ea580c)' },
              { grade: 'F', label: 'Grade F (<45%)', count: gradeCounts.F, color: 'var(--grad-rose)' },
            ].map(item => {
              const pct = Math.round((item.count / totalEvaluations) * 100);
              return (
                <div key={item.grade}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600, color: '#fff' }}>{item.label}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{item.count} students ({pct}%)</span>
                  </div>
                  <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: item.color, borderRadius: '4px', transition: 'width 0.8s ease' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Early Warning & Risk Analysis */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <AlertTriangle size={20} style={{ color: 'var(--accent-rose)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Risk Factor Monitoring</h3>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
            Students flagged as <strong style={{ color: 'var(--accent-rose)' }}>HIGH RISK</strong> exhibit attendance &lt;65%, 2+ prior failures, or forecasted scores &lt;50%.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{
              background: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-rose)' }}>Mandatory Tutoring</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Targeting failing midterms</div>
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{summary?.highRiskCount || 1} candidates</span>
            </div>

            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-amber)' }}>Attendance Intervention</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Attendance rate 65% - 79%</div>
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{summary?.mediumRiskCount || 1} candidates</span>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>Honors Track</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>GPA &gt; 3.5 &amp; Grade A pace</div>
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{summary?.lowRiskCount || 2} candidates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Synchronized Dashboard Tables Section */}
      <div className="glass-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Table Selector Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <button
              id="dashboard-tab-students-roster"
              className={`nav-btn ${activeTableTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTableTab('students')}
              style={{ fontSize: '0.88rem', padding: '0.5rem 1rem' }}
            >
              <Users size={16} />
              <span>Enrolled Students Roster ({students.length})</span>
            </button>

            <button
              id="dashboard-tab-predictions-log"
              className={`nav-btn ${activeTableTab === 'predictions' ? 'active' : ''}`}
              onClick={() => setActiveTableTab('predictions')}
              style={{ fontSize: '0.88rem', padding: '0.5rem 1rem' }}
            >
              <FileText size={16} />
              <span>Recent AI Forecasts ({recentList.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.4rem 0.85rem', width: '280px' }}>
            <Search size={16} style={{ color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder={activeTableTab === 'students' ? "Search student, email, dept..." : "Search student, grade, risk..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* View 1: Enrolled Students Roster Table (Shows newly added students directly on dashboard) */}
        {activeTableTab === 'students' && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Code</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Gender / Age</th>
                  <th>Current Forecast</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                      No students found matching your search. Click <strong>+ Add Student</strong> to register one!
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map(student => {
                    const studentPred = getStudentLatestPrediction(student.id, `${student.firstName} ${student.lastName}`);
                    return (
                      <tr key={student.id}>
                        <td>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '0.2rem 0.55rem', borderRadius: '4px', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
                            {student.studentCode || `STU-100${student.id}`}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontWeight: 700, fontSize: '0.8rem' }}>
                              {student.firstName ? student.firstName[0] : 'S'}
                            </div>
                            <span style={{ fontWeight: 600, color: '#fff' }}>
                              {student.firstName} {student.lastName}
                            </span>
                          </div>
                        </td>
                        <td style={{ color: 'var(--text-muted)' }}>{student.email}</td>
                        <td>
                          <span style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.2rem 0.55rem', borderRadius: '4px', fontSize: '0.82rem' }}>
                            {student.department}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>
                          {student.gender}, {student.age} yrs
                        </td>
                        <td>
                          {studentPred ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              <span className={`grade-pill grade-${studentPred.predictedGrade}`} style={{ width: '24px', height: '24px', fontSize: '0.75rem' }}>
                                {studentPred.predictedGrade}
                              </span>
                              <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                                {studentPred.predictedScore}%
                              </span>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', background: 'rgba(245, 158, 11, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                              Awaiting Forecast
                            </span>
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <button
                              onClick={() => onPredictForStudent(student.id)}
                              style={{
                                background: 'rgba(99, 102, 241, 0.1)',
                                border: '1px solid rgba(99, 102, 241, 0.3)',
                                color: 'var(--accent-primary)',
                                padding: '0.35rem 0.65rem',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                fontSize: '0.78rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                              }}
                              title="Run Performance Predictor for this student"
                            >
                              <Sparkles size={13} />
                              <span>Predict</span>
                            </button>

                            <button
                              onClick={() => onDeleteStudent(student.id)}
                              style={{
                                background: 'rgba(244, 63, 94, 0.1)',
                                border: '1px solid rgba(244, 63, 94, 0.25)',
                                color: 'var(--accent-rose)',
                                padding: '0.35rem 0.5rem',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                fontSize: '0.78rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Delete Student"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* View 2: Recent AI Forecasts Table */}
        {activeTableTab === 'predictions' && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Midterm</th>
                  <th>Assignments</th>
                  <th>Attendance</th>
                  <th>Study Time</th>
                  <th>Forecast Score</th>
                  <th>Grade</th>
                  <th>Risk Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPredictions.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{p.studentName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {p.pastFailures > 0 ? `${p.pastFailures} prior failures` : 'Clean academic record'}
                      </div>
                    </td>
                    <td>{p.midtermExam}%</td>
                    <td>{p.assignmentScore}%</td>
                    <td>
                      <span style={{ color: p.attendanceRate < 75 ? 'var(--accent-rose)' : 'inherit' }}>
                        {p.attendanceRate}%
                      </span>
                    </td>
                    <td>{p.studyHoursPerWeek} hrs/wk</td>
                    <td>
                      <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        {p.predictedScore}%
                      </span>
                    </td>
                    <td>
                      <span className={`grade-pill grade-${p.predictedGrade}`}>
                        {p.predictedGrade}
                      </span>
                    </td>
                    <td>
                      <span className={`risk-banner risk-${p.riskLevel}`} style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', margin: 0 }}>
                        {p.riskLevel}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => onSelectPrediction(p)}
                        style={{
                          background: 'rgba(99, 102, 241, 0.1)',
                          border: '1px solid rgba(99, 102, 241, 0.25)',
                          color: 'var(--accent-primary)',
                          padding: '0.4rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <span>Inspect</span>
                        <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
