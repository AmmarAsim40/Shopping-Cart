import './AdminPanel.css';
import { useState } from "react";
import { Wrapper } from "./AdminPanel.styles";
import { CartItemType } from "../App";
import { Link } from "react-router-dom";

type Props = {
    handleAddItem: (newItem: CartItemType) => void;
}

const AdminPanel: React.FC<Props> = ({ handleAddItem }) => {
    const [newItem, setNewItem] = useState({ id: 0, category: '', description: '', image: '', price: 0, title: '', amount: 0 } as CartItemType);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddItem(newItem);
        setNewItem({ id: 0, category: '', description: '', image: '', price: 0, title: '', amount: 0 });
    };

    return (
        <Wrapper>
            <h2>
                Add Product
            </h2>
            <form onSubmit={handleSubmit}>
                <h3>
                    Title
                </h3>
                <input name="title" onChange={handleChange} value={newItem.title} required />
                <br />
                <h3>
                    Category
                </h3>
                <select name="category" value={newItem.category} onChange={handleChange} required>
                    <option value="">Please select one...</option>
                    <option value="men's clothing">men's clothing</option>
                    <option value="jewelery">jewelery</option>
                    <option value="electronics">electronics</option>
                    <option value="women's clothing">women's clothing</option>
                </select>
                <br />
                <h3>
                    Description
                </h3>
                <textarea name="description" onChange={handleChange} value={newItem.description} required />
                <br />
                <h3>
                    Image URL
                </h3>
                <input name="image" onChange={handleChange} value={newItem.image} required />
                <br />
                <h3>
                    Price
                </h3>
                <input name="price" onChange={handleChange} value={newItem.price} required type="number" />
                <br /><br />
                <input type="submit" value="Submit" />
                <Link to="/">
                    <input type="button" value="Go back" />
                </Link>
            </form>
        </Wrapper>
    );
}

export default AdminPanel;
