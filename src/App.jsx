import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PredictorForm from './components/PredictorForm';
import PredictionResultCard from './components/PredictionResultCard';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import ModelInsightsPage from './pages/ModelInsightsPage';
import AddStudentModal from './components/AddStudentModal';
import { apiService } from './services/api';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [summary, setSummary] = useState(null);
  const [students, setStudents] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [currentPrediction, setCurrentPrediction] = useState(null);
  const [predictLoading, setPredictLoading] = useState(false);
  const [preselectedStudentId, setPreselectedStudentId] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Load initial data
  const loadData = async () => {
    try {
      const summaryRes = await apiService.getDashboardSummary();
      setIsLiveBackend(summaryRes.isLive);
      if (summaryRes.data) {
        setSummary(summaryRes.data);
        if (summaryRes.data.recentPredictions) {
          setPredictions(summaryRes.data.recentPredictions);
          if (!currentPrediction && summaryRes.data.recentPredictions.length > 0) {
            setCurrentPrediction(summaryRes.data.recentPredictions[0]);
          }
        }
      }

      const studentsRes = await apiService.getAllStudents();
      if (studentsRes.data) {
        setStudents(studentsRes.data);
      }
    } catch (err) {
      console.error('Data loading error:', err);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const handlePredict = async (formData) => {
    setPredictLoading(true);
    try {
      const res = await apiService.createPrediction(formData);
      setCurrentPrediction(res.data);
      setPredictions(prev => [res.data, ...prev.filter(p => p.id !== res.data.id)]);
      showToast(`Prediction generated for ${res.data.studentName}: Grade ${res.data.predictedGrade} (${res.data.predictedScore}%)`);
      if (summary) {
        setSummary(prev => ({
          ...prev,
          totalPredictions: (prev.totalPredictions || 0) + 1,
        }));
      }
    } catch (err) {
      console.error('Prediction error:', err);
      showToast('Error generating prediction. Check inputs.');
    } finally {
      setPredictLoading(false);
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      const res = await apiService.createStudent({
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        department: studentData.department,
        gender: studentData.gender,
        age: studentData.age,
      });
      const newStudent = res.data;
      setStudents(prev => [newStudent, ...prev.filter(s => s.id !== newStudent.id)]);

      // If initial baseline prediction was requested, create it and register in forecasts
      if (studentData.generateInitialPrediction) {
        const predRes = await apiService.createPrediction({
          studentId: newStudent.id,
          studentName: `${newStudent.firstName} ${newStudent.lastName}`,
          studyHoursPerWeek: Number(studentData.studyHoursPerWeek) || 16,
          attendanceRate: Number(studentData.attendanceRate) || 85,
          assignmentScore: Number(studentData.assignmentScore) || 80,
          midtermExam: Number(studentData.midtermExam) || 75,
          pastFailures: Number(studentData.pastFailures) || 0,
        });
        setCurrentPrediction(predRes.data);
        setPredictions(prev => [predRes.data, ...prev.filter(p => p.id !== predRes.data.id)]);
        showToast(`Student ${newStudent.firstName} ${newStudent.lastName} saved & forecasted (${predRes.data.predictedScore}%) on Dashboard!`);
      } else {
        showToast(`Student ${newStudent.firstName} ${newStudent.lastName} registered and saved in Dashboard & Directory!`);
      }

      if (summary) {
        setSummary(prev => ({
          ...prev,
          totalStudents: (prev.totalStudents || 0) + 1,
          totalPredictions: studentData.generateInitialPrediction ? (prev.totalPredictions || 0) + 1 : (prev.totalPredictions || 0),
        }));
      }
    } catch (err) {
      console.error('Add student error:', err);
      showToast('Error creating student.');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await apiService.deleteStudent(studentId);
      setStudents(prev => prev.filter(s => s.id !== studentId));
      showToast('Student successfully deleted from directory and dashboard.');
      if (summary) {
        setSummary(prev => ({
          ...prev,
          totalStudents: Math.max(0, (prev.totalStudents || 1) - 1),
        }));
      }
    } catch (err) {
      console.error('Delete student error:', err);
      showToast('Error deleting student.');
    }
  };

  const handlePredictForStudent = (studentId) => {
    setPreselectedStudentId(studentId);
    setActiveTab('predictor');
  };

  const handleSelectPrediction = (p) => {
    setCurrentPrediction(p);
    setActiveTab('predictor');
  };

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLiveBackend={isLiveBackend}
      />

      {/* Main View Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard
            summary={summary}
            predictions={predictions}
            students={students}
            onSelectPrediction={handleSelectPrediction}
            onNavigatePredictor={() => setActiveTab('predictor')}
            onPredictForStudent={handlePredictForStudent}
            onDeleteStudent={handleDeleteStudent}
            onOpenAddStudentModal={() => setShowAddModal(true)}
          />
        )}

        {activeTab === 'predictor' && (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                AI Academic Performance Predictor
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Simulate examination outcomes and forecast letter grades using multi-factor predictive modeling.
              </p>
            </div>

            <div className="predictor-layout">
              <PredictorForm
                students={students}
                onPredict={handlePredict}
                loading={predictLoading}
                preselectedStudentId={preselectedStudentId}
              />
              <PredictionResultCard prediction={currentPrediction} />
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <StudentsPage
            students={students}
            onDeleteStudent={handleDeleteStudent}
            onPredictForStudent={handlePredictForStudent}
            onOpenAddStudentModal={() => setShowAddModal(true)}
          />
        )}

        {activeTab === 'insights' && (
          <ModelInsightsPage />
        )}
      </main>

      {/* Shared Global Add Student Modal */}
      <AddStudentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddStudent={handleAddStudent}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="toast-msg">
          <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
