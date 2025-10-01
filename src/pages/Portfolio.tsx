import SectionIndicator from '../components/SectionIndicator'

export default function Portfolio() {
  const projects = [
    { title: '项目 A', desc: '简短描述与亮点。', link: '#' },
    { title: '项目 B', desc: '简短描述与亮点。', link: '#' },
    { title: '项目 C', desc: '简短描述与亮点。', link: '#' },
  ]

  return (
    <div className="page-snap space-y-0 relative">
      <SectionIndicator items={[{ id: 'portfolio-1', label: '项目' }, { id: 'portfolio-2', label: '列表' }]} />
      <section id="portfolio-1" className="fullscreen-section flex items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">个人项目</h1>
          <p className="text-slate-300">挑选一些具有代表性的工作与开源项目。</p>
        </div>
      </section>
      <section id="portfolio-2" className="fullscreen-section flex items-center">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {projects.map(p => (
            <article key={p.title} className="card">
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-slate-300">{p.desc}</p>
              <a className="btn mt-2" href={p.link}>查看</a>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
