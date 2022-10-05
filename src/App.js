import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import PopupCart from './components/PopupCart/PopupCart';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
	const [items, setItems] = React.useState([]);//при помощи этого хука изменяем данные в карточках
	const [cartItems, setCartItems] = React.useState([]);//при помощи этого хука изменяем данные в корзине
	const [favorites, setFavorites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState('');//при помощи этого хука работаем с данными в поисковике(input)
	const [popupCartOpen, setPopupCartOpen] = React.useState(false);//при помощи этого хука открываем и закрываем корзину, путем изменения boolean значения.
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		async function featchData() {//внутри useEffect вызываем асинхронную функцию так как сам useEffect неработает асинхронно
			try {
				const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
					axios.get("https://62fcdc4e6e617f88de9fa7bc.mockapi.io/cart"),//делаем GET запрос на сервер (backend)
					axios.get("https://62fcdc4e6e617f88de9fa7bc.mockapi.io/favorites"),//делаем GET запрос на сервер (backend)
					axios.get("https://62fcdc4e6e617f88de9fa7bc.mockapi.io/items"),//делаем GET запрос на сервер (backend)
				]);
				setIsLoading(false);
				setCartItems(cartResponse.data)
				setFavorites(favoritesResponse.data)
				setItems(itemsResponse.data)
			} catch (error) {
				alert('Ошибка при запросе данных');
				console.error(error);
			}
		}
		featchData();
	}, []);

	const addToCart = async (obj) => {//делаем POST запрос на сервер (backend)
		try {
			const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
			if (findItem) {
				setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`https://62fcdc4e6e617f88de9fa7bc.mockapi.io/cart/${findItem.id}`);
			} else {
			setCartItems((prev) => [...prev, obj]);
			const { data } = await axios.post("https://62fcdc4e6e617f88de9fa7bc.mockapi.io/cart", obj);//отправляем данные на сервер (backend)
			setCartItems((prev) => 
				prev.map((item) => {
					if (item.parentId === data.parentId) {
						return {
							...item,
							id: data.id,
						};
					}
					return item;
					}),
				);
			}
		} catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
		}
	};

	const addFavorite = async (obj) => {
		try {
			if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
				axios.delete(`https://62fcdc4e6e617f88de9fa7bc.mockapi.io/favorites/${obj.id}`);//отправляем данные на сервер (backend)
				setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
			} else {
				const { data } = await axios.post( "https://62fcdc4e6e617f88de9fa7bc.mockapi.io/favorites", obj);//отправляем данные на сервер (backend)
				setFavorites((prev) => [ ...prev, data])
			}
		} catch (error) {
			alert('не удалось добавить в фавориты');
			console.error(error);
		}
	}

	const onRemoveCartItem = (id) => {//делаем DELETE запрос на сервер (backend)
		try {
			axios.delete(`https://62fcdc4e6e617f88de9fa7bc.mockapi.io/cart/${id}`);//отправляем данные на сервер (backend)
			setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
		} catch (error) {
			alert('Ошибка при удалении из корзины');
			console.error(error);
		}
	};

	const onChangeSearchInput = (event) => {//передаем данные из 'input' в 'content__title'
		setSearchValue(event.target.value)
	};

	const inputClear = () => {//очищаем поиск(input)
		setSearchValue('')
	};

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};

	return (//рендерим doom дерево
	<AppContext.Provider
      value={{
			items,
			cartItems,
			favorites,
			isItemAdded,
			addFavorite,
			addToCart,
			setPopupCartOpen,
			setCartItems, 
      }}>
			<div className="wrapper">
				<Header
					onOpenCart = {() => setPopupCartOpen(true)}//при помощи onOpenCart меняем состояние хука (setPopupCartOpen)
				/>
				<Routes>
					{/* при помощи роутинга отображаем страничку Home (компонент) */}
					<Route exact path='' element={<>
						<Home
							items = {items}
							cartItems = {cartItems}
							searchValue = {searchValue}
							inputClear = {inputClear}
							onChangeSearchInput = {onChangeSearchInput}
							addToCart = {addToCart}
							addFavorite = {addFavorite}
							isLoading = {isLoading}
						/>
					</>}></Route>
					{/* при помощи роутинга отображаем страничку Favorites (компонент) */}
					<Route exact path='favorites' element={<>
						<Favorites/>
					</>}></Route>
					<Route exact path='orders' element={<>
						<Orders/>
					</>}></Route>
				</Routes>
				<PopupCart 
				items = {cartItems}
				onClose = {() => setPopupCartOpen(false)}
				onRemove = {onRemoveCartItem}
				opened = {popupCartOpen}
				/>
			</div>
		</AppContext.Provider>
	);
}

export default App;
