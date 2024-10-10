export const fadeIn = (
	position: string,
	delay: number,
	opacity: number,
	duration: number
) => {
	return {
		visible: {
			y: 0,
			x: 0,
			opacity: 1,
			transition: {
				type: 'tween',
				duration,
				delay,
				ease: [0.25, 0.25, 0.25, 0.75],
			},
		},
		hidden: {
			y: position === 'bottom' ? -200 : 15,
			x: position === 'right' ? 80 : 0,
			opacity,
			transition: {
				type: 'tween',
				duration,
				delay,
				ease: [0.25, 0.25, 0.25, 0.25],
			},
		},
	};
};
