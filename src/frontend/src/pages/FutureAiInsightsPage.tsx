import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Brain, TrendingUp, AlertCircle, Zap, LineChart } from 'lucide-react';

export default function FutureAiInsightsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          Coming Soon
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Future AI Insights
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover how artificial intelligence will help you understand your wellness patterns and
          make informed decisions about your health journey.
        </p>
      </div>

      <Alert className="mb-8 border-primary/20 bg-primary/5">
        <AlertCircle className="h-5 w-5 text-primary" />
        <AlertDescription className="text-base">
          <strong>Important Medical Disclaimer:</strong> The AI features described below are
          conceptual and not yet implemented. VitaSense does not provide medical advice, diagnosis,
          or treatment. Any future AI insights will be for informational and wellness tracking
          purposes only. Always consult qualified healthcare professionals for medical concerns,
          diagnosis, or treatment decisions.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-soft border-2">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="flex items-center gap-2">
              Pattern Recognition
              <Badge variant="secondary" className="text-xs">
                Planned
              </Badge>
            </CardTitle>
            <CardDescription>
              AI will analyze your health log entries to identify patterns in your mood, sleep, and
              wellness metrics over time.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="shadow-soft border-2">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="flex items-center gap-2">
              Trend Analysis
              <Badge variant="secondary" className="text-xs">
                Planned
              </Badge>
            </CardTitle>
            <CardDescription>
              Visualize long-term trends in your wellness journey and understand how different
              factors correlate with your overall health.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="shadow-soft border-2">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="flex items-center gap-2">
              Personalized Suggestions
              <Badge variant="secondary" className="text-xs">
                Planned
              </Badge>
            </CardTitle>
            <CardDescription>
              Receive AI-generated wellness suggestions based on your unique patterns and goals
              (not medical advice).
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="shadow-soft border-2">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="flex items-center gap-2">
              Predictive Insights
              <Badge variant="secondary" className="text-xs">
                Planned
              </Badge>
            </CardTitle>
            <CardDescription>
              AI models will help predict potential wellness trends and suggest proactive steps to
              maintain your health goals.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-medium">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold mb-3">
                Building the Future of Wellness
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We're working on integrating advanced AI capabilities to help you gain deeper
                insights into your health patterns. These features will use machine learning to
                analyze your data and provide personalized wellness recommendations.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Remember:</strong> All AI insights will be for informational purposes only
                and should never replace professional medical advice. Your health data remains
                private and secure on the Internet Computer blockchain.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
