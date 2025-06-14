
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NoAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

export function NoAccountDialog({ open, onOpenChange, email }: NoAccountDialogProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>No account found</DialogTitle>
          <DialogDescription>
            The email <span className="font-semibold">{email}</span> is not registered yet.<br />
            Would you like to create an account?
          </DialogDescription>
        </DialogHeader>
        <Button
          className="w-full mt-2"
          onClick={() => {
            onOpenChange(false);
            navigate("/signup", { state: { email } });
          }}
        >
          Sign Up
        </Button>
      </DialogContent>
    </Dialog>
  );
}
