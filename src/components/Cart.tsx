'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import american_burger from '../../public/assets/american-burger.jpg';
import cheese_burger from '../../public/assets/cheese-burger.jpg';
// import { createOrder } from '@/actions/orders-actions';
import { useRef, useState } from 'react';

interface CartProps {
	order: Order;
	setOrder: React.Dispatch<React.SetStateAction<Order>>;
	closeModal: () => void;
}

type deleteOrderHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

type orderHandler = (event: React.FormEvent<HTMLFormElement>) => void;

type messageOrderHandler = (
	event:
		| React.ChangeEvent<HTMLInputElement>
		| React.ChangeEvent<HTMLSelectElement>
		| React.ChangeEvent<HTMLTextAreaElement>
) => void;

type BurgerName = 'American' | 'Cheese' | 'Cuatro quesos';

interface Burger {
	name: BurgerName;
	price: number;
	quantity: number;
}

interface Order {
	burgers: Burger[];
	totalBurgers: number;
	totalAmount: number;
}

interface Message {
	order: Order;
	orderName: string;
	orderPayment: string;
	orderDispatch: string;
	orderNote: string;
}

export const Cart = ({ closeModal, order, setOrder }: CartProps) => {
	const [message, setMessage] = useState<Message>({
		order,
		orderName: '',
		orderPayment: '',
		orderDispatch: '',
		orderNote: '',
	});

	const formRef = useRef<HTMLFormElement>(null);

	const deleteOrder: deleteOrderHandler = (event) => {
		// console.log('cart', order);
		// console.log('cart', event.currentTarget.name);
		// const addItem = () => {
		// setOrder((prevOrder) => ({
		//   ...prevOrder,
		//   items: [...prevOrder.items, 'New Item'],
		// }));
	};

	const handleMessageChange: messageOrderHandler = (event) => {
		const target = event.target as
			| HTMLInputElement
			| HTMLSelectElement
			| HTMLTextAreaElement;

		setMessage({
			...message,
			order,
			[target.name]: target.value,
		});
	};

	const handleSubmit: orderHandler = (event) => {
		event.preventDefault();

		const phoneNumber = '541141786108';
		// const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
		// 	`\n*Pedido*: ${message.orderName}\n*Pago*: ${
		// 		message.orderPayment
		// 	}\n*Delivery*: ${
		// 		message.orderDispatch ? message.orderDispatch : 'Retiro'
		// 	}\n\n-------------------------------\nBURGERS\n\n- ${
		// 		order.burgers[0].name
		// 	} burger: ${order.burgers[0].quantity} x $${order.burgers[0].price} = $${
		// 		order.burgers[0].price * order.burgers[0].quantity
		// 	}\n${
		// 		order.burgers.length > 1
		// 			? `- ${order.burgers[1].name} burger: ${
		// 					order.burgers[1].quantity
		// 			  } x $${order.burgers[1].price} = $${
		// 					order.burgers[1].price * order.burgers[1].quantity
		// 			  }\n`
		// 			: ''
		// 	}\nART.: ${order.totalBurgers}   TOTAL: $${
		// 		order.totalAmount
		// 	}\n-------------------------------\n\n${
		// 		message.orderNote ? `*Observación*: ${message.orderNote}` : ''
		// 	}`
		// )}`;

		const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
			`\n*Pedido*: ${message.orderName}\n*Pago*: ${
				message.orderPayment
			}\n*Delivery*: ${
				message.orderDispatch ? message.orderDispatch : 'Retiro'
			}\n\n-------------------------------\nBURGERS\n\n- ${
				order.burgers[0].name
			} burger: ${order.burgers[0].quantity} x $${order.burgers[0].price} = $${
				order.burgers[0].price * order.burgers[0].quantity
			}\n${
				order.burgers.length > 1
					? `- ${order.burgers[1].name} burger: ${
							order.burgers[1].quantity
					  } x $${order.burgers[1].price} = $${
							order.burgers[1].price * order.burgers[1].quantity
					  }\n`
					: ''
			}\nART.: ${order.totalBurgers}   TOTAL: $${
				order.totalAmount
			}\n-------------------------------\n\n${
				message.orderNote ? `*Observación*: ${message.orderNote}` : ''
			}`
		)}`;

		// const order = await createOrder(formData);

		window.open(whatsappLink, '_blank');

		formRef.current?.reset();
	};

	return (
		<div className='flex justify-center items-center bg-black/60 backdrop-blur-sm h-screen max-w-screen'>
			<div className='relative justify-center text-center bg-[#b89061] mx-5 md:max-w-2xl w-full p-6 rounded-3xl'>
				<div>
					<button className='flex' onClick={closeModal}>
						<FontAwesomeIcon
							className='absolute top-6 right-6 w-8 h-8 hover:opacity-80 active:opacity-60 cursor-pointer'
							icon={faCircleXmark}
						/>
					</button>

					<h3 className='text-2xl font-bold pb-6'>PEDIDO</h3>

					<div className='flex justify-center'>
						<ul className='w-full'>
							{!order.totalBurgers ? (
								<li className='text-2xl'>No hay pedidos cargados.</li>
							) : (
								order.burgers.map((burger) => (
									<li
										className='flex justify-between items-center mb-2'
										key={burger.name}
									>
										<div className='flex items-center'>
											{burger.name === 'American' ? (
												<Image
													src={american_burger}
													className='w-24 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
													alt='evolve'
												/>
											) : (
												<Image
													src={cheese_burger}
													className='w-24 sm:w-36 mr-4 sm:mr-6 cursor-pointer rounded-2xl'
													alt='evolve'
												/>
											)}

											<div>
												<p className='font-semibold text-lg text-start'>
													{burger.name} burger
												</p>
												<p>
													Cantidad: {burger.quantity} x ${burger.price}
												</p>
											</div>
										</div>

										<button className='flex' onClick={deleteOrder}>
											<FontAwesomeIcon
												className='h-6 hover:opacity-80 active:opacity-60 cursor-pointer'
												icon={faTrash}
											/>
										</button>
									</li>
								))
							)}

							<li className='my-4 font-medium text-[#491718]'>
								<p>Subtotal: ${order.totalAmount}</p>
							</li>
						</ul>
					</div>

					<hr className='border-2 border-[#491718] rounded-full' />

					<form className='flex-col my-4' onSubmit={handleSubmit} ref={formRef}>
						<input
							className='p-2 w-full rounded-xl bg-[#d2a772] placeholder:text-black/60 mb-2 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
							type='text'
							placeholder='Nombre'
							name='orderName'
							value={message.orderName}
							onChange={handleMessageChange}
						/>

						<select
							className='p-2 w-full rounded-xl bg-[#d2a772] mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
							name='orderPayment'
							value={message.orderPayment}
							onChange={handleMessageChange}
						>
							<option className='text-black/60' value='Metodo'>
								Método de pago
							</option>
							<option value='Efectivo'>Efectivo</option>
							<option value='Tranferencia'>Transferencia</option>
						</select>

						<select
							className='p-2 w-full rounded-xl bg-[#d2a772] mb-2 border-2 border-[#d2a772] focus:border-[#491718]'
							name='orderDispatch'
							value={message.orderDispatch}
							onChange={handleMessageChange}
						>
							<option className='text-black/60' value='Envio/Retiro'>
								Envio / Retiro
							</option>
							<option value='Envio'>Quiero que me lo envien</option>
							<option value='Retiro'>Lo retiro yo mismo</option>
						</select>

						<textarea
							className='p-2 w-full rounded-xl bg-[#d2a772] placeholder:text-black/60 border-2 border-[#d2a772] focus:border-[#491718] outline-none'
							name='orderNote'
							placeholder='¿ Alguna observación ?'
							value={message.orderNote}
							onChange={handleMessageChange}
						></textarea>

						<div className='flex justify-center font-bold text-2xl my-4'>
							<p>Total:</p>
							<p className='text-[#491718] ml-2'>${order.totalAmount}</p>
						</div>

						<button
							className='bg-[#491718] hover:opacity-80 active:opacity-60 text-[#d2a772] font-semibold p-4 rounded-2xl w-full'
							type='submit'
						>
							Enviar pedido
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
