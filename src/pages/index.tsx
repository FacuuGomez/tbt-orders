'use client';

import Image from 'next/image';
import american_burger from '../../public/assets/american-burger.jpg';
import cocacola from '../../public/assets/coca-cola.jpg';
import { Navbar } from '@/components/Navbar';
import { Cart } from '@/components/Cart';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddToCart from '@/components/AddToCart';
import { Product, Order } from '@/interfaces';

interface Props {
	initialProducts: Product[];
}

const inititalBurgerOpen: Product = {
	id: '',
	name: '',
	description: '',
	price: 0,
	product: '',
};

const inititalOrder: Order = {
	articles: [],
	totalBurgers: 0,
	totalDrinks: 0,
	totalArticles: 0,
	totalAmount: 0,
};

export default function Home({ initialProducts }: Props) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalBurgerIsOpen, setModalBurgerIsOpen] =
		useState<Product>(inititalBurgerOpen);
	const [articlesIsOpen, setArticlesIsOpen] = useState(true);
	const [order, setOrder] = useState<Order>(inititalOrder);

	const [products, setProducts] = useState<Product[]>(initialProducts);

	const fetchNewProducts = async () => {
		// const res = await fetch('http://localhost:3000/api/products');
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
		const newProducts = await res.json();
		setProducts(newProducts);
	};

	useEffect(() => {
		fetchNewProducts();
	}, []);

	// const burgers =
	// 	products && products.filter((product) => product.product === 'burger');
	const burgers = Array.isArray(products)
		? products.filter((product) => product.product === 'burger')
		: [];

	// const drinks =
	// 	products && products.filter((product) => product.product === 'drink');
	const drinks = Array.isArray(products)
		? products.filter((product) => product.product === 'drink')
		: [];

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const openBurgers = () => {
		setArticlesIsOpen(true);
	};

	const openDrinks = () => {
		setArticlesIsOpen(false);
	};

	return (
		<div className='min-h-screen w-full flex-col'>
			<Navbar
				totalArticles={order.totalArticles}
				openModal={openModal}
				openBurgers={openBurgers}
				openDrinks={openDrinks}
			/>

			<div className={modalIsOpen ? 'fixed w-full' : 'hidden'}>
				<Cart
					closeModal={closeModal}
					modalIsOpen={modalIsOpen}
					order={order}
					setOrder={setOrder}
				/>
			</div>

			<div className={modalBurgerIsOpen?.id ? 'fixed w-full' : 'hidden'}>
				<AddToCart
					closeModal={() => {
						fetchNewProducts();
						setModalBurgerIsOpen(inititalBurgerOpen);
					}}
					modalIsOpen={modalBurgerIsOpen}
					order={order}
					setOrder={setOrder}
				/>
			</div>

			<main className='flex justify-center min-h-screen pt-40 sm:pt-44'>
				<div className='mx-5 sm:max-w-2xl md:max-w-4xl xl:max-w-7xl w-full'>
					<AnimatePresence>
						{articlesIsOpen ? (
							<motion.section
								key='burgers'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0 }}
							>
								<motion.h1
									initial='hidden'
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.1, duration: 0.3 }}
									variants={{
										hidden: { opacity: 0, x: -100 },
										visible: { opacity: 1, x: 0 },
									}}
									className='font-bold text-2xl py-4'
								>
									BURGERS
								</motion.h1>

								<ul>
									{burgers &&
										burgers.map((burger, index) => (
											<motion.li
												initial={{ opacity: 0, y: 15 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{
													delay: 0.4 + index * 0.1,
													duration: 0.1,
												}}
												className='flex justify-between items-center bg-black/5 hover:bg-black/10 active:bg-black/10 sm:active:bg-black/5 w-full p-4 mb-2 rounded-xl cursor-pointer'
												key={burger.id}
												onClick={() => setModalBurgerIsOpen(burger)}
											>
												<Image
													src={american_burger}
													className='w-28 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
													alt='evolve'
												/>

												<div className='flex-wrap sm:flex justify-between w-full'>
													<div className='flex-col content-center'>
														<p className='font-semibold text-xl'>
															{burger.name}
														</p>
														<p className='text-sm sm:text-medium'>
															{burger.description}
														</p>
													</div>

													<p className='flex  items-center font-semibold text-lg text-[#491718]'>
														${burger.price}
													</p>
												</div>
											</motion.li>
										))}
								</ul>
							</motion.section>
						) : (
							<motion.section
								key='drinks'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0 }}
							>
								<motion.h1
									initial='hidden'
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.2, duration: 0.3 }}
									variants={{
										hidden: { opacity: 0, x: -100 },
										visible: { opacity: 1, x: 0 },
									}}
									className='font-bold text-2xl py-4'
								>
									BEBIDAS
								</motion.h1>

								<ul>
									{drinks &&
										drinks.map((drink, index) => (
											<motion.li
												initial={{ opacity: 0, y: 15 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{
													delay: 0.4 + index * 0.1,
													duration: 0.1,
												}}
												className='flex justify-between items-center bg-black/5 hover:bg-black/10 active:bg-black/10 sm:active:bg-black/5 w-full p-4 mb-2 rounded-xl cursor-pointer'
												key={drink.id}
												onClick={() => setModalBurgerIsOpen(drink)}
											>
												<Image
													src={cocacola}
													className='w-28 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
													alt='cocacola'
												/>

												<div className='flex-wrap sm:flex justify-between w-full'>
													<div className='flex-col content-center'>
														<p className='font-semibold text-xl'>
															{drink.name}
														</p>
														<p className='text-sm sm:text-medium'>
															{drink.description}
														</p>
													</div>

													<p className='flex justify-center items-center font-semibold text-lg text-[#491718]'>
														${drink.price}
													</p>
												</div>
											</motion.li>
										))}
								</ul>
							</motion.section>
						)}
					</AnimatePresence>
				</div>
			</main>

			<Footer />
		</div>
	);
}
