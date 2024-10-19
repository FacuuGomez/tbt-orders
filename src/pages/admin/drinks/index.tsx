import { GetServerSideProps } from 'next';
import { AsideLayout } from '@/components/cms/AsideLayout';
import Image from 'next/image';
import cheese_burger from '../../../../public/assets/cheese-burger.jpg';
import { Product } from '@/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
	products: Product[];
}

const inititalState = {
	id: '',
	name: '',
	description: '',
	price: 0,
	product: '',
};

export default function BurgersPage({ products }: Props) {
	const [modalIsOpen, setModalIsOpen] = useState<Product>(inititalState);
	const router = useRouter();

	// const drinks =
	// 	products && products.filter((product) => product.product === 'drink');
	const drinks = Array.isArray(products)
		? products.filter((product) => product.product === 'drink')
		: [];

	return (
		<AsideLayout
			closeModal={() => setModalIsOpen(inititalState)}
			modalIsOpen={modalIsOpen}
		>
			<h3 className='my-4 sm:mt-0 sm:mb-4 font-semibold text-2xl'>BEBIDAS</h3>

			<ul>
				{router.pathname === '/admin/drinks' && drinks.length > 0 ? (
					drinks.map((drink) => (
						<li className='relative' key={drink.id}>
							<Link
								className='relative flex justify-between items-center bg-[#d2a772] hover:bg-opacity-50 active:bg-opacity-50 sm:active:bg-opacity-20 shadow-md w-full p-4 mb-2 rounded-xl cursor-pointer transition-all'
								href={`/admin/edit-product/${drink.id}`}
							>
								<div className='flex items-center'>
									<Image
										src={cheese_burger}
										className='w-20 sm:w-28 mr-4 cursor-pointer rounded-2xl'
										alt='American burger'
										width={90}
										height={90}
									/>

									<div>
										<p className='font-semibold text-lg text-start'>
											{drink.name}
										</p>
										<p className='flex justify-start text-sm sm:text-medium'>
											{drink.description}
										</p>
										<p className='font-semibold text-[#491718]'>
											${drink.price}
										</p>
									</div>
								</div>
							</Link>

							<button
								className='absolute right-4 top-1/2 transform -translate-y-1/2 flex ml-4 p-2 rounded-xl  cursor-pointer bg-black bg-opacity-0 active:bg-opacity-15 sm:active:bg-opacity-15 sm:hover:bg-opacity-10'
								onClick={() => setModalIsOpen(drink)}
							>
								<FontAwesomeIcon
									className='size-7  transition-all'
									icon={faTrash}
								/>
							</button>
						</li>
					))
				) : (
					<li className='opacity-50'>No existen bebidas creados.</li>
				)}
			</ul>
		</AsideLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	// const res = await fetch('http://localhost:3000/api/products');
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);

	const products = await res.json();

	return {
		props: { products },
	};
};
