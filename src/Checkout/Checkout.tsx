import './Checkout.css';
import { Wrapper } from "./Checkout.styles";
import { Link } from "react-router-dom";
import { useState } from 'react';

type Props = {
    orderTotal: number;
    handleCheckout: () => void;
}

const Checkout: React.FC<Props> = ({ orderTotal, handleCheckout }) => {
    const [checkingOut, setCheckingOut] = useState(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCheckingOut(false);
        handleCheckout();
    };

    if (checkingOut) {
        return (
            <Wrapper>
                <h2>Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <h3>
                        Shipping Address
                    </h3>
                    <textarea name="shippingAddress" required />
                    <br />
                    <h3>
                        Payment Method
                    </h3>
                    <select name="category" required>
                        <option value="">Please select one...</option>
                        <option value="Credit/Debit Card">Credit/Debit Card</option>
                        <option value="JazzCash">JazzCash</option>
                        <option value="Easypaisa">Easypaisa</option>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                    </select>
                    <br />
                    <h4>
                        Order total: Rs.{orderTotal}
                    </h4>
                    <br />
                    <input type="submit" value="Place your order" />
                    <Link to="/">
                        <input type="button" value="Go back" />
                    </Link>
                </form>
            </Wrapper>
        );
    }
    else {
        return (
            <Wrapper>
                <h2>
                    Checkout
                </h2>
                <br />
                <h1>
                    Order placed.
                </h1>
                <h3>
                    Thank you for shopping!
                </h3>
                <br />
                <Link to="/">
                    <input type="button" value="Continue shopping" />
                </Link>
            </Wrapper>
        );
    }
}

export default Checkout;
