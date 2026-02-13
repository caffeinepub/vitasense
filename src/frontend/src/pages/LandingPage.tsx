import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, TrendingUp, Calendar, Sparkles, AlertCircle } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: 'landing' | 'dashboard' | 'insights') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Future AI Health Platform
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Your Personal Wellness Journey Starts Here
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance">
                VitaSense helps you track your daily wellness metrics and prepare for future
                AI-powered health insights. Monitor your mood, sleep, and health goals in one
                beautiful, private space.
              </p>

              <Alert className="border-primary/20 bg-primary/5">
                <AlertCircle className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm">
                  <strong>Important:</strong> VitaSense is a wellness tracking tool and does not
                  provide medical advice, diagnosis, or treatment. Always consult with qualified
                  healthcare professionals for medical concerns.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="text-lg px-8 shadow-medium" asChild>
                  <button onClick={() => onNavigate('dashboard')}>
                    Get Started Free
                    <Heart className="ml-2 h-5 w-5" />
                  </button>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  onClick={() => onNavigate('insights')}
                >
                  Explore AI Features
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/assets/generated/vitasense-hero.dim_1600x900.png"
                alt="VitaSense wellness illustration"
                className="w-full h-auto rounded-2xl shadow-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Track What Matters
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, intuitive tools to help you understand your wellness patterns
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="shadow-soft border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Daily Mood Tracking</CardTitle>
                <CardDescription>
                  Log your emotional state and identify patterns over time with our simple 1-5
                  scale.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Sleep Monitoring</CardTitle>
                <CardDescription>
                  Record your sleep hours and discover how rest affects your overall wellness.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Health Goals</CardTitle>
                <CardDescription>
                  Set personal wellness objectives and track your progress toward a healthier you.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-medium">
            <CardContent className="p-8 md:p-12 text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Begin Your Wellness Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Sign in with Internet Identity to start tracking your health metrics securely and
                privately.
              </p>
              <Button size="lg" className="text-lg px-8 shadow-medium" asChild>
                <button onClick={() => onNavigate('dashboard')}>
                  Sign In to Get Started
                  <Heart className="ml-2 h-5 w-5" />
                </button>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
