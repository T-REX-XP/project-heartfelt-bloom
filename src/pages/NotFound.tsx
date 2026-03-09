import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { makeStyles, tokens, shorthands, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center',
    backgroundColor: tokens.colorNeutralBackground3, textAlign: 'center' as const,
  },
});

const NotFound = () => {
  const s = useStyles();
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className={s.root}>
      <div>
        <Text size={900} weight="bold" block style={{ marginBottom: 16 }}>404</Text>
        <Text size={400} style={{ color: tokens.colorNeutralForeground3, marginBottom: 16 }} block>Oops! Page not found</Text>
        <a href="/" style={{ color: tokens.colorBrandForeground1, textDecoration: 'underline' }}>Return to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
