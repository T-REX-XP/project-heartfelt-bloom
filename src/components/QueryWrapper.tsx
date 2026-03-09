import { makeStyles, tokens, shorthands, mergeClasses, Card, CardHeader, Body1, Caption1, Spinner, Button } from '@fluentui/react-components';
import { ErrorCircleRegular, ArrowClockwiseRegular, BoxRegular } from '@fluentui/react-icons';
import type { UseQueryResult } from '@tanstack/react-query';

const useStyles = makeStyles({
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.gap('16px'),
    ...shorthands.padding('32px'),
    textAlign: 'center',
  },
  skeleton: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('12px'),
  },
  skeletonRow: {
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius('8px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
  },
  bar: {
    height: '12px',
    ...shorthands.borderRadius('4px'),
    backgroundColor: tokens.colorNeutralBackground4,
  },
  barShort: { width: '40%' },
  barMed: { width: '60%' },
  barFull: { width: '100%' },
});

interface QueryWrapperProps<T> {
  query: UseQueryResult<T, Error>;
  children: (data: T) => React.ReactNode;
  loadingFallback?: React.ReactNode;
  skeletonRows?: number;
  emptyMessage?: string;
}

export function QueryWrapper<T>({ query, children, loadingFallback, skeletonRows = 3, emptyMessage = 'No data available.' }: QueryWrapperProps<T>) {
  const styles = useStyles();
  const { data, isLoading, isError, error, refetch, isFetching } = query;

  if (isLoading) {
    return loadingFallback ?? (
      <div className={styles.skeleton}>
        {Array.from({ length: skeletonRows }, (_, i) => (
          <div key={i} className={styles.skeletonRow}>
            <div className={mergeClasses(styles.bar, styles.barShort)} style={{ marginBottom: 8 }} />
            <div className={mergeClasses(styles.bar, styles.barFull)} />
            <div className={mergeClasses(styles.bar, styles.barMed)} style={{ marginTop: 8 }} />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Card className={styles.center}>
        <ErrorCircleRegular style={{ fontSize: 32, color: tokens.colorPaletteRedForeground1 }} />
        <Body1>Something went wrong</Body1>
        <Caption1>{error?.message ?? 'An unexpected error occurred.'}</Caption1>
        <Button icon={<ArrowClockwiseRegular />} appearance="outline" onClick={() => refetch()} disabled={isFetching}>
          Retry
        </Button>
      </Card>
    );
  }

  if (Array.isArray(data) && data.length === 0 && emptyMessage) {
    return (
      <Card className={styles.center}>
        <BoxRegular style={{ fontSize: 32, color: tokens.colorNeutralForeground4 }} />
        <Caption1>{emptyMessage}</Caption1>
      </Card>
    );
  }

  if (!data) return null;
  return <>{children(data)}</>;
}

export default QueryWrapper;
