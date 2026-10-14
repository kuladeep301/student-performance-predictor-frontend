import axios from 'axios';

// Resolve API base URL: Supports Vercel environment variable VITE_API_BASE_URL
const resolveApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  }
  if (import.meta.env.DEV) {
    return 'http://localhost:8080/api';
  }
  // Production fallback on Vercel if no external API URL is specified
  return '/api';
};

const API_BASE_URL = resolveApiBaseUrl();

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const STORAGE_KEY_STUDENTS = 'edupredict_students_v2';
const STORAGE_KEY_PREDICTIONS = 'edupredict_predictions_v2';

const defaultStudents = [
  { id: 1, studentCode: 'STU-1001', firstName: 'Alex', lastName: 'Johnson', email: 'alex.j@university.edu', gender: 'Male', age: 20, department: 'Computer Science' },
  { id: 2, studentCode: 'STU-1002', firstName: 'Sophia', lastName: 'Chen', email: 'sophia.c@university.edu', gender: 'Female', age: 21, department: 'Data Science' },
  { id: 3, studentCode: 'STU-1003', firstName: 'Marcus', lastName: 'Taylor', email: 'marcus.t@university.edu', gender: 'Male', age: 19, department: 'Information Technology' },
  { id: 4, studentCode: 'STU-1004', firstName: 'Elena', lastName: 'Rodriguez', email: 'elena.r@university.edu', gender: 'Female', age: 22, department: 'Software Engineering' },
  { id: 5, studentCode: 'STU-1005', firstName: 'David', lastName: 'Kim', email: 'david.k@university.edu', gender: 'Male', age: 20, department: 'Computer Science' },
];

const defaultPredictions = [
  {
    id: 101,
    studentId: 1,
    studentName: 'Alex Johnson',
    studyHoursPerWeek: 18.0,
    attendanceRate: 92.0,
    pastFailures: 0,
    assignmentScore: 88.0,
    midtermExam: 85.0,
    predictedScore: 88.6,
    predictedGrade: 'A',
    riskLevel: 'LOW',
    confidenceScore: 94.2,
    recommendations: 'Outstanding progress! Maintain current study habits and consider peer mentorship | Prepare advanced study topics for honors or distinction opportunities',
    actionItems: [
      'Maintain steady 18 hrs/week independent study habit',
      'Excellent 92% attendance rate prevents grade penalties',
      'Eligible for peer tutor and honors mentorship program'
    ],
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    featureContributions: { midtermWeight: 35.0, assignmentWeight: 25.0, attendanceWeight: 20.0, studyHabitsWeight: 15.0, failurePenaltyDeductions: 0 }
  },
  {
    id: 102,
    studentId: 2,
    studentName: 'Sophia Chen',
    studyHoursPerWeek: 22.0,
    attendanceRate: 97.0,
    pastFailures: 0,
    assignmentScore: 95.0,
    midtermExam: 92.0,
    predictedScore: 94.8,
    predictedGrade: 'A',
    riskLevel: 'LOW',
    confidenceScore: 96.5,
    recommendations: 'Outstanding progress! Maintain current study habits and consider peer mentorship',
    actionItems: [
      'Top decile performance across assignments and exams',
      'Strong candidate for department research assistantship',
      'Maintain balanced pacing heading into finals'
    ],
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    featureContributions: { midtermWeight: 35.0, assignmentWeight: 25.0, attendanceWeight: 20.0, studyHabitsWeight: 15.0, failurePenaltyDeductions: 0 }
  },
  {
    id: 103,
    studentId: 3,
    studentName: 'Marcus Taylor',
    studyHoursPerWeek: 6.0,
    attendanceRate: 64.0,
    pastFailures: 2,
    assignmentScore: 52.0,
    midtermExam: 48.0,
    predictedScore: 42.1,
    predictedGrade: 'F',
    riskLevel: 'HIGH',
    confidenceScore: 91.0,
    recommendations: 'Attend midterm review sessions and focus on key conceptual gaps | Increase independent study from 6.0 hrs/wk to at least 14-16 hrs/wk | Improve lecture attendance (currently 64.0%) | Enroll in prerequisite refresher workshops',
    actionItems: [
      'Immediate advisor intervention recommended',
      'Increase study time from 6 hrs to at least 14 hrs weekly',
      'Boost lecture attendance from 64% to avoid institutional lock-out',
      'Schedule remedial sessions for past failed prerequisites'
    ],
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    featureContributions: { midtermWeight: 35.0, assignmentWeight: 25.0, attendanceWeight: 20.0, studyHabitsWeight: 15.0, failurePenaltyDeductions: 9.0 }
  },
  {
    id: 104,
    studentId: 4,
    studentName: 'Elena Rodriguez',
    studyHoursPerWeek: 14.0,
    attendanceRate: 84.0,
    pastFailures: 0,
    assignmentScore: 78.0,
    midtermExam: 74.0,
    predictedScore: 76.5,
    predictedGrade: 'B',
    riskLevel: 'LOW',
    confidenceScore: 89.4,
    recommendations: 'Utilize lab hours and tutoring support for weekly assignment completion',
    actionItems: [
      'Solid foundational performance with B grade trajectory',
      'Increase practice problems in midterm topics to reach A grade tier',
      'Maintain strong attendance'
    ],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    featureContributions: { midtermWeight: 35.0, assignmentWeight: 25.0, attendanceWeight: 20.0, studyHabitsWeight: 15.0, failurePenaltyDeductions: 0 }
  }
];

function loadStoredStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDENTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('LocalStorage students load error:', e);
  }
  return defaultStudents;
}

function loadStoredPredictions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREDICTIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('LocalStorage predictions load error:', e);
  }
  return defaultPredictions;
}

function persistStudents(list) {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(list));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }
}

function persistPredictions(list) {
  try {
    localStorage.setItem(STORAGE_KEY_PREDICTIONS, JSON.stringify(list));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }
}

let mockStudents = loadStoredStudents();
let mockPredictions = loadStoredPredictions();

// Calculation formula matching PredictionService.java
export function calculateLocalPrediction(request) {
  const midterm = parseFloat(request.midtermExam) || 0;
  const assignments = parseFloat(request.assignmentScore) || 0;
  const attendance = parseFloat(request.attendanceRate) || 0;
  const studyHours = parseFloat(request.studyHoursPerWeek) || 0;
  const failures = parseInt(request.pastFailures, 10) || 0;

  const studyHoursScore = Math.min((studyHours / 20.0) * 100.0, 100.0);
  let rawScore = (midterm * 0.35)
               + (assignments * 0.25)
               + (attendance * 0.20)
               + (studyHoursScore * 0.15)
               - (failures * 4.5);

  if (attendance < 75.0) {
    rawScore -= (75.0 - attendance) * 0.25;
  }

  const finalScore = Math.max(0.0, Math.min(100.0, Math.round(rawScore * 10) / 10));

  let grade = 'F';
  if (finalScore >= 85.0) grade = 'A';
  else if (finalScore >= 70.0) grade = 'B';
  else if (finalScore >= 55.0) grade = 'C';
  else if (finalScore >= 45.0) grade = 'D';

  let riskLevel = 'LOW';
  if (finalScore < 50.0 || failures >= 2 || attendance < 65.0) {
    riskLevel = 'HIGH';
  } else if (finalScore < 70.0 || attendance < 80.0 || failures === 1) {
    riskLevel = 'MEDIUM';
  }

  let confidence = Math.round((88.0 + (Math.abs(50.0 - Math.abs(50.0 - finalScore)) * 0.15)) * 10) / 10;
  confidence = Math.min(97.5, Math.max(82.0, confidence));

  const actionItems = [];
  if (midterm < 60.0) {
    actionItems.push('Attend midterm review sessions and focus on key conceptual gaps');
  }
  if (studyHours < 12.0) {
    actionItems.push(`Increase independent study from ${studyHours.toFixed(1)} hrs/wk to at least 14-16 hrs/wk`);
  }
  if (attendance < 80.0) {
    actionItems.push(`Improve lecture attendance (currently ${attendance.toFixed(1)}%) to at least 85% to prevent penalty deductions`);
  }
  if (assignments < 70.0) {
    actionItems.push('Utilize faculty office hours and tutoring lab support for homework problem sets');
  }
  if (failures > 0) {
    actionItems.push(`Enroll in prerequisite refresher workshops (${failures} previous course failure${failures > 1 ? 's' : ''} detected)`);
  }
  if (actionItems.length === 0) {
    actionItems.push('Outstanding consistency! Maintain current learning routine and review advanced honors projects');
    actionItems.push('Eligible for peer study lead and department distinction');
  }

  return {
    id: Date.now(),
    studentId: request.studentId || null,
    studentName: request.studentName || 'Student #' + (mockPredictions.length + 1),
    studyHoursPerWeek: studyHours,
    attendanceRate: attendance,
    pastFailures: failures,
    assignmentScore: assignments,
    midtermExam: midterm,
    predictedScore: finalScore,
    predictedGrade: grade,
    riskLevel: riskLevel,
    confidenceScore: confidence,
    recommendations: actionItems.join(' | '),
    actionItems: actionItems,
    featureContributions: {
      midtermWeight: 35.0,
      assignmentWeight: 25.0,
      attendanceWeight: 20.0,
      studyHabitsWeight: 15.0,
      failurePenaltyDeductions: Math.round(failures * 4.5 * 10) / 10,
      normalizedStudyHoursScore: Math.round(studyHoursScore * 10) / 10,
    },
    createdAt: new Date().toISOString(),
  };
}

export const apiService = {
  async checkBackendHealth() {
    try {
      const res = await client.get('/predictions/dashboard');
      if (res.data && typeof res.data === 'object' && typeof res.data !== 'string' && res.data.totalPredictions !== undefined) {
        return { isOnline: true, data: res.data };
      }
      return { isOnline: false };
    } catch {
      return { isOnline: false };
    }
  },

  async getDashboardSummary() {
    try {
      const res = await client.get('/predictions/dashboard');
      if (res.data && typeof res.data === 'object' && typeof res.data !== 'string' && (res.data.totalPredictions !== undefined || res.data.recentPredictions !== undefined)) {
        return { data: res.data, isLive: true };
      }
      throw new Error('Invalid backend response');
    } catch {
      const totalStudents = mockStudents.length;
      const totalPredictions = mockPredictions.length;
      const avgScore = mockPredictions.length > 0
        ? Math.round((mockPredictions.reduce((acc, p) => acc + p.predictedScore, 0) / mockPredictions.length) * 10) / 10
        : 75.0;
      const highRisk = mockPredictions.filter(p => p.riskLevel === 'HIGH').length;
      const medRisk = mockPredictions.filter(p => p.riskLevel === 'MEDIUM').length;
      const lowRisk = mockPredictions.filter(p => p.riskLevel === 'LOW').length;

      return {
        data: {
          totalStudents,
          totalPredictions,
          averagePredictedScore: avgScore,
          highRiskCount: highRisk,
          mediumRiskCount: medRisk,
          lowRiskCount: lowRisk,
          recentPredictions: mockPredictions,
        },
        isLive: false,
      };
    }
  },

  async getAllPredictions() {
    try {
      const res = await client.get('/predictions');
      if (Array.isArray(res.data)) {
        return { data: res.data, isLive: true };
      }
      throw new Error('Invalid predictions response');
    } catch {
      return { data: mockPredictions, isLive: false };
    }
  },

  async createPrediction(request) {
    try {
      const res = await client.post('/predictions/predict', request);
      if (res.data && typeof res.data === 'object' && typeof res.data !== 'string' && res.data.predictedScore !== undefined) {
        mockPredictions = [res.data, ...mockPredictions.filter(p => p.id !== res.data.id)];
        persistPredictions(mockPredictions);
        return { data: res.data, isLive: true };
      }
      throw new Error('Invalid prediction response from backend');
    } catch {
      const newPrediction = calculateLocalPrediction(request);
      mockPredictions = [newPrediction, ...mockPredictions];
      persistPredictions(mockPredictions);
      return { data: newPrediction, isLive: false };
    }
  },

  async getAllStudents() {
    try {
      const res = await client.get('/students');
      if (Array.isArray(res.data)) {
        return { data: res.data, isLive: true };
      }
      throw new Error('Invalid students response');
    } catch {
      return { data: mockStudents, isLive: false };
    }
  },

  async createStudent(student) {
    try {
      const res = await client.post('/students', student);
      if (res.data && typeof res.data === 'object' && typeof res.data !== 'string' && res.data.id) {
        mockStudents = [res.data, ...mockStudents];
        persistStudents(mockStudents);
        return { data: res.data, isLive: true };
      }
      throw new Error('Invalid student response');
    } catch {
      const nextId = mockStudents.length > 0 ? Math.max(...mockStudents.map(s => s.id || 0)) + 1 : 1;
      const newStudent = {
        id: nextId,
        studentCode: `STU-100${nextId}`,
        createdAt: new Date().toISOString(),
        ...student,
      };
      mockStudents = [newStudent, ...mockStudents];
      persistStudents(mockStudents);
      return { data: newStudent, isLive: false };
    }
  },

  async deleteStudent(id) {
    try {
      const res = await client.delete(`/students/${id}`);
      if (res && res.status >= 200 && res.status < 300) {
        mockStudents = mockStudents.filter(s => s.id !== id);
        persistStudents(mockStudents);
        return { success: true, isLive: true };
      }
      throw new Error('Delete failed');
    } catch {
      mockStudents = mockStudents.filter(s => s.id !== id);
      persistStudents(mockStudents);
      return { success: true, isLive: false };
    }
  },
};
