import React, { useState } from 'react';
import { X, Check, UserPlus, Sparkles } from 'lucide-react';

export default function AddStudentModal({ isOpen, onClose, onAddStudent }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: 'Computer Science',
    gender: 'Male',
    age: 20,
    generateInitialPrediction: true,
    studyHoursPerWeek: 16,
    attendanceRate: 88,
    assignmentScore: 82,
    midtermExam: 78,
    pastFailures: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent(formData);
    onClose();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      department: 'Computer Science',
      gender: 'Male',
      age: 20,
      generateInitialPrediction: true,
      studyHoursPerWeek: 16,
      attendanceRate: 88,
      assignmentScore: 82,
      midtermExam: 78,
      pastFailures: 0,
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      overflowY: 'auto',
    }}>
      <div className="glass-card" style={{ maxWidth: '540px', width: '100%', padding: '2rem', background: '#111827', border: '1px solid var(--border-hover)', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <UserPlus size={22} style={{ color: 'var(--accent-primary)' }} />
            <h2 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 800 }}>Register New Student</h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {/* Names */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label" htmlFor="modal-first-name">First Name</label>
              <input
                id="modal-first-name"
                type="text"
                required
                className="text-input"
                placeholder="e.g. Liam"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="modal-last-name">Last Name</label>
              <input
                id="modal-last-name"
                type="text"
                required
                className="text-input"
                placeholder="e.g. Vance"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label className="input-label" htmlFor="modal-email">Email Address</label>
            <input
              id="modal-email"
              type="email"
              required
              className="text-input"
              placeholder="e.g. liam.v@university.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Department */}
          <div className="input-group">
            <label className="input-label" htmlFor="modal-department">Academic Department</label>
            <select
              id="modal-department"
              className="text-select"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Data Science">Data Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
            </select>
          </div>

          {/* Gender & Age */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label" htmlFor="modal-gender">Gender</label>
              <select
                id="modal-gender"
                className="text-select"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="modal-age">Age</label>
              <input
                id="modal-age"
                type="number"
                min="16"
                max="65"
                className="text-input"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value, 10) || 20 })}
              />
            </div>
          </div>

          {/* Optional Baseline Evaluation Section */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginTop: '0.5rem',
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', marginBottom: formData.generateInitialPrediction ? '0.85rem' : 0 }}>
              <input
                type="checkbox"
                checked={formData.generateInitialPrediction}
                onChange={(e) => setFormData({ ...formData, generateInitialPrediction: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)' }}
              />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
                Generate Initial Performance Forecast Immediately
              </span>
            </label>

            {formData.generateInitialPrediction && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Midterm Exam (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="num-input"
                    style={{ width: '100%', textAlign: 'left', padding: '0.45rem 0.75rem' }}
                    value={formData.midtermExam}
                    onChange={(e) => setFormData({ ...formData, midtermExam: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Assignments (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="num-input"
                    style={{ width: '100%', textAlign: 'left', padding: '0.45rem 0.75rem' }}
                    value={formData.assignmentScore}
                    onChange={(e) => setFormData({ ...formData, assignmentScore: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Attendance Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="num-input"
                    style={{ width: '100%', textAlign: 'left', padding: '0.45rem 0.75rem' }}
                    value={formData.attendanceRate}
                    onChange={(e) => setFormData({ ...formData, attendanceRate: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Study Hours/wk</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    className="num-input"
                    style={{ width: '100%', textAlign: 'left', padding: '0.45rem 0.75rem' }}
                    value={formData.studyHoursPerWeek}
                    onChange={(e) => setFormData({ ...formData, studyHoursPerWeek: Number(e.target.value) })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.75rem' }}>
            <button type="button" onClick={onClose} className="nav-btn" style={{ flex: 1, justifyContent: 'center' }}>
              Cancel
            </button>
            <button id="modal-submit-student" type="submit" className="btn-primary" style={{ flex: 1 }}>
              <Check size={18} />
              <span>Save &amp; Sync Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
