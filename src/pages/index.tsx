'use client';

import Image from 'next/image';
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
	image: '',
	width: '',
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
	const [modalConfirm, setModalConfirm] = useState(false);

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

	useEffect(() => {
		if (order.totalBurgers > 0) {
			setModalConfirm(true);
			const timer = setTimeout(() => {
				setModalConfirm(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [order.totalBurgers]);

	return (
		<div className='min-h-screen w-full flex-col'>
			<Navbar
				totalArticles={order.totalArticles}
				openModal={openModal}
				openBurgers={openBurgers}
				openDrinks={openDrinks}
			/>
			<div className={modalIsOpen ? 'fixed w-full z-20' : 'hidden'}>
				<Cart
					closeModal={closeModal}
					modalIsOpen={modalIsOpen}
					order={order}
					setOrder={setOrder}
				/>
			</div>

			{modalConfirm && (
				<div className='fixed flex w-full justify-center z-40'>
					<motion.div
						initial={{ opacity: 0, y: -100 }} // Comienza arriba con opacidad 0
						animate={{ opacity: 1, y: 0 }} // Se desliza hacia su posición original
						transition={{
							duration: 0.3, // Ajusta la duración de la animación
							delay: 0.1, // Agrega un pequeño retraso opcional
							ease: [0, 0.71, 0.2, 1.01], // Mantén la curva de animación
						}}
						exit={{ opacity: 0, y: -100 }} // Se mueve hacia arriba al salir
						className='relative text-center bg-[#491718] mt-2 p-4 md:max-w-2xl w-72 rounded-2xl'
					>
						<p className='text-[#D2A772] font-semibold'>Se agregó al carrito</p>
					</motion.div>
				</div>
			)}
			<div className={modalBurgerIsOpen?.id ? 'fixed w-full  z-20' : 'hidden'}>
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
			<main className='flex justify-center min-h-screen bg-[#D2A772]'>
				<div className='mx-4 sm:max-w-2xl md:max-w-4xl xl:max-w-7xl w-full mt-32 sm:mt-36 py-6'>
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
									className='font-bold text-2xl pb-4'
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
												key={burger.id}
												onClick={() => setModalBurgerIsOpen(burger)}
												className='flex justify-between items-center bg-black/5 hover:bg-black/10 active:bg-black/10 sm:active:bg-black/5 w-full p-4 mb-2 rounded-2xl cursor-pointer'
											>
												<div>
													<div className='size-32 sm:size-36 rounded-2xl bg-[#491718] flex justify-center items-center'>
														<Image
															src={burger.image}
															alt={burger.name}
															className='custom-shadow object-cover z-1'
															style={{ width: `${burger.width}px` }}
															width={500}
															height={400}
														/>
													</div>
												</div>

												<div className='flex-wrap sm:flex justify-between w-full ml-4'>
													<div className='flex-col content-center'>
														<p className='font-semibold text-xl'>
															{burger.name}
														</p>
														<p className='text-sm sm:text-medium'>
															{burger.description}
														</p>
													</div>

													<p className='flex items-center font-semibold text-lg text-[#491718]'>
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
												className='flex justify-between items-center bg-black/5 hover:bg-black/10 active:bg-black/10 sm:active:bg-black/5 w-full p-4 mb-2 rounded-2xl cursor-pointer'
												key={drink.id}
												onClick={() => setModalBurgerIsOpen(drink)}
											>
												<div className='-z-10'>
													<div className='size-32 sm:size-36 rounded-2xl bg-[#491718] flex justify-center items-center'>
														<Image
															src={drink.image}
															alt={drink.name}
															className='custom-shadow object-cover'
															style={{ width: `${drink.width}px` }}
															width={500}
															height={400}
														/>
													</div>
												</div>

												<div className='flex-wrap sm:flex justify-between w-full ml-4'>
													<div className='flex-col content-center'>
														<p className='font-semibold text-xl'>
															{drink.name}
														</p>
														<p className='text-sm sm:text-medium'>
															{drink.description}
														</p>
													</div>

													<p className='flex  items-center font-semibold text-lg text-[#491718]'>
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
