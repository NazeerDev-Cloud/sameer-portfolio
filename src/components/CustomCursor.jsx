import { useEffect, useRef, useState } from 'react'

const COLORS = {
    primary: '#8168F0',
    primaryLight: '#7C5CFF',
    lavender: '#8b5cf6',
}

export default function CustomCursor() {
    const outerRef = useRef(null)
    const innerRef = useRef(null)
    const requestRef = useRef(null)

    const mousePos = useRef({ x: 0, y: 0 })
    const outerPos = useRef({ x: 0, y: 0 })

    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Mouse move
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }

            if (!isVisible) setIsVisible(true)

            // Inner dot follows immediately
            if (innerRef.current) {
                innerRef.current.style.left = `${e.clientX}px`
                innerRef.current.style.top = `${e.clientY}px`
            }
        }

        // Mouse down/up
        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        // Mouse enter/leave window
        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)

        // Hover detection for links and buttons
        const handleHoverStart = () => setIsHovering(true)
        const handleHoverEnd = () => setIsHovering(false)

        const addHoverListeners = () => {
            const hoverElements = document.querySelectorAll(
                'a, button, [role="button"], input[type="submit"], .cursor-hover'
            )

            hoverElements.forEach((el) => {
                el.addEventListener('mouseenter', handleHoverStart)
                el.addEventListener('mouseleave', handleHoverEnd)
            })

            return hoverElements
        }

        // Observe DOM changes for dynamically added elements
        const observer = new MutationObserver(() => {
            addHoverListeners()
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mouseleave', handleMouseLeave)

        const hoverElements = addHoverListeners()

        // Smooth follow animation for outer circle
        const animate = () => {
            const speed = 0.15

            outerPos.current.x +=
                (mousePos.current.x - outerPos.current.x) * speed
            outerPos.current.y +=
                (mousePos.current.y - outerPos.current.y) * speed

            if (outerRef.current) {
                outerRef.current.style.left = `${outerPos.current.x}px`
                outerRef.current.style.top = `${outerPos.current.y}px`
            }

            requestRef.current = requestAnimationFrame(animate)
        }

        requestRef.current = requestAnimationFrame(animate)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mouseenter', handleMouseEnter)
            document.removeEventListener('mouseleave', handleMouseLeave)

            hoverElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleHoverStart)
                el.removeEventListener('mouseleave', handleHoverEnd)
            })

            observer.disconnect()

            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }
        }
    }, [isVisible])

    // Hide on touch devices
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    useEffect(() => {
        const check =
            'ontouchstart' in window || navigator.maxTouchPoints > 0
        setIsTouchDevice(check)
    }, [])

    if (isTouchDevice) return null

    return (
        <>
            <style>{`
        /* Hide default cursor globally */
        * {
          cursor: none !important;
        }

        .custom-cursor-outer {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border: 2px solid ${COLORS.primary};
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          transition:
            width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.3s ease,
            background-color 0.3s ease,
            opacity 0.3s ease;
        }

        .custom-cursor-outer.hovering {
          width: 60px;
          height: 60px;
          border-color: ${COLORS.lavender};
          background-color: ${COLORS.primary}15;
        }

        .custom-cursor-outer.clicking {
          width: 30px;
          height: 30px;
          border-color: ${COLORS.primaryLight};
        }

        .custom-cursor-outer.hidden {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .custom-cursor-inner {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          background: ${COLORS.primary};
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          transition: 
            width 0.2s ease,
            height 0.2s ease,
            background-color 0.3s ease,
            opacity 0.3s ease;
          box-shadow: 
            0 0 10px ${COLORS.primary}80,
            0 0 20px ${COLORS.primary}40;
        }

        .custom-cursor-inner.hovering {
          width: 12px;
          height: 12px;
          background: ${COLORS.lavender};
          box-shadow: 
            0 0 15px ${COLORS.lavender}80,
            0 0 30px ${COLORS.lavender}40;
        }

        .custom-cursor-inner.clicking {
          width: 5px;
          height: 5px;
          background: ${COLORS.primaryLight};
        }

        .custom-cursor-inner.hidden {
          opacity: 0;
        }

        /* Cursor trail glow */
        .custom-cursor-outer::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: ${COLORS.primary}10;
          filter: blur(10px);
          transition: all 0.3s ease;
        }

        .custom-cursor-outer.hovering::after {
          width: 120%;
          height: 120%;
          background: ${COLORS.lavender}15;
          filter: blur(15px);
        }
      `}</style>

            {/* Outer Circle */}
            <div
                ref={outerRef}
                className={`custom-cursor-outer ${isHovering ? 'hovering' : ''
                    } ${isClicking ? 'clicking' : ''
                    } ${!isVisible ? 'hidden' : ''
                    }`}
            />

            {/* Inner Dot */}
            <div
                ref={innerRef}
                className={`custom-cursor-inner ${isHovering ? 'hovering' : ''
                    } ${isClicking ? 'clicking' : ''
                    } ${!isVisible ? 'hidden' : ''
                    }`}
            />
        </>
    )
}