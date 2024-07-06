'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import american_burger from '../../public/assets/american-burger.jpg';
import cheese_burger from '../../public/assets/cheese-burger.jpg';
import { createOrder } from '@/actions/orders-actions';
import { useEffect, useRef } from 'react';

interface CartProps {
	closeModal: () => void;
	order: Order;
}

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

export const Cart = ({ closeModal, order }: CartProps) => {
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		console.log('cart', order);
	});

	return (
		<div className='flex justify-center items-center bg-black/60 backdrop-blur-sm h-screen max-w-screen'>
			<div className='relative justify-center text-center bg-[#b89061] mx-5 md:max-w-2xl w-full p-6 rounded-3xl'>
				<div>
					<button className='flex' onClick={closeModal}>
						<FontAwesomeIcon
							className='absolute top-6 right-6 w-8 h-8 hover:opacity-80 active:opacity-60 cursor-pointer'
							icon={faCircleXmark}
						/>
					</button>

					<h3 className='text-2xl font-bold pb-6'>PEDIDO</h3>

					<div className='flex justify-center'>
						<ul className='w-full'>
							{!order.totalBurgers ? (
								<li className='text-2xl'>No hay pedidos cargados.</li>
							) : (
								order.burgers.map((burger) => (
									<li
										className='flex justify-between items-center mb-2'
										key={burger.name}
									>
										<div className='flex items-center'>
											{burger.name === 'American' ? (
												<Image
													src={american_burger}
													className='w-24 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
													alt='evolve'
												/>
											) : (
												<Image
													src={cheese_burger}
													className='w-24 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
													alt='evolve'
												/>
											)}

											<div>
												<p className='font-semibold text-lg text-start'>
													{burger.name} burger
												</p>
												<p>
													Cantidad: {burger.quantity} x ${burger.price}
												</p>
											</div>
										</div>

										<FontAwesomeIcon
											className='h-6 hover:opacity-80 active:opacity-60 cursor-pointer'
											icon={faTrash}
										/>
									</li>
								))
							)}

							<li className='my-4 font-medium text-[#491718]'>
								<p>Subtotal: ${order.totalAmount}</p>
							</li>
						</ul>
					</div>

					<hr className='border-2 border-[#491718] rounded-full' />

					<form
						className='flex-col my-4'
						ref={formRef}
						action={async (formData) => {
							const order = await createOrder(formData);

							console.log(order);

							formRef.current?.reset();
						}}
					>
						<input
							className='p-2 w-full rounded-xl bg-[#d2a772] placeholder:text-black/60 mb-2 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
							type='text'
							name='orderName'
							placeholder='Nombre'
						/>

						<select
							className='p-2 w-full rounded-xl bg-[#d2a772] mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
							name='orderPayment'
						>
							<option className='text-black/60' value='metodo'>
								Método de pago
							</option>
							<option value='efectivo'>Efectivo</option>
							<option value='tranferencia'>Transferencia</option>
						</select>

						<select
							className='p-2 w-full rounded-xl bg-[#d2a772] mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
							name='orderDispatch'
						>
							<option className='text-black/60' value='envio/retiro'>
								Envio / Retiro
							</option>
							<option value='envio'>Quiero que me lo envien</option>
							<option value='retiro'>Lo retiro yo mismo</option>
						</select>

						<textarea
							className='p-2 w-full rounded-xl bg-[#d2a772] placeholder:text-black/60 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
							name='orderNote'
							placeholder='¿ Alguna observación ?'
						></textarea>

						<div className='flex justify-center font-bold text-2xl my-4'>
							<p>Total:</p>
							<p className='text-[#491718] ml-2'>${order.totalAmount}</p>
						</div>

						<button className='bg-[#491718] hover:opacity-80 active:opacity-60 text-[#d2a772] font-semibold p-4 rounded-2xl w-full'>
							Enviar pedido
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
