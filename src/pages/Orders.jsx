import axios from 'axios';
import React from 'react';
import Card from '../components/Card/Card'

function Orders() {
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchOrders() {
			try {
				const { data } = await axios.get("https://62fcdc4e6e617f88de9fa7bc.mockapi.io/orders");
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
				setIsLoading(false);
			} catch (error) {
				alert("Ошибка при запросе заказов");
				console.error(error);
			}
		}
		fetchOrders();
	}, []);
	
	return (
		<div className="content">
			<div className="content__container">
				<h1 className="content__title">Мои заказы</h1>
			</div>
			<div className="content__cards">
			{(isLoading ? [...Array(12)] : orders).map((item, index) => (//при помощи метода map вытаскиваем ватаскиваем и отправляем компоненту Card нужные данные
					<Card 
						key = {index}
						loading = {isLoading}
						{...item}
					/>
				))}
			</div>
		</div>
	)
}

export default Orders;