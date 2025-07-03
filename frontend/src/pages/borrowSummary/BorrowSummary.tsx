import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BorrowSummary = () => {
  return (
    <div className="mt-20">
      Borrow Summary
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
};

export default BorrowSummary;
