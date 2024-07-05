'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import american_burger from '../../public/assets/american-burger.jpg';
import { createOrder } from '@/actions/orders-actions';
import { useRef } from 'react';

interface CartProps {
	closeModal: () => void;
}

export const Cart = ({ closeModal }: CartProps) => {
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<div className='flex justify-center items-center bg-black/60 backdrop-blur-sm h-screen max-w-screen'>
			<div className='relative justify-center text-center bg-[#b89061] w-2/5 p-6 rounded-3xl'>
				<div>
					<button className='flex' onClick={closeModal}>
						<FontAwesomeIcon
							className='absolute top-6 right-6 w-8 h-8 hover:opacity-80 active:opacity-60 cursor-pointer'
							icon={faCircleXmark}
						/>
					</button>

					<h3 className='text-2xl font-bold pb-6'>PEDIDO</h3>

					<div className='flex justify-center'>
						<ul className='w-3/4'>
							<li className='flex justify-between items-center'>
								<div className='flex items-center'>
									<Image
										src={american_burger}
										className='w-36 mr-6 cursor-pointer rounded-2xl'
										alt='evolve'
									/>

									<div>
										<p className='font-semibold text-lg'>American burger</p>
										<p>Cantidad: 1 x $9.500</p>
									</div>
								</div>

								<FontAwesomeIcon
									className='h-6 hover:opacity-80 active:opacity-60 cursor-pointer'
									icon={faTrash}
								/>
							</li>

							<li className='my-4 font-medium text-[#491718]'>
								<p>Subtotal: $9.500</p>
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
							className='p-2 w-3/4 rounded-xl bg-[#d2a772] placeholder:text-black/60 mb-2 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
							type='text'
							name='orderName'
							placeholder='Nombre'
						/>

						<select
							className='p-2 w-3/4 rounded-xl bg-[#d2a772] mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
							name='orderPayment'
						>
							<option className='text-black/60' value='metodo'>
								Método de pago
							</option>
							<option value='efectivo'>Efectivo</option>
							<option value='tranferencia'>Transferencia</option>
						</select>

						<select
							className='p-2 w-3/4 rounded-xl bg-[#d2a772] mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
							name='orderDispatch'
						>
							<option className='text-black/60' value='envio/retiro'>
								Envio / Retiro
							</option>
							<option value='envio'>Quiero que me lo envien</option>
							<option value='retiro'>Lo retiro yo mismo</option>
						</select>

						<textarea
							className='p-2 w-3/4 rounded-xl bg-[#d2a772] placeholder:text-black/60 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
							name='orderNote'
							placeholder='¿ Alguna observación ?'
						></textarea>

						<div className='flex justify-center font-bold text-2xl my-4'>
							<p>Total:</p>
							<p className='text-[#491718] ml-2'>$9.500</p>
						</div>

						<button className='bg-[#491718] hover:opacity-80 active:opacity-60 text-[#d2a772] font-semibold p-4 rounded-2xl'>
							Enviar pedido
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
