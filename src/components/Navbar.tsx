'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import tbt_logo from '../../public/assets/tbt-logo.jpg';

interface NavbarProps {
	openModal: () => void;
}

export const Navbar = ({ openModal }: NavbarProps) => {
	return (
		<div className='fixed max-w-screen w-full'>
			<header className='flex justify-center py-4 bg-[#D2A772]'>
				<div className='flex-col max-w-7xl w-full'>
					<div className='flex justify-between items-center'>
						<Link href='/'>
							<Image
								src={tbt_logo}
								className='w-20 cursor-pointer rounded-full'
								alt='evolve'
							/>
						</Link>

						<h2 className='font-bold text-2xl'>THE BURGER TOWN</h2>

						<button className='flex' onClick={openModal}>
							<FontAwesomeIcon
								className='h-6 hover:opacity-80 active:opacity-60 cursor-pointer'
								icon={faCartShopping}
							/>
						</button>
					</div>
				</div>
			</header>

			<nav className='flex justify-center py-4 bg-[#491718] text-[#D2A772]'>
				<ul className='flex justify-center gap-8  max-w-7xl w-full'>
					<li className='font-medium text-lg hover:opacity-80 active:opacity-60 cursor-pointer'>
						Hamburguesas
					</li>
					<li className='font-medium text-lg hover:opacity-80 active:opacity-60 cursor-pointer'>
						Bebidas
					</li>
					<li className='font-medium text-lg hover:opacity-80 active:opacity-60 cursor-pointer'>
						Dips de salsas
					</li>
				</ul>
			</nav>
		</div>
	);
};
