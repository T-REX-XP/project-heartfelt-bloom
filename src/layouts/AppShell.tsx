import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import { makeStyles, tokens, shorthands, mergeClasses, Badge, Tooltip, Avatar } from '@fluentui/react-components';
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
  DocumentBulletListRegular, DocumentBulletListFilled,
  BookRegular, BookFilled,
  PersonRegular, PersonFilled,
  ClipboardTaskListLtrRegular, ClipboardTaskListLtrFilled,
} from '@fluentui/react-icons';
import FloatingCopilot from '@/components/FloatingCopilot';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground3,
  },
  sidebar: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    transition: 'width 200ms ease',
    overflow: 'hidden',
    flexShrink: 0,
  },
  sidebarExpanded: { width: '260px' },
  sidebarCollapsed: { width: '56px' },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    ...shorthands.padding('16px', '16px'),
    height: '56px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorBrandBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightBold,
    fontSize: '14px',
    flexShrink: 0,
  },
  logoText: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground1,
    whiteSpace: 'nowrap',
  },
  roleArea: {
    ...shorthands.padding('12px', '16px'),
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  roleLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  userName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginTop: '2px',
  },
  nav: {
    flex: 1,
    overflowY: 'auto',
    ...shorthands.padding('8px'),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('2px'),
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    ...shorthands.padding('10px', '12px'),
    ...shorthands.borderRadius('8px'),
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    whiteSpace: 'nowrap',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  navItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
      color: tokens.colorBrandForeground1,
    },
  },
  navIcon: {
    fontSize: '20px',
    flexShrink: 0,
  },
  navBadge: {
    marginLeft: 'auto',
  },
  bottomSection: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    ...shorthands.padding('8px'),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('2px'),
    flexShrink: 0,
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: tokens.colorNeutralBackground3,
  },
  mainContent: {
    ...shorthands.padding('24px', '32px'),
    maxWidth: '1600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

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
  const styles = useStyles();
  const { role, userName, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = role === 'team-lead' ? leadNavItems : memberNavItems;

  return (
    <div className={styles.root}>
      <aside className={mergeClasses(styles.sidebar, collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded)}>
        {/* Logo */}
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>L</div>
          {!collapsed && <span className={styles.logoText}>LogIQ</span>}
        </div>

        {/* Role badge */}
        {!collapsed && (
          <div className={styles.roleArea}>
            <div className={styles.roleLabel}>
              {role === 'team-lead' ? 'Team Lead' : 'Team Member'}
            </div>
            <div className={styles.userName}>{userName}</div>
          </div>
        )}

        {/* Nav */}
        <nav className={styles.nav}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = isActive ? item.iconActive : item.icon;
            const navLink = (
              <Link
                key={item.path}
                to={item.path}
                className={mergeClasses(styles.navItem, isActive && styles.navItemActive)}
              >
                <Icon className={styles.navIcon} />
                {!collapsed && <span>{item.label}</span>}
                {item.badge && !collapsed && (
                  <Badge
                    size="small"
                    appearance="filled"
                    color="danger"
                    className={styles.navBadge}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.path} content={item.label} relationship="label" positioning="after">
                  {navLink}
                </Tooltip>
              );
            }
            return navLink;
          })}
        </nav>

        {/* Bottom */}
        <div className={styles.bottomSection}>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className={styles.navItem}
          >
            <SignOutRegular className={styles.navIcon} />
            {!collapsed && <span>Sign Out</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={styles.navItem}
            style={{ justifyContent: 'center' }}
          >
            <NavigationRegular className={styles.navIcon} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.mainContent}>
          {children}
        </div>
      </main>

      <FloatingCopilot />
    </div>
  );
};

export default AppShell;
