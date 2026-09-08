import React from 'react';

const COLORS = {
    left: '#8168F0',
    mid: '#D4C8FE',
    right: '#B296FE',
};

export default function FlowingLines({ className = '', opacity = 0.5 }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
            <style>{`
                @keyframes dashFlow {
                    from { stroke-dashoffset: 2000; }
                    to   { stroke-dashoffset: 0;    }
                }
                @keyframes lineDrift {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50%       { transform: translateY(-15px) translateX(10px); }
                }
                @keyframes lineDrift2 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50%       { transform: translateY(15px) translateX(-10px); }
                }
                @keyframes glowPulseLine {
                    0%, 100% { opacity: 0.6; }
                    50%       { opacity: 1;   }
                }
                .flow-path-1 { animation: dashFlow 6s ease-out forwards, lineDrift 12s ease-in-out infinite 6s; }
                .flow-path-2 { animation: dashFlow 6s ease-out forwards 0.3s, lineDrift2 14s ease-in-out infinite 6.3s; }
                .flow-path-3 { animation: dashFlow 6s ease-out forwards 0.6s, lineDrift 16s ease-in-out infinite 6.6s; }
                .flow-glow-dot { animation: glowPulseLine 3s ease-in-out infinite; }
            `}</style>

            <svg className="w-full h-full" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" fill="none">
                <defs>
                    <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={COLORS.left} stopOpacity="0" />
                        <stop offset="30%" stopColor={COLORS.left} stopOpacity="0.9" />
                        <stop offset="70%" stopColor={COLORS.right} stopOpacity="0.7" />
                        <stop offset="100%" stopColor={COLORS.mid} stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={COLORS.mid} stopOpacity="0" />
                        <stop offset="40%" stopColor={COLORS.right} stopOpacity="0.7" />
                        <stop offset="80%" stopColor={COLORS.left} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={COLORS.left} stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={COLORS.left} stopOpacity="0" />
                        <stop offset="50%" stopColor={COLORS.mid} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={COLORS.right} stopOpacity="0" />
                    </linearGradient>
                    <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <path className="flow-path-1" d="M -50,80 C 150,40 280,220 400,260 C 550,310 700,480 950,620" stroke="url(#lineGrad1)" strokeWidth="1.5" filter="url(#lineGlow)" strokeDasharray="2000" strokeDashoffset="2000" />
                <path className="flow-path-2" d="M -50,180 C 180,120 260,200 420,280 C 600,370 720,500 980,660" stroke="url(#lineGrad2)" strokeWidth="1.2" filter="url(#lineGlow)" strokeDasharray="2000" strokeDashoffset="2000" />
                <path className="flow-path-3" d="M -50,10 C 100,60 320,180 460,240 C 620,310 780,420 1000,520" stroke="url(#lineGrad3)" strokeWidth="1" filter="url(#lineGlow)" strokeDasharray="2000" strokeDashoffset="2000" />

                <circle cx="400" cy="260" r="3" fill={COLORS.mid} className="flow-glow-dot" filter="url(#lineGlow)" />
                <circle cx="420" cy="280" r="2" fill={COLORS.right} className="flow-glow-dot" filter="url(#lineGlow)" style={{ animationDelay: '1s' }} />
            </svg>
        </div>
    );
}