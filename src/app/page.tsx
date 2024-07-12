'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import american_burger from '../../public/assets/american-burger.jpg';
import cheese_burger from '../../public/assets/cheese-burger.jpg';
import cocacola from '../../public/assets/coca-cola.jpg';
import schneider from '../../public/assets/schneider.jpg';
import { Navbar } from '@/components/Navbar';
import { Cart } from '@/components/Cart';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { articlesData } from '../utils/data';
import { MotionTransition } from '@/components/TransitionComponent';
import { motion, AnimatePresence } from 'framer-motion';

type QuantityHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

type ArticleName =
	| 'American burger'
	| 'Cheese burger'
	| 'Burger 4 quesos'
	| 'BBQ burger'
	| 'Coca Cola'
	| 'Schneider';

interface Article {
	name: ArticleName;
	price: number;
	quantity: number;
	image: string;
}

interface Order {
	articles: Article[];
	totalBurgers: number;
	totalDrinks: number;
	totalArticles: number;
	totalAmount: number;
}

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [articlesIsOpen, setArticlesIsOpen] = useState(true);
	const [order, setOrder] = useState<Order>({
		articles: [],
		totalBurgers: 0,
		totalDrinks: 0,
		totalArticles: 0,
		totalAmount: 0,
	});
	const [americanQuantity, setAmericanQuantity] = useState(0);
	const [cheeseQuantity, setCheeseQuantity] = useState(0);
	const [fourChesseQuantity, setFourChesseQuantity] = useState(0);
	const [bbgQuantity, setBbqQuantity] = useState(0);
	const [cocacolaQuantity, setCocacolaQuantity] = useState(0);
	const [schneiderQuantity, setSchneiderQuantity] = useState(0);

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

	const americanHandler: QuantityHandler = (event) => {
		if (event.currentTarget.name === 'plusButton')
			setAmericanQuantity(americanQuantity + 1);
		if (event.currentTarget.name === 'minusButton' && americanQuantity > 0)
			setAmericanQuantity(americanQuantity - 1);
	};

	// const americanHandler: QuantityHandler = (event) => {
	// 	if (event.currentTarget.name === 'plusButton')
	// 		setAmericanQuantity((prev) => prev + 1);
	// 	if (event.currentTarget.name === 'minusButton' && americanQuantity !== 0)
	// 		setAmericanQuantity((prev) => prev - 1);
	// };

	const cheeseHandler: QuantityHandler = (event) => {
		if (event.currentTarget.name === 'plusButton')
			setCheeseQuantity(cheeseQuantity + 1);
		if (event.currentTarget.name === 'minusButton' && cheeseQuantity > 0)
			setCheeseQuantity(cheeseQuantity - 1);
	};

	const fourChesseHandler: QuantityHandler = (event) => {
		if (event.currentTarget.name === 'plusButton')
			setFourChesseQuantity(fourChesseQuantity + 1);
		if (event.currentTarget.name === 'minusButton' && fourChesseQuantity > 0)
			setFourChesseQuantity(fourChesseQuantity - 1);
	};

	const bbqHandler: QuantityHandler = (event) => {
		if (event.currentTarget.name === 'plusButton')
			setBbqQuantity(bbgQuantity + 1);
		if (event.currentTarget.name === 'minusButton' && bbgQuantity > 0)
			setBbqQuantity(bbgQuantity - 1);
	};

	const cocacolaHandler: QuantityHandler = (event) => {
		if (event.currentTarget.name === 'plusButton')
			setCocacolaQuantity(cocacolaQuantity + 1);
		if (event.currentTarget.name === 'minusButton' && cocacolaQuantity > 0)
			setCocacolaQuantity(cocacolaQuantity - 1);
	};

	const schneiderHandler: QuantityHandler = (event) => {
		if (event.currentTarget.name === 'plusButton')
			setSchneiderQuantity(schneiderQuantity + 1);
		if (event.currentTarget.name === 'minusButton' && schneiderQuantity > 0)
			setSchneiderQuantity(schneiderQuantity - 1);
	};

	useEffect(() => {
		const orderHandler = () => {
			const americanBurger: Article = {
				name: 'American burger',
				price: 9500,
				quantity: americanQuantity,
				image: 'american-burger.jpg',
			};

			const cheeseBurger: Article = {
				name: 'Cheese burger',
				price: 9500,
				quantity: cheeseQuantity,
				image: 'cheese-burger.jpg',
			};

			const fourChesseBurger: Article = {
				name: 'Burger 4 quesos',
				price: 9500,
				quantity: fourChesseQuantity,
				image: 'american-burger.jpg',
			};

			const bbqBurger: Article = {
				name: 'BBQ burger',
				price: 9500,
				quantity: bbgQuantity,
				image: 'american-burger.jpg',
			};

			const cocacolaDrink: Article = {
				name: 'Coca Cola',
				price: 1500,
				quantity: cocacolaQuantity,
				image: 'coca-cola.jpg',
			};

			const schneiderDrink: Article = {
				name: 'Schneider',
				price: 1500,
				quantity: schneiderQuantity,
				image: 'schneider.jpg',
			};

			const updatedArticles: Article[] = [];

			if (americanBurger.quantity > 0) {
				updatedArticles.push(americanBurger);
			}

			if (cheeseBurger.quantity > 0) {
				updatedArticles.push(cheeseBurger);
			}

			if (fourChesseBurger.quantity > 0) {
				updatedArticles.push(fourChesseBurger);
			}

			if (bbqBurger.quantity > 0) {
				updatedArticles.push(bbqBurger);
			}

			if (cocacolaDrink.quantity > 0) {
				updatedArticles.push(cocacolaDrink);
			}

			if (schneiderDrink.quantity > 0) {
				updatedArticles.push(schneiderDrink);
			}

			if (updatedArticles.length > -1) {
				const updatedTotalAmount = updatedArticles.reduce((total, article) => {
					return total + article.price * article.quantity;
				}, 0);

				const totalBurgers =
					americanQuantity + cheeseQuantity + fourChesseQuantity + bbgQuantity;
				const totalDrinks = cocacolaQuantity + schneiderQuantity;
				const totalArticles = totalBurgers + totalDrinks;

				setOrder({
					articles: updatedArticles,
					totalBurgers,
					totalDrinks,
					totalArticles,
					totalAmount: updatedTotalAmount,
				});
			}
		};

		orderHandler();
	}, [
		cheeseQuantity,
		americanQuantity,
		fourChesseQuantity,
		bbgQuantity,
		cocacolaQuantity,
		schneiderQuantity,
	]);

	// useEffect(() => {
	// 	console.log('order', order);
	// }, [order]);

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
									className='font-bold text-xl py-4'
								>
									BURGERS
								</motion.h1>

								<ul>
									<motion.li
										initial='hidden'
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2, duration: 0.3 }}
										variants={{
											hidden: { opacity: 0, y: 15 },
											visible: { opacity: 1, y: 0 },
										}}
										className='flex items-center'
									>
										<Image
											src={american_burger}
											className='w-28 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
											alt='evolve'
										/>

										<div className='flex-wrap sm:flex justify-between w-full'>
											<div className='flex-col content-center'>
												<p className='font-semibold text-lg'>American burger</p>
												<p className='text-sm sm:text-medium'>
													Doble medallón de carne, cheddar, salsa
													&quot;TBT&quot;, tomate, lechuga, cebolla.
												</p>
											</div>

											<div className='w-full md:w-24 mt-2 md:mt-0 md:ml-5 flex justify-between md:justify-center md:block'>
												<p className='flex justify-center items-center md:pb-2 font-semibold text-[#491718]'>
													$9.500
												</p>

												<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full w-24'>
													<button
														className='flex justify-center items-center border-r-2 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-l-xl cursor-pointer select-none transition'
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
														className='flex justify-center items-center border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-r-xl cursor-pointer select-none transition'
														name='plusButton'
														onClick={americanHandler}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</motion.li>

									<motion.li
										initial='hidden'
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3, duration: 0.3 }}
										variants={{
											hidden: { opacity: 0, y: 15 },
											visible: { opacity: 1, y: 0 },
										}}
										className='flex items-center mt-4'
									>
										<Image
											src={cheese_burger}
											className='w-28 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
											alt='evolve'
										/>

										<div className='flex-wrap sm:flex justify-between w-full'>
											<div className='flex-col content-center'>
												<p className='font-semibold text-lg'>Cheese burger</p>
												<p className='text-sm sm:text-medium'>
													Doble medallón de carne, cheddar, salsa
													&quot;TBT&quot;, panceta, cebolla caramelizada.
												</p>
											</div>

											<div className='w-full md:w-24 mt-2 md:mt-0 md:ml-5 flex justify-between md:justify-center md:block'>
												<p className='flex justify-center items-center md:pb-2 font-semibold text-[#491718]'>
													$9.500
												</p>

												<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full w-24'>
													<button
														className='flex justify-center items-center border-r-2 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-l-xl cursor-pointer select-none transition'
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
														className='flex justify-center items-center border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-r-xl cursor-pointer select-none transition'
														name='plusButton'
														onClick={cheeseHandler}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</motion.li>

									<motion.li
										initial='hidden'
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.4, duration: 0.3 }}
										variants={{
											hidden: { opacity: 0, y: 15 },
											visible: { opacity: 1, y: 0 },
										}}
										className='flex items-center mt-4'
									>
										<Image
											src={cheese_burger}
											className='w-28 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
											alt='evolve'
										/>

										<div className='flex-wrap sm:flex justify-between w-full'>
											<div className='flex-col content-center'>
												<p className='font-semibold text-lg'>Burger 4 quesos</p>
												<p className='text-sm sm:text-medium'>
													Doble medallón de carne, cheddar, roquefort,
													mozarella, tybo.
												</p>
											</div>

											<div className='w-full md:w-24 mt-2 md:mt-0 md:ml-5 flex justify-between md:justify-center md:block'>
												<p className='flex justify-center items-center md:pb-2 font-semibold text-[#491718]'>
													$9.500
												</p>

												<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full w-24'>
													<button
														className='flex justify-center items-center border-r-2 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-l-xl cursor-pointer select-none transition'
														name='minusButton'
														onClick={fourChesseHandler}
													>
														-
													</button>
													<p
														className={`flex justify-center items-center border-r-2 border-[#491718] px-2 cursor-default select-none ${
															fourChesseQuantity && 'bg-[#491718] text-white'
														}`}
													>
														{fourChesseQuantity}
													</p>
													<button
														className='flex justify-center items-center border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-r-xl cursor-pointer select-none transition'
														name='plusButton'
														onClick={fourChesseHandler}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</motion.li>

									<motion.li
										initial='hidden'
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.5, duration: 0.5 }}
										variants={{
											hidden: { opacity: 0, y: 15 },
											visible: { opacity: 1, y: 0 },
										}}
										className='flex items-center mt-4'
									>
										<Image
											src={cheese_burger}
											className='w-28 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
											alt='evolve'
										/>

										<div className='flex-wrap sm:flex justify-between w-full'>
											<div className='flex-col content-center'>
												<p className='font-semibold text-lg'>BBQ burger</p>
												<p className='text-sm sm:text-medium'>
													Doble medallón de carne, cheddar, cebolla
													caramelizada, barbacoa.
												</p>
											</div>

											<div className='w-full md:w-24 mt-2 md:mt-0 md:ml-5 flex justify-between md:justify-center md:block'>
												<p className='flex justify-center items-center md:pb-2 font-semibold text-[#491718]'>
													$9.500
												</p>

												<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full w-24'>
													<button
														className='flex justify-center items-center border-r-2 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-l-xl cursor-pointer select-none transition'
														name='minusButton'
														onClick={bbqHandler}
													>
														-
													</button>
													<p
														className={`flex justify-center items-center border-r-2 border-[#491718] px-2 cursor-default select-none ${
															bbgQuantity && 'bg-[#491718] text-white'
														}`}
													>
														{bbgQuantity}
													</p>
													<button
														className='flex justify-center items-center border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-r-xl cursor-pointer select-none transition'
														name='plusButton'
														onClick={bbqHandler}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</motion.li>
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
									// whileInView='visible'
									transition={{ delay: 0.2, duration: 0.3 }}
									variants={{
										hidden: { opacity: 0, x: -100 },
										visible: { opacity: 1, x: 0 },
									}}
									className='font-bold text-xl py-4'
								>
									BEBIDAS
								</motion.h1>

								<ul>
									<motion.li
										initial='hidden'
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2, duration: 0.3 }}
										variants={{
											hidden: { opacity: 0, y: 15 },
											visible: { opacity: 1, y: 0 },
										}}
										className='flex items-center'
									>
										<Image
											src={cocacola}
											className='w-28 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
											alt='cocacola'
										/>

										<div className='flex-wrap sm:flex justify-between w-full'>
											<div className='flex-col content-center'>
												<p className='font-semibold text-lg'>Coca Cola</p>
												<p className='text-sm sm:text-medium'>
													Botella de 500ml.
												</p>
											</div>

											<div className='w-full md:w-24 mt-2 md:mt-0 md:ml-5 flex justify-between md:justify-center md:block'>
												<p className='flex justify-center items-center md:pb-2 font-semibold text-[#491718]'>
													$1.500
												</p>

												<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full w-24'>
													<button
														className='flex justify-center items-center border-r-2 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-l-xl cursor-pointer select-none transition'
														name='minusButton'
														onClick={cocacolaHandler}
													>
														-
													</button>
													<p
														className={`flex justify-center items-center border-r-2 border-[#491718] px-2 cursor-default select-none ${
															cocacolaQuantity && 'bg-[#491718] text-white'
														}`}
													>
														{cocacolaQuantity}
													</p>
													<button
														className='flex justify-center items-center border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-r-xl cursor-pointer select-none transition'
														name='plusButton'
														onClick={cocacolaHandler}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</motion.li>

									<motion.li
										initial='hidden'
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3, duration: 0.3 }}
										variants={{
											hidden: { opacity: 0, y: 15 },
											visible: { opacity: 1, y: 0 },
										}}
										className='flex items-center mt-4'
									>
										<Image
											src={schneider}
											className='w-28 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
											alt='schneider'
										/>
										<div className='flex-wrap sm:flex justify-between w-full'>
											<div className='flex-col content-center'>
												<p className='font-semibold text-lg'>Schneider</p>
												<p className='text-sm sm:text-medium'>Lata de 473ml.</p>
											</div>

											<div className='w-full md:w-24 mt-2 md:mt-0 md:ml-5 flex justify-between md:justify-center md:block'>
												<p className='flex justify-center items-center md:pb-2 font-semibold text-[#491718]'>
													$1.500
												</p>

												<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full w-24'>
													<button
														className='flex justify-center items-center border-r-2 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-l-xl cursor-pointer select-none transition'
														name='minusButton'
														onClick={schneiderHandler}
													>
														-
													</button>
													<p
														className={`flex justify-center items-center border-r-2 border-[#491718] px-2 cursor-default select-none ${
															schneiderQuantity && 'bg-[#491718] text-white'
														}`}
													>
														{schneiderQuantity}
													</p>
													<button
														className='flex justify-center items-center border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-r-xl cursor-pointer select-none transition'
														name='plusButton'
														onClick={schneiderHandler}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</motion.li>
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
