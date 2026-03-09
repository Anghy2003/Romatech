import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaGlobe,
  FaRobot,
  FaPalette,
  FaShoppingCart,
  FaCheckCircle,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaLaptopCode,
  FaSearch,
  FaRocket,
  FaHeadset,
  FaMoon,
  FaSun,
} from 'react-icons/fa';

const WHATSAPP = 'https://wa.me/593998423081';
const WHATSAPP_MSG = (servicio) =>
  `https://wa.me/593998423081?text=Hola%20ROMA%20TECH%2C%20quiero%20cotizar%3A%20${encodeURIComponent(servicio)}`;

const COUPON_CODE = 'ROMA10';
const COUPON_DISCOUNT = '10% OFF';
const COUPON_STORAGE_KEY = 'roma_coupon_seen';

function App() {
  const [theme, setTheme] = useState('light');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [counted, setCounted] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);

  const statsRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.aos').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
          animateCount(setCount1, 0, 3, 1500);
          animateCount(setCount2, 0, 20, 2000);
          animateCount(setCount3, 0, 5, 1800);
          animateCount(setCount4, 0, 3, 1200);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  useEffect(() => {
    const pricingSection = document.getElementById('precios');
    if (!pricingSection) return;

    const alreadySeen = localStorage.getItem(COUPON_STORAGE_KEY);
    if (alreadySeen === 'true') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCoupon(true);
          localStorage.setItem(COUPON_STORAGE_KEY, 'true');
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(pricingSection);

    return () => observer.disconnect();
  }, []);

  function animateCount(setter, from, to, duration) {
    const start = Date.now();
    const update = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setter(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const closeCoupon = () => setShowCoupon(false);

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      alert(`Cupón copiado: ${COUPON_CODE}`);
    } catch (error) {
      alert(`No se pudo copiar automáticamente. Tu cupón es: ${COUPON_CODE}`);
    }
  };

  const couponWhatsappLink = `https://wa.me/593998423081?text=${encodeURIComponent(
    `Hola ROMA TECH, quiero reclamar mi cupón ${COUPON_CODE} con ${COUPON_DISCOUNT} de descuento para mi proyecto.`
  )}`;

  const faqs = [
    {
      question: '¿Cuánto tiempo toma crear mi página web o tienda online?',
      answer:
        'Una página informativa puede estar lista entre 5 y 10 días hábiles. Una tienda en línea suele tomar entre 2 y 4 semanas, dependiendo de la cantidad de productos, métodos de pago e integraciones requeridas.',
    },
    {
      question: '¿Trabajan con clientes de todo el mundo?',
      answer:
        'Sí. Atendemos negocios de cualquier país del mundo. Todo el proceso puede realizarse de forma online, con seguimiento directo por WhatsApp.',
    },
    {
      question: '¿Qué incluye el mantenimiento?',
      answer:
        'Incluye soporte técnico, ajustes menores, revisión de funcionamiento, actualización de contenido básico y acompañamiento para resolver incidencias posteriores al lanzamiento.',
    },
    {
      question: '¿También crean tiendas en línea para vender productos?',
      answer:
        'Sí. Diseñamos tiendas online modernas con catálogo, carrito, integración de pagos, botón de WhatsApp, panel administrativo y estructura lista para vender 24/7.',
    },
    {
      question: '¿Puedo pedir logo, web y tienda en un solo paquete?',
      answer:
        'Claro. Podemos armar una propuesta personalizada que incluya branding, página web, tienda online y automatizaciones, de acuerdo con lo que necesite tu negocio.',
    },
  ];

  const services = [
    {
      icon: <FaGlobe />,
      title: 'Páginas Web',
      desc: 'Sitios modernos, rápidos y responsive que convierten visitantes en clientes. Diseño estratégico para tu negocio.',
      img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
      features: ['Diseño personalizado', '100% Responsive', 'SEO optimizado', 'Hosting incluido'],
      cta: 'Quiero mi web',
    },
    {
      icon: <FaRobot />,
      title: 'Automatizaciones',
      desc: 'Elimina tareas repetitivas con sistemas inteligentes: formularios, respuestas, seguimiento y procesos conectados.',
      img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
      features: ['Chatbots inteligentes', 'Cotizaciones automáticas', 'CRM integrado', 'Flujos por WhatsApp'],
      cta: 'Automatizar mi negocio',
    },
    {
      icon: <FaPalette />,
      title: 'Logos & Branding',
      desc: 'Construimos una identidad visual sólida, memorable y profesional para que tu marca destaque de verdad.',
      img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
      features: ['Logo profesional', 'Variantes de color', 'Manual de marca', 'Archivos editables'],
      cta: 'Quiero mi logo',
    },
    {
      icon: <FaShoppingCart />,
      title: 'Tiendas en Línea',
      desc: 'Creamos e-commerce modernos para que vendas tus productos en internet con una experiencia profesional y segura.',
      img: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600&q=80',
      features: ['Catálogo de productos', 'Carrito de compras', 'Pagos online', 'Panel de administración'],
      cta: 'Quiero mi tienda',
    },
  ];

  const portfolioItems = [
    { img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80', label: 'E-commerce Moda' },
    { img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80', label: 'Restaurante Digital' },
    { img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80', label: 'Branding Corporativo' },
    { img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80', label: 'App Mobile' },
    { img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80', label: 'Consultoría Digital' },
    { img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80', label: 'Automatización Empresarial' },
  ];

  const businessTypes = [
    'Tiendas agrícolas',
    'Consultorios médicos',
    'Boutiques y moda',
    'Restaurantes y cafeterías',
    'Inmobiliarias',
    'Ferreterías',
    'Veterinarias',
    'Clínicas estéticas',
    'Tiendas de tecnología',
    'Negocios de repuestos',
    'Academias y cursos',
    'Abogados y consultores',
    'Hoteles y hospedajes',
    'Emprendimientos locales',
  ];

  return (
    <div className="App">
      {showCoupon && (
        <div className="coupon-modal-overlay" onClick={closeCoupon}>
          <div className="coupon-modal" onClick={(e) => e.stopPropagation()}>
            <button className="coupon-close" onClick={closeCoupon} aria-label="Cerrar cupón">
              <FaTimes />
            </button>

            <div className="coupon-shine" />

            <span className="coupon-badge">🎁 Obsequio Especial</span>

            <h3 className="coupon-title">
              Desbloqueaste un <span className="gold-text">{COUPON_DISCOUNT}</span>
            </h3>

            <p className="coupon-text">
              Gracias por revisar nuestros precios. Usa este cupón y recibe un beneficio especial
              en tu página web, tienda online o branding.
            </p>

            <div className="coupon-code-box">
              <span className="coupon-code-label">Cupón:</span>
              <strong className="coupon-code">{COUPON_CODE}</strong>
            </div>

            <div className="coupon-actions">
              <a
                href={couponWhatsappLink}
                target="_blank"
                rel="noreferrer"
                className="coupon-claim-btn"
              >
                <FaWhatsapp /> Reclamar por WhatsApp
              </a>

              <button className="coupon-secondary-btn" onClick={copyCoupon}>
                Copiar cupón
              </button>
            </div>

            <p className="coupon-note">
              Válido para nuevos clientes. Aplica al cotizar directamente por WhatsApp.
            </p>
          </div>
        </div>
      )}

      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="WhatsApp">
        <FaWhatsapp />
      </a>

      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo-container">
              <img src="/logo.png" alt="ROMA TECH" className="logo" />
            </div>

            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
              <button onClick={() => scrollTo('servicios')}>Servicios</button>
              <button onClick={() => scrollTo('portafolio')}>Portafolio</button>
              <button onClick={() => scrollTo('precios')}>Precios</button>
              <button onClick={() => scrollTo('faq')}>Preguntas</button>
            </nav>

            <div className="header-actions">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Cambiar tema"
                title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </button>

              <a href={WHATSAPP_MSG('cotización general')} target="_blank" rel="noreferrer" className="cta-button">
                Cotizar Ahora
              </a>
            </div>

            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--delay': `${i * 0.4}s`,
                '--x': `${Math.random() * 100}%`,
                '--size': `${Math.random() * 6 + 2}px`,
                '--duration': `${Math.random() * 10 + 8}s`,
              }}
            />
          ))}
        </div>

        <div className="hero-bg-glow glow-1" />
        <div className="hero-bg-glow glow-2" />

        <div className="container">
          <div className="hero-inner">
            <h1 className="hero-title aos">
              Transforma Tu
              <br />
              <span className="gold-text">Presencia Digital</span>
              <br />
              y Haz Crecer tu Negocio
            </h1>

            <p className="hero-description aos">
              Páginas web impactantes, automatizaciones inteligentes, logos memorables
              <br />
              y tiendas en línea que generan resultados reales en Ecuador.
            </p>

            <div className="hero-buttons aos">
              <a href={WHATSAPP_MSG('cotización')} target="_blank" rel="noreferrer" className="btn-primary">
                <FaRocket /> Empieza Hoy
              </a>
              <button className="btn-secondary" onClick={() => scrollTo('portafolio')}>
                Ver Portafolio
              </button>
            </div>

            <div className="hero-mockup aos">
              <div className="mockup-browser">
                <div className="browser-bar">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                  <div className="browser-url">romatech.ec</div>
                </div>

                <div className="browser-content">
                  <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80" alt="Web Design" />
                  <div className="browser-overlay">
                    <div className="overlay-badge">Diseño Profesional</div>
                    <div className="overlay-badge">100% Responsive</div>
                    <div className="overlay-badge">SEO Incluido</div>
                  </div>
                </div>
              </div>

              <div className="mockup-phone">
                <div className="phone-notch" />
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&q=80" alt="Mobile" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item aos">
              <div className="stat-num">{count1}+</div>
              <div className="stat-label">Años de experiencia</div>
            </div>
            <div className="stat-item aos">
              <div className="stat-num">{count2}+</div>
              <div className="stat-label">Proyectos entregados</div>
            </div>
            <div className="stat-item aos">
              <div className="stat-num">{count3}+</div>
              <div className="stat-label">Páginas web creadas</div>
            </div>
            <div className="stat-item aos">
              <div className="stat-num">{count4}+</div>
              <div className="stat-label">Tiendas en línea</div>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee-section">
        <div className="marquee-label">Soluciones digitales para negocios como</div>
        <div className="marquee-track-wrapper">
          <div className="marquee-track">
            {[...businessTypes, ...businessTypes].map((name, i) => (
              <div key={i} className="marquee-item">
                <span className="marquee-dot">⬡</span> {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="section">
        <div className="container">
          <div className="section-header aos">
            <span className="section-badge">Nuestros Servicios</span>
            <h2 className="section-title">
              Todo lo que tu negocio
              <br />
              <span className="gold-text">necesita para crecer</span>
            </h2>
            <p className="section-description">
              Creamos soluciones para tiendas agrícolas, consultorios médicos, boutiques, restaurantes,
              inmobiliarias, veterinarias, ferreterías y muchos otros negocios que buscan vender más y verse profesionales.
            </p>
          </div>

          <div className="services-grid">
            {services.map((srv, i) => (
              <div key={i} className="service-card aos" style={{ '--delay': `${i * 0.1}s` }}>
                <div className="service-img-wrapper">
                  <img src={srv.img} alt={srv.title} className="service-img" />
                  <div className="service-icon-badge">{srv.icon}</div>
                </div>

                <div className="service-body">
                  <h3 className="service-title">{srv.title}</h3>
                  <p className="service-desc">{srv.desc}</p>

                  <ul className="service-features">
                    {srv.features.map((f, j) => (
                      <li key={j}>
                        <FaCheckCircle className="check-icon" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={WHATSAPP_MSG(srv.cta)} target="_blank" rel="noreferrer" className="service-btn">
                    {srv.cta} <FaArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
  <div className="container">
    <div className="process-showcase aos">
      <div className="process-showcase-top">
        <div className="process-showcase-content">
          <span className="section-badge">Nuestro Proceso</span>

          <h2 className="process-showcase-title">
            Trabajar con nosotros
            <br />
            <span className="gold-text">es simple y rápido</span>
          </h2>

          <p className="process-showcase-text">
            Te acompañamos desde la idea inicial hasta el lanzamiento de tu proyecto.
            Ya sea una página web, tienda online, branding o automatización, seguimos un
            proceso claro, visual y ordenado para que todo avance sin complicaciones.
          </p>

          <div className="process-mini-tags">
            <span>Planificación estratégica</span>
            <span>Diseño y desarrollo</span>
            <span>Entrega y acompañamiento</span>
          </div>
        </div>

        <div className="process-showcase-media">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
            alt="Proceso de trabajo ROMA TECH"
          />
        </div>
      </div>

      <div className="process-cards-grid">
        {[
          {
            n: '01',
            icon: <FaHeadset />,
            title: 'Contáctanos',
            desc: 'Escríbenos por WhatsApp y cuéntanos sobre tu negocio. Primera consulta gratis.',
            img: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900&q=80',
          },
          {
            n: '02',
            icon: <FaSearch />,
            title: 'Analizamos tu proyecto',
            desc: 'Entendemos tu necesidad y te proponemos la solución ideal para tu marca.',
            img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
          },
          {
            n: '03',
            icon: <FaLaptopCode />,
            title: 'Diseño & Desarrollo',
            desc: 'Creamos tu web, branding o tienda online con revisiones para que todo quede perfecto.',
            img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&q=80',
          },
          {
            n: '04',
            icon: <FaRocket />,
            title: 'Lanzamiento',
            desc: 'Publicamos tu proyecto y te acompañamos con soporte para que empieces a crecer.',
            img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
          },
        ].map((step, i) => (
          <article
            key={i}
            className="process-story-card aos"
            style={{ '--delay': `${i * 0.12}s` }}
          >
            <div className="process-story-image">
              <img src={step.img} alt={step.title} />
              <div className="process-story-overlay" />
            </div>

            <div className="process-story-body">
              <div className="process-story-number">{step.n}</div>

              <div className="process-story-icon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
</section>

      <section id="portafolio" className="section">
        <div className="container">
          <div className="section-header aos">
            <span className="section-badge">Portafolio</span>
            <h2 className="section-title">
              Proyectos que hablan
              <br />
              <span className="gold-text">por sí solos</span>
            </h2>
            <p className="section-description">
              Una muestra de ideas y estilos que pueden adaptarse a moda, salud, gastronomía, agricultura, servicios y comercio.
            </p>
          </div>

          <div className="portfolio-grid">
            {portfolioItems.map((item, i) => (
              <div key={i} className="portfolio-item aos" style={{ '--delay': `${i * 0.1}s` }}>
                <img src={item.img} alt={item.label} />
                <div className="portfolio-overlay">
                  <span>{item.label}</span>
                  <a href={WHATSAPP_MSG('proyecto similar a ' + item.label)} target="_blank" rel="noreferrer">
                    Quiero algo así <FaArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="portfolio-cta aos">
            <a href={WHATSAPP_MSG('portafolio completo')} target="_blank" rel="noreferrer" className="btn-outline">
              Ver portafolio completo por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section id="precios" className="section pricing-section">
        <div className="container">
          <div className="section-header aos">
            <span className="section-badge">Precios en Ecuador</span>
            <h2 className="section-title">
              Inversión accesible,
              <br />
              <span className="gold-text">resultados extraordinarios</span>
            </h2>
            <p className="section-description">Precios en dólares americanos (USD). Sin costos ocultos.</p>
          </div>

          <div className="pricing-category-title aos">Páginas Web</div>
          <div className="pricing-cards">
            <div className="pricing-card aos">
              <div className="pricing-header">
                <h3>Página Básica</h3>
                <span className="pricing-badge">Emprendedores</span>
              </div>
              <p className="pricing-description">Para negocios que inician y necesitan presencia digital profesional.</p>
              <div className="pricing-price">
                <span className="price">$200</span>
                <span className="period">USD</span>
              </div>
              <a href={WHATSAPP_MSG('Página Básica $200')} target="_blank" rel="noreferrer" className="pricing-button">
                Quiero esta web
              </a>
              <ul className="pricing-features">
                <li>Hasta 5 secciones</li>
                <li>Diseño responsive</li>
                <li>Formulario de contacto</li>
                <li>Botón WhatsApp</li>
                <li>Hosting 1 año incluido</li>
                <li>30 días de garantía</li>
              </ul>
            </div>

            <div className="pricing-card featured aos">
              <div className="featured-ribbon">MÁS POPULAR</div>
              <div className="pricing-header">
                <h3>Página Profesional</h3>
                <span className="pricing-badge featured">Recomendado</span>
              </div>
              <p className="pricing-description">Para negocios que quieren destacar y convertir visitantes en clientes.</p>
              <div className="pricing-price">
                <span className="price">$400</span>
                <span className="period">USD</span>
              </div>
              <a
                href={WHATSAPP_MSG('Página Profesional $400')}
                target="_blank"
                rel="noreferrer"
                className="pricing-button"
              >
                Quiero esta web
              </a>
              <ul className="pricing-features">
                <li>Diseño premium personalizado</li>
                <li>Hasta 8 secciones</li>
                <li>Animaciones y efectos</li>
                <li>SEO básico optimizado</li>
                <li>Hosting + dominio 1 año</li>
                <li>Integración redes sociales</li>
                <li>60 días de soporte</li>
                <li>Google Maps integrado</li>
              </ul>
            </div>

            <div className="pricing-card aos">
              <div className="pricing-header">
                <h3>Tienda Online</h3>
                <span className="pricing-badge">E-Commerce</span>
              </div>
              <p className="pricing-description">Tienda online completa para vender tus productos las 24 horas.</p>
              <div className="pricing-price">
                <span className="price">$650</span>
                <span className="period">USD</span>
              </div>
              <a href={WHATSAPP_MSG('Tienda Online $650')} target="_blank" rel="noreferrer" className="pricing-button">
                Quiero mi tienda
              </a>
              <ul className="pricing-features">
                <li>Catálogo de productos</li>
                <li>Carrito de compras</li>
                <li>Pagos en línea</li>
                <li>Panel de administración</li>
                <li>Hosting + dominio 1 año</li>
                <li>90 días de soporte</li>
              </ul>
            </div>
          </div>

          <div className="pricing-category-title aos" style={{ marginTop: '3rem' }}>
            Automatizaciones & Branding
          </div>

          <div className="pricing-cards">
            <div className="pricing-card aos">
              <div className="pricing-header">
                <h3>Automatización Básica</h3>
                <span className="pricing-badge">Ahorra Tiempo</span>
              </div>
              <p className="pricing-description">Automatiza un proceso clave de tu negocio.</p>
              <div className="pricing-price">
                <span className="price">$50</span>
                <span className="period">USD</span>
              </div>
              <a
                href={WHATSAPP_MSG('Automatización Básica $50')}
                target="_blank"
                rel="noreferrer"
                className="pricing-button"
              >
                Automatizar
              </a>
              <ul className="pricing-features">
                <li>1 flujo automatizado</li>
                <li>WhatsApp o Email</li>
                <li>Respuestas automáticas</li>
                <li>Configuración incluida</li>
              </ul>
            </div>

            <div className="pricing-card featured aos">
              <div className="featured-ribbon">COMPLETO</div>
              <div className="pricing-header">
                <h3>Logo & Branding</h3>
                <span className="pricing-badge featured">Identidad Visual</span>
              </div>
              <p className="pricing-description">Tu marca profesional lista para destacar en el mercado.</p>
              <div className="pricing-price">
                <span className="price">$30</span>
                <span className="period">USD</span>
              </div>
              <a href={WHATSAPP_MSG('Logo y Branding $30')} target="_blank" rel="noreferrer" className="pricing-button">
                Quiero mi logo
              </a>
              <ul className="pricing-features">
                <li>3 propuestas de diseño</li>
                <li>Revisiones ilimitadas</li>
                <li>Formatos PNG, SVG y PDF</li>
                <li>Paleta de colores</li>
                <li>Tipografía corporativa</li>
              </ul>
            </div>

            <div className="pricing-card aos">
              <div className="pricing-header">
                <h3>Tienda Premium</h3>
                <span className="pricing-badge">Más ventas</span>
              </div>
              <p className="pricing-description">Para negocios que quieren vender más con una tienda online completa.</p>
              <div className="pricing-price">
                <span className="price">$630</span>
                <span className="period">USD</span>
              </div>
              <a href={WHATSAPP_MSG('Tienda Premium $630')} target="_blank" rel="noreferrer" className="pricing-button">
                Quiero vender online
              </a>
              <ul className="pricing-features">
                <li>Diseño premium</li>
                <li>Catálogo avanzado</li>
                <li>Pagos e integraciones</li>
                <li>WhatsApp + panel admin</li>
                <li>Soporte extendido</li>
              </ul>
            </div>
          </div>

          <div className="pricing-note aos">
            <span>¿Necesitas algo personalizado?</span>
            <span>
              <a href={WHATSAPP_MSG('cotización personalizada')} target="_blank" rel="noreferrer">
                Escríbenos por WhatsApp
              </a>{' '}
              y te hacemos una propuesta a tu medida.
            </span>
          </div>
        </div>
      </section>

      <section className="section comparison-section">
        <div className="container">
          <div className="section-header aos">
            <span className="section-badge">¿Por qué ROMA TECH?</span>
            <h2 className="section-title">
              La diferencia es
              <br />
              <span className="gold-text">evidente</span>
            </h2>
          </div>

          <div className="comparison-table aos">
            <div className="comparison-col other">
              <h3>Otras agencias</h3>
              <ul>
                <li className="no">Precios elevados sin justificar</li>
                <li className="no">Tiempos de entrega largos</li>
                <li className="no">Soporte deficiente post-venta</li>
                <li className="no">Diseños genéricos y fríos</li>
                <li className="no">Sin estrategia clara</li>
                <li className="no">Comunicación lenta</li>
              </ul>
            </div>

            <div className="comparison-col us">
              <div className="comparison-logo">
                <img src="/logo.png" alt="ROMA TECH" />
              </div>
              <ul>
                <li className="yes">Precios accesibles para Ecuador</li>
                <li className="yes">Entrega rápida y cumplida</li>
                <li className="yes">Soporte continuo incluido</li>
                <li className="yes">Diseño personalizado y único</li>
                <li className="yes">Enfoque en resultados</li>
                <li className="yes">Atención directa por WhatsApp</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section faq-section">
        <div className="container">
          <div className="section-header aos">
            <span className="section-badge">Preguntas Frecuentes</span>
            <h2 className="section-title">
              Resolvemos tus
              <br />
              <span className="gold-text">principales dudas</span>
            </h2>
            <p className="section-description">
              Aquí tienes respuestas claras para que tomes una decisión con confianza.
            </p>
          </div>

          <div className="faq-wrapper aos">
            <div className="faq-side-card">
              <div className="faq-side-icon">
                <FaHeadset />
              </div>
              <h3>¿No encuentras tu respuesta?</h3>
              <p>
                Escríbenos por WhatsApp y te ayudamos personalmente con tu página web, tienda online o branding.
              </p>
              <a href={WHATSAPP_MSG('tengo una duda')} target="_blank" rel="noreferrer" className="btn-outline faq-btn">
                Hablar ahora
              </a>
            </div>

            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`faq-item ${activeFaq === i ? 'active' : ''}`}
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <div className="faq-question">
                    <h3>{faq.question}</h3>
                    <span className="faq-icon">
                      <FaChevronDown />
                    </span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="container">
          <div className="cta-final-content aos">
            <div className="cta-glow" />
            <span className="section-badge">Es tu momento</span>
            <h2>
              ¿Listo para llevar tu negocio
              <br />
              <span className="gold-text">al siguiente nivel?</span>
            </h2>
            <p>Consulta gratis · Sin compromisos · Atención rápida por WhatsApp</p>
            <a href={WHATSAPP_MSG('quiero empezar mi proyecto')} target="_blank" rel="noreferrer" className="btn-primary large">
              <FaWhatsapp /> Cotizar por WhatsApp
            </a>
            <div className="cta-contact-info">
              <span><FaPhoneAlt /> +593 998 423 081</span>
              <span>•</span>
              <span><FaMapMarkerAlt /> Ecuador · Atención Online</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <img src="/logo.png" alt="ROMA TECH" className="footer-logo" />
              <p>Transformamos negocios ecuatorianos con tecnología, diseño y estrategia digital.</p>

              <div className="footer-socials">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <FaFacebookF />
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Servicios</h4>
              <ul>
                <li><button onClick={() => scrollTo('servicios')}>Páginas Web</button></li>
                <li><button onClick={() => scrollTo('servicios')}>Automatizaciones</button></li>
                <li><button onClick={() => scrollTo('servicios')}>Logos & Branding</button></li>
                <li><button onClick={() => scrollTo('servicios')}>Tiendas en Línea</button></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Empresa</h4>
              <ul>
                <li><button onClick={() => scrollTo('portafolio')}>Portafolio</button></li>
                <li><button onClick={() => scrollTo('precios')}>Precios</button></li>
                <li><button onClick={() => scrollTo('faq')}>Preguntas</button></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contacto</h4>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="footer-whatsapp-btn">
                <FaWhatsapp /> +593 998 423 081
              </a>
              <p><FaMapMarkerAlt /> Ecuador · Atención Online</p>
              <p><FaClock /> Lunes a Sábado · 9am – 7pm</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 ROMA TECH · Todos los derechos reservados · Ecuador</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;