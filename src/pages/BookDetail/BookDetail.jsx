import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import Swal from 'sweetalert2';

const BookDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
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

    const handleBorrow = async () => {
        const { value: returnDate } = await Swal.fire({
          title: 'Enter return date',
          input: 'date',
          inputLabel: 'Return Date',
          inputPlaceholder: 'Select return date',
          showCancelButton: true
        });
      
        if (returnDate) {
          const borrowInfo = {
            bookId: id,
            userEmail: user.email,
            userName: user.displayName,
            returnDate,
            borrowDate: new Date().toISOString(),
            name: book.name,
            image: book.image,
            category: book.category
          };
      
          try {
            const response = await fetch(`http://localhost:3000/borrow/${id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(borrowInfo)
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Failed to borrow book');
            }
      
            const data = await response.json();
            setBook(prev => ({ ...prev, quantity: prev.quantity - 1 }));
            Swal.fire('Success', 'Book borrowed successfully', 'success');
          } catch (error) {
            console.error('Error borrowing book:', error);
            Swal.fire('Error', error.message || 'Failed to borrow book', 'error');
          }
        }
      };
      

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
                    <button 
                        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${book.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        disabled={book.quantity === 0}
                        onClick={handleBorrow}
                    >
                        {book.quantity === 0 ? 'Out of Stock' : 'Borrow'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
