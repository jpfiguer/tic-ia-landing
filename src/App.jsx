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
  MousePointer2
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
            <li><a href="#demo">Probar Demo</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#tecnologia">Tecnologia</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>

          <div className="navbar-cta">
            <a href="#demo" className="btn btn-primary">
              Probar Gratis
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
            <li><a href="#demo" onClick={() => setMobileMenuOpen(false)}>Probar Demo</a></li>
            <li><a href="#servicios" onClick={() => setMobileMenuOpen(false)}>Servicios</a></li>
            <li><a href="#tecnologia" onClick={() => setMobileMenuOpen(false)}>Tecnología</a></li>
            <li><a href="#contacto" onClick={() => setMobileMenuOpen(false)}>Contacto</a></li>
          </ul>
          <a href="#demo" className="btn btn-primary mobile-menu-cta" onClick={() => setMobileMenuOpen(false)}>
            Probar Gratis
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
              Soluciones IA Empresariales
            </div>

            <h1 className="hero-title">
              Automatiza tu
              <br />
              <span className="hero-title-gradient">
                <TypingText
                  texts={['negocio', 'cobranza', 'ventas', 'atención al cliente', 'comunicación']}
                  speed={80}
                  deleteSpeed={40}
                  pauseTime={1500}
                />
              </span>
              <br />
              <span className="hero-title-static">con</span> <span className="hero-title-gradient-static">IA</span>
            </h1>

            <p className="hero-description">
              Transformamos la comunicacion empresarial con agentes de voz IA,
              campanas de email inteligentes y desarrollo de soluciones personalizadas
              que impulsan resultados reales.
            </p>

            <div className="hero-buttons">
              <MagneticButton href="#demo" className="btn btn-primary btn-lg btn-glow">
                Probar Demo Ahora
                <ArrowRight size={20} />
              </MagneticButton>
              <MagneticButton href="#servicios" className="btn btn-secondary btn-lg">
                Ver Servicios
              </MagneticButton>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">98%</div>
                <div className="hero-stat-label">Entregabilidad Email</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">24/7</div>
                <div className="hero-stat-label">Atencion Automatizada</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">3x</div>
                <div className="hero-stat-label">ROI Promedio</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card">
              <div className="hero-visual-header">
                <div className="hero-visual-avatar">
                  <Headphones size={24} color="white" />
                </div>
                <div className="hero-visual-info">
                  <h4>Ana - Agente IA</h4>
                  <span>En llamada activa</span>
                </div>
              </div>

              <div className="hero-visual-wave">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="wave-bar"></div>
                ))}
              </div>

              <div className="hero-visual-transcript">
                <p><strong>Cliente:</strong> Necesito informacion sobre mi cuenta...</p>
                <p><strong>Ana:</strong> Por supuesto, permitame verificar su informacion para asistirle de inmediato.</p>
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
            <h2 className="section-title">Experimenta VoiceIA Ahora</h2>
            <p className="section-description">
              Ingresa tu numero de telefono y recibe una llamada de Ana, nuestra agente de voz IA.
              Comprueba tu mismo la calidad y naturalidad de la conversacion.
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
                      onChange={(e) => setDebtAmount(e.target.value.replace(/[^\d]/g, ''))}
                    />
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

              {/* AI Animation Visual */}
              <div className="ai-animation-container">
                <div className="ai-brain">
                  {/* Central core */}
                  <div className="ai-core">
                    <div className="ai-core-inner"></div>
                  </div>

                  {/* Orbital rings */}
                  <div className="ai-orbit ai-orbit-1">
                    <div className="ai-particle"></div>
                  </div>
                  <div className="ai-orbit ai-orbit-2">
                    <div className="ai-particle"></div>
                  </div>
                  <div className="ai-orbit ai-orbit-3">
                    <div className="ai-particle"></div>
                  </div>

                  {/* Neural nodes */}
                  <div className="ai-nodes">
                    <div className="ai-node ai-node-1"></div>
                    <div className="ai-node ai-node-2"></div>
                    <div className="ai-node ai-node-3"></div>
                    <div className="ai-node ai-node-4"></div>
                    <div className="ai-node ai-node-5"></div>
                    <div className="ai-node ai-node-6"></div>
                  </div>

                  {/* Connection lines (SVG) */}
                  <svg className="ai-connections" viewBox="0 0 200 200">
                    <line className="ai-line ai-line-1" x1="100" y1="100" x2="40" y2="60" />
                    <line className="ai-line ai-line-2" x1="100" y1="100" x2="160" y2="60" />
                    <line className="ai-line ai-line-3" x1="100" y1="100" x2="30" y2="130" />
                    <line className="ai-line ai-line-4" x1="100" y1="100" x2="170" y2="130" />
                    <line className="ai-line ai-line-5" x1="100" y1="100" x2="60" y2="170" />
                    <line className="ai-line ai-line-6" x1="100" y1="100" x2="140" y2="170" />
                  </svg>

                  {/* Pulse waves */}
                  <div className="ai-pulse ai-pulse-1"></div>
                  <div className="ai-pulse ai-pulse-2"></div>
                  <div className="ai-pulse ai-pulse-3"></div>
                </div>

                {/* Floating particles */}
                <div className="ai-floating-particles">
                  <span></span><span></span><span></span><span></span>
                  <span></span><span></span><span></span><span></span>
                </div>

                <div className="ai-label">
                  <Bot size={16} />
                  <span>IA Procesando</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="services">
        <div className="container">
          <div className="section-header">
            {/* Animación de chips IA flotantes */}
            <div className="services-ai-animation">
              <div className="ai-chip ai-chip-1">
                <Cpu size={14} />
                <span>Machine Learning</span>
              </div>
              <div className="ai-chip ai-chip-2">
                <Bot size={14} />
                <span>NLP</span>
              </div>
              <div className="ai-chip ai-chip-3">
                <Zap size={14} />
                <span>Automatización</span>
              </div>
              <div className="ai-chip ai-chip-4">
                <BarChart3 size={14} />
                <span>Analytics</span>
              </div>
              <div className="ai-chip ai-chip-5">
                <MessageSquare size={14} />
                <span>Chatbots</span>
              </div>

              {/* Líneas de conexión animadas */}
              <svg className="ai-chip-connections" viewBox="0 0 400 100">
                <path className="ai-chip-line" d="M50,50 Q100,20 150,50 T250,50 T350,50" />
                <path className="ai-chip-line ai-chip-line-2" d="M50,60 Q100,90 150,60 T250,60 T350,60" />
              </svg>
            </div>

            <span className="section-badge">Nuestros Servicios</span>
            <h2 className="section-title">Soluciones IA de Alto Impacto</h2>
            <p className="section-description">
              Tecnologia de punta adaptada a las necesidades de tu empresa,
              con resultados medibles y escalables.
            </p>
          </div>

          <div className="services-grid">
            {/* VoiceIA */}
            <GlowingCard className="service-card">
              <div className="service-icon">
                <Phone size={32} />
              </div>
              <h3 className="service-title">VoiceIA - Call Center</h3>
              <p className="service-description">
                Agentes de voz con inteligencia artificial que manejan llamadas
                entrantes y salientes con naturalidad humana. Ideal para cobranzas,
                ventas y atencion al cliente.
              </p>
              <ul className="service-features">
                <li><CheckCircle2 size={16} /> Voz natural con IA generativa</li>
                <li><CheckCircle2 size={16} /> Integracion con tu CRM</li>
                <li><CheckCircle2 size={16} /> Analisis de sentimiento en tiempo real</li>
                <li><CheckCircle2 size={16} /> Transcripcion y reporteria automatica</li>
              </ul>
            </GlowingCard>

            {/* Email Marketing IA */}
            <GlowingCard className="service-card">
              <div className="service-icon">
                <Mail size={32} />
              </div>
              <h3 className="service-title">Email Marketing IA</h3>
              <p className="service-description">
                Campanas de email con entregabilidad garantizada superior al 98%.
                Contenido personalizado con IA que maximiza apertura y conversion.
              </p>
              <ul className="service-features">
                <li><CheckCircle2 size={16} /> Entregabilidad optimizada al 98%+</li>
                <li><CheckCircle2 size={16} /> Personalizacion dinamica con IA</li>
                <li><CheckCircle2 size={16} /> A/B testing automatizado</li>
                <li><CheckCircle2 size={16} /> Segmentacion inteligente</li>
              </ul>
            </GlowingCard>

            {/* Desarrollo IA */}
            <GlowingCard className="service-card">
              <div className="service-icon">
                <Cpu size={32} />
              </div>
              <h3 className="service-title">Desarrollo IA Personalizado</h3>
              <p className="service-description">
                Soluciones a medida: chatbots, automatizaciones, integraciones
                y sistemas inteligentes disenados especificamente para tu negocio.
              </p>
              <ul className="service-features">
                <li><CheckCircle2 size={16} /> Chatbots conversacionales</li>
                <li><CheckCircle2 size={16} /> Automatizacion de procesos</li>
                <li><CheckCircle2 size={16} /> APIs e integraciones</li>
                <li><CheckCircle2 size={16} /> Machine Learning aplicado</li>
              </ul>
            </GlowingCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="tecnologia" className="features">
        {/* Full Width Circuit Animation */}
        <div className="features-circuit-bg">
          {/* Horizontal lines with traveling pulses */}
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

          {/* Corner circuit patterns */}
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

          {/* Floating data nodes scattered across */}
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
            <span className="section-badge">Tecnologia</span>
            <h2 className="section-title">Por que Elegirnos</h2>
            <p className="section-description">
              Combinamos lo ultimo en inteligencia artificial con anos de experiencia
              en automatizacion empresarial.
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
                <Bot size={28} />
              </div>
              <h3 className="feature-title">IA Avanzada</h3>
              <p className="feature-description">
                Modelos de lenguaje de ultima generacion para conversaciones naturales.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <MessageSquare size={28} />
              </div>
              <h3 className="feature-title">Multi-Canal</h3>
              <p className="feature-description">
                Voz, email, chat y mas en una sola plataforma integrada.
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

      {/* Stats Section */}
      <section id="resultados" className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">
                <AnimatedCounter end={50} duration={2500} suffix="K+" />
              </div>
              <div className="stat-label">Llamadas Procesadas</div>
              <div className="stat-bar"><div className="stat-bar-fill" style={{width: '85%'}}></div></div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                <AnimatedCounter end={98} duration={2000} suffix="%" />
              </div>
              <div className="stat-label">Entregabilidad Email</div>
              <div className="stat-bar"><div className="stat-bar-fill" style={{width: '98%'}}></div></div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                <AnimatedCounter end={40} duration={2000} suffix="%" />
              </div>
              <div className="stat-label">Reduccion de Costos</div>
              <div className="stat-bar"><div className="stat-bar-fill" style={{width: '70%'}}></div></div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                <AnimatedCounter end={3} duration={1500} suffix="x" />
              </div>
              <div className="stat-label">Mayor Productividad</div>
              <div className="stat-bar"><div className="stat-bar-fill" style={{width: '90%'}}></div></div>
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
              Transforma tu Empresa con IA
            </h2>
            <p className="cta-description">
              Agenda una demostracion personalizada y descubre como nuestras soluciones
              pueden automatizar tu operacion y multiplicar tus resultados.
            </p>
            <div className="cta-buttons">
              <a href="mailto:jpfigueroa@tic-ia.com" className="btn btn-primary btn-lg">
                Contactar Ahora
                <ArrowRight size={20} />
              </a>
              <a href="https://wa.me/56930920303" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                WhatsApp
              </a>
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
                Soluciones de inteligencia artificial empresarial.
                Automatizamos tu comunicacion para que te enfoques en crecer.
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
                <li><a href="#servicios">VoiceIA Call Center</a></li>
                <li><a href="#servicios">Email Marketing IA</a></li>
                <li><a href="#servicios">Desarrollo Personalizado</a></li>
                <li><a href="#servicios">Chatbots IA</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#demo">Probar Demo</a></li>
                <li><a href="#tecnologia">Tecnologia</a></li>
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
            <p>&copy; 2024 TIC-IA. Todos los derechos reservados.</p>
            <p>Soluciones de Inteligencia Artificial Empresarial</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
