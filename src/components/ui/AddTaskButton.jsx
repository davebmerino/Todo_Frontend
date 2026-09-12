import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function AddTaskButton({ onClick, label, className }) {
  return (
    <>
      <Button
        className={`${className}  hidden : md:flex`}
        type="button"
        onClick={onClick}>
        <Plus className="size-4" />
        {label}
      </Button>
    </>
  );
}

export default AddTaskButton;
