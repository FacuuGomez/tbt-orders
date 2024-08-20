import Image from 'next/image';
import schneider from '../../../public/assets/schneider.jpg';

function DrinksList() {
	return (
		<>
			<h3 className='mb-4 font-semibold text-2xl'>BEBIDAS</h3>

			<div className='bg-[#d2a772] shadow-md w-full p-4 rounded-xl'>
				<li className='flex justify-between items-center mb-2 mr-[6px]'>
					<div className='flex items-center'>
						<Image
							src={schneider}
							className='w-20 sm:w-28 mr-4 cursor-pointer rounded-2xl'
							alt='American burger'
							width={90}
							height={90}
						/>

						<div>
							<p className='font-semibold text-lg text-start'>Schneider</p>
						</div>
					</div>

					<p className='flex justify-center items-center md:pb-2 font-medium text-[#491718]'>
						$2.500
					</p>
				</li>
			</div>
		</>
	);
}

export default DrinksList;
