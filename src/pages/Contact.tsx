import SectionIndicator from '../components/SectionIndicator'

export default function Contact() {
  return (
    <div className="page-snap space-y-0 relative">
      <SectionIndicator items={[{ id: 'contact-1', label: '联系' }, { id: 'contact-2', label: '方式' }]} />
      <section id="contact-1" className="fullscreen-section flex items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">联系我</h1>
          <p className="text-slate-300">欢迎通过以下方式与我取得联系。</p>
        </div>
      </section>
      <section id="contact-2" className="fullscreen-section flex items-center">
        <ul className="space-y-2 text-slate-300">
          <li>GitHub：<a className="link" href="https://github.com/passwerob" target="_blank" rel="noreferrer">@passwerob</a></li>
          <li>邮箱：<a className="link" href="mailto:contact@passwerob.com">contact@passwerob.com</a></li>
          <li>CSDN：<a className="link" href="https://blog.csdn.net/" target="_blank" rel="noreferrer">Passwerob</a></li>
        </ul>
      </section>
    </div>
  )
}
