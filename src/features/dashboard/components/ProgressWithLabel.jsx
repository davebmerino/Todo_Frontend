import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

export function ProgressWithLabel({ label, value, progress }) {
  return (
    <Progress value={value} className="w-full">
      <ProgressLabel>{label}</ProgressLabel>
      <ProgressValue className="w-full" />
    </Progress>
  );
}
