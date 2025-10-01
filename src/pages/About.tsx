import SectionIndicator from '../components/SectionIndicator'

export default function About() {
  return (
    <div className="page-snap space-y-0 relative">
      <SectionIndicator items={[{ id: 'about-1', label: '关于' }, { id: 'about-2', label: '详情' }]} />
      <section id="about-1" className="fullscreen-section flex items-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">关于</h1>
          <p className="text-slate-300">这里是关于页面。你可以放置个人简介、技能栈、经历与照片等内容。</p>
        </div>
      </section>
      <section id="about-2" className="fullscreen-section flex items-center">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="card">
            <h3 className="font-semibold mb-1">简介</h3>
            <p className="text-sm text-slate-300">一句话介绍你是谁、在做什么。</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-1">技能</h3>
            <p className="text-sm text-slate-300">JavaScript/TypeScript、React、Node、深度学习等。</p>
          </div>
        </div>
      </section>
    </div>
  )
}
