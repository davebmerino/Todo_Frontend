const priorityVariants = {
  high: {
    label: "High",
    className: "border-red-200 bg-red-100 text-red-700",
  },

  moderate: {
    label: "Moderate",
    className: "border-amber-200 bg-amber-100 text-amber-700",
  },

  low: {
    label: "Low",
    className: "border-primary-200 bg-primary-100 text-primary-800",
  },
};

function TaskBadge({ variant }) {
  const selectedPriority = priorityVariants[variant] ?? priorityVariants.low;

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${selectedPriority.className}`}>
      {selectedPriority.label}
    </span>
  );
}

export default TaskBadge;
