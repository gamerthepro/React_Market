import React from 'react';
import './header.scss'
import { Link } from 'react-router-dom';
import AppContext from '../../context';

function Header(props) {//при помощи props передаем данные в элементы Card

	const { cartItems } = React.useContext(AppContext);
	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

	return (//рендерим doom дерево
		<header>
			<Link className="header__link" to="/"> {/* при нажатии на блок переходим на главную страничку */}
				<div className="header__left">
					<img className="header__logo" src="images/logo.svg" alt="logo"/>
					<div className="header__info">
						<h3 className="header__title">React Market</h3>
						<p className="header__text">Магазин электромобилей</p>
					</div>
				</div>
			</Link>
			<ul className="header__right">
				{/* вешаем слушатель на кномку */}
				<li className="header__item" onClick={props.onOpenCart}>
					<img className="header__basket" src="images/basket.svg" alt="basket"/>
					<span className="header__sum">{totalPrice} руб</span>
				</li>
				<li>
					<Link className="header__link" to="/favorites"> {/* при нажатии на блок переходим на страничку favorites*/}
						<img className="header__favorites" src="images/like-onliked.svg" alt="favorites"/>
					</Link>
				</li>
				<li>
					<Link className="header__link" to="/orders"> {/* при нажатии на блок переходим на страничку Orders*/}
						<img className="header__person" src="images/personal_area.svg" alt="personal_area"/>
					</Link>
				</li>
			</ul>
		</header>
	)
}

export default Header;