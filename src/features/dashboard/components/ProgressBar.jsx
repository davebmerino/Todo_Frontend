function ProgressBar({ label, value = 0, displayValue, className = "" }) {
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-text-primary">{label}</p>

        <p className="text-sm font-semibold text-primary-700">
          {displayValue ?? `${safeValue}%`}
        </p>
      </div>

      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-primary-100"
        role="progressbar"
        aria-label={label}
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}>
        <div
          className="h-full rounded-full bg-primary-700 transition-[width] duration-500 ease-out"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
