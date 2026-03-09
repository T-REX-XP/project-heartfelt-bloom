import { useNavigate } from 'react-router-dom';
import { makeStyles, tokens, shorthands, Text } from '@fluentui/react-components';
import { FlashRegular, PeopleRegular, PersonRegular, ChevronLeftRegular } from '@fluentui/react-icons';
import { useAuth } from '@/store/AuthContext';
import type { Role } from '@/domain/types';

const useStyles = makeStyles({
  page: {
    minHeight: '100vh', backgroundColor: tokens.colorNeutralBackground3,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative' as const,
  },
  back: {
    position: 'absolute' as const, top: '24px', left: '24px',
    display: 'flex', alignItems: 'center', ...shorthands.gap('4px'),
    color: tokens.colorNeutralForeground3, cursor: 'pointer',
    fontSize: '13px', textDecoration: 'none',
    ':hover': { color: tokens.colorNeutralForeground1 },
    backgroundColor: 'transparent', ...shorthands.border('none'),
  },
  content: { textAlign: 'center' as const, maxWidth: '640px', ...shorthands.padding('0', '24px') },
  logoRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', ...shorthands.gap('8px'), marginBottom: '32px' },
  logoIcon: {
    width: '36px', height: '36px', ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorBrandBackground,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', ...shorthands.gap('24px'), marginTop: '48px' },
  roleCard: {
    ...shorthands.padding('32px'),
    ...shorthands.borderRadius('12px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    cursor: 'pointer', textAlign: 'left' as const,
    transition: 'all 150ms ease',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
      boxShadow: tokens.shadow8,
    },
  },
  roleIcon: {
    width: '48px', height: '48px', ...shorthands.borderRadius('12px'),
    backgroundColor: tokens.colorBrandBackground,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: tokens.colorNeutralForegroundOnBrand,
    marginBottom: '16px',
  },
});

const roles: { role: Role; label: string; desc: string; icon: React.ElementType; path: string }[] = [
  { role: 'team-lead', label: 'Team Lead', desc: 'View team dashboards, signals, risks, and prepare for 1:1s with AI copilot assistance.', icon: PeopleRegular, path: '/lead/dashboard' },
  { role: 'team-member', label: 'Team Member', desc: 'Track your growth, receive private coaching, manage your development plan, and prepare for 1:1s.', icon: PersonRegular, path: '/member/dashboard' },
];

const LoginPage = () => {
  const s = useStyles();
  const { login } = useAuth();
  const navigate = useNavigate();

  const select = (r: typeof roles[0]) => { login(r.role); navigate(r.path); };

  return (
    <div className={s.page}>
      <button onClick={() => navigate('/')} className={s.back}>
        <ChevronLeftRegular /> Back
      </button>
      <div className={s.content}>
        <div className={s.logoRow}>
          <div className={s.logoIcon}><FlashRegular style={{ fontSize: 18 }} /></div>
          <Text size={600} weight="bold">LogIQ</Text>
        </div>
        <Text size={700} weight="bold" block>Choose Your Role</Text>
        <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>Select a role to enter the platform.</Text>
        <div className={s.grid}>
          {roles.map(r => (
            <div key={r.role} className={s.roleCard} onClick={() => select(r)}>
              <div className={s.roleIcon}><r.icon style={{ fontSize: 24 }} /></div>
              <Text size={400} weight="bold" block style={{ marginBottom: 8 }}>{r.label}</Text>
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{r.desc}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
