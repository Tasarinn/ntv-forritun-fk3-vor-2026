import { Component, type ErrorInfo, type ReactNode } from 'react';
import { logger } from '@/shared/lib/logger';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error('React ErrorBoundary caught a render error', {
      error,
      componentStack: info.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded border border-red-400 bg-red-100 p-4 text-red-800">
          <h2 className="font-bold">Something went wrong.</h2>
          <p className="mt-2">This page crashed during render.</p>
        </div>
      );
    }

    return this.props.children;
  }
}