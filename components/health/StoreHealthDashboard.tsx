'use client';

import { useEffect, useState } from 'react';
import { StoreHealthScore } from '@/types';
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle, Award, Sparkles } from 'lucide-react';

interface StoreHealthDashboardProps {
    healthScore: StoreHealthScore;
}

export default function StoreHealthDashboard({ healthScore }: StoreHealthDashboardProps) {
    const { score, factorDetails } = healthScore;
    const [animatedScore, setAnimatedScore] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Animate score on mount
    useEffect(() => {
        setIsVisible(true);
        const duration = 1500;
        const steps = 60;
        const increment = score / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= score) {
                setAnimatedScore(score);
                clearInterval(timer);
            } else {
                setAnimatedScore(current);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [score]);

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'success';
        if (score >= 75) return 'orange';
        if (score >= 60) return 'warning';
        return 'danger';
    };

    const getScoreGrade = (score: number) => {
        if (score >= 95) return 'A+';
        if (score >= 90) return 'A';
        if (score >= 85) return 'A-';
        if (score >= 80) return 'B+';
        if (score >= 75) return 'B';
        if (score >= 70) return 'B-';
        if (score >= 65) return 'C+';
        if (score >= 60) return 'C';
        return 'D';
    };

    const scoreColor = getScoreColor(score);
    const grade = getScoreGrade(score);

    // Calculate stroke dasharray for circular progress
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    const colorConfig = {
        success: {
            stroke: '#10B981',
            strokeEnd: '#059669',
            text: 'text-emerald-600',
            bg: 'bg-emerald-50',
            gradeBg: 'bg-amber-50',
            gradeText: 'text-amber-700',
        },
        orange: {
            stroke: '#F59E0B',
            strokeEnd: '#D97706',
            text: 'text-orange-500',
            bg: 'bg-orange-50',
            gradeBg: 'bg-amber-50',
            gradeText: 'text-amber-700',
        },
        warning: {
            stroke: '#EAB308',
            strokeEnd: '#CA8A04',
            text: 'text-yellow-600',
            bg: 'bg-yellow-50',
            gradeBg: 'bg-amber-50',
            gradeText: 'text-amber-700',
        },
        danger: {
            stroke: '#EF4444',
            strokeEnd: '#DC2626',
            text: 'text-red-500',
            bg: 'bg-red-50',
            gradeBg: 'bg-red-50',
            gradeText: 'text-red-700',
        },
    };

    const colors = colorConfig[scoreColor];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Score Card - Centered Design */}
            <div className={`premium-card relative overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-100/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary-100/50 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />

                <div className="relative z-10 p-8 md:p-10 flex flex-col items-center">
                    {/* Circular Progress */}
                    <div className="relative mb-6">
                        {/* Outer Glow Effect */}
                        <div
                            className="absolute inset-0 rounded-full blur-xl opacity-30 transition-all duration-1000"
                            style={{ backgroundColor: colors.stroke }}
                        />

                        <svg className="w-52 h-52 md:w-56 md:h-56 transform -rotate-90 drop-shadow-lg" viewBox="0 0 200 200">
                            {/* Background Circle */}
                            <circle
                                cx="100"
                                cy="100"
                                r={radius}
                                fill="none"
                                stroke="#F3F4F6"
                                strokeWidth="14"
                            />

                            {/* Progress Circle with Gradient */}
                            <circle
                                cx="100"
                                cy="100"
                                r={radius}
                                fill="none"
                                stroke={`url(#scoreGradient-${scoreColor})`}
                                strokeWidth="14"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-1000 ease-out"
                                style={{
                                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                                }}
                            />

                            {/* Gradient Definition */}
                            <defs>
                                <linearGradient id={`scoreGradient-${scoreColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={colors.stroke} />
                                    <stop offset="100%" stopColor={colors.strokeEnd} />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Score Content (Centered Inside Circle) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-5xl md:text-6xl font-black ${colors.text} tracking-tight leading-none`}>
                                {animatedScore.toFixed(1)}
                            </span>
                            <span className="text-xl md:text-2xl font-bold text-gray-400 mt-1">
                                / 100
                            </span>
                            <div className={`mt-3 px-5 py-1.5 rounded-full ${colors.gradeBg} ${colors.gradeText} font-bold text-base shadow-sm`}>
                                {grade}
                            </div>
                        </div>
                    </div>

                    {/* Title with Icon */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-xl ${colors.bg}`}>
                            <Award className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                            Store Health Score
                        </h2>
                    </div>

                    {/* Status Message */}
                    <p className="text-gray-500 text-center text-base md:text-lg mb-6 max-w-xs">
                        {score >= 90 && "Excellent! Your store is performing exceptionally well."}
                        {score >= 75 && score < 90 && "Good performance! Keep up the great work."}
                        {score >= 60 && score < 75 && "Your store needs some attention to improve."}
                        {score < 60 && "Critical! Immediate action required to improve store health."}
                    </p>

                    {/* 5-Star Seller Badge */}
                    {score >= 85 && (
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
                            <button className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-purple-50 border-2 border-primary-200 rounded-full font-bold text-primary-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                <Award className="w-5 h-5 text-primary-600" />
                                <span>5-Star Seller</span>
                                <Sparkles className="w-4 h-4 text-primary-500 animate-pulse" />
                            </button>
                        </div>
                    )}

                    {/* Additional Status Badges */}
                    <div className="flex flex-wrap gap-3 justify-center mt-4">
                        {score >= 90 && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-semibold text-sm shadow-sm animate-fade-in">
                                <CheckCircle className="w-4 h-4" />
                                Top Performer
                            </div>
                        )}
                        {score < 70 && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold text-sm shadow-sm animate-fade-in">
                                <AlertCircle className="w-4 h-4" />
                                Needs Improvement
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Factor Breakdown */}
            <div className={`premium-card p-6 md:p-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-gradient-to-br from-primary-100 to-purple-100 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900">Performance Breakdown</h3>
                </div>

                <div className="space-y-4">
                    {Object.entries(factorDetails).map(([key, factor], index) => (
                        <FactorCard
                            key={key}
                            name={formatFactorName(key)}
                            factor={factor}
                            delay={index * 100}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface FactorCardProps {
    name: string;
    factor: any;
    delay?: number;
    isVisible?: boolean;
}

function FactorCard({ name, factor, delay = 0, isVisible = true }: FactorCardProps) {
    const getTrendIcon = () => {
        if (factor.trend === 'improving') return <TrendingUp className="w-4 h-4 text-emerald-500" />;
        if (factor.trend === 'declining') return <TrendingDown className="w-4 h-4 text-red-500" />;
        return <Minus className="w-4 h-4 text-gray-400" />;
    };

    const getBenchmarkConfig = () => {
        if (factor.benchmark === 'excellent') return { color: 'emerald', bg: 'bg-emerald-100', text: 'text-emerald-700', bar: 'from-emerald-400 to-emerald-600' };
        if (factor.benchmark === 'good') return { color: 'blue', bg: 'bg-blue-100', text: 'text-blue-700', bar: 'from-blue-400 to-blue-600' };
        if (factor.benchmark === 'average') return { color: 'amber', bg: 'bg-amber-100', text: 'text-amber-700', bar: 'from-amber-400 to-amber-600' };
        return { color: 'red', bg: 'bg-red-100', text: 'text-red-700', bar: 'from-red-400 to-red-600' };
    };

    const config = getBenchmarkConfig();
    const progressPercent = (factor.contribution / factor.weightage) * 100;

    return (
        <div
            className={`p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 group ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{name}</h4>
                        {getTrendIcon()}
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                        Weightage: {factor.weightage}% • Contribution: {factor.contribution.toFixed(2)}
                    </p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${config.bg} ${config.text}`}>
                    {factor.benchmark}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-500 font-medium">Current: {factor.value.toFixed(1)}%</span>
                    <span className="font-bold text-gray-700">
                        {factor.contribution.toFixed(1)} / {factor.weightage} pts
                    </span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div
                        className={`h-full bg-gradient-to-r ${config.bar} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                        style={{ width: `${progressPercent}%` }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>
                </div>
            </div>

            {/* Tip */}
            {factor.tip && (
                <div className="flex items-start gap-2 text-xs text-gray-600 bg-gradient-to-r from-primary-50/50 to-purple-50/50 p-3 rounded-lg border border-primary-100/50">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-500" />
                    <span className="leading-relaxed">{factor.tip}</span>
                </div>
            )}
        </div>
    );
}

function formatFactorName(key: string): string {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
}
