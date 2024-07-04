import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCartShopping,
	faLocationDot,
	faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import {
	faInstagram,
	faWhatsapp,
	faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import tbt_logo from '../../public/assets/tbt-logo.jpg';
import american_burger from '../../public/assets/american-burger.jpg';
import cheese_burger from '../../public/assets/cheese-burger.jpg';

export default function Home() {
	return (
		<div className='min-h-screen w-full flex-col'>
			<header className='flex justify-center py-4 bg-[#D2A772]'>
				<div className='flex-col max-w-7xl w-full'>
					<div className='flex justify-between items-center'>
						<Image
							src={tbt_logo}
							className='w-20 cursor-pointer rounded-full'
							alt='evolve'
						/>

						<h2 className='font-bold text-2xl'>THE BURGER TOWN</h2>

						<FontAwesomeIcon
							className='w-6 hover:opacity-80 active:opacity-60 cursor-pointer'
							icon={faCartShopping}
						/>
					</div>
				</div>
			</header>

			<nav className='flex justify-center py-4 bg-[#491718] text-[#D2A772]'>
				<ul className='flex justify-center gap-8  max-w-7xl w-full'>
					<li className='font-medium text-lg hover:opacity-80 active:opacity-60 cursor-pointer'>
						Hamburguesas
					</li>
					<li className='font-medium text-lg hover:opacity-80 active:opacity-60 cursor-pointer'>
						Bebidas
					</li>
					<li className='font-medium text-lg hover:opacity-80 active:opacity-60 cursor-pointer'>
						Dips de salsas
					</li>
				</ul>
			</nav>

			<main className='flex justify-center min-h-screen'>
				<div className='max-w-7xl w-full'>
					<section>
						<h1 className='py-5 font-bold text-xl'>BURGERS</h1>

						<ul>
							<li className='flex items-center'>
								<Image
									src={american_burger}
									className='w-36 mr-6 cursor-pointer rounded-xl'
									alt='evolve'
								/>

								<div className='flex justify-between w-full'>
									<div>
										<p className='font-semibold text-lg'>American burger</p>
										<p>
											2 medallones de carne, cheddar, salsa "TBT", tomate,
											lechuga, cebolla.
										</p>
									</div>

									<div>
										<p className='flex justify-center pb-2'>$9.500</p>

										<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full'>
											<p className='flex justify-center items-center border-r-2 border-[#491718] hover:bg-[#491718] hover:text-white active:opacity-70 rounded-l-xl cursor-pointer'>
												-
											</p>
											<p className='flex justify-center items-center border-r-2 border-[#491718] px-2 cursor-default'>
												0
											</p>
											<p className='flex justify-center items-center hover:bg-[#491718] hover:text-white active:opacity-70 rounded-r-xl cursor-pointer'>
												+
											</p>
										</div>
									</div>
								</div>
							</li>
							<li className='flex items-center mt-4'>
								<Image
									src={cheese_burger}
									className='w-36 mr-6 cursor-pointer rounded-xl'
									alt='evolve'
								/>

								<div className='flex justify-between w-full'>
									<div>
										<p className='font-semibold text-lg'>Cheese burger</p>
										<p>
											2 medallones de carne, cheddar, salsa "TBT", panceta,
											cebolla caramelizada.
										</p>
									</div>

									<div>
										<p className='flex justify-center pb-2'>$9.500</p>

										<div className='grid grid-cols-3 justify-center border-2 border-[#491718] rounded-full'>
											<p className='flex justify-center items-center border-r-2 border-[#491718] hover:bg-[#491718] hover:text-white active:opacity-70 rounded-l-xl cursor-pointer'>
												-
											</p>
											<p className='flex justify-center items-center border-r-2 border-[#491718] px-2 cursor-default'>
												0
											</p>
											<p className='flex justify-center items-center hover:bg-[#491718] hover:text-white active:opacity-70 rounded-r-xl cursor-pointer'>
												+
											</p>
										</div>
									</div>
								</div>
							</li>
							{/* <li>Burger 3</li>
						<li>Burger 4</li> */}
						</ul>
					</section>

					{/* <section className='bg-[#491718] flex-wrap justify-center text-center mt-5 py-10'>
					<div>
          <h3 className='font-bold'>Horarios de atención</h3>
          
          <p className='flex justify-center'>
          <FontAwesomeIcon className='w-6 text-white pr-2' icon={faClock} />
          Jueves a Domingos de 20:00HS a 10:30HS
          </p>
          
						<h3 className='font-bold mt-4'>Ubicación</h3>

						<p className='flex justify-center'>
            <FontAwesomeIcon
            className='w-6 text-white pr-2'
            icon={faLocationDot}
            />
            9 de Julio & Roca
						</p>
            </div>
            </section> */}
				</div>
			</main>

			<footer className='flex justify-center bg-[#D2A772]'>
				<div className='max-w-7xl w-full'>
					<div className='flex-col justify-center text-center py-5'>
						<div className='flex justify-center items-center'>
							<Image
								src={tbt_logo}
								className='w-20 cursor-pointer rounded-full mr-4'
								alt='evolve'
							/>

							{/* <h2 className='font-bold text-2xl'>THE BURGER TOWN</h2> */}
						</div>

						<div className='flex-col justify-center mt-4'>
							<h3 className='font-bold text-xl'>Horarios de atención</h3>

							<p className='flex justify-center font-medium'>
								<FontAwesomeIcon className='w-6 pr-2' icon={faClock} />
								Jueves a Domingos de 20:00HS a 10:30HS
							</p>

							<h3 className='font-bold text-xl mt-4'>Ubicación</h3>

							<p className='flex justify-center font-medium'>
								<FontAwesomeIcon className='w-6 pr-2' icon={faLocationDot} />9
								de Julio & Roca
							</p>

							<h3 className='font-bold text-xl mt-4 pb-2 '>Contactos</h3>

							<a
								className='flex justify-center items-center pb-2 hover:opacity-80 active:opacity-60 cursor-pointer font-semibold'
								href='https://www.instagram.com/the.burger.town/'
								target='_blank'
							>
								<FontAwesomeIcon className='w-6 mr-2' icon={faInstagram} />
								Instagram
							</a>
							<a
								className='flex justify-center items-center pb-2 hover:opacity-80 active:opacity-60 cursor-pointer font-semibold'
								href='https://www.instagram.com/the.burger.town/'
								target='_blank'
							>
								<FontAwesomeIcon className='w-6 mr-2' icon={faWhatsapp} />
								Whatsapp
							</a>
						</div>
					</div>

					<div className='flex-col justify-center'>
						<hr className='border-2 border-[#491718] w-full rounded-full' />

						<div className='max-w-7xl w-full flex justify-between items-center py-2 '>
							<p className='text-sm opacity-80'>© 2024 Geekhound, S.A.S.</p>

							<ul className='flex items-center'>
								<li>
									<FontAwesomeIcon
										className='w-7 opacity-80 hover:opacity-100 active:opacity-100 cursor-pointer'
										icon={faGlobe}
									/>
								</li>
								<li>
									<a
										href='https://www.instagram.com/geekhound/'
										target='_blank'
									>
										<FontAwesomeIcon
											className='w-7 mx-4 opacity-80 hover:opacity-100 active:opacity-100 cursor-pointer'
											icon={faInstagram}
										/>
									</a>
								</li>
								<li>
									<FontAwesomeIcon
										className='w-7 opacity-80 hover:opacity-100 active:opacity-100 cursor-pointer'
										icon={faXTwitter}
									/>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
