import { Product } from '@/interfaces';
import DeleteModal from '../DeleteModal';
import Aside from './Aside';
import tbt_logo from '../../../public/assets/tbt-logo.jpg';
import Link from 'next/link';
import Image from 'next/image';

interface AsideLayoutProps {
	modalIsOpen?: Product;
	closeModal?: () => void;
	children: JSX.Element | JSX.Element[];
}

export const AsideLayout = ({
	children,
	modalIsOpen,
	closeModal,
}: AsideLayoutProps) => {
	return (
		<div className='flex justify-center min-h-screen'>
			<div className='flex-row sm:flex bg-black/10 max-w-7xl w-full min-h-full items-center rounded-xl p-2 m-2 sm:p-4'>
				<div className='sm:hidden flex-col w-full bg-[#d2a772] shadow-md rounded-xl p-4'>
					<div className='flex justify-center items-center'>
						<Link href='/'>
							<Image
								src={tbt_logo}
								className='size-20 cursor-pointer rounded-full'
								alt='evolve'
							/>
						</Link>

						<h2 className='font-bold text-xl sm:text-2xl ml-4'>
							THE BURGER TOWN
						</h2>
					</div>
				</div>

				<Aside />
				<section className='sm:h-full w-full ml-0 sm:ml-4'>{children}</section>
			</div>

			<div className={modalIsOpen?.id ? 'fixed w-full' : 'hidden'}>
				<DeleteModal closeModal={closeModal} modalIsOpen={modalIsOpen} />
			</div>
		</div>
	);
};
