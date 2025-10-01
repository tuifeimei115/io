import SectionIndicator from '../components/SectionIndicator'

export default function Articles() {
  const posts = [
    { title: '深度学习笔记：卷积神经网络', date: '2025-05-10', link: '#' },
    { title: 'Transformer 注意力机制浅析', date: '2025-06-02', link: '#' },
  ]
  return (
    <div className="page-snap space-y-0 relative">
      <SectionIndicator items={[{ id: 'articles-1', label: '文章' }, { id: 'articles-2', label: '列表' }]} />
      <section id="articles-1" className="fullscreen-section flex items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">文章</h1>
          <p className="text-slate-300">记录学习与项目过程中的思考与总结。</p>
        </div>
      </section>
      <section id="articles-2" className="fullscreen-section flex items-center">
        <ul className="space-y-3 w-full">
          {posts.map(p => (
            <li key={p.title} className="card flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-xs text-slate-500">{p.date}</p>
              </div>
              <a className="btn" href={p.link}>阅读</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
