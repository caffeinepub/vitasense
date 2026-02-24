import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Target, TrendingUp, Award, Brain, Clock } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: 'dashboard') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Digital Detox
                <span className="block text-primary">Focus & Mind Reset</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance">
                Break phone addiction, improve focus, and build healthy digital habits with tracking,
                challenges, rewards, and AI-powered insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="text-lg px-8 shadow-glow" onClick={() => onNavigate('dashboard')}>
                  Start Your Journey
                  <Target className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/assets/generated/welcome-hero.dim_800x600.png"
                alt="Digital Detox"
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
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help you take control of your digital life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="shadow-soft border-2 hover:border-primary/20 transition-all hover:shadow-glow">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Focus Sessions</CardTitle>
                <CardDescription>
                  Timed focus sessions with countdown animations and rewards for completion
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft border-2 hover:border-secondary/20 transition-all hover:shadow-glow">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Digital Challenges</CardTitle>
                <CardDescription>
                  Pre-built and custom challenges to help you build better digital habits
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft border-2 hover:border-accent/20 transition-all hover:shadow-glow">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Rewards & Levels</CardTitle>
                <CardDescription>
                  Earn points, unlock badges, and level up from Beginner to Digital Master
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft border-2 hover:border-primary/20 transition-all hover:shadow-glow">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>
                  Personalized suggestions based on your usage patterns and goals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft border-2 hover:border-secondary/20 transition-all hover:shadow-glow">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Screen Time Tracking</CardTitle>
                <CardDescription>
                  Monitor your daily screen time and stay within your limits
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-soft border-2 hover:border-accent/20 transition-all hover:shadow-glow">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Smart Reminders</CardTitle>
                <CardDescription>
                  Gentle notifications to help you disconnect at the right times
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background border-primary/20 shadow-glow">
            <CardContent className="p-8 md:p-12 text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Take Control?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who have transformed their relationship with technology
              </p>
              <Button size="lg" className="text-lg px-8 shadow-glow" onClick={() => onNavigate('dashboard')}>
                Get Started Free
                <Target className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
