import Image from 'next/image';
import cheese_burger from '../../../../public/assets/cheese-burger.jpg';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Product } from '@/interfaces';
import { AsideLayout } from '@/components/cms/AsideLayout';
import { useRouter } from 'next/router';

type ChangeInputHandler = ChangeEvent<
	HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

const inititalState = {
	id: '',
	name: '',
	description: '',
	price: 0,
	product: '',
};

export default function NewProduct() {
	const [product, setProduct] = useState<Product>(inititalState);
	const router = useRouter();

	const createProduct = async (product: Product) =>
		// await fetch('http://localhost:3000/api/products', {
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
			method: 'POST',
			body: JSON.stringify(product),
			headers: {
				'Content-Type': 'application/json',
			},
		});

	const updateProduct = async (id: string, product: Product) =>
		// await fetch('http://localhost:3000/api/products/' + id, {
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products` + id, {
			method: 'PUT',
			body: JSON.stringify(product),
			headers: {
				'Content-Type': 'application/json',
			},
		});

	const editProduct = async (id: string) => {
		// const res = await fetch('http://localhost:3000/api/products/' + id);
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/products` + id
		);
		const product = await res.json();
		setProduct({
			id,
			name: product.name,
			description: product.description,
			price: product.price,
			product: product.product,
		});
	};

	const handleChange = ({ target: { name, value } }: ChangeInputHandler) => {
		setProduct({ ...product, [name]: value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (typeof router.query.id === 'string') {
				updateProduct(router.query.id, product);
			} else {
				createProduct(product);
			}
			router.push(`/admin/${product.product}s`);
			setProduct(inititalState);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (typeof router.query.id === 'string') {
			editProduct(router.query.id);
		} else {
			setProduct(inititalState);
		}
	}, [router]);

	return (
		<AsideLayout>
			{typeof router.query.id === 'string' ? (
				<h3 className='my-4 sm:mt-0 sm:mb-4 font-bold text-2xl'>
					EDITAR PRODUCTO
				</h3>
			) : (
				<h3 className='my-4 sm:mt-0 sm:mb-4 font-bold text-2xl'>
					CREAR PRODUCTO
				</h3>
			)}

			<form
				className='bg-[#d2a772] shadow-md w-full p-4 rounded-xl'
				onSubmit={handleSubmit}
			>
				<div className='flex items-center w-full mb-6'>
					<Image
						src={cheese_burger}
						className='size-28 sm:size-36 cursor-pointer mr-4 rounded-2xl bg-violet-400'
						alt='American burger'
					/>

					<ul className='w-full'>
						<li className='flex gap-2'>
							<p className='font-semibold'>Nombre:</p>
							<p>{product.name}</p>
						</li>
						<li className='flex gap-2'>
							<p className='font-semibold'>Producto:</p>
							<p>
								{product.product
									? product.product[0].toUpperCase() + product.product.slice(1)
									: ''}
							</p>
						</li>
						<li className='flex-col sm:flex-col gap-2 w-full'>
							<p className='font-semibold inline-flex '>Descripción:</p>
							<p className='inline-flex sm:ml-2'>{product.description}</p>
						</li>
					</ul>
				</div>

				<input
					className='w-full mb-2 p-2 rounded-xl bg-black bg-opacity-5 placeholder:text-black/60 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
					type='text'
					placeholder='Nombre'
					name='name'
					onChange={handleChange}
					value={product.name}
				/>
				<input
					className='w-full mb-2 p-2 rounded-xl bg-black bg-opacity-5 placeholder:text-black/70 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
					type='text'
					placeholder='Precio'
					name='price'
					onChange={handleChange}
					value={product.price}
				/>

				<select
					className='w-full mb-2 p-2 rounded-xl bg-black bg-opacity-5 placeholder:text-black/70 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
					name='product'
					onChange={handleChange}
					value={product.product}
				>
					<option className='text-black/60' value='' disabled>
						Producto
					</option>
					<option value='burger'>Burger</option>
					<option value='drink'>Bebida</option>
				</select>

				<textarea
					className='w-full h-28 p-2 rounded-xl bg-black bg-opacity-5 placeholder:text-black/70 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
					name='description'
					placeholder='Descripción'
					onChange={handleChange}
					value={product.description}
				></textarea>

				<div className='flex justify-between mt-6'>
					<p className='flex items-center font-bold text-2xl text-[#491718]'>
						${product.price}
					</p>
					<div className='flex'>
						<button
							className='grid items-center text-[#491718] bg-black bg-opacity-0 sm:hover:bg-opacity-10 active:bg-opacity-10 sm:active:bg-opacity-15 font-semibold px-4 py-2 rounded-xl transition-all'
							type='button'
							onClick={() => setProduct(inititalState)}
						>
							Limpiar
						</button>

						<button
							className='bg-green-600 active:bg-green-700 sm:hover:bg-green-700 text-[#d2a772] px-4 py-2 font-semibold rounded-xl ml-2 transition-all'
							type='submit'
						>
							{router.query.id ? <p>Editar</p> : <p>Crear</p>}
						</button>
					</div>
				</div>
			</form>
		</AsideLayout>
	);
}
