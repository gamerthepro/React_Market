import React from 'react';
import Info from './../Info';
import AppContext from './../../context';
import axios from 'axios';


import './popupCart.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function PopupCart({onClose, onRemove, items = [], opened}) {//при помощи props передаем состояние кнопки (props.onClose)
	const [isOrderComplete, setIsOrderComplete] = React.useState(false)
	const [orderId, setOrderId] = React.useState(null)
	const { cartItems, setCartItems } = React.useContext(AppContext);
	const [isLoading, setIsLoading] = React.useState(false);
	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post("https://62fcdc4e6e617f88de9fa7bc.mockapi.io/orders/", {
				items: cartItems,
			});
			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);

			cartItems.forEach(element => {
				axios.delete("https://62fcdc4e6e617f88de9fa7bc.mockapi.io/cart/" + element.id);
				delay(100);
			});
		} catch {
			alert('Ошибка при создании заказа :(')
		}
		setIsLoading(false);
	}
	
	return (//рендерим doom дерево
		<div className={`popup-cart ${opened ? "popup-cart_visible" : ""}`}>
			<div className="cart">
				<h2 className="cart__title">Корзина</h2>
				{/* вешаем слушатель на кномку */}
				<button className="button cart__close" onClick={onClose}>
					<img className="cart__close-img" src="images/cart_close.svg" alt="close"/>
				</button>
				{//днлаем условие: если в корзине есть товар рендерие items
					items.length > 0 ? 
					(<>
						<div className="cart__items">
							{items.map((obj) => (
								<div className="cart__item" key={obj.id}>
									<img className="item__img" src={obj.img} alt="Audi E-Tron" />
									<div className="item__info">
										<p className="item__text">{obj.info}</p>
										<b>{obj.price} руб</b>
									</div>
									<button className="button item__delete" onClick={() => onRemove(obj.id)}>
										<img className="item__delete-img" src="images/button-plus.svg" alt="cross" />
									</button>
								</div>
							))}
						</div>
						<ul className="cart__info">
							<li className="cart__check">
								<span className="cart__text">Итого:</span>
								<div className="cart__line"></div>
								<b className="cart__num">{totalPrice} руб</b>
							</li>
							<li className="cart__check">
								<span className="cart__text">Налог 2%:</span>
								<div className="cart__line"></div>
								<b className="cart__num">{totalPrice * 0.02} руб</b>
							</li>
						</ul>
						<button className="cart__button" disabled={isLoading} onClick={onClickOrder}>Оформить заказ</button>
					</>) : 
				//если корзина пуста рендерим визуализацию
				(
				<Info 
				title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
				description={isOrderComplete ? `Заказ #${orderId} передан в транспортную компанию` : "добавте автомобиль, чтобы оформить заказ"} 
				image={isOrderComplete ? "images/Order_is_complete.png" : "images/empty-cart.svg"}/>
				)
				}
			</div>
		</div>
	)
}

export default PopupCart;