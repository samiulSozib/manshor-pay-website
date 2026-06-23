import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Wallet, Shield, Zap, Star, Globe, Wifi, Gamepad2, Gift, ChevronDown, Apple, Play } from 'lucide-react';
import { GradientButton } from '@/components/ui/gradient-button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useI18n } from '@/i18n/I18nContext';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { operators } from '@/data/mock';

export default function Landing() {
  const { t } = useI18n();

  const features = [
    { icon: Smartphone, title: t('feat.instant'), desc: t('feat.instantDesc') },
    { icon: Wallet, title: t('feat.smart'), desc: t('feat.smartDesc') },
    { icon: Shield, title: t('feat.secure'), desc: t('feat.secureDesc') },
    { icon: Zap, title: t('feat.fast'), desc: t('feat.fastDesc') },
    { icon: Globe, title: t('feat.cover'), desc: t('feat.coverDesc') },
    { icon: Star, title: t('feat.cash'), desc: t('feat.cashDesc') },
  ];

  const stats = [
    { v: '2.4M+', l: t('stats.users') },
    { v: '120M+', l: t('stats.recharges') },
    { v: '18B+', l: t('stats.processed') },
    { v: '4.9★', l: t('stats.rating') },
  ];

  const testimonials = [
    { name: 'Rakib Hasan', role: 'Freelancer', body: 'Manshor Pay made my mobile recharges effortless. The UI feels premium and everything just works.' },
    { name: 'Sumaiya Akter', role: 'Student', body: 'I love the instant cashback. The packages page is the cleanest I have ever used.' },
    { name: 'Tanvir Rahman', role: 'Shop owner', body: 'Bulk recharge for my whole team takes seconds now. Zero failed transactions in 6 months.' },
  ];

  const faqs = [
    { q: 'Is Manshor Pay free to use?', a: 'Yes — creating an account, recharging and managing your wallet is completely free. Standard operator and gateway fees may apply.' },
    { q: 'Which operators are supported?', a: 'Grameenphone, Robi, Banglalink, Airtel and Teletalk — with more being added every month.' },
    { q: 'How fast is a recharge?', a: 'Most recharges complete in under 5 seconds. If anything fails, you receive an instant refund to your wallet.' },
    { q: 'Is my money safe?', a: 'Funds are held in licensed escrow accounts and protected by 256-bit encryption with biometric authentication.' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* nav */}
      <header className="sticky top-0 z-40 px-3 lg:px-6 pt-3 lg:pt-5">
        <div className="glass-strong rounded-2xl px-4 lg:px-6 py-3 flex items-center gap-3 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-neon grid place-items-center font-bold text-white">T</div>
            <div className="font-bold tracking-tight">Manshor Pay</div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ms-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">{t('nav.features')}</a>
            <a href="#operators" className="hover:text-foreground">{t('nav.operators')}</a>
            <a href="#download" className="hover:text-foreground">{t('nav.app')}</a>
            <a href="#faq" className="hover:text-foreground">{t('nav.faq')}</a>
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link to="https://manshor-pay-reseller.vercel.app" target='_blank' className="text-sm hidden sm:inline-block hover:underline">{t('cta.signin')}</Link>
            <Link
              to="https://wa.me/93780026880"
              target="_blank"
            >
              <GradientButton size="sm">
                {t('cta.getStarted')}
              </GradientButton>
            </Link>          </div>
        </div>
      </header>

      {/* hero */}
      <section className="relative max-w-7xl mx-auto px-4 lg:px-6 pt-12 lg:pt-20 pb-16">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full gradient-neon opacity-30 blur-3xl animate-float" />
        <div className="absolute top-32 -right-10 w-96 h-96 rounded-full bg-accent opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="grid lg:grid-cols-2 gap-10 items-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full glass mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> {t('hero.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
              {t('hero.title1')} <span className="text-gradient">{t('hero.title2')}</span> {t('hero.title3')}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3">
              {/* <Link to="/register"><GradientButton size="lg">{t('cta.createWallet')} <ArrowRight className="h-4 w-4 rtl:rotate-180" /></GradientButton></Link>
              <Link to="/dashboard"><GradientButton size="lg" variant="outline">{t('cta.openDashboard')}</GradientButton></Link> */}
              <Link to="/"><GradientButton size="lg">{t('cta.createWallet')} <ArrowRight className="h-4 w-4 rtl:rotate-180" /></GradientButton></Link>
              <Link to="/"><GradientButton size="lg" variant="outline">{t('cta.openDashboard')}</GradientButton></Link>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-10 max-w-lg">
              {stats.map(s => (
                <div key={s.l}>
                  <div className="text-xl md:text-2xl font-bold text-gradient">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="relative">
            <PhoneMockup />
          </motion.div>
        </div>
      </section>

      {/* operators */}
      <section id="operators" className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{t('land.opsKicker')}</div>
          <h2 className="text-2xl md:text-3xl font-bold">{t('land.opsTitle')}</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {operators.map(op => (
            <div key={op.id} className="card-soft p-5 flex flex-col items-center gap-2">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${op.color} grid place-items-center text-white font-bold shadow-lg`}>{op.logo}</div>
              <div className="text-xs font-medium">{op.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section id="features" className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('land.featTitle')}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('land.featSub')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="card-soft p-6 hover:glow transition-all">
              <div className="w-11 h-11 rounded-xl gradient-primary text-white grid place-items-center mb-4"><f.icon className="h-5 w-5" /></div>
              <div className="font-semibold mb-1">{f.title}</div>
              <div className="text-sm text-muted-foreground">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* services strip */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="card-soft p-6 lg:p-10 grid md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-2">{t('land.beyond')}</h3>
            <p className="text-sm text-muted-foreground">{t('land.beyondSub')}</p>
          </div>
          {[
            { i: Wifi, l: t('svc.internet') },
            { i: Gamepad2, l: t('svc.gaming') },
            { i: Gift, l: t('svc.gift') },
          ].map(s => (
            <div key={s.l} className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary text-white grid place-items-center"><s.i className="h-4 w-4" /></div>
              <div className="text-sm font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* mobile app */}
      <section id="download" className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="card-soft overflow-hidden p-8 lg:p-14 grid md:grid-cols-2 gap-10 items-center relative">
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full gradient-neon opacity-20 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{t('land.appKicker')}</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('land.appTitle')}</h2>
            <p className="text-muted-foreground mb-6 max-w-md">{t('land.appSub')}</p>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-foreground text-background hover:opacity-90">
                <Apple className="h-6 w-6" /><div className="text-left"><div className="text-[10px] opacity-70">Download on the</div><div className="text-sm font-semibold">App Store</div></div>
              </button>
              <button className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-foreground text-background hover:opacity-90">
                <Play className="h-6 w-6" /><div className="text-left"><div className="text-[10px] opacity-70">Get it on</div><div className="text-sm font-semibold">Google Play</div></div>
              </button>
            </div>
          </div>
          <div className="relative flex justify-center"><PhoneMockup /></div>
        </div>
      </section>

      {/* testimonials */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{t('land.loved')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map(ts => (
            <div key={ts.name} className="card-soft p-6">
              <div className="flex gap-0.5 text-warning mb-3">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</div>
              <p className="text-sm mb-4">"{ts.body}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-primary text-white grid place-items-center text-xs font-bold">{ts.name[0]}</div>
                <div><div className="text-sm font-semibold">{ts.name}</div><div className="text-[11px] text-muted-foreground">{ts.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* faq */}
      <section id="faq" className="max-w-3xl mx-auto px-4 lg:px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{t('land.faq')}</h2>
        <div className="card-soft p-2">
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="border-border">
                <AccordionTrigger className="px-4 text-left text-sm font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="px-4 text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* footer */}
      <footer className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        <div className="card-soft p-6 lg:p-8 grid md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl gradient-neon grid place-items-center font-bold text-white">T</div>
              <div className="font-bold">Manshor Pay</div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">{t('land.footAbout')}</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t('land.product')}</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:underline">{t('nav.features')}</a></li>
              {/* <li><Link to="/recharge" className="hover:underline">{t('side.recharge')}</Link></li>
              <li><Link to="/wallet" className="hover:underline">{t('side.wallet')}</Link></li> */}
               <li><Link to="/" className="hover:underline">{t('side.recharge')}</Link></li>
              <li><Link to="/" className="hover:underline">{t('side.wallet')}</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t('land.company')}</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">{t('land.about')}</a></li>
              <li><a href="#" className="hover:underline">{t('land.privacy')}</a></li>
              <li><a href="#" className="hover:underline">{t('land.terms')}</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-6">{t('land.copy')}</div>
      </footer>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] h-[560px]">
      <div className="absolute inset-0 rounded-[3rem] gradient-neon blur-2xl opacity-40" />
      <div className="relative h-full w-full rounded-[3rem] glass-strong border-2 border-white/10 p-3 shadow-2xl">
        <div className="h-full w-full rounded-[2.4rem] overflow-hidden bg-gradient-to-br from-card to-background p-5">
          <div className="text-[10px] text-muted-foreground mb-2">Wallet balance</div>
          <div className="text-3xl font-bold text-gradient mb-4">12,480</div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {['Recharge', 'Packages', 'Wallet'].map(l => (
              <div key={l} className="glass rounded-xl p-2 text-center text-[10px] font-medium">{l}</div>
            ))}
          </div>
          <div className="text-[10px] text-muted-foreground mb-2">Quick operators</div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {operators.slice(0, 3).map(op => (
              <div key={op.id} className={`bg-gradient-to-br ${op.color} rounded-xl p-3 text-center text-[10px] font-bold text-white`}>{op.logo}</div>
            ))}
          </div>
          <div className="text-[10px] text-muted-foreground mb-2">Recent</div>
          <div className="space-y-2">
            {[{ t: 'GP Recharge', a: '-200' }, { t: 'Add Money', a: '+1,500' }, { t: 'PUBG UC', a: '-899' }].map(r => (
              <div key={r.t} className="glass rounded-xl px-3 py-2 flex justify-between text-[11px]"><span>{r.t}</span><span className="font-semibold">{r.a}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
