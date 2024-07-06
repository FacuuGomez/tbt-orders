'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import american_burger from '../../public/assets/american-burger.jpg';
import cheese_burger from '../../public/assets/cheese-burger.jpg';
import { Navbar } from '@/components/Navbar';
import { Cart } from '@/components/Cart';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';

// interface CartProps {
// 	modalIsOpen: boolean;
// 	openModal: () => void;
// 	closeModal: () => void;
// }

type QuantityHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

type BurgerName = 'American' | 'Cheese' | 'Cuatro quesos';

interface Burger {
	name: BurgerName;
	price: number;
	quantity: number;
}

interface Order {
	burgers: Burger[];
	totalBurgers: number;
	totalAmount: number;
}

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [order, setOrder] = useState<Order>({
		burgers: [],
		totalBurgers: 0,
		totalAmount: 0,
	});
	const [americanQuantity, setAmericanQuantity] = useState(0);
	const [cheeseQuantity, setCheeseQuantity] = useState(0);
	// const [totalBurgers, setTotalBurgers] = useState(0);

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const americanHandler: QuantityHandler = (event) => {
		if (event.currentTarget.name === 'plusButton')
			setAmericanQuantity(americanQuantity + 1);
		if (event.currentTarget.name === 'minusButton' && americanQuantity !== 0)
			setAmericanQuantity(americanQuantity - 1);
	};

	const cheeseHandler: QuantityHandler = (event) => {
		if (event.currentTarget.name === 'plusButton')
			setCheeseQuantity(cheeseQuantity + 1);
		if (event.currentTarget.name === 'minusButton' && cheeseQuantity !== 0)
			setCheeseQuantity(cheeseQuantity - 1);
	};

	const orderHandler = () => {
		const americanBurger: Burger = {
			name: 'American',
			price: 9500,
			quantity: americanQuantity,
		};

		const cheeseBurger: Burger = {
			name: 'Cheese',
			price: 10500,
			quantity: cheeseQuantity,
		};

		const updatedBurgers: Burger[] = [];

		if (americanBurger.quantity > 0) {
			updatedBurgers.push(americanBurger);
		}

		if (cheeseBurger.quantity > 0) {
			updatedBurgers.push(cheeseBurger);
		}

		if (updatedBurgers.length >= 0) {
			const updatedTotalAmount = updatedBurgers.reduce((total, burger) => {
				return total + burger.price * burger.quantity;
			}, 0);

			setOrder({
				burgers: updatedBurgers,
				totalBurgers: americanQuantity + cheeseQuantity,
				totalAmount: updatedTotalAmount,
			});
		}
	};

	useEffect(() => {
		orderHandler();
	}, [americanQuantity, cheeseQuantity]);

	// useEffect(() => {

	// 	console.log(order);
	// }, [order]);

	return (
		<div className='min-h-screen w-full flex-col'>
			<Navbar openModal={openModal} totalBurgers={order.totalBurgers} />

			<div className={modalIsOpen ? 'fixed w-full' : 'hidden'}>
				<Cart closeModal={closeModal} order={order} />
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

									<div className='w-24'>
										<p className='flex justify-center pb-2 font-semibold text-[#491718]'>
											$9.500
										</p>

										<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full'>
											<button
												className='flex justify-center items-center border-r-2 border-[#491718] hover:bg-[#491718] hover:text-white active:opacity-70 rounded-l-xl cursor-pointer select-none'
												name='minusButton'
												onClick={americanHandler}
											>
												-
											</button>
											<p
												className={`flex justify-center items-center border-r-2 border-[#491718] px-2 cursor-default select-none ${
													americanQuantity && 'bg-[#491718] text-white'
												}`}
											>
												{americanQuantity}
											</p>
											<button
												className='flex justify-center items-center hover:bg-[#491718] hover:text-white active:opacity-70 rounded-r-xl cursor-pointer select-none'
												name='plusButton'
												onClick={americanHandler}
											>
												+
											</button>
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

									<div className='w-24'>
										<p className='flex justify-center pb-2 font-semibold text-[#491718]'>
											$9.500
										</p>

										<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full'>
											<button
												className='flex justify-center items-center border-r-2 border-[#491718] hover:bg-[#491718] hover:text-white active:opacity-70 rounded-l-xl cursor-pointer select-none'
												name='minusButton'
												onClick={cheeseHandler}
											>
												-
											</button>
											<p
												className={`flex justify-center items-center border-r-2 border-[#491718] px-2 cursor-default select-none ${
													cheeseQuantity && 'bg-[#491718] text-white'
												}`}
											>
												{cheeseQuantity}
											</p>
											<button
												className='flex justify-center items-center hover:bg-[#491718] hover:text-white active:opacity-70 rounded-r-xl cursor-pointer select-none'
												name='plusButton'
												onClick={cheeseHandler}
											>
												+
											</button>
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
