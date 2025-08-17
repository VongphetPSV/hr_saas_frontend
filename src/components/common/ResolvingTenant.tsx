import { FC } from 'react';

const ResolvingTenant: FC = () => {
  return (
    <div className="min-h-screen grid place-items-center text-slate-600">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-transparent" />
        <span>Preparing your workspace…</span>
      </div>
    </div>
  );
};

export default ResolvingTenant;