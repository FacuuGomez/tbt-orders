'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import american_burger from '../../public/assets/american-burger.jpg';
import cheese_burger from '../../public/assets/cheese-burger.jpg';
import { Navbar } from '@/components/Navbar';
import { Cart } from '@/components/Cart';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';

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
	const [burgersIsOpen, setBurgersIsOpen] = useState(true);
	const [order, setOrder] = useState<Order>({
		burgers: [],
		totalBurgers: 0,
		totalAmount: 0,
	});
	const [americanQuantity, setAmericanQuantity] = useState(0);
	const [cheeseQuantity, setCheeseQuantity] = useState(0);

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const openBurgers = () => {
		setBurgersIsOpen(true);
	};

	const openDrinks = () => {
		setBurgersIsOpen(false);
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
			<Navbar
				openModal={openModal}
				totalBurgers={order.totalBurgers}
				openBurgers={openBurgers}
				openDrinks={openDrinks}
			/>

			<div className={modalIsOpen ? 'fixed w-full' : 'hidden'}>
				<Cart closeModal={closeModal} order={order} setOrder={setOrder} />
			</div>

			<main className='flex justify-center min-h-screen pt-40 sm:pt-44'>
				<div className='mx-5 sm:max-w-2xl md:max-w-4xl xl:max-w-7xl w-full'>
					{burgersIsOpen ? (
						<section>
							<h1 className='font-bold text-xl py-4'>BURGERS</h1>

							<ul>
								<li className='flex items-center'>
									<Image
										src={american_burger}
										className='w-28 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
										alt='evolve'
									/>

									<div className='flex-wrap sm:flex justify-between w-full'>
										<div className='flex-col content-center'>
											<p className='font-semibold text-lg'>American burger</p>
											<p className='text-sm sm:text-medium'>
												2 medallones de carne, cheddar, salsa "TBT", tomate,
												lechuga, cebolla.
											</p>
										</div>

										<div className='w-full md:w-24 mt-2 md:mt-0 md:ml-5 flex justify-between md:justify-center md:block'>
											<p className='flex justify-center items-center md:pb-2 font-semibold text-[#491718]'>
												$9.500
											</p>

											<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full w-24'>
												<button
													className='flex justify-center items-center border-r-2 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-l-xl cursor-pointer select-none'
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
													className='flex justify-center items-center border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-r-xl cursor-pointer select-none'
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
										className='w-28 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
										alt='evolve'
									/>

									<div className='flex-wrap sm:flex justify-between w-full'>
										<div className='flex-col content-center'>
											<p className='font-semibold text-lg'>Cheese burger</p>
											<p className='text-sm sm:text-medium'>
												2 medallones de carne, cheddar, salsa "TBT", panceta,
												cebolla caramelizada.
											</p>
										</div>

										<div className='w-full md:w-24 mt-2 md:mt-0 md:ml-5 flex justify-between md:justify-center md:block'>
											<p className='flex justify-center items-center md:pb-2 font-semibold text-[#491718]'>
												$9.500
											</p>

											<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full w-24'>
												<button
													className='flex justify-center items-center border-r-2 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-l-xl cursor-pointer select-none'
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
													className='flex justify-center items-center border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-r-xl cursor-pointer select-none'
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
					) : (
						<section>
							<h1 className='font-bold text-xl py-4'>BEBIDAS</h1>

							<ul>
								<li className='flex items-center'>Coca cola</li>

								<li className='flex items-center mt-4'>Shneider</li>
							</ul>
						</section>
					)}
				</div>
			</main>

			<Footer />
		</div>
	);
}
