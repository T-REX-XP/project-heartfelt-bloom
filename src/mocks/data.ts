import type { Employee, Signal, KPI, TeamSummary, ConversationPrep, LearningRecommendation, IDPGoal, Agent, ProjectHistory, FeedbackEntry, TrainingRecord, RoleHistory } from '@/domain/types';

export const agents: Agent[] = [
  { id: 'wellbeing-analyzer', name: 'Wellbeing & Risk Analyzer', type: 'analyzer', description: 'Monitors sick leave patterns, psychological safety signals, and work-life balance indicators.', icon: 'Heart' },
  { id: 'skills-analyzer', name: 'Skills & Growth Analyzer', type: 'analyzer', description: 'Tracks skill coverage, learning engagement, and IDP progress across the team.', icon: 'Brain' },
  { id: 'delivery-analyzer', name: 'Delivery & Workload Analyzer', type: 'analyzer', description: 'Analyzes sprint velocity, PR metrics, meeting load, and overtime patterns.', icon: 'BarChart3' },
  { id: 'conversation-prep', name: 'Conversation Prep Agent', type: 'synthesis', description: 'Synthesizes multi-signal insights into actionable 1:1 preparation briefs.', icon: 'MessageSquare' },
  { id: 'people-copilot', name: 'People Partner Copilot', type: 'copilot', description: 'AI assistant for Team Leads with team-wide context and proactive recommendations.', icon: 'Users' },
  { id: 'dev-coach', name: 'Development Coach', type: 'copilot', description: 'Private AI coach for Team Members — career guidance, learning paths, and wellbeing support.', icon: 'GraduationCap' },
];

export const employees: Employee[] = [
  {
    id: 'alex', name: 'Alex Chen', role: 'Mid Developer', department: 'Engineering', tenure: '2.5 years',
    wellbeingScore: 42, skillsScore: 65, motivationScore: 48, deliveryScore: 55, churnRisk: 78, status: 'red',
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    recentSignals: [],
  },
  {
    id: 'sarah', name: 'Sarah Park', role: 'Senior Developer', department: 'Engineering', tenure: '4 years',
    wellbeingScore: 85, skillsScore: 90, motivationScore: 88, deliveryScore: 92, churnRisk: 12, status: 'green',
    skills: ['React', 'Go', 'Kubernetes', 'System Design', 'Mentoring'],
    recentSignals: [],
  },
  {
    id: 'lisa', name: 'Lisa Wang', role: 'QA Lead', department: 'Quality', tenure: '3 years',
    wellbeingScore: 52, skillsScore: 72, motivationScore: 55, deliveryScore: 48, churnRisk: 62, status: 'yellow',
    skills: ['Selenium', 'Cypress', 'Test Strategy', 'CI/CD', 'Python'],
    recentSignals: [],
  },
  {
    id: 'tom', name: 'Tom Eriksson', role: 'Tech Lead', department: 'Engineering', tenure: '5 years',
    wellbeingScore: 80, skillsScore: 88, motivationScore: 82, deliveryScore: 85, churnRisk: 15, status: 'green',
    skills: ['Architecture', 'Java', 'AWS', 'Leadership', 'Agile'],
    recentSignals: [],
  },
  {
    id: 'emma', name: 'Emma Johnson', role: 'Junior Developer', department: 'Engineering', tenure: '8 months',
    wellbeingScore: 78, skillsScore: 55, motivationScore: 85, deliveryScore: 68, churnRisk: 20, status: 'green',
    skills: ['JavaScript', 'React', 'CSS', 'Git'],
    recentSignals: [],
  },
  {
    id: 'david', name: 'David Kim', role: 'DevOps Engineer', department: 'Infrastructure', tenure: '3 years',
    wellbeingScore: 38, skillsScore: 82, motivationScore: 45, deliveryScore: 70, churnRisk: 72, status: 'red',
    skills: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'Monitoring'],
    recentSignals: [],
  },
  {
    id: 'maria', name: 'Maria Santos', role: 'Product Manager', department: 'Product', tenure: '2 years',
    wellbeingScore: 82, skillsScore: 75, motivationScore: 90, deliveryScore: 88, churnRisk: 10, status: 'green',
    skills: ['Product Strategy', 'Analytics', 'Stakeholder Mgmt', 'Roadmapping'],
    recentSignals: [],
  },
  {
    id: 'jonas', name: 'Jonas Berg', role: 'Mid Developer', department: 'Engineering', tenure: '1.5 years',
    wellbeingScore: 70, skillsScore: 58, motivationScore: 65, deliveryScore: 62, churnRisk: 35, status: 'yellow',
    skills: ['Java', 'Spring Boot', 'SQL', 'REST APIs'],
    recentSignals: [],
  },
  {
    id: 'priya', name: 'Priya Sharma', role: 'Senior Developer', department: 'Engineering', tenure: '3.5 years',
    wellbeingScore: 82, skillsScore: 92, motivationScore: 78, deliveryScore: 95, churnRisk: 18, status: 'green',
    skills: ['Python', 'ML', 'Data Pipelines', 'FastAPI', 'PostgreSQL'],
    recentSignals: [],
  },
  {
    id: 'kevin', name: 'Kevin Müller', role: 'Junior Developer', department: 'Engineering', tenure: '6 months',
    wellbeingScore: 75, skillsScore: 38, motivationScore: 72, deliveryScore: 50, churnRisk: 30, status: 'yellow',
    skills: ['HTML', 'CSS', 'JavaScript'],
    recentSignals: [],
  },
];

export const teamLeadSignals: Signal[] = [
  { id: 's1', title: 'Sick Leave Spike Detected', description: 'Alex Chen has taken 4 sick days in the last 3 weeks — 200% above team average. Combined with declining engagement metrics.', severity: 'critical', category: 'wellbeing', employeeId: 'alex', employeeName: 'Alex Chen', timestamp: '2h ago', actionLabel: 'View Profile', isRead: false },
  { id: 's2', title: 'Churn Risk Alert', description: 'Alex Chen shows elevated churn risk (78%). Multiple negative signals across wellbeing, motivation, and delivery. Estimated replacement cost: $85k.', severity: 'critical', category: 'churn', employeeId: 'alex', employeeName: 'Alex Chen', timestamp: '4h ago', actionLabel: 'Prepare 1:1', isRead: false },
  { id: 's3', title: 'Team Trust Score Declining', description: 'Psychological safety score dropped 12% across the team over the last 2 pulse surveys. Key drivers: workload pressure and communication gaps.', severity: 'warning', category: 'wellbeing', timestamp: '1d ago', actionLabel: 'View Details', isRead: false },
  { id: 's4', title: 'Workload Overload', description: 'David Kim is averaging 52h/week over the last month with 15+ hours of meetings. Overtime has increased 40% in 2 sprints.', severity: 'critical', category: 'delivery', employeeId: 'david', employeeName: 'David Kim', timestamp: '6h ago', actionLabel: 'Rebalance', isRead: true },
  { id: 's5', title: 'Velocity Drop (3 Sprints)', description: 'Team velocity has decreased 18% over the last 3 sprints. Primary contributors: increased meeting load and 2 unplanned incidents.', severity: 'warning', category: 'delivery', timestamp: '1d ago', actionLabel: 'View Delivery', isRead: true },
  { id: 's6', title: 'Learning Disengagement', description: 'Alex Chen has not logged any learning hours in 6 weeks. IDP progress stalled at 20%.', severity: 'warning', category: 'skills', employeeId: 'alex', employeeName: 'Alex Chen', timestamp: '2d ago', actionLabel: 'View Skills', isRead: true },
];

export const teamMemberSignals: Signal[] = [
  { id: 'ms1', title: 'Overtime Warning', description: 'You\'ve logged 48+ hours for 2 consecutive weeks. Consider discussing workload balance in your next 1:1.', severity: 'warning', category: 'delivery', timestamp: '3h ago', actionLabel: 'View Workload', isRead: false },
  { id: 'ms2', title: 'Skill Opportunity: Cloud Architecture', description: 'Based on your recent project work, investing in cloud architecture could open senior pathway opportunities.', severity: 'positive', category: 'skills', timestamp: '1d ago', actionLabel: 'View Learning', isRead: false },
  { id: 'ms3', title: 'Recognition Nudge', description: 'Your PR review throughput increased 30% this sprint. Great contribution to team velocity!', severity: 'positive', category: 'motivation', timestamp: '2d ago', isRead: true },
  { id: 'ms4', title: 'Wellbeing Check-in', description: 'Your work-life balance indicators suggest increased stress. Here are some resources and tips.', severity: 'info', category: 'wellbeing', timestamp: '3d ago', actionLabel: 'View Tips', isRead: true },
  { id: 'ms5', title: 'Learning Milestone', description: 'You completed "Advanced TypeScript Patterns" — 12 hours logged this month toward your IDP goal.', severity: 'positive', category: 'skills', timestamp: '5d ago', isRead: true },
];

export const teamLeadKPIs: KPI[] = [
  { id: 'kpi-wellbeing', name: 'Well-being Index', value: 67, previousValue: 72, status: 'yellow', trend: -6.9, category: 'wellbeing', subKPIs: [
    { id: 'sk1', name: 'Sick Leave Rate', value: 4.2, status: 'yellow', unit: '%' },
    { id: 'sk2', name: 'Psychological Safety', value: 68, status: 'yellow' },
    { id: 'sk3', name: 'Work-Life Balance', value: 62, status: 'yellow' },
  ]},
  { id: 'kpi-skills', name: 'Skills & Development', value: 71, previousValue: 68, status: 'green', trend: 4.4, category: 'skills', subKPIs: [
    { id: 'sk4', name: 'Skills Coverage', value: 74, status: 'green' },
    { id: 'sk5', name: 'Active Learning Hours', value: 6.2, status: 'green', unit: 'hrs/mo' },
    { id: 'sk6', name: 'IDP Goal Progress', value: 62, status: 'yellow', unit: '%' },
  ]},
  { id: 'kpi-motivation', name: 'Motivation Index', value: 73, previousValue: 75, status: 'green', trend: -2.7, category: 'motivation', subKPIs: [
    { id: 'sk7', name: '360 Feedback Score', value: 76, status: 'green' },
    { id: 'sk8', name: 'Engagement Pulse', value: 70, status: 'yellow' },
    { id: 'sk9', name: 'Goal Achievement', value: 72, status: 'green', unit: '%' },
  ]},
  { id: 'kpi-churn', name: 'Churn & Retention', value: 64, previousValue: 70, status: 'yellow', trend: -8.6, category: 'churn', subKPIs: [
    { id: 'sk10', name: 'Retention Rate', value: 88, status: 'yellow', unit: '%' },
    { id: 'sk11', name: 'Replacement Cost Exp.', value: 126, status: 'red', unit: '$k' },
    { id: 'sk12', name: 'Preventability Score', value: 72, status: 'green', unit: '%' },
  ]},
  { id: 'kpi-delivery', name: 'Delivery & Workload', value: 64, previousValue: 71, status: 'yellow', trend: -9.9, category: 'delivery', subKPIs: [
    { id: 'sk13', name: 'Sprint Completion', value: 78, status: 'green', unit: '%' },
    { id: 'sk14', name: 'PR Velocity', value: 62, status: 'yellow' },
    { id: 'sk15', name: 'Meeting Load', value: 52, status: 'red', unit: '%' },
  ]},
];

export const teamSummary: TeamSummary = {
  totalMembers: 10,
  atRiskCount: 2,
  wellbeingIndex: 67,
  skillsIndex: 71,
  motivationIndex: 73,
  deliveryIndex: 64,
  absenceCost: 54000,
  churnExposure: 126000,
  totalPeopleRisk: 180000,
};

export const alexConversationPrep: ConversationPrep = {
  employeeId: 'alex',
  employeeName: 'Alex Chen',
  keyTopics: ['Sick leave pattern and wellbeing check-in', 'Workload and meeting load discussion', 'Career development and learning re-engagement', 'Team dynamics and psychological safety'],
  riskAreas: ['4 sick days in 3 weeks (200% above average)', 'Churn risk at 78%', 'No learning hours logged in 6 weeks', 'Motivation score dropped from 65 to 48'],
  positiveHighlights: ['Strong TypeScript and React skills', 'Consistent code quality when engaged', 'Previous quarter had good sprint contributions'],
  suggestedQuestions: ['How are you feeling about your workload right now?', 'Is there anything outside of work affecting you that you\'d be comfortable sharing?', 'What would make your day-to-day more enjoyable?', 'Are there any skills or projects you\'d like to explore?'],
  actionItems: ['Schedule follow-up in 1 week', 'Review meeting load — target reduction of 3-4 hours/week', 'Propose a learning sprint or mentoring pairing', 'Connect with HR for wellbeing support options'],
};

export const learningRecommendations: LearningRecommendation[] = [
  { id: 'lr1', title: 'Advanced Cloud Architecture', type: 'course', skillArea: 'Cloud', priority: 'high', estimatedHours: 20, reason: 'Aligns with team needs and senior pathway' },
  { id: 'lr2', title: 'System Design Mentoring', type: 'mentoring', skillArea: 'Architecture', priority: 'high', estimatedHours: 8, reason: 'Matched with Sarah Park for bi-weekly sessions' },
  { id: 'lr3', title: 'AWS Solutions Architect Cert', type: 'certification', skillArea: 'Cloud', priority: 'medium', estimatedHours: 40, reason: 'Team needs cloud-certified developers' },
  { id: 'lr4', title: 'Cross-team API Project', type: 'project', skillArea: 'Backend', priority: 'medium', estimatedHours: 30, reason: 'Hands-on experience with microservices' },
];

export const idpGoals: IDPGoal[] = [
  { id: 'g1', title: 'Master Cloud Architecture', description: 'Complete AWS course and design a cloud migration plan', progress: 35, targetDate: '2026-06-30', status: 'on-track', skillArea: 'Cloud' },
  { id: 'g2', title: 'Improve System Design Skills', description: 'Complete system design course and lead 2 architecture reviews', progress: 20, targetDate: '2026-09-30', status: 'behind', skillArea: 'Architecture' },
  { id: 'g3', title: 'Contribute to Open Source', description: 'Make 5 meaningful contributions to team OSS projects', progress: 60, targetDate: '2026-04-30', status: 'on-track', skillArea: 'Community' },
  { id: 'g4', title: 'Leadership Readiness', description: 'Shadow team lead and facilitate 3 sprint retrospectives', progress: 80, targetDate: '2026-03-31', status: 'on-track', skillArea: 'Leadership' },
];

// --- Employee profile enrichment data keyed by employee ID ---

export const employeeProjects: Record<string, ProjectHistory[]> = {
  alex: [
    { id: 'p1', name: 'Customer Portal Redesign', role: 'Frontend Developer', period: 'Jan 2026 – Present', status: 'active', description: 'Leading the migration of the legacy customer portal to React/TypeScript with a modern design system.', technologies: ['React', 'TypeScript', 'Tailwind', 'REST APIs'] },
    { id: 'p2', name: 'Payment Gateway Integration', role: 'Full-Stack Developer', period: 'Jul 2025 – Dec 2025', status: 'completed', description: 'Integrated Stripe and local payment providers into the checkout flow.', technologies: ['Node.js', 'TypeScript', 'Stripe API', 'PostgreSQL'] },
    { id: 'p3', name: 'Internal CLI Tooling', role: 'Developer', period: 'Mar 2025 – Jun 2025', status: 'completed', description: 'Built internal CLI tools for automated code scaffolding and deployment pipelines.', technologies: ['Python', 'Click', 'Docker'] },
  ],
  sarah: [
    { id: 'p4', name: 'Platform Microservices Migration', role: 'Tech Lead', period: 'Sep 2025 – Present', status: 'active', description: 'Driving the decomposition of the monolith into Go-based microservices with Kubernetes orchestration.', technologies: ['Go', 'Kubernetes', 'gRPC', 'PostgreSQL'] },
    { id: 'p5', name: 'Observability Stack', role: 'Senior Developer', period: 'Mar 2025 – Aug 2025', status: 'completed', description: 'Designed and deployed end-to-end observability with distributed tracing and alerting.', technologies: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Go'] },
  ],
  david: [
    { id: 'p6', name: 'Infrastructure as Code Migration', role: 'Lead DevOps', period: 'Nov 2025 – Present', status: 'active', description: 'Migrating all infrastructure provisioning from manual scripts to Terraform modules.', technologies: ['Terraform', 'AWS', 'Docker', 'GitHub Actions'] },
    { id: 'p7', name: 'Zero-Downtime Deployment Pipeline', role: 'DevOps Engineer', period: 'May 2025 – Oct 2025', status: 'completed', description: 'Implemented blue-green and canary deployment strategies for production services.', technologies: ['Kubernetes', 'ArgoCD', 'Helm', 'AWS EKS'] },
  ],
  lisa: [
    { id: 'p8', name: 'E2E Test Automation Framework', role: 'QA Lead', period: 'Oct 2025 – Present', status: 'active', description: 'Building a comprehensive Cypress-based E2E test suite covering all critical user journeys.', technologies: ['Cypress', 'TypeScript', 'CI/CD', 'Docker'] },
  ],
  tom: [
    { id: 'p9', name: 'Platform Architecture Review', role: 'Tech Lead', period: 'Jan 2026 – Present', status: 'active', description: 'Leading quarterly architecture reviews and technical debt reduction initiatives.', technologies: ['Java', 'AWS', 'System Design'] },
  ],
  emma: [
    { id: 'p10', name: 'Design System Components', role: 'Frontend Developer', period: 'Dec 2025 – Present', status: 'active', description: 'Contributing React components to the shared design system library.', technologies: ['React', 'Storybook', 'CSS', 'TypeScript'] },
  ],
  jonas: [
    { id: 'p11', name: 'Order Management API', role: 'Backend Developer', period: 'Nov 2025 – Present', status: 'active', description: 'Developing REST APIs for the new order management system.', technologies: ['Java', 'Spring Boot', 'PostgreSQL'] },
  ],
  maria: [
    { id: 'p12', name: 'Product Analytics Dashboard', role: 'Product Owner', period: 'Oct 2025 – Present', status: 'active', description: 'Defining requirements and leading delivery of a real-time product analytics dashboard.', technologies: ['Figma', 'SQL', 'Mixpanel'] },
  ],
  priya: [
    { id: 'p13', name: 'ML Prediction Pipeline', role: 'ML Engineer', period: 'Aug 2025 – Present', status: 'active', description: 'Building real-time prediction pipelines for customer churn and demand forecasting.', technologies: ['Python', 'FastAPI', 'TensorFlow', 'Airflow'] },
  ],
  kevin: [
    { id: 'p14', name: 'Marketing Site Refresh', role: 'Junior Developer', period: 'Jan 2026 – Present', status: 'active', description: 'Implementing responsive pages for the company marketing website.', technologies: ['HTML', 'CSS', 'JavaScript'] },
  ],
};

export const employeeFeedback: Record<string, FeedbackEntry[]> = {
  alex: [
    { id: 'f1', from: 'Tom Eriksson', fromRole: 'Tech Lead', date: '2026-02-15', type: 'manager', rating: 3, summary: 'Alex has strong technical fundamentals but recent engagement and delivery have declined. Needs support and re-motivation.', strengths: ['Clean code quality', 'TypeScript expertise', 'Collaborative in code reviews'], growthAreas: ['Proactive communication', 'Meeting deadlines', 'Self-care and work-life balance'] },
    { id: 'f2', from: 'Sarah Park', fromRole: 'Senior Developer', date: '2026-01-20', type: 'peer', rating: 3, summary: 'Alex is talented but seems disengaged lately. When focused, produces excellent work. I\'d love to see more initiative.', strengths: ['React architecture knowledge', 'Debugging skills'], growthAreas: ['Taking ownership of features end-to-end', 'Asking for help earlier'] },
    { id: 'f3', from: 'Emma Johnson', fromRole: 'Junior Developer', date: '2025-12-10', type: 'peer', rating: 4, summary: 'Alex helped me onboard and was very patient explaining the codebase. Great mentor when available.', strengths: ['Mentoring patience', 'Technical explanations'], growthAreas: ['Availability — sometimes hard to reach'] },
    { id: 'f4', from: 'Alex Chen', fromRole: 'Self', date: '2026-02-01', type: 'self', rating: 2, summary: 'I feel overwhelmed and unmotivated. The workload feels unmanageable and I\'m not growing in the direction I want.', strengths: ['Still passionate about frontend'], growthAreas: ['Need clearer career path', 'Better work-life boundaries', 'Want more challenging technical work'] },
  ],
  sarah: [
    { id: 'f5', from: 'Tom Eriksson', fromRole: 'Tech Lead', date: '2026-02-15', type: 'manager', rating: 5, summary: 'Sarah continues to be the team\'s strongest contributor. Ready for a leadership role.', strengths: ['Technical excellence', 'Mentoring', 'Architecture decisions'], growthAreas: ['Delegation — tends to take on too much'] },
  ],
  david: [
    { id: 'f6', from: 'Tom Eriksson', fromRole: 'Tech Lead', date: '2026-02-10', type: 'manager', rating: 3, summary: 'David\'s infrastructure skills are top-notch but burnout risk is high. Must address workload.', strengths: ['Deep AWS/K8s expertise', 'Reliability'], growthAreas: ['Saying no to requests', 'Workload management', 'Documentation'] },
  ],
};

export const employeeTrainings: Record<string, TrainingRecord[]> = {
  alex: [
    { id: 't1', title: 'Advanced TypeScript Patterns', provider: 'Frontend Masters', type: 'course', status: 'completed', startDate: '2025-09-01', completedDate: '2025-10-15', hours: 16, skillArea: 'TypeScript', score: 92 },
    { id: 't2', title: 'React Performance Deep Dive', provider: 'Udemy', type: 'course', status: 'completed', startDate: '2025-07-01', completedDate: '2025-08-10', hours: 12, skillArea: 'React', score: 88 },
    { id: 't3', title: 'AWS Cloud Practitioner', provider: 'AWS', type: 'certification', status: 'in-progress', startDate: '2026-01-15', hours: 20, skillArea: 'Cloud' },
    { id: 't4', title: 'System Design Workshop', provider: 'Internal', type: 'workshop', status: 'planned', startDate: '2026-04-01', hours: 8, skillArea: 'Architecture' },
    { id: 't5', title: 'Node.js Microservices', provider: 'Pluralsight', type: 'course', status: 'completed', startDate: '2025-04-01', completedDate: '2025-05-20', hours: 14, skillArea: 'Backend', score: 85 },
  ],
  sarah: [
    { id: 't6', title: 'Go Concurrency Masterclass', provider: 'Ardan Labs', type: 'course', status: 'completed', startDate: '2025-11-01', completedDate: '2025-12-15', hours: 20, skillArea: 'Go', score: 95 },
    { id: 't7', title: 'CKA Certification', provider: 'CNCF', type: 'certification', status: 'completed', startDate: '2025-06-01', completedDate: '2025-09-01', hours: 40, skillArea: 'Kubernetes', score: 91 },
    { id: 't8', title: 'Engineering Leadership', provider: 'Internal', type: 'workshop', status: 'in-progress', startDate: '2026-02-01', hours: 12, skillArea: 'Leadership' },
  ],
  david: [
    { id: 't9', title: 'Terraform Associate Cert', provider: 'HashiCorp', type: 'certification', status: 'completed', startDate: '2025-08-01', completedDate: '2025-10-01', hours: 30, skillArea: 'IaC', score: 89 },
    { id: 't10', title: 'SRE Fundamentals', provider: 'Google Cloud', type: 'course', status: 'in-progress', startDate: '2026-01-10', hours: 18, skillArea: 'SRE' },
  ],
  emma: [
    { id: 't11', title: 'JavaScript: The Good Parts', provider: 'Frontend Masters', type: 'course', status: 'completed', startDate: '2025-10-01', completedDate: '2025-11-01', hours: 10, skillArea: 'JavaScript', score: 82 },
    { id: 't12', title: 'React Fundamentals', provider: 'Udemy', type: 'course', status: 'completed', startDate: '2025-11-15', completedDate: '2025-12-20', hours: 14, skillArea: 'React', score: 78 },
    { id: 't13', title: 'TypeScript for React Devs', provider: 'Frontend Masters', type: 'course', status: 'in-progress', startDate: '2026-02-01', hours: 12, skillArea: 'TypeScript' },
  ],
  kevin: [
    { id: 't14', title: 'HTML & CSS Bootcamp', provider: 'Codecademy', type: 'course', status: 'completed', startDate: '2025-09-01', completedDate: '2025-10-15', hours: 20, skillArea: 'Frontend', score: 75 },
    { id: 't15', title: 'JavaScript Essentials', provider: 'Udemy', type: 'course', status: 'in-progress', startDate: '2026-01-10', hours: 16, skillArea: 'JavaScript' },
  ],
};

export const employeeRoleHistory: Record<string, RoleHistory[]> = {
  alex: [
    { id: 'r1', title: 'Mid Developer', department: 'Engineering', period: 'Mar 2025 – Present', duration: '1 year' },
    { id: 'r2', title: 'Junior Developer', department: 'Engineering', period: 'Sep 2023 – Feb 2025', duration: '1.5 years' },
  ],
  sarah: [
    { id: 'r3', title: 'Senior Developer', department: 'Engineering', period: 'Jan 2024 – Present', duration: '2 years' },
    { id: 'r4', title: 'Mid Developer', department: 'Engineering', period: 'Mar 2022 – Dec 2023', duration: '1.8 years' },
  ],
  david: [
    { id: 'r5', title: 'DevOps Engineer', department: 'Infrastructure', period: 'Mar 2023 – Present', duration: '3 years' },
  ],
  tom: [
    { id: 'r6', title: 'Tech Lead', department: 'Engineering', period: 'Jun 2024 – Present', duration: '1.7 years' },
    { id: 'r7', title: 'Senior Developer', department: 'Engineering', period: 'Mar 2021 – May 2024', duration: '3.2 years' },
  ],
  emma: [
    { id: 'r8', title: 'Junior Developer', department: 'Engineering', period: 'Jul 2025 – Present', duration: '8 months' },
  ],
};
