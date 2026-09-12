function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border bg-surface px-6 py-12 text-center">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-text-muted">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        {description && (
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export default EmptyState;
