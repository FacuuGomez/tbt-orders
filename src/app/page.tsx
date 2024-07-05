'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import american_burger from '../../public/assets/american-burger.jpg';
import cheese_burger from '../../public/assets/cheese-burger.jpg';
import { Navbar } from '@/components/Navbar';
import { Cart } from '@/components/Cart';
import { Footer } from '@/components/Footer';
import { useState } from 'react';

interface CartProps {
	modalIsOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

interface Burger {
	name: string;
	price: number;
	quantity: number;
}

interface Order {
	burgers: Burger[];
	quantity: number;
	totalAmount: number;
}

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [order, setNewOrder] = useState(false);

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const orderHandler = () => {
		setNewOrder(false);
	};

	return (
		<div className='min-h-screen w-full flex-col'>
			<Navbar openModal={openModal} />

			<div className={modalIsOpen ? 'fixed w-full' : 'hidden'}>
				<Cart closeModal={closeModal} />
			</div>

			<main className='flex justify-center min-h-screen pt-44'>
				<div className='max-w-7xl w-full'>
					<section>
						<h1 className='py-5 font-bold text-xl'>BURGERS</h1>

						<ul>
							<li className='flex items-center'>
								<Image
									src={american_burger}
									className='w-36 mr-6 cursor-pointer rounded-2xl'
									alt='evolve'
								/>

								<div className='flex justify-between w-full'>
									<div>
										<p className='font-semibold text-lg'>American burger</p>
										<p>
											2 medallones de carne, cheddar, salsa "TBT", tomate,
											lechuga, cebolla.
										</p>
									</div>

									<div>
										<p className='flex justify-center pb-2 font-semibold text-[#491718]'>
											$9.500
										</p>

										<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full'>
											<p className='flex justify-center items-center border-r-2 border-[#491718] hover:bg-[#491718] hover:text-white active:opacity-70 rounded-l-xl cursor-pointer select-none'>
												-
											</p>
											<p className='flex justify-center items-center border-r-2 border-[#491718] px-2 cursor-default select-none'>
												0
											</p>
											<p className='flex justify-center items-center hover:bg-[#491718] hover:text-white active:opacity-70 rounded-r-xl cursor-pointer select-none'>
												+
											</p>
										</div>
									</div>
								</div>
							</li>
							<li className='flex items-center mt-4'>
								<Image
									src={cheese_burger}
									className='w-36 mr-6 cursor-pointer rounded-2xl'
									alt='evolve'
								/>

								<div className='flex justify-between w-full'>
									<div>
										<p className='font-semibold text-lg'>Cheese burger</p>
										<p>
											2 medallones de carne, cheddar, salsa "TBT", panceta,
											cebolla caramelizada.
										</p>
									</div>

									<div>
										<p className='flex justify-center pb-2 font-semibold text-[#491718]'>
											$9.500
										</p>

										<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full'>
											<p className='flex justify-center items-center border-r-2 border-[#491718] hover:bg-[#491718] hover:text-white active:opacity-70 rounded-l-xl cursor-pointer select-none'>
												-
											</p>
											<p className='flex justify-center items-center border-r-2 border-[#491718] px-2 cursor-default select-none'>
												0
											</p>
											<p className='flex justify-center items-center hover:bg-[#491718] hover:text-white active:opacity-70 rounded-r-xl cursor-pointer select-none'>
												+
											</p>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
}
