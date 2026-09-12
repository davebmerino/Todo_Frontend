// import { STATUS_META } from "@/features/tasks/utils/taskConstants";

const TONE_CLASSES = {
  muted: "bg-brand-200/50 text-text-muted",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
  accent: "bg-accent-gold/15 text-brand-600",
};

function StatusBadge({ status }) {
  // const meta = STATUS_META[status];
  if (!meta) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[meta.tone]}`}>
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
      {meta.label}
    </span>
  );
}

export default StatusBadge;
