import Button from '@material-ui/core/Button';
import { CartItemType } from '../App';
import { Wrapper } from './Item.styles';
import { Link } from "react-router-dom";

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <Link to={`/${item.id}`}>
                <h3>{item.title}</h3>
            </Link>
            <p>{item.description}</p>
            <h3>Rs.{(item.price * 170).toFixed(0)}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
    </Wrapper>
)

export default Item;
