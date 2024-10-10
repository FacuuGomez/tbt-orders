import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Product } from '@/interfaces';

interface DeleteModalProps {
	modalIsOpen?: Product;
	closeModal?: () => void;
}

export default function DeleteModal({
	closeModal,
	modalIsOpen,
}: DeleteModalProps) {
	const router = useRouter();

	const handleDelete = async (id: string) => {
		try {
			await fetch('http://localhost:3000/api/products/' + id, {
				method: 'DELETE',
			});
			router.push(`/admin/${modalIsOpen?.product}s`);
			closeModal?.();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex justify-center items-center bg-black/60 backdrop-blur-sm h-screen max-w-screen'>
			<AnimatePresence>
				{modalIsOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.2,
							delay: 0.1,
							ease: [0, 0.71, 0.2, 1.01],
						}}
						exit={{ opacity: 0, scale: 0 }}
						className='relative justify-center text-center bg-[#d2a772] m-5 md:max-w-2xl w-full p-6 rounded-3xl'
					>
						<p className='sm:flex justify-center gap-1 mb-4 text-lg'>
							¿ Borrar
							<span className='font-semibold mx-2 sm:mx-0'>
								{modalIsOpen.name}
							</span>
							de la base de datos?
						</p>

						<div className='flex justify-center gap-2'>
							<button
								className='text-[#491718] bg-black bg-opacity-0 active:bg-opacity-15 sm:active:bg-opacity-15 sm:hover:bg-opacity-10 px-4 py-2 rounded-xl font-semibold transition-all'
								onClick={closeModal}
							>
								Cancelar
							</button>
							<button
								className='text-[#d2a772] bg-red-500 active:bg-red-600 sm:hover:bg-red-600 px-4 py-2 rounded-xl font-semibold transition-all'
								onClick={() => handleDelete(modalIsOpen.id)}
							>
								Borrar
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
