import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Calendar, CheckSquare, Award, AlertCircle, Wand2, RefreshCw } from 'lucide-react';

export default function PredictorForm({ students, onPredict, loading, preselectedStudentId }) {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: 'Alex Johnson',
    studyHoursPerWeek: 16,
    attendanceRate: 88,
    assignmentScore: 82,
    midtermExam: 78,
    pastFailures: 0,
  });

  const [liveEstimatedScore, setLiveEstimatedScore] = useState(80.5);

  useEffect(() => {
    if (preselectedStudentId && students && students.length > 0) {
      const match = students.find(s => String(s.id) === String(preselectedStudentId));
      if (match) {
        setFormData(prev => ({
          ...prev,
          studentId: match.id,
          studentName: `${match.firstName} ${match.lastName}`,
        }));
      }
    }
  }, [preselectedStudentId, students]);

  // Calculate live estimate instantly on change
  useEffect(() => {
    const study = parseFloat(formData.studyHoursPerWeek) || 0;
    const att = parseFloat(formData.attendanceRate) || 0;
    const assign = parseFloat(formData.assignmentScore) || 0;
    const mid = parseFloat(formData.midtermExam) || 0;
    const fail = parseInt(formData.pastFailures, 10) || 0;

    const studyScore = Math.min((study / 20.0) * 100.0, 100.0);
    let raw = (mid * 0.35) + (assign * 0.25) + (att * 0.20) + (studyScore * 0.15) - (fail * 4.5);
    if (att < 75.0) {
      raw -= (75.0 - att) * 0.25;
    }
    const score = Math.max(0.0, Math.min(100.0, Math.round(raw * 10) / 10));
    setLiveEstimatedScore(score);
  }, [formData]);

  const handleStudentChange = (e) => {
    const val = e.target.value;
    if (val === 'CUSTOM') {
      setFormData(prev => ({ ...prev, studentId: '', studentName: '' }));
    } else {
      const st = students.find(s => String(s.id) === String(val));
      if (st) {
        setFormData(prev => ({
          ...prev,
          studentId: st.id,
          studentName: `${st.firstName} ${st.lastName}`,
        }));
      }
    }
  };

  const applyPreset = (type) => {
    if (type === 'high') {
      setFormData(prev => ({
        ...prev,
        studyHoursPerWeek: 24,
        attendanceRate: 96,
        assignmentScore: 94,
        midtermExam: 92,
        pastFailures: 0,
      }));
    } else if (type === 'average') {
      setFormData(prev => ({
        ...prev,
        studyHoursPerWeek: 14,
        attendanceRate: 84,
        assignmentScore: 78,
        midtermExam: 72,
        pastFailures: 0,
      }));
    } else if (type === 'risk') {
      setFormData(prev => ({
        ...prev,
        studyHoursPerWeek: 5,
        attendanceRate: 62,
        assignmentScore: 50,
        midtermExam: 46,
        pastFailures: 2,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict({
      ...formData,
      studyHoursPerWeek: Number(formData.studyHoursPerWeek),
      attendanceRate: Number(formData.attendanceRate),
      assignmentScore: Number(formData.assignmentScore),
      midtermExam: Number(formData.midtermExam),
      pastFailures: Number(formData.pastFailures),
    });
  };

  return (
    <div className="glass-card form-card">
      <div className="form-header">
        <h2 className="form-title">
          <Sparkles size={22} style={{ color: '#6366f1' }} />
          Performance Parameter Input
        </h2>
        <p className="form-desc">
          Adjust the academic metrics below to simulate final score projection and early risk intervention.
        </p>
      </div>

      {/* Preset Quick Chips */}
      <div className="presets-row">
        <span className="presets-label">Quick Scenarios:</span>
        <button type="button" className="preset-chip" onClick={() => applyPreset('high')}>
          🌟 High Achiever
        </button>
        <button type="button" className="preset-chip" onClick={() => applyPreset('average')}>
          ⚖️ Average Track
        </button>
        <button type="button" className="preset-chip" onClick={() => applyPreset('risk')}>
          🚨 Academic Warning
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        {/* Student Selector */}
        <div className="input-group">
          <label className="input-label" htmlFor="student-select">
            Candidate Student
          </label>
          <select
            id="student-select"
            className="text-select"
            value={formData.studentId || (formData.studentName ? 'CUSTOM' : '')}
            onChange={handleStudentChange}
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName} ({s.studentCode} - {s.department})
              </option>
            ))}
            <option value="CUSTOM">+ Custom / Anonymous Student</option>
          </select>
        </div>

        {(!formData.studentId || formData.studentName !== '') && (
          <div className="input-group">
            <label className="input-label" htmlFor="custom-student-name">
              Student Name
            </label>
            <input
              id="custom-student-name"
              type="text"
              className="text-input"
              value={formData.studentName}
              placeholder="e.g. Jordan Miller"
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              required
            />
          </div>
        )}

        {/* 1. Study Hours */}
        <div className="input-group">
          <div className="label-row">
            <label className="input-label" htmlFor="input-study-hours">
              <BookOpen size={16} style={{ color: '#6366f1' }} />
              Independent Study (hrs / week)
            </label>
            <span className="val-badge">{formData.studyHoursPerWeek} hrs</span>
          </div>
          <div className="slider-container">
            <input
              id="input-study-hours"
              type="range"
              min="0"
              max="40"
              step="1"
              className="custom-range"
              value={formData.studyHoursPerWeek}
              onChange={(e) => setFormData({ ...formData, studyHoursPerWeek: e.target.value })}
            />
            <input
              type="number"
              min="0"
              max="40"
              className="num-input"
              value={formData.studyHoursPerWeek}
              onChange={(e) => setFormData({ ...formData, studyHoursPerWeek: e.target.value })}
            />
          </div>
          <span className="input-subtext">Weight: 15% (Normalized against 20 hrs baseline)</span>
        </div>

        {/* 2. Attendance Rate */}
        <div className="input-group">
          <div className="label-row">
            <label className="input-label" htmlFor="input-attendance">
              <Calendar size={16} style={{ color: '#06b6d4' }} />
              Class Attendance Rate (%)
            </label>
            <span className="val-badge" style={{ color: formData.attendanceRate < 75 ? '#f43f5e' : '#06b6d4' }}>
              {formData.attendanceRate}%
            </span>
          </div>
          <div className="slider-container">
            <input
              id="input-attendance"
              type="range"
              min="0"
              max="100"
              step="1"
              className="custom-range"
              value={formData.attendanceRate}
              onChange={(e) => setFormData({ ...formData, attendanceRate: e.target.value })}
            />
            <input
              type="number"
              min="0"
              max="100"
              className="num-input"
              value={formData.attendanceRate}
              onChange={(e) => setFormData({ ...formData, attendanceRate: e.target.value })}
            />
          </div>
          <span className="input-subtext">
            Weight: 20% {formData.attendanceRate < 75 ? '⚠️ <75% incurs progressive penalty' : '✅ Complies with standard policy'}
          </span>
        </div>

        {/* 3. Assignment Score */}
        <div className="input-group">
          <div className="label-row">
            <label className="input-label" htmlFor="input-assignments">
              <CheckSquare size={16} style={{ color: '#10b981' }} />
              Assignments & Lab Performance (%)
            </label>
            <span className="val-badge" style={{ color: '#10b981' }}>{formData.assignmentScore}%</span>
          </div>
          <div className="slider-container">
            <input
              id="input-assignments"
              type="range"
              min="0"
              max="100"
              step="1"
              className="custom-range"
              value={formData.assignmentScore}
              onChange={(e) => setFormData({ ...formData, assignmentScore: e.target.value })}
            />
            <input
              type="number"
              min="0"
              max="100"
              className="num-input"
              value={formData.assignmentScore}
              onChange={(e) => setFormData({ ...formData, assignmentScore: e.target.value })}
            />
          </div>
          <span className="input-subtext">Weight: 25% continuous assessment</span>
        </div>

        {/* 4. Midterm Exam Score */}
        <div className="input-group">
          <div className="label-row">
            <label className="input-label" htmlFor="input-midterm">
              <Award size={16} style={{ color: '#f59e0b' }} />
              Midterm Exam Score (%)
            </label>
            <span className="val-badge" style={{ color: '#f59e0b' }}>{formData.midtermExam}%</span>
          </div>
          <div className="slider-container">
            <input
              id="input-midterm"
              type="range"
              min="0"
              max="100"
              step="1"
              className="custom-range"
              value={formData.midtermExam}
              onChange={(e) => setFormData({ ...formData, midtermExam: e.target.value })}
            />
            <input
              type="number"
              min="0"
              max="100"
              className="num-input"
              value={formData.midtermExam}
              onChange={(e) => setFormData({ ...formData, midtermExam: e.target.value })}
            />
          </div>
          <span className="input-subtext">Primary predictor weight: 35%</span>
        </div>

        {/* 5. Past Failures */}
        <div className="input-group">
          <div className="label-row">
            <label className="input-label" htmlFor="input-failures">
              <AlertCircle size={16} style={{ color: '#f43f5e' }} />
              Historical Course Failures
            </label>
            <span className="val-badge" style={{ color: formData.pastFailures > 0 ? '#f43f5e' : '#94a3b8' }}>
              {formData.pastFailures} courses
            </span>
          </div>
          <div className="slider-container">
            <input
              id="input-failures"
              type="range"
              min="0"
              max="5"
              step="1"
              className="custom-range"
              value={formData.pastFailures}
              onChange={(e) => setFormData({ ...formData, pastFailures: e.target.value })}
            />
            <input
              type="number"
              min="0"
              max="5"
              className="num-input"
              value={formData.pastFailures}
              onChange={(e) => setFormData({ ...formData, pastFailures: e.target.value })}
            />
          </div>
          <span className="input-subtext">Penalty: -4.5 points per prior failure</span>
        </div>

        {/* Live Score Preview Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.15rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Wand2 size={18} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Real-Time Live Estimate:</span>
          </div>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: liveEstimatedScore >= 75 ? 'var(--accent-emerald)' : liveEstimatedScore >= 50 ? 'var(--accent-amber)' : 'var(--accent-rose)',
          }}>
            {liveEstimatedScore}%
          </span>
        </div>

        {/* Submit */}
        <button
          id="btn-run-prediction"
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              <span>Analyzing Academic Trajectory...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Generate Official AI Prediction</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
