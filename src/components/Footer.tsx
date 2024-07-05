import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import {
	faInstagram,
	faWhatsapp,
	faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import tbt_logo from '../../public/assets/tbt-logo.jpg';

export const Footer = () => {
	return (
		<footer className='flex justify-center bg-[#b89061]'>
			<div className='max-w-7xl w-full'>
				<div className='flex-col justify-center text-center py-5'>
					<div className='flex justify-center items-center'>
						<Image
							src={tbt_logo}
							className='w-20 cursor-pointer rounded-full mr-4'
							alt='evolve'
						/>
					</div>

					<div className='flex-col justify-center mt-4'>
						<div className='z-0'>
							<h3 className='font-bold text-xl'>Horarios de atención</h3>

							<p className='flex justify-center font-medium text-black/80'>
								<FontAwesomeIcon className='h-6 pr-2' icon={faClock} />
								Jueves a Domingos de 20:00HS a 10:30HS
							</p>
						</div>

						<h3 className='font-bold text-xl mt-4'>Ubicación</h3>

						<p className='flex justify-center font-medium text-black/80'>
							<FontAwesomeIcon className='h-6 pr-2' icon={faLocationDot} />9 de
							Julio & Roca
						</p>

						<h3 className='font-bold text-xl mt-4 '>Contactos</h3>

						<a
							className='inline-flex items-center mb-2 mr-4 text-black/80 hover:text-black/100 active:text-black/80 cursor-pointer font-semibold'
							href='https://www.instagram.com/the.burger.town/'
							target='_blank'
						>
							<FontAwesomeIcon className='h-6 mr-2' icon={faInstagram} />
							Instagram
						</a>
						<a
							className='inline-flex items-center pb-2 text-black/80 hover:text-black/100 active:text-black/80 cursor-pointer font-semibold'
							href='https://www.instagram.com/the.burger.town/'
							target='_blank'
						>
							<FontAwesomeIcon className='h-6 mr-2' icon={faWhatsapp} />
							Whatsapp
						</a>
					</div>
				</div>

				<div className='flex-col justify-center'>
					<hr className='border-2 border-[#491718] w-full rounded-full' />

					<div className='max-w-7xl w-full flex justify-between items-center py-2 '>
						<p className='text-sm text-black/80'>© 2024 Geekhound, S.A.S.</p>

						<ul className='flex items-center'>
							<li>
								<FontAwesomeIcon
									className='h-6 text-black/80 hover:text-black/100 active:text-black/80 cursor-pointer'
									icon={faGlobe}
								/>
							</li>
							<li>
								<a href='https://www.instagram.com/geekhound/' target='_blank'>
									<FontAwesomeIcon
										className='h-6 mx-4 text-black/80 hover:text-black/100 active:text-black/80 cursor-pointer'
										icon={faInstagram}
									/>
								</a>
							</li>
							<li>
								<FontAwesomeIcon
									className='h-6 text-black/80 hover:text-black/100 active:text-black/80 cursor-pointer'
									icon={faXTwitter}
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};
