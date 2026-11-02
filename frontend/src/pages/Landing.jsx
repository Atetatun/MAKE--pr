import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sparkles, CheckCircle, Zap } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-navy mb-6 font-heading">
            Create Professional CVs in Minutes
          </h1>
          <p className="text-xl text-text-muted mb-8">
            PortoCraft makes it easy to build ATS-friendly CVs with AI-powered writing and real-time preview.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="large">
              Get Started
            </Button>
            <Button variant="secondary" size="large">
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-navy text-center mb-16 font-heading">
            Why Choose PortoCraft
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <Sparkles size={48} className="text-cyan mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-2 font-heading">AI Auto-Write</h3>
              <p className="text-text-muted">
                Generate professional content for any section with AI. Choose from 3 variations and edit.
              </p>
            </Card>

            <Card className="text-center">
              <CheckCircle size={48} className="text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-2 font-heading">ATS Checker</h3>
              <p className="text-text-muted">
                Validate your CV for ATS compatibility. Get a score and actionable recommendations.
              </p>
            </Card>

            <Card className="text-center">
              <Zap size={48} className="text-orange mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-2 font-heading">Real-time Preview</h3>
              <p className="text-text-muted">
                See your CV as it's built. Switch templates and watch changes instantly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
