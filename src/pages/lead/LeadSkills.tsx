import { useState, useMemo } from 'react';
import { employees } from '@/mocks/data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, ChevronLeft, ChevronRight, Grid3X3, Users, Sparkles } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const allSkills = Array.from(new Set(employees.flatMap(e => e.skills)));
const ROWS_PER_PAGE = 5;

const LeadSkills = () => {
  const [search, setSearch] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [view, setView] = useState<'matrix' | 'cards'>('matrix');

  const filteredEmployees = useMemo(() => {
    let result = employees;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(e => e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q));
    }
    if (selectedSkills.length > 0) {
      result = result.filter(e => selectedSkills.some(s => e.skills.includes(s)));
    }
    return result;
  }, [search, selectedSkills]);

  const displayedSkills = selectedSkills.length > 0 ? selectedSkills : allSkills;
  const totalPages = Math.ceil(filteredEmployees.length / ROWS_PER_PAGE);
  const pagedEmployees = filteredEmployees.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
    setPage(0);
  };

  const skillCoverage = (skill: string) => {
    const count = employees.filter(e => e.skills.includes(skill)).length;
    return count;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Grid3X3 className="w-6 h-6 text-primary" />
            Skills Matrix
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Interactive skill coverage across {employees.length} team members · {allSkills.length} tracked skills
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v as 'matrix' | 'cards')}>
            <ToggleGroupItem value="matrix" aria-label="Matrix view" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              <Grid3X3 className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="cards" aria-label="Card view" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              <Users className="w-4 h-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or role..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            className="pl-10 bg-card border-border"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
          {allSkills.map(skill => {
            const active = selectedSkills.includes(skill);
            const coverage = skillCoverage(skill);
            return (
              <TooltipProvider key={skill}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant={active ? 'default' : 'outline'}
                      className={cn(
                        'cursor-pointer transition-all select-none',
                        active
                          ? 'bg-primary text-primary-foreground hover:bg-primary/80'
                          : 'hover:bg-accent/20 border-border text-muted-foreground'
                      )}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{coverage} team member{coverage !== 1 ? 's' : ''} with this skill</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
          {selectedSkills.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => { setSelectedSkills([]); setPage(0); }} className="text-xs text-muted-foreground">
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Team Members', value: filteredEmployees.length, icon: Users },
          { label: 'Skills Tracked', value: displayedSkills.length, icon: Sparkles },
          { label: 'Avg Skills/Person', value: (filteredEmployees.reduce((a, e) => a + e.skills.length, 0) / (filteredEmployees.length || 1)).toFixed(1), icon: Grid3X3 },
          { label: 'Gaps Found', value: filteredEmployees.reduce((a, e) => a + (displayedSkills.length - e.skills.filter(s => displayedSkills.includes(s)).length), 0), icon: Filter },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-4 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {view === 'matrix' ? (
          <motion.div
            key="matrix"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card/50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase sticky left-0 bg-card/80 backdrop-blur-sm z-10">
                      Team Member
                    </th>
                    {displayedSkills.map(s => (
                      <th key={s} className="px-3 py-3 text-xs font-semibold text-muted-foreground uppercase text-center whitespace-nowrap">
                        <span className="writing-mode-vertical">{s}</span>
                      </th>
                    ))}
                    <th className="px-3 py-3 text-xs font-semibold text-muted-foreground uppercase text-center">Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {pagedEmployees.map((emp, i) => {
                      const covered = emp.skills.filter(s => displayedSkills.includes(s)).length;
                      const pct = Math.round((covered / displayedSkills.length) * 100);
                      return (
                        <motion.tr
                          key={emp.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="border-b border-border/50 hover:bg-primary/5 transition-colors group"
                        >
                          <td className="px-4 py-3 sticky left-0 bg-card/80 backdrop-blur-sm z-10">
                            <div className="flex items-center gap-2">
                              <div className={cn(
                                'w-2 h-2 rounded-full shrink-0',
                                emp.status === 'green' ? 'bg-logiq-emerald' : emp.status === 'yellow' ? 'bg-logiq-amber' : 'bg-logiq-rose'
                              )} />
                              <div>
                                <div className="font-medium text-foreground whitespace-nowrap">{emp.name}</div>
                                <div className="text-xs text-muted-foreground">{emp.role}</div>
                              </div>
                            </div>
                          </td>
                          {displayedSkills.map(s => (
                            <td key={s} className="px-3 py-3 text-center">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <motion.span
                                      whileHover={{ scale: 1.4 }}
                                      className={cn(
                                        'w-3.5 h-3.5 rounded-full inline-block cursor-default transition-shadow',
                                        emp.skills.includes(s)
                                          ? 'bg-logiq-emerald shadow-[0_0_8px_hsl(var(--logiq-emerald)/0.4)]'
                                          : 'bg-muted group-hover:bg-muted-foreground/20'
                                      )}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{emp.name}: {emp.skills.includes(s) ? `Has ${s}` : `Missing ${s}`}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </td>
                          ))}
                          <td className="px-3 py-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div
                                  className={cn(
                                    'h-full rounded-full transition-all',
                                    pct >= 70 ? 'bg-logiq-emerald' : pct >= 40 ? 'bg-logiq-amber' : 'bg-logiq-rose'
                                  )}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs font-mono text-muted-foreground w-8">{pct}%</span>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                  {pagedEmployees.length === 0 && (
                    <tr>
                      <td colSpan={displayedSkills.length + 2} className="text-center py-12 text-muted-foreground">
                        No team members match your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Showing {page * ROWS_PER_PAGE + 1}–{Math.min((page + 1) * ROWS_PER_PAGE, filteredEmployees.length)} of {filteredEmployees.length}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={page === 0}
                    onClick={() => setPage(p => p - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      variant={page === i ? 'default' : 'ghost'}
                      size="icon"
                      className={cn('h-8 w-8 text-xs', page === i && 'bg-primary text-primary-foreground')}
                      onClick={() => setPage(i)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={page === totalPages - 1}
                    onClick={() => setPage(p => p + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {pagedEmployees.map((emp, i) => (
              <motion.div
                key={emp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-5 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold',
                    emp.status === 'green' ? 'bg-logiq-emerald/20 text-logiq-emerald'
                      : emp.status === 'yellow' ? 'bg-logiq-amber/20 text-logiq-amber'
                      : 'bg-logiq-rose/20 text-logiq-rose'
                  )}>
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{emp.name}</div>
                    <div className="text-xs text-muted-foreground">{emp.role}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {displayedSkills.map(s => (
                    <Badge
                      key={s}
                      variant={emp.skills.includes(s) ? 'default' : 'outline'}
                      className={cn(
                        'text-xs transition-all',
                        emp.skills.includes(s)
                          ? 'bg-logiq-emerald/15 text-logiq-emerald border-logiq-emerald/30 hover:bg-logiq-emerald/25'
                          : 'border-border text-muted-foreground/50'
                      )}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {emp.skills.filter(s => displayedSkills.includes(s)).length}/{displayedSkills.length} skills
                  </span>
                  <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${Math.round((emp.skills.filter(s => displayedSkills.includes(s)).length / displayedSkills.length) * 100)}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
            {pagedEmployees.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground glass rounded-xl">
                No team members match your filters
              </div>
            )}

            {/* Card view pagination */}
            {totalPages > 1 && (
              <div className="col-span-full flex items-center justify-center gap-1 pt-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i ? 'default' : 'ghost'}
                    size="icon"
                    className={cn('h-8 w-8 text-xs', page === i && 'bg-primary text-primary-foreground')}
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadSkills;
