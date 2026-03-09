import { makeStyles, tokens, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center',
    backgroundColor: tokens.colorNeutralBackground1, textAlign: 'center' as const,
  },
});

const Index = () => {
  const s = useStyles();
  return (
    <div className={s.root}>
      <div>
        <Text size={800} weight="bold" block style={{ marginBottom: 16 }}>Welcome to LogIQ</Text>
        <Text size={400} style={{ color: tokens.colorNeutralForeground3 }}>Intelligence for High-Performing Teams</Text>
      </div>
    </div>
  );
};

export default Index;
