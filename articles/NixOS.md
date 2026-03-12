---
title: 'Why I Use NixOS'
description: 'Predictable and easy to manage - NixOS.'
image: '/static/img/blog/nix.webp'
date: '2026-02-08'
---

# Why I Use Linux (and NixOS) for My Development Work

I spend a lot of my time building things: data pipelines for research, small tools, web apps, and experiments with AI and automation. Over the years I’ve tried a lot of development environments, but the setup that consistently makes my work easier is Linux—specifically NixOS.

The biggest reason is reproducibility. In many projects, especially research or collaborative development, the hardest part isn’t writing the code—it’s getting the environment to run the code. Different package versions, missing dependencies, or conflicting libraries can break things quickly. NixOS solves this by making the entire system and development environment declarative. Instead of manually installing tools and hoping everything works, I describe the environment in a configuration file, and Nix builds it exactly the same way every time.

One of the tools I use constantly is Nix dev-shells. A dev-shell lets me define a project-specific environment with all the tools it needs: Python, Node, Rust, databases, build tools, anything. When I enter the shell, everything is available and correctly versioned. When I leave, it disappears. This means each project stays isolated and clean, and I don’t end up with a global system cluttered with conflicting packages.

Nix’s package management is also different from traditional systems. Instead of overwriting packages during upgrades, Nix installs them into unique paths based on their exact configuration. This allows multiple versions of the same tool to coexist without conflicts. It also means rollbacks are easy—if something breaks, I can revert to a previous system state almost instantly.

Another advantage is easy and reliable builds. Because Nix records all dependencies explicitly, builds become much more predictable. If something works on my machine, I can share the configuration and someone else can reproduce the same environment without guesswork. For collaborative projects—like the research and data systems I help maintain—this is incredibly valuable.

Finally, NixOS is extremely configurable. Everything from system services to development tools can be defined in code. That means my system setup becomes version-controlled just like my projects. If I move to a new machine, rebuilding my environment is as simple as pulling my configuration and running a build.

There is definitely a learning curve. Nix isn’t the most familiar package manager at first, and the configuration language takes some getting used to. But once it clicks, it fundamentally changes how you think about development environments.

For me, NixOS turns system setup from a fragile manual process into something repeatable, shareable, and reliable—which lets me spend more time focusing on the actual work of building things.
