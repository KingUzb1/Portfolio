import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || "Kutilmagan xatolik yuz berdi.",
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF9F6] dark:bg-[#09090B] text-[#141413] dark:text-[#F4F4F5]">
          <div className="max-w-md w-full p-7 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#131316] space-y-4">
            <h1 className="font-display text-xl font-bold">Sahifani yuklashda xatolik</h1>
            <p className="text-sm text-[#575652] dark:text-[#A1A1AA] break-words">
              {this.state.errorMessage}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2.5 text-sm font-medium rounded-xl bg-[#D9381E] text-white cursor-pointer"
            >
              Sahifani yangilash
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
