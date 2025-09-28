"use client";

import {
  BookOpen,
  Code,
  Heart,
  Lightbulb,
  Plus,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserDetails } from "@/hooks/use-user-details";

export default function DashboardComponent() {
  const { data: userDetails, isLoading, error } = useUserDetails();

  // Get user's initials for avatar
  const userInitials = userDetails
    ? `${userDetails.firstName[0]}${userDetails.lastName[0]}`.toUpperCase()
    : "JD";

  // Get user's first name
  const firstName = userDetails?.firstName || "John";

  // Simple loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background grid-pattern flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">HackSpark</span>
          </div>
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
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {firstName}!
              </h1>
              <p className="text-muted-foreground">
                Ready to spark some innovation today?
              </p>
            </div>
            <Button asChild>
              <Link href="/create">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">
                      Projects
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">847</div>
                    <div className="text-sm text-muted-foreground">
                      Total Likes
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm text-muted-foreground">
                      Followers
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">
                      Technologies
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="projects">My Projects</TabsTrigger>
                <TabsTrigger value="liked">Liked Projects</TabsTrigger>
                <TabsTrigger value="following">Following Feed</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Projects</h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/projects">View All</Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "TaskFlow - Smart Project Manager",
                      description:
                        "AI-powered project management tool with automated task prioritization and team collaboration features",
                      status: "Active",
                      likes: 89,
                      tags: ["React", "Node.js", "AI", "MongoDB"],
                      lastUpdated: "2 days ago",
                    },
                    {
                      title: "CodeSnap - Screenshot to Code",
                      description:
                        "Convert UI screenshots into clean, production-ready code using computer vision and GPT-4",
                      status: "In Development",
                      likes: 156,
                      tags: ["Python", "OpenAI", "FastAPI", "React"],
                      lastUpdated: "5 hours ago",
                    },
                    {
                      title: "DevMetrics Dashboard",
                      description:
                        "Personal analytics dashboard for developers to track coding habits, productivity, and skill growth",
                      status: "Completed",
                      likes: 234,
                      tags: ["Next.js", "TypeScript", "Supabase", "Charts"],
                      lastUpdated: "1 week ago",
                    },
                  ].map((project) => (
                    <Card
                      key={project.title}
                      className="border-border/50 hover:border-border transition-colors"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">
                                {project.title}
                              </CardTitle>
                              <Badge
                                variant={
                                  project.status === "Active"
                                    ? "default"
                                    : project.status === "Completed"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs"
                              >
                                {project.status}
                              </Badge>
                            </div>
                            <CardDescription className="text-sm leading-relaxed">
                              {project.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{project.likes}</span>
                            </div>
                            <span>Updated {project.lastUpdated}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="liked" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Liked Projects</h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/liked">View All</Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "AI Voice Assistant",
                      author: "sarah_dev",
                      description:
                        "Voice-controlled assistant with natural language processing and smart home integration",
                      likes: 342,
                      tags: ["Python", "AI", "Speech", "IoT"],
                    },
                    {
                      title: "Blockchain Voting System",
                      author: "crypto_builder",
                      description:
                        "Secure, transparent voting platform built on Ethereum with zero-knowledge proofs",
                      likes: 278,
                      tags: ["Solidity", "React", "Web3", "Ethereum"],
                    },
                  ].map((project) => (
                    <Card
                      key={project.title}
                      className="border-border/50 hover:border-border transition-colors"
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
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
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
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                            <span className="text-sm">{project.likes}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="following" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Projects from People You Follow
                  </h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/following">View All</Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Real-time Code Collaboration",
                      author: "sarah_dev",
                      description:
                        "Live collaborative coding environment with real-time synchronization and voice chat integration",
                      likes: 189,
                      tags: ["WebRTC", "Socket.io", "React", "Node.js"],
                      timeAgo: "3 hours ago",
                      isNew: true,
                    },
                    {
                      title: "Smart Contract Auditor",
                      author: "alex_codes",
                      description:
                        "Automated security analysis tool for Ethereum smart contracts using static analysis",
                      likes: 145,
                      tags: ["Solidity", "Security", "Python", "Web3"],
                      timeAgo: "1 day ago",
                      isNew: false,
                    },
                    {
                      title: "ML Model Deployment Platform",
                      author: "mike_builds",
                      description:
                        "One-click deployment platform for machine learning models with auto-scaling and monitoring",
                      likes: 267,
                      tags: ["Python", "Docker", "Kubernetes", "ML"],
                      timeAgo: "2 days ago",
                      isNew: false,
                    },
                  ].map((project) => (
                    <Card
                      key={project.title}
                      className="border-border/50 hover:border-border transition-colors relative"
                    >
                      {project.isNew && (
                        <div className="absolute top-3 right-3">
                          <Badge
                            variant="default"
                            className="text-xs bg-primary"
                          >
                            New
                          </Badge>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1 pr-12">
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
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
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
                            <span className="text-xs text-muted-foreground">
                              • {project.timeAgo}
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

                {/* Empty state for when user follows no one */}
                <Card className="border-border/50 border-dashed">
                  <CardContent className="p-8 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Discover Amazing Developers
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Follow other developers to see their latest projects and
                      get inspired by their work.
                    </p>
                    <Button asChild>
                      <Link href="/explore">Explore Developers</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies Mastered */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Technologies Mastered
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "React", level: 95, years: 4 },
                  { name: "TypeScript", level: 88, years: 3 },
                  { name: "Node.js", level: 82, years: 3 },
                  { name: "Python", level: 75, years: 2 },
                  { name: "Next.js", level: 90, years: 2 },
                ].map((tech) => (
                  <div key={tech.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{tech.name}</span>
                      <span className="text-muted-foreground">
                        {tech.years}y exp
                      </span>
                    </div>
                    <Progress value={tech.level} className="h-2" />
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Technology
                </Button>
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Suggested for You
                </CardTitle>
                <CardDescription>
                  Based on your skills and interests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Learn Rust</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Perfect for systems programming with your backend
                      experience
                    </p>
                    <Badge variant="outline" className="text-xs">
                      High Demand
                    </Badge>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Try Three.js</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Add 3D graphics to your React projects
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Trending
                    </Badge>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">
                      Explore WebAssembly
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      High-performance web applications
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Future Tech
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Learning Path
                </Button>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p>
                        You received 12 new likes on{" "}
                        <span className="font-medium">CodeSnap</span>
                      </p>
                      <p className="text-muted-foreground text-xs">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p>
                        <span className="font-medium">alex_codes</span> started
                        following you
                      </p>
                      <p className="text-muted-foreground text-xs">
                        5 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p>
                        Your project was featured in{" "}
                        <span className="font-medium">Weekly Showcase</span>
                      </p>
                      <p className="text-muted-foreground text-xs">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
