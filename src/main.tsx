import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, BookOpen, ChevronRight, ExternalLink, Linkedin, Mail, Menu, Moon, Sun, Wrench, X } from 'lucide-react'
import { development, education, experiences, profile, projects, skills } from './content'
import { MechanicalMotion } from './components/MechanicalMotion'
import './styles.css'

const nav = ['About', 'Education', 'Experience', 'Research', 'Projects', 'Skills', 'Contact']
const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }

function Section({ id, eyebrow, title, children }: { id: string, eyebrow: string, title: string, children: ReactNode }) {
  const reduced = useReducedMotion()
  return <motion.section id={id.toLowerCase()} className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }} variants={reveal}>
    <p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children}
  </motion.section>
}

function App() {
  const reduced = useReducedMotion()
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('About')
  const [filter, setFilter] = useState('All')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id[0].toUpperCase() + entry.target.id.slice(1))
    }), { rootMargin: '-34% 0px -56% 0px' })
    document.querySelectorAll('section[id]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#090909' : '#f5f5f2')
    localStorage.setItem('rm-theme', theme)
  }, [theme])

  const jump = (name: string) => { document.getElementById(name.toLowerCase())?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); setMenu(false) }
  const filtered = filter === 'All' ? projects : projects.filter((project) => project.filter === filter)
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: 'Mechanical Engineer', url: 'https://rsspector77.github.io/raghunath-portfolio/', sameAs: [profile.linkedin] }
  return <><script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Raghunath Mullick home">RM<span>+</span></a>
      <nav aria-label="Main navigation">{nav.map((item) => <button className={active === item ? 'active' : ''} onClick={() => jump(item)} key={item}>{item}</button>)}</nav>
      <div className="header-actions"><a className="header-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a><button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><Sun aria-hidden="true" size={14}/><span className="toggle-track" aria-hidden="true"><span/></span><Moon aria-hidden="true" size={14}/></button><button className="menu" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button></div>
    </header>
    {menu && <div className="mobile-nav">{nav.map((item) => <button onClick={() => jump(item)} key={item}>{item}<ChevronRight size={18}/></button>)}</div>}
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true"><span/><span/><span/><span/></div>
        <div className="hero-copy">
          <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.55, duration: reduced ? 0 : 0.65 }}>Mechanical engineering / research / design</motion.p>
          <h1 id="hero-title"><motion.span className="name-line" initial={{ clipPath: reduced ? 'none' : 'inset(0 100% 0 0)', x: reduced ? 0 : -24, opacity: 0 }} animate={{ clipPath: 'inset(0 0% 0 0)', x: 0, opacity: 1 }} transition={{ delay: reduced ? 0 : 0.12, duration: reduced ? 0 : 0.88, ease: [0.16, 1, 0.3, 1] }}>RAGHUNATH</motion.span><motion.span className="name-line name-line-second" initial={{ clipPath: reduced ? 'none' : 'inset(0 100% 0 0)', x: reduced ? 0 : -24, opacity: 0 }} animate={{ clipPath: 'inset(0 0% 0 0)', x: 0, opacity: 1 }} transition={{ delay: reduced ? 0 : 0.88, duration: reduced ? 0 : 0.88, ease: [0.16, 1, 0.3, 1] }}>MULLICK</motion.span></h1>
          <motion.div className="hero-details" initial={{ opacity: 0, y: reduced ? 0 : 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 1.78, duration: reduced ? 0 : 0.64, ease: [0.16, 1, 0.3, 1] }}><p className="role">{profile.title}</p><p className="lede">{profile.summary}</p><div className="actions"><button className="button primary" onClick={() => jump('Projects')}>Explore my work <ArrowDownRight size={18}/></button><button className="button ghost" onClick={() => jump('Contact')}>Contact</button></div></motion.div>
        </div>
        <motion.div className="mechanism-wrap" initial={{ opacity: 0, x: reduced ? 0 : 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduced ? 0 : 0.5, duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}><MechanicalMotion reducedMotion={Boolean(reduced)} /></motion.div>
        <a className="scroll" href="#about">Scroll to explore <ArrowDownRight size={16}/></a>
      </section>
      <Section id="About" eyebrow="01 / Profile" title="Built on curiosity. Directed by purpose."><div className="split"><p className="large">Raghunath’s work is grounded in the mechanics of how things move, endure, and can be improved—with a particular interest in design, sustainable energy, and practical technical systems.</p><div><p>The portfolio brings together mechanical engineering education, documented technical training, applied projects in robotics and fabrication, and a growing research focus on sustainable energy. Every claim is kept intentionally specific to the information available.</p><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Professional profile <ExternalLink size={15}/></a></div></div></Section>
      <Section id="Education" eyebrow="02 / Foundation" title="Academic trajectory"><div className="timeline">{education.map((educationItem, index) => <article key={educationItem.degree}><span>0{index + 1}</span><div><h3>{educationItem.degree}</h3><p>{educationItem.place}</p><small>{educationItem.status}</small></div></article>)}</div></Section>
      <Section id="Experience" eyebrow="03 / Experience" title="Learning in applied settings"><div className="cards three">{experiences.map((experience) => <article className="card" key={experience.title}><p className="card-label">{experience.type}</p><Wrench size={22}/><h3>{experience.title}</h3><h4>{experience.organization}</h4><p>{experience.text}</p></article>)}</div></Section>
      <Section id="Research" eyebrow="04 / Research" title="Engineering for a more sustainable energy future"><div className="research"><BookOpen size={30}/><div><p className="card-label">Conference publication / 2025</p><h3><em>A Review on Proximate Analysis of Solid Blend Biomass: Advancing Sustainable Energy Solutions.</em></h3><p>R. Mullick, A. R. Dey, and A. Ghatak. <em>Proceedings of the International Conference on New Trends in Science, Engineering, Technology and Management (ICNTSETM’25)</em>, P.S.V. College of Engineering and Technology, 2025, p. 134. ISBN 978-93-48505-24-8.</p></div></div><div className="interest-row"><span>Biomass</span><span>Alternative fuels</span><span>Sustainable energy</span><span>Mechanical engineering</span></div></Section>
      <Section id="Projects" eyebrow="05 / Selected work" title="Ideas made tangible"><div className="filters" aria-label="Project filters">{['All', 'Design', 'Robotics', 'Research'].map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="cards projects">{filtered.map((project, index) => <article className="project card" key={project.title}><div className="project-mark">0{index + 1}<span>{project.tag}</span></div><h3>{project.title}</h3><p>{project.description}</p><ul>{project.methods.map((method) => <li key={method}>{method}</li>)}</ul><p className="outcome"><b>Context:</b> {project.outcome}</p></article>)}</div></Section>
      <Section id="Skills" eyebrow="06 / Toolkit" title="Technical range, thoughtfully applied"><div className="skill-grid">{skills.map(([category, ...items]) => <article key={category}><h3>{category}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div><div className="development"><p className="eyebrow">Professional development</p>{development.map((item) => <p key={item}>— {item}</p>)}</div></Section>
      <section className="personal"><p className="eyebrow">Beyond engineering</p><h2>Perspective is built<br/>outside the workshop, too.</h2><p>Interests noted in the supplied brief include cycling, photography, creative writing, and language learning.</p></section>
      <Section id="Contact" eyebrow="07 / Contact" title="Let’s connect around meaningful engineering."><div className="contact"><p>For research, engineering, or professional conversations, reach out by email or LinkedIn.</p><div className="actions"><a className="button primary" href={`mailto:${profile.email}`}><Mail size={18}/> Email Raghunath</a><a className="button ghost" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> Connect on LinkedIn</a></div><small>Phone number, residential address, and downloadable CV are intentionally excluded pending explicit approval.</small></div></Section>
    </main>
    <footer><a className="brand" href="#top">RM<span>+</span></a><p>© {new Date().getFullYear()} Raghunath Mullick. Designed for clarity and credibility.</p><a href="#top">Back to top ↑</a></footer>
  </>
}

export default App
