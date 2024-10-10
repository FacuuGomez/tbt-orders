import OrderCard from '@/components/OrderCard';
import { AsideLayout } from '@/components/cms/AsideLayout';

export default function OrdersPage() {
	return (
		<AsideLayout>
			<h3 className='mb-4 font-semibold text-2xl'>PEDIDOS</h3>

			<OrderCard />
			<OrderCard />
			<OrderCard />
		</AsideLayout>
	);
}
