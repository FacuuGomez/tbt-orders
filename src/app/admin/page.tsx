'use client';

import { useState } from 'react';
import OrdersList from '@/components/lists/OrdersList';
import Aside from '@/components/cms/Aside';
import CreateArticle from '@/components/cms/CreateArticle';
import BurgersList from '@/components/lists/BurgersList';
import DrinksList from '@/components/lists/DrinksList';

type ComponentMap = {
	[key in keyof ComponentView]: JSX.Element | null;
};

interface ComponentView {
	orders: boolean;
	burgers: boolean;
	drinks: boolean;
	createArticle: boolean;
}

function Admin() {
	const [componentView, setComponentView] = useState<ComponentView>({
		orders: true,
		burgers: false,
		drinks: false,
		createArticle: false,
	});

	const componentMap: ComponentMap = {
		orders: componentView.orders ? <OrdersList /> : null,
		burgers: componentView.burgers ? <BurgersList /> : null,
		drinks: componentView.drinks ? <DrinksList /> : null,
		createArticle: componentView.createArticle ? <CreateArticle /> : null,
	};

	return (
		<div className='flex justify-center'>
			<div className='flex justify-stretch max-w-7xl w-full items-center min-h-screen p-4'>
				<Aside
					componentView={componentView}
					setComponentView={setComponentView}
				/>

				<section className='bg-black bg-opacity-15 h-full p-4 rounded-xl w-full ml-4'>
					{Object.values(componentMap).map((component, index) =>
						component ? <article key={index}>{component}</article> : null
					)}
				</section>
			</div>
		</div>
	);
}

export default Admin;
