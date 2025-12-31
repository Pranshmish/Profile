import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter, Mail, ExternalLink } from 'lucide-react';

const ProfileCard = ({ member, index }) => {
    const socialIcons = {
        linkedin: Linkedin,
        github: Github,
        twitter: Twitter,
        email: Mail,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative"
        >
            {/* Card Container */}
            <div className="relative h-full rounded-2xl overflow-hidden glass transition-all duration-500 ease-out group-hover:shadow-card-hover group-hover:-translate-y-2">
                {/* Subtle Glow Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5"></div>
                </div>

                {/* Gold accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Card Content */}
                <div className="relative p-6 md:p-8 flex flex-col items-center text-center">
                    {/* Profile Image Container */}
                    <div className="relative mb-6">
                        {/* Outer Ring with Gradient */}
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-amber-400/30 via-amber-500/20 to-blue-500/30 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>

                        {/* Image Wrapper */}
                        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full p-0.5 bg-gradient-to-br from-amber-400/50 via-slate-400/30 to-blue-500/50">
                            <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 ring-2 ring-slate-700/50 group-hover:ring-amber-500/30 transition-all duration-500">
                                {member.image ? (
                                    <motion.img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 text-3xl font-bold text-amber-400/80 font-display">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status Indicator */}
                        <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-lg shadow-emerald-500/30"></div>
                    </div>

                    {/* Name */}
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-slate-100 mb-1 transition-colors duration-300 group-hover:text-white">
                        {member.name}
                    </h3>

                    {/* Role */}
                    <p className="text-sm md:text-base font-medium gradient-text-gold mb-3">
                        {member.role}
                    </p>

                    {/* Bio */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3 group-hover:text-slate-300 transition-colors duration-300">
                        {member.bio}
                    </p>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent mb-5"></div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        {Object.entries(member.socialLinks || {}).map(([platform, url]) => {
                            const Icon = socialIcons[platform];
                            if (!Icon) return null;

                            return (
                                <motion.a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative p-2.5 rounded-lg bg-slate-800/50 text-slate-400 hover:text-amber-400 hover:bg-slate-700/50 transition-all duration-300 group/icon"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={18} className="transition-transform duration-300 group-hover/icon:scale-110" />

                                    {/* Subtle glow on hover */}
                                    <div className="absolute inset-0 rounded-lg bg-amber-500/10 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* View Profile Link */}
                    <motion.button
                        className="mt-5 flex items-center gap-2 text-sm text-slate-500 hover:text-amber-400 transition-colors duration-300 group/link"
                        whileHover={{ x: 3 }}
                    >
                        <span>View Profile</span>
                        <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileCard;
