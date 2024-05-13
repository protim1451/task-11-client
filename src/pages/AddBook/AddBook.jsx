import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../FirebaseProvider/FirebaseProvider";

const AddBook = () => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        image: '',
        name: '',
        quantity: '',
        author: '',
        category: '',
        shortDescription: '',
        rating: '',
        userId: user ? user.uid : '',
        userName: user ? user.displayName : '',
        userEmail: user ? user.email : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await submitFormDataToBackend(formData);
        if (success) {
            toast.success('Book added successfully');
            // Clear form fields after successful submission
            setFormData({
                image: '',
                name: '',
                quantity: '',
                author: '',
                category: '',
                shortDescription: '',
                rating: '',
                userId: user ? user.uid : '',
                userName: user ? user.displayName : '',
                userEmail: user ? user.email : ''
            });
        } else {
            toast.error('Failed to add book');
        }
    };

    const submitFormDataToBackend = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            return response.ok;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };
    return (
        <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-bold">Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold">Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className='font-bold'>
                        Category:
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Select a category</option>
                            {/* Add your category options here */}
                        </select>
                    </label>
                </div>
                <div>
                    <label className="block mb-1 font-bold">Short Description:</label>
                    <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1 font-bold">Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="btn-primary btn-block text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Add Book
                </button>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddBook;