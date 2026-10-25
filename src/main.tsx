import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, ChevronRight, Linkedin, Menu, X, Wrench, BookOpen, Orbit, ExternalLink, Mail } from 'lucide-react'
import { development, education, experiences, profile, projects, skills } from './content'
import './styles.css'

const nav = ['About', 'Education', 'Experience', 'Research', 'Projects', 'Skills', 'Contact']
const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

function Section({ id, eyebrow, title, children }: { id: string, eyebrow: string, title: string, children: ReactNode }) {
  const reduced = useReducedMotion()
  return <motion.section id={id.toLowerCase()} className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? 0 : .55 }} variants={reveal}>
    <p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children}
  </motion.section>
}

function App() {
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('About')
  const [filter, setFilter] = useState('All')
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach(e => e.isIntersecting && setActive(e.target.id[0].toUpperCase() + e.target.id.slice(1))), { rootMargin: '-35% 0px -55% 0px' })
    document.querySelectorAll('section[id]').forEach(el => observer.observe(el)); return () => observer.disconnect()
  }, [])
  const jump = (name: string) => { document.getElementById(name.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) }
  const filtered = filter === 'All' ? projects : projects.filter(p => p.filter === filter)
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: 'Mechanical Engineer', url: 'https://rsspector77.github.io/raghunath-portfolio/', sameAs: [profile.linkedin] }
  return <><script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    <header><a className="brand" href="#top" aria-label="Raghunath Mullick home">RM<span>•</span></a><nav aria-label="Main navigation">{nav.map(item => <button className={active === item ? 'active' : ''} onClick={() => jump(item)} key={item}>{item}</button>)}</nav><a className="header-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15}/></a><button className="menu" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button></header>
    {menu && <div className="mobile-nav">{nav.map(item => <button onClick={() => jump(item)} key={item}>{item}<ChevronRight size={18}/></button>)}</div>}
    <main id="top">
      <section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow">Mechanical engineering / research / design</p><h1 id="hero-title">Raghunath<br/><em>Mullick.</em></h1><p className="role">{profile.title}</p><p className="lede">{profile.summary}</p><div className="actions"><button className="button primary" onClick={() => jump('Projects')}>Explore my work <ArrowDownRight size={18}/></button><button className="button ghost" onClick={() => jump('Research')}>View research</button></div></div><div className="blueprint" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="core"><Orbit size={72}/></div><span className="measure m1">Ø 240</span><span className="measure m2">SYSTEM / 01</span><span className="axis"/></div><a className="scroll" href="#about">Scroll to explore <ArrowDownRight size={16}/></a></section>
      <Section id="About" eyebrow="01 / Profile" title="Built on curiosity. Directed by purpose."><div className="split"><p className="large">Raghunath’s work is grounded in the mechanics of how things move, endure, and can be improved—with a particular interest in design, sustainable energy, and practical technical systems.</p><div><p>The portfolio brings together mechanical engineering education, documented technical training, applied projects in robotics and fabrication, and a growing research focus on sustainable energy. Every claim is kept intentionally specific to the information available.</p><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Professional profile <ExternalLink size={15}/></a></div></div></Section>
      <Section id="Education" eyebrow="02 / Foundation" title="Academic trajectory"><div className="timeline">{education.map((e, i) => <article key={e.degree}><span>0{i + 1}</span><div><h3>{e.degree}</h3><p>{e.place}</p><small>{e.status}</small></div></article>)}</div></Section>
      <Section id="Experience" eyebrow="03 / Experience" title="Learning in applied settings"><div className="cards three">{experiences.map(e => <article className="card" key={e.title}><p className="card-label">{e.type}</p><Wrench size={23}/><h3>{e.title}</h3><h4>{e.organization}</h4><p>{e.text}</p></article>)}</div></Section>
      <Section id="Research" eyebrow="04 / Research" title="Engineering for a more sustainable energy future"><div className="research"><BookOpen size={31}/><div><p className="card-label">Conference publication / 2025</p><h3><em>A Review on Proximate Analysis of Solid Blend Biomass: Advancing Sustainable Energy Solutions.</em></h3><p>R. Mullick, A. R. Dey, and A. Ghatak. <em>Proceedings of the International Conference on New Trends in Science, Engineering, Technology and Management (ICNTSETM’25)</em>, P.S.V. College of Engineering and Technology, 2025, p. 134. ISBN 978-93-48505-24-8.</p></div></div><div className="interest-row"><span>Biomass</span><span>Alternative fuels</span><span>Sustainable energy</span><span>Mechanical engineering</span></div></Section>
      <Section id="Projects" eyebrow="05 / Selected work" title="Ideas made tangible"><div className="filters" aria-label="Project filters">{['All','Design','Robotics','Research'].map(f => <button key={f} className={filter === f ? 'selected' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div><div className="cards projects">{filtered.map((p, i) => <article className="project card" key={p.title}><div className="project-mark">0{i + 1}<span>{p.tag}</span></div><h3>{p.title}</h3><p>{p.description}</p><ul>{p.methods.map(m => <li key={m}>{m}</li>)}</ul><p className="outcome"><b>Context:</b> {p.outcome}</p></article>)}</div></Section>
      <Section id="Skills" eyebrow="06 / Toolkit" title="Technical range, thoughtfully applied"><div className="skill-grid">{skills.map(([category, ...items]) => <article key={category}><h3>{category}</h3><div>{items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div><div className="development"><p className="eyebrow">Professional development</p>{development.map(item => <p key={item}>— {item}</p>)}</div></Section>
      <section className="personal"><p className="eyebrow">Beyond engineering</p><h2>Perspective is built<br/>outside the workshop, too.</h2><p>Interests noted in the supplied brief include cycling, photography, creative writing, and language learning.</p></section>
      <Section id="Contact" eyebrow="07 / Contact" title="Let’s connect around meaningful engineering."><div className="contact"><p>For research, engineering, or professional conversations, reach out by email or LinkedIn.</p><div className="actions"><a className="button primary" href={`mailto:${profile.email}`}><Mail size={18}/> Email Raghunath</a><a className="button ghost" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> Connect on LinkedIn</a></div><small>Phone number, residential address, and downloadable CV are intentionally excluded pending explicit approval.</small></div></Section>
    </main><footer><a className="brand" href="#top">RM<span>•</span></a><p>© {new Date().getFullYear()} Raghunath Mullick. Designed for clarity and credibility.</p><a href="#top">Back to top ↑</a></footer>
  </>
}
export default App
