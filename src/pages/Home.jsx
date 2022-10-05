import React from 'react';

import Card from '../components/Card/Card'

function Home({ 
	searchValue, 
	inputClear, 
	items, 
	onChangeSearchInput, 
	addToCart, 
	addFavorite, 
	isLoading, 
	}) {
	const renderItems = () => {
		const filtredItems = items.filter((item) =>
			item.info.toLowerCase().includes(searchValue.toLowerCase()),
		);
		return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
			<Card 
				key = {index}
				onPlus = {(obj) => addToCart(obj)}
				onFavorite = {(obj) => addFavorite(obj)}
				loading={isLoading}
				{...item}
				/>
			));
		};

		return (
			<div className="content">
				<div className="content__container">
					<h1 className="content__title">{searchValue ? `Поиск по запросу: ${searchValue}` : 'Электроавтомобили'}</h1>
					<div className="content__search">
						{searchValue && <button className="button search__button" onClick={inputClear} >
							<img className="search__clear" src="images/cart_close.svg" alt="close"/>
						</button>}
						<img className="search__img" src="images/search.svg" alt="search"/>
						<input className="search__text" onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."></input>
					</div>
				</div>
				<div className="content__cards">
					{renderItems()}
				</div>
			</div>
		)
}

export default Home;