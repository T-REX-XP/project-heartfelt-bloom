import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import {
  makeStyles, tokens, shorthands, mergeClasses,
  Badge, Tooltip, Avatar, Text, Divider,
} from '@fluentui/react-components';
import {
  BoardRegular, BoardFilled,
  AlertRegular, AlertFilled,
  PeopleTeamRegular, PeopleTeamFilled,
  CalendarLtrRegular, CalendarLtrFilled,
  SettingsRegular, SettingsFilled,
  SignOutRegular,
  NavigationRegular,
  ChatSparkleRegular, ChatSparkleFilled,
  ShieldErrorRegular, ShieldErrorFilled,
  BookRegular, BookFilled,
  ClipboardTaskListLtrRegular, ClipboardTaskListLtrFilled,
  GridRegular,
} from '@fluentui/react-icons';
import FloatingCopilot from '@/components/FloatingCopilot';

/*
 * Office 365 App Shell
 * Follows the M365 admin center / Teams vertical nav pattern:
 * - 48px top command bar with app branding
 * - Left nav rail with icon + label, collapsible
 * - Neutral background canvas (#F5F5F5)
 */

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#F5F5F5',
  },
  /* -------- Top command bar (48px, Office 365 style) -------- */
  commandBar: {
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0078D4',
    ...shorthands.padding('0', '16px'),
    flexShrink: 0,
    zIndex: 100,
  },
  commandBarLeft: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
  },
  wafflBtn: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.borderRadius('4px'),
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    cursor: 'pointer',
    ...shorthands.border('none'),
    ':hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
  },
  appName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#FFFFFF',
    letterSpacing: '-0.2px',
  },
  commandBarRight: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  userPill: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
    ...shorthands.padding('4px', '12px', '4px', '4px'),
    ...shorthands.borderRadius('16px'),
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 500,
  },
  signOutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    ...shorthands.borderRadius('4px'),
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.85)',
    cursor: 'pointer',
    ...shorthands.border('none'),
    ':hover': { backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF' },
  },
  /* -------- Body (sidebar + content) -------- */
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  /* -------- Left nav (Office 365 style) -------- */
  sidebar: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRight: `1px solid #EDEBE9`,
    transition: 'width 200ms cubic-bezier(0.4,0,0.2,1)',
    overflow: 'hidden',
    flexShrink: 0,
  },
  sidebarExpanded: { width: '240px' },
  sidebarCollapsed: { width: '48px' },
  navSection: {
    ...shorthands.padding('8px', '4px'),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('2px'),
    flex: 1,
    overflowY: 'auto',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#605E5C',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    ...shorthands.padding('12px', '12px', '4px'),
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    ...shorthands.padding('8px', '12px'),
    ...shorthands.borderRadius('4px'),
    fontSize: '14px',
    fontWeight: 400,
    color: '#323130',
    textDecoration: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    ':hover': {
      backgroundColor: '#F3F2F1',
    },
  },
  navItemActive: {
    backgroundColor: '#DEECF9',
    color: '#0078D4',
    fontWeight: 600,
    ':hover': {
      backgroundColor: '#C7E0F4',
    },
  },
  navIcon: {
    fontSize: '20px',
    flexShrink: 0,
  },
  navBadge: {
    marginLeft: 'auto',
  },
  collapseBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    ...shorthands.borderRadius('4px'),
    backgroundColor: 'transparent',
    color: '#605E5C',
    cursor: 'pointer',
    ...shorthands.border('none'),
    ':hover': { backgroundColor: '#F3F2F1' },
  },
  bottomNav: {
    borderTop: '1px solid #EDEBE9',
    ...shorthands.padding('4px'),
    flexShrink: 0,
  },
  /* -------- Main content area -------- */
  main: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#F5F5F5',
  },
  mainContent: {
    ...shorthands.padding('24px', '32px'),
    maxWidth: '1400px',
  },
});

/* Office 365 nav config */
const leadNavItems = [
  { path: '/lead/dashboard', label: 'Dashboard', icon: BoardRegular, iconActive: BoardFilled },
  { path: '/lead/wellbeing-risks', label: 'Wellbeing & Risks', icon: ShieldErrorRegular, iconActive: ShieldErrorFilled, badge: 3 },
  { path: '/lead/team', label: 'My Team', icon: PeopleTeamRegular, iconActive: PeopleTeamFilled },
  { path: '/lead/one-on-ones', label: '1:1 Planner', icon: CalendarLtrRegular, iconActive: CalendarLtrFilled },
  { path: '/lead/settings', label: 'Settings', icon: SettingsRegular, iconActive: SettingsFilled },
];

const memberNavItems = [
  { path: '/member/dashboard', label: 'Dashboard', icon: BoardRegular, iconActive: BoardFilled },
  { path: '/member/signals', label: 'Signals', icon: AlertRegular, iconActive: AlertFilled, badge: 2 },
  { path: '/member/idp', label: 'Dev Plan', icon: BookRegular, iconActive: BookFilled },
  { path: '/member/delivery', label: 'Delivery', icon: ClipboardTaskListLtrRegular, iconActive: ClipboardTaskListLtrFilled },
  { path: '/member/one-on-one-prep', label: '1:1 Prep', icon: ChatSparkleRegular, iconActive: ChatSparkleFilled },
  { path: '/member/settings', label: 'Settings', icon: SettingsRegular, iconActive: SettingsFilled },
];

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const s = useStyles();
  const { role, userName, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = role === 'team-lead' ? leadNavItems : memberNavItems;

  return (
    <div className={s.root}>
      {/* ── Office 365 Command Bar ── */}
      <header className={s.commandBar}>
        <div className={s.commandBarLeft}>
          <button className={s.wafflBtn} aria-label="App launcher">
            <GridRegular style={{ fontSize: 20 }} />
          </button>
          <span className={s.appName}>LogIQ</span>
        </div>
        <div className={s.commandBarRight}>
          <div className={s.userPill}>
            <Avatar name={userName} size={24} color="colorful" />
            <span>{userName}</span>
          </div>
          <Tooltip content="Sign out" relationship="label">
            <button
              className={s.signOutBtn}
              onClick={() => { logout(); navigate('/'); }}
              aria-label="Sign out"
            >
              <SignOutRegular style={{ fontSize: 16 }} />
            </button>
          </Tooltip>
        </div>
      </header>

      <div className={s.body}>
        {/* ── Left Navigation ── */}
        <aside className={mergeClasses(s.sidebar, collapsed ? s.sidebarCollapsed : s.sidebarExpanded)}>
          {!collapsed && (
            <div className={s.sectionLabel}>
              {role === 'team-lead' ? 'Team Lead' : 'Team Member'}
            </div>
          )}

          <nav className={s.navSection}>
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              const Icon = isActive ? item.iconActive : item.icon;
              const link = (
                <Link
                  key={item.path}
                  to={item.path}
                  className={mergeClasses(s.navItem, isActive && s.navItemActive)}
                >
                  <Icon className={s.navIcon} />
                  {!collapsed && <span>{item.label}</span>}
                  {item.badge && !collapsed && (
                    <Badge size="small" appearance="filled" color="danger" className={s.navBadge}>
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );

              return collapsed ? (
                <Tooltip key={item.path} content={item.label} relationship="label" positioning="after">
                  {link}
                </Tooltip>
              ) : link;
            })}
          </nav>

          <div className={s.bottomNav}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={s.collapseBtn}
              style={{ width: '100%' }}
              aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            >
              <NavigationRegular style={{ fontSize: 18 }} />
            </button>
          </div>
        </aside>

        {/* ── Content Canvas ── */}
        <main className={s.main}>
          <div className={s.mainContent}>
            {children}
          </div>
        </main>
      </div>

      <FloatingCopilot />
    </div>
  );
};

export default AppShell;