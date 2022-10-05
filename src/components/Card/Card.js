import './card.scss'
import React from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from '../../context';

function Card({ 
	id, 
	img, 
	info, 
	price, 
	onLike, 
	onPlus, 
	onFavorite, 
	loading = false, 
	favorited = false, 
	}) {//при помощи props передаем данные в элементы Card
	const { isItemAdded } = React.useContext(AppContext);//в этом хуке храниться состояние кнопки Pluse и Like
	
	const obj = { id, parentId: id, info, img, price };
	const [isFavorite, setIsFavorite] = React.useState(favorited);
	const onClickButtonPlus = () => {//при помощи этой функции меняем boolean значение кнопки Pluse
		onPlus(obj);
	};

	const onClickFavorite = () => {//при помощи этой функции меняем boolean значение кнопки Like
		onFavorite(obj);
		setIsFavorite(!isFavorite);
	}

	return (//рендерим doom дерево
		<div className="card">
			{loading ? (
			<ContentLoader
				speed={2}
				width={155}
				height={250}
				viewBox="0 0 155 265"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb">
				<rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
				<rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
				<rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
				<rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
				<rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
			</ContentLoader>
      ) : (
			<>
				{onFavorite && (
					<button className="button" onClick={onClickFavorite}>
						{/* вешаем слушатель на кномку */}
						<img className="card__button-like" src={isFavorite ? "images/liked.svg" : "images/like-onliked.svg"} alt="heart" onClick={onLike}/>
					</button>
				)}
				<img className="card__img" src={img} alt="Audi E-Tron"/>
				<p className="card__info">{info}</p>
				<div className="card__block">
					<div className="card__price">
						<span>цена</span>
						<b>{price} руб</b>
					</div>
					{onPlus && (
						<button className={isItemAdded(id) ? "button card__button_check" : "button card__button_plus"} onClick={onClickButtonPlus}>
							{/* вешаем слушатель на кномку */}
							<img className="card__button-img" src={isItemAdded(id) ? "images/button-checked.svg" : "images/button-plus.svg"} alt="plus"/>
						</button>
					)}
			</div>
			</>
			)}
		</div>
	);
}

export default Card;