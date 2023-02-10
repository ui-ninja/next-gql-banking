/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactElement } from "react";

type ErrorBoundaryProps = {
  onError?: (x: unknown, y: unknown) => void;
  FallbackComponent: FC<any>;
  children: ReactElement;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { error: any }
> {
  constructor(props: ErrorBoundaryProps | Readonly<ErrorBoundaryProps>) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    const { onError } = this.props;
    onError?.(error, info);
  }

  resetErrorBoundary = () => {
    this.reset();
  };

  reset() {
    this.setState({ error: null });
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
      }
      throw new Error(
        "<ErrorBoundary /> component requires a `FallbackComponent` prop"
      );
    }

    return children;
  }
}

export default ErrorBoundary;
