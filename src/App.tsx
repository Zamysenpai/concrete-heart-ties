import React, { useEffect, useState } from "react";
import { Mail, Instagram, ShieldCheck, Hammer, Heart, Camera, MapPin } from "lucide-react";


// Accent as CSS variable so Tailwind doesn't need to parse dynamic classes
const ACCENT = "#8A1C1C";

// Replace these with your images in /public/gallery (or full URLs)
// Example: put files in public/gallery/rope1.webp etc.
const galleryItems = [
  { src: "/gallery/Banner1.jpg", alt: "Banner 1", caption: "Work example 1", credit: "© Concrete Heart Ties" },
  { src: "/gallery/Banner2.jpg", alt: "Banner 2", caption: "Work example 2", credit: "© Concrete Heart Ties" },
  { src: "/gallery/Banner3.jpg", alt: "Banner 3", caption: "Work example 3", credit: "© Concrete Heart Ties" },
];

export default function App() {
  const style = { ["--accent" as unknown as string]: ACCENT } as React.CSSProperties;

  // Age gate
  const [ageOk, setAgeOk] = useState(false);
  useEffect(() => {
    setAgeOk(localStorage.getItem("cht_age_ok") === "1");
  }, []);
  const approveAge = () => {
    localStorage.setItem("cht_age_ok", "1");
    setAgeOk(true);
  };

  // Newsletter (placeholder demo)
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<null | "ok" | "err">(null);
  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterStatus("err");
      return;
    }
    try {
      // TODO: replace with your provider endpoint (Formspree/Beehiiv/Mailchimp)
      // await fetch("https://formspree.io/f/xxxx", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ email }) });
      setNewsletterStatus("ok");
      setEmail("");
    } catch {
      setNewsletterStatus("err");
    }
  }

  return (
   <div className="min-h-screen bg-neutral-950 text-neutral-200 p-6">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "radial-gradient(60% 40% at 50% 0%, rgba(138,28,28,0.25), rgba(0,0,0,0))" }}
      />

      <Header />

      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Contact />
        <Newsletter
          email={email}
          setEmail={setEmail}
          status={newsletterStatus}
          onSubmit={handleSubscribe}
        />
      </main>

      <Footer />

      {!ageOk && <AgeGate onApprove={approveAge} />}
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-neutral-950/70 border-b border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-wide text-neutral-100">
          Concrete <span className="text-[var(--accent)]">Heart</span> Ties
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#gallery" className="hover:text-white">Portfolio</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm hover:bg-neutral-800"
        >
          Book
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Artistic rope work.
              <br />
              <span className="text-[var(--accent)]">Safe. Consensual. Considered.</span>
            </h1>
            <p className="mt-5 text-neutral-300 leading-relaxed">
              Concrete Heart Ties is a Dallas–Fort Worth shibari artist creating elegant rope imagery and experiences.
              He also crafts kink toys and impact tools, and is expanding into custom furniture.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#contact" className="rounded-2xl bg-neutral-100 text-neutral-950 px-4 py-2 text-sm font-medium hover:bg-white">
                Book a session
              </a>
              <a href="#gallery" className="rounded-2xl border border-neutral-700 px-4 py-2 text-sm hover:bg-neutral-900">
                View portfolio
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-neutral-400">
              <div className="inline-flex items-center gap-2"><ShieldCheck size={16} /> Aftercare focused</div>
              <div className="inline-flex items-center gap-2"><Heart size={16} /> Consent forward</div>
              <div className="inline-flex items-center gap-2"><Hammer size={16} /> Hand-crafted tools</div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-neutral-800">
              {/* Swap this for a hero image from your gallery if you want */}
              <img src={galleryItems[0].src} alt={galleryItems[0].alt} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-neutral-900">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-10 items-start">
        <div className="md:col-span-2">
          <h2 className="text-2xl md:text-3xl font-semibold">About & Values</h2>
          <p className="mt-4 text-neutral-300 leading-relaxed">
            Alongside rope work, Concrete Heart Ties designs and builds kink toys, impact tools, and is venturing into custom furniture.
            Every session prioritizes communication, safety, and respect—from negotiation to aftercare.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-neutral-300">
            <li className="flex gap-3"><ShieldCheck className="mt-0.5" size={18}/> Safe technique & clear boundaries</li>
            <li className="flex gap-3"><Heart className="mt-0.5" size={18}/> Consensual, collaborative process</li>
            <li className="flex gap-3"><Camera className="mt-0.5" size={18}/> Artistic direction for shoots & shows</li>
            <li className="flex gap-3"><MapPin className="mt-0.5" size={18}/> DFW travel radius</li>
          </ul>
        </div>
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-5">
          <h3 className="font-medium">Consent & Aftercare</h3>
          <p className="mt-2 text-sm text-neutral-300">
            “Aftercare is important, and there is nothing better than safe practices.” Sessions include negotiation, check-ins, and time for decompression. 18+ only.
          </p>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-16 md:py-24 border-t border-neutral-900">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Services</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <ServiceCard title="Photoshoots" desc="Collaborative concepts for striking rope imagery." />
          <ServiceCard title="Performance" desc="Stage, private events, and showcases." />
          <ServiceCard title="Private Rope Sessions" desc="Floor work or light suspension depending on assessment and safety." />
          <ServiceCard title="Workshops (Potential)" desc="Fundamentals, safety, consent, scene building." />
        </div>
        <div className="mt-8 text-neutral-300 text-sm leading-relaxed">
          <p><strong className="text-neutral-200">Rates:</strong> depend on scope, time, and travel. <strong>USD only.</strong></p>
          <p className="mt-1">May consider reduced / no-fee work for opportunities that promote the brand and products.</p>
          <p className="mt-1"><strong>Screening required</strong> prior to booking.</p>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm text-neutral-300">{desc}</p>
    </div>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-24 border-t border-neutral-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Portfolio</h2>
          <a
            href="https://www.instagram.com/concrete_heart_ties/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white"
          >
            <Instagram size={16} /> View Instagram
          </a>
        </div>
        <p className="mt-3 text-neutral-400 text-sm">Curated highlights. Credit listed where applicable.</p>

        {/* Masonry-like column layout */}
        <div className="mt-8 [column-count:1] sm:[column-count:2] lg:[column-count:3] [column-gap:1rem]">
          {galleryItems.map((item, i) => (
            <figure key={i} className="break-inside-avoid mb-4 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40">
              <img src={item.src} alt={item.alt} className="w-full h-auto object-cover" />
              <figcaption className="p-3 text-sm text-neutral-300 flex items-center justify-between">
                <span>{item.caption}</span>
                <span className="text-neutral-500">{item.credit}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 border-t border-neutral-900">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Contact & Socials</h2>
          <p className="mt-4 text-neutral-300">Bookings and inquiries welcome. Typical reply within 48 hours.</p>
          <div className="mt-6 space-y-3 text-neutral-300">
            <a href="mailto:concreteheartties@gmail.com" className="flex items-center gap-2 hover:text-white">
              <Mail size={18} /> concreteheartties@gmail.com
            </a>
            <a href="https://www.instagram.com/concrete_heart_ties/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white">
              <Instagram size={18} /> @concrete_heart_ties
            </a>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-sm border border-neutral-700 text-[10px]">FL</span>
              <a href="https://fetlife.com/users/search?q=WoodNRope" target="_blank" rel="noreferrer" className="hover:text-white">FetLife: WoodNRope</a>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 text-sm"><MapPin size={16}/> DFW area</div>
          </div>
        </div>
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6">
          <h3 className="font-medium">Quick booking note</h3>
          <ul className="mt-3 text-sm text-neutral-300 list-disc list-inside space-y-1">
            <li>USD only</li>
            <li>Rates depend on length of work & travel needs</li>
            <li>Screening required before confirmation</li>
            <li>Open to promo collaborations for brand/products</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Newsletter({
  email, setEmail, status, onSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  status: null | "ok" | "err";
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <section id="newsletter" className="py-16 md:py-24 border-t border-neutral-900">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">Newsletter</h2>
        <p className="mt-3 text-neutral-300">Get updates on new work, potential workshops, and product drops.</p>
        <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-80 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm outline-none focus:outline-none focus:ring-2 focus:ring-neutral-600"
          />
          <button type="submit" className="rounded-xl bg-neutral-100 text-neutral-950 px-5 py-3 text-sm font-medium hover:bg-white">
            Subscribe
          </button>
        </form>
        {status === "ok" && <div className="mt-3 text-sm text-emerald-400">Thanks! You'll hear from us soon.</div>}
        {status === "err" && <div className="mt-3 text-sm text-red-400">Please enter a valid email address.</div>}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-900 py-10">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-neutral-400">© {new Date().getFullYear()} Concrete Heart Ties. 18+ only.</div>
        <div className="text-sm text-neutral-400">Crafted with care • Safe • Consensual • Aftercare-first</div>
      </div>
    </footer>
  );
}

function AgeGate({ onApprove }: { onApprove: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-6">
      <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-950 p-6 text-center shadow-2xl">
        <h3 className="text-xl font-semibold">Adults Only</h3>
        <p className="mt-2 text-sm text-neutral-300">
          This portfolio contains adult-oriented rope art. Please confirm you are 18+ to enter.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={onApprove}
            className="rounded-xl bg-neutral-100 text-neutral-950 px-5 py-2.5 text-sm font-medium hover:bg-white"
          >
            I am 18+
          </button>
          <a
            href="https://www.google.com"
            className="rounded-xl border border-neutral-700 px-5 py-2.5 text-sm hover:bg-neutral-900"
          >
            Exit
          </a>
        </div>
        <p className="mt-4 text-xs text-neutral-500">By entering you agree to view artistic rope content and to navigate respectfully.</p>
      </div>
    </div>
  );
}
