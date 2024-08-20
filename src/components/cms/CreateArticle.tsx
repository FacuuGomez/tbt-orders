import Image from 'next/image';
import cheese_burger from '../../../public/assets/cheese-burger.jpg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';

function CreateArticle() {
	return (
		<>
			<h3 className='mb-4 font-medium text-2xl'>Crear artículo</h3>

			<form className='bg-[#d2a772] shadow-md w-full p-4 rounded-xl' action=''>
				<div className='flex items-center w-full mb-6'>
					<Image
						src={cheese_burger}
						className='w-20 sm:w-44 cursor-pointer mr-4 rounded-2xl bg-violet-400'
						alt='American burger'
						width={90}
						height={90}
					/>

					<div>
						<p>Nombre:</p>
						<p>Descripción:</p>
						<p>Artículo:</p>
					</div>
				</div>

				<input
					className='w-full mb-2 p-2 rounded-xl bg-black bg-opacity-5 placeholder:text-black/60 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
					name='name'
					type='text'
					placeholder='Nombre'
				/>
				<input
					className='w-full mb-2 p-2 rounded-xl bg-black bg-opacity-5 placeholder:text-black/70 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
					name='price'
					type='text'
					placeholder='Precio'
				/>

				<select
					className='w-full mb-2 p-2 rounded-xl bg-black bg-opacity-5 placeholder:text-black/70 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
					name='articleType'
				>
					<option
						className='text-black/60'
						value='Método de pago'
						// defaultValue
						disabled
					>
						Artículo
					</option>
					<option value='burger'>Burger</option>
					<option value='drink'>Bebida</option>
				</select>

				<textarea
					className='w-full p-2 rounded-xl bg-black bg-opacity-5 placeholder:text-black/70 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
					name='description'
					placeholder='Descripción'
				></textarea>

				<div className='flex justify-between mt-6'>
					<p className='font-bold text-2xl text-[#491718]'>$0</p>
					<div className='flex'>
						<button className='grid items-center text-[#491718] bg-black bg-opacity-0 active:bg-opacity-10 sm:hover:bg-opacity-10 font-semibold px-4 py-2 rounded-xl'>
							Limpiar
						</button>
						<button className='bg-green-600 active:bg-green-700 sm:hover:bg-green-700 text-[#d2a772] px-4 py-2 font-semibold rounded-xl ml-2'>
							Crear
						</button>
					</div>
				</div>
			</form>
		</>
	);
}

export default CreateArticle;
