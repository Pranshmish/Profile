import { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Linkedin, Twitter, Mail, MapPin, Briefcase,
    Users, X, Award, FolderOpen, ChevronRight, ChevronLeft,
    Sun, Moon, Sparkles
} from 'lucide-react';

// Import team data
import teamDataRaw from '../data/teamData.json';
const TEAM_MEMBERS = teamDataRaw;

// ============================================
// ANIMATED BACKGROUND SVG COMPONENT
// ============================================
const AnimatedBackground = ({ isDark }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
            className={`absolute w-96 h-96 rounded-full blur-3xl will-change-transform ${isDark ? 'bg-cyan-500/10' : 'bg-teal-200/40'}`}
            animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ top: '10%', left: '10%', transform: 'translateZ(0)' }}
        />
        <motion.div
            className={`absolute w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-teal-500/10' : 'bg-cyan-200/30'}`}
            animate={{
                x: [0, -80, 0],
                y: [0, 80, 0],
                scale: [1, 0.8, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ top: '50%', right: '10%' }}
        />

        {/* Animated Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path
                        d="M 60 0 L 0 0 0 60"
                        fill="none"
                        stroke={isDark ? "#0891b2" : "#14b8a6"}
                        strokeWidth="0.5"
                        strokeOpacity="0.3"
                    />
                </pattern>
                <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="50%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <mask id="fadeMask">
                    <rect width="100%" height="100%" fill="url(#fadeGradient)" />
                </mask>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fadeMask)" />
        </svg>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-teal-400'}`}
                initial={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                    opacity: 0
                }}
                animate={{
                    y: [null, -500],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "linear"
                }}
            />
        ))}
    </div>
);

// ============================================
// THEME TOGGLE
// ============================================
const ThemeToggle = ({ isDark, onToggle }) => (
    <motion.button
        onClick={onToggle}
        className={`relative p-3 rounded-full backdrop-blur-xl transition-all duration-500 ${isDark
            ? 'bg-slate-800/80 border border-cyan-500/30 shadow-lg shadow-cyan-500/20'
            : 'bg-white/80 border border-teal-200 shadow-lg shadow-teal-500/10'
            }`}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
    >
        <AnimatePresence mode="wait">
            {isDark ? (
                <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0, scale: 0 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Moon size={20} className="text-cyan-400" />
                </motion.div>
            ) : (
                <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0, scale: 0 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Sun size={20} className="text-amber-500" />
                </motion.div>
            )}
        </AnimatePresence>
    </motion.button>
);

// ============================================
// 3D CAROUSEL CARD
// ============================================
const CarouselCardBase = ({ member, index, totalCards, currentIndex, onClick, onSelect, isDark }) => {
    const getInitials = (name) => name.split(' ').map(n => n[0]).join('');
    const socialIcons = { linkedin: Linkedin, twitter: Twitter, email: Mail };

    // Calculate position in carousel
    const offset = index - currentIndex;
    const absOffset = Math.abs(offset);
    const isActive = offset === 0;

    // 3D transform values
    const rotateY = offset * 35;
    const translateZ = isActive ? 0 : -150;
    const translateX = offset * 260;
    const scale = isActive ? 1 : 0.85;
    const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.25;
    const zIndex = totalCards - absOffset;

    const handleClick = () => {
        if (isActive) {
            onClick(); // Open modal
        } else {
            onSelect(index); // Select this card
        }
    };

    return (
        <motion.div
            className="absolute left-1/2 top-0 cursor-pointer will-change-transform"
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                backfaceVisibility: 'hidden',
            }}
            animate={{
                x: translateX - 140,
                z: translateZ,
                rotateY: rotateY,
                scale: scale,
                opacity: opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.8
            }}
            onClick={handleClick}
            whileHover={isActive ? { scale: 1.05, y: -8 } : { scale: 0.9 }}
        >
            <div
                className={`w-80 rounded-2xl overflow-hidden backdrop-blur-${isActive ? 'xl' : 'md'} transition-all duration-500 will-change-transform ${isDark
                    ? `bg-slate-900/90 border ${isActive ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/30' : 'border-slate-700/50 shadow-xl shadow-black/30'}`
                    : `bg-white/90 border ${isActive ? 'border-teal-300 shadow-2xl shadow-teal-500/20' : 'border-gray-200 shadow-xl'}`
                    }`}
                style={{ zIndex, transform: 'translateZ(0)' }}
            >
                {/* Glass Shine Effect */}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-cyan-400/10 via-transparent to-teal-400/10' : 'bg-gradient-to-br from-white/60 via-transparent to-teal-50/30'}`}
                        />
                        <motion.div
                            className={`absolute -inset-full skew-x-12 ${isDark ? 'bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent' : 'bg-gradient-to-r from-transparent via-white/80 to-transparent'}`}
                            animate={{ x: ['0%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        />
                    </motion.div>
                )}

                {/* Top Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${isDark ? 'from-cyan-400 via-teal-500 to-cyan-600' : 'from-teal-400 via-cyan-500 to-teal-600'}`} />

                {/* Content */}
                <div className="relative p-6 flex flex-col items-center text-center">
                    {/* Avatar with rotating ring */}
                    <div className="relative mb-5">
                        {isActive && (
                            <motion.div
                                className={`absolute -inset-2 rounded-full border-2 border-dashed will-change-transform ${isDark ? 'border-cyan-500/50' : 'border-teal-400/50'}`}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                        )}
                        <div className={`w-28 h-28 rounded-full p-[3px] bg-gradient-to-br ${isDark ? 'from-cyan-400 to-teal-500' : 'from-teal-400 to-cyan-500'}`}>
                            <div className={`w-full h-full rounded-full flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <span className={`text-2xl font-bold ${isDark ? 'text-cyan-400' : 'text-teal-600'}`}>
                                        {getInitials(member.name)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 ${isDark ? 'bg-cyan-500 border-slate-900' : 'bg-teal-500 border-white'}`} />
                    </div>

                    {/* Name */}
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {member.name}
                    </h3>

                    {/* Role */}
                    <p className={`font-medium text-sm mb-3 ${isDark ? 'text-cyan-400' : 'text-teal-600'}`}>
                        {member.role}
                    </p>

                    {/* Bio */}
                    <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        {member.bio}
                    </p>

                    {/* Location */}
                    <div className={`flex items-center gap-1.5 text-sm mb-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                        <MapPin size={14} className={isDark ? 'text-cyan-500' : 'text-teal-500'} />
                        <span>{member.location}</span>
                    </div>

                    {/* Divider */}
                    <div className={`w-full h-px mb-4 ${isDark ? 'bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent' : 'bg-gradient-to-r from-transparent via-teal-300 to-transparent'}`} />

                    {/* Social Links */}
                    <div className="flex items-center gap-2 mb-3">
                        {Object.entries(member.socialLinks).map(([platform, url]) => {
                            const Icon = socialIcons[platform];
                            if (!Icon || url === '#') return null;
                            return (
                                <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isDark
                                        ? 'border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10'
                                        : 'border-gray-200 text-gray-400 hover:text-teal-600 hover:border-teal-300 hover:bg-teal-50'
                                        }`}
                                >
                                    <Icon size={14} />
                                </a>
                            );
                        })}
                    </div>

                    {/* View Profile */}
                    {isActive && (
                        <motion.div
                            className={`flex items-center gap-1 text-sm font-medium ${isDark ? 'text-cyan-400' : 'text-teal-600'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span>View Profile</span>
                            <ChevronRight size={14} />
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const CarouselCard = memo(CarouselCardBase);

// ============================================
// PROFILE MODAL
// ============================================
const ProfileModal = ({ member, onClose, isDark }) => {
    const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 z-50 ${isDark ? 'bg-black/80' : 'bg-slate-900/50'} backdrop-blur-md`}
                onClick={onClose}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`relative rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden pointer-events-auto backdrop-blur-xl ${isDark
                        ? 'bg-slate-900/95 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20'
                        : 'bg-white/95 border border-teal-200 shadow-2xl'
                        }`}
                    style={{ perspective: '1000px' }}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="modalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <circle cx="20" cy="20" r="1" fill={isDark ? "#06b6d4" : "#14b8a6"} />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#modalGrid)" />
                        </svg>
                    </div>

                    {/* Close Button */}
                    <motion.button
                        onClick={onClose}
                        className={`absolute top-4 right-4 p-2 rounded-full z-10 ${isDark ? 'bg-slate-800 text-cyan-400 hover:bg-cyan-500/20' : 'bg-gray-100 text-teal-600 hover:bg-teal-100'
                            }`}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X size={20} />
                    </motion.button>

                    <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                        {/* Left Column */}
                        <div className={`lg:w-1/3 p-8 flex flex-col items-center text-center border-b lg:border-b-0 lg:border-r ${isDark ? 'bg-slate-800/30 border-slate-700/50' : 'bg-gradient-to-b from-teal-50 to-white border-gray-100'
                            }`}>
                            {/* Animated Avatar */}
                            <motion.div
                                className="relative mb-6"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", delay: 0.2 }}
                            >
                                <motion.div
                                    className={`absolute -inset-4 rounded-full border-2 border-dashed ${isDark ? 'border-cyan-500/30' : 'border-teal-300'}`}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                />
                                <div className={`w-36 h-36 rounded-full p-1 bg-gradient-to-br ${isDark ? 'from-cyan-400 to-teal-500' : 'from-teal-400 to-cyan-500'}`}>
                                    <div className={`w-full h-full rounded-full flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <span className={`text-4xl font-bold ${isDark ? 'text-cyan-400' : 'text-teal-600'}`}>
                                                {getInitials(member.name)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.h2
                                className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {member.name}
                            </motion.h2>

                            <motion.p
                                className={`font-medium mb-2 ${isDark ? 'text-cyan-400' : 'text-teal-600'}`}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.35 }}
                            >
                                {member.role}
                            </motion.p>

                            {member.tagline && (
                                <motion.p
                                    className={`text-sm italic mb-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    "{member.tagline}"
                                </motion.p>
                            )}

                            <motion.div
                                className={`flex items-center gap-1.5 text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.45 }}
                            >
                                <MapPin size={14} className={isDark ? 'text-cyan-500' : 'text-teal-500'} />
                                <span>{member.location}</span>
                            </motion.div>

                            {member.contactEmail && (
                                <motion.a
                                    href={`mailto:${member.contactEmail}`}
                                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${isDark ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-900' : 'bg-teal-600 hover:bg-teal-700 text-white'
                                        }`}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Mail size={18} />
                                    Contact
                                </motion.a>
                            )}

                            <motion.div
                                className="flex items-center gap-3 mt-6"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.55 }}
                            >
                                {Object.entries(member.socialLinks).map(([platform, url]) => {
                                    const icons = { linkedin: Linkedin, twitter: Twitter };
                                    const Icon = icons[platform];
                                    if (!Icon || url === '#') return null;
                                    return (
                                        <motion.a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-slate-600 text-slate-400 hover:text-cyan-400 hover:border-cyan-500' : 'border-gray-200 text-gray-400 hover:text-teal-600 hover:border-teal-300'
                                                }`}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                        >
                                            <Icon size={18} />
                                        </motion.a>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* Right Column */}
                        <div className={`lg:w-2/3 p-8 overflow-y-auto ${isDark ? 'text-slate-300' : ''}`}>
                            {/* About */}
                            <motion.div
                                className="mb-8"
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    <Users size={18} className={isDark ? 'text-cyan-500' : 'text-teal-500'} />
                                    About
                                </h3>
                                <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{member.fullBio}</p>
                            </motion.div>

                            {/* Skills */}
                            {member.skills && member.skills.length > 0 && member.skills[0] !== "To Be Announced" && (
                                <motion.div
                                    className="mb-8"
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        <Award size={18} className={isDark ? 'text-cyan-500' : 'text-teal-500'} />
                                        Skills & Expertise
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {member.skills.map((skill, i) => (
                                            <motion.span
                                                key={i}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium ${isDark ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-teal-50 text-teal-700 border border-teal-200'
                                                    }`}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.5 + i * 0.05 }}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Experience */}
                            {member.experience && member.experience.length > 0 && (
                                <motion.div
                                    className="mb-8"
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.45 }}
                                >
                                    <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        <Briefcase size={18} className={isDark ? 'text-cyan-500' : 'text-teal-500'} />
                                        Work Experience
                                    </h3>
                                    <div className="space-y-4">
                                        {member.experience.map((exp, i) => (
                                            <div key={i} className="mb-4">
                                                <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{exp.role}</h4>
                                                <p className={`text-sm font-medium mb-1 ${isDark ? 'text-cyan-400' : 'text-teal-600'}`}>{exp.company}</p>
                                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{exp.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Projects */}
                            {member.projects && member.projects.length > 0 && member.projects[0].title !== "Coming Soon" && (
                                <motion.div
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        <FolderOpen size={18} className={isDark ? 'text-cyan-500' : 'text-teal-500'} />
                                        Key Projects
                                    </h3>
                                    <div className="space-y-3">
                                        {member.projects.map((project, i) => (
                                            <motion.div
                                                key={i}
                                                className={`flex gap-3 p-4 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-gray-50 border border-gray-100'}`}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.6 + i * 0.1 }}
                                            >
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-teal-100 text-teal-600'
                                                    }`}>
                                                    <Briefcase size={18} />
                                                </div>
                                                <div>
                                                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{project.title}</h4>
                                                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{project.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================
const Profile = () => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [isDark, setIsDark] = useState(true); // Dark theme by default
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCard = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
    }, []);

    const prevCard = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
    }, []);

    const handleSelectMember = useCallback((member) => {
        setSelectedMember(member);
    }, []);

    const handleSetIndex = useCallback((idx) => {
        setCurrentIndex(idx);
    }, []);

    // Auto-rotate carousel (slower interval)
    useEffect(() => {
        const interval = setInterval(nextCard, 8000);
        return () => clearInterval(interval);
    }, [nextCard]);

    return (
        <div className={`min-h-screen relative transition-colors duration-700 ${isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-cyan-50 via-white to-teal-50'}`}>
            {/* Animated Background */}
            <AnimatedBackground isDark={isDark} />

            {/* Theme Toggle */}
            <div className="fixed top-4 right-4 z-40">
                <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            </div>

            {/* Header */}
            <div className="relative pt-20 pb-10 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400' : 'bg-teal-100 text-teal-700 border border-teal-200'
                            }`}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <Sparkles size={16} />
                        <span>Our Amazing Team</span>
                    </motion.div>

                    <motion.h1
                        className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        Meet the{' '}
                        <span className={`bg-gradient-to-r ${isDark ? 'from-cyan-400 to-teal-400' : 'from-teal-500 to-cyan-500'} bg-clip-text text-transparent`}>
                            Visionaries
                        </span>
                    </motion.h1>

                    <motion.p
                        className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-gray-600'}`}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Passionate innovators building the future of technology
                    </motion.p>
                </div>
            </div>

            {/* 3D Carousel Section */}
            <div className="relative py-16">
                {/* Carousel Navigation */}
                <div className="absolute inset-y-0 left-2 md:left-8 flex items-center z-20">
                    <motion.button
                        onClick={prevCard}
                        className={`p-4 md:p-5 rounded-full backdrop-blur-xl ${isDark ? 'bg-slate-800/90 text-cyan-400 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20' : 'bg-white/90 text-teal-600 border-2 border-teal-300 shadow-lg'
                            }`}
                        whileHover={{ scale: 1.15, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronLeft size={28} strokeWidth={2.5} />
                    </motion.button>
                </div>
                <div className="absolute inset-y-0 right-2 md:right-8 flex items-center z-20">
                    <motion.button
                        onClick={nextCard}
                        className={`p-4 md:p-5 rounded-full backdrop-blur-xl ${isDark ? 'bg-slate-800/90 text-cyan-400 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20' : 'bg-white/90 text-teal-600 border-2 border-teal-300 shadow-lg'
                            }`}
                        whileHover={{ scale: 1.15, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronRight size={28} strokeWidth={2.5} />
                    </motion.button>
                </div>

                {/* Cards Container */}
                <div className="relative h-[550px] flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
                    {TEAM_MEMBERS.map((member, index) => (
                        <CarouselCard
                            key={member.id}
                            member={member}
                            index={index}
                            totalCards={TEAM_MEMBERS.length}
                            currentIndex={currentIndex}
                            isDark={isDark}
                            onClick={() => handleSelectMember(member)}
                            onSelect={handleSetIndex}
                        />
                    ))}
                </div>

                {/* Carousel Dots */}
                <div className="flex justify-center items-center gap-3 mt-8">
                    {TEAM_MEMBERS.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? isDark ? 'bg-cyan-400 w-10 shadow-lg shadow-cyan-400/50' : 'bg-teal-500 w-10 shadow-lg shadow-teal-400/50'
                                : isDark ? 'bg-slate-700 w-3 hover:bg-slate-600' : 'bg-gray-300 w-3 hover:bg-gray-400'
                                }`}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </div>
                {/* Keyboard hint */}
                <p className={`text-center mt-4 text-xs ${isDark ? 'text-slate-600' : 'text-gray-400'}`}>
                    Click cards to select • Use arrows to navigate
                </p>
            </div>

            {/* CTA Section */}
            <div className={`relative py-20 px-4 ${isDark ? 'bg-slate-900/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <motion.div
                    className="max-w-2xl mx-auto text-center"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className={`p-10 rounded-3xl backdrop-blur-xl ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white/80 border border-gray-100 shadow-xl'
                        }`}>
                        <Briefcase className={`mx-auto mb-4 ${isDark ? 'text-cyan-400' : 'text-teal-500'}`} size={40} />
                        <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Join Our Team
                        </h2>
                        <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                            We're always looking for talented individuals passionate about innovation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <motion.button
                                className={`px-8 py-3 rounded-xl font-semibold ${isDark ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-900' : 'bg-teal-600 hover:bg-teal-700 text-white'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Positions
                            </motion.button>
                            <motion.button
                                className={`px-8 py-3 rounded-xl font-semibold border ${isDark ? 'border-slate-600 text-slate-300 hover:border-cyan-500' : 'border-gray-200 text-gray-700 hover:border-teal-300'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Us
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className={`relative py-8 text-center border-t ${isDark ? 'border-slate-800 text-slate-500' : 'border-gray-100 text-gray-400'}`}>
                <p className="text-sm">© {new Date().getFullYear()} AI Spark. All rights reserved.</p>
            </footer>

            {/* Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <ProfileModal
                        member={selectedMember}
                        onClose={() => setSelectedMember(null)}
                        isDark={isDark}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
