function PageHeader({ title, subtitle, action }) {
  return (
    <div className="hidden mb-6 md:flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export default PageHeader;
