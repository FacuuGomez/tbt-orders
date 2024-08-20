function OrderCard() {
	return (
		<div className='bg-[#d2a772] shadow-md w-full p-4 rounded-xl mb-2'>
			<p className='mb-2 text-lg font-semibold'>Pedido #4328432</p>
			<div className='flex mr-2'>
				<p className='font-semibold mr-2'>Nombre:</p> <p>Facundo Gómez</p>
			</div>
			<div className='flex mr-2'>
				<p className='font-semibold mr-2'>Método de pago:</p>
				<p>Efectivo</p>
			</div>
			<div className='flex'>
				<div className='flex mr-2'>
					<p className='font-semibold mr-2'>Delivery:</p> <p>Si</p>
				</div>
				<div className='flex'>
					<p className='font-semibold mr-2'>Dirección:</p> <p>Miró 3350</p>
				</div>
			</div>
			<div className='flex'>
				<p className='font-semibold mr-2'>Pedido:</p> <p>Chesse Burger x2</p>
			</div>
			<div className='flex'>
				<p className='font-semibold mr-2'>Total:</p> <p>$12.500</p>
			</div>
			<div className='flex'>
				<p className='font-semibold mr-2'>Día:</p> <p>08/08/2024</p>
			</div>
		</div>
	);
}

export default OrderCard;
