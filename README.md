## Inspiration

In today's competitive market, personal projects are more important than ever. Many developers, from beginner to pro, want to start projects for a variety of reasons such as learning, portfolios, or simply for fun. But, many find themselves stuck at square one with no ideas and no motivation.

As first-time hackers ourselves, we ran into this exact creative block ourselves and had no idea where to start in terms of ideas for our project. Sometimes, starting is the _hardest_ part. We believe if this barrier was removed, starting a project would feel far less daunting and developers would be encouraged to simply begin.

## What it does

HackSpark provides a platform for developers of any skill level to explore others' projects , share their own work, and  stay motivated. 

**Key features include:**
- Trending insights into popular projects and languages
- Leaderboards based on points earned by completing milestones
- Personalized project suggestions tailored to skills and interests
- Community support from developers facing the same challenges

When a user creates a project, they can input details such as preferred language(s), estimated timeline, and project purpose. HackSpark uses this information to generate a variety of project ideas tailored to the user. Once a project is selected, it's broken down into easily digestible milestones. Completing milestones will reward points, allowing users to climb the leaderboard among friends and the wider community.

Our goal is to lower the barrier for beginners to get started on projects and provide any developer with a community to collaborate with. 

## How we built it
 
We decided to build HackSpark as a modern Next.js web application, supported by a solid backend written in Golang. While our team’s expertise was spread across different platforms, we knew a web application would give us the flexibility and fast iteration time needed for a hackathon setting.

We started by designing everything from scratch and then layered in functionality piece by piece. What began as a simple concept quickly grew into:

- A responsive landing page
- A fully in-house authentication system
- Google Gemini queries powering project suggestions

This incremental, block-by-block approach helped us move from idea to working prototype in just 36 hours.

## Challenges we ran into

One of the biggest challenges was translating our idea into real, functioning technology. We had to learn and apply complex topics on the fly, including:

- State management in React/Next.js
- Designing multi-tenant architectures
- Building database schemas (and mastering tricky SQL JOINs)

Each of these pushed us beyond our comfort zone. The real challenge wasn’t just coding, it was constantly balancing what we envisioned with what was technically possible in the short timeframe.

## Accomplishments that we're proud of

What we are most proud of is the quality and maintainability of our code. Hackathons are not typically known for clean, well-organized codebases, but we set out to challenge that expectation. We wrote every line with purpose, following design patterns that made our system flexible and easy to understand. This focus allowed us to build features that were not only functional in the moment but could realistically be expanded on in the future. More than the product itself, we value the way our team approached debugging and iteration. 

## What we learned


Above all, we learned how to turn uncertainty into progress. At the start, none of us had a clear roadmap, just an idea and the determination to make it real. We discovered how important it is to break down a big, intimidating vision into smaller, achievable steps. Along the way, we gained hands-on experience with new technologies, frameworks, and design decisions that stretched us beyond our comfort zones. We also learned the value of resilience. When things broke,  we pushed through by asking questions, experimenting, and trusting each other’s problem-solving. The collaboration and shared excitement reminded us why hackathons exist in the first place.


## What's next for HackSpark

If HackSpark were to move beyond the hackathon, the first step would be a soft launch shared with friends and peers to gather feedback on usability and features. This early feedback could guide refinements and highlight what resonates most with users. From there, the platform would explore premium functionality, managed through Stripe integration, to support growth while offering advanced features. In this way, HackSpark could gradually evolve from a hackathon prototype into a community-driven platform shaped by the developers who use it.

