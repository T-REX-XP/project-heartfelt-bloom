import { makeStyles, tokens, shorthands, Text } from '@fluentui/react-components';
import { SettingsRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', ...shorthands.gap('24px') },
  empty: {
    ...shorthands.padding('48px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    textAlign: 'center' as const,
  },
});

const SettingsPage = () => {
  const s = useStyles();
  return (
    <div className={s.root}>
      <div>
        <Text size={600} weight="bold" block>Settings</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Manage your preferences and account</Text>
      </div>
      <div className={s.empty}>
        <SettingsRegular style={{ fontSize: 48, color: tokens.colorNeutralForeground4, marginBottom: 16 }} />
        <Text size={400} weight="semibold" block style={{ marginBottom: 8 }}>Settings Coming Soon</Text>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Account preferences, notifications, and integrations will be available here.</Text>
      </div>
    </div>
  );
};

export default SettingsPage;
