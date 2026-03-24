import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Download,
  Loader2,
  LogIn,
  LogOut,
  Mail,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Donation, Sponsorship } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllDonations,
  useAllSponsorships,
  useIsAdmin,
  useNotificationEmail,
  useUpdateNotificationEmail,
} from "../hooks/useQueries";
import { SponsorshipTier } from "../hooks/useQueries";
import { formatDate, formatIndianAmount } from "../lib/formatIndian";

function exportCSV(filename: string, headers: string[], rows: string[][]) {
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","),
    ),
  ].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const { login, clear, isLoggingIn, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: donations = [], isLoading: donLoading } = useAllDonations();
  const { data: sponsorships = [], isLoading: sponLoading } =
    useAllSponsorships();
  const { data: notifEmail = "" } = useNotificationEmail();
  const { mutateAsync: updateEmail, isPending: emailPending } =
    useUpdateNotificationEmail();
  const [emailInput, setEmailInput] = useState("");

  const totalDonations = donations.reduce(
    (sum, d) => sum + Number(d.amount),
    0,
  );
  const isLoggedIn = !!identity;

  const handleEmailSave = async () => {
    if (!emailInput) return;
    try {
      await updateEmail(emailInput);
      toast.success("Notification email updated!");
      setEmailInput("");
    } catch {
      toast.error("Failed to update email.");
    }
  };

  const exportDonations = () => {
    exportCSV(
      "bsa_donations.csv",
      [
        "Donor Name",
        "Phone",
        "Email",
        "Amount (INR)",
        "PAN Number",
        "Message",
        "Date",
      ],
      donations.map((d: Donation) => [
        d.donorName,
        d.phone,
        d.email,
        Number(d.amount).toString(),
        d.panNumber,
        d.message,
        formatDate(d.timestamp),
      ]),
    );
  };

  const exportSponsorships = () => {
    exportCSV(
      "bsa_sponsorships.csv",
      [
        "Company Name",
        "Contact Person",
        "Designation",
        "Phone",
        "Email",
        "Tier",
        "Date",
      ],
      sponsorships.map((s: Sponsorship) => [
        s.companyName,
        s.contactPerson,
        s.designation,
        s.phone,
        s.email,
        s.tier,
        formatDate(s.timestamp),
      ]),
    );
  };

  const tierBadgeClass = (tier: SponsorshipTier) => {
    if (tier === SponsorshipTier.gold)
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (tier === SponsorshipTier.silver)
      return "bg-gray-100 text-gray-700 border-gray-300";
    return "bg-amber-100 text-amber-800 border-amber-300";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-bsa-green text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/bsa-logo-transparent.dim_400x400.png"
            alt="BSA"
            className="w-10 h-10 object-contain"
          />
          <div>
            <div className="font-serif font-bold text-lg">
              BSA Admin Dashboard
            </div>
            <div className="text-xs text-white/70">
              Bhoirwadi Sanskriti Association
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            ← Back to Site
          </a>
          {isLoggedIn ? (
            <Button
              onClick={clear}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10"
              data-ocid="admin.close_button"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          ) : (
            <Button
              onClick={login}
              disabled={isLoggingIn}
              size="sm"
              className="bg-bsa-orange hover:bg-bsa-orange-dark text-white"
              data-ocid="admin.primary_button"
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : (
                <LogIn className="w-4 h-4 mr-1" />
              )}
              Login
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
            data-ocid="admin.panel"
          >
            <Shield className="w-16 h-16 text-bsa-orange mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-bold text-bsa-text mb-2">
              Admin Access Required
            </h2>
            <p className="text-muted-foreground mb-6">
              Please log in with Internet Identity to access the admin
              dashboard.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="bg-bsa-orange hover:bg-bsa-orange-dark text-white font-bold px-8 py-3"
              data-ocid="admin.submit_button"
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <LogIn className="w-4 h-4 mr-2" />
              )}
              Login with Internet Identity
            </Button>
          </motion.div>
        ) : adminLoading ? (
          <div className="text-center py-24" data-ocid="admin.loading_state">
            <Loader2 className="w-10 h-10 animate-spin text-bsa-orange mx-auto" />
            <p className="mt-3 text-muted-foreground">Verifying access...</p>
          </div>
        ) : !isAdmin ? (
          <div className="text-center py-24" data-ocid="admin.error_state">
            <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-bold text-bsa-text mb-2">
              Access Denied
            </h2>
            <p className="text-muted-foreground">
              You do not have admin privileges.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bsa-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-bsa-orange/15 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-bsa-orange" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Total Donations
                  </div>
                  <div className="font-bold text-xl text-bsa-text">
                    {formatIndianAmount(totalDonations)}
                  </div>
                </div>
              </div>
              <div className="bsa-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-bsa-green/15 flex items-center justify-center">
                  <Users className="w-6 h-6 text-bsa-green" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Total Donors
                  </div>
                  <div className="font-bold text-xl text-bsa-text">
                    {donations.length}
                  </div>
                </div>
              </div>
              <div className="bsa-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-bsa-gold/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-bsa-gold" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Sponsorships
                  </div>
                  <div className="font-bold text-xl text-bsa-text">
                    {sponsorships.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Email */}
            <div className="bsa-card p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-bsa-orange" />
                <h3 className="font-serif font-bold text-lg text-bsa-text">
                  Notification Email
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Receive donor and sponsor details at this email address.
                {notifEmail && (
                  <span className="font-medium text-bsa-text">
                    {" "}
                    Current: {notifEmail}
                  </span>
                )}
              </p>
              <div className="flex gap-3">
                <Input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@bhoirwadibsa.org"
                  className="max-w-sm"
                  data-ocid="admin.input"
                />
                <Button
                  onClick={handleEmailSave}
                  disabled={emailPending || !emailInput}
                  className="bg-bsa-orange hover:bg-bsa-orange-dark text-white font-bold"
                  data-ocid="admin.save_button"
                >
                  {emailPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : null}
                  Save Email
                </Button>
              </div>
            </div>

            {/* Tables */}
            <Tabs defaultValue="donors" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="donors" data-ocid="admin.tab">
                  <Users className="w-4 h-4 mr-1" /> Donors ({donations.length})
                </TabsTrigger>
                <TabsTrigger value="sponsors" data-ocid="admin.tab">
                  <Building2 className="w-4 h-4 mr-1" /> Sponsors (
                  {sponsorships.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="donors">
                <div className="bsa-card overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="font-serif font-bold text-bsa-text">
                      All Donors
                    </h3>
                    <Button
                      onClick={exportDonations}
                      variant="outline"
                      size="sm"
                      className="text-bsa-green border-bsa-green hover:bg-bsa-green hover:text-white"
                      data-ocid="admin.primary_button"
                    >
                      <Download className="w-4 h-4 mr-1" /> Export CSV
                    </Button>
                  </div>
                  {donLoading ? (
                    <div
                      className="text-center py-12"
                      data-ocid="admin.loading_state"
                    >
                      <Loader2 className="w-8 h-8 animate-spin text-bsa-orange mx-auto" />
                    </div>
                  ) : donations.length === 0 ? (
                    <div
                      className="text-center py-12 text-muted-foreground"
                      data-ocid="admin.empty_state"
                    >
                      No donations yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table data-ocid="admin.table">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>PAN</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {donations.map((d: Donation) => (
                            <TableRow
                              key={d.email + d.donorName}
                              data-ocid={"admin.row"}
                            >
                              <TableCell className="font-medium">
                                {d.donorName}
                              </TableCell>
                              <TableCell>{d.phone}</TableCell>
                              <TableCell>{d.email}</TableCell>
                              <TableCell className="font-bold text-bsa-orange">
                                {formatIndianAmount(d.amount)}
                              </TableCell>
                              <TableCell>{d.panNumber || "—"}</TableCell>
                              <TableCell className="max-w-[150px] truncate">
                                {d.message || "—"}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {formatDate(d.timestamp)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="sponsors">
                <div className="bsa-card overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="font-serif font-bold text-bsa-text">
                      All Sponsors
                    </h3>
                    <Button
                      onClick={exportSponsorships}
                      variant="outline"
                      size="sm"
                      className="text-bsa-green border-bsa-green hover:bg-bsa-green hover:text-white"
                      data-ocid="admin.secondary_button"
                    >
                      <Download className="w-4 h-4 mr-1" /> Export CSV
                    </Button>
                  </div>
                  {sponLoading ? (
                    <div
                      className="text-center py-12"
                      data-ocid="admin.loading_state"
                    >
                      <Loader2 className="w-8 h-8 animate-spin text-bsa-orange mx-auto" />
                    </div>
                  ) : sponsorships.length === 0 ? (
                    <div
                      className="text-center py-12 text-muted-foreground"
                      data-ocid="admin.empty_state"
                    >
                      No sponsorships yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table data-ocid="admin.table">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Designation</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Tier</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sponsorships.map((s: Sponsorship) => (
                            <TableRow
                              key={s.email + s.companyName}
                              data-ocid={"admin.row"}
                            >
                              <TableCell className="font-medium">
                                {s.companyName}
                              </TableCell>
                              <TableCell>{s.contactPerson}</TableCell>
                              <TableCell>{s.designation}</TableCell>
                              <TableCell>{s.phone}</TableCell>
                              <TableCell>{s.email}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-bold border capitalize ${tierBadgeClass(s.tier)}`}
                                >
                                  {s.tier}
                                </span>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {formatDate(s.timestamp)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </main>
    </div>
  );
}
