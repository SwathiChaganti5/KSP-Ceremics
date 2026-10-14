import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X, MapPin, Phone, Clock3, Sparkles, Layers3, Droplets, Paintbrush, Check, MoveUpRight } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const products = [
  { n: '01', title: 'Ceramic & Wall Tiles', desc: 'Texture, tone and pattern for walls that make a statement.', img: '/images/ceramic-tiles.jpg', tag: 'WALLS & DETAILS', icon: Layers3 },
  { n: '02', title: 'Vitrified & Floor Tiles', desc: 'Refined surfaces made for everyday living and lasting style.', img: '/images/floor-tiles.jpg', tag: 'FLOORS & SPACES', icon: Layers3 },
  { n: '03', title: 'Sanitaryware', desc: 'Thoughtful bathroom essentials with a clean, modern finish.', img: '/images/sanitaryware.jpg', tag: 'BATHROOM LIVING', icon: Droplets },
  { n: '04', title: 'Paints & Finishes', desc: 'Bring your palette to life with colour and finish options.', img: '/images/paint-colours.jpg', tag: 'COLOUR YOUR WORLD', icon: Paintbrush },
];
const heroSlides = [
  { src: '/images/hero-slide-01.jpg', alt: 'Bright contemporary kitchen and dining interior' },
  { src: '/images/hero-slide-02.jpg', alt: 'Open-plan living room with a staircase' },
  { src: '/images/interior-detail.jpg', alt: 'Sunlit modern bedroom with natural textures' },
  { src: '/images/bathroom-detail.jpg', alt: 'Modern bedroom with soft neutral finishes' },
];
const brands = ['K A J A R I A', 'JOHNSON', 'ASIAN PAINTS', 'SOMANY', 'ORIENTBELL'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    const observer = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    const slideTimer = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? null
      : window.setInterval(() => setActiveSlide(current => (current + 1) % heroSlides.length), 6000);
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); if (slideTimer) window.clearInterval(slideTimer); };
  }, []);
  const closeMenu = () => setMenuOpen(false);
  const nav = ['Home', 'Our Approach', 'Collections', 'Visit Us'];
  const go = (label) => { setActive(label); closeMenu(); document.getElementById(({ 'Home':'home', 'Collections':'collections', 'Our Approach':'approach', 'Visit Us':'visit' })[label])?.scrollIntoView({ behavior: 'smooth' }); };
  return <div className="site-shell">
    <div className="announcement"><span className="announce-dot"/> YOUR SPACE, YOUR SIGNATURE <span className="announcement-line"/> TILES · SANITARYWARE · PAINTS <span className="announcement-right">RAJAHMUNDRY, AP</span></div>
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <a href="#home" className="brand" onClick={closeMenu}><span className="brand-monogram" aria-hidden="true">K</span><span><strong>KSP</strong><small>CERAMIC TILES</small></span></a>
      <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>{nav.map(n => <button key={n} className={active === n ? 'nav-active' : ''} onClick={() => go(n)}>{n}</button>)}<button className="nav-mobile-cta" onClick={() => go('Visit Us')}>Plan a visit <ArrowUpRight size={15}/></button></nav>
      <button className="header-cta" onClick={() => go('Visit Us')}>Plan a visit <ArrowUpRight size={16}/></button>
      <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow reveal"><span className="eyebrow-line"/> MATERIALS FOR MEANINGFUL SPACES</div>
          <h1 className="reveal delay-1">A beautiful space<br/>starts <em>from the</em><br/><span>ground up.</span></h1>
          <p className="hero-description reveal delay-2">Thoughtfully chosen tiles, sanitaryware and paint to help turn the place you live into the place you love.</p>
          <div className="hero-actions reveal delay-3"><button className="button-dark" onClick={() => go('Collections')}>Explore collections <ArrowDownRight size={18}/></button><button className="text-link" onClick={() => go('Visit Us')}>Find our showroom <ArrowRight size={16}/></button></div>
          <div className="hero-bottom reveal delay-3"><span className="mini-star">✳</span><span>THE DETAILS MAKE<br/>THE DIFFERENCE</span><div className="hero-bottom-rule"/><span className="hero-bottom-note">For homes, renovations<br/>and new beginnings.</span></div>
        </div>
        <div className="hero-visual"><div className="hero-image-wrap">{heroSlides.map((slide, index) => <img key={slide.src} className={`hero-image ${index === activeSlide ? 'hero-image-active' : ''}`} src={slide.src} alt={index === activeSlide ? slide.alt : ''} aria-hidden={index !== activeSlide}/>)}<div className="image-grain"/></div><div className="hero-stamp"><span>DESIGN</span><b>WITH</b><span>INTENTION</span><i>✳</i></div><div className="vertical-note">SURFACES THAT FEEL LIKE HOME — EST. IN RAJAHMUNDRY</div><div className="hero-index" aria-label={`Slide ${activeSlide + 1} of ${heroSlides.length}`}><span>{String(activeSlide + 1).padStart(2, '0')}</span><span key={activeSlide} className="index-line"/><span>{String(heroSlides.length).padStart(2, '0')}</span></div></div>
        <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><div/></div>
      </section>

      <section className="intro section-pad" id="approach"><div className="section-kicker reveal">01 / A LITTLE ABOUT US</div><div className="intro-grid"><h2 className="reveal">Not just materials.<br/><em>The beginning</em><br/>of something <span>beautiful.</span></h2><div className="intro-copy reveal delay-1"><p>Every room has a feeling. The cool calm of a morning bathroom. The warmth of a sunlit living room. The first step into a home that feels truly yours.</p><p>At KSP Ceramic Tiles, we bring together the finishing touches that help make those moments possible — from everyday essentials to the details that make a space distinctly yours.</p><button className="underlined-link" onClick={() => go('Visit Us')}>Come explore in person <ArrowUpRight size={16}/></button></div></div><div className="intro-foot reveal"><span>GOOD DESIGN IS FELT, NOT JUST SEEN.</span><div className="foot-rule"/><span>RAJAHMUNDRY · ANDHRA PRADESH</span></div></section>

      <section className="collections section-pad" id="collections"><div className="section-top reveal"><div><div className="section-kicker">02 / THE COLLECTIONS</div><h2>Find your <em>finish.</em></h2></div><p>Start with a material. Discover a mood.<br/>Build a space that feels like you.</p></div><div className="product-grid">{products.map((p, i) => <article className={`product-card reveal delay-${i % 3}`} key={p.title}><div className="product-photo"><img src={p.img} alt={p.title}/><span className="product-num">{p.n}</span><span className="product-tag">{p.tag}</span><button className="round-arrow" aria-label={`Learn about ${p.title}`} onClick={() => go('Visit Us')}><ArrowUpRight size={20}/></button></div><div className="product-meta"><div><h3>{p.title}</h3><p>{p.desc}</p></div><p.icon className="product-icon" size={21} strokeWidth={1.4}/></div></article>)}</div><div className="collections-note reveal"><Sparkles size={17}/><span>Looking for something specific? Visit us to explore available styles, sizes and finishes.</span><button onClick={() => go('Visit Us')}>Ask us <ArrowRight size={15}/></button></div></section>

      <section className="manifesto"><div className="manifesto-image"><img src="/images/hero-showroom.jpg" alt="Natural stone and warm neutral interior inspiration"/><div className="manifesto-image-caption">A QUIETER KIND OF LUXURY.</div></div><div className="manifesto-copy"><div className="section-kicker reveal">03 / THE KSP APPROACH</div><h2 className="reveal">Made for real life.<br/><em>Chosen for the</em><br/>way you live.</h2><p className="reveal delay-1">Good materials do more than finish a room. They make everyday routines feel considered, bring harmony to a home and stand up to the life happening inside it.</p><div className="value-list reveal delay-2"><div><span>01</span><strong>Explore with confidence</strong><p>Compare looks, textures and finishes in person.</p></div><div><span>02</span><strong>Details that work together</strong><p>Bring tiles, bathroom essentials and colour into one vision.</p></div><div><span>03</span><strong>Made for your kind of home</strong><p>Find options for new builds, renovations and refreshes.</p></div></div></div></section>

      <section className="brand-strip section-pad"><div className="brand-strip-top reveal"><span className="section-kicker">A WORLD OF FINISHES</span><span className="brand-strip-caption">Ask in-store about available brands and ranges.</span></div><div className="brand-words reveal">{brands.map(b => <span key={b}>{b}</span>)}</div><p className="brand-disclaimer">Brand names are shown as examples of commonly listed ranges in the category. Confirm current availability with the store.</p></section>

      <section className="visit section-pad" id="visit">
        <div className="visit-left">
          <div className="section-kicker reveal">04 / COME SAY HELLO</div>
          <h2 className="reveal">Your next space<br/>starts <em>here.</em></h2>
          <p className="visit-description reveal delay-1">Bring your ideas, your inspiration photos, or just your curiosity. Let's find the right starting point for your space.</p>
          <div className="visit-actions reveal delay-2">
            <a className="button-cream" href="https://www.google.com/maps/search/?api=1&query=KSP+Ceramic+Tiles+Rajahmundry" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={17}/></a>
            <a className="visit-phone" href="tel:+919014171444"><Phone size={16}/> +91 90141 71444</a>
          </div>
        </div>
        <div className="visit-card reveal delay-1">
          <div className="visit-card-top"><span className="brand-monogram brand-monogram-small" aria-hidden="true">K</span><span>VISIT THE SHOWROOM</span></div>
          <div className="visit-info"><MapPin size={18}/><div><strong>KSP Ceramic Tiles</strong><p>2-217, Korukonda Road, Konthamuru,<br/>Rajahmundry, Andhra Pradesh 533102</p></div></div>
          <div className="visit-info"><Clock3 size={18}/><div><strong>Opening hours</strong><p>Monday to Saturday<br/>9:00 AM to 9:00 PM<br/>Closed on Sundays</p></div></div>
          <a className="map-link" href="https://www.google.com/maps/search/?api=1&query=KSP+Ceramic+Tiles+Rajahmundry" target="_blank" rel="noreferrer">OPEN IN MAPS <ArrowUpRight size={15}/></a>
          <div className="visit-socials" aria-label="Connect with KSP Ceramic Tiles">
            <a className="social-instagram" href="https://www.instagram.com/explore/search/keyword/?q=KSP%20Ceramic%20Tiles%20Rajahmundry" target="_blank" rel="noreferrer" aria-label="Search for KSP Ceramic Tiles on Instagram"><FaInstagram size={18} aria-hidden="true"/></a>
            <a className="social-facebook" href="https://www.facebook.com/search/top?q=KSP%20Ceramic%20Tiles%20Rajahmundry" target="_blank" rel="noreferrer" aria-label="Search for KSP Ceramic Tiles on Facebook"><FaFacebookF size={18} aria-hidden="true"/></a>
            <a className="social-whatsapp" href="https://wa.me/919014171444" target="_blank" rel="noreferrer" aria-label="Message KSP Ceramic Tiles on WhatsApp"><FaWhatsapp size={18} aria-hidden="true"/></a>
          </div>
          <div className="card-decoration">KSP<span>✳</span></div>
        </div>
      </section>

      <section className="closing-line"><span>GOOD SPACES BEGIN WITH GOOD CHOICES.</span><span className="closing-star">✳</span><span>MAKE YOURS COUNT.</span></section>
    </main>
    <footer className="footer"><a href="#home" className="brand footer-brand"><span className="brand-monogram" aria-hidden="true">K</span><span><strong>KSP</strong><small>CERAMIC TILES</small></span></a><p>Tiles · Sanitaryware · Paints<br/>Rajahmundry, Andhra Pradesh</p><div className="footer-links"><button onClick={() => go('Collections')}>Collections</button><button onClick={() => go('Visit Us')}>Visit us</button><a href="tel:+919014171444">Call the store</a></div><span className="copyright">© {new Date().getFullYear()} KSP CERAMIC TILES</span></footer>
    <a className="floating-call" href="tel:+919014171444" aria-label="Call KSP Ceramic Tiles"><Phone size={19}/></a>
  </div>;
}
export default App;
