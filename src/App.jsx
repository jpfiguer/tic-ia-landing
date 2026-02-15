import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Phone,
  Mail,
  Bot,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  Cpu,
  MessageSquare,
  BarChart3,
  Headphones,
  Menu,
  X,
  Linkedin,
  Twitter,
  Instagram,
  Play,
  Loader2,
  User,
  DollarSign,
  Calendar,
  CreditCard,
  CheckCircle,
  XCircle,
  Sparkles,
  MousePointer2,
  Database,
  Server,
  Layers,
  BrainCircuit
} from 'lucide-react';
import './index.css';

// ============================================
// CUSTOM CURSOR COMPONENT (Optimized)
// ============================================
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    let animationId;

    // Smooth animation loop
    const animate = () => {
      // Cursor ring follows with slight delay (smooth effect)
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

      // Dot follows instantly
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.5;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.5;

      cursor.style.left = `${cursorPos.current.x - 20}px`;
      cursor.style.top = `${cursorPos.current.y - 20}px`;

      cursorDot.style.left = `${dotPos.current.x - 4}px`;
      cursorDot.style.top = `${dotPos.current.y - 4}px`;

      animationId = requestAnimationFrame(animate);
    };

    const moveCursor = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .service-card, .feature-card, .ai-chip, input')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Start animation loop
    animationId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`} />
      <div ref={cursorDotRef} className="custom-cursor-dot" />
    </>
  );
};

// ============================================
// ANIMATED COUNTER COMPONENT
// ============================================
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={counterRef}>
      {prefix}{count}{suffix}
    </span>
  );
};

// ============================================
// TYPING EFFECT COMPONENT
// ============================================
const TypingText = ({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className="typing-text">
      {displayText}
      <span className="typing-cursor">|</span>
    </span>
  );
};

// ============================================
// MAGNETIC BUTTON COMPONENT
// ============================================
const MagneticButton = ({ children, className, href, onClick }) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    buttonRef.current.style.transform = 'translate(0, 0)';
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={buttonRef}
      className={`magnetic-btn ${className}`}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Component>
  );
};

// ============================================
// PARALLAX SECTION COMPONENT
// ============================================
const ParallaxSection = ({ children, className, speed = 0.5 }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const yPos = -(scrolled * speed);
      sectionRef.current.style.backgroundPositionY = `${yPos}px`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  );
};

// ============================================
// GLOWING CARD COMPONENT
// ============================================
const GlowingCard = ({ children, className }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className={`glowing-card ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};

// API Base URL - tu servidor VoiceIA (túnel permanente Cloudflare)
const API_BASE = 'https://api.tic-ia.com';

// Demo profiles para probar diferentes escenarios
const DEMO_PROFILES = [
  { id: 'cooperative', label: 'Cooperativo', color: '#22c55e', description: 'Cliente dispuesto a pagar' },
  { id: 'difficult', label: 'Dificil', color: '#ef4444', description: 'Cliente que pone objeciones' },
  { id: 'busy', label: 'Ocupado', color: '#f59e0b', description: 'Cliente con poco tiempo' },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Demo Call State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [debtorName, setDebtorName] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [diasMora, setDiasMora] = useState('');
  const [producto, setProducto] = useState('');
  const [profile, setProfile] = useState('cooperative');
  const [calling, setCalling] = useState(false);
  const [callResult, setCallResult] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPhone = (value) => {
    return value.replace(/[^\d+]/g, '');
  };

  const formatMoney = (amount) => {
    if (!amount) return '$0';
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };

  const handleDemoCall = async () => {
    if (!phoneNumber) return;

    setCalling(true);
    setCallResult(null);

    try {
      const res = await fetch(`${API_BASE}/calls/ultra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          debtorName: debtorName || 'Cliente Demo',
          debtAmount: debtAmount || '150000',
          daysOverdue: diasMora || '30',
          product: producto || 'Demo TIC-IA',
          // IMPORTANTE: Usar perfil 'demo' para llamadas de TIC-IA
          // Esto evita que la agente mencione "RECOVER" o "CMR Falabella"
          agentProfile: 'demo',
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Error al iniciar llamada');
      }

      const data = await res.json();
      setCallResult({ success: true, data });
    } catch (err) {
      setCallResult({ success: false, error: err.message });
    } finally {
      setCalling(false);
    }
  };

  const selectedProfile = DEMO_PROFILES.find(p => p.id === profile);

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#" className="navbar-logo">
            <img src="/favicon.svg" alt="TIC-IA" className="navbar-logo-icon-img" />
            <div className="navbar-logo-text">TIC-<span>IA</span></div>
          </a>

          <ul className="navbar-links">
            <li><a href="#problemas">Problemas</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#resultados">Resultados</a></li>
            <li><a href="#demo">Demo VoiceIA</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>

          <div className="navbar-cta">
            <a href="#contacto" className="btn btn-primary">
              Solicitar Evaluación
            </a>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-menu-links">
            <li><a href="#problemas" onClick={() => setMobileMenuOpen(false)}>Problemas</a></li>
            <li><a href="#servicios" onClick={() => setMobileMenuOpen(false)}>Servicios</a></li>
            <li><a href="#resultados" onClick={() => setMobileMenuOpen(false)}>Resultados</a></li>
            <li><a href="#demo" onClick={() => setMobileMenuOpen(false)}>Demo VoiceIA</a></li>
            <li><a href="#contacto" onClick={() => setMobileMenuOpen(false)}>Contacto</a></li>
          </ul>
          <a href="#contacto" className="btn btn-primary mobile-menu-cta" onClick={() => setMobileMenuOpen(false)}>
            Solicitar Evaluación
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient-1"></div>
          <div className="hero-gradient-2"></div>
          <div className="hero-grid"></div>
          {/* Floating orbs */}
          <div className="hero-orbs">
            <div className="hero-orb hero-orb-1"></div>
            <div className="hero-orb hero-orb-2"></div>
            <div className="hero-orb hero-orb-3"></div>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Operando en Chile y Europa
            </div>

            <h1 className="hero-title">
              Arquitectos de{' '}
              <span className="hero-title-gradient-static">Automatización Inteligente</span>
              <br />
              y Conocimiento Empresarial con IA
            </h1>

            <p className="hero-description">
              Diseñamos sistemas RAG multimodales y automatizaciones avanzadas
              para empresas industriales y medianas que necesitan{' '}
              <strong>reducir costos operativos, estructurar conocimiento
              crítico y escalar operaciones</strong> sin perder control de sus datos.
            </p>

            <div className="hero-buttons">
              <MagneticButton href="#contacto" className="btn btn-primary btn-lg btn-glow">
                Solicitar Evaluación Gratuita
                <ArrowRight size={20} />
              </MagneticButton>
              <MagneticButton href="#resultados" className="btn btn-secondary btn-lg">
                Ver Resultados
              </MagneticButton>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">10+</div>
                <div className="hero-stat-label">Proyectos IA</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">40%</div>
                <div className="hero-stat-label">Reducción Costos</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">2</div>
                <div className="hero-stat-label">Continentes</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card hero-architecture-card">
              <div className="hero-arch-header">
                <BrainCircuit size={20} />
                <span>Arquitectura IA</span>
                <div className="hero-arch-status">
                  <span className="hero-arch-dot"></span>
                  Produccion
                </div>
              </div>

              <div className="hero-arch-nodes">
                <div className="hero-arch-node hero-arch-node-center">
                  <Cpu size={18} />
                  <span>Orquestador IA</span>
                </div>
                <div className="hero-arch-node hero-arch-node-tl">
                  <Phone size={14} />
                  <span>VoiceIA</span>
                </div>
                <div className="hero-arch-node hero-arch-node-tr">
                  <Database size={14} />
                  <span>RAG</span>
                </div>
                <div className="hero-arch-node hero-arch-node-bl">
                  <Mail size={14} />
                  <span>Email IA</span>
                </div>
                <div className="hero-arch-node hero-arch-node-br">
                  <Server size={14} />
                  <span>On-Premise</span>
                </div>
              </div>

              <svg className="hero-arch-lines" viewBox="0 0 280 180">
                <line className="hero-arch-line" x1="140" y1="90" x2="50" y2="35" />
                <line className="hero-arch-line" x1="140" y1="90" x2="230" y2="35" />
                <line className="hero-arch-line" x1="140" y1="90" x2="50" y2="145" />
                <line className="hero-arch-line" x1="140" y1="90" x2="230" y2="145" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section - Qué Resolvemos */}
      <section id="problemas" className="problems-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">El Problema</span>
            <h2 className="section-title">¿Qué Resolvemos?</h2>
            <p className="section-description">
              Empresas industriales y medianas enfrentan desafíos críticos
              que afectan su rentabilidad y escalabilidad.
            </p>
          </div>

          <div className="problems-grid">
            <GlowingCard className="problem-card">
              <div className="problem-icon">
                <Clock size={32} />
              </div>
              <h3 className="problem-title">Eficiencia Perdida en Procesos Manuales</h3>
              <p className="problem-description">
                Tu equipo dedica <strong>30-40% del tiempo</strong> a tareas
                repetitivas: búsqueda de información, gestión documental,
                seguimiento de procesos. Tiempo que podrían usar en decisiones estratégicas.
              </p>
              <div className="problem-impact">
                <TrendingUp size={18} />
                <span>Hasta 40% de tiempo recuperable</span>
              </div>
            </GlowingCard>

            <GlowingCard className="problem-card">
              <div className="problem-icon">
                <Database size={32} />
              </div>
              <h3 className="problem-title">Conocimiento Técnico Disperso e Inaccesible</h3>
              <p className="problem-description">
                Manuales técnicos, planos, procedimientos operativos y conocimiento
                experto <strong>atrapados en PDFs, emails y cabezas</strong>.
                Imposible encontrar respuestas rápidas cuando se necesitan.
              </p>
              <div className="problem-impact">
                <BrainCircuit size={18} />
                <span>Conocimiento empresarial desaprovechado</span>
              </div>
            </GlowingCard>

            <GlowingCard className="problem-card">
              <div className="problem-icon">
                <Users size={32} />
              </div>
              <h3 className="problem-title">Operaciones Que No Escalan Sin Contratar</h3>
              <p className="problem-description">
                Cada nuevo cliente significa más personas. Atención al cliente,
                cobranzas, consultas técnicas: <strong>operaciones lineales
                que consumen margen</strong> y limitan el crecimiento.
              </p>
              <div className="problem-impact">
                <Zap size={18} />
                <span>Escalar 24/7 sin multiplicar headcount</span>
              </div>
            </GlowingCard>

            <GlowingCard className="problem-card">
              <div className="problem-icon">
                <Shield size={32} />
              </div>
              <h3 className="problem-title">Datos Sensibles Expuestos a Terceros</h3>
              <p className="problem-description">
                Soluciones cloud genéricas ponen tu información crítica en
                servidores externos. <strong>Cumplimiento normativo, seguridad
                industrial y confidencialidad</strong> en riesgo permanente.
              </p>
              <div className="problem-impact">
                <Server size={18} />
                <span>Control total con despliegue on-premise</span>
              </div>
            </GlowingCard>
          </div>
        </div>
      </section>

      {/* Services Section - 3 Pilares */}
      <section id="servicios" className="services">
        <div className="container">
          <div className="section-header">
            <div className="services-ai-animation">
              <div className="ai-chip ai-chip-1">
                <Database size={14} />
                <span>RAG</span>
              </div>
              <div className="ai-chip ai-chip-2">
                <Zap size={14} />
                <span>Automatización</span>
              </div>
              <div className="ai-chip ai-chip-3">
                <Server size={14} />
                <span>On-Premise</span>
              </div>
              <div className="ai-chip ai-chip-4">
                <Bot size={14} />
                <span>NLP</span>
              </div>
              <div className="ai-chip ai-chip-5">
                <Cpu size={14} />
                <span>ML</span>
              </div>
              <svg className="ai-chip-connections" viewBox="0 0 400 100">
                <path className="ai-chip-line" d="M50,50 Q100,20 150,50 T250,50 T350,50" />
                <path className="ai-chip-line ai-chip-line-2" d="M50,60 Q100,90 150,60 T250,60 T350,60" />
              </svg>
            </div>

            <span className="section-badge">Nuestros Servicios</span>
            <h2 className="section-title">Servicios Que Realmente Importan</h2>
            <p className="section-description">
              Tres pilares de arquitectura IA diseñados para resolver
              problemas reales con resultados medibles.
            </p>
          </div>

          <div className="services-grid-3col">
            {/* Pilar 1: RAG Multimodal */}
            <GlowingCard className="service-card service-card-pillar">
              <div className="service-pillar-badge">Pilar 1</div>
              <div className="service-icon">
                <Database size={32} />
              </div>
              <h3 className="service-title">Arquitectura RAG Multimodal Empresarial</h3>
              <p className="service-description">
                Estructuramos el conocimiento crítico de tu empresa en{' '}
                <strong>texto, audio, video y planos técnicos</strong> para búsquedas
                contextuales, respuestas precisas y toma de decisiones en segundos.
              </p>
              <ul className="service-features">
                <li><CheckCircle2 size={16} /> Procesamiento multimodal (documentos, audio, video)</li>
                <li><CheckCircle2 size={16} /> Embeddings vectoriales y semantic search</li>
                <li><CheckCircle2 size={16} /> Despliegue on-premise con modelos locales</li>
                <li><CheckCircle2 size={16} /> Integración ERP/SCADA/CRM existentes</li>
                <li><CheckCircle2 size={16} /> Actualización continua del conocimiento</li>
              </ul>
              <div className="service-tech-stack">
                <span className="tech-badge">Llama 3</span>
                <span className="tech-badge">Whisper</span>
                <span className="tech-badge">ChromaDB</span>
              </div>
            </GlowingCard>

            {/* Pilar 2: Automatización Inteligente */}
            <GlowingCard className="service-card service-card-pillar">
              <div className="service-pillar-badge">Pilar 2</div>
              <div className="service-icon">
                <Zap size={32} />
              </div>
              <h3 className="service-title">Automatización Inteligente de Procesos</h3>
              <p className="service-description">
                Implementamos agentes de IA que <strong>reducen tareas manuales
                críticas hasta en un 40%</strong>: atención al cliente, cobranzas,
                gestión documental y workflows operativos con inteligencia conversacional.
              </p>
              <ul className="service-features">
                <li><CheckCircle2 size={16} /> Agentes de voz con IA generativa (VoiceIA)</li>
                <li><CheckCircle2 size={16} /> Chatbots empresariales contextuales</li>
                <li><CheckCircle2 size={16} /> Automatización de email y comunicaciones</li>
                <li><CheckCircle2 size={16} /> Workflows inteligentes con decisión autónoma</li>
                <li><CheckCircle2 size={16} /> Analítica y reportería automatizada</li>
              </ul>
              <div className="service-tech-stack">
                <span className="tech-badge">GPT-4</span>
                <span className="tech-badge">ElevenLabs</span>
                <span className="tech-badge">LangChain</span>
              </div>
            </GlowingCard>

            {/* Pilar 3: Orquestación Enterprise */}
            <GlowingCard className="service-card service-card-pillar">
              <div className="service-pillar-badge">Pilar 3</div>
              <div className="service-icon">
                <Server size={32} />
              </div>
              <h3 className="service-title">Orquestación IA Enterprise & On-Premise</h3>
              <p className="service-description">
                Soluciones <strong>seguras y escalables</strong> que integran con tus
                sistemas internos (ERP, SCADA, CRM) sin exponer datos sensibles.
                Control total, cumplimiento normativo y arquitectura modular.
              </p>
              <ul className="service-features">
                <li><CheckCircle2 size={16} /> Despliegue on-premise o hybrid cloud</li>
                <li><CheckCircle2 size={16} /> Integraciones API con sistemas legacy</li>
                <li><CheckCircle2 size={16} /> Modelos locales (Llama, Mistral, Whisper)</li>
                <li><CheckCircle2 size={16} /> Arquitectura modular y escalable</li>
                <li><CheckCircle2 size={16} /> Cumplimiento GDPR y normativas industriales</li>
              </ul>
              <div className="service-tech-stack">
                <span className="tech-badge">Docker</span>
                <span className="tech-badge">Kubernetes</span>
                <span className="tech-badge">PostgreSQL</span>
              </div>
            </GlowingCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="tecnologia" className="features">
        {/* Full Width Circuit Animation */}
        <div className="features-circuit-bg">
          <div className="circuit-line-horizontal circuit-line-1">
            <div className="circuit-pulse"></div>
          </div>
          <div className="circuit-line-horizontal circuit-line-2">
            <div className="circuit-pulse"></div>
          </div>
          <div className="circuit-line-horizontal circuit-line-3">
            <div className="circuit-pulse"></div>
          </div>
          <div className="circuit-line-horizontal circuit-line-4">
            <div className="circuit-pulse"></div>
          </div>

          <div className="circuit-corner circuit-corner-tl">
            <svg viewBox="0 0 120 120">
              <path className="circuit-corner-path" d="M0,60 L40,60 L40,30 L70,30" />
              <path className="circuit-corner-path circuit-corner-path-2" d="M60,0 L60,40 L90,40" />
              <path className="circuit-corner-path circuit-corner-path-3" d="M0,90 L30,90 L30,70 L50,70" />
              <circle className="circuit-corner-node" cx="40" cy="60" r="4" />
              <circle className="circuit-corner-node" cx="70" cy="30" r="3" />
              <circle className="circuit-corner-node" cx="60" cy="40" r="3" />
              <circle className="circuit-corner-node" cx="50" cy="70" r="3" />
            </svg>
          </div>

          <div className="circuit-corner circuit-corner-tr">
            <svg viewBox="0 0 120 120">
              <path className="circuit-corner-path" d="M120,60 L80,60 L80,30 L50,30" />
              <path className="circuit-corner-path circuit-corner-path-2" d="M60,0 L60,40 L30,40" />
              <path className="circuit-corner-path circuit-corner-path-3" d="M120,90 L90,90 L90,70 L70,70" />
              <circle className="circuit-corner-node" cx="80" cy="60" r="4" />
              <circle className="circuit-corner-node" cx="50" cy="30" r="3" />
              <circle className="circuit-corner-node" cx="60" cy="40" r="3" />
              <circle className="circuit-corner-node" cx="70" cy="70" r="3" />
            </svg>
          </div>

          <div className="circuit-corner circuit-corner-bl">
            <svg viewBox="0 0 120 120">
              <path className="circuit-corner-path" d="M0,60 L40,60 L40,90 L70,90" />
              <path className="circuit-corner-path circuit-corner-path-2" d="M60,120 L60,80 L90,80" />
              <path className="circuit-corner-path circuit-corner-path-3" d="M0,30 L30,30 L30,50 L50,50" />
              <circle className="circuit-corner-node" cx="40" cy="60" r="4" />
              <circle className="circuit-corner-node" cx="70" cy="90" r="3" />
              <circle className="circuit-corner-node" cx="60" cy="80" r="3" />
              <circle className="circuit-corner-node" cx="50" cy="50" r="3" />
            </svg>
          </div>

          <div className="circuit-corner circuit-corner-br">
            <svg viewBox="0 0 120 120">
              <path className="circuit-corner-path" d="M120,60 L80,60 L80,90 L50,90" />
              <path className="circuit-corner-path circuit-corner-path-2" d="M60,120 L60,80 L30,80" />
              <path className="circuit-corner-path circuit-corner-path-3" d="M120,30 L90,30 L90,50 L70,50" />
              <circle className="circuit-corner-node" cx="80" cy="60" r="4" />
              <circle className="circuit-corner-node" cx="50" cy="90" r="3" />
              <circle className="circuit-corner-node" cx="60" cy="80" r="3" />
              <circle className="circuit-corner-node" cx="70" cy="50" r="3" />
            </svg>
          </div>

          <div className="floating-node floating-node-1"></div>
          <div className="floating-node floating-node-2"></div>
          <div className="floating-node floating-node-3"></div>
          <div className="floating-node floating-node-4"></div>
          <div className="floating-node floating-node-5"></div>
          <div className="floating-node floating-node-6"></div>
          <div className="floating-node floating-node-7"></div>
          <div className="floating-node floating-node-8"></div>
        </div>

        <div className="container">
          <div className="section-header">
            <span className="section-badge">Stack Tecnológico</span>
            <h2 className="section-title">Nuestra Tecnología</h2>
            <p className="section-description">
              Combinamos modelos de IA de última generación con arquitectura
              empresarial robusta, despliegue on-premise y seguridad industrial.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={28} />
              </div>
              <h3 className="feature-title">Ultra Rapido</h3>
              <p className="feature-description">
                Latencia minima en respuestas para una experiencia fluida y natural.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={28} />
              </div>
              <h3 className="feature-title">100% Seguro</h3>
              <p className="feature-description">
                Encriptacion de datos y cumplimiento de normativas de privacidad.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp size={28} />
              </div>
              <h3 className="feature-title">Escalable</h3>
              <p className="feature-description">
                Crece con tu negocio sin limites de capacidad ni interrupciones.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={28} />
              </div>
              <h3 className="feature-title">24/7</h3>
              <p className="feature-description">
                Operacion continua sin descansos, feriados ni turnos nocturnos.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Server size={28} />
              </div>
              <h3 className="feature-title">Modelos Locales</h3>
              <p className="feature-description">
                Llama, Whisper, Moondream y mas. Desplegados on-premise para control total.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Layers size={28} />
              </div>
              <h3 className="feature-title">Multi-Modal</h3>
              <p className="feature-description">
                Procesamos voz, texto, video, imagenes y planos tecnicos con IA.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 size={28} />
              </div>
              <h3 className="feature-title">Analytics</h3>
              <p className="feature-description">
                Metricas en tiempo real y reportes detallados de rendimiento.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={28} />
              </div>
              <h3 className="feature-title">Soporte Experto</h3>
              <p className="feature-description">
                Equipo dedicado para implementacion y optimizacion continua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section - Cómo Trabajamos */}
      <section id="metodologia" className="methodology-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Metodología</span>
            <h2 className="section-title">Cómo Trabajamos</h2>
            <p className="section-description">
              Proceso estructurado de 4 fases con métricas medibles en cada etapa.
            </p>
          </div>

          <div className="methodology-timeline">
            <div className="methodology-phase">
              <div className="phase-number">01</div>
              <div className="phase-content">
                <div className="phase-icon">
                  <BarChart3 size={28} />
                </div>
                <h3 className="phase-title">Diagnóstico y Mapeo</h3>
                <p className="phase-description">
                  Analizamos tu operación actual: procesos manuales, fuentes de
                  conocimiento, sistemas existentes y puntos críticos de ineficiencia.
                </p>
                <div className="phase-deliverable">
                  <CheckCircle2 size={16} />
                  <span>Informe de oportunidades con ROI proyectado</span>
                </div>
                <div className="phase-duration">2-3 semanas</div>
              </div>
            </div>

            <div className="methodology-phase">
              <div className="phase-number">02</div>
              <div className="phase-content">
                <div className="phase-icon">
                  <Layers size={28} />
                </div>
                <h3 className="phase-title">Arquitectura y Diseño</h3>
                <p className="phase-description">
                  Diseñamos la solución técnica: stack tecnológico, integraciones,
                  modelos IA, arquitectura de datos y plan de despliegue.
                </p>
                <div className="phase-deliverable">
                  <CheckCircle2 size={16} />
                  <span>Propuesta técnica detallada y roadmap</span>
                </div>
                <div className="phase-duration">1-2 semanas</div>
              </div>
            </div>

            <div className="methodology-phase">
              <div className="phase-number">03</div>
              <div className="phase-content">
                <div className="phase-icon">
                  <Cpu size={28} />
                </div>
                <h3 className="phase-title">Implementación y Entrenamiento</h3>
                <p className="phase-description">
                  Desarrollamos, integramos y desplegamos la solución. Entrenamos
                  modelos con tus datos, configuramos sistemas y capacitamos a tu equipo.
                </p>
                <div className="phase-deliverable">
                  <CheckCircle2 size={16} />
                  <span>Sistema en producción con métricas activas</span>
                </div>
                <div className="phase-duration">4-8 semanas</div>
              </div>
            </div>

            <div className="methodology-phase">
              <div className="phase-number">04</div>
              <div className="phase-content">
                <div className="phase-icon">
                  <TrendingUp size={28} />
                </div>
                <h3 className="phase-title">Optimización Continua</h3>
                <p className="phase-description">
                  Monitoreamos rendimiento, ajustamos modelos, expandimos capacidades
                  y garantizamos mejora continua basada en datos reales.
                </p>
                <div className="phase-deliverable">
                  <CheckCircle2 size={16} />
                  <span>Reportes mensuales de KPIs y optimizaciones</span>
                </div>
                <div className="phase-duration">Ongoing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO SECTION - Probar VoiceIA */}
      <section id="demo" className="demo-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <Sparkles size={14} />
              Prueba en Vivo
            </span>
            <h2 className="section-title">Prueba Nuestro Agente de Voz</h2>
            <p className="section-description">
              Ingresa tu numero y recibe una llamada de Ana, nuestra agente IA.
              Comprueba la calidad y naturalidad de la conversacion en vivo.
            </p>
          </div>

          <div className="demo-container">
            <div className="demo-card">
              <div className="demo-card-header">
                <div className="demo-card-icon">
                  <Phone size={28} />
                </div>
                <div>
                  <h3>Demo Gratuita de VoiceIA</h3>
                  <p>Recibe una llamada de prueba en segundos</p>
                </div>
              </div>

              <div className="demo-form">
                {/* Phone Number */}
                <div className="demo-form-group">
                  <label>
                    <Phone size={14} />
                    Numero de telefono *
                  </label>
                  <input
                    type="tel"
                    placeholder="+56912345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(formatPhone(e.target.value))}
                  />
                  <span className="demo-form-hint">Formato internacional (ej: +56 para Chile)</span>
                </div>

                {/* Name and Amount */}
                <div className="demo-form-row">
                  <div className="demo-form-group">
                    <label>
                      <User size={14} />
                      Tu nombre
                    </label>
                    <input
                      type="text"
                      placeholder="Juan Perez"
                      value={debtorName}
                      onChange={(e) => setDebtorName(e.target.value)}
                    />
                  </div>
                  <div className="demo-form-group">
                    <label>
                      <DollarSign size={14} />
                      Monto simulado (CLP)
                    </label>
                    <input
                      type="text"
                      placeholder="150000"
                      value={debtAmount}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d]/g, '');
                        const numValue = parseInt(value) || 0;
                        if (numValue <= 5000000) {
                          setDebtAmount(value);
                        }
                      }}
                    />
                    <span className="demo-form-hint">Maximo $5.000.000</span>
                  </div>
                </div>

                {/* Days and Product */}
                <div className="demo-form-row">
                  <div className="demo-form-group">
                    <label>
                      <Calendar size={14} />
                      Dias de mora
                    </label>
                    <input
                      type="text"
                      placeholder="30"
                      value={diasMora}
                      onChange={(e) => setDiasMora(e.target.value.replace(/[^\d]/g, ''))}
                    />
                  </div>
                  <div className="demo-form-group">
                    <label>
                      <CreditCard size={14} />
                      Producto
                    </label>
                    <input
                      type="text"
                      placeholder="Tarjeta de Credito"
                      value={producto}
                      onChange={(e) => setProducto(e.target.value)}
                    />
                  </div>
                </div>

                {/* Profile Selector */}
                <div className="demo-form-group">
                  <label>
                    <User size={14} />
                    Escenario de prueba
                  </label>
                  <div className="demo-profile-selector">
                    {DEMO_PROFILES.map((p) => (
                      <button
                        key={p.id}
                        className={`demo-profile-btn ${profile === p.id ? 'active' : ''}`}
                        onClick={() => setProfile(p.id)}
                        style={{
                          '--profile-color': p.color,
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  {selectedProfile && (
                    <span className="demo-form-hint">{selectedProfile.description}</span>
                  )}
                </div>

                {/* Summary */}
                {phoneNumber && (
                  <div className="demo-summary">
                    <div className="demo-summary-title">Resumen de la llamada</div>
                    <div className="demo-summary-grid">
                      <span><strong>Telefono:</strong> {phoneNumber}</span>
                      <span><strong>Nombre:</strong> {debtorName || 'Cliente Demo'}</span>
                      <span><strong>Monto:</strong> {formatMoney(debtAmount || 150000)}</span>
                      <span><strong>Perfil:</strong> {selectedProfile?.label}</span>
                    </div>
                  </div>
                )}

                {/* Call Button */}
                <button
                  className="demo-call-btn"
                  onClick={handleDemoCall}
                  disabled={calling || !phoneNumber}
                >
                  {calling ? (
                    <>
                      <Loader2 size={20} className="spin" />
                      Iniciando llamada...
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Recibir Llamada Demo
                    </>
                  )}
                </button>

                {/* Result */}
                {callResult && (
                  <div className={`demo-result ${callResult.success ? 'success' : 'error'}`}>
                    {callResult.success ? (
                      <>
                        <CheckCircle size={24} />
                        <div>
                          <strong>Llamada Iniciada</strong>
                          <p>Ana te llamara en unos segundos al numero {phoneNumber}</p>
                          {callResult.data?.agentInfo && (
                            <span className="demo-agent-info">
                              Agente: {callResult.data.agentInfo.name} • {callResult.data.agentInfo.company}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle size={24} />
                        <div>
                          <strong>Error</strong>
                          <p>{callResult.error}</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Espacio reservado para info de llamada */}
              <div className="demo-call-info-placeholder">
                {/* Este espacio se llenará con la información de la llamada */}
              </div>
            </div>

            {/* Demo Benefits */}
            <div className="demo-benefits">
              <h3>Lo que experimentaras:</h3>
              <ul>
                <li>
                  <CheckCircle2 size={20} />
                  <div>
                    <strong>Voz Natural</strong>
                    <p>IA con voz humana, sin robotismos</p>
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={20} />
                  <div>
                    <strong>Conversacion Fluida</strong>
                    <p>Respuestas contextuales e inteligentes</p>
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={20} />
                  <div>
                    <strong>Latencia Minima</strong>
                    <p>Respuestas en menos de 1 segundo</p>
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={20} />
                  <div>
                    <strong>Manejo de Objeciones</strong>
                    <p>Ana sabe como responder a cualquier situacion</p>
                  </div>
                </li>
              </ul>

              <div className="demo-cta-box">
                <Sparkles size={24} />
                <div>
                  <strong>¿Te gusto la demo?</strong>
                  <p>Contactanos para implementar VoiceIA en tu empresa</p>
                </div>
                <a href="#contacto" className="btn btn-primary">
                  Contactar
                </a>
              </div>

              {/* AI Animation Visual - Simplified */}
              <div className="ai-animation-container ai-animation-compact">
                <div className="ai-brain">
                  <div className="ai-core">
                    <div className="ai-core-inner"></div>
                  </div>
                  <div className="ai-pulse ai-pulse-1"></div>
                  <div className="ai-pulse ai-pulse-2"></div>
                </div>
                <div className="ai-label">
                  <Bot size={16} />
                  <span>VoiceIA Activo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="resultados" className="results-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Impacto Medible</span>
            <h2 className="section-title">Resultados Reales</h2>
            <p className="section-description">
              Métricas de proyectos implementados en empresas industriales y medianas.
            </p>
          </div>

          <div className="results-grid">
            <div className="result-card">
              <div className="result-icon">
                <Clock size={32} />
              </div>
              <div className="result-metric">
                <div className="result-value">
                  <AnimatedCounter end={40} duration={2000} suffix="%" />
                </div>
                <div className="result-label">Reducción de Tiempo</div>
              </div>
              <div className="result-description">
                <strong>Búsqueda de manuales técnicos</strong>
                <p>Proyecto industrial en Europa: de 15-20 minutos a menos de 2 minutos
                por consulta técnica con sistema RAG multimodal.</p>
              </div>
              <div className="result-bar"><div className="result-bar-fill" style={{width: '40%'}}></div></div>
            </div>

            <div className="result-card">
              <div className="result-icon">
                <Users size={32} />
              </div>
              <div className="result-metric">
                <div className="result-value">
                  <AnimatedCounter end={30} duration={2000} suffix="%" />
                </div>
                <div className="result-label">Reducción de Workload</div>
              </div>
              <div className="result-description">
                <strong>Operaciones de cobranza</strong>
                <p>Automatización de llamadas salientes: 300+ gestiones diarias
                sin aumentar headcount, mejorando tasas de contacto efectivo.</p>
              </div>
              <div className="result-bar"><div className="result-bar-fill" style={{width: '30%'}}></div></div>
            </div>

            <div className="result-card">
              <div className="result-icon">
                <TrendingUp size={32} />
              </div>
              <div className="result-metric">
                <div className="result-value">
                  <AnimatedCounter end={98} duration={2000} suffix="%" />
                </div>
                <div className="result-label">Entregabilidad Email</div>
              </div>
              <div className="result-description">
                <strong>Campañas de marketing IA</strong>
                <p>Personalización dinámica con IA y optimización de infraestructura:
                +98% de emails llegan a inbox, no a spam.</p>
              </div>
              <div className="result-bar"><div className="result-bar-fill" style={{width: '98%'}}></div></div>
            </div>

            <div className="result-card">
              <div className="result-icon">
                <Server size={32} />
              </div>
              <div className="result-metric">
                <div className="result-value">100%</div>
                <div className="result-label">Control de Datos</div>
              </div>
              <div className="result-description">
                <strong>Despliegue on-premise</strong>
                <p>Arquitectura modular desplegada en infraestructura propia del cliente.
                Cero exposición de datos sensibles a terceros.</p>
              </div>
              <div className="result-bar"><div className="result-bar-fill" style={{width: '100%'}}></div></div>
            </div>
          </div>

          {/* Before vs After */}
          <div className="results-comparison">
            <div className="comparison-header">
              <h3>Antes vs Después: Caso Real</h3>
              <p>Empresa industrial europea — Sistema RAG para gestión de conocimiento técnico</p>
            </div>
            <div className="comparison-grid">
              <div className="comparison-before">
                <div className="comparison-label">Antes</div>
                <ul>
                  <li><XCircle size={16} /> 15-20 min por consulta técnica</li>
                  <li><XCircle size={16} /> Conocimiento en PDFs dispersos</li>
                  <li><XCircle size={16} /> Dependencia de expertos senior</li>
                  <li><XCircle size={16} /> Errores por información desactualizada</li>
                </ul>
              </div>
              <div className="comparison-after">
                <div className="comparison-label">Después</div>
                <ul>
                  <li><CheckCircle size={16} /> Menos de 2 min por consulta</li>
                  <li><CheckCircle size={16} /> Búsqueda semántica multimodal</li>
                  <li><CheckCircle size={16} /> Acceso democratizado 24/7</li>
                  <li><CheckCircle size={16} /> Actualización continua automática</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="cta">
        <div className="cta-bg"></div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Solicita una Evaluación Gratuita de tu Caso
            </h2>
            <p className="cta-description">
              Agenda una sesión de diagnóstico estratégico con nuestro equipo.
              Analizamos tu operación, identificamos oportunidades de automatización
              y diseñamos una propuesta técnica con ROI proyectado.
              <strong> Respuesta en 48 horas.</strong>
            </p>
            <div className="cta-buttons">
              <a href="mailto:jpfigueroa@tic-ia.com" className="btn btn-primary btn-lg">
                Solicitar Propuesta
                <ArrowRight size={20} />
              </a>
              <a href="https://wa.me/56930920303?text=Hola%2C%20quiero%20solicitar%20una%20evaluaci%C3%B3n%20de%20IA%20para%20mi%20empresa" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                WhatsApp Directo
              </a>
            </div>
            <div className="cta-trust-indicators">
              <div className="trust-indicator">
                <CheckCircle2 size={20} />
                <span>Proyectos en Chile y Europa</span>
              </div>
              <div className="trust-indicator">
                <CheckCircle2 size={20} />
                <span>Arquitectura modular escalable</span>
              </div>
              <div className="trust-indicator">
                <CheckCircle2 size={20} />
                <span>On-premise o hybrid cloud</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/favicon.svg" alt="TIC-IA" className="footer-logo-icon-img" />
                <div className="footer-logo-text">TIC-<span>IA</span></div>
              </div>
              <p>
                Arquitectos de automatización inteligente y conocimiento empresarial con IA.
                Sistemas RAG multimodales, automatizaciones avanzadas y orquestación on-premise.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Servicios</h4>
              <ul>
                <li><a href="#servicios">RAG Multimodal Empresarial</a></li>
                <li><a href="#servicios">Automatización Inteligente</a></li>
                <li><a href="#servicios">Orquestación Enterprise</a></li>
                <li><a href="#demo">Demo VoiceIA</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#problemas">Qué Resolvemos</a></li>
                <li><a href="#metodologia">Metodología</a></li>
                <li><a href="#resultados">Resultados</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contacto</h4>
              <ul>
                <li><a href="mailto:jpfigueroa@tic-ia.com">jpfigueroa@tic-ia.com</a></li>
                <li><a href="tel:+56930920303">+56 9 3092 0303</a></li>
                <li><a href="#">Santiago, Chile</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 TIC-IA. Todos los derechos reservados.</p>
            <p>Arquitectos de Automatización Inteligente con IA</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
