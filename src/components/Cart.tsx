import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import american_burger from '../../public/assets/american-burger.jpg';

export const Cart = () => {
	return (
		<div className='flex justify-center items-center bg-black/60 backdrop-blur-sm h-screen max-w-screen'>
			<div className='relative justify-center text-center bg-[#b89061] w-2/5 p-6 rounded-3xl'>
				<div>
					<FontAwesomeIcon
						className='absolute top-6 right-6 w-8 hover:opacity-80 active:opacity-60 cursor-pointer'
						icon={faCircleXmark}
					/>

					<h3 className='text-2xl font-bold pb-6'>PEDIDO</h3>

					<ul>
						<li className='flex items-center'>
							<Image
								src={american_burger}
								className='w-36 mr-6 cursor-pointer rounded-2xl'
								alt='evolve'
							/>

							<div>
								<p className='font-semibold text-lg'>American burger</p>
								<p>Cantidad: 1 x $9.500</p>
							</div>
						</li>

						<li className='my-4 font-medium text-[#491718]'>
							<p>Subtotal: $9.500</p>
						</li>
					</ul>

					<hr className='border-2 border-[#491718] rounded-full' />

					<form className='flex-col my-4'>
						<input
							className='p-2 w-3/4 rounded-xl bg-[#d2a772] placeholder:text-black/60 mb-2 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
							type='text'
							placeholder='Nombre'
						/>

						<select
							className='p-2 w-3/4 rounded-xl bg-[#d2a772] mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
							name='select'
						>
							<option className='text-black/60' value='metodo'>
								Método de pago
							</option>
							<option value='efectivo'>Efectivo</option>
							<option value='tranferencia'>Transferencia</option>
						</select>

						<select
							className='p-2 w-3/4 rounded-xl bg-[#d2a772] mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
							name='select'
						>
							<option className='text-black/60' value='envio/retiro'>
								Envio / Retiro
							</option>
							<option value='envio'>Quiero que me lo envien</option>
							<option value='retiro'>Lo retiro yo mismo</option>
						</select>

						<textarea
							className='p-2 w-3/4 rounded-xl bg-[#d2a772] placeholder:text-black/60 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
							name='textarea'
							placeholder='¿ Alguna observación ?'
						></textarea>
					</form>

					<div className='flex justify-center font-bold text-2xl mb-4'>
						<p>Total:</p>
						<p className='text-[#491718] ml-2'>$9.500</p>
					</div>

					<button className='bg-[#491718] hover:opacity-80 active:opacity-60 text-[#d2a772] font-semibold p-4 rounded-2xl'>
						Enviar pedido
					</button>
				</div>
			</div>
		</div>
	);
};
