'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import tbt_logo from '../../public/assets/tbt-logo.jpg';

interface NavbarProps {
	openModal: () => void;
	totalBurgers: number;
}

export const Navbar = ({ openModal, totalBurgers }: NavbarProps) => {
	return (
		<div className='fixed max-w-screen w-full'>
			<header className='flex justify-center py-4 bg-[#D2A772]'>
				<div className='flex-col mx-5 sm:max-w-2xl md:max-w-4xl xl:max-w-7xl w-full'>
					<div className='flex justify-between items-center'>
						<Link href='/'>
							<Image
								src={tbt_logo}
								className='w-16 sm:w-20 cursor-pointer rounded-full'
								alt='evolve'
							/>
						</Link>

						<h2 className='font-bold text-xl sm:text-2xl'>THE BURGER TOWN</h2>

						<button className='flex relative' onClick={openModal}>
							<FontAwesomeIcon
								className='h-6  hover:opacity-80 active:opacity-60 cursor-pointer'
								icon={faCartShopping}
							/>

							<p className='flex justify-center items-center absolute -bottom-2 text-white -left-2 text-sm bg-red-600 rounded-full px-2 h-5 w-5'>
								{totalBurgers}
							</p>
						</button>
					</div>
				</div>
			</header>

			<nav className='flex justify-center py-4 bg-[#491718] text-[#D2A772]'>
				<ul className='flex justify-center gap-8 max-w-7xl w-full'>
					<li className='font-medium text-lg hover:opacity-80 active:opacity-60 cursor-pointer'>
						Hamburguesas
					</li>
					<li className='font-medium text-lg hover:opacity-80 active:opacity-60 cursor-pointer'>
						Bebidas
					</li>
					<li className='font-medium text-lg hover:opacity-80 active:opacity-60 cursor-pointer'>
						Dips
					</li>
				</ul>
			</nav>
		</div>
	);
};
