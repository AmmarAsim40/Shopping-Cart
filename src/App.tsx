import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import AdminPanel from "./AdminPanel/AdminPanel";
import Checkout from "./Checkout/Checkout";
import ProductDetail from "./ProductDetail/ProductDetail";
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper, StyledButton, StyledButton2 } from "./App.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { stateType, storeCartItems, storeData, storeAdminPanelData, storeConcatData, storeCategory, filterConcatData } from './Store/StateSlice';

toast.configure()

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getItems = async (): Promise<CartItemType[]> => (await fetch('https://fakestoreapi.com/products')).json()

const App = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useQuery<CartItemType[]>('items', getItems);
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state: stateType) => state.cartItems);
  const adminPanelData = useSelector((state: stateType) => state.adminPanelData);
  const concatData = useSelector((state: stateType) => state.concatData);
  const category = useSelector((state: stateType) => state.category);

  useEffect(() => {
    dispatch(storeData(data || []));
    dispatch(storeConcatData(data?.concat(adminPanelData) || []));
    category && dispatch(filterConcatData());
  }, [dispatch, data, adminPanelData, category]);

  const getTotalItems = (items: CartItemType[]) => {
    let totalItems: number = 0;
    for (const item of items) {
      totalItems += item.amount;
    }
    return totalItems;
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    if (cartItems.find(item => item.id === clickedItem.id)) {
      dispatch(storeCartItems(cartItems.map(item => item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item)));
    }
    else {
      dispatch(storeCartItems([...cartItems, { ...clickedItem, amount: 1 }]));
    }
    toast("Added to cart");
  };

  const handleAddItem = (newItem: CartItemType) => {
    let dataLength: number | undefined = data?.length;
    if (typeof dataLength === 'number') {
      newItem.id = dataLength + adminPanelData.length + 1;
      newItem.price /= 170;
      dispatch(storeAdminPanelData(adminPanelData.concat(newItem)));
      toast("Product added");
    }
  };

  const handleRemoveFromCart = (id: number) => {
    const newCart = [...cartItems]
    const relItem = newCart.find(item => item.id === id);
    dispatch(storeCartItems(--(relItem!.amount) ? newCart : newCart.filter(item => item.id !== id)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(storeCategory(e.target.value));
  };

  const handleCheckout = () => {
    dispatch(storeCartItems([]));
    setCartOpen(false);
  };

  if (isLoading) {
    return <LinearProgress />;
  }
  else if (error) {
    return <div>Error fetching products! Please try again later.</div>;
  }
  else {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Wrapper>
              <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
              </Drawer>
              <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                  <ShoppingCartIcon />
                </Badge>
              </StyledButton>
              <Link to="/admin-panel">
                <StyledButton2>
                  +
                </StyledButton2>
              </Link>
              <form>
                <select name="category" value={category} onChange={handleChange}>
                  <option value="">All products</option>
                  <option value="men's clothing">men's clothing</option>
                  <option value="jewelery">jewelery</option>
                  <option value="electronics">electronics</option>
                  <option value="women's clothing">women's clothing</option>
                </select>
              </form>
              <br />
              <br />
              <Grid container spacing={3}>
                {concatData.map(item => (
                  <Grid item key={item.id} xs={12} sm={3}>
                    <Item item={item} handleAddToCart={handleAddToCart} />
                  </Grid>
                ))}
              </Grid>
            </Wrapper>
          </Route>
          <Route exact path="/admin-panel">
            <AdminPanel handleAddItem={handleAddItem} />
          </Route>
          <Route exact path="/checkout">
            <Checkout handleCheckout={handleCheckout} />
          </Route>
          <Route exact path="/:id">
            <ProductDetail handleAddToCart={handleAddToCart} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
