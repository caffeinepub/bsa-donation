import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building2, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SponsorshipTier, useSubmitSponsorship } from "../hooks/useQueries";

interface SponsorshipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTier?: SponsorshipTier;
}

export function SponsorshipModal({
  open,
  onOpenChange,
  defaultTier,
}: SponsorshipModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<SponsorshipTier>(
    defaultTier ?? SponsorshipTier.silver,
  );
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const { mutateAsync, isPending } = useSubmitSponsorship();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !designation || !phone || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutateAsync({
        companyName,
        contactPerson,
        designation,
        phone,
        email,
        tier,
        message: message || "",
      } as any);
      setSuccess(true);
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setSuccess(false);
      setCompanyName("");
      setContactPerson("");
      setDesignation("");
      setPhone("");
      setEmail("");
      setMessage("");
      setTier(defaultTier ?? SponsorshipTier.silver);
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg bg-card border-border"
        data-ocid="sponsorship.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-bsa-text flex items-center gap-2">
            <Building2 className="text-bsa-gold w-6 h-6" />
            Corporate Sponsorship
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div
            className="text-center py-8"
            data-ocid="sponsorship.success_state"
          >
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-bsa-text mb-2">
              Thank You!
            </h3>
            <p className="text-muted-foreground">
              Your sponsorship interest has been received. Our team will contact
              you shortly to finalize the details.
            </p>
            <Button
              className="mt-6 bg-bsa-orange hover:bg-bsa-orange-dark text-white font-bold"
              onClick={() => handleClose(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="company-name"
                className="text-bsa-text font-semibold"
              >
                Company Name *
              </Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your Company Pvt. Ltd."
                required
                data-ocid="sponsorship.input"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="contact-person"
                  className="text-bsa-text font-semibold"
                >
                  Contact Person *
                </Label>
                <Input
                  id="contact-person"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="designation"
                  className="text-bsa-text font-semibold"
                >
                  Designation *
                </Label>
                <Input
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="CEO / Manager"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="sponsor-phone"
                  className="text-bsa-text font-semibold"
                >
                  Phone *
                </Label>
                <Input
                  id="sponsor-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="sponsor-email"
                  className="text-bsa-text font-semibold"
                >
                  Email *
                </Label>
                <Input
                  id="sponsor-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-bsa-text font-semibold">
                Sponsorship Tier *
              </Label>
              <Select
                value={tier}
                onValueChange={(v) => setTier(v as SponsorshipTier)}
              >
                <SelectTrigger data-ocid="sponsorship.select">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SponsorshipTier.gold}>
                    🥇 Gold — ₹1,00,000+
                  </SelectItem>
                  <SelectItem value={SponsorshipTier.silver}>
                    🥈 Silver — ₹50,000+
                  </SelectItem>
                  <SelectItem value={SponsorshipTier.bronze}>
                    🥉 Bronze — ₹25,000+
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="sponsor-msg"
                className="text-bsa-text font-semibold"
              >
                Message (Optional)
              </Label>
              <Textarea
                id="sponsor-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Any additional details or requirements..."
                rows={2}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleClose(false)}
                className="flex-1"
                data-ocid="sponsorship.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-bsa-orange hover:bg-bsa-orange-dark text-white font-bold"
                data-ocid="sponsorship.submit_button"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isPending ? "Submitting..." : "Submit Interest"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
