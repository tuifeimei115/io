import Particles from '../components/Particles'
import SectionIndicator from '../components/SectionIndicator'

export default function Home() {
  return (
    <div className="space-y-0">
      <SectionIndicator
        items={[
          { id: 'hero', label: '首页' },
          { id: 'about', label: '关于' },
          { id: 'notes', label: '文章' },
          { id: 'projects', label: '项目' },
          { id: 'contact', label: '联系' },
        ]}
      />

      <section id="hero" className="fullscreen-section relative overflow-hidden rounded-2xl bg-black flex items-center">
        <Particles density={0.00018} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />
        <div className="relative px-6 sm:px-8 w-full text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
              欢迎来到
              <span className="block text-violet-400">金源植</span>
              的世界
            </h1>
            <p className="mt-6 text-white/80">看一个程序员All In Ai的个人空间</p>
            <div className="mt-8 flex gap-4">
              <a
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white shadow transition"
                href="/#/notes"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('notes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  history.replaceState(null, '', '#/#notes');
                }}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-white" />
                查看文章
              </a>
              <a
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 text-white transition"
                href="/#/projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  history.replaceState(null, '', '#/#projects');
                }}
              >
                <span className="inline-block h-4 w-4 rounded-full border-2 border-white" />
                查看项目
              </a>
            </div>
          </div>
        </div>

      </section>

      <section id="about" className="fullscreen-section flex items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">关于我</h2>
          <p className="text-slate-300">你好！我是 金源植，一名热衷于AI学习的学习者。在这个数字化时代，我致力于探索深度学习的前沿技术，分享学习心得，并创造有价值的项目。希望可以不断学习，不断进步，变为更好的自己。</p>
          <p className="text-slate-400">📍 中国~北京</p>
        </div>
      </section>

      <section id="notes" className="fullscreen-section flex items-center">
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-6">关于AI的文章</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <article className="card">
              <h3 className="font-semibold">飞书文档</h3>
              <p className="text-sm text-slate-300">飞书文章分享</p>
              <div className="mt-2 flex gap-3">
                <a className="btn btn-primary" href="https://eq8kni1ny7e.feishu.cn/wiki/MtLjw09zMip5MXklhANcTamznOb?from=from_copylink">访问</a>
              </div>
            </article>
            <article className="card">
              <h3 className="font-semibold">小红书</h3>
              <p className="text-sm text-slate-300">技术文章和项目分享</p>
              <div className="mt-2 flex gap-3">
                <a className="btn btn-primary" href="https://www.xiaohongshu.com/explore/68dbbcae0000000007022c36?xsec_token=YBWpiPmg0ENn5tv0B4q0ruh3ie_aUs4y7U2ArwLOTD2Q4%3D&xsec_source=pc_creatormng">访问</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="projects" className="fullscreen-section flex items-center">
        <div>
          <h2 className="text-3xl font-bold mb-3">个人项目</h2>
          <p className="text-sm text-slate-300">正在加载 GitHub 项目...</p>
        </div>
      </section>

      <section id="contact" className="fullscreen-section flex items-center">
        <div>
          <h2 className="text-3xl font-bold mb-3">联系我</h2>
          <ul className="space-y-2 text-slate-300">
            <li>邮箱：<a className="link" href="mailto:329870857@qq.com">329870857@qq.com</a></li>
            <li>小红书<a className="link" href="https://xhslink.com/m/407hns60lqy" target="_blank" rel="noreferrer">AI搭子实验室</a></li>
          </ul>
        </div>
      </section>
    </div>
  )
}
