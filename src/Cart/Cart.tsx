import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { CartItemType } from "../App";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { stateType, storeOrderTotal } from '../Store/StateSlice';

type Props = {
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<Props> = ({ addToCart, removeFromCart }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: stateType) => state.cartItems);

    const calculateTotal = (items: CartItemType[]): number => {
        let total: number = 0;
        for (const item of items) {
            total += item.price * 170 * item.amount;
        };
        return total;
    };

    dispatch(storeOrderTotal(+calculateTotal(cartItems).toFixed(0)));

    return (
        <Wrapper>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? <p>Nothing added yet!</p> : null}
            {cartItems.map((item: CartItemType) => (
                <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
            ))}
            <h2>Total: Rs.{(calculateTotal(cartItems)).toFixed(0)}</h2>
            {cartItems.length !== 0 ? <Link to="/checkout"><input type="submit" value="Checkout" /></Link> : null}
        </Wrapper>
    )
}

export default Cart;
