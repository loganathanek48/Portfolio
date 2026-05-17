import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import {
  Code2, Server, Database, Cloud, Award, GraduationCap,
  Mail, Phone, Linkedin, ExternalLink, ChevronDown, Shield,
  Layers, Users, Download, Activity, Github, CheckCircle
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs text-primary/60">{number}</span>
      <span className="font-mono text-xs tracking-widest text-primary uppercase opacity-80">{children}</span>
      <span className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 leading-tight">
      {children}
    </h2>
  );
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Tag({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span className={`px-2.5 py-0.5 text-xs font-mono rounded border ${
      accent
        ? "border-primary/30 text-primary/80 bg-primary/[0.05]"
        : "border-white/[0.08] text-muted-foreground bg-white/[0.03]"
    }`}>
      {children}
    </span>
  );
}

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const allSections = ["hero", "about", "skills", "experience", "projects", "production", "certifications", "achievements", "contact"];
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const current = allSections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 130 && rect.bottom >= 130;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
        style={{ scaleX, boxShadow: "0 0 8px hsl(var(--primary) / 0.7)" }}
      />

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-lg border-b border-white/[0.05]" : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-mono font-bold text-sm tracking-widest text-foreground hover:text-primary transition-colors"
            data-testid="nav-logo"
          >
            LOGANATHAN E
          </button>
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                data-testid={`nav-link-${id}`}
                className={`text-sm font-medium transition-colors relative group ${
                  activeSection === id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                  activeSection === id ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>
            ))}
          </div>
          <a
            href="/Loganathan_E_Resume.pdf"
            download="Loganathan_E_Resume.pdf"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-primary/40 text-primary text-sm font-medium rounded hover:bg-primary/10 transition-all"
            data-testid="nav-download-resume"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.045) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-8 opacity-80">
              Backend Developer — Java &amp; Spring Boot
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-[82px] font-bold tracking-tight leading-[1.06] mb-7">
              Loganathan E
              <br />
              <span className="text-transparent bg-clip-text" style={{
                backgroundImage: "linear-gradient(90deg, hsl(var(--primary)), hsl(188 80% 68%))",
              }}>
                builds resilient
              </span>
              <br />
              backend systems.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
              5+ years building and supporting enterprise banking applications and backend services with a focus on reliable releases and production stability.
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {["Java", "Spring Boot", "REST APIs", "GitLab CI/CD", "OpenShift", "AWS"].map(t => (
                <Tag key={t} accent>{t}</Tag>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("experience")}
                className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:brightness-110 transition-all shadow-[0_0_18px_hsl(var(--primary)/0.2)]"
                data-testid="btn-view-experience"
              >
                View Experience
              </button>
              <a
                href="/Loganathan_E_Resume.pdf"
                download="Loganathan_E_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.05] border border-white/[0.1] text-sm font-semibold rounded-sm hover:border-primary/50 hover:text-primary transition-all"
                data-testid="btn-download-resume"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
              <a
                href="mailto:loganathanek48@gmail.com"
                className="px-5 py-2.5 border border-white/[0.07] text-sm font-semibold rounded-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
                data-testid="btn-contact"
              >
                Contact Me
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="mt-16 pt-10 border-t border-white/[0.05] grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "5+", label: "Years Experience" },
              { value: "0", label: "Zero Open Defects in Key Releases" },
              { value: "2,500+", label: "Test Cases Automated" },
              { value: "50%", label: "Testing Time Reduced" },
            ].map((stat, i) => (
              <div key={i} data-testid={`hero-stat-${i}`}>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground/40" />
        </motion.div>
      </section>

      {/* ── 01 ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="py-24 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <SectionLabel number="01">About</SectionLabel>
            <div className="grid md:grid-cols-2 gap-14 items-start">
              <div>
                <SectionHeading>Backend development<br />with a quality focus.</SectionHeading>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                  <p>
                    Backend Developer with 5+ years of experience building and supporting enterprise applications. Started my career in automation engineering and expanded into backend development, bringing a quality-focused mindset into software engineering.
                  </p>
                  <p>
                    Currently working on enterprise banking applications at Capgemini using Java, REST and SOAP APIs, CI/CD pipelines, OpenShift deployments, and production support.
                  </p>
                  <p>
                    Experienced in debugging production issues, improving release reliability, and building maintainable backend services. My testing background helps me write more reliable code and identify issues early in the development lifecycle.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Server, label: "Domain", value: "Enterprise Banking", sub: "Financial applications" },
                  { icon: Shield, label: "Release Quality", value: "Zero Defects", sub: "Across production releases" },
                  { icon: Code2, label: "Core Stack", value: "Java · Spring Boot", sub: "REST · SOAP · Maven" },
                  { icon: Cloud, label: "Infrastructure", value: "OpenShift · AWS", sub: "GitLab CI/CD · Tomcat" },
                ].map((item, i) => (
                  <div key={i} className="p-5 border border-white/[0.07] rounded bg-white/[0.02] hover:border-primary/25 transition-colors group" data-testid={`about-card-${i}`}>
                    <item.icon className="w-4 h-4 text-primary mb-3" />
                    <div className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="font-semibold text-sm text-foreground mb-0.5">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 02 SKILLS ───────────────────────────────────────────────── */}
      <section id="skills" className="py-24 border-t border-white/[0.05] bg-black/25">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <SectionLabel number="02">Skills</SectionLabel>
            <SectionHeading>What I work with.</SectionHeading>
          </AnimatedSection>
          <motion.div
            variants={stagger} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                icon: Code2, title: "Core Backend",
                skills: ["Java", "Spring Boot", "REST APIs", "SOAP", "SQL", "Maven"],
              },
              {
                icon: Cloud, title: "DevOps & Cloud",
                skills: ["GitLab CI/CD", "Red Hat OpenShift", "AWS (EC2, Lambda, Cloud Fundamentals)", "Tomcat"],
              },
              {
                icon: Database, title: "Databases",
                skills: ["Oracle", "PostgreSQL", "PL/SQL"],
              },
              {
                icon: Shield, title: "Additional",
                skills: ["Selenium", "Karate", "UFT", "Postman", "JMeter", "Git", "Jira", "Confluence"],
              },
            ].map((cat, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-5 border border-white/[0.07] rounded bg-white/[0.01] hover:border-primary/25 transition-all"
                data-testid={`skill-card-${i}`}
              >
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/[0.06]">
                  <div className="w-7 h-7 rounded flex items-center justify-center bg-primary/10">
                    <cat.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{cat.title}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.skills.map((s, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 03 EXPERIENCE ───────────────────────────────────────────── */}
      <section id="experience" className="py-24 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <SectionLabel number="03">Experience</SectionLabel>
            <SectionHeading>Where I've worked.</SectionHeading>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-primary/15 to-transparent" />

            {[
              {
                role: "Software Engineer — Backend Development",
                company: "Capgemini",
                period: "Jun 2024 – Present",
                bullets: [
                  "Developed and enhanced Java-based backend services for enterprise banking applications",
                  "Designed and modified REST and SOAP APIs to support business requirements",
                  "Implemented new functionality and updated service logic across multiple modules",
                  "Integrated downstream services and handled request and response processing",
                  "Supported deployments and monitoring in Red Hat OpenShift environments",
                  "Built and maintained GitLab CI/CD deployment workflows",
                  "Assisted with AWS-based environments and service integrations",
                  "Debugged production issues using logs, backend analysis, and API validation",
                  "Collaborated with frontend teams for API integration",
                ],
                impact: [
                  "Delivered multiple stable releases with zero open production defects",
                  "Improved deployment reliability and reduced manual effort",
                ],
                tags: ["Java", "Spring Boot", "REST", "SOAP", "GitLab CI/CD", "OpenShift", "Tomcat", "AWS"],
              },
              {
                role: "Automation Test Engineer",
                company: "Tata Consultancy Services",
                period: "Aug 2020 – Jun 2024",
                bullets: [
                  "Developed and maintained automation frameworks using Selenium, UFT, and RPA tools",
                  "Automated 2,500+ test cases, cutting execution time by 50%",
                  "Integrated automated test suites into CI/CD pipelines to catch issues earlier in the release cycle",
                  "Worked with REST and SOAP APIs for request validation and backend testing",
                  "Developed Java-based utilities for business workflows",
                  "Supported debugging through log analysis and SQL validation",
                ],
                impact: [
                  "Improved release quality through systematic automation and validation practices",
                ],
                tags: ["Selenium", "UFT", "UiPath", "Karate", "Java", "SQL", "CI/CD", "PostgreSQL"],
              },
            ].map((job, i) => (
              <AnimatedSection key={i} className="relative pl-10 pb-12">
                <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border-2 border-primary bg-background flex items-center justify-center shadow-[0_0_10px_hsl(var(--primary)/0.4)]">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="border border-white/[0.07] rounded p-6 bg-white/[0.01] hover:border-primary/20 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold text-foreground">{job.role}</h3>
                  </div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-sm font-semibold text-muted-foreground">{job.company}</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="font-mono text-xs text-muted-foreground">{job.period}</span>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 border border-primary/15 rounded bg-primary/[0.03] mb-5">
                    <span className="font-mono text-[10px] text-primary/50 uppercase tracking-wider block mb-2">Impact</span>
                    <ul className="space-y-1">
                      {job.impact.map((imp, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-primary/80">
                          <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          {imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 PROJECTS ─────────────────────────────────────────────── */}
      <section id="projects" className="py-24 border-t border-white/[0.05] bg-black/25">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <SectionLabel number="04">Projects</SectionLabel>
            <SectionHeading>What I've built.</SectionHeading>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Project 1 */}
            <AnimatedSection>
              <div className="relative border border-white/[0.07] rounded p-7 bg-white/[0.01] hover:border-primary/25 transition-all overflow-hidden h-full" data-testid="project-card-0">
                <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                  style={{ background: "radial-gradient(circle at top right, hsl(var(--primary)/0.05), transparent 70%)" }} />
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded border border-primary/25 bg-primary/10 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-0.5">Enterprise Banking Backend System</h4>
                    <p className="text-xs font-mono text-muted-foreground/60">Capgemini · 2024 – Present</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["Java", "Spring Boot", "REST API", "OpenShift", "GitLab CI/CD"].map(t => (
                    <Tag key={t} accent>{t}</Tag>
                  ))}
                </div>
                <ul className="space-y-2">
                  {[
                    "Enhanced backend service logic and implemented new modules",
                    "Designed and modified REST and SOAP APIs",
                    "Integrated downstream services and handled data processing",
                    "Supported deployments and release activities in OpenShift",
                    "Investigated and resolved production issues using logs and API tracing",
                  ].map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Project 2 */}
            <AnimatedSection>
              <div className="relative border border-white/[0.07] rounded p-7 bg-white/[0.01] hover:border-primary/25 transition-all overflow-hidden h-full" data-testid="project-card-1">
                <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                  style={{ background: "radial-gradient(circle at top right, hsl(var(--primary)/0.05), transparent 70%)" }} />
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded border border-primary/25 bg-primary/10 flex items-center justify-center shrink-0">
                    <Code2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-0.5">Learning Habit Tracker</h4>
                    <p className="text-xs font-mono text-muted-foreground/60">Personal Project</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["Java", "Spring Boot", "PostgreSQL", "REST APIs"].map(t => (
                    <Tag key={t} accent>{t}</Tag>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Built a backend application for tracking learning goals and daily habits, focusing on clean REST API design and maintainable service architecture.
                </p>
                <ul className="space-y-2">
                  {[
                    "User profile management",
                    "Daily task tracking",
                    "Progress monitoring",
                    "CRUD REST APIs with validation",
                    "PostgreSQL persistence with structured schema",
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 05 PRODUCTION EXPERIENCE ────────────────────────────────── */}
      <section id="production" className="py-24 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <SectionLabel number="05">Production Experience</SectionLabel>
            <SectionHeading>Hands-on with live systems.</SectionHeading>
          </AnimatedSection>
          <motion.div
            variants={stagger} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { icon: Cloud, title: "Deployment & Release", desc: "Supported deployment and release activities using GitLab CI/CD and OpenShift environments." },
              { icon: Activity, title: "Monitoring & Logs", desc: "Debugged production issues using logs and backend analysis. Monitored service health in OpenShift." },
              { icon: Code2, title: "API Troubleshooting", desc: "Performed API troubleshooting and service validation across REST and SOAP integrations." },
              { icon: Shield, title: "Release Validation", desc: "Validated releases before and after deployment to confirm zero open defects and stable service behaviour." },
              { icon: Server, title: "CI/CD Workflows", desc: "Worked with GitLab CI/CD pipelines to automate builds, tests, and deployments." },
              { icon: Database, title: "Backend Service Monitoring", desc: "Monitored and supported Java-based backend services running in enterprise banking environments." },
              { icon: Server, title: "Environment Support", desc: "Supported applications running in Tomcat and OpenShift environments across development and production." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-5 border border-white/[0.07] rounded bg-white/[0.01] hover:border-primary/25 transition-all group"
                data-testid={`production-card-${i}`}
              >
                <div className="w-8 h-8 rounded bg-primary/10 border border-primary/15 flex items-center justify-center mb-4">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 06 CERTIFICATIONS ───────────────────────────────────────── */}
      <section id="certifications" className="py-24 border-t border-white/[0.05] bg-black/25">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <SectionLabel number="06">Certifications</SectionLabel>
            <SectionHeading>Credentials.</SectionHeading>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Cert */}
            <AnimatedSection>
              <div className="flex items-start gap-4 p-6 border border-white/[0.07] rounded bg-white/[0.01] hover:border-primary/25 transition-colors" data-testid="cert-item">
                <div className="w-10 h-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Google IT Automation with Python</h4>
                  <p className="text-sm text-muted-foreground">Professional Certificate</p>
                  <p className="text-xs font-mono text-primary/60 mt-1">Google</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Education */}
            <AnimatedSection>
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">Education</h3>
              <div className="space-y-5">
                {[
                  { degree: "MCA — Computer Applications", institution: "Institute of Distance Education, University of Madras", period: "2021 – 2023" },
                  { degree: "BCA — Computer Applications", institution: "Alpha Arts and Science College", period: "2017 – 2020" },
                ].map((edu, i) => (
                  <div key={i} className="flex items-start gap-4" data-testid={`edu-item-${i}`}>
                    <div className="w-8 h-8 rounded bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-0.5">{edu.degree}</h4>
                      <p className="text-xs text-muted-foreground">{edu.institution}</p>
                      <p className="text-xs font-mono text-muted-foreground/50">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 07 ACHIEVEMENTS ─────────────────────────────────────────── */}
      <section id="achievements" className="py-24 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <SectionLabel number="07">Achievements</SectionLabel>
            <SectionHeading>Recognition and results.</SectionHeading>
          </AnimatedSection>

          {/* Stat callouts */}
          <motion.div
            variants={stagger} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {[
              { value: "5+", label: "Years Experience" },
              { value: "2,500+", label: "Test Cases Automated" },
              { value: "50%", label: "Efficiency Improvement" },
              { value: "0", label: "Zero Open Defects in Key Releases" },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="p-5 border border-white/[0.07] rounded bg-white/[0.01] text-center"
                data-testid={`achievement-stat-${i}`}
              >
                <div className="text-3xl font-bold text-primary mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Award cards */}
          <motion.div
            variants={stagger} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-4"
          >
            {[
              {
                title: "Applause for Team Award",
                org: "Capgemini",
                desc: "Recognised for an integrated release with 30+ defects identified and resolved, deployed to production with zero open issues.",
              },
              {
                title: "Beyond Excellence Award",
                org: "TCS",
                desc: "Awarded for automating the Mainframe dataset migration, connecting data flows across 3 systems, and building automation frameworks for Cigna Healthcare.",
              },
              {
                title: "Service & Commitment Award",
                org: "TCS",
                desc: "Recognised for completing 3 years with consistent contribution and reliable delivery.",
              },
            ].map((award, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-start gap-4 p-5 border border-white/[0.07] rounded bg-white/[0.01] hover:border-primary/25 transition-colors"
                data-testid={`award-card-${i}`}
              >
                <div className="w-8 h-8 rounded bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="font-semibold text-sm text-foreground">{award.title}</h4>
                    <span className="text-[10px] font-mono text-muted-foreground/50">{award.org}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{award.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Extra-curriculars */}
          <AnimatedSection className="mt-10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">Extra-curriculars</h3>
            <div className="flex flex-wrap gap-4">
              {[
                { role: "Volunteer", org: "Purpose for Life, TCS" },
                { role: "Cadet", org: "National Cadet Corps (NCC)" },
                { role: "Department Secretary", org: "Alpha Arts and Science College" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 border border-white/[0.07] rounded bg-white/[0.01]" data-testid={`extra-item-${i}`}>
                  <Users className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="font-semibold text-sm text-foreground">{item.role}</span>
                    <span className="text-muted-foreground/50 mx-1.5">·</span>
                    <span className="text-xs text-muted-foreground">{item.org}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 08 CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="py-24 border-t border-white/[0.05] bg-black/25">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <SectionLabel number="08">Contact</SectionLabel>
            <div className="grid md:grid-cols-2 gap-14 items-start">
              <div>
                <SectionHeading>Let's connect.</SectionHeading>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Interested in backend development, enterprise systems, or opportunities? Feel free to connect.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: "Email", value: "loganathanek48@gmail.com", href: "mailto:loganathanek48@gmail.com" },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/loganathane", href: "https://linkedin.com/in/loganathane" },
                ].map((c, i) => (
                  <a key={i} href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 border border-white/[0.07] rounded bg-white/[0.01] hover:border-primary/35 hover:bg-primary/[0.03] transition-all group"
                    data-testid={`contact-link-${i}`}
                  >
                    <div className="w-9 h-9 rounded bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <c.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-0.5">{c.label}</div>
                      <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{c.value}</div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground/20 group-hover:text-primary/40 transition-colors shrink-0" />
                  </a>
                ))}

                {/* Resume download */}
                <a href="/Loganathan_E_Resume.pdf" download="Loganathan_E_Resume.pdf"
                  className="flex items-center gap-4 p-4 border border-primary/25 rounded bg-primary/[0.04] hover:border-primary/50 hover:bg-primary/[0.07] transition-all group"
                  data-testid="contact-resume-download"
                >
                  <div className="w-9 h-9 rounded bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-primary/50 uppercase tracking-wider mb-0.5">Resume</div>
                    <div className="text-sm font-medium text-primary">Download PDF</div>
                  </div>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-7 border-t border-white/[0.05] bg-black/40">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted-foreground/40">
            © {new Date().getFullYear()} Loganathan E · Designed and developed by Loganathan E
          </p>
          <div className="flex items-center gap-5">
            <a href="mailto:loganathanek48@gmail.com" className="text-xs text-muted-foreground/40 hover:text-primary transition-colors font-mono">Email</a>
            <a href="https://linkedin.com/in/loganathane" target="_blank" rel="noreferrer" className="text-xs text-muted-foreground/40 hover:text-primary transition-colors font-mono">LinkedIn</a>
            <a href="https://github.com/loganathane" target="_blank" rel="noreferrer" className="text-xs text-muted-foreground/40 hover:text-primary transition-colors font-mono">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
