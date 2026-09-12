function StatCard({ icon: Icon, label, value, progress }) {
  return (
    <div className="glass-primary rounded-2xl border border-border bg-surface p-6">
      <div className=" items-center justify-center gap-3">
        <div className="flex  h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/40 text-text-primary text-center">
          <Icon className="h-5 w-5 " aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-semibold text-text-primary">{value}</p>
          <p className="truncate text-xs text-text-muted">{label}</p>
        </div>
      </div>

      {typeof progress === "number" && (
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}>
          <div
            className="h-full rounded-full bg-success transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default StatCard;
