import React, { useState } from 'react';
import { Users, UserPlus, Search, Sparkles, Mail, Building2, Trash2, AlertTriangle } from 'lucide-react';

export default function StudentsPage({ students, onDeleteStudent, onPredictForStudent, onOpenAddStudentModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [studentToDelete, setStudentToDelete] = useState(null);

  const departments = ['ALL', ...Array.from(new Set(students.map(s => s.department).filter(Boolean)))];

  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.studentCode || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = departmentFilter === 'ALL' || s.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const confirmDelete = () => {
    if (studentToDelete) {
      onDeleteStudent(studentToDelete.id);
      setStudentToDelete(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Users size={28} style={{ color: 'var(--accent-primary)' }} />
            Enrolled Student Directory
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Manage student academic profiles, register new enrollments, or remove past records.
          </p>
        </div>

        <button 
          id="btn-open-add-student"
          className="btn-primary" 
          style={{ width: 'auto', padding: '0.75rem 1.4rem' }}
          onClick={onOpenAddStudentModal}
        >
          <UserPlus size={18} />
          <span>Register New Student</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search student code, name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Department:</span>
          <select
            className="text-select"
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredStudents.map(student => (
          <div key={student.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                    {student.studentCode || `STU-100${student.id}`}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700, marginTop: '0.4rem' }}>
                    {student.firstName} {student.lastName}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    id={`btn-delete-student-${student.id}`}
                    onClick={() => setStudentToDelete(student)}
                    title={`Delete student ${student.firstName} ${student.lastName}`}
                    style={{
                      background: 'rgba(244, 63, 94, 0.1)',
                      border: '1px solid rgba(244, 63, 94, 0.25)',
                      color: 'var(--accent-rose)',
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(244, 63, 94, 0.25)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)'}
                  >
                    <Trash2 size={16} />
                  </button>

                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontWeight: 700 }}>
                    {student.firstName ? student.firstName[0] : 'S'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} style={{ color: 'var(--text-dim)' }} />
                  <span>{student.email || `${student.firstName.toLowerCase()}@university.edu`}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building2 size={14} style={{ color: 'var(--text-dim)' }} />
                  <span>{student.department || 'General Studies'}</span>
                </div>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ padding: '0.65rem 1rem', fontSize: '0.85rem' }}
              onClick={() => onPredictForStudent(student.id)}
            >
              <Sparkles size={16} />
              <span>Predict Academic Grade</span>
            </button>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {studentToDelete && (
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
        }}>
          <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '2rem', background: '#111827', border: '1px solid rgba(244, 63, 94, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--accent-rose)' }}>
              <AlertTriangle size={24} />
              <h2 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 800 }}>Confirm Student Deletion</h2>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Are you sure you want to delete <strong style={{ color: '#fff' }}>{studentToDelete.firstName} {studentToDelete.lastName}</strong> ({studentToDelete.studentCode || `STU-100${studentToDelete.id}`})? This action cannot be undone.
            </p>

            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <button
                type="button"
                onClick={() => setStudentToDelete(null)}
                className="nav-btn"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Cancel
              </button>
              <button
                id="btn-confirm-delete-student"
                type="button"
                onClick={confirmDelete}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--grad-rose)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <Trash2 size={16} />
                <span>Delete Student</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
