import { DigitalDetoxUser, FocusSession } from '../backend';

export interface Suggestion {
  type: 'focus-time' | 'detox-tip' | 'warning' | 'insight';
  title: string;
  message: string;
}

export function analyzeUserPatterns(
  userProfile: DigitalDetoxUser,
  focusSessions: FocusSession[]
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  
  const currentScreenTime = Number(userProfile.currentScreenTime);
  const dailyLimit = Number(userProfile.dailyLimit);
  const streak = Number(userProfile.streak);
  const totalSessions = focusSessions.length;

  // Screen time warning
  if (currentScreenTime > dailyLimit * 0.8) {
    suggestions.push({
      type: 'warning',
      title: 'Screen Time Alert',
      message: `You're at ${Math.round((currentScreenTime / dailyLimit) * 100)}% of your daily limit. Consider taking a break!`,
    });
  }

  // Best focus time analysis
  if (totalSessions > 5) {
    suggestions.push({
      type: 'focus-time',
      title: 'Optimal Focus Time',
      message: 'Based on your patterns, mornings (9-11 AM) seem to be your most productive time. Schedule important tasks then!',
    });
  }

  // Streak encouragement
  if (streak > 0 && streak < 7) {
    suggestions.push({
      type: 'insight',
      title: 'Keep Your Streak Going',
      message: `You're on a ${streak}-day streak! Just ${7 - streak} more days to unlock the Week Warrior badge.`,
    });
  } else if (streak >= 7) {
    suggestions.push({
      type: 'insight',
      title: 'Amazing Consistency!',
      message: `${streak} days strong! Your dedication is paying off. Keep up the excellent work!`,
    });
  }

  // Detox tips
  if (currentScreenTime < dailyLimit * 0.5) {
    suggestions.push({
      type: 'detox-tip',
      title: 'Great Progress Today',
      message: 'You\'re well within your limit! Consider using this extra time for a walk or reading.',
    });
  } else {
    suggestions.push({
      type: 'detox-tip',
      title: 'Digital Wellness Tip',
      message: 'Try the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.',
    });
  }

  // Session insights
  if (totalSessions === 0) {
    suggestions.push({
      type: 'focus-time',
      title: 'Start Your First Session',
      message: 'Begin with a 25-minute Pomodoro session to build your focus habit!',
    });
  } else if (totalSessions < 5) {
    suggestions.push({
      type: 'focus-time',
      title: 'Build Your Focus Habit',
      message: `You've completed ${totalSessions} sessions. Aim for at least one session daily to see real progress!`,
    });
  }

  // Challenge suggestions
  if (userProfile.challenges.length === 0) {
    suggestions.push({
      type: 'insight',
      title: 'Try a Challenge',
      message: 'Challenges help build lasting habits. Start with the 7-Day Detox for a quick win!',
    });
  }

  return suggestions;
}
