import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Product } from '@/interfaces';
import { AsideLayout } from '@/components/cms/AsideLayout';
import { useRouter } from 'next/router';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/utils/firebase/index';
import { deleteFile } from '@/utils/firebase/deleteFile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

type ChangeInputHandler = ChangeEvent<
	HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

const inititalState = {
	id: '',
	name: '',
	description: '',
	price: 0,
	product: '',
	image: '',
	width: '50',
};

export default function NewProduct() {
	const [product, setProduct] = useState<Product>(inititalState);
	const [confirm, setConfirm] = useState(false);
	const [changeImage, setChangeImage] = useState({
		old: '',
		new: '',
	});
	const router = useRouter();

	const createProduct = async (product: Product) =>
		await fetch('http://localhost:3000/api/products', {
			// await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
			method: 'POST',
			body: JSON.stringify(product),
			headers: {
				'Content-Type': 'application/json',
			},
		});

	const updateProduct = async (id: string, product: Product) => {
		await fetch('http://localhost:3000/api/products/' + id, {
			// await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/` + id, {
			method: 'PUT',
			body: JSON.stringify(product),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};

	const editProduct = async (id: string) => {
		if (id && !product.id) {
			const res = await fetch('http://localhost:3000/api/products/' + id);
			// const res = await fetch(
			// 	`${process.env.NEXT_PUBLIC_API_URL}/api/products/` + id
			// );
			const product = await res.json();
			setProduct({
				id,
				name: product.name,
				description: product.description,
				price: product.price,
				product: product.product,
				image: product.image,
				width: product.width,
			});
			setChangeImage({ ...changeImage, old: product.image });
		}
	};

	const handleChange = async ({ target }: ChangeInputHandler) => {
		const { name } = target;

		if (target instanceof HTMLInputElement) {
			if (name === 'image' && target.files && target.files.length > 0) {
				const file = target.files[0];
				const timestamp = Date.now();
				const storageRef = ref(storage, `${timestamp}-${file.name}`);

				await uploadBytes(storageRef, file); // Cargar la imagen a Firebase Storage
				const downloadURL = await getDownloadURL(storageRef); // Obtener la URL de descarga

				setChangeImage({ ...changeImage, new: downloadURL });
				setProduct({ ...product, [name]: downloadURL }); // Usa la URL de Firebase
			} else if (name === 'price') {
				setProduct({ ...product, [name]: parseFloat(target.value) || 0 });
			} else {
				setProduct({ ...product, [name]: target.value });
			}
		} else {
			setProduct({ ...product, [name]: target.value });
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			// CORREGIR
			if (product.name && product.product && product.price) {
				if (typeof router.query.id === 'string') {
					updateProduct(router.query.id, product);
				} else {
					createProduct(product);
				}

				if (changeImage.old) {
					await deleteFile(changeImage.old);
					setChangeImage({ ...changeImage, old: '' });
				}

				router.push(`/admin/${product.product}s`);
				setConfirm(true);
				setProduct(inititalState);
			}
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

	// useEffect(() => {
	// 	return () => {
	// 		if (!confirm) {
	// 			console.log('demonta', changeImage);

	// 			if (changeImage.old && changeImage.new) {
	// 				deleteFile(changeImage.new);
	// 				setChangeImage({ ...changeImage, new: '' });
	// 			}

	// 			setConfirm(false);
	// 		}
	// 	};
	// }, [confirm, changeImage]);

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
					<div>
						<div className='relative size-32 sm:size-36 mr-8 rounded-xl bg-[#491718] flex justify-center items-center'>
							{product.image ? (
								<div>
									<Image
										src={product.image}
										alt={product.name}
										className='custom-shadow object-cover'
										style={{ width: `${product.width}px` }}
										width={500}
										height={400}
									/>
								</div>
							) : (
								<p className='text-center text-[#d2a772] m-2'>Cargar imágen</p>
							)}

							<label className='absolute -top-2 -right-5'>
								<input
									type='file'
									name='image'
									onChange={handleChange}
									className='hidden'
								/>
								<FontAwesomeIcon
									className='size-5 bg-blue-600 p-3 rounded-full active:bg-blue-700 sm:hover:bg-blue-700 sm:active:bg-blue-600 text-[#d2a772] cursor-pointer'
									icon={faPenToSquare}
								/>
							</label>
						</div>
					</div>

					<ul>
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
						<li className=' gap-2 w-full'>
							<p className='font-semibold inline-flex mr-2'>Descripción:</p>
							<p className='inline-flex'>{product.description}</p>
						</li>
						<li className='flex'>
							<p className='font-semibold inline-flex mr-2'>Imágen:</p>
							<input
								type='range'
								min='0'
								max='100'
								value={product.width}
								name='width'
								onChange={handleChange}
								className=' mt-2 h-2 bg-[#491718] rounded-full  cursor-pointer range-slider'
							/>
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
