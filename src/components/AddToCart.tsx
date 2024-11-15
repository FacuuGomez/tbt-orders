import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Product, Order, Article } from '@/interfaces';
import Image from 'next/image';
import chesse from '@/../../public/assets/chesse-burger.jpg';
import american from '@/../../public/assets/american-burger.jpg';
import bbq from '@/../../public/assets/burger-bbq.jpg';
import fourquesos from '@/../../public/assets/burger-4-quesos.jpg';

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
	price?: number;
}

// type SizeBurger = 'SIMPLE' | 'DOBLE' | 'TRIPLE';

const initialQuantity = {
	name: '',
	size: '',
	quantity: 0,
	price: 0,
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

			const existingArticleIndex = articleList.findIndex(
				(article) =>
					article.name === articleQuantity.name &&
					article.size === articleQuantity.size
			);

			if (existingArticleIndex !== -1) {
				const updatedArticleList = articleList.map((article, index) =>
					index === existingArticleIndex
						? {
								...article,
								quantity: article.quantity + articleQuantity.quantity,
						  }
						: article
				);
				setArticleList(updatedArticleList);
			} else {
				setArticleList([
					...articleList,
					{
						name: modalIsOpen?.name,
						price: articleQuantity.price,
						size: articleQuantity.size,
						quantity: articleQuantity.quantity,
						product: modalIsOpen?.product,
						image: modalIsOpen?.image,
						width: modalIsOpen?.width,
					},
				]);
			}
		}

		setArticleQuantity({
			...articleQuantity,
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
		if (articleQuantity.price === undefined) {
			setArticleQuantity({
				...articleQuantity,
				price: modalIsOpen?.price ?? 0,
			});
		} else if (articleQuantity.size === 'Simple') {
			setArticleQuantity({
				...articleQuantity,
				price: modalIsOpen?.price,
			});
		} else if (articleQuantity.size === 'Doble') {
			setArticleQuantity({
				...articleQuantity,
				price: modalIsOpen?.price && modalIsOpen?.price + 1000,
			});
		} else if (articleQuantity.size === 'Triple') {
			setArticleQuantity({
				...articleQuantity,
				price: modalIsOpen?.price && modalIsOpen?.price + 2000,
			});
		}
	}, [articleQuantity.size]);

	useEffect(() => {
		setArticleQuantity({
			...articleQuantity,
			price: modalIsOpen?.price,
		});
	}, [modalIsOpen]);

	useEffect(() => {
		setArticleQuantity({
			...articleQuantity,
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
						className='relative text-center  bg-[#d2a772]  m-4 md:max-w-2xl w-full rounded-3xl'
					>
						<button
							className='flex absolute top-4 right-4 z-20'
							onClick={closeModal}
						>
							<FontAwesomeIcon
								className=' size-8 hover:text-[#3a1212] active:text-[#491718] cursor-pointer'
								icon={faCircleXmark}
							/>
						</button>

						{modalIsOpen.name === 'Chesse Burger' && (
							<Image
								src={chesse}
								alt='Chesse Burger'
								width={500}
								height={400}
								className='w-full sm:h-96 object-cover rounded-t-3xl z-10 '
								// className='absolute top-0 w-full h-96 object-cover rounded-t-3xl z-10 '
							/>
						)}
						{modalIsOpen.name === 'American Burger' && (
							<Image
								src={american}
								alt='American Burger'
								width={500}
								height={400}
								className='w-full sm:h-96 object-cover rounded-t-3xl z-10 '
							/>
						)}
						{modalIsOpen.name === 'Burger BBQ' && (
							<Image
								src={bbq}
								alt='Burger BBQ'
								width={500}
								height={400}
								className='w-full sm:h-96 object-cover rounded-t-3xl z-10 '
							/>
						)}
						{modalIsOpen.name === 'Burger 4 Quesos' && (
							<Image
								src={fourquesos}
								alt='Burger 4 Quesos'
								width={500}
								height={400}
								className='w-full sm:h-96 object-cover rounded-t-3xl z-10 '
							/>
						)}

						<div className='flex flex-col justify-end gap-6 h-full p-4'>
							<h3 className='text-xl font-semibold'>{modalIsOpen.name}</h3>

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
										Simple - $9000
									</option>
									<option className='text-black' value='Doble'>
										Doble - $10000
									</option>
									<option className='text-black' value='Triple'>
										Triple - $11000
									</option>
								</select>
							)}

							<div className='flex justify-between items-center'>
								<p className='items-center mr-4 font-semibold sm:text-lg text-[#491718]'>
									$
									{articleQuantity.quantity === 0 ? '0' : articleQuantity.price}
									{articleQuantity.quantity > 1 &&
										` x ${articleQuantity.quantity} = $${
											articleQuantity.price &&
											articleQuantity.price * articleQuantity.quantity
										}`}
								</p>

								<div className='grid grid-cols-3 justify-center w-40 h-10 text-xl font-semibold'>
									<button
										className='flex justify-center items-center border-2 size-10 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-full cursor-pointer select-none transition '
										name='minusButton'
										onClick={articleHandler}
									>
										-
									</button>
									<p
										className={`flex justify-center items-center rounded-full border-2 border-[#491718] size-10 cursor-default select-none ${
											articleQuantity.quantity && 'bg-[#491718] text-white'
										}`}
									>
										{articleQuantity.quantity}
									</p>
									<button
										className='flex justify-center items-center size-10 border-2 border-[#491718] hover:none md:hover:bg-[#491718] md:hover:text-white active:hover:text-white active:bg-[#491718] md:active:opacity-70 rounded-full cursor-pointer select-none transition'
										name='plusButton'
										onClick={articleHandler}
									>
										+
									</button>
								</div>
							</div>

							<button
								className='bg-[#491718] hover:bg-[#3a1212] active:bg-[#491718] text-[#d2a772] font-semibold p-4 rounded-2xl w-full'
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
