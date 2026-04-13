"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ReactLenis, useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Components ---

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
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

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 p-1.5 backdrop-blur-xl">
        <div className="flex items-center gap-1 pl-1 pr-4">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-white/20 bg-white/10">
            <div className="h-full w-full bg-neutral-800" />
          </div>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
        </div>

        <button className="ml-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
          Contact
        </button>
      </nav>
    </motion.header>
  );
};

// --- Main Page ---

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!cardRef.current || !aboutRef.current || !containerRef.current) return;

    const card = cardRef.current;
    
    // Create the scroll-linked animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        endTrigger: "#about",
        end: "center center",
        scrub: 1.5,
        invalidateOnRefresh: true,
      }
    });

    // Realistic Flip with controlled Lift
    tl.to(card, {
      y: "100vh",
      x: "25vw",
      rotateY: 180,
      z: 100, // Reduced lift to prevent distortion
      duration: 1,
      ease: "power2.inOut"
    })
    .to(card, {
      z: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2");

    // Glare animation
    const frontGlare = card.querySelector(".front-glare");
    const backGlare = card.querySelector(".back-glare");
    
    if (frontGlare) {
      tl.to(frontGlare, {
        xPercent: 200,
        opacity: 0,
        duration: 0.5,
        ease: "none"
      }, 0);
    }
    
    if (backGlare) {
      tl.fromTo(backGlare, {
        xPercent: -200,
        opacity: 0
      }, {
        xPercent: 100,
        opacity: 0.5,
        duration: 0.5,
        ease: "none"
      }, 0.5);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="min-h-screen bg-background">
        <Navbar />
        
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
              <h2 className="font-bebas text-8xl md:text-9xl text-white mb-8">About Me</h2>
              <div className="space-y-6 max-w-xl">
                <p className="text-lg text-neutral-400 leading-relaxed">
                  I am a passionate Full-stack Developer and UI/UX Designer who loves to bridge the gap between complex logic and beautiful aesthetics.
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  With years of experience in the digital space, I specialize in building high-performance, interactive websites that tell a story.
                </p>
              </div>
            </div>
            
            {/* Right side is reserved for the card landing */}
            <div className="hidden lg:block h-[500px]" />
          </div>
        </section>

        <section id="projects" className="h-screen flex items-center justify-center bg-black">
          <h2 className="font-bebas text-6xl text-white/20">Projects</h2>
        </section>

        <section id="blogs" className="h-screen flex items-center justify-center bg-neutral-950">
          <h2 className="font-bebas text-6xl text-white/20">Blogs</h2>
        </section>
      </main>
    </SmoothScroll>
  );
}

// Rename Hero to HeroInternal and accept ref
const HeroInternal = ({ cardRef }: { cardRef: React.RefObject<HTMLDivElement | null> }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !containerRef.current) return;

      // Only apply parallax if we haven't scrolled too far
      if (window.scrollY > 300) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();

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
              className="font-bebas text-[18vw] leading-[0.8] text-white lg:text-[10rem] xl:text-[13rem]"
            >
              WEB<br className="lg:hidden" />DEV
            </motion.h1>

            {/* Central Card Wrapper */}
            <div className="relative my-10 shrink-0 lg:my-0 [perspective:5000px] [transform-style:preserve-3d] z-20">
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, rotateX: 180 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                onAnimationComplete={() => {
                  if (cardRef.current) {
                    cardRef.current.style.transform = "";
                    gsap.set(cardRef.current, { rotateX: 0, rotateY: 0, transformPerspective: 1000 });
                  }
                }}
                className="relative h-[480px] w-[320px] rounded-[2.5rem] border border-white/10 bg-neutral-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] md:h-[550px] md:w-[380px] [transform-style:preserve-3d]"
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
                      <div className="text-white/10 font-bebas text-4xl">Creative Portrait</div>
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
                    <h3 className="font-bebas text-4xl text-white mb-4">Mintu Creative</h3>
                    <p className="text-neutral-400 text-sm">Building digital excellence with precision and passion.</p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    opacity: { delay: 1.8, duration: 0.4 },
                  }}
                  className="absolute -bottom-6 -left-6 z-20 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-accent text-black shadow-xl [transform:translateZ(50px)]"
                >
                  <div className="relative h-full w-full">
                    <motion.div
                      initial={{ y: 0 }}
                      animate={{ y: "-100%" }}
                      transition={{ delay: 3.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex items-center justify-center text-3xl font-bold"
                    >
                      Hi
                    </motion.div>

                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 3.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex items-center justify-center p-4"
                    >
                      <motion.img
                        src="/bye.png"
                        alt="Waving hand"
                        className="h-full w-full object-contain origin-bottom"
                        animate={{
                          rotate: [0, 5, -5, 12, -12, 18, -18, 18, -18, 12, -12, 5, -5, 0],
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
                  Full-stack Web Developer & UI/UX Designer crafting digital experiences.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-px bg-white/20" />
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">Scroll</p>
        </div>
      </motion.div>
    </section>
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

