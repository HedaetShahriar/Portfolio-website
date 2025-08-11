# Md. Hedaet Shahriar Himon - Portfolio Website

A modern, responsive portfolio website built with Next.js, showcasing professional experience, projects, and skills. Features a complete Content Management System (CMS) for easy content updates and an intuitive admin dashboard.

<!-- ![Portfolio Banner](public/profile.jpg) -->

## 🌟 Features

### Public Portfolio
- **Modern Design**: Clean, professional, and responsive design optimized for all devices
- **Interactive Sections**: Hero, About, Skills, Education, Experience, Projects, and Contact
- **Smooth Animations**: Enhanced user experience with scroll-reveal animations
- **Project Showcase**: Detailed project presentations with modals and descriptions
- **Contact Form**: Functional contact section for inquiries
- **SEO Optimized**: Meta tags and OpenGraph implementation for better search visibility

### Admin Dashboard
- **Secure Authentication**: NextAuth.js integration for secure admin access
- **Content Management**: Full CRUD operations for all portfolio sections
- **Blog Management**: Create, edit, and delete blog posts with rich content
- **Project Management**: Add and update project information and media
- **Skills & Education**: Manage technical skills and educational background
- **Experience Tracking**: Update professional experience and roles
- **Profile Settings**: Update personal information and contact details

### Technical Features
- **Server-Side Rendering**: Fast loading with Next.js 15+ App Router
- **API Routes**: RESTful API endpoints for data management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Image optimization and efficient bundling
- **Dark/Light Theme**: Elegant theme switching capability
- **Middleware Protection**: Route protection for admin areas

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 15.4.6](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: Custom React components
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: CSS animations and transitions

### Backend & Database
- **API**: Next.js API Routes
- **Authentication**: [NextAuth.js 4.24.11](https://next-auth.js.org/)
- **Data Storage**: File-based data management (easily extensible to databases)

### Development Tools
- **Package Manager**: PNPM
- **Bundler**: Turbopack (Next.js)
- **Linting**: ESLint with Next.js configuration
- **Build Tool**: Next.js build system

## 📁 Project Structure

```
hedaetshahriar/
├── public/                    # Static assets
│   ├── profile.jpg           # Profile image
│   └── *.svg                 # Icons and graphics
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── admin/           # Admin dashboard pages
│   │   │   ├── dashboard/   # Main admin dashboard
│   │   │   ├── blogs/       # Blog management
│   │   │   ├── projects/    # Project management
│   │   │   ├── skills/      # Skills management
│   │   │   ├── education/   # Education management
│   │   │   ├── experience/  # Experience management
│   │   │   └── profile/     # Profile settings
│   │   ├── api/             # API routes
│   │   │   ├── auth/        # Authentication
│   │   │   ├── blogs/       # Blog API
│   │   │   ├── projects/    # Projects API
│   │   │   ├── skills/      # Skills API
│   │   │   ├── education/   # Education API
│   │   │   ├── experience/  # Experience API
│   │   │   └── profile/     # Profile API
│   │   ├── login/           # Login page
│   │   ├── globals.css      # Global styles
│   │   ├── layout.js        # Root layout
│   │   └── page.js          # Homepage
│   ├── components/          # React components
│   │   ├── admin/           # Admin-specific components
│   │   └── *.jsx            # Public portfolio components
│   ├── data/                # Data files
│   │   ├── profile.js       # Profile data
│   │   ├── skills.js        # Skills data
│   │   ├── projects.js      # Projects data
│   │   ├── education.js     # Education data
│   │   ├── experience.js    # Experience data
│   │   └── blogs.js         # Blog posts data
│   └── hooks/               # Custom React hooks
│       └── useScrollReveal.js
├── middleware.js            # NextAuth middleware
├── next.config.mjs          # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── package.json             # Dependencies
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- PNPM (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HedaetShahriar/hedaetshahriar.git
   cd hedaetshahriar
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   # Add other required environment variables
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application**
   - **Portfolio**: [http://localhost:3000](http://localhost:3000)
   - **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
   - **Login**: [http://localhost:3000/login](http://localhost:3000/login)

## 📱 Usage

### For Visitors
- Browse through different sections using the navigation menu
- View detailed project information by clicking on project cards
- Use the contact form to get in touch
- Download CV/Resume from the profile section

### For Admin
1. **Login**: Navigate to `/login` and authenticate
2. **Dashboard**: Access the admin dashboard at `/admin`
3. **Content Management**: 
   - Update profile information
   - Add/edit projects, skills, education, and experience
   - Create and manage blog posts
   - View analytics and quick stats

### Content Management
The admin panel allows you to:
- ✅ Add new projects with images and descriptions
- ✅ Update skills and proficiency levels
- ✅ Manage educational background
- ✅ Track professional experience
- ✅ Write and publish blog posts
- ✅ Update profile information and contact details

## 🔧 Configuration

### Customization
1. **Profile Data**: Update `src/data/profile.js` with your information
2. **Styling**: Modify Tailwind CSS classes in components
3. **Components**: Customize React components in `src/components/`
4. **Theme**: Adjust colors and styling in `tailwind.config.js`

### Adding New Sections
1. Create data file in `src/data/`
2. Create API route in `src/app/api/`
3. Add admin management page in `src/app/admin/`
4. Create public component in `src/components/`

## 🌐 API Endpoints

### Public Endpoints
- `GET /api/profile` - Get profile information
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get skills data
- `GET /api/education` - Get education information
- `GET /api/experience` - Get work experience
- `GET /api/blogs` - Get blog posts

### Protected Admin Endpoints
- `POST /api/projects` - Create new project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- Similar CRUD operations for other sections

## 📦 Build & Deployment

### Production Build
```bash
pnpm build
pnpm start
```

### Deploy on Vercel
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/hedaetshahriar)

### Other Deployment Options
- **Netlify**: Configure build command and environment
- **Railway**: Direct GitHub integration
- **Digital Ocean**: App Platform deployment
- **AWS**: Amplify or EC2 deployment

## 🧪 Development

### Available Scripts
```bash
pnpm dev          # Development server with Turbopack
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Code Quality
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (configure as needed)
- **Husky**: Git hooks (optional setup)

## 🎨 Features in Detail

### Responsive Design
- Mobile-first approach
- Optimized for tablets and desktops
- Touch-friendly interface elements
- Cross-browser compatibility

### Performance
- Server-side rendering for faster initial loads
- Image optimization with Next.js Image component
- Code splitting for optimal bundle sizes
- Lazy loading for improved performance

### SEO & Analytics
- Meta tags and OpenGraph implementation
- Structured data markup
- Sitemap generation
- Analytics integration ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Md. Hedaet Shahriar Himon**
- Portfolio: [https://hedaetshahriar.com](https://hedaetshahriar.com)
- GitHub: [@HedaetShahriar](https://github.com/HedaetShahriar)
- LinkedIn: [Hedaet Shahriar](https://linkedin.com/in/hedaet-shahriar)
- Email: shahriahedaet@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Vercel](https://vercel.com/) for hosting platform

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact via email: shahriahedaet@gmail.com
- Connect on LinkedIn for professional inquiries

---

**⭐ Star this repository if you found it helpful!**
