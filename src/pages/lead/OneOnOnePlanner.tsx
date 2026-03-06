import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { employees } from '@/mocks/data';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, addDays, isSameDay, startOfWeek, addWeeks, isToday, isPast, isFuture } from 'date-fns';
import {
  Calendar as CalendarIcon, Plus, CheckCircle2, Clock, MessageSquare,
  ChevronLeft, ChevronRight, Target, AlertTriangle, Heart, Briefcase,
  MoreHorizontal, Trash2, ArrowRight, Users, FileText, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { OneOnOneMeeting, MeetingTopic, MeetingTopicStatus } from '@/domain/types';

const categoryIcons: Record<string, typeof Target> = {
  goal: Target,
  'action-item': CheckCircle2,
  feedback: MessageSquare,
  wellbeing: Heart,
  career: Briefcase,
  other: MoreHorizontal,
};

const categoryColors: Record<string, string> = {
  goal: 'text-primary bg-primary/10',
  'action-item': 'text-logiq-amber bg-logiq-amber/10',
  feedback: 'text-logiq-cyan bg-logiq-cyan/10',
  wellbeing: 'text-logiq-rose bg-logiq-rose/10',
  career: 'text-logiq-emerald bg-logiq-emerald/10',
  other: 'text-muted-foreground bg-muted',
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
    id: 'm3', employeeId: 'lisa', employeeName: 'Lisa Wang',
    date: format(addDays(new Date(), 5), 'yyyy-MM-dd'), duration: 45, status: 'scheduled',
    topics: [
      { id: 't6', title: 'QA automation strategy concerns', status: 'pending', category: 'action-item' },
      { id: 't7', title: 'Team collaboration feedback', status: 'pending', category: 'feedback' },
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
    notes: 'Alex mentioned feeling overwhelmed with the migration project. Need to follow up on workload redistribution.',
    followUpActions: ['Redistribute migration tasks', 'Set up pair programming sessions'],
  },
  {
    id: 'm5', employeeId: 'david', employeeName: 'David Kim',
    date: format(addDays(new Date(), -3), 'yyyy-MM-dd'), duration: 30, status: 'completed',
    topics: [
      { id: 't11', title: 'On-call rotation burnout', status: 'discussed', category: 'wellbeing' },
      { id: 't12', title: 'Infrastructure roadmap input', status: 'discussed', category: 'goal' },
    ],
    notes: 'David is considering reducing on-call shifts. Discussed potential rotation changes.',
    followUpActions: ['Propose new on-call schedule', 'Review infrastructure budget'],
  },
];

const OneOnOnePlanner = () => {
  const [meetings, setMeetings] = useState<OneOnOneMeeting[]>(initialMeetings);
  const [selectedMeeting, setSelectedMeeting] = useState<OneOnOneMeeting | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showNewMeetingDialog, setShowNewMeetingDialog] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState<string>('other');

  const weekStart = startOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const upcomingMeetings = useMemo(() =>
    meetings.filter(m => m.status === 'scheduled').sort((a, b) => a.date.localeCompare(b.date)),
    [meetings]
  );

  const pastMeetings = useMemo(() =>
    meetings.filter(m => m.status === 'completed').sort((a, b) => b.date.localeCompare(a.date)),
    [meetings]
  );

  const deferredTopics = useMemo(() =>
    meetings.flatMap(m => m.topics.filter(t => t.status === 'deferred').map(t => ({ ...t, meetingId: m.id, employeeName: m.employeeName }))),
    [meetings]
  );

  const getMeetingsForDay = (day: Date) =>
    meetings.filter(m => isSameDay(parseISO(m.date), day));

  const toggleTopicStatus = (meetingId: string, topicId: string) => {
    setMeetings(prev => prev.map(m => {
      if (m.id !== meetingId) return m;
      return {
        ...m,
        topics: m.topics.map(t => {
          if (t.id !== topicId) return t;
          const nextStatus: Record<MeetingTopicStatus, MeetingTopicStatus> = {
            pending: 'discussed', discussed: 'deferred', deferred: 'pending'
          };
          return { ...t, status: nextStatus[t.status] };
        })
      };
    }));
    if (selectedMeeting?.id === meetingId) {
      setSelectedMeeting(prev => prev ? {
        ...prev,
        topics: prev.topics.map(t => {
          if (t.id !== topicId) return t;
          const nextStatus: Record<MeetingTopicStatus, MeetingTopicStatus> = {
            pending: 'discussed', discussed: 'deferred', deferred: 'pending'
          };
          return { ...t, status: nextStatus[t.status] };
        })
      } : null);
    }
  };

  const addTopicToMeeting = (meetingId: string) => {
    if (!newTopicTitle.trim()) return;
    const newTopic: MeetingTopic = {
      id: `t-${Date.now()}`,
      title: newTopicTitle.trim(),
      status: 'pending',
      category: newTopicCategory as MeetingTopic['category'],
    };
    setMeetings(prev => prev.map(m =>
      m.id === meetingId ? { ...m, topics: [...m.topics, newTopic] } : m
    ));
    if (selectedMeeting?.id === meetingId) {
      setSelectedMeeting(prev => prev ? { ...prev, topics: [...prev.topics, newTopic] } : null);
    }
    setNewTopicTitle('');
    setNewTopicCategory('other');
  };

  const removeTopic = (meetingId: string, topicId: string) => {
    setMeetings(prev => prev.map(m =>
      m.id === meetingId ? { ...m, topics: m.topics.filter(t => t.id !== topicId) } : m
    ));
    if (selectedMeeting?.id === meetingId) {
      setSelectedMeeting(prev => prev ? { ...prev, topics: prev.topics.filter(t => t.id !== topicId) } : null);
    }
  };

  const updateMeetingNotes = (meetingId: string, notes: string) => {
    setMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, notes } : m));
    if (selectedMeeting?.id === meetingId) {
      setSelectedMeeting(prev => prev ? { ...prev, notes } : null);
    }
  };

  const completeMeeting = (meetingId: string) => {
    setMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, status: 'completed' as const } : m));
    setSelectedMeeting(prev => prev ? { ...prev, status: 'completed' as const } : null);
  };

  const statusBadge = (status: MeetingTopicStatus) => {
    const styles: Record<MeetingTopicStatus, string> = {
      pending: 'bg-muted text-muted-foreground',
      discussed: 'bg-logiq-emerald/15 text-logiq-emerald',
      deferred: 'bg-logiq-amber/15 text-logiq-amber',
    };
    return <Badge variant="outline" className={cn('text-xs border-0 cursor-pointer', styles[status])}>{status}</Badge>;
  };

  const employee = (employeeId: string) => employees.find(e => e.id === employeeId);

  // New meeting form state
  const [newMeetingEmployee, setNewMeetingEmployee] = useState('');
  const [newMeetingDate, setNewMeetingDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [newMeetingDuration, setNewMeetingDuration] = useState('30');

  const createMeeting = () => {
    const emp = employees.find(e => e.id === newMeetingEmployee);
    if (!emp) return;
    const meeting: OneOnOneMeeting = {
      id: `m-${Date.now()}`,
      employeeId: emp.id,
      employeeName: emp.name,
      date: newMeetingDate,
      duration: parseInt(newMeetingDuration),
      status: 'scheduled',
      topics: [],
      notes: '',
      followUpActions: [],
    };
    setMeetings(prev => [...prev, meeting]);
    setShowNewMeetingDialog(false);
    setNewMeetingEmployee('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">1:1 Meeting Planner</h1>
          <p className="text-muted-foreground text-sm mt-1">Plan, prepare, and track your 1:1 conversations</p>
        </div>
        <Dialog open={showNewMeetingDialog} onOpenChange={setShowNewMeetingDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Schedule 1:1</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Schedule New 1:1</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Team Member</label>
                <Select value={newMeetingEmployee} onValueChange={setNewMeetingEmployee}>
                  <SelectTrigger><SelectValue placeholder="Select team member" /></SelectTrigger>
                  <SelectContent>
                    {employees.map(e => (
                      <SelectItem key={e.id} value={e.id}>{e.name} — {e.role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Date</label>
                  <Input type="date" value={newMeetingDate} onChange={e => setNewMeetingDate(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Duration</label>
                  <Select value={newMeetingDuration} onValueChange={setNewMeetingDuration}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">60 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={createMeeting} disabled={!newMeetingEmployee} className="w-full">Create Meeting</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Upcoming', value: upcomingMeetings.length, icon: CalendarIcon, color: 'text-primary bg-primary/10' },
          { label: 'This Week', value: getMeetingsForDay(new Date()).length + weekDays.filter(d => getMeetingsForDay(d).length > 0).length, icon: Clock, color: 'text-logiq-cyan bg-logiq-cyan/10' },
          { label: 'Deferred Topics', value: deferredTopics.length, icon: AlertTriangle, color: 'text-logiq-amber bg-logiq-amber/10' },
          { label: 'Completed', value: pastMeetings.length, icon: CheckCircle2, color: 'text-logiq-emerald bg-logiq-emerald/10' },
        ].map(stat => (
          <Card key={stat.label} className="glass border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Week calendar strip */}
      <Card className="glass border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="sm" onClick={() => setWeekOffset(w => w - 1)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-foreground">
              {format(weekStart, 'MMM d')} — {format(addDays(weekStart, 6), 'MMM d, yyyy')}
            </span>
            <div className="flex gap-1">
              {weekOffset !== 0 && (
                <Button variant="ghost" size="sm" onClick={() => setWeekOffset(0)} className="text-xs">Today</Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setWeekOffset(w => w + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map(day => {
              const dayMeetings = getMeetingsForDay(day);
              const today = isToday(day);
              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    'rounded-lg p-2 text-center transition-colors min-h-[80px]',
                    today ? 'bg-primary/10 ring-1 ring-primary/30' : 'bg-muted/30',
                    isPast(day) && !today && 'opacity-60'
                  )}
                >
                  <p className="text-xs text-muted-foreground">{format(day, 'EEE')}</p>
                  <p className={cn('text-sm font-semibold', today ? 'text-primary' : 'text-foreground')}>{format(day, 'd')}</p>
                  <div className="mt-1 space-y-1">
                    {dayMeetings.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMeeting(m)}
                        className={cn(
                          'w-full text-[10px] font-medium rounded px-1 py-0.5 truncate text-left transition-colors',
                          m.status === 'completed'
                            ? 'bg-logiq-emerald/15 text-logiq-emerald'
                            : 'bg-primary/15 text-primary hover:bg-primary/25'
                        )}
                      >
                        {m.employeeName.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: meeting lists */}
        <div className="lg:col-span-1 space-y-4">
          <Tabs defaultValue="upcoming">
            <TabsList className="w-full">
              <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
              <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-2 mt-3">
              {upcomingMeetings.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">No upcoming meetings</p>
              )}
              {upcomingMeetings.map(m => {
                const emp = employee(m.employeeId);
                return (
                  <motion.button
                    key={m.id}
                    onClick={() => setSelectedMeeting(m)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'w-full text-left glass rounded-xl p-4 transition-all hover:ring-1 hover:ring-primary/30',
                      selectedMeeting?.id === m.id && 'ring-1 ring-primary/50 bg-primary/5'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                          {m.employeeName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{m.employeeName}</p>
                          <p className="text-xs text-muted-foreground">{emp?.role}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" />{format(parseISO(m.date), 'MMM d')}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{m.duration}m</span>
                      <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{m.topics.length} topics</span>
                    </div>
                    {emp && emp.churnRisk > 50 && (
                      <Badge variant="outline" className="mt-2 text-xs border-0 bg-destructive/10 text-destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" /> High risk
                      </Badge>
                    )}
                  </motion.button>
                );
              })}
            </TabsContent>

            <TabsContent value="past" className="space-y-2 mt-3">
              {pastMeetings.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMeeting(m)}
                  className={cn(
                    'w-full text-left glass rounded-xl p-4 transition-all hover:ring-1 hover:ring-border',
                    selectedMeeting?.id === m.id && 'ring-1 ring-primary/50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-logiq-emerald/15 flex items-center justify-center text-logiq-emerald text-sm font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{m.employeeName}</p>
                      <p className="text-xs text-muted-foreground">{format(parseISO(m.date), 'MMM d, yyyy')} · {m.topics.filter(t => t.status === 'discussed').length}/{m.topics.length} covered</p>
                    </div>
                  </div>
                </button>
              ))}
            </TabsContent>
          </Tabs>

          {/* Deferred topics */}
          {deferredTopics.length > 0 && (
            <Card className="glass border-logiq-amber/20">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-logiq-amber">
                  <AlertTriangle className="w-4 h-4" /> Deferred Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {deferredTopics.map(t => (
                  <div key={t.id} className="flex items-start gap-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-logiq-amber mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-foreground font-medium">{t.title}</p>
                      <p className="text-muted-foreground">{t.employeeName}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: meeting detail */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedMeeting ? (
              <motion.div
                key={selectedMeeting.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Card className="glass border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                          {selectedMeeting.employeeName.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{selectedMeeting.employeeName}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {format(parseISO(selectedMeeting.date), 'EEEE, MMM d, yyyy')} · {selectedMeeting.duration} min
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {selectedMeeting.status === 'scheduled' && (
                          <>
                            <Link to={`/lead/conversation-prep/${selectedMeeting.employeeId}`}>
                              <Button variant="outline" size="sm" className="gap-1 text-xs">
                                <MessageSquare className="w-3 h-3" /> AI Prep
                              </Button>
                            </Link>
                            <Button size="sm" onClick={() => completeMeeting(selectedMeeting.id)} className="gap-1 text-xs">
                              <CheckCircle2 className="w-3 h-3" /> Complete
                            </Button>
                          </>
                        )}
                        {selectedMeeting.status === 'completed' && (
                          <Badge className="bg-logiq-emerald/15 text-logiq-emerald border-0">Completed</Badge>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedMeeting(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Topics */}
                <Card className="glass border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Topics & Agenda</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedMeeting.topics.map(topic => {
                      const Icon = categoryIcons[topic.category] || MoreHorizontal;
                      return (
                        <div
                          key={topic.id}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-lg transition-colors',
                            topic.status === 'discussed' ? 'bg-logiq-emerald/5' : topic.status === 'deferred' ? 'bg-logiq-amber/5' : 'bg-muted/30'
                          )}
                        >
                          <button onClick={() => toggleTopicStatus(selectedMeeting.id, topic.id)}>
                            <Checkbox
                              checked={topic.status === 'discussed'}
                              className="data-[state=checked]:bg-logiq-emerald data-[state=checked]:border-logiq-emerald"
                            />
                          </button>
                          <div className={cn('w-7 h-7 rounded flex items-center justify-center flex-shrink-0', categoryColors[topic.category])}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn('text-sm font-medium', topic.status === 'discussed' && 'line-through text-muted-foreground')}>
                              {topic.title}
                            </p>
                            {topic.description && <p className="text-xs text-muted-foreground mt-0.5">{topic.description}</p>}
                          </div>
                          <button onClick={() => toggleTopicStatus(selectedMeeting.id, topic.id)}>
                            {statusBadge(topic.status)}
                          </button>
                          <button onClick={() => removeTopic(selectedMeeting.id, topic.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}

                    {/* Add topic */}
                    <div className="flex gap-2 pt-2">
                      <Input
                        placeholder="Add a topic..."
                        value={newTopicTitle}
                        onChange={e => setNewTopicTitle(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addTopicToMeeting(selectedMeeting.id)}
                        className="text-sm"
                      />
                      <Select value={newTopicCategory} onValueChange={setNewTopicCategory}>
                        <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {Object.keys(categoryIcons).map(cat => (
                            <SelectItem key={cat} value={cat} className="capitalize">{cat.replace('-', ' ')}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon" onClick={() => addTopicToMeeting(selectedMeeting.id)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card className="glass border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Meeting Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Capture notes during or after the meeting..."
                      value={selectedMeeting.notes}
                      onChange={e => updateMeetingNotes(selectedMeeting.id, e.target.value)}
                      className="min-h-[100px] text-sm bg-muted/30 border-border/50"
                    />
                  </CardContent>
                </Card>

                {/* Follow-up actions */}
                {selectedMeeting.followUpActions.length > 0 && (
                  <Card className="glass border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Follow-up Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1.5">
                      {selectedMeeting.followUpActions.map((action, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-logiq-emerald flex-shrink-0" />
                          {action}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Link to profile */}
                <div className="flex gap-2">
                  <Link to={`/lead/team/${selectedMeeting.employeeId}`}>
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      <Users className="w-3 h-3" /> View Profile
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-[400px] text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                  <CalendarIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-foreground font-semibold">Select a Meeting</h3>
                <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                  Choose an upcoming or past 1:1 from the list to view details, manage topics, and track progress.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OneOnOnePlanner;
