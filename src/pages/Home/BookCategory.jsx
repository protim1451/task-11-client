import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BookCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold my-4 text-center">Book Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category, index) => (
                    <Link to={`/category/${category}`} key={index} className="border p-4 text-center">
                        <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition bg-teal-100">
                            <h3 className="text-xl font-bold">{category}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BookCategory;
