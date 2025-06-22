import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface ChipProps {
  value: number | string;
  label: string;
  onClose?: (value: number | string) => void;
}

export const Chip = ({ value, label, onClose }: ChipProps) => {
  return (
    <Badge key={value}>
      {label}
      {onClose && (
        <Button
          variant="ghost"
          className="size-6"
          onClick={() => onClose(value)}
        >
          <XIcon />
        </Button>
      )}
    </Badge>
  );
};
