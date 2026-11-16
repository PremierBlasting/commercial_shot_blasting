import { cn } from "@/lib/utils";
import { isStaleDynamicImportError, recoverFromStaleDynamicImport } from "@/lib/dynamicImportRecovery";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";
import { useRouteMetadataInput } from "./RouteMetadataOwner";

function ErrorMetadataReporter({ staleModule }: { staleModule: boolean }) {
  useRouteMetadataInput({
    state: "render-error",
    title: staleModule ? "We’re loading the latest version of this page." : "An unexpected error occurred.",
  });
  return null;
}

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    recoverFromStaleDynamicImport(error);
  }

  render() {
    if (this.state.hasError) {
      const isStaleModule = isStaleDynamicImportError(this.state.error);

      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-background">
          <ErrorMetadataReporter staleModule={isStaleModule} />
          <div className="flex flex-col items-center w-full max-w-2xl p-8">
            <AlertTriangle
              size={48}
              className="text-destructive mb-6 flex-shrink-0"
            />

            <h2 className="text-xl mb-4">
              {isStaleModule ? "We’re loading the latest version of this page." : "An unexpected error occurred."}
            </h2>

            {isStaleModule ? (
              <p className="mb-6 max-w-md text-center text-sm text-muted-foreground">
                This can happen while the site is being updated. We’ll refresh this page automatically.
              </p>
            ) : (
              <div className="p-4 w-full rounded bg-muted overflow-auto mb-6">
                <pre className="text-sm text-muted-foreground whitespace-break-spaces">
                  {this.state.error?.stack}
                </pre>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-primary text-primary-foreground",
                "hover:opacity-90 cursor-pointer"
              )}
            >
              <RotateCcw size={16} />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
