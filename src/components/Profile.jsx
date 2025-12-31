import { Linkedin, Github, Twitter, Mail, MapPin, Briefcase, ExternalLink } from 'lucide-react';

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
            className="group relative bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10"
            style={{ animationDelay: `${index * 150}ms` }}
        >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>

            {/* Card Content */}
            <div className="p-8 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-6">
                    {/* Glow Ring */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>

                    {/* Avatar Container */}
                    <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow duration-500">
                        <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                            {member.image ? (
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            ) : (
                                <span className="text-3xl font-bold text-amber-400">
                                    {getInitials(member.name)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Status Dot */}
                    <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-3 border-slate-900 shadow-lg shadow-emerald-500/50"></div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-50 transition-colors duration-300">
                    {member.name}
                </h3>

                {/* Role */}
                <p className="text-amber-400 font-medium text-sm mb-4">
                    {member.role}
                </p>

                {/* Bio */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
                    {member.bio}
                </p>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-6">
                    <MapPin size={14} className="text-amber-500/70" />
                    <span>{member.location}</span>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>

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
                                className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-amber-400 hover:bg-slate-700 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                <Icon size={18} />
                            </a>
                        );
                    })}
                </div>

                {/* View Profile Button */}
                <button className="mt-6 flex items-center gap-2 text-sm text-slate-500 hover:text-amber-400 transition-colors duration-300 group/btn">
                    <span>View Full Profile</span>
                    <ExternalLink size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </button>
            </div>
        </div>
    );
};

// ============================================
// MAIN TEAM GRID COMPONENT
// ============================================
const Profile = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl"></div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {/* Header Section */}
                <div className="text-center mb-16 md:mb-20">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                        <Briefcase size={16} />
                        <span>Our Leadership Team</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">Visionaries</span>
                        <br />Behind Our Success
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        A team of passionate experts dedicated to innovation, excellence, and delivering exceptional results for our clients worldwide.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {TEAM_MEMBERS.map((member, index) => (
                        <ProfileCard key={member.id} member={member} index={index} />
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <div className="mt-20 text-center">
                    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-8 md:p-12 max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Want to Join Our Team?
                        </h2>
                        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                            We're always looking for talented individuals who share our passion for excellence and innovation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl font-semibold text-slate-900 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-300">
                                View Open Positions
                            </button>
                            <button className="px-8 py-4 bg-slate-800 border border-slate-700 hover:border-amber-500/30 rounded-xl font-semibold text-white hover:bg-slate-700 transition-all duration-300">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-20 text-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Company Name. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Profile;
