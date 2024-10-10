import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Product, Order, Article } from '@/interfaces';

type QuantityHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

type SizeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => void;

interface AddToCartProps {
	order: Order;
	setOrder: React.Dispatch<React.SetStateAction<Order>>;
	modalIsOpen?: Product;
	closeModal?: () => void;
}

interface ArticleQuantity {
	name?: string;
	size: string;
	quantity: number;
}

// type SizeBurger = 'SIMPLE' | 'DOBLE' | 'TRIPLE';

const initialQuantity = {
	name: '',
	size: '',
	quantity: 0,
};

const updatedArticles: Article[] = [];

export default function AddToCart({
	closeModal,
	order,
	setOrder,
	modalIsOpen,
}: AddToCartProps) {
	const [articleQuantity, setArticleQuantity] =
		useState<ArticleQuantity>(initialQuantity);
	const [articleList, setArticleList] = useState(updatedArticles);
	const [totalBurgers, setTotalBurgers] = useState(0);
	const [totalDrinks, setTotalDrinks] = useState(0);

	const articleHandler: QuantityHandler = (event) => {
		if (event.currentTarget.name === 'plusButton')
			setArticleQuantity({
				...articleQuantity,
				name: modalIsOpen?.name,
				quantity: articleQuantity.quantity + 1,
			});
		if (
			event.currentTarget.name === 'minusButton' &&
			articleQuantity.quantity > 0
		)
			setArticleQuantity({
				...articleQuantity,
				name: modalIsOpen?.name,
				quantity: articleQuantity.quantity - 1,
			});
	};

	const handleSizeChange: SizeHandler = (event) => {
		setArticleQuantity({
			...articleQuantity,
			size: event.target.value,
		});
	};

	const addToCart = () => {
		if (articleQuantity.quantity > 0) {
			if (modalIsOpen?.product === 'drink')
				setTotalDrinks(totalDrinks + articleQuantity.quantity);

			if (modalIsOpen?.product === 'burger')
				setTotalBurgers(totalBurgers + articleQuantity.quantity);

			// const article: Article = {
			// 	name: modalIsOpen?.name,
			// 	price: modalIsOpen?.price,
			// 	size: articleQuantity.size,
			// 	quantity: articleQuantity.quantity,
			// 	product: modalIsOpen?.product,
			// };

			setArticleList([
				...articleList,
				{
					name: modalIsOpen?.name,
					price: modalIsOpen?.price,
					size: articleQuantity.size,
					quantity: articleQuantity.quantity,
					product: modalIsOpen?.product,
				},
			]);
		}

		setArticleQuantity({
			name: modalIsOpen?.name,
			size: 'Simple',
			quantity: 0,
		});
	};

	useEffect(() => {
		if (articleList.length > 0) {
			const updatedTotalAmount = articleList.reduce((total, article) => {
				return total + article.price * article.quantity;
			}, 0);

			const totalArticles = totalBurgers + totalDrinks;

			setOrder({
				articles: articleList,
				totalBurgers,
				totalDrinks,
				totalArticles,
				totalAmount: updatedTotalAmount,
			});
		}
	}, [articleList]);

	useEffect(() => {
		console.log('order', order);
		console.log('modalIsOpen', modalIsOpen);
	}, [order, modalIsOpen]);

	useEffect(() => {
		setArticleQuantity({
			name: modalIsOpen?.name,
			size: 'Simple',
			quantity: 0,
		});
	}, []);

	return (
		<div className='flex justify-center items-center bg-black/60 backdrop-blur-sm h-screen max-w-screen'>
			<AnimatePresence>
				{modalIsOpen?.name && (
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.1,
							delay: 0.1,
							ease: [0, 0.71, 0.2, 1.01],
						}}
						exit={{ opacity: 0, scale: 0 }}
						className='relative justify-center text-center bg-[#d2a772] m-5 md:max-w-2xl w-full p-6 rounded-3xl'
					>
						<div>
							<button className='flex' onClick={closeModal}>
								<FontAwesomeIcon
									className='absolute top-6 right-6 size-8 hover:opacity-80 active:text-[#491718] cursor-pointer'
									icon={faCircleXmark}
								/>
							</button>

							<h3 className='text-xl font-semibold pb-6'>{modalIsOpen.name}</h3>
						</div>

						<div className='flex flex-col gap-6'>
							<p className='text-sm sm:text-medium'>
								{modalIsOpen.description}
							</p>

							{modalIsOpen.product === 'burger' && (
								<select
									className='p-2 w-full rounded-xl text-black/60 bg-black/5 border-2 border-[#d2a772] focus:border-[#491718]'
									name='orderPayment'
									value={articleQuantity.size}
									onChange={handleSizeChange}
								>
									<option className='text-black' value='Simple'>
										Simple
									</option>
									<option className='text-black' value='Doble'>
										Doble
									</option>
									<option className='text-black' value='Triple'>
										Triple
									</option>
								</select>
							)}

							<div className='flex justify-between items-center'>
								<p className='flex justify-center items-center  font-semibold text-lg text-[#491718]'>
									${articleQuantity.quantity === 0 ? '0' : modalIsOpen.price}
									{articleQuantity.quantity > 1 &&
										` x ${articleQuantity.quantity} = $${
											modalIsOpen.price * articleQuantity.quantity
										}`}
								</p>

								<div className='grid grid-cols-3 justify-center b w-40 h-10 text-xl font-semibold'>
									<button
										className='flex justify-center items-center border-2 size-12 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-full cursor-pointer select-none transition '
										name='minusButton'
										onClick={articleHandler}
									>
										-
									</button>
									<p
										className={`flex justify-center items-center rounded-full border-2 border-[#491718] size-12 cursor-default select-none ${
											articleQuantity.quantity && 'bg-[#491718] text-white'
										}`}
									>
										{articleQuantity.quantity}
									</p>
									<button
										className='flex justify-center items-center size-12 border-2 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-full cursor-pointer select-none transition'
										name='plusButton'
										onClick={articleHandler}
									>
										+
									</button>
								</div>
							</div>

							<button
								className='bg-[#491718] active:opacity-80 sm:hover:opacity-80 sm:active:opacity-90 text-[#d2a772] font-semibold p-4 rounded-2xl w-full'
								onClick={addToCart}
							>
								Agregar al carrito
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
