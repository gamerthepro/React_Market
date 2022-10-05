import React from 'react';
import Card from '../components/Card/Card'
import AppContext from '../context';

function Favorites() {
	const { addFavorite, favorites } = React.useContext(AppContext);
	
	return (
		<div className="content">
			<div className="content__container">
				<h1 className="content__title">Мои закладки</h1>
			</div>
			<div className="content__cards">
			{favorites.map((item, index) => (//при помощи метода map вытаскиваем ватаскиваем и отправляем компоненту Card нужные данные
					<Card 
					key = {index}
					id = {item.id}
					img = {item.img}
					info = {item.info}
					price = {item.price}
					favorited = {true}
					onFavorite = {addFavorite}
					/>
				))}
			</div>
		</div>
	)
}

export default Favorites;