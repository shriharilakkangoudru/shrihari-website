import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const STYLES = {
  success: { Icon: CheckCircle2, text: 'text-emerald-500' },
  error: { Icon: XCircle, text: 'text-rose-500' },
  info: { Icon: Info, text: 'text-sky-500' },
};

export default function Toasts() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-3 px-4 sm:px-0">
      {toasts.map((t) => {
        const { Icon, text } = STYLES[t.type] || STYLES.info;
        return (
          <div
            key={t.id}
            className="animate-toast-in pointer-events-auto flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
          >
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${text}`} />
            <p className="flex-1 text-sm font-medium text-slate-700">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 text-slate-400 transition hover:text-slate-600"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}