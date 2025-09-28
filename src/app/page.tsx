import { Code, Heart, TrendingUp, Zap, Rocket, Star, Users, Gauge } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import NavLogo from "@/components/ui/nav-logo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavLogo />
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/explore"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/trending"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Trending
            </Link>
            <Link
              href="/create"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Create
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            The complete platform to{" "}
            <span className="text-primary">spark innovation</span>.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Your team's toolkit to stop configuring and start innovating.
            Discover, build, and share the best side projects with the developer
            community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/create">Start Building</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
              asChild
            >
              <Link href="/explore">Explore Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Card className="text-center border-border/50 hover:border-primary/20 transition-all duration-300 group">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Rocket className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2 text-primary">2.5k+</div>
              <div className="text-sm text-muted-foreground">
                Projects created
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                this month
              </div>
            </CardContent>
          </Card>
          <Card className="text-center border-border/50 hover:border-primary/20 transition-all duration-300 group">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors">
                <Star className="w-7 h-7 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold mb-2 text-yellow-600 dark:text-yellow-400">98%</div>
              <div className="text-sm text-muted-foreground">
                Developer satisfaction
              </div>
              <div className="text-xs text-muted-foreground mt-1">rating</div>
            </CardContent>
          </Card>
          <Card className="text-center border-border/50 hover:border-primary/20 transition-all duration-300 group">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Users className="w-7 h-7 text-blue-500" />
              </div>
              <div className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">15k+</div>
              <div className="text-sm text-muted-foreground">
                Active developers
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                building daily
              </div>
            </CardContent>
          </Card>
          <Card className="text-center border-border/50 hover:border-primary/20 transition-all duration-300 group">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                <Gauge className="w-7 h-7 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-2 text-green-600 dark:text-green-400">3x</div>
              <div className="text-sm text-muted-foreground">Faster to</div>
              <div className="text-xs text-muted-foreground mt-1">
                prototype + deploy
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Projects */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Popular Projects</h2>
            <p className="text-muted-foreground">
              Discover what the community is building
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/projects">View All</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "AI Code Review Assistant",
              description:
                "Automated code review tool using GPT-4 to analyze pull requests and suggest improvements",
              author: "sarah_dev",
              likes: 234,
              tags: ["AI", "TypeScript", "Next.js", "OpenAI"],
            },
            {
              title: "Real-time Collaboration Whiteboard",
              description:
                "Multiplayer whiteboard with real-time sync, perfect for remote team brainstorming sessions",
              author: "mike_builds",
              likes: 189,
              tags: ["React", "Socket.io", "Canvas", "WebRTC"],
            },
            {
              title: "Smart Expense Tracker",
              description:
                "Personal finance app with AI categorization and spending insights using machine learning",
              author: "alex_codes",
              likes: 156,
              tags: ["React Native", "Python", "ML", "Firebase"],
            },
          ].map((project) => (
            <Card
              key={project.title}
              className="border-border/50 hover:border-border transition-colors cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {project.author.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {project.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{project.likes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Technologies */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold">Trending Technologies</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: "Next.js", count: "1.2k projects", trend: "+15%" },
            { name: "TypeScript", count: "980 projects", trend: "+22%" },
            { name: "Tailwind CSS", count: "856 projects", trend: "+18%" },
            { name: "React", count: "2.1k projects", trend: "+8%" },
            { name: "Python", count: "743 projects", trend: "+25%" },
            { name: "Supabase", count: "432 projects", trend: "+45%" },
          ].map((tech) => (
            <Card
              key={tech.name}
              className="border-border/50 hover:border-border transition-colors cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">{tech.name}</h3>
                  <p className="text-xs text-muted-foreground mb-1">
                    {tech.count}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-xs text-green-400 border-green-400/20"
                  >
                    {tech.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">
                Start building in seconds
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Kickstart your next project with AI-generated ideas and connect
                with developers who share your passion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/create">Create Project</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-transparent"
                  asChild
                >
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold">HackSpark</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The platform for developers to discover, create, and share
                innovative side projects.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/explore"
                    className="hover:text-foreground transition-colors"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trending"
                    className="hover:text-foreground transition-colors"
                  >
                    Trending
                  </Link>
                </li>
                <li>
                  <Link
                    href="/create"
                    className="hover:text-foreground transition-colors"
                  >
                    Create
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/developers"
                    className="hover:text-foreground transition-colors"
                  >
                    Developers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/showcase"
                    className="hover:text-foreground transition-colors"
                  >
                    Showcase
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="hover:text-foreground transition-colors"
                  >
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 HackSpark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
