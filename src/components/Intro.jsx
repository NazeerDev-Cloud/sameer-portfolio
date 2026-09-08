import { useState, useEffect, useRef } from 'react';
import logoMark from '../assets/logo-mark.svg';

const COLORS = {
    bgDeep: '#ffffff',
    bgMain: '#f6f7f9',
    bgLight: '#f4f5f7',
    primary: '#8168F0',
    primaryLight: '#7C5CFF',
    lavender: '#8b5cf6',
    softPurple: '#7C5CFF',
};

const GRADIENT = `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 50%, ${COLORS.lavender} 100%)`;

// Timeline (ms): mark in → wordmark wipe → scrub line → hold → exit → done
const T = {
    exitAt: 2400,
    doneAt: 3200,
};

export default function Intro({ onComplete }) {
    const [phase, setPhase] = useState('enter'); // enter → exit → done
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const exitTimer = setTimeout(() => setPhase('exit'), T.exitAt);
        const doneTimer = setTimeout(() => {
            setPhase('done');
            onCompleteRef.current?.();
        }, T.doneAt);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
        };
    }, []);

    if (phase === 'done') return null;

    return (
        <>
            <style>{`
                @keyframes introMarkIn {
                    0%   { opacity: 0; transform: perspective(900px) rotateY(-32deg) scale(0.72); }
                    60%  { opacity: 1; }
                    100% { opacity: 1; transform: perspective(900px) rotateY(0deg) scale(1); }
                }
                @keyframes introWordWipe {
                    from { clip-path: inset(0 100% 0 0); }
                    to   { clip-path: inset(0 0 0 0); }
                }
                @keyframes introRise {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes introLine {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
                @keyframes introGlow {
                    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                    50%      { opacity: 0.5; transform: translate(-50%, -50%) scale(1.12); }
                }
                @keyframes introOrb {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%      { transform: translate(60px, -40px) scale(1.15); }
                }

                .intro-root {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background: radial-gradient(circle at 30% 20%, ${COLORS.bgLight} 0%, ${COLORS.bgMain} 42%, ${COLORS.bgDeep} 100%);
                    transition: opacity 0.7s cubic-bezier(0.65, 0, 0.35, 1),
                                transform 0.8s cubic-bezier(0.65, 0, 0.35, 1),
                                filter 0.8s cubic-bezier(0.65, 0, 0.35, 1);
                }
                .intro-root.is-exit {
                    opacity: 0;
                    transform: scale(1.06);
                    filter: blur(6px);
                }

                .intro-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(27,31,59,0.045) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(27,31,59,0.045) 1px, transparent 1px);
                    background-size: 64px 64px;
                    -webkit-mask-image: radial-gradient(ellipse 60% 55% at 50% 50%, #000 10%, transparent 75%);
                    mask-image: radial-gradient(ellipse 60% 55% at 50% 50%, #000 10%, transparent 75%);
                }
                .intro-orb {
                    position: absolute;
                    border-radius: 9999px;
                    filter: blur(110px);
                    pointer-events: none;
                }

                .intro-stage {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 30px;
                    padding: 0 24px;
                }

                .intro-mark-wrap {
                    position: relative;
                    animation: introMarkIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .intro-mark-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 150%;
                    height: 150%;
                    border-radius: 9999px;
                    background: ${GRADIENT};
                    filter: blur(46px);
                    animation: introGlow 3s ease-in-out infinite;
                }
                .intro-mark {
                    position: relative;
                    width: 104px;
                    height: 104px;
                    border-radius: 30px;
                    box-shadow: 0 24px 60px ${COLORS.primary}33, inset 0 0 0 1px rgba(255,255,255,0.2);
                }

                .intro-word {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    animation: introWordWipe 0.9s cubic-bezier(0.65, 0, 0.35, 1) 0.5s both;
                }
                .intro-word h1 {
                    margin: 0;
                    font-size: clamp(2.4rem, 7vw, 4.4rem);
                    font-weight: 900;
                    letter-spacing: 0.14em;
                    line-height: 1;
                    background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight}, #9D6BFF);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                }
                .intro-word h2 {
                    margin: 0;
                    font-size: clamp(1rem, 3vw, 1.7rem);
                    font-weight: 600;
                    letter-spacing: 0.5em;
                    text-indent: 0.5em;
                    color: #1b1f3b;
                }

                .intro-line {
                    width: min(230px, 60vw);
                    height: 2px;
                    border-radius: 9999px;
                    background: ${GRADIENT};
                    transform-origin: left center;
                    box-shadow: 0 0 18px ${COLORS.primary}44;
                    animation: introLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both;
                }

                .intro-tag {
                    font-size: 0.68rem;
                    font-weight: 700;
                    letter-spacing: 0.42em;
                    text-indent: 0.42em;
                    text-transform: uppercase;
                    color: ${COLORS.softPurple};
                    opacity: 0;
                    animation: introRise 0.7s ease 1.35s forwards;
                }

                @media (prefers-reduced-motion: reduce) {
                    .intro-root, .intro-root * { animation: none !important; transition: opacity 0.4s ease !important; }
                    .intro-word { clip-path: none !important; }
                    .intro-tag { opacity: 1 !important; }
                    .intro-line { transform: none !important; }
                }
            `}</style>

            <div className={`intro-root ${phase === 'exit' ? 'is-exit' : ''}`}>
                <div className="intro-grid" />

                <div
                    className="intro-orb"
                    style={{
                        top: '18%',
                        left: '16%',
                        width: 420,
                        height: 420,
                        background: `${COLORS.primary}16`,
                        animation: 'introOrb 11s ease-in-out infinite',
                    }}
                />
                <div
                    className="intro-orb"
                    style={{
                        bottom: '14%',
                        right: '14%',
                        width: 460,
                        height: 460,
                        background: `${COLORS.lavender}14`,
                        animation: 'introOrb 13s ease-in-out infinite reverse',
                    }}
                />

                <div className="intro-stage">
                    <div className="intro-mark-wrap">
                        <div className="intro-mark-glow" />
                        <img className="intro-mark" src={logoMark} alt="Sameer Visuals" />
                    </div>

                    <div className="intro-word">
                        <h1>SAMEER</h1>
                        <h2>VISUALS</h2>
                    </div>

                    <div className="intro-line" />

                    <p className="intro-tag">Crafting Visual Stories</p>
                </div>
            </div>
        </>
    );
}
