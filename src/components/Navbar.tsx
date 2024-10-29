'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import tbt_logo from '../../public/assets/tbt-logo.jpg';
import { MotionTransition } from './TransitionComponent';

interface NavbarProps {
	totalArticles: number;
	openModal: () => void;
	openBurgers: () => void;
	openDrinks: () => void;
}

export const Navbar = ({
	totalArticles,
	openModal,
	openBurgers,
	openDrinks,
}: NavbarProps) => {
	return (
		<div className='fixed max-w-screen w-full'>
			<MotionTransition
				position='bottom'
				delay={0.1}
				opacity={1}
				duration={0.3}
				className='flex justify-center py-4 bg-[#D2A772] relative z-10'
			>
				<div className='flex-col mx-4 sm:max-w-2xl md:max-w-4xl xl:max-w-7xl w-full'>
					<div className='flex justify-between items-center'>
						<Link href='/'>
							<Image
								src={tbt_logo}
								className='w-16 sm:w-20 cursor-pointer rounded-full'
								alt='evolve'
								priority
							/>
						</Link>

						<h2 className='font-bold text-xl sm:text-3xl mr-9 sm:mr-12'>
							THE BURGER TOWN
						</h2>

						<button className='flex relative' onClick={openModal}>
							<FontAwesomeIcon
								className='h-6 hover:text-[#3a1212] active:text-[#491718] cursor-pointer'
								icon={faCartShopping}
							/>

							<p className='flex justify-center items-center absolute -bottom-2 text-white -left-2 text-sm bg-red-600 rounded-full h-5 w-5'>
								{totalArticles}
							</p>
						</button>
					</div>
				</div>
			</MotionTransition>

			<MotionTransition
				position='bottom'
				delay={0.3}
				opacity={1}
				duration={0.5}
				className='flex justify-center py-4 bg-[#491718] text-[#D2A772]'
			>
				<ul className='flex justify-center gap-8 max-w-7xl w-full'>
					<li className='font-semibold text-lg sm:hover:opacity-80 active:opacity-60 cursor-pointer transition'>
						<button onClick={openBurgers}>Burgers</button>
					</li>
					<li className='font-semibold text-lg sm:hover:opacity-80 active:opacity-60 cursor-pointer transition'>
						<button onClick={openDrinks}>Bebidas</button>
					</li>
				</ul>
			</MotionTransition>
		</div>
	);
};
