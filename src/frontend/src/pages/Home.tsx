import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Star,
  Trophy,
  Twitter,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { DonationModal } from "../components/DonationModal";
import { SponsorshipModal } from "../components/SponsorshipModal";
import { useTopDonors } from "../hooks/useQueries";
import { SponsorshipTier } from "../hooks/useQueries";
import { formatDate, formatIndianAmount } from "../lib/formatIndian";

const _STALL_IMAGES = ["/assets/generated/event-stalls.dim_800x500.jpg"];

const GALLERY_PHOTOS = [
  {
    src: "/assets/uploads/554703151_18412618753119757_9123590075034116988_n-019d1f02-5268-71dd-a68e-43ef97348e97-1.jpg",
    caption: "Festival Setup",
    alt: "Durga Puja decorated tent with idol setup",
  },
  {
    src: "/assets/uploads/598408340_32732156683065540_79337381284878645_n-019d1f02-552b-751e-82b5-8048097e460b-2.jpg",
    caption: "Kanya Puja Celebration",
    alt: "Children in traditional attire at festival",
  },
  {
    src: "/assets/uploads/597015702_32725224183758790_4852499708036167161_n-019d1f02-5681-77c9-bb4b-00009e6ad217-3.jpg",
    caption: "Jai Durga Maa",
    alt: "Beautiful Durga Maa idol - Bhoirwadi Sanskritik Association",
  },
  {
    src: "/assets/generated/event-stalls.dim_800x500.jpg",
    caption: "Annual Cultural Festival",
    alt: "BSA Event Stalls",
  },
];

export default function Home() {
  const [donationOpen, setDonationOpen] = useState(false);
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [defaultDonationAmount, setDefaultDonationAmount] = useState<
    number | undefined
  >();
  const [defaultTier, setDefaultTier] = useState<SponsorshipTier | undefined>();
  const [_carouselIdx, _setCarouselIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const { data: topDonors = [] } = useTopDonors();

  const openDonate = (amount?: number) => {
    setDefaultDonationAmount(amount);
    setDonationOpen(true);
  };

  const openSponsor = (tier?: SponsorshipTier) => {
    setDefaultTier(tier);
    setSponsorOpen(true);
  };

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* TOP UTILITY BAR */}
      <div className="bg-bsa-green text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline font-medium tracking-wide">
            🌸 Bhoirwadi Sanskriti Association — Preserving Culture, Nurturing
            Community
          </span>
          <span className="sm:hidden font-medium">
            BSA Cultural Association
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-white/80">
              Join Our Community:
            </span>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              data-ocid="topbar.link"
            >
              <SiFacebook className="w-3.5 h-3.5 hover:text-bsa-gold transition-colors" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <SiInstagram className="w-3.5 h-3.5 hover:text-bsa-gold transition-colors" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter/X"
            >
              <SiX className="w-3.5 h-3.5 hover:text-bsa-gold transition-colors" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <SiYoutube className="w-3.5 h-3.5 hover:text-bsa-gold transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo + Name */}
          <a href="#hero" className="flex items-center gap-3 group">
            <img
              src="/assets/generated/bsa-logo-transparent.dim_400x400.png"
              alt="BSA Logo"
              className="w-12 h-12 object-contain"
            />
            <div className="leading-tight">
              <div className="font-serif font-bold text-lg text-bsa-text leading-none">
                BSA
              </div>
              <div className="text-xs text-muted-foreground leading-none hidden sm:block">
                Bhoirwadi Sanskriti
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {[
              ["Home", "#hero"],
              ["About", "#about"],
              ["Donate", "#donate"],
              ["Sponsorship", "#sponsorship"],
              ["Events", "#events"],
              ["Festival Dates", "#festival-dates"],
              ["Leaderboard", "#leaderboard"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-semibold text-bsa-text hover:text-bsa-orange transition-colors"
                data-ocid={"nav.link"}
              >
                {label}
              </a>
            ))}
            <a
              href="/admin"
              className="text-sm font-semibold text-bsa-text hover:text-bsa-orange transition-colors"
            >
              Admin
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => openDonate()}
              className="bg-bsa-orange hover:bg-bsa-orange-dark text-white font-bold text-sm px-5"
              data-ocid="nav.primary_button"
            >
              Donate Now
            </Button>
            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setNavOpen(!navOpen)}
              className="lg:hidden p-2 text-bsa-text"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-0.5 bg-bsa-text mb-1" />
              <div className="w-5 h-0.5 bg-bsa-text mb-1" />
              <div className="w-5 h-0.5 bg-bsa-text" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {navOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border bg-card"
            >
              <div className="px-4 py-3 flex flex-col gap-3">
                {[
                  ["Home", "#hero"],
                  ["About", "#about"],
                  ["Donate", "#donate"],
                  ["Sponsorship", "#sponsorship"],
                  ["Events", "#events"],
                  ["Festival Dates", "#festival-dates"],
                  ["Leaderboard", "#leaderboard"],
                  ["Admin", "/admin"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="text-sm font-semibold text-bsa-text hover:text-bsa-orange py-1"
                    onClick={() => setNavOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/uploads/554703151_18412618753119757_9123590075034116988_n-019d1f02-5268-71dd-a68e-43ef97348e97-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
        {/* Warm color overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bsa-brown/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Gold ornament line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-bsa-gold" />
              <span className="text-bsa-gold text-xs font-bold tracking-widest uppercase">
                Est. 2018 • Maharashtra
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Preserve Our Heritage,
              <br />
              <span className="text-bsa-gold italic">
                Support Our Community
              </span>
            </h1>

            <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
              Bhoirwadi Sanskriti Association unites families across generations
              to celebrate, preserve, and pass on the rich cultural traditions
              of Bhoirwadi. Your donation fuels festivals, arts, education, and
              community bonds.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => openDonate()}
                className="bg-bsa-orange hover:bg-bsa-orange-dark text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg active:scale-95"
                data-ocid="hero.primary_button"
              >
                ❤️ Donate Now
              </button>
              <button
                type="button"
                onClick={() => openSponsor()}
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-200 text-lg active:scale-95"
                data-ocid="hero.secondary_button"
              >
                🏢 Become a Sponsor
              </button>
            </div>
          </motion.div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            className="w-full fill-background"
            aria-hidden="true"
            role="presentation"
          >
            <path d="M0,60 C240,0 480,60 720,30 C960,0 1200,60 1440,30 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section id="about" className="bg-bsa-green text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold mb-2 text-bsa-gold">
                Bhoirwadi Sanskriti Association
              </h2>
              <p className="text-white/85 text-sm leading-relaxed">
                A registered NGO dedicated to preserving the cultural heritage
                of Bhoirwadi, Maharashtra. We organize festivals, cultural
                programs, educational initiatives, and community welfare
                activities.
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-bsa-gold font-bold min-w-fit">
                  Darpan NGO No.:
                </span>
                <span className="font-mono font-bold text-bsa-gold">
                  MH/2018/0214403
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-bsa-gold font-bold min-w-fit">
                  Reg. No.:
                </span>
                <span className="font-mono font-bold text-bsa-gold">
                  E-28354 (Mumbai)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-white/80">Founded:</span>
                <span>2018</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bsa-gold mt-0.5 shrink-0" />
                <span>Bhoirwadi, Maharashtra, India</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-bsa-gold mt-0.5 shrink-0" />
                <span>ssbcs2023@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAYS TO SUPPORT */}
      <section id="donate" className="py-20 px-4 section-ornament">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-bsa-orange font-bold text-sm tracking-widest uppercase mb-2">
                Make a Difference
              </p>
              <h2 className="section-heading mb-4">Ways to Support BSA</h2>
              <div className="flex items-center justify-center gap-3">
                <div className="w-16 h-0.5 bg-bsa-gold" />
                <span className="text-bsa-gold text-lg">❋</span>
                <div className="w-16 h-0.5 bg-bsa-gold" />
              </div>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                Choose a giving level that feels right for you. Every
                contribution, big or small, makes a lasting impact.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Friend",
                amount: 1000,
                amountDisplay: "₹1,000",
                color: "from-amber-100 to-amber-50",
                borderColor: "border-amber-300",
                icon: "🤝",
                benefits: [
                  "Your name in event program",
                  "Digital certificate of appreciation",
                  "BSA newsletter subscription",
                ],
              },
              {
                title: "Supporter",
                amount: 5000,
                amountDisplay: "₹5,000",
                color: "from-orange-100 to-orange-50",
                borderColor: "border-bsa-orange",
                icon: "⭐",
                featured: true,
                benefits: [
                  "Name + logo in event program",
                  "Framed certificate of recognition",
                  "Invitation to BSA events",
                  "Social media shoutout",
                ],
              },
              {
                title: "Patron",
                amount: 25000,
                amountDisplay: "₹25,000",
                color: "from-yellow-100 to-yellow-50",
                borderColor: "border-bsa-gold",
                icon: "👑",
                benefits: [
                  "Prominent recognition on all materials",
                  "VIP access to all BSA events",
                  "Commemorative plaque",
                  "Dedicated social media feature",
                  "Honorary membership",
                ],
              },
            ].map((tier, i) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bsa-card border-2 ${tier.borderColor} overflow-hidden ${
                  tier.featured
                    ? "scale-105 ring-2 ring-bsa-orange ring-offset-2"
                    : ""
                }`}
                data-ocid={`donate.item.${i + 1}`}
              >
                {tier.featured && (
                  <div className="bg-bsa-orange text-white text-xs font-bold text-center py-1.5 tracking-wider uppercase">
                    ✨ Most Popular
                  </div>
                )}
                <div
                  className={`bg-gradient-to-br ${tier.color} p-6 text-center`}
                >
                  <div className="text-4xl mb-2">{tier.icon}</div>
                  <h3 className="font-serif text-2xl font-bold text-bsa-text">
                    {tier.title}
                  </h3>
                  <div className="text-4xl font-bold text-bsa-orange mt-2">
                    {tier.amountDisplay}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    One-time donation
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {tier.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-bsa-text"
                      >
                        <span className="text-bsa-orange mt-0.5">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => openDonate(tier.amount)}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-200 active:scale-95 ${
                      tier.featured
                        ? "bg-bsa-orange hover:bg-bsa-orange-dark text-white shadow-md"
                        : "border-2 border-bsa-orange text-bsa-orange hover:bg-bsa-orange hover:text-white"
                    }`}
                    data-ocid={"donate.primary_button"}
                  >
                    Donate {tier.amountDisplay}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE SPONSORSHIP + LEADERBOARD */}
      <section
        id="sponsorship"
        className="py-20 px-4 bg-gradient-to-br from-bsa-brown to-bsa-brown-dark"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-bsa-gold font-bold text-sm tracking-widest uppercase mb-2">
              Corporate Partnership
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Sponsorship Packages
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-0.5 bg-bsa-gold" />
              <span className="text-bsa-gold text-lg">❋</span>
              <div className="w-16 h-0.5 bg-bsa-gold" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                tier: SponsorshipTier.gold,
                label: "Gold Sponsor",
                amount: "₹1,00,000+",
                icon: "🥇",
                badgeClass: "gold-badge",
                benefits: [
                  "Logo on ALL event materials",
                  "Main stage banner placement",
                  "Featured on BSA website homepage",
                  "VIP tables for 10 guests",
                  "Social media campaign feature",
                  "Press release mention",
                ],
              },
              {
                tier: SponsorshipTier.silver,
                label: "Silver Sponsor",
                amount: "₹50,000+",
                icon: "🥈",
                badgeClass: "silver-badge",
                benefits: [
                  "Logo on event banners",
                  "Featured on BSA website",
                  "5 VIP tickets included",
                  "Certificate of appreciation",
                  "Social media mention",
                ],
              },
              {
                tier: SponsorshipTier.bronze,
                label: "Bronze Sponsor",
                amount: "₹25,000+",
                icon: "🥉",
                badgeClass: "bronze-badge",
                benefits: [
                  "Logo on event banners",
                  "2 VIP tickets included",
                  "Website mention",
                  "Certificate of appreciation",
                ],
              },
            ].map((pkg, i) => (
              <motion.div
                key={pkg.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                data-ocid={`sponsorship.item.${i + 1}`}
              >
                <div className={`${pkg.badgeClass} text-center py-5 px-4`}>
                  <div className="text-5xl mb-2">{pkg.icon}</div>
                  <h3 className="font-serif text-xl font-bold">{pkg.label}</h3>
                  <div className="text-3xl font-bold mt-1">{pkg.amount}</div>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 mb-5">
                    {pkg.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-bsa-text"
                      >
                        <span className="text-bsa-orange mt-0.5">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => openSponsor(pkg.tier)}
                    className="w-full py-3 rounded-lg font-bold text-sm bg-bsa-orange hover:bg-bsa-orange-dark text-white transition-all duration-200 active:scale-95"
                    data-ocid="sponsorship.primary_button"
                  >
                    Become {pkg.label}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section id="leaderboard" className="py-20 px-4 lotus-bg">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-bsa-orange font-bold text-sm tracking-widest uppercase mb-2">
              Hall of Honour
            </p>
            <h2 className="section-heading mb-4">Top Donors</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-0.5 bg-bsa-gold" />
              <Trophy className="w-5 h-5 text-bsa-gold" />
              <div className="w-16 h-0.5 bg-bsa-gold" />
            </div>
          </div>

          <div className="bsa-card overflow-hidden">
            {topDonors.length === 0 ? (
              <div
                className="text-center py-12"
                data-ocid="leaderboard.empty_state"
              >
                <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Be the first donor! Your name will appear here.
                </p>
                <button
                  type="button"
                  onClick={() => openDonate()}
                  className="mt-4 bg-bsa-orange hover:bg-bsa-orange-dark text-white font-bold px-6 py-2 rounded-lg transition-all"
                >
                  Donate Now
                </button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {topDonors.slice(0, 10).map((donor, idx) => (
                  <motion.div
                    key={donor.donorName}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors"
                    data-ocid={`leaderboard.item.${idx + 1}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        idx === 0
                          ? "bg-yellow-400 text-yellow-900"
                          : idx === 1
                            ? "bg-gray-300 text-gray-700"
                            : idx === 2
                              ? "bg-amber-600 text-white"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {idx < 3 ? ["🥇", "🥈", "🥉"][idx] : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-bsa-text truncate">
                        {donor.donorName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(donor.timestamp)}
                      </div>
                    </div>
                    <div className="font-bold text-bsa-orange text-lg shrink-0">
                      {formatIndianAmount(donor.amount)}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EVENT STALLS SHOWCASE */}
      <section id="events" className="py-20 px-4 bg-bsa-orange">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-white/80 font-bold text-sm tracking-widest uppercase mb-2">
              Experience BSA
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Event Gallery
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-0.5 bg-white/60" />
              <span className="text-white text-lg">❋</span>
              <div className="w-16 h-0.5 bg-white/60" />
            </div>
          </div>

          {/* Photo Grid — masonry-style: 2 large left + 1 tall right + 1 wide bottom */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
            {/* Photo 1 — large top-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5 relative overflow-hidden rounded-2xl shadow-2xl group"
              data-ocid="events.item.1"
            >
              <img
                src={GALLERY_PHOTOS[0].src}
                alt={GALLERY_PHOTOS[0].alt}
                className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end">
                <div className="p-5 w-full">
                  <span className="text-white font-serif font-bold text-xl drop-shadow-lg">
                    {GALLERY_PHOTOS[0].caption}
                  </span>
                </div>
              </div>
              {/* Always-visible subtle bottom label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3 rounded-b-2xl">
                <span className="text-white/90 text-sm font-semibold tracking-wide">
                  {GALLERY_PHOTOS[0].caption}
                </span>
              </div>
            </motion.div>

            {/* Photo 3 (Durga Maa) — tall right column spanning both rows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="md:col-span-7 md:row-span-2 relative overflow-hidden rounded-2xl shadow-2xl group"
              style={{ minHeight: "320px" }}
              data-ocid="events.item.3"
            >
              <img
                src={GALLERY_PHOTOS[2].src}
                alt={GALLERY_PHOTOS[2].alt}
                className="w-full h-72 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end">
                <div className="p-5 w-full">
                  <span className="text-white font-serif font-bold text-2xl drop-shadow-lg">
                    {GALLERY_PHOTOS[2].caption}
                  </span>
                </div>
              </div>
              {/* Always-visible bottom label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-3 rounded-b-2xl">
                <span className="text-white/90 text-sm font-semibold tracking-wide">
                  {GALLERY_PHOTOS[2].caption}
                </span>
              </div>
            </motion.div>

            {/* Photo 2 (Children) — bottom-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-5 relative overflow-hidden rounded-2xl shadow-2xl group"
              data-ocid="events.item.2"
            >
              <img
                src={GALLERY_PHOTOS[1].src}
                alt={GALLERY_PHOTOS[1].alt}
                className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end">
                <div className="p-5 w-full">
                  <span className="text-white font-serif font-bold text-xl drop-shadow-lg">
                    {GALLERY_PHOTOS[1].caption}
                  </span>
                </div>
              </div>
              {/* Always-visible bottom label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3 rounded-b-2xl">
                <span className="text-white/90 text-sm font-semibold tracking-wide">
                  {GALLERY_PHOTOS[1].caption}
                </span>
              </div>
            </motion.div>

            {/* Photo 4 (Generated stalls) — wide bottom spanning all cols */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-12 relative overflow-hidden rounded-2xl shadow-2xl group"
              data-ocid="events.item.4"
            >
              <img
                src={GALLERY_PHOTOS[3].src}
                alt={GALLERY_PHOTOS[3].alt}
                className="w-full h-52 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">
                  {GALLERY_PHOTOS[3].caption}
                </h3>
                <p className="text-white/80 text-sm">
                  Join us for our vibrant cultural stalls featuring traditional
                  crafts, food, music, and dance performances.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Feature icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎭",
                label: "Cultural Performances",
                desc: "Traditional dance, music and theatre",
              },
              {
                icon: "🍛",
                label: "Food Festival",
                desc: "Authentic Bhoirwadi cuisine and delicacies",
              },
              {
                icon: "🎨",
                label: "Art & Craft Stalls",
                desc: "Handmade artworks and traditional crafts",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/15 backdrop-blur-sm rounded-xl p-5 text-white"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="font-serif font-bold text-lg">{item.label}</h4>
                <p className="text-white/80 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STALLS SPONSORS THANK YOU */}
      <section
        id="stalls-sponsors"
        className="py-20 px-4 bg-gradient-to-br from-bsa-brown via-bsa-brown-dark to-[#1a0a00] relative overflow-hidden"
      >
        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #c8860a 0%, transparent 50%), radial-gradient(circle at 80% 50%, #c8860a 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-bsa-gold font-bold text-sm tracking-widest uppercase mb-3">
              Stalls Sponsors
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-5">
              Thank You to Our Stalls Sponsors
            </h2>
            {/* Ornament divider */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1 max-w-[80px] h-px bg-gradient-to-r from-transparent to-bsa-gold" />
              <div className="flex items-center gap-2">
                <span className="text-bsa-gold text-xs">✦</span>
                <span className="text-bsa-gold text-2xl">🙏</span>
                <span className="text-bsa-gold text-xs">✦</span>
              </div>
              <div className="flex-1 max-w-[80px] h-px bg-gradient-to-l from-transparent to-bsa-gold" />
            </div>
            <p className="text-white/70 text-sm mt-4 max-w-md mx-auto">
              We extend our heartfelt gratitude to the sponsors who made our
              vibrant stalls possible at this year's festival.
            </p>
          </motion.div>

          {/* Sponsor cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "FRYING PANDA",
                emoji: "🐼",
                tagline: "Food Stall Sponsor",
              },
              { name: "Zinger", emoji: "⚡", tagline: "Stall Sponsor" },
              { name: "Ankari", emoji: "🌸", tagline: "Stall Sponsor" },
            ].map((sponsor, i) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="group relative"
                data-ocid={`stalls-sponsors.item.${i + 1}`}
              >
                {/* Card */}
                <div className="relative rounded-2xl overflow-hidden border border-bsa-gold/30 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm text-center py-10 px-6 hover:border-bsa-gold/70 hover:from-white/12 hover:to-white/6 transition-all duration-300">
                  {/* Top gold accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-bsa-gold to-transparent" />

                  {/* Emoji */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {sponsor.emoji}
                  </div>

                  {/* Sponsor name */}
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-bsa-gold tracking-wide mb-2 leading-tight">
                    {sponsor.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                    {sponsor.tagline}
                  </p>

                  {/* Bottom gold accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-bsa-gold/50 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing thanks */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-20 h-px bg-bsa-gold/40" />
              <span className="text-bsa-gold text-lg">❋</span>
              <div className="w-20 h-px bg-bsa-gold/40" />
            </div>
            <p className="text-white/60 text-sm italic">
              Your generous support keeps our cultural traditions alive for
              generations to come.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FESTIVAL DATES 2026 */}
      <section
        id="festival-dates"
        className="py-24 px-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0d0820 0%, #1a0f3e 30%, #2d1b00 70%, #1a0820 100%)",
        }}
      >
        {/* Starfield dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static decorative elements
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${(i * 7 + 13) % 100}%`,
                left: `${(i * 13 + 7) % 100}%`,
              }}
            />
          ))}
          {/* Saffron radial glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #c8860a 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <p className="text-bsa-gold font-bold text-xs tracking-[0.3em] uppercase mb-4">
              ✦ Durga Puja 2026 ✦
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Sacred{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #c8860a, #f5a623, #c8860a)",
                }}
              >
                Festival Dates
              </span>
            </h2>
            {/* Ornate divider */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div
                className="flex-1 max-w-[100px] h-px"
                style={{
                  background: "linear-gradient(to right, transparent, #c8860a)",
                }}
              />
              <span className="text-bsa-gold text-xl">🌸</span>
              <span className="text-white/40 text-lg">✦</span>
              <span className="text-bsa-gold text-xl">🪔</span>
              <div
                className="flex-1 max-w-[100px] h-px"
                style={{
                  background: "linear-gradient(to left, transparent, #c8860a)",
                }}
              />
            </div>
            <p className="text-white/60 text-base max-w-lg mx-auto font-medium">
              Mark your calendar and celebrate with us!
            </p>
          </motion.div>

          {/* Festival cards — horizontal scroll mobile, grid desktop */}
          <div className="overflow-x-auto pb-4 md:overflow-visible">
            <div className="flex md:grid md:grid-cols-7 gap-4 w-max md:w-auto">
              {[
                {
                  name: "Mahalaya",
                  date: "October 10",
                  day: "Saturday",
                  emoji: "🌙",
                  variant: "mahalaya",
                  label: "Eve & Beginning",
                },
                {
                  name: "Maha Panchami",
                  date: "October 16",
                  day: "Friday",
                  emoji: "🌸",
                  variant: "regular",
                  label: null,
                },
                {
                  name: "Maha Shashthi",
                  date: "October 17",
                  day: "Saturday",
                  emoji: "🎊",
                  variant: "regular",
                  label: null,
                },
                {
                  name: "Maha Saptami",
                  date: "October 18",
                  day: "Sunday",
                  emoji: "🪔",
                  variant: "regular",
                  label: null,
                },
                {
                  name: "Maha Ashtami",
                  date: "October 19",
                  day: "Monday",
                  emoji: "🔱",
                  variant: "sacred",
                  label: "Most Sacred",
                },
                {
                  name: "Maha Navami",
                  date: "October 20",
                  day: "Tuesday",
                  emoji: "🙏",
                  variant: "regular",
                  label: null,
                },
                {
                  name: "Vijayadashami",
                  date: "October 21",
                  day: "Wednesday",
                  emoji: "🏆",
                  variant: "finale",
                  label: "Grand Finale",
                },
              ].map((fest, i) => {
                const isMahalaya = fest.variant === "mahalaya";
                const isSacred = fest.variant === "sacred";
                const isFinale = fest.variant === "finale";

                return (
                  <motion.div
                    key={fest.name}
                    initial={{ opacity: 0, y: 40, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.1 }}
                    whileHover={{ y: -6, scale: 1.04 }}
                    className={`relative flex-shrink-0 w-36 md:w-auto rounded-2xl overflow-hidden cursor-default select-none transition-shadow duration-300 ${
                      isFinale
                        ? "shadow-[0_0_30px_rgba(200,134,10,0.5)] border-2 border-bsa-gold"
                        : isSacred
                          ? "shadow-[0_0_20px_rgba(138,43,226,0.4)] border-2 border-purple-400/60"
                          : isMahalaya
                            ? "shadow-[0_0_15px_rgba(100,150,255,0.3)] border border-blue-300/40"
                            : "border border-white/10"
                    }`}
                    data-ocid={`festival-dates.item.${i + 1}`}
                    style={{
                      background: isFinale
                        ? "linear-gradient(145deg, #2d1b00, #4a2f00, #1a0d00)"
                        : isSacred
                          ? "linear-gradient(145deg, #1a0830, #2d1060, #1a0830)"
                          : isMahalaya
                            ? "linear-gradient(145deg, #0a1530, #1a2d50, #0a1530)"
                            : "linear-gradient(145deg, #1a1030, #251545, #1a1030)",
                    }}
                  >
                    {/* Top shimmer bar */}
                    <div
                      className="h-1 w-full"
                      style={{
                        background: isFinale
                          ? "linear-gradient(90deg, #c8860a, #f5d020, #c8860a)"
                          : isSacred
                            ? "linear-gradient(90deg, #7c3aed, #a855f7, #7c3aed)"
                            : isMahalaya
                              ? "linear-gradient(90deg, #3b82f6, #93c5fd, #3b82f6)"
                              : "linear-gradient(90deg, #c8860a44, #c8860a88, #c8860a44)",
                      }}
                    />

                    <div className="p-4 text-center flex flex-col items-center gap-2">
                      {/* Label badge */}
                      {fest.label && (
                        <span
                          className={`text-[9px] font-bold tracking-widest uppercase rounded-full px-2 py-0.5 ${
                            isFinale
                              ? "bg-bsa-gold text-black"
                              : isSacred
                                ? "bg-purple-500/80 text-white"
                                : "bg-blue-500/60 text-white"
                          }`}
                        >
                          {fest.label}
                        </span>
                      )}

                      {/* Emoji */}
                      <span
                        className={`${isFinale ? "text-4xl" : isSacred ? "text-3xl" : "text-2xl"}`}
                      >
                        {fest.emoji}
                      </span>

                      {/* Festival name */}
                      <h3
                        className={`font-serif font-bold leading-tight text-center ${
                          isFinale
                            ? "text-base text-bsa-gold"
                            : isSacred
                              ? "text-sm text-purple-200"
                              : isMahalaya
                                ? "text-sm text-blue-200"
                                : "text-sm text-white"
                        }`}
                      >
                        {fest.name}
                      </h3>

                      {/* Date */}
                      <p
                        className={`text-xs font-semibold ${
                          isFinale ? "text-white/90" : "text-white/60"
                        }`}
                      >
                        {fest.date}
                      </p>

                      {/* Day of week */}
                      <span
                        className={`text-[10px] font-bold tracking-wider uppercase rounded px-2 py-0.5 ${
                          isFinale
                            ? "bg-bsa-gold/20 text-bsa-gold border border-bsa-gold/40"
                            : isSacred
                              ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                              : isMahalaya
                                ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                                : "bg-white/10 text-white/50 border border-white/10"
                        }`}
                      >
                        {fest.day}
                      </span>
                    </div>

                    {/* Finale sparkle overlay */}
                    {isFinale && (
                      <div className="absolute inset-0 pointer-events-none">
                        {["10%", "30%", "70%", "90%"].map((left, j) => (
                          <motion.div
                            // biome-ignore lint/suspicious/noArrayIndexKey: static decorative elements
                            key={j}
                            className="absolute w-1 h-1 rounded-full bg-bsa-gold"
                            style={{ left, top: `${20 + j * 15}%` }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0.5, 1.5, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: j * 0.5,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center text-white/40 text-xs mt-8 tracking-wider"
          >
            ✦ All events held at Bhoirwadi, Maharashtra ✦
          </motion.p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-bsa-brown to-bsa-brown-dark text-white pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Col 1: About */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/generated/bsa-logo-transparent.dim_400x400.png"
                  alt="BSA"
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <div className="font-serif font-bold text-xl text-bsa-gold">
                    BSA
                  </div>
                  <div className="text-xs text-white/70">
                    Bhoirwadi Sanskriti Association
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Dedicated to preserving the rich cultural heritage of Bhoirwadi
                and fostering community bonds across generations.
              </p>
              <div className="flex gap-3 mt-4">
                {[
                  { icon: SiFacebook, label: "Facebook" },
                  { icon: SiInstagram, label: "Instagram" },
                  { icon: SiX, label: "Twitter" },
                  { icon: SiYoutube, label: "YouTube" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-bsa-gold/30 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Registration */}
            <div>
              <h4 className="font-serif font-bold text-bsa-gold text-lg mb-4">
                Legal & Registration
              </h4>
              <div className="space-y-3 text-sm text-white/80">
                <div>
                  <div className="text-bsa-gold font-semibold text-xs uppercase tracking-wide">
                    Darpan NGO Registration
                  </div>
                  <div className="font-mono font-bold text-white">
                    MH/2018/0214403
                  </div>
                </div>
                <div>
                  <div className="text-bsa-gold font-semibold text-xs uppercase tracking-wide">
                    Incorporation / Reg. No.
                  </div>
                  <div className="font-mono font-bold text-white">
                    E-28354 (Mumbai)
                  </div>
                </div>
                <div>
                  <div className="text-bsa-gold font-semibold text-xs uppercase tracking-wide">
                    Founded
                  </div>
                  <div className="text-white">2018</div>
                </div>
                <div>
                  <div className="text-bsa-gold font-semibold text-xs uppercase tracking-wide">
                    Type
                  </div>
                  <div className="text-white">
                    Non-Governmental Organization (NGO)
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h4 className="font-serif font-bold text-bsa-gold text-lg mb-4">
                Contact Us
              </h4>
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-bsa-gold mt-0.5 shrink-0" />
                  <span>Bhoirwadi, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-bsa-gold shrink-0" />
                  <span>ssbcs2023@gmail.com</span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => openDonate()}
                  className="bg-bsa-orange hover:bg-bsa-orange-dark text-white font-bold px-5 py-2.5 rounded-lg transition-all text-sm"
                  data-ocid="footer.primary_button"
                >
                  ❤️ Donate Now
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/15 pt-6 text-center">
            <p className="text-white/50 text-sm">
              © {year} Bhoirwadi Sanskriti Association. All rights reserved.
            </p>
            <p className="text-white/40 text-xs mt-1">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white/60 transition-colors underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <DonationModal
        open={donationOpen}
        onOpenChange={setDonationOpen}
        defaultAmount={defaultDonationAmount}
      />
      <SponsorshipModal
        open={sponsorOpen}
        onOpenChange={setSponsorOpen}
        defaultTier={defaultTier}
      />
    </div>
  );
}
