import { useState, useEffect } from 'react';
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
  Sparkles
} from 'lucide-react';
import './index.css';

// API Base URL - tu servidor VoiceIA
const API_BASE = 'https://pmc-got-happens-delivers.trycloudflare.com';

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
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#" className="navbar-logo">
            <div className="navbar-logo-icon">TI</div>
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
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient-1"></div>
          <div className="hero-gradient-2"></div>
          <div className="hero-grid"></div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Soluciones IA Empresariales
            </div>

            <h1 className="hero-title">
              Automatiza tu negocio con <span className="hero-title-gradient">Inteligencia Artificial</span>
            </h1>

            <p className="hero-description">
              Transformamos la comunicacion empresarial con agentes de voz IA,
              campanas de email inteligentes y desarrollo de soluciones personalizadas
              que impulsan resultados reales.
            </p>

            <div className="hero-buttons">
              <a href="#demo" className="btn btn-primary btn-lg">
                Probar Demo Ahora
                <ArrowRight size={20} />
              </a>
              <a href="#servicios" className="btn btn-secondary btn-lg">
                Ver Servicios
              </a>
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
                  <h4>Silvia - Agente IA</h4>
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
                <p><strong>Silvia:</strong> Por supuesto, permitame verificar su informacion para asistirle de inmediato.</p>
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
              Ingresa tu numero de telefono y recibe una llamada de Silvia, nuestra agente de voz IA.
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
                          <p>Silvia te llamara en unos segundos al numero {phoneNumber}</p>
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

              {/* Tech Stack */}
              <div className="demo-tech">
                <span>Tecnologia:</span>
                <div className="demo-tech-items">
                  <span>Twilio</span>
                  <span>Groq AI</span>
                  <span>ElevenLabs</span>
                  <span>Deepgram</span>
                </div>
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
                    <p>Silvia sabe como responder a cualquier situacion</p>
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
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Nuestros Servicios</span>
            <h2 className="section-title">Soluciones IA de Alto Impacto</h2>
            <p className="section-description">
              Tecnologia de punta adaptada a las necesidades de tu empresa,
              con resultados medibles y escalables.
            </p>
          </div>

          <div className="services-grid">
            {/* VoiceIA */}
            <div className="service-card">
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
            </div>

            {/* Email Marketing IA */}
            <div className="service-card">
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
            </div>

            {/* Desarrollo IA */}
            <div className="service-card">
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
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="tecnologia" className="features">
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
              <div className="stat-value">50K+</div>
              <div className="stat-label">Llamadas Procesadas</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">98%</div>
              <div className="stat-label">Entregabilidad Email</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">40%</div>
              <div className="stat-label">Reduccion de Costos</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">3x</div>
              <div className="stat-label">Mayor Productividad</div>
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
              <a href="mailto:contacto@tic-ia.com" className="btn btn-primary btn-lg">
                Contactar Ahora
                <ArrowRight size={20} />
              </a>
              <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
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
                <div className="footer-logo-icon">TI</div>
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
                <li><a href="mailto:contacto@tic-ia.com">contacto@tic-ia.com</a></li>
                <li><a href="tel:+56912345678">+56 9 1234 5678</a></li>
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
