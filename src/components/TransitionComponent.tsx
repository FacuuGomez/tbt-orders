'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion-transitions';

export type MotionTransitionProps = {
	children: React.ReactNode;
	className?: string;
	position: 'right' | 'bottom' | 'top';
	delay: number;
	opacity: number;
	duration: number;
};

export function MotionTransition(props: MotionTransitionProps) {
	const { children, className, position, delay, opacity, duration } = props;

	return (
		<motion.div
			variants={fadeIn(position, delay, opacity, duration)}
			initial='hidden'
			animate='visible'
			exit='hidden'
			className={className}
		>
			{children}
		</motion.div>
	);
}
