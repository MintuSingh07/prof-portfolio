"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ReactLenis, useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  MapPin,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

const projectsData = {
  websites: [
    {
      id: "01",
      client: "npm Package",
      title: "SWT (secure-web-token)",
      description: (
        <>
          <span className="text-accent font-bold">50,000+ TOTAL DOWNLOADS</span>{" "}
          |{" "}
          <span className="text-accent font-bold">
            7,000–8,000 WEEKLY ORGANIC INSTALLS
          </span>{" "}
          — Engineered a next-gen device-bound auth library for Node.js using
          AES-256-GCM encryption; independently maintained with zero external
          contributors.
        </>
      ),
      image: "/swt.png",
      tags: ["Node.js", "Security", "npm", "Encryption"],
      gradient: "from-indigo-600/20 to-blue-600/20",
      link: "https://www.npmjs.com/package/secure-web-token",
    },
    {
      id: "02",
      client: "Velvet Pour",
      title: "Velvet Pour",
      description:
        "A luxurious and elegant web experience crafted exclusively for premium brands. This project focuses on delivering a sophisticated aesthetic through the use of smooth, performant animations, high-fidelity imagery, and seamless page transitions, ensuring absolute digital elegance.",
      image: "/velvet-pour.png",
      tags: ["Next.js", "Framer Motion", "Premium"],
      gradient: "from-purple-600/20 to-pink-600/20",
      link: "https://velvetpourpearl.vercel.app/",
    },
    {
      id: "03",
      client: "Retro Building",
      title: "Retro Building",
      description:
        "A nostalgic yet modern architectural showcase that seamlessly blends retro aesthetics with contemporary web technologies. It features an interactive layout, engaging visual effects, and a highly responsive design, perfectly encapsulating the essence of classic architecture within a modern digital frame.",
      image: "/retrobuilding.png",
      tags: ["React", "Aesthetic", "Architecture"],
      gradient: "from-amber-600/20 to-yellow-700/20",
      link: "https://retrobuilding.vercel.app/",
    },
    {
      id: "04",
      client: "Zentry",
      title: "Zentry",
      description:
        "A high-performance gaming landing page designed to captivate users with deeply immersive animations and a sleek, futuristic interface. Leveraging GSAP for complex scroll-triggered motion, the platform offers a dynamic and thrilling user journey tailored for the modern gaming community.",
      image: "/zentry.png",
      tags: ["Next.js", "GSAP", "Gaming"],
      gradient: "from-emerald-500/20 to-cyan-600/20",
      link: "https://zentry-ms.vercel.app/",
    },
    {
      id: "05",
      client: "GTA VI",
      title: "GTA VI Website",
      description:
        "A stunning, fan-made immersive experience celebrating the highly anticipated release of GTA VI. The website is characterized by its cinematic transitions, dynamic layout shifts, and bold visual storytelling, mirroring the chaotic yet mesmerizing energy of the game's universe.",
      image: "/gta-vi.png",
      tags: ["React", "Animations", "Immersive"],
      gradient: "from-rose-600/20 to-purple-700/20",
      link: "https://gta-vi-ms.vercel.app/",
    },
  ],
  uiux: [
    {
      id: "01",
      client: "TR HOST",
      title: "TR HOST (REDESIGN)",
      description:
        "A deep UX exploration and complete visual overhaul of the TP HOST hosting platform. The redesign prioritizes information architecture, streamlined product discovery, and a consistent design system that scales across mobile and desktop environments.",
      image: null,
      tags: ["Figma", "Redesign", "UX"],
      gradient: "from-emerald-500/20 to-cyan-600/20",
      link: "https://www.figma.com/design/HpZAg5jSAywh4mMXyzevId/TP-HOST-REDESIGN?node-id=0-1&p=f&t=oBPmQozY0pIHIJLe-0",
    },
    {
      id: "02",
      client: "Tian",
      title: "Tian - Ecommerce webapp",
      description:
        "A premium e-commerce mobile application interface that focuses on visual storytelling and editorial-style product presentation. It features a fluid checkout experience, sophisticated search filtering, and high-impact typography for brand elevation.",
      image: null,
      tags: ["Ecommerce", "UI Design"],
      gradient: "from-rose-500/20 to-orange-600/20",
      link: "https://www.figma.com/design/QXNFdVQo7VbXgZhXaTSzyV/Tian---Ecommerce-webapp?node-id=1-2&p=f&t=I2NPaOmboY53G7od-0",
    },
    {
      id: "03",
      client: "Duevion",
      title: "DUEVION- Due Management",
      description:
        "A streamlined financial management application designed for simplicity and trust. It provides shop owners and individuals with a clean dashboard for tracking payment cycles, automated reminders, and organized financial history in a clutter-free environment.",
      image: null,
      tags: ["Fintech", "App Design"],
      gradient: "from-purple-500/20 to-blue-600/20",
      link: "https://www.figma.com/design/UnhUfSmBda8GkzbkgtuEQa/Duevion?node-id=0-1&p=f&t=eqGWvJWn7h6quyEY-0",
    },
    {
      id: "04",
      client: "SHOP.CO",
      title: "SHOP.CO - ECOMMERCE",
      description:
        "A robust fashion e-commerce design system that handles complex product variations and dynamic category management. It emphasizes high-fidelity prototyping, user-centric filtering, and a seamless transition from discovery to purchase.",
      image: null,
      tags: ["Ecommerce", "Web Design"],
      gradient: "from-amber-400/20 to-orange-500/20",
      link: "https://www.figma.com/design/HnkxdHr7LLiAwPwxR3mXRL/Shop.Co-Ecommerce?node-id=0-1&p=f&t=2MbN28UIoYLqDVmn-0",
    },
    {
      id: "05",
      client: "DExA",
      title: "DExA - Clothing in style",
      description:
        "A minimalist fashion branding and shopping interface that uses whitespace and elegant typography to create a sense of luxury. The UI is architected around high-resolution imagery and a distraction-free navigation system for high-end apparel.",
      image: null,
      tags: ["Fashion", "minimal"],
      gradient: "from-pink-500/20 to-rose-600/20",
      link: "https://www.figma.com/design/uZXfWwsI87GMz9P4AgVMEf/Shopping-Website--DExA-?node-id=0-1&t=HsG0PUjlPidtS0Kx-0",
    },
  ],
};

// --- Components ---

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element && lenis) {
      lenis.scrollTo(element, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="px-4 py-2 text-sm font-medium transition-colors hover:text-accent cursor-pointer"
    >
      {children}
    </a>
  );
};

const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl md:hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 text-white/50 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          <nav className="flex flex-col items-center gap-8">
            {["home", "about", "projects", "contact"].map((id) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={onClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-bebas text-5xl text-white hover:text-accent transition-colors uppercase tracking-widest"
              >
                {id}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ isProjectsActive }: { isProjectsActive: boolean }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 p-1.5 backdrop-blur-xl min-w-[240px] md:min-w-[300px] justify-between">
        <div className="flex items-center gap-1 pl-1">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-white/20 bg-white/10">
            <div className="h-full w-full bg-neutral-800" />
          </div>
        </div>

        <div className="flex-1 flex justify-center overflow-hidden h-9">
          <AnimatePresence mode="wait">
            {!isProjectsActive ? (
              <>
                <motion.div
                  key="nav-links"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden items-center gap-1 md:flex"
                >
                  <NavLink href="#home">Home</NavLink>
                  <NavLink href="#about">About</NavLink>
                  <NavLink href="#projects">Projects</NavLink>
                </motion.div>

                {/* Mobile-only branding to fill the center gap */}
                <motion.div
                  key="mobile-status"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center md:hidden"
                >
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/50">
                    Portfolio / 26
                  </span>
                </motion.div>
              </>
            ) : (
              <motion.div
                key="available-status"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 px-4"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </div>
                <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-white whitespace-nowrap">
                  Available for Work
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isProjectsActive && (
          <>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hidden md:block rounded-full bg-white px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
            >
              Contact
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex md:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
          </>
        )}
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </motion.header>
  );
};

// --- Main Page ---

const ContactSection = () => {
  const [formData, setFormData] = useState({ email: "", query: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Automatic email trigger (mailto fallback)
    setTimeout(() => {
      const subject = encodeURIComponent("Portfolio Inquiry");
      const body = encodeURIComponent(formData.query);
      window.location.href = `mailto:mintusingh2006j@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
      setFormData({ email: "", query: "" });

      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-neutral-950 flex flex-col justify-center py-24 overflow-hidden"
    >
      {/* Background Heading */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="font-bebas text-[22vw] md:text-[25vw] leading-none text-white/5 font-normal tracking-tighter text-center">
          CONTACT
        </h2>
      </div>

      <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Info */}
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-accent" />
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-accent font-bold">
                Get In Touch
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-bebas text-6xl md:text-9xl text-white leading-[0.9]"
            >
              LET&apos;S WORK <br />{" "}
              <span className="text-neutral-500">TOGETHER</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-neutral-500 text-[10px] uppercase tracking-widest font-bold">
                <Mail size={14} className="text-accent" />
                <span>Email me</span>
              </div>
              <a
                href="mailto:mintusingh2006j@gmail.com"
                className="text-white text-base md:text-lg hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
              >
                mintusingh2006j@gmail.com
                <ArrowUpRight
                  size={16}
                  className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                />
              </a>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-neutral-500 text-[10px] uppercase tracking-widest font-bold">
                <MapPin size={14} className="text-accent" />
                <span>Location</span>
              </div>
              <p className="text-white text-base md:text-lg">Kolkata, India</p>
            </div>
          </div>
        </div>

        {/* Right Side: Glassmorphism Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Form Background Blur */}
          <div className="absolute -inset-4 bg-accent/20 blur-3xl opacity-20 pointer-events-none" />

          <form
            onSubmit={handleSubmit}
            className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 space-y-8 shadow-2xl"
          >
            <div className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-[11px] md:text-[10px] uppercase tracking-widest text-neutral-400 pl-4 group-focus-within:text-accent transition-colors">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[11px] md:text-[10px] uppercase tracking-widest text-neutral-400 pl-4 group-focus-within:text-accent transition-colors">
                  Enter your query
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can I help you?"
                  value={formData.query}
                  onChange={(e) =>
                    setFormData({ ...formData, query: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all duration-300 resize-none"
                />
              </div>
            </div>

            <button
              disabled={status !== "idle"}
              type="submit"
              className="group relative w-full overflow-hidden rounded-xl md:rounded-2xl bg-white py-4 md:py-5 px-6 md:px-8 text-black font-bold uppercase tracking-[0.2em] text-[11px] md:text-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
            >
              <span className="relative z-10">
                {status === "idle" && "Send Message"}
                {status === "loading" && "Processing..."}
                {status === "success" && "Message Sent!"}
              </span>
              <div className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                {status === "idle" && <Send size={18} />}
                {status === "success" && (
                  <CheckCircle2 size={18} className="text-green-600" />
                )}
              </div>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
// --- Main Page ---

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const filterCapsuleRef = useRef<HTMLDivElement>(null);
  const [isProjectsActive, setIsProjectsActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"websites" | "uiux">(
    "websites",
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Project Stacking Effect ---
    // We create the timeline for projects pinning.
    // This is handled by a separate ScrollTrigger context.
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const cards = projectsSection.querySelectorAll(".project-card-wrapper");

      const ptl = gsap.timeline({
        scrollTrigger: {
          trigger: projectsSection,
          id: `projects-trigger-${activeCategory}`,
          start: "top top",
          end: `+=${(projectsData[activeCategory].length + 0.5) * 100}%`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onToggle: (self) => setIsProjectsActive(self.isActive),
        },
      });

      // Capsule entrance removed from here to prevent glitch on category switch

      cards.forEach((card, i) => {
        ptl.fromTo(
          card,
          { y: "100vh", opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          i * 1 + 0.5,
        );

        if (i > 0) {
          ptl.to(
            cards[i - 1],
            { scale: 0.95, opacity: 0.8, duration: 1, ease: "none" },
            i * 1 + 0.5,
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getById(`projects-trigger-${activeCategory}`)?.kill();
    };
  }, [activeCategory]);

  useEffect(() => {
    if (!cardRef.current || !aboutRef.current || !containerRef.current) return;

    const card = cardRef.current;

    // --- Hero Flip Animation ---
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        endTrigger: "#about",
        end: "center center",
        scrub: 1.5,
        invalidateOnRefresh: true,
        id: "hero-trigger",
      },
    });

    const isMobile = window.innerWidth < 1024;

    heroTl
      .to(card, {
        y: () => {
          const zone = document.getElementById("card-landing-zone");
          if (!zone || !card) return isMobile ? window.innerHeight * 1.4 : window.innerHeight;
          const zoneRect = zone.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          const scrollY = window.scrollY;
          const targetY = zoneRect.top + scrollY + zoneRect.height / 2;
          const currentY = cardRect.top + scrollY + cardRect.height / 2;
          return targetY - currentY;
        },
        x: () => {
          if (!isMobile) return window.innerWidth * 0.25;
          const zone = document.getElementById("card-landing-zone");
          if (!zone || !card) return 0;
          const zoneRect = zone.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          const targetX = zoneRect.left + zoneRect.width / 2;
          const currentX = cardRect.left + cardRect.width / 2;
          return targetX - currentX;
        },
        rotateY: 180,
        z: 100,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        card,
        {
          z: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2",
      );

    // Glare animation
    const frontGlare = card.querySelector(".front-glare");
    const backGlare = card.querySelector(".back-glare");

    if (frontGlare) {
      heroTl.to(
        frontGlare,
        { xPercent: 200, opacity: 0, duration: 0.5, ease: "none" },
        0,
      );
    }
    if (backGlare) {
      heroTl.fromTo(
        backGlare,
        { xPercent: -200, opacity: 0 },
        { xPercent: 100, opacity: 0.5, duration: 0.5, ease: "none" },
        0.5,
      );
    }

    // --- Persistent Capsule Entrance ---
    if (filterCapsuleRef.current) {
      gsap.fromTo(
        filterCapsuleRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#projects",
            start: "top top",
            end: "top top",
            toggleActions: "play none none none",
            id: "capsule-entrance",
          },
        },
      );
    }

    return () => {
      // Only kill the hero trigger on actual unmount
      ScrollTrigger.getById("hero-trigger")?.kill();
      ScrollTrigger.getById("capsule-entrance")?.kill();
    };
  }, []);

  return (
    <>
      <SmoothScroll>
        <main ref={containerRef} className="min-h-screen bg-background">
          <Navbar isProjectsActive={isProjectsActive} />

          {/* Pass cardRef to Hero */}
          <HeroInternal cardRef={cardRef} />

          {/* About Section */}
          <section
            id="about"
            ref={aboutRef}
            className="relative min-h-[120vh] lg:min-h-screen flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-20 bg-neutral-950 overflow-hidden py-24 lg:py-0"
          >
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                <h2 className="font-bebas text-7xl md:text-9xl text-white mb-8">
                  About Me
                </h2>
                <div className="space-y-6 max-w-xl">
                  <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
                    I am a passionate Full-stack Developer and UI/UX Designer
                    who loves to bridge the gap between complex logic and
                    beautiful aesthetics.
                  </p>
                  <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
                    With years of experience in the digital space, I specialize
                    in building high-performance, interactive websites that tell
                    a story.
                  </p>
                </div>
              </div>

              {/* Card Landing Zone - Always present to take up space on mobile */}
              <div
                className="h-[350px] sm:h-[450px] lg:h-[600px] w-full relative"
                id="card-landing-zone"
              />
            </div>
          </section>

          <section
            id="projects"
            className="relative h-screen bg-neutral-950 overflow-hidden"
          >
            {/* Big Bold Background Heading - Absolute Middle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <h2 className="font-bebas text-[22vw] md:text-[25vw] leading-none text-white/5 font-normal tracking-tighter text-center">
                PROJECTS
              </h2>
            </div>

            {/* Top Controls: Filter Capsule */}
            <div
              ref={filterCapsuleRef}
              className="absolute top-20 left-0 right-0 z-30 flex justify-center px-6 pt-1"
              style={{ opacity: 0 }} // Hidden initially for GSAP to reveal
            >
              <div className="flex bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-xl relative overflow-hidden">
                {/* Persistent Sliding Indicator */}
                <motion.div
                  className="absolute top-1 bottom-1 left-1 bg-accent rounded-full z-0"
                  initial={false}
                  animate={{
                    x: activeCategory === "websites" ? 0 : "100%",
                    width: "calc(50% - 4px)", // Accounts for padding
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 1,
                  }}
                />
                {(["websites", "uiux"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "relative w-24 sm:w-28 md:w-32 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 flex items-center justify-center z-10",
                      activeCategory === cat
                        ? "text-black"
                        : "text-white/40 hover:text-white",
                    )}
                  >
                    <span className="relative z-10">
                      {cat === "websites" ? "Websites" : "UI & UX"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stacking Cards Container */}
            <div className="relative h-full flex items-center justify-center pt-24 md:pt-32 z-10">
              {projectsData[activeCategory].map((project, index) => (
                <div
                  key={index}
                  className="project-card-wrapper absolute w-full max-w-7xl px-6"
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </section>

          <ContactSection />

          <footer className="bg-neutral-950 py-12 border-t border-white/5">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="font-bebas text-2xl text-white tracking-widest">
                MINTU<span className="text-accent">.</span>
              </div>
              <p className="text-neutral-500 text-xs tracking-widest uppercase">
                &copy; {new Date().getFullYear()} All Rights Reserved
              </p>
              <div className="flex gap-6">
                {[
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/mintu-singh-z/",
                  },
                  { name: "GitHub", url: "https://github.com/MintuSingh07" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-white transition-colors text-[10px] font-bold tracking-widest uppercase"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </main>
      </SmoothScroll>
    </>
  );
}

// Rename Hero to HeroInternal and accept ref
const HeroInternal = ({
  cardRef,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !containerRef.current) return;

      // Only apply parallax if we haven't scrolled too far
      if (window.scrollY > 300) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();

      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      gsap.to(cardRef.current, {
        rotateY: x * 20,
        rotateX: -y * 20,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cardRef]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background pt-20"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_70%)] [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-xs font-medium tracking-widest uppercase text-neutral-400"
          >
            Mintu · Creative Portfolio
          </motion.p>

          <div className="relative flex w-full max-w-7xl flex-col items-center justify-center lg:flex-row lg:gap-8 xl:gap-16">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "circOut", delay: 0.4 }}
              className="font-bebas text-[22vw] sm:text-[18vw] leading-[0.8] text-white lg:text-[10rem] xl:text-[13rem] z-10"
            >
              WEB
              <br className="lg:hidden" />
              DEV
            </motion.h1>

            {/* Central Card Wrapper */}
            <div className="relative my-10 shrink-0 lg:my-0 [perspective:5000px] [transform-style:preserve-3d] z-20">
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, rotateX: 180 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 1.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3,
                }}
                onAnimationComplete={() => {
                  if (cardRef.current) {
                    cardRef.current.style.transform = "";
                    gsap.set(cardRef.current, {
                      rotateX: 0,
                      rotateY: 0,
                      transformPerspective: 1000,
                    });
                  }
                }}
                className="relative h-[400px] w-[280px] sm:h-[480px] sm:w-[320px] rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-neutral-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] md:h-[550px] md:w-[380px] [transform-style:preserve-3d]"
              >
                {/* Thickness Layers */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-[2.5rem] border border-white/5 bg-neutral-900/80"
                    style={{ transform: `translateZ(-${(i + 1) * 0.8}px)` }}
                  />
                ))}

                {/* Front Side */}
                <div className="absolute inset-0 [backface-visibility:hidden] z-10 [transform-style:preserve-3d]">
                  <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/10">
                    <div className="absolute inset-0 bg-neutral-800">
                      {!imageLoaded && (
                        <div className="absolute inset-0 w-full h-full bg-neutral-700 animate-pulse" />
                      )}
                      <img
                        ref={imgRef}
                        src="/self-2.png"
                        alt="Mintu Portrait"
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        className={cn(
                          "h-full w-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700",
                          imageLoaded ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </div>

                    {/* Front Glare */}
                    <div className="front-glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(6px)] z-0 [transform-style:preserve-3d]">
                  <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-accent/20 bg-neutral-900 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                    {/* Back Glare */}
                    <div className="back-glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full" />

                    <div className="flex flex-col items-center mb-4 sm:mb-6 relative z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-3 sm:mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-accent/20 blur-md animate-pulse" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent rounded-full shadow-[0_0_15px_rgba(74,222,128,0.8)]" />
                      </div>
                      <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-[0.1em] leading-none">
                        VISION
                      </h3>
                    </div>

                    <div className="w-full text-center px-1 sm:px-2 relative z-10 space-y-4 sm:space-y-6">
                      <p className="text-white/90 text-[14px] sm:text-[15px] leading-relaxed font-light italic">
                        "The web should be{" "}
                        <span className="text-white font-bold not-italic">
                          felt
                        </span>
                        , not just seen."
                      </p>

                      <div className="h-px w-12 bg-white/10 mx-auto" />

                      <p className="text-neutral-400 text-xs leading-relaxed">
                        By fusing high-end design with merciless performance, I
                        craft digital experiences that refuse to be ignored.
                        Every pixel has a purpose.
                      </p>

                      <div className="pt-2 sm:pt-4">
                        <p className="text-accent text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] font-bold uppercase inline-block border border-accent/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/5">
                          Stay Inspired
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    opacity: { delay: 1.8, duration: 0.4 },
                  }}
                  className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 z-20 flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-full bg-accent text-black shadow-xl [transform:translateZ(50px)]"
                >
                  <div className="relative h-full w-full">
                    <motion.div
                      initial={{ y: 0 }}
                      animate={{ y: "-100%" }}
                      transition={{
                        delay: 3.8,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute inset-0 flex items-center justify-center text-3xl font-bold"
                    >
                      Hi
                    </motion.div>

                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: 3.8,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute inset-0 flex items-center justify-center p-4"
                    >
                      <motion.img
                        src="/bye.png"
                        alt="Waving hand"
                        loading="lazy"
                        className="h-full w-full object-contain origin-bottom"
                        animate={{
                          rotate: [
                            0, 5, -5, 12, -12, 18, -18, 18, -18, 12, -12, 5, -5,
                            0,
                          ],
                        }}
                        transition={{
                          delay: 4.4,
                          duration: 1.8,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "loop",
                          repeatDelay: 2,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "circOut", delay: 0.6 }}
                className="font-bebas text-[22vw] sm:text-[18vw] leading-[0.8] text-white lg:text-[10rem] xl:text-[13rem]"
              >
                DESIGNER
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-6 max-w-[280px]"
              >
                <p className="text-sm font-light leading-relaxed text-neutral-400">
                  Full-stack Web Developer & UI/UX Designer crafting digital
                  experiences.
                </p>
              </motion.div>

              {/* Mobile Color Switcher - Positioned directly under text */}
              <div className="mt-12 md:hidden">
                <ColorSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Switcher — Bottom Right (Desktop Only) */}
      <div className="hidden md:block absolute md:bottom-12 md:right-12 z-50">
        <ColorSwitcher />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-px bg-white/20" />
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">
            Scroll
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const FigmaIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 38 57"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <path d="M19 28.5C19 25.0192 21.8192 22.2 25.3 22.2C28.7808 22.2 31.6 25.0192 31.6 28.5C31.6 31.9808 28.7808 34.8 25.3 34.8C21.8192 34.8 19 31.9808 19 28.5Z" />
    <path d="M0 47.5C0 44.0192 2.81924 41.2 6.3 41.2H12.7V53.8C12.7 53.8 12.7 53.8 12.7 53.8C12.7 55.5673 11.2673 57 9.5 57C7.73269 57 6.3 55.5673 6.3 53.8C6.3 53.8 6.3 53.8 6.3 53.8V47.5H0Z" />
    <path d="M19 0H25.3C28.7808 0 31.6 2.81924 31.6 6.3C31.6 9.78076 28.7808 12.6 25.3 12.6H19V0Z" />
    <path d="M0 28.5C0 25.0192 2.81924 22.2 6.3 22.2H12.7V34.8H6.3C2.81924 34.8 0 31.9808 0 28.5Z" />
    <path d="M0 6.3C0 2.81924 2.81924 0 6.3 0H12.7V12.6H6.3C2.81924 12.6 0 9.78076 0 6.3Z" />
  </svg>
);

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, [project.image]);

  return (
    <div className="relative w-full h-[85vh] sm:h-[80vh] md:h-[85vh] rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-neutral-900 shadow-2xl overflow-hidden flex flex-col md:flex-row">
      <div className="flex flex-col md:flex-row w-full h-full relative overflow-y-auto md:overflow-hidden">
        {/* Subtle interior glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

        {/* Content Side */}
        <div className="p-8 md:p-12 flex flex-col justify-between w-full md:w-1/2 relative z-10">
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-bebas text-5xl md:text-7xl text-white/5 select-none text-left">
                {project.id}
              </span>
              <button
                onClick={() => window.open(project.link, "_blank")}
                className="group relative overflow-hidden rounded-full border border-white/20 px-4 md:px-6 py-2 md:py-2 text-[9px] md:text-[10px] tracking-widest uppercase font-bold text-white transition-all hover:border-accent"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                  {project.link?.includes("figma.com") && <FigmaIcon />}
                  {project.link?.includes("figma.com")
                    ? "View in Figma"
                    : "Live Project"}
                </span>
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-accent" />
                <p className="text-[10px] tracking-[0.3em] uppercase text-accent font-bold text-left">
                  CLIENT: {project.client}
                </p>
              </div>
              <h3 className="font-bebas text-4xl md:text-7xl text-white leading-none text-left">
                {project.title}
              </h3>
              {project.description && (
                <div className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-lg text-left line-clamp-5">
                  {project.description}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 flex-wrap mt-6 md:mt-8">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-[8px] md:text-[9px] uppercase tracking-[0.1em] font-semibold text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Visual Side */}
        <div className="w-full md:w-1/2 h-[40%] sm:h-[45%] md:h-full bg-neutral-800/50 relative group overflow-hidden border-t md:border-t-0 md:border-l border-white/10 shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.image || project.gradient}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              {project.image ? (
                <>
                  {!imageLoaded && (
                    <div
                      className={cn(
                        "absolute inset-0 w-full h-full opacity-40 animate-pulse bg-gradient-to-br z-0",
                        project.gradient,
                      )}
                    />
                  )}
                  <img
                    ref={imgRef}
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    className={cn(
                      "w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 relative z-10",
                      imageLoaded ? "opacity-100" : "opacity-0",
                    )}
                  />
                </>
              ) : (
                <div
                  className={cn(
                    "w-full h-full bg-gradient-to-br opacity-40 group-hover:opacity-60 transition-opacity duration-700",
                    project.gradient,
                  )}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Decorative Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          {/* View Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Color Switcher Component ---

const ColorSwitcher = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const themes = [
    { name: "Indigo", color: "#6366f1" },
    { name: "Gold", color: "#fbbf24" },
    { name: "Mint", color: "#4ade80" },
  ];

  const applyTheme = (color: string) => {
    document.documentElement.style.setProperty("--color-accent", color);
  };

  return (
    <div className="relative flex items-center justify-center md:justify-end h-10 min-w-[120px]">
      <div className="flex items-center">
        {themes.map((theme, index) => (
          <motion.button
            key={theme.name}
            onClick={(e) => {
              if (!isExpanded) {
                setIsExpanded(true);
                e.stopPropagation();
              } else {
                applyTheme(theme.color);
              }
            }}
            initial={false}
            animate={{
              // Negative margin-left creates the overlap from left-to-right
              // First item (index 0) has no margin.
              marginLeft: index === 0 ? 0 : isExpanded ? 12 : -20,
              scale: 1,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            whileHover={{
              scale: 1.15,
              zIndex: 100,
              boxShadow: `0 0 20px ${theme.color}60`,
            }}
            whileTap={{ scale: 0.95 }}
            className="h-8 w-8 rounded-full border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.4)] cursor-pointer transition-shadow shrink-0 relative"
            style={{
              backgroundColor: theme.color,
              zIndex: 50 + index,
            }}
            title={theme.name}
          />
        ))}

        {/* Transparent overlay for the stack when collapsed to catch first click */}
        {!isExpanded && (
          <div
            className="absolute right-0 h-8 w-8 rounded-full cursor-pointer z-[110]"
            onClick={() => setIsExpanded(true)}
          />
        )}
      </div>

      {/* Muted close icon */}
      {isExpanded && (
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setIsExpanded(false)}
          className="ml-2 p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/30 hover:text-white transition-colors"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};
