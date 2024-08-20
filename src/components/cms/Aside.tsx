import Image from 'next/image';
import tbt_logo from '../../../public/assets/tbt-logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faReceipt,
	faBurger,
	faBeerMugEmpty,
} from '@fortawesome/free-solid-svg-icons';

type ComponentViewHandler = (
	event: React.MouseEvent<HTMLButtonElement>
) => void;

interface ComponentView {
	orders: boolean;
	burgers: boolean;
	drinks: boolean;
	createArticle: boolean;
}

interface AsideProps {
	componentView: object;
	setComponentView: React.Dispatch<React.SetStateAction<ComponentView>>;
}

function Aside({ componentView, setComponentView }: AsideProps) {
	const handlerComponentView: ComponentViewHandler = (event) => {
		const name = event.currentTarget.name as keyof ComponentView;

		const newComponentView: ComponentView = Object.keys(componentView).reduce(
			(acc, key) => {
				acc[key as keyof ComponentView] = false;
				return acc;
			},
			{} as ComponentView
		);

		newComponentView[name] = true;

		setComponentView(newComponentView);
	};

	return (
		<aside className='bg-black bg-opacity-15 h-full p-4 rounded-xl w-72'>
			<div className='bg-[#d2a772] shadow-md w-full  p-4 rounded-xl h-full  flex flex-col'>
				<div className='w-full flex justify-center mb-5'>
					<Image
						src={tbt_logo}
						className='w-16 sm:w-32 cursor-pointer rounded-full'
						alt='evolve'
					/>
				</div>

				<div className='flex flex-col justify-between flex-1 mt-4'>
					<ul>
						<li>
							<button
								className='mb-4 font-medium text-lg inline-flex active:opacity-60 sm:hover:opacity-80 cursor-pointer items-center'
								name='orders'
								onClick={handlerComponentView}
							>
								<div className='w-10 flex justify-center'>
									<FontAwesomeIcon className='w-7 h-7' icon={faReceipt} />
								</div>
								<p className='ml-2'>Pedidos</p>
							</button>
						</li>
						<li>
							<button
								className='mb-4 font-medium text-lg inline-flex active:opacity-60 sm:hover:opacity-80 cursor-pointer items-center'
								name='burgers'
								onClick={handlerComponentView}
							>
								<div className='w-10 flex justify-center'>
									<FontAwesomeIcon className='w-7 h-7' icon={faBurger} />
								</div>
								<p className='ml-2'>Burgers</p>
							</button>
						</li>
						<li>
							<button
								className='mb-4 font-medium text-lg inline-flex active:opacity-60 sm:hover:opacity-80 cursor-pointer items-center'
								name='drinks'
								onClick={handlerComponentView}
							>
								<div className='w-10 flex justify-center'>
									<FontAwesomeIcon
										className='w-7 h-7 ml-1'
										icon={faBeerMugEmpty}
									/>
								</div>
								<p className='ml-2'>Bebidas</p>
							</button>
						</li>
					</ul>

					<button
						className='p-2 rounded-xl bg-[#491718] active:opacity-60 sm:hover:opacity-80 text-[#d2a772] w-full font-semibold'
						name='createArticle'
						onClick={handlerComponentView}
					>
						Crear artículo
					</button>
				</div>
			</div>
		</aside>
	);
}

export default Aside;
