"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ReactLenis, useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";

const projectsData = {
  websites: [
    {
      id: "01",
      client: "Nexus Analytics",
      title: "AI Business Dashboard",
      image: "/projects/nexus.png",
      tags: ["React", "GSAP", "AI"],
      gradient: "from-blue-600/20 to-purple-600/20",
    },
    {
      id: "02",
      client: "Pixel Forge",
      title: "Digital Agency Portfolio",
      image: null,
      tags: ["Next.js", "Framer Motion"],
      gradient: "from-amber-500/20 to-orange-600/20",
    },
    {
      id: "03",
      client: "Cloud Horizon",
      title: "SaaS Marketing Site",
      image: null,
      tags: ["Tailwind", "Next.js"],
      gradient: "from-indigo-500/20 to-violet-600/20",
    },
  ],
  uiux: [
    {
      id: "01",
      client: "Swift Pay",
      title: "Fintech Mobile App",
      image: null,
      tags: ["App Design", "Banking"],
      gradient: "from-emerald-500/20 to-cyan-600/20",
    },
    {
      id: "02",
      client: "Lumina Health",
      title: "Wellness Platform",
      image: null,
      tags: ["MedTech", "UX Research"],
      gradient: "from-rose-500/20 to-orange-600/20",
    },
    {
      id: "03",
      client: "Nova Stream",
      title: "Entertainment UI",
      image: null,
      tags: ["Dark Mode", "Streaming"],
      gradient: "from-purple-500/20 to-blue-600/20",
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

const Navbar = ({ isProjectsActive }: { isProjectsActive: boolean }) => {
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
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full bg-white px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
          >
            Contact
          </button>
        )}
      </nav>
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
      },
    });

    heroTl
      .to(card, {
        y: "100vh",
        x: "25vw",
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

    // --- Projects Section Pinning & Stacking ---
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const cards = projectsSection.querySelectorAll(".project-card-wrapper");

      const ptl = gsap.timeline({
        scrollTrigger: {
          trigger: projectsSection,
          start: "top top",
          end: `+=${(projectsData[activeCategory].length + 0.5) * 100}%`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onToggle: (self) => setIsProjectsActive(self.isActive),
        },
      });

      // Reveal Capsule
      if (filterCapsuleRef.current) {
        ptl.fromTo(
          filterCapsuleRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.2,
        );
      }

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
      ScrollTrigger.getAll().forEach((t) => t.kill());
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
            className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 bg-neutral-950 overflow-hidden"
          >
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="z-10">
                <h2 className="font-bebas text-6xl md:text-9xl text-white mb-8">
                  About Me
                </h2>
                <div className="space-y-6 max-w-xl">
                  <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                    I am a passionate Full-stack Developer and UI/UX Designer
                    who loves to bridge the gap between complex logic and
                    beautiful aesthetics.
                  </p>
                  <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                    With years of experience in the digital space, I specialize
                    in building high-performance, interactive websites that tell
                    a story.
                  </p>
                </div>
              </div>

              {/* Right side is reserved for the card landing */}
              <div className="hidden lg:block h-[500px]" />
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
              <div className="flex bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-xl">
                {(["websites", "uiux"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "relative px-8 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300",
                      activeCategory === cat
                        ? "text-black"
                        : "text-white/40 hover:text-white",
                    )}
                  >
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-accent rounded-full z-0"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
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
                  key={`${activeCategory}-${index}`}
                  className="project-card-wrapper absolute w-full max-w-7xl px-6"
                >
                  <ProjectCard
                    project={project}
                    index={index}
                  />
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
                {["Instagram", "Twitter", "LinkedIn", "GitHub"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-neutral-500 hover:text-white transition-colors text-[10px] font-bold tracking-widest uppercase"
                    >
                      {social}
                    </a>
                  ),
                )}
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
              className="font-bebas text-[18vw] leading-[0.8] text-white lg:text-[10rem] xl:text-[13rem] z-10"
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
                className="relative h-[340px] w-[240px] sm:h-[480px] sm:w-[320px] rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-neutral-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] md:h-[550px] md:w-[380px] [transform-style:preserve-3d]"
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
                    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                      <div className="text-white/10 font-bebas text-4xl">
                        Creative Portrait
                      </div>
                    </div>

                    {/* Front Glare */}
                    <div className="front-glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] z-0 [transform-style:preserve-3d]">
                  <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-accent/20 bg-neutral-900 flex flex-col items-center justify-center p-8 text-center">
                    {/* Back Glare */}
                    <div className="back-glare absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full" />

                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                      <div className="text-accent text-4xl">★</div>
                    </div>
                    <h3 className="font-bebas text-4xl text-white mb-4">
                      Mintu Creative
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      Building digital excellence with precision and passion.
                    </p>
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
                className="font-bebas text-[18vw] leading-[0.8] text-white lg:text-[10rem] xl:text-[13rem]"
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
            </div>
          </div>
        </div>
      </div>

      {/* Color Switcher — Bottom Right */}
      <div className="absolute bottom-12 right-12 z-50">
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

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <div className="relative w-full h-[88vh] md:h-[80vh] rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-neutral-900 shadow-2xl overflow-hidden flex flex-col md:flex-row">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row w-full h-full"
        >
          {/* Subtle interior glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

          {/* Content Side */}
          <div className="p-8 md:p-12 flex flex-col justify-between w-full md:w-1/2 relative z-10">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-bebas text-5xl md:text-7xl text-white/5 select-none text-left">
                  {project.id}
                </span>
                 <button className="group relative overflow-hidden rounded-full border border-white/20 px-4 md:px-6 py-1.5 md:py-2 text-[8px] md:text-[10px] tracking-widest uppercase font-bold text-white transition-all hover:border-accent">
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                    Live Project
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
              </div>
            </div>

            <div className="flex gap-3 flex-wrap mt-8">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-[0.1em] font-semibold text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Side */}
          <div className="w-full md:w-1/2 h-[45%] md:h-full bg-neutral-800/50 relative group overflow-hidden border-t md:border-t-0 md:border-l border-white/10">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            ) : (
              <div
                className={cn(
                  "w-full h-full bg-gradient-to-br opacity-40 group-hover:opacity-60 transition-opacity duration-700",
                  project.gradient,
                )}
              />
            )}

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
        </motion.div>
      </AnimatePresence>
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
    <div className="relative flex items-center justify-end h-10 min-w-[120px]">
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
