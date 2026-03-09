/**
 * QueryWrapper
 * 
 * Reusable component that handles loading, error, and empty states
 * for any React Query result. Keeps pages clean and consistent.
 * 
 * Usage:
 *   const query = useEmployees();
 *   <QueryWrapper query={query}>
 *     {(data) => <EmployeeList employees={data} />}
 *   </QueryWrapper>
 */

import type { UseQueryResult } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface QueryWrapperProps<T> {
  query: UseQueryResult<T, Error>;
  children: (data: T) => React.ReactNode;
  /** Custom loading skeleton. Defaults to pulse skeleton rows. */
  loadingFallback?: React.ReactNode;
  /** Number of skeleton rows when using default loading. */
  skeletonRows?: number;
  /** Show empty state when data is an empty array. */
  emptyMessage?: string;
}

export function QueryWrapper<T>({
  query,
  children,
  loadingFallback,
  skeletonRows = 3,
  emptyMessage = 'No data available.',
}: QueryWrapperProps<T>) {
  const { data, isLoading, isError, error, refetch, isFetching } = query;

  if (isLoading) {
    return loadingFallback ?? <DefaultLoadingSkeleton rows={skeletonRows} />;
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-8 flex flex-col items-center gap-4 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-destructive" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Something went wrong</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            {error?.message ?? 'An unexpected error occurred. Please try again.'}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="gap-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
          Retry
        </Button>
      </motion.div>
    );
  }

  // Empty state for arrays
  if (Array.isArray(data) && data.length === 0 && emptyMessage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-xl p-8 flex flex-col items-center gap-3 text-center"
      >
        <Inbox className="w-10 h-10 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </motion.div>
    );
  }

  if (!data) return null;

  return <>{children(data)}</>;
}

function DefaultLoadingSkeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="glass rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  );
}

export default QueryWrapper;
