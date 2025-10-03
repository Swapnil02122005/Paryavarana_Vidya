import { Button } from "@/components/ui/button";
import { Leaf, Sparkles, Award, Users, ArrowRight, TreePine, Lightbulb, Globe } from "lucide-react";
import { Link } from "wouter";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-green-950/20 dark:to-emerald-950/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <TreePine className="absolute top-20 right-20 h-32 w-32 text-primary/5 transform rotate-12" />
        <Globe className="absolute bottom-20 left-20 h-40 w-40 text-emerald-400/5 animate-spin" style={{ animationDuration: '30s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-4 mb-8 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
              <Leaf className="h-20 w-20 text-primary relative animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
            <h1 className="font-display text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Paryāvaraṇa Vidyā
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
            Empowering environmental education through gamification
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of students and teachers in making environmental learning fun, 
            interactive, and rewarding. Earn points, unlock achievements, and make a real difference!
          </p>
          
          <Link href="/login">
            <Button 
              size="lg" 
              className="text-xl px-12 py-7 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-2xl shadow-green-500/30 transform hover:scale-105 transition-all duration-300 group"
              data-testid="button-get-started"
            >
              Get Started
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
            ✨ Free to join • No credit card required
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div 
            className="group text-center p-8 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-green-200 dark:border-green-800 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 transition-all duration-300" 
            data-testid="feature-learn"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Lightbulb className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">Learn & Explore</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Discover environmental topics through interactive lessons, quizzes, and educational content
            </p>
          </div>

          <div 
            className="group text-center p-8 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-emerald-200 dark:border-emerald-800 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 transition-all duration-300" 
            data-testid="feature-play"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">Play & Earn</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Complete challenges, play games, and earn eco-points and coins for your achievements
            </p>
          </div>

          <div 
            className="group text-center p-8 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-teal-200 dark:border-teal-800 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2 transition-all duration-300" 
            data-testid="feature-connect"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">Connect & Grow</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Join eco-clubs, connect with other learners, and grow together in your environmental journey
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <div className="text-center p-6 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm">
            <div className="text-4xl font-bold text-primary mb-2">10K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Learners</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm">
            <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Educators</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm">
            <div className="text-4xl font-bold text-teal-600 mb-2">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Learning Modules</div>
          </div>
        </div>
      </div>
    </div>
  );
}
