import { GetServerSideProps } from 'next';
import { AsideLayout } from '@/components/cms/AsideLayout';
import Image from 'next/image';
import { Product } from '@/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
	initialProducts: Product[];
}

const inititalState = {
	id: '',
	name: '',
	description: '',
	price: 0,
	product: '',
	image: '',
	width: '',
};

export default function BurgersPage({ initialProducts }: Props) {
	const [modalIsOpen, setModalIsOpen] = useState<Product>(inititalState);
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const router = useRouter();

	// const fetchNewProducts = async () => {
	// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
	// 	const newProducts = await res.json();
	// 	setProducts(newProducts);
	// };

	const fetchNewProducts = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/products`
			);
			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			const newProducts = await res.json();
			setProducts(newProducts);
		} catch (error) {
			console.error('Fetch error:', error);
		}
	};

	useEffect(() => {
		fetchNewProducts();
	}, []);

	const burgers = Array.isArray(products)
		? products.filter((product) => product.product === 'burger')
		: [];

	return (
		<AsideLayout
			closeModal={() => {
				fetchNewProducts();
				setModalIsOpen(inititalState);
			}}
			modalIsOpen={modalIsOpen}
		>
			<h3 className='my-4 sm:mt-0 sm:mb-4 font-semibold text-2xl'>BURGERS</h3>

			<ul>
				{router.pathname === '/admin/burgers' && burgers.length > 0 ? (
					burgers.map((burger) => (
						<li className='relative' key={burger.id}>
							<Link
								className='relative flex justify-between items-center bg-[#d2a772] hover:bg-opacity-50 active:bg-opacity-50 sm:active:bg-opacity-20 shadow-md w-full p-4 mb-2 rounded-xl cursor-pointer transition-all'
								href={`/admin/edit-product/${burger.id}`}
							>
								<div className='flex items-center'>
									<div className='size-32 sm:size-36 mr-4 rounded-xl bg-[#491718] flex justify-center items-center'>
										<Image
											src={burger.image}
											alt={burger.name}
											className='custom-shadow object-cover'
											style={{ width: `${burger.width}px` }}
											width={500}
											height={400}
										/>
									</div>

									<div>
										<p className='font-semibold text-lg text-start'>
											{burger.name}
										</p>
										<p className='flex w-40 sm:w-full justify-start text-sm sm:text-medium mr-12'>
											{burger.description}
										</p>
										<p className='font-semibold text-[#491718]'>
											${burger.price}
										</p>
									</div>
								</div>
							</Link>

							<button
								className='absolute right-4 top-1/2 transform -translate-y-1/2 flex ml-4 p-2 rounded-xl  cursor-pointer bg-black bg-opacity-0 active:bg-opacity-15 sm:active:bg-opacity-15 sm:hover:bg-opacity-10'
								onClick={() => setModalIsOpen(burger)}
							>
								<FontAwesomeIcon
									className='size-7  transition-all'
									icon={faTrash}
								/>
							</button>
						</li>
					))
				) : (
					<li className='opacity-50'>No existen burgers creados.</li>
				)}
			</ul>
		</AsideLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch('http://localhost:3000/api/products');
	// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
	const initialProducts = await res.json();

	return {
		props: { initialProducts },
	};
};
