export const projectsData = [
    {
        id: 1,
        name: "Community Canvas",
        image: "/CommunityCanvas.png", // You can add actual project screenshots to public/projects/
        techStack: "React, Node.js, Express.js, MongoDB, Socket.io, JWT",
        description: "A modern full-stack community forum application that enables users to create posts, engage in discussions, and build connections. Features real-time messaging, user authentication, and content moderation.",
        keyFeatures: [
            "Real-time messaging with Socket.io",
            "User authentication and authorization",
            "Post creation with rich text editor",
            "Comment system with nested replies",
            "User profiles and activity tracking",
            "Content moderation tools"
        ],
        challenges: "Implementing real-time updates across multiple users while maintaining data consistency and handling user authentication securely.",
        improvements: "Planning to add push notifications, advanced search with filters, user reputation system, and mobile app version.",
        liveLink: "https://community-canvas1.web.app/", // Replace with actual live link
        githubLink: "https://github.com/HedaetShahriar/Community-Canvas-Client",
        status: "Completed",
        category: "Full Stack"
    },
    {
        id: 2,
        name: "Auction Gallery",
        image: "/AuctionGallery.png",
        techStack: "JavaScript, Firebase, Tailwind CSS, React, Firebase Auth",
        description: "An interactive online auction platform where users can bid on various items in real-time. Features automated bidding timers, user authentication, and secure transaction handling.",
        keyFeatures: [
            "Real-time bidding system",
            "Automated auction timers",
            "User authentication with Firebase",
            "Image gallery for auction items",
            "Bid history tracking",
            "Responsive design for all devices"
        ],
        challenges: "Managing real-time bidding logic with accurate timers, handling concurrent bids, and ensuring data consistency across multiple users.",
        improvements: "Integrating Stripe payment gateway, adding email notifications for bid updates, implementing auction categories, and admin dashboard.",
        liveLink: "https://assignment7-auction.netlify.app/", 
        githubLink: "https://github.com/HedaetShahriar/Auction-Gallery",
        status: "In Progress",
        category: "Frontend"
    },
    {
        id: 3,
        name: "PixelPost",
        image: "/PixelPost.png",
        techStack: "React, Node.js, Express.js, MongoDB, Cloudinary, JWT",
        description: "A modern social media platform for photographers and visual artists to share, discover, and engage with stunning photography. Features image optimization, social interactions, and community building tools.",
        keyFeatures: [
            "High-quality image upload and optimization",
            "User authentication and profiles",
            "Photo feed with infinite scroll",
            "Like, comment, and share functionality",
            "Follow/unfollow system",
            "Advanced search and filtering",
            "Responsive gallery layouts"
        ],
        challenges: "Implementing efficient image optimization and storage with Cloudinary, managing complex social interactions, and ensuring smooth performance with large image datasets.",
        improvements: "Adding photo editing tools, implementing stories feature, creating photography contests, and adding AI-powered photo categorization.",
        liveLink: "https://pixelpost-b51b0.web.app/",
        githubLink: "https://github.com/HedaetShahriar/PixelPost-Client",
        status: "Completed",
        category: "Full Stack"
    },
    {
        id: 4,
        name: "AppFlare",
        image: "/AppFlare.png",
        techStack: "React, Node.js, Express.js, MongoDB",
        description: "A comprehensive MERN stack application showcasing multiple modern web development features including user management, data visualization, and responsive design patterns.",
        keyFeatures: [
            "User authentication and authorization",
            "Dashboard with data visualization",
            "CRUD operations with REST API",
            "State management with Redux",
            "Responsive Material-UI components",
            "File upload and management"
        ],
        challenges: "Integrating multiple complex features into a cohesive application while maintaining code quality, performance optimization, and ensuring scalability.",
        improvements: "Refactoring codebase for better performance, adding comprehensive unit tests, implementing CI/CD pipeline, and adding real-time features.",
        liveLink: "https://appflare-24094.web.app/", // Replace with actual live link
        githubLink: "https://github.com/HedaetShahriar/AppFLare",
        status: "Completed",
        category: "Full Stack"
    }
];