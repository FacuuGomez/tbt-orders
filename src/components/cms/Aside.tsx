import Image from 'next/image';
import tbt_logo from '../../../public/assets/tbt-logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBurger,
	faBeerMugEmpty,
	faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Aside() {
	const router = useRouter();

	return (
		<aside className='fixed sm:static bottom-2 left-2 right-2 z-2 w-auto bg-[#d2a772] shadow-md sm:w-60 p-2 sm:p-4 rounded-xl sm:rounded-xl flex justify-center items-center sm:h-full  sm:flex-col'>
			{/* <aside className='bg-[#d2a772] shadow-md sm:w-60 p-2 sm:p-4 rounded-xl sm:rounded-xl flex justify-center items-center sm:h-full  sm:flex-col'> */}
			<div className='w-full hidden sm:flex justify-start sm:justify-center'>
				<Link href='/'>
					<Image
						src={tbt_logo}
						className='size-20 sm:size-28 cursor-pointer rounded-full'
						alt='evolve'
					/>
				</Link>
			</div>

			<div className='flex justify-center sm:justify-between sm:flex-col sm:flex-1 w-full sm:mt-4'>
				<ul className='flex gap-4 sm:block items-center'>
					<li className='flex justify-center sm:justify-start'>
						<button
							className='font-semibold text-lg inline-flex h-full cursor-pointer items-center ml-2 sm:ml-0 bg-black bg-opacity-0 active:bg-opacity-10 sm:active:bg-opacity-15 sm:hover:bg-opacity-10 w-full p-2 rounded-xl'
							name='burgers'
							onClick={() => router.push('/admin/burgers')}
						>
							<FontAwesomeIcon className='size-8' icon={faBurger} />
							<p className='hidden sm:flex ml-2'>BURGERS</p>
						</button>
					</li>
					<button className='flex justify-center ml-2 sm:ml-0 sm:hidden text-[#491718] hover:text-[#3a1212] active:text-[#3a1212]'>
						<FontAwesomeIcon
							className='size-10'
							icon={faCirclePlus}
							onClick={() => router.push('/admin/new-product')}
						/>
					</button>
					<li className='flex justify-center sm:justify-start'>
						<button
							className='font-semibold text-lg inline-flex h-full cursor-pointer items-center ml-2 sm:ml-0 bg-black bg-opacity-0 active:bg-opacity-10 sm:active:bg-opacity-15 sm:hover:bg-opacity-10 w-full p-2 rounded-xl'
							name='drinks'
							onClick={() => router.push('/admin/drinks')}
						>
							<FontAwesomeIcon className='size-8' icon={faBeerMugEmpty} />
							<p className='hidden sm:flex ml-2'>BEBIDAS</p>
						</button>
					</li>
				</ul>

				<button
					className='hidden sm:flex sm:justify-center p-2 rounded-xl bg-[#491718] hover:bg-[#3a1212] active:bg-[#491718] text-[#d2a772] w-full font-semibold'
					onClick={() => router.push('/admin/new-product')}
				>
					Crear producto
				</button>
			</div>
		</aside>
	);
}

export default Aside;
