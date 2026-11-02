import { Link } from 'react-router-dom'
import { Sparkles, CheckCircle2, FileText, Zap, ShieldCheck, ArrowRight } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

/**
 * LandingPage
 *
 * User Flow (PRD.md Section 6 - Flow 1):
 *   Landing Page → Template Gallery → CV Builder → Export
 *
 * Sections:
 *   - Hero: Title, CTA, value prop
 *   - Features: Template Gallery, AI Auto-Write, ATS Checker, PDF Export
 *   - How it works: 3 steps
 *   - CTA Section
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-light">
      <Header />

      <main className="flex-1 pt-16">
        {/* ── Hero Section ── */}
        <section className="max-w-page mx-auto px-10 sm:px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 text-cyan text-body-sm font-semibold font-heading mb-6">
            <Sparkles size={16} />
            AI-Powered CV & Portfolio Builder
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-navy font-heading leading-tight tracking-tight mb-6">
            Build a Professional CV
            <br />
            <span className="text-cyan">in Minutes with AI</span>
          </h1>

          <p className="text-body-lg text-text-muted font-body max-w-[600px] mx-auto mb-10">
            PortoCraft helps fresh graduates and professionals create ATS-friendly CVs 
            and portfolios — with AI-powered writing assistance, beautiful templates, 
            and instant PDF export.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-6 py-4 bg-navy text-white font-semibold text-base rounded-lg transition-all duration-200 hover:bg-navy-dark no-underline hover:no-underline shadow-md hover:shadow-lg"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-6 py-4 border-2 border-navy text-navy font-semibold text-base rounded-lg transition-all duration-200 hover:bg-slate-50 no-underline hover:no-underline"
            >
              Browse Templates
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-12 flex-wrap">
            {[
              { icon: CheckCircle2, text: 'ATS-Friendly Templates' },
              { icon: Zap,          text: 'AI Auto-Write' },
              { icon: ShieldCheck,  text: 'ATS Score Checker' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-body-sm text-text-muted font-body">
                <Icon size={16} className="text-success shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </section>

        {/* ── Features Section ── */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-page mx-auto px-10 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy font-heading mb-4">
                Everything You Need
              </h2>
              <p className="text-body-lg text-text-muted font-body max-w-[500px] mx-auto">
                From templates to AI writing — all in one platform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-bg-light rounded-lg p-6 border border-slate-200 hover:shadow-card-hover hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center mb-4">
                    <feature.icon size={20} className="text-navy" />
                  </div>
                  <h3 className="text-h3 font-semibold text-navy font-heading mb-2">{feature.title}</h3>
                  <p className="text-body-sm text-text-muted font-body">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it Works ── */}
        <section className="py-16 md:py-20">
          <div className="max-w-page mx-auto px-10 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy font-heading mb-4">
                How It Works
              </h2>
              <p className="text-body-lg text-text-muted font-body">
                Create your CV in 3 simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {STEPS.map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-navy text-white font-bold text-lg font-heading flex items-center justify-center mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-h3 font-semibold text-navy font-heading mb-2">{step.title}</h3>
                  <p className="text-body-sm text-text-muted font-body">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="bg-navy py-16 md:py-20">
          <div className="max-w-page mx-auto px-10 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
              Ready to Build Your CV?
            </h2>
            <p className="text-body-lg text-slate-300 font-body mb-8 max-w-[500px] mx-auto">
              Join thousands of professionals who built their careers with PortoCraft.
            </p>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan text-white font-semibold text-base rounded-lg transition-all duration-200 hover:bg-cyan-dark no-underline hover:no-underline shadow-md hover:shadow-lg"
            >
              Start Building Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const FEATURES = [
  {
    icon: FileText,
    title: 'Template Gallery',
    description: 'Choose from 3 professional templates: Professional, Creative, and Minimal.',
  },
  {
    icon: Sparkles,
    title: 'AI Auto-Write',
    description: 'Generate polished experience descriptions, skills, and summaries instantly.',
  },
  {
    icon: ShieldCheck,
    title: 'ATS Checker',
    description: 'Score your CV against ATS systems and get actionable improvement tips.',
  },
  {
    icon: Zap,
    title: 'PDF Export',
    description: 'Export your CV as a high-quality PDF that matches your chosen template.',
  },
]

const STEPS = [
  {
    title: 'Pick a Template',
    description: 'Browse our template gallery and choose the one that fits your style.',
  },
  {
    title: 'Fill Your Details',
    description: 'Enter your info — or let AI write it for you in seconds.',
  },
  {
    title: 'Export as PDF',
    description: 'Download your professional CV, ready to send to any employer.',
  },
]
