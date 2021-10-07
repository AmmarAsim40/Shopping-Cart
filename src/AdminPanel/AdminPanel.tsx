import './AdminPanel.css';
import { useState } from "react";
import { StyledButton, Wrapper } from "./AdminPanel.styles";
import { CartItemType } from "../App";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { stateType } from '../Store/StateSlice';

type Props = {
    handleAddItem: (newItem: CartItemType) => void;
}

const AdminPanel: React.FC<Props> = ({ handleAddItem }) => {
    //Variable declarations
    const [newItem, setNewItem] = useState({ id: -1, category: '', description: '', image: '', price: 0, title: '', amount: 0 } as CartItemType);
    const [editMode, setEditMode] = useState(false);
    const adminPanelData = useSelector((state: stateType) => state.adminPanelData);

    //Update the variable corresponding to the field that the user edited
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    //Add new product or edit a previous product according to the user's selection
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editMode) {
            if (newItem.id === -1) {
                handleAddItem(newItem);
                setNewItem({ id: -1, category: '', description: '', image: '', price: 0, title: '', amount: 0 });
            }
            else {
                handleAddItem(newItem);
                setNewItem({ id: -1, category: '', description: '', image: '', price: 0, title: '', amount: 0 });
            }
        }
        else {
            const item = adminPanelData.find(item => item.id === +newItem.id);
            if (item !== undefined) {
                setNewItem({ id: item.id, category: item.category, description: item.description, image: item.image, price: +(item.price * 170).toFixed(0), title: item.title, amount: item.amount });
                setEditMode(false);
            }
            else {
                alert('No product has been added from admin panel with entered ID!');
            }
        }
    };

    //Render "Add Product" or "Edit Product" according to the user's selection
    if (!editMode) {
        return (
            <Wrapper>
                <StyledButton onClick={() => setEditMode(true)}>
                    Edit
                </StyledButton>
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
                        <input type="button" value="Go to home" />
                    </Link>
                </form>
            </Wrapper>
        );
    }
    else {
        return (
            <Wrapper>
                <StyledButton onClick={() => setEditMode(false)}>
                    +
                </StyledButton>
                <h2>
                    Edit Product
                </h2>
                <form onSubmit={handleSubmit}>
                    <h3>
                        Enter ID of the product that you want to edit
                    </h3>
                    <input name="id" onChange={handleChange} value={newItem.id} required />
                    <br /><br />
                    <input type="submit" value="Next" />
                    <Link to="/">
                        <input type="button" value="Go to home" />
                    </Link>
                </form>
            </Wrapper>
        );
    }
}

export default AdminPanel;
