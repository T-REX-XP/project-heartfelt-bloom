import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { employees } from '@/mocks/data';
import { format, parseISO, addDays, isSameDay, startOfWeek, addWeeks, isToday, isPast } from 'date-fns';
import {
  makeStyles, tokens, shorthands, Text, Button, Badge, Input, Textarea,
  Tab, TabList, Avatar, Dialog, DialogSurface, DialogTitle, DialogBody, DialogActions,
  Dropdown, Option, Checkbox,
} from '@fluentui/react-components';
import {
  CalendarLtrRegular, AddRegular, CheckmarkCircleRegular, ClockRegular,
  ChatRegular, ChevronLeftRegular, ChevronRightRegular, WarningRegular,
  DeleteRegular, ArrowRightRegular, PeopleRegular, DocumentRegular, DismissRegular,
  TargetRegular, CheckmarkSquareRegular, HeartRegular, BriefcaseRegular, MoreHorizontalRegular,
} from '@fluentui/react-icons';
import type { OneOnOneMeeting, MeetingTopic, MeetingTopicStatus } from '@/domain/types';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', ...shorthands.gap('12px') },
  statCard: {
    display: 'flex', alignItems: 'center', ...shorthands.gap('12px'),
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  calCard: {
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  weekGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', ...shorthands.gap('8px') },
  dayCell: {
    ...shorthands.borderRadius('8px'),
    ...shorthands.padding('8px'),
    textAlign: 'center' as const,
    minHeight: '80px',
    backgroundColor: tokens.colorNeutralBackground3,
  },
  dayCellToday: {
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
  },
  dayMeetingBtn: {
    width: '100%', fontSize: 10, fontWeight: 500,
    ...shorthands.borderRadius('4px'),
    ...shorthands.padding('2px', '4px'),
    cursor: 'pointer', textAlign: 'left' as const,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    ':hover': { backgroundColor: tokens.colorBrandBackground2Hover },
    ...shorthands.border('none'),
    marginTop: '4px',
  },
  threeCol: { display: 'grid', gridTemplateColumns: '1fr 2fr', ...shorthands.gap('24px') },
  listSection: { display: 'flex', flexDirection: 'column', ...shorthands.gap('8px') },
  meetingBtn: {
    width: '100%', textAlign: 'left' as const,
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    cursor: 'pointer',
    ':hover': { backgroundColor: tokens.colorNeutralBackground1Hover },
  },
  meetingBtnActive: {
    ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
    backgroundColor: tokens.colorBrandBackground2,
  },
  card: {
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  topicRow: {
    display: 'flex', alignItems: 'center', ...shorthands.gap('12px'),
    ...shorthands.padding('12px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground3,
  },
  emptyState: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    height: '400px', textAlign: 'center' as const,
  },
});

const categoryIcons: Record<string, React.ElementType> = {
  goal: TargetRegular,
  'action-item': CheckmarkSquareRegular,
  feedback: ChatRegular,
  wellbeing: HeartRegular,
  career: BriefcaseRegular,
  other: MoreHorizontalRegular,
};

const initialMeetings: OneOnOneMeeting[] = [
  {
    id: 'm1', employeeId: 'alex', employeeName: 'Alex Chen',
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), duration: 30, status: 'scheduled',
    topics: [
      { id: 't1', title: 'Discuss burnout signals & workload', status: 'pending', category: 'wellbeing' },
      { id: 't2', title: 'Review Q1 delivery targets', status: 'pending', category: 'goal' },
      { id: 't3', title: 'TypeScript upskilling progress', status: 'pending', category: 'career' },
    ],
    notes: '', followUpActions: ['Check in on sick leave pattern', 'Share learning resources'],
  },
  {
    id: 'm2', employeeId: 'sarah', employeeName: 'Sarah Park',
    date: format(addDays(new Date(), 3), 'yyyy-MM-dd'), duration: 30, status: 'scheduled',
    topics: [
      { id: 't4', title: 'Tech lead mentoring program', status: 'pending', category: 'career' },
      { id: 't5', title: 'Architecture review ownership', status: 'pending', category: 'goal' },
    ],
    notes: '', followUpActions: [],
  },
  {
    id: 'm4', employeeId: 'alex', employeeName: 'Alex Chen',
    date: format(addDays(new Date(), -7), 'yyyy-MM-dd'), duration: 30, status: 'completed',
    topics: [
      { id: 't8', title: 'Sprint retrospective follow-up', status: 'discussed', category: 'action-item' },
      { id: 't9', title: 'Personal development goals', status: 'discussed', category: 'career' },
      { id: 't10', title: 'Work-life balance check-in', status: 'deferred', category: 'wellbeing', description: 'Deferred to next meeting due to time constraints' },
    ],
    notes: 'Alex mentioned feeling overwhelmed with the migration project.',
    followUpActions: ['Redistribute migration tasks', 'Set up pair programming sessions'],
  },
];

const OneOnOnePlanner = () => {
  const s = useStyles();
  const [searchParams] = useSearchParams();
  const [meetings, setMeetings] = useState<OneOnOneMeeting[]>(initialMeetings);
  const [selectedMeeting, setSelectedMeeting] = useState<OneOnOneMeeting | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('other');
  const [tab, setTab] = useState('upcoming');

  const [newEmployee, setNewEmployee] = useState('');
  const [newDate, setNewDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [newDuration, setNewDuration] = useState('30');

  useEffect(() => {
    const eid = searchParams.get('employee');
    if (eid) {
      const match = meetings.find(m => m.employeeId === eid && m.status === 'scheduled');
      if (match) setSelectedMeeting(match);
    }
  }, [searchParams, meetings]);

  const weekStart = startOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const upcoming = useMemo(() => meetings.filter(m => m.status === 'scheduled').sort((a, b) => a.date.localeCompare(b.date)), [meetings]);
  const past = useMemo(() => meetings.filter(m => m.status === 'completed').sort((a, b) => b.date.localeCompare(a.date)), [meetings]);
  const deferred = useMemo(() => meetings.flatMap(m => m.topics.filter(t => t.status === 'deferred').map(t => ({ ...t, employeeName: m.employeeName }))), [meetings]);

  const getMeetingsForDay = (day: Date) => meetings.filter(m => isSameDay(parseISO(m.date), day));

  const toggleTopicStatus = (meetingId: string, topicId: string) => {
    const next: Record<MeetingTopicStatus, MeetingTopicStatus> = { pending: 'discussed', discussed: 'deferred', deferred: 'pending' };
    const update = (topics: MeetingTopic[]) => topics.map(t => t.id === topicId ? { ...t, status: next[t.status] } : t);
    setMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, topics: update(m.topics) } : m));
    if (selectedMeeting?.id === meetingId) setSelectedMeeting(prev => prev ? { ...prev, topics: update(prev.topics) } : null);
  };

  const addTopic = (meetingId: string) => {
    if (!newTopicTitle.trim()) return;
    const topic: MeetingTopic = { id: `t-${Date.now()}`, title: newTopicTitle.trim(), status: 'pending', category: newTopicCategory as MeetingTopic['category'] };
    setMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, topics: [...m.topics, topic] } : m));
    if (selectedMeeting?.id === meetingId) setSelectedMeeting(prev => prev ? { ...prev, topics: [...prev.topics, topic] } : null);
    setNewTopicTitle(''); setNewTopicCategory('other');
  };

  const removeTopic = (meetingId: string, topicId: string) => {
    setMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, topics: m.topics.filter(t => t.id !== topicId) } : m));
    if (selectedMeeting?.id === meetingId) setSelectedMeeting(prev => prev ? { ...prev, topics: prev.topics.filter(t => t.id !== topicId) } : null);
  };

  const updateNotes = (meetingId: string, notes: string) => {
    setMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, notes } : m));
    if (selectedMeeting?.id === meetingId) setSelectedMeeting(prev => prev ? { ...prev, notes } : null);
  };

  const completeMeeting = (meetingId: string) => {
    setMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, status: 'completed' as const } : m));
    setSelectedMeeting(prev => prev ? { ...prev, status: 'completed' as const } : null);
  };

  const createMeeting = () => {
    const emp = employees.find(e => e.id === newEmployee);
    if (!emp) return;
    const meeting: OneOnOneMeeting = {
      id: `m-${Date.now()}`, employeeId: emp.id, employeeName: emp.name,
      date: newDate, duration: parseInt(newDuration), status: 'scheduled',
      topics: [], notes: '', followUpActions: [],
    };
    setMeetings(prev => [...prev, meeting]);
    setShowDialog(false); setNewEmployee('');
  };

  return (
    <div className={s.root}>
      <div className={s.header}>
        <div>
          <Text size={600} weight="bold" block>1:1 Meeting Planner</Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Plan, prepare, and track your 1:1 conversations</Text>
        </div>
        <Button appearance="primary" icon={<AddRegular />} onClick={() => setShowDialog(true)}>Schedule 1:1</Button>
      </div>

      <Dialog open={showDialog} onOpenChange={(_, d) => setShowDialog(d.open)}>
        <DialogSurface>
          <DialogTitle>Schedule New 1:1</DialogTitle>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
              <Dropdown placeholder="Select team member" value={employees.find(e => e.id === newEmployee)?.name || ''} onOptionSelect={(_, d) => setNewEmployee(d.optionValue || '')}>
                {employees.map(e => <Option key={e.id} value={e.id}>{e.name} — {e.role}</Option>)}
              </Dropdown>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Input type="date" value={newDate} onChange={(_, d) => setNewDate(d.value)} />
                <Dropdown value={`${newDuration} min`} onOptionSelect={(_, d) => setNewDuration(d.optionValue || '30')}>
                  {['15', '30', '45', '60'].map(v => <Option key={v} value={v}>{v} min</Option>)}
                </Dropdown>
              </div>
            </div>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button appearance="primary" onClick={createMeeting} disabled={!newEmployee}>Create</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      <div className={s.statsGrid}>
        {[
          { label: 'Upcoming', value: upcoming.length, color: tokens.colorBrandForeground1 },
          { label: 'This Week', value: weekDays.reduce((c, d) => c + getMeetingsForDay(d).length, 0), color: tokens.colorPaletteBlueForeground2 },
          { label: 'Deferred Topics', value: deferred.length, color: tokens.colorPaletteYellowForeground1 },
          { label: 'Completed', value: past.length, color: tokens.colorPaletteGreenForeground1 },
        ].map(stat => (
          <div key={stat.label} className={s.statCard}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{stat.label}</Text>
            </div>
          </div>
        ))}
      </div>

      <div className={s.calCard}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Button appearance="subtle" icon={<ChevronLeftRegular />} size="small" onClick={() => setWeekOffset(w => w - 1)} />
          <Text size={300} weight="medium">{format(weekStart, 'MMM d')} — {format(addDays(weekStart, 6), 'MMM d, yyyy')}</Text>
          <div style={{ display: 'flex', gap: 4 }}>
            {weekOffset !== 0 && <Button appearance="subtle" size="small" onClick={() => setWeekOffset(0)}>Today</Button>}
            <Button appearance="subtle" icon={<ChevronRightRegular />} size="small" onClick={() => setWeekOffset(w => w + 1)} />
          </div>
        </div>
        <div className={s.weekGrid}>
          {weekDays.map(day => {
            const dayMtgs = getMeetingsForDay(day);
            const today = isToday(day);
            return (
              <div key={day.toISOString()} className={`${s.dayCell} ${today ? s.dayCellToday : ''}`} style={{ opacity: isPast(day) && !today ? 0.6 : 1 }}>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{format(day, 'EEE')}</Text>
                <Text size={300} weight={today ? 'semibold' : 'regular'} block style={{ color: today ? tokens.colorBrandForeground1 : undefined }}>{format(day, 'd')}</Text>
                {dayMtgs.map(m => (
                  <button key={m.id} onClick={() => setSelectedMeeting(m)} className={s.dayMeetingBtn}>
                    {m.employeeName.split(' ')[0]}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className={s.threeCol}>
        <div className={s.listSection}>
          <TabList selectedValue={tab} onTabSelect={(_, d) => setTab(d.value as string)} style={{ marginBottom: 8 }}>
            <Tab value="upcoming">Upcoming</Tab>
            <Tab value="past">Past</Tab>
          </TabList>

          {tab === 'upcoming' && upcoming.map(m => (
            <button key={m.id} onClick={() => setSelectedMeeting(m)} className={`${s.meetingBtn} ${selectedMeeting?.id === m.id ? s.meetingBtnActive : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={m.employeeName} size={32} color="brand" />
                <div>
                  <Text size={300} weight="semibold" block>{m.employeeName}</Text>
                  <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{format(parseISO(m.date), 'MMM d')} · {m.duration}m · {m.topics.length} topics</Text>
                </div>
              </div>
            </button>
          ))}

          {tab === 'past' && past.map(m => (
            <button key={m.id} onClick={() => setSelectedMeeting(m)} className={`${s.meetingBtn} ${selectedMeeting?.id === m.id ? s.meetingBtnActive : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar icon={<CheckmarkCircleRegular />} size={32} color="success" />
                <div>
                  <Text size={300} weight="semibold" block>{m.employeeName}</Text>
                  <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{format(parseISO(m.date), 'MMM d, yyyy')} · {m.topics.filter(t => t.status === 'discussed').length}/{m.topics.length} covered</Text>
                </div>
              </div>
            </button>
          ))}

          {deferred.length > 0 && (
            <div className={s.card} style={{ borderColor: tokens.colorPaletteYellowBorder1 }}>
              <Text size={200} weight="semibold" style={{ color: tokens.colorPaletteYellowForeground1, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <WarningRegular /> Deferred Topics
              </Text>
              {deferred.map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: tokens.colorPaletteYellowBackground3, marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <Text size={200} weight="medium" block>{t.title}</Text>
                    <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{t.employeeName}</Text>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {selectedMeeting ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className={s.card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar name={selectedMeeting.employeeName} size={40} color="brand" />
                    <div>
                      <Text size={500} weight="semibold" block>{selectedMeeting.employeeName}</Text>
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        {format(parseISO(selectedMeeting.date), 'EEEE, MMM d, yyyy')} · {selectedMeeting.duration} min
                      </Text>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {selectedMeeting.status === 'scheduled' && (
                      <>
                        <Link to={`/lead/conversation-prep/${selectedMeeting.employeeId}`}>
                          <Button appearance="outline" size="small" icon={<ChatRegular />}>AI Prep</Button>
                        </Link>
                        <Button appearance="primary" size="small" icon={<CheckmarkCircleRegular />} onClick={() => completeMeeting(selectedMeeting.id)}>Complete</Button>
                      </>
                    )}
                    {selectedMeeting.status === 'completed' && <Badge appearance="filled" color="success">Completed</Badge>}
                    <Button appearance="subtle" size="small" icon={<DismissRegular />} onClick={() => setSelectedMeeting(null)} />
                  </div>
                </div>
              </div>

              <div className={s.card}>
                <Text size={300} weight="semibold" block style={{ marginBottom: 12 }}>Topics & Agenda</Text>
                {selectedMeeting.topics.map(topic => {
                  const Icon = categoryIcons[topic.category] || MoreHorizontalRegular;
                  return (
                    <div key={topic.id} className={s.topicRow} style={{ marginBottom: 8 }}>
                      <Checkbox checked={topic.status === 'discussed'} onChange={() => toggleTopicStatus(selectedMeeting.id, topic.id)} />
                      <Icon style={{ fontSize: 16, color: tokens.colorNeutralForeground3 }} />
                      <div style={{ flex: 1 }}>
                        <Text size={300} style={{ textDecoration: topic.status === 'discussed' ? 'line-through' : undefined, color: topic.status === 'discussed' ? tokens.colorNeutralForeground3 : undefined }}>{topic.title}</Text>
                        {topic.description && <Text size={100} block style={{ color: tokens.colorNeutralForeground3 }}>{topic.description}</Text>}
                      </div>
                      <Badge appearance="outline" color={topic.status === 'discussed' ? 'success' : topic.status === 'deferred' ? 'warning' : 'informative'} size="small" onClick={() => toggleTopicStatus(selectedMeeting.id, topic.id)} style={{ cursor: 'pointer' }}>{topic.status}</Badge>
                      <Button appearance="subtle" size="small" icon={<DeleteRegular />} onClick={() => removeTopic(selectedMeeting.id, topic.id)} />
                    </div>
                  );
                })}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <Input placeholder="Add a topic..." value={newTopicTitle} onChange={(_, d) => setNewTopicTitle(d.value)} onKeyDown={e => e.key === 'Enter' && addTopic(selectedMeeting.id)} style={{ flex: 1 }} />
                  <Dropdown value={newTopicCategory} onOptionSelect={(_, d) => setNewTopicCategory(d.optionValue || 'other')} style={{ minWidth: 120 }}>
                    {Object.keys(categoryIcons).map(cat => <Option key={cat} value={cat}>{cat.replace('-', ' ')}</Option>)}
                  </Dropdown>
                  <Button appearance="outline" icon={<AddRegular />} onClick={() => addTopic(selectedMeeting.id)} />
                </div>
              </div>

              <div className={s.card}>
                <Text size={300} weight="semibold" block style={{ marginBottom: 8 }}>Meeting Notes</Text>
                <Textarea
                  placeholder="Capture notes..."
                  value={selectedMeeting.notes}
                  onChange={(_, d) => updateNotes(selectedMeeting.id, d.value)}
                  style={{ width: '100%', minHeight: 100 }}
                />
              </div>

              {selectedMeeting.followUpActions.length > 0 && (
                <div className={s.card}>
                  <Text size={300} weight="semibold" block style={{ marginBottom: 8 }}>Follow-up Actions</Text>
                  {selectedMeeting.followUpActions.map((action, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <CheckmarkCircleRegular style={{ color: tokens.colorPaletteGreenForeground1, fontSize: 14 }} />
                      <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>{action}</Text>
                    </div>
                  ))}
                </div>
              )}

              <Link to={`/lead/team/${selectedMeeting.employeeId}`}>
                <Button appearance="outline" size="small" icon={<PeopleRegular />}>View Profile</Button>
              </Link>
            </div>
          ) : (
            <div className={s.emptyState}>
              <CalendarLtrRegular style={{ fontSize: 48, color: tokens.colorNeutralForeground4, marginBottom: 16 }} />
              <Text size={400} weight="semibold" block>Select a Meeting</Text>
              <Text size={200} style={{ color: tokens.colorNeutralForeground3, maxWidth: 260, marginTop: 4 }}>
                Choose an upcoming or past 1:1 from the list to view details.
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneOnOnePlanner;
