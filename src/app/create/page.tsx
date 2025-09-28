"use client";

import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Code,
  Crown,
  Lightbulb,
  Lock,
  Rocket,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function CreateProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    [],
  );
  const [selectedGoal, setSelectedGoal] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isPremium] = useState(false); // This would come from user context

  const technologies = [
    "React",
    "Vue.js",
    "Angular",
    "Svelte",
    "Node.js",
    "Python",
    "Go",
    "Rust",
    "TypeScript",
    "JavaScript",
    "Java",
    "C#",
    "Next.js",
    "Nuxt.js",
    "Express",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Supabase",
    "AWS",
    "Vercel",
    "Docker",
    "Kubernetes",
    "TailwindCSS",
    "Styled Components",
    "SASS",
    "CSS",
    "GraphQL",
    "REST API",
    "WebSocket",
    "gRPC",
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "Machine Learning",
    "AI",
    "Blockchain",
    "WebAssembly",
  ];

  const learningGoals = [
    {
      id: "new-tech",
      title: "Learn New Technology",
      description: "Master a technology you've never used before",
      icon: <Code className="w-5 h-5" />,
    },
    {
      id: "portfolio",
      title: "Build Portfolio Project",
      description: "Create something impressive to showcase your skills",
      icon: <Target className="w-5 h-5" />,
    },
    {
      id: "solve-problem",
      title: "Solve Real Problem",
      description: "Build something that addresses a genuine need",
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      id: "experiment",
      title: "Experiment & Explore",
      description: "Try new ideas and push creative boundaries",
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  const mockAIProjects = [
    {
      title: "Smart Recipe Recommender",
      description:
        "Build an AI-powered recipe app that suggests meals based on available ingredients, dietary preferences, and cooking time. Perfect for learning React with a Python ML backend.",
      difficulty: "Intermediate",
      timeEstimate: "2-3 weeks",
      features: [
        "Ingredient recognition",
        "ML recommendations",
        "User preferences",
        "Recipe database",
      ],
      technologies: selectedTechnologies.slice(0, 4),
    },
    {
      title: "Developer Productivity Dashboard",
      description:
        "Create a personal dashboard that tracks your coding habits, GitHub activity, and learning progress. Great for mastering data visualization and API integrations.",
      difficulty: "Beginner-Intermediate",
      timeEstimate: "1-2 weeks",
      features: [
        "GitHub API integration",
        "Activity tracking",
        "Progress visualization",
        "Goal setting",
      ],
      technologies: selectedTechnologies.slice(1, 5),
    },
    {
      title: "Real-time Collaborative Whiteboard",
      description:
        "Build a multiplayer whiteboard application with real-time synchronization. Excellent for learning WebSocket programming and collaborative features.",
      difficulty: "Advanced",
      timeEstimate: "3-4 weeks",
      features: [
        "Real-time sync",
        "Drawing tools",
        "User presence",
        "Room management",
      ],
      technologies: selectedTechnologies.slice(0, 3),
    },
  ];

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">HackSpark</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of 4
            </span>
            <div className="w-32">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Step 1: Learning Goal */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                What do you want to achieve?
              </h1>
              <p className="text-lg text-muted-foreground">
                Tell us your goal so we can suggest the perfect project for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {learningGoals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`border-border/50 cursor-pointer transition-all hover:border-border ${
                    selectedGoal === goal.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => setSelectedGoal(goal.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                        {goal.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={nextStep} disabled={!selectedGoal}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Technologies */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                Choose your tech stack
              </h1>
              <p className="text-lg text-muted-foreground">
                Select technologies you want to use or learn in your project
              </p>
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Technologies</CardTitle>
                <CardDescription>
                  Select all technologies that interest you. We'll suggest
                  projects that match your selection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant={
                        selectedTechnologies.includes(tech)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer justify-center py-2 px-3 hover:bg-secondary transition-colors"
                      onClick={() => toggleTechnology(tech)}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                {selectedTechnologies.length > 0 && (
                  <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                    <p className="text-sm font-medium mb-2">
                      Selected Technologies:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTechnologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={selectedTechnologies.length === 0}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Project preferences</h1>
              <p className="text-lg text-muted-foreground">
                Help us tailor the perfect project suggestions for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Time Commitment
                  </CardTitle>
                  <CardDescription>
                    How much time can you dedicate to this project?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={timeCommitment}
                    onValueChange={setTimeCommitment}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekend" id="weekend" />
                      <Label htmlFor="weekend">
                        Weekend project (1-2 days)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="week" id="week" />
                      <Label htmlFor="week">One week sprint</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="month" id="month" />
                      <Label htmlFor="month">Monthly project</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ongoing" id="ongoing" />
                      <Label htmlFor="ongoing">Ongoing development</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Experience Level
                  </CardTitle>
                  <CardDescription>
                    What's your experience with the selected technologies?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={experienceLevel}
                    onValueChange={setExperienceLevel}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="beginner" />
                      <Label htmlFor="beginner">
                        Beginner - Just getting started
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id="intermediate" />
                      <Label htmlFor="intermediate">
                        Intermediate - Some experience
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advanced" id="advanced" />
                      <Label htmlFor="advanced">
                        Advanced - Very comfortable
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!timeCommitment || !experienceLevel}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Manual Entry + Premium AI Preview */}
        {currentStep === 4 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Create your project</h1>
              <p className="text-lg text-muted-foreground">
                Add your project details or upgrade to get AI-powered
                suggestions
              </p>
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Enter your project information manually to get started right
                  away
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Smart Recipe Recommender"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your project does, what problem it solves, and what you'll learn..."
                    rows={4}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    className="flex-1"
                    disabled={!projectTitle || !projectDescription}
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                </div>
              </CardContent>
            </Card>

            <div className="relative">
              {/* Blur overlay for non-premium users */}
              {!isPremium && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
                  <Card className="max-w-md mx-4 border-primary/20 bg-gradient-to-br from-primary/5 to-orange-500/5">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Crown className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">
                        Unlock AI Project Ideas
                      </CardTitle>
                      <CardDescription className="text-base">
                        Get personalized, AI-generated project suggestions
                        tailored to your skills and goals
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 justify-center">
                          <Star className="w-4 h-4 text-primary" />
                          <span>3 custom project ideas</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <Star className="w-4 h-4 text-primary" />
                          <span>Detailed implementation guides</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <Star className="w-4 h-4 text-primary" />
                          <span>Difficulty & time estimates</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <Star className="w-4 h-4 text-primary" />
                          <span>AI project assistant</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Premium - $9/month
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Join 10,000+ developers building better projects with AI
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Blurred AI suggestions preview */}
              <div className={`space-y-4 ${!isPremium ? "blur-sm" : ""}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">
                    AI-Generated Project Ideas
                  </h3>
                  <Badge variant="secondary" className="gap-1">
                    <Lock className="w-3 h-3" />
                    Premium
                  </Badge>
                </div>

                {mockAIProjects.map((project) => (
                  <Card key={project.title} className="border-border/50 opacity-60">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">
                              {project.title}
                            </CardTitle>
                            <Badge variant="outline" className="text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI Generated
                            </Badge>
                          </div>
                          <CardDescription className="text-base leading-relaxed mb-4">
                            {project.description}
                          </CardDescription>

                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Difficulty
                              </Label>
                              <p className="text-sm font-medium">
                                {project.difficulty}
                              </p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Time Estimate
                              </Label>
                              <p className="text-sm font-medium">
                                {project.timeEstimate}
                              </p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">
                                Technologies
                              </Label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {project.technologies
                                  .slice(0, 3)
                                  .map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <Button className="flex-1" disabled>
                          <Rocket className="w-4 h-4 mr-2" />
                          Start This Project
                        </Button>
                        <Button variant="outline" disabled>
                          Save for Later
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Return to Dashboard</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
