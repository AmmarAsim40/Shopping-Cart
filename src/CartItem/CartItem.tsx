import Button from '@material-ui/core/Button';
import { CartItemType } from '../App';
import { Wrapper } from './CartItem.styles';
import { Link } from "react-router-dom";

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number, action: string) => void;
}

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
    <Wrapper>
        <div>
            <Link to={`/${item.id}`}>
                <h3>{item.title}</h3>
            </Link>
            <Button variant="contained" onClick={() => removeFromCart(item.id, 'remove')}>x</Button>
            <div className="information">
                <p>Price: Rs.{(item.price * 170).toFixed(0)}</p>
                <p>Total: Rs.{(item.amount * item.price * 170).toFixed(0)}</p>
            </div>
            <div className="buttons">
                <Button variant="contained" onClick={() => removeFromCart(item.id, 'decrement')} disabled={item.amount === 1}>-</Button>
                <p>{item.amount}</p>
                <Button variant="contained" onClick={() => addToCart(item)}>+</Button>
            </div>
        </div>
        <img src={item.image} alt={item.title} />
    </Wrapper>
);

export default CartItem;
