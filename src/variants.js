export const fadeIn = (direction, delay, fromBehind = false) => {
    return {
        hidden: fromBehind
            ? { scale: 0.8, opacity: 0 }
            : {
                y: direction === 'up' 
                    ? 40 
                    : direction === 'down'
                    ? -40
                    : 0,
                x: direction === 'left' 
                    ? 40 
                    : direction === 'right'
                    ? -40
                    : 0
        },
        show: {
            y: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 1.2,
                delay: delay,
                ease: [0.25, 0.25, 0.25, 0.75],
            }
        },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.5 } }
    }
}