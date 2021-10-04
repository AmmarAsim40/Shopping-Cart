import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { CartItemType } from "../App";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
    checkout: () => void;
    setOrderTotal: (orderTotal: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, checkout, setOrderTotal }) => {
    const calculateTotal = (items: CartItemType[]): number => {
        let total: number = 0;
        for (const item of items) {
            total += item.price * 170 * item.amount;
        };
        return total;
    };

    setOrderTotal(+calculateTotal(cartItems).toFixed(0));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkout();
    };

    return (
        <Wrapper>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? <p>Nothing added yet!</p> : null}
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
            ))}
            <h2>Total: Rs.{(calculateTotal(cartItems)).toFixed(0)}</h2>
            <form onSubmit={handleSubmit}>
                {cartItems.length !== 0 ? <input type="submit" value="Checkout" /> : null}
            </form>
        </Wrapper>
    )
}

export default Cart;
