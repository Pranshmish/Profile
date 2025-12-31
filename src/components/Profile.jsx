import { Linkedin, Github, Twitter, Mail, MapPin, Briefcase, ExternalLink, Sparkles } from 'lucide-react';

// ============================================
// TEAM MEMBERS DATA - Easy to swap details
// ============================================
const TEAM_MEMBERS = [
    {
        id: 1,
        name: "Alexander Bennett",
        role: "CEO & Founder",
        image: null,
        bio: "Visionary leader with 15+ years of experience in technology and business strategy. Passionate about innovation and building world-class teams.",
        location: "San Francisco, CA",
        socialLinks: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            twitter: "https://twitter.com",
            email: "mailto:alex@company.com"
        }
    },
    {
        id: 2,
        name: "Sarah Williams",
        role: "Chief Technology Officer",
        image: null,
        bio: "Full-stack architect specializing in scalable systems and cloud infrastructure. Led engineering teams at Fortune 500 companies.",
        location: "New York, NY",
        socialLinks: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            twitter: "https://twitter.com",
            email: "mailto:sarah@company.com"
        }
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Head of Design",
        image: null,
        bio: "Award-winning designer with a keen eye for user experience. Creates beautiful, intuitive interfaces that users love.",
        location: "Los Angeles, CA",
        socialLinks: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            twitter: "https://twitter.com",
            email: "mailto:michael@company.com"
        }
    },
    {
        id: 4,
        name: "Emily Rodriguez",
        role: "VP of Operations",
        image: null,
        bio: "Operations expert who streamlines processes and drives efficiency. MBA from Harvard with a track record of scaling startups.",
        location: "Austin, TX",
        socialLinks: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            twitter: "https://twitter.com",
            email: "mailto:emily@company.com"
        }
    },
    {
        id: 5,
        name: "David Park",
        role: "Chief Marketing Officer",
        image: null,
        bio: "Strategic marketing leader with expertise in brand building and digital growth. Previously led marketing at top tech unicorns.",
        location: "Seattle, WA",
        socialLinks: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            twitter: "https://twitter.com",
            email: "mailto:david@company.com"
        }
    }
];

// ============================================
// PROFILE CARD COMPONENT
// ============================================
const ProfileCard = ({ member, index }) => {
    const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

    const socialIcons = {
        linkedin: Linkedin,
        github: Github,
        twitter: Twitter,
        email: Mail
    };

    return (
        <div
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
            }}
        >
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-slate-500"></div>

            {/* Card Content */}
            <div className="p-8 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-6">
                    {/* Glow Ring on Hover */}
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-cyan-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                    {/* Avatar Container */}
                    <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-br from-cyan-500 via-teal-500 to-slate-600 shadow-lg group-hover:shadow-cyan-500/25 transition-shadow duration-500">
                        <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center overflow-hidden">
                            {member.image ? (
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            ) : (
                                <span className="text-2xl font-bold bg-gradient-to-br from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                                    {getInitials(member.name)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Status Dot */}
                    <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg shadow-emerald-500/30"></div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors duration-300">
                    {member.name}
                </h3>

                {/* Role */}
                <p className="text-cyan-600 font-semibold text-sm mb-4">
                    {member.role}
                </p>

                {/* Bio */}
                <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
                    {member.bio}
                </p>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-6">
                    <MapPin size={14} className="text-teal-500" />
                    <span>{member.location}</span>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6"></div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                    {Object.entries(member.socialLinks).map(([platform, url]) => {
                        const Icon = socialIcons[platform];
                        if (!Icon) return null;

                        return (
                            <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 border border-slate-100 hover:border-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <Icon size={18} />
                            </a>
                        );
                    })}
                </div>

                {/* View Profile Button */}
                <button className="mt-6 flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-600 transition-colors duration-300 group/btn">
                    <span>View Full Profile</span>
                    <ExternalLink size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </button>
            </div>
        </div>
    );
};

// ============================================
// MAIN TEAM PORTFOLIO COMPONENT
// ============================================
const Profile = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Subtle Gradient Orbs */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-slate-100/50 rounded-full blur-3xl"></div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.3) 1px, transparent 0)`,
                        backgroundSize: '32px 32px'
                    }}
                ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {/* Header Section */}
                <div className="text-center mb-16 md:mb-20">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-sm font-medium mb-6 shadow-sm">
                        <Sparkles size={16} className="text-cyan-500" />
                        <span>Our Leadership Team</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight tracking-tight">
                        Meet the <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-slate-700 bg-clip-text text-transparent">Visionaries</span>
                        <br />Behind Our Success
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        A team of passionate experts dedicated to innovation, excellence, and delivering exceptional results for our clients worldwide.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
                    {TEAM_MEMBERS.map((member, index) => (
                        <ProfileCard key={member.id} member={member} index={index} />
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <div className="mt-20 text-center">
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 max-w-3xl mx-auto relative overflow-hidden">
                        {/* Background Accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-slate-500"></div>

                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Briefcase className="text-cyan-500" size={24} />
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                            Want to Join Our Team?
                        </h2>
                        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                            We're always looking for talented individuals who share our passion for excellence and innovation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300">
                                View Open Positions
                            </button>
                            <button className="px-8 py-4 bg-slate-50 border border-slate-200 hover:border-cyan-300 rounded-xl font-semibold text-slate-700 hover:text-cyan-700 hover:bg-cyan-50 transition-all duration-300">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-20 text-center">
                    <p className="text-slate-400 text-sm">
                        © {new Date().getFullYear()} Company Name. All rights reserved.
                    </p>
                </footer>
            </div>

            {/* CSS Keyframes */}
            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default Profile;
