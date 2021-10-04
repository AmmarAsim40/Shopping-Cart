import React, { useState } from "react";
import { useQuery } from "react-query";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import AdminPanel from "./AdminPanel/AdminPanel";
import Checkout from "./Checkout/Checkout";
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper, StyledButton, StyledButton2 } from "./App.styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>('items', getItems);
  const [adminPanelData, setAdminPanelData] = useState([] as CartItemType[]);
  const [category, setCategory] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  const getTotalItems = (items: CartItemType[]) => {
    let totalItems: number = 0;
    for (const item of items) {
      totalItems += item.amount;
    }
    return totalItems;
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      if (prev.find(item => item.id === clickedItem.id)) {
        return prev.map(item => item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item)
      }
      else {
        return [...prev, { ...clickedItem, amount: 1 }];
      }
    })
  };

  const handleAddItem = (newItem: CartItemType) => {
    let dataLength: number | undefined = data?.length;
    if (typeof dataLength === 'number') {
      newItem.id = dataLength + adminPanelData.length + 1;
      newItem.price /= 170;
      setAdminPanelData(adminPanelData.concat(newItem));
      toast("Product added");
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => {
      const newCart = [...prev]
      const relItem = newCart.find(item => item.id === id);
      return --(relItem!.amount) ? newCart : newCart.filter(item => item.id !== id);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleCheckout = () => {
    setCartItems([]);
    setCartOpen(false);
  };

  let concatData: CartItemType[] = [];

  if (isLoading) {
    return <LinearProgress />;
  }
  else if (error) {
    return <div>Error fetching products! Please try again later.</div>;
  }
  else {
    if (data !== undefined) {
      concatData = data.concat(adminPanelData);
      if (category !== '') {
        concatData = concatData.filter(item => item.category === category);
      }
    }
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Wrapper>
              <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} setOrderTotal={setOrderTotal} />
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
            <Checkout orderTotal={orderTotal} handleCheckout={handleCheckout} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
