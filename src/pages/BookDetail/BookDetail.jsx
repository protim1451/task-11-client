// BookDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/books/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">{book.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <img src={book.image} alt={book.name} className="w-full h-auto object-cover" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Author: {book.author}</h3>
                    <p className="mb-2"><span className='font-bold'>Quantity:</span> {book.quantity} copies available</p>
                    <p className="mb-2"><span className='font-bold'>Category:</span> {book.category}</p>
                    <p className="mb-2"><span className='font-bold'>Rating:</span> {book.rating}</p>
                    <p className="text-gray-600">{book.shortDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
