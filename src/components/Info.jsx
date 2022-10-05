import React from 'react';
import AppContext from '../context';

function Info({ title, image, description }) {
	const { setPopupCartOpen } = React.useContext(AppContext);

	return (
		<div className="cart__visualization">
			<div className="visualization__info">
				<img className="visualization__img" src={image} alt="empty-cart"/>
				<h3 className="visualization__title">{title}</h3>
				<p className="visualization__subtitle">{description}</p>
			</div>
			<button className="cart__button visualization__button" onClick={() => setPopupCartOpen(false)}>вернуться к покупкам</button>
		</div>
	)
}

export default Info;