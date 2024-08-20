import OrderCard from './OrderCard';

function OrdersList() {
	return (
		<>
			<h3 className='mb-4 font-semibold text-2xl'>PEDIDOS</h3>

			<OrderCard />
			<OrderCard />
			<OrderCard />
		</>
	);
}

export default OrdersList;
