import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitDonation } from "../hooks/useQueries";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultAmount?: number;
}

const PRESET_AMOUNTS = [1000, 5000, 25000];

export function DonationModal({
  open,
  onOpenChange,
  defaultAmount,
}: DonationModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(defaultAmount?.toString() ?? "");
  const [pan, setPan] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const { mutateAsync, isPending } = useSubmitDonation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !amount) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync({
        donorName: name,
        phone,
        email,
        amount: BigInt(Math.round(Number.parseFloat(amount))),
        panNumber: pan,
        message,
      });
      setSuccess(true);
    } catch {
      toast.error("Failed to submit donation. Please try again.");
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setSuccess(false);
      setName("");
      setPhone("");
      setEmail("");
      setAmount("");
      setPan("");
      setMessage("");
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg bg-card border-border"
        data-ocid="donation.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-bsa-text flex items-center gap-2">
            <Heart className="text-bsa-orange w-6 h-6" />
            Make a Donation
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="text-center py-8" data-ocid="donation.success_state">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-bsa-text mb-2">
              Thank You!
            </h3>
            <p className="text-muted-foreground">
              Your generous donation has been received. BSA is grateful for your
              support in preserving our cultural heritage.
            </p>
            <Button
              className="mt-6 bsa-btn-orange"
              onClick={() => handleClose(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="donor-name"
                  className="text-bsa-text font-semibold"
                >
                  Full Name *
                </Label>
                <Input
                  id="donor-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  data-ocid="donation.input"
                />
              </div>
              <div>
                <Label
                  htmlFor="donor-phone"
                  className="text-bsa-text font-semibold"
                >
                  Phone *
                </Label>
                <Input
                  id="donor-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="donor-email"
                className="text-bsa-text font-semibold"
              >
                Email *
              </Label>
              <Input
                id="donor-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <Label className="text-bsa-text font-semibold">
                Donation Amount (₹) *
              </Label>
              <div className="flex gap-2 mt-1 flex-wrap">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className={`px-4 py-2 rounded-lg border-2 font-bold text-sm transition-all ${
                      amount === preset.toString()
                        ? "border-bsa-orange bg-bsa-orange text-white"
                        : "border-border text-bsa-text hover:border-bsa-orange"
                    }`}
                  >
                    ₹{preset.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
              <Input
                className="mt-2"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Or enter custom amount"
                min="1"
                required
                data-ocid="donation.textarea"
              />
            </div>

            <div>
              <Label
                htmlFor="donor-pan"
                className="text-bsa-text font-semibold"
              >
                PAN Number (Optional)
              </Label>
              <Input
                id="donor-pan"
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                placeholder="ABCDE1234F"
                maxLength={10}
              />
            </div>

            <div>
              <Label
                htmlFor="donor-msg"
                className="text-bsa-text font-semibold"
              >
                Message (Optional)
              </Label>
              <Textarea
                id="donor-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A message for the BSA community..."
                rows={2}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleClose(false)}
                className="flex-1"
                data-ocid="donation.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-bsa-orange hover:bg-bsa-orange-dark text-white font-bold"
                data-ocid="donation.submit_button"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isPending ? "Submitting..." : "Donate Now"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
