import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { CartItemType } from '../App';
import { stateType } from '../Store/StateSlice';
import { Wrapper } from './ProductDetail.styles';

type Props = {
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const ProductDetail: React.FC<Props> = ({ handleAddToCart }) => {
    const { id } = useParams<{ id: string }>();
    const item = useSelector((state: stateType) => state.concatData.find(item => item.id === +id));

    if (item) {
        return (
            <Wrapper>
                <img src={item.image} alt={item.title} />
                <div>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <h2>Rs.{(item.price * 170).toFixed(0)}</h2>
                </div>
                <div className="buttons">
                    <Button variant="contained" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                    <br /><br />
                    <Link to="/">
                        <Button variant="contained">Go back</Button>
                    </Link>
                </div>
            </Wrapper>
        );
    }
    else {
        return (
            <Wrapper>
                <div>
                    <h1>No such product found!</h1>
                    <h3>Please check your URL and try again.</h3>
                </div>
                <Link to="/">
                    <Button variant="contained">Go to home</Button>
                </Link>
            </Wrapper>
        );
    }
}

export default ProductDetail;
