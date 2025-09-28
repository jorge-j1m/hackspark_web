"use client";

import {
  BookOpen,
  Code,
  Heart,
  Lightbulb,
  LogOut,
  Plus,
  Settings,
  Star,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import router from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserDetails } from "@/hooks/use-user-details";
import { addUserTechnology } from "@/lib/api-client";
import { type UserProject, UserProjectSchema } from "@/types/users";

export default function DashboardComponent() {
  const { data: userDetails, isLoading } = useUserDetails();
  const { projects } = userDetails || {};
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    tag_slug: "",
    skill_level: "",
    years_experience: "",
  });

  // Get user's initials for avatar
  const userInitials = userDetails
    ? `${userDetails.firstName[0]}${userDetails.lastName[0]}`.toUpperCase()
    : "JD";

  // Get user's first name
  const firstName = userDetails?.firstName || "John";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      skill_level: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.sessionId) {
      console.error("No session found");
      return;
    }

    setIsSubmitting(true);

    try {
      await addUserTechnology(
        {
          tag_slug: formData.tag_slug,
          skill_level: formData.skill_level as
            | "beginner"
            | "intermediate"
            | "expert",
          years_experience: Number(formData.years_experience),
        },
        session.user.sessionId,
      );

      setIsModalOpen(false);
      setFormData({
        tag_slug: "",
        skill_level: "",
        years_experience: "",
      });
    } catch (error) {
      console.error("Failed to add technology:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  function countProjectLikes(projects: UserProject[]) {
    return projects.reduce((acc, project) => {
      // validate each project
      const parsed = UserProjectSchema.parse(project);
      return acc + parsed.like_count;
    }, 0);
  }

  function getProjectStatus(addedAt: string) {
    const now = new Date();
    const projectDate = new Date(addedAt);
    const minutesDiff = Math.floor(
      (now.getTime() - projectDate.getTime()) / (1000 * 60),
    );

    if (minutesDiff <= 5) {
      return { label: "New", variant: "default" as const };
    } else if (minutesDiff <= 30) {
      return { label: "Active", variant: "secondary" as const };
    } else {
      return { label: "Completed", variant: "outline" as const };
    }
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userDetails?.firstName} {userDetails?.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userDetails?.email ||
                        `${firstName.toLowerCase()}@example.com`}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut();
                      router.push("/");
                    }}
                  >
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                    <div className="text-2xl font-bold">
                      {userDetails?.projects?.length || 0}
                    </div>
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
                    <div className="text-2xl font-bold">
                      {countProjectLikes(userDetails?.projects || [])}
                    </div>
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
                    <div className="text-2xl font-bold">
                      {userDetails?.technologies?.length}
                    </div>
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
                  {projects && projects.length > 0 ? (
                    projects
                      .sort(
                        (a, b) =>
                          new Date(b.added_at).getTime() -
                          new Date(a.added_at).getTime(),
                      )
                      .map((project) => (
                        <Card
                          key={project.id}
                          className="border-border/50 hover:border-border transition-colors"
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <CardTitle className="text-lg">
                                    {project.name}
                                  </CardTitle>
                                  <Badge
                                    variant={
                                      getProjectStatus(project.added_at).variant
                                    }
                                    className="text-xs"
                                  >
                                    {getProjectStatus(project.added_at).label}
                                  </Badge>
                                </div>
                                <CardDescription className="text-sm leading-relaxed">
                                  {project.description}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  <span>{project.like_count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4" />
                                  <span>{project.star_count}</span>
                                </div>
                                <span>
                                  Added{" "}
                                  {new Date(
                                    project.added_at,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                  ) : (
                    <Card className="border-border/50 border-dashed">
                      <CardContent className="p-8 text-center">
                        <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          No Projects Yet
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Create your first project to get started building
                          something amazing.
                        </p>
                        <Button asChild>
                          <Link href="/create">Create Your First Project</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
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
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4 bg-transparent"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Technology
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Technology</DialogTitle>
                      <DialogDescription>
                        Add a new technology to your profile. Fill in the
                        details below.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="tag_slug" className="text-right">
                            Technology
                          </Label>
                          <Input
                            id="tag_slug"
                            name="tag_slug"
                            value={formData.tag_slug}
                            onChange={handleInputChange}
                            placeholder="e.g., react, python, aws"
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="skill_level" className="text-right">
                            Skill Level
                          </Label>
                          <Select
                            value={formData.skill_level}
                            onValueChange={handleSelectChange}
                            required
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select skill level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="years_experience"
                            className="text-right"
                          >
                            Years
                          </Label>
                          <Input
                            id="years_experience"
                            name="years_experience"
                            type="number"
                            value={formData.years_experience}
                            onChange={handleInputChange}
                            placeholder="Years of experience"
                            className="col-span-3"
                            min="0"
                            step="0.5"
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsModalOpen(false)}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Adding..." : "Add Technology"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
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
