export type Role = 'team-lead' | 'team-member' | 'admin';

export type KPIStatus = 'green' | 'yellow' | 'red';
export type SignalSeverity = 'critical' | 'warning' | 'info' | 'positive';
export type SignalCategory = 'wellbeing' | 'skills' | 'motivation' | 'churn' | 'delivery';

export interface KPI {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  status: KPIStatus;
  trend: number; // percentage change
  category: SignalCategory;
  subKPIs?: SubKPI[];
}

export interface SubKPI {
  id: string;
  name: string;
  value: number;
  status: KPIStatus;
  unit?: string;
}

export interface Signal {
  id: string;
  title: string;
  description: string;
  severity: SignalSeverity;
  category: SignalCategory;
  employeeId?: string;
  employeeName?: string;
  timestamp: string;
  actionLabel?: string;
  isRead: boolean;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  department: string;
  tenure: string;
  wellbeingScore: number;
  skillsScore: number;
  motivationScore: number;
  deliveryScore: number;
  churnRisk: number;
  status: KPIStatus;
  skills: string[];
  recentSignals: Signal[];
}

export interface TeamSummary {
  totalMembers: number;
  atRiskCount: number;
  wellbeingIndex: number;
  skillsIndex: number;
  motivationIndex: number;
  deliveryIndex: number;
  absenceCost: number;
  churnExposure: number;
  totalPeopleRisk: number;
}

export interface ConversationPrep {
  employeeId: string;
  employeeName: string;
  keyTopics: string[];
  riskAreas: string[];
  positiveHighlights: string[];
  suggestedQuestions: string[];
  actionItems: string[];
}

export interface LearningRecommendation {
  id: string;
  title: string;
  type: 'course' | 'mentoring' | 'project' | 'certification';
  skillArea: string;
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
  reason: string;
}

export interface IDPGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  targetDate: string;
  status: 'on-track' | 'at-risk' | 'behind' | 'completed';
  skillArea: string;
}

export interface ProjectHistory {
  id: string;
  name: string;
  role: string;
  period: string;
  status: 'completed' | 'active' | 'on-hold';
  description: string;
  technologies: string[];
}

export interface FeedbackEntry {
  id: string;
  from: string;
  fromRole: string;
  date: string;
  type: 'peer' | 'manager' | '360' | 'self';
  rating: number; // 1-5
  summary: string;
  strengths: string[];
  growthAreas: string[];
}

export interface TrainingRecord {
  id: string;
  title: string;
  provider: string;
  type: 'course' | 'workshop' | 'certification' | 'conference';
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  completedDate?: string;
  hours: number;
  skillArea: string;
  score?: number;
}

export interface RoleHistory {
  id: string;
  title: string;
  department: string;
  period: string;
  duration: string;
}

export interface Agent {
  id: string;
  name: string;
  type: 'analyzer' | 'synthesis' | 'copilot';
  description: string;
  icon: string;
}

export type MeetingTopicStatus = 'pending' | 'discussed' | 'deferred';

export interface MeetingTopic {
  id: string;
  title: string;
  description?: string;
  status: MeetingTopicStatus;
  category: 'goal' | 'action-item' | 'feedback' | 'wellbeing' | 'career' | 'other';
}

export interface OneOnOneMeeting {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  duration: number; // minutes
  status: 'scheduled' | 'completed' | 'cancelled';
  topics: MeetingTopic[];
  notes?: string;
  followUpActions: string[];
}
