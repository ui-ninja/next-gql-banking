import React, { FC, ReactElement, ReactNode } from 'react';

type ErrorBoundaryProps = {
  onError?: (x: any, y: any) => void;
  FallbackComponent: FC<any>;
  children: ReactElement;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  static getDerivedStateFromError(error: any) {
    return { error };
  }

  state = { error: null };

  resetErrorBoundary = () => {
    this.reset();
  };

  reset() {
    this.setState({ error: null });
  }

  componentDidCatch(error: any, info: any) {
    this.props.onError?.(error, info);
  }

  render() {
    const { error } = this.state;

    const { FallbackComponent, children } = this.props;

    if (error !== null) {
      const props = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };
      if (FallbackComponent) {
        // @ts-ignore
        return <FallbackComponent {...props} />;
      } else {
        throw new Error(
          '<ErrorBoundary /> component requires a `FallbackComponent` prop'
        );
      }
    }

    return children;
  }
}

export default ErrorBoundary;
