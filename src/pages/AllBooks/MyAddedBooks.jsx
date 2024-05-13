import { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';

const MyAddedBooks = () => {
    const { user } = useAuth();
    const [userBooks, setUserBooks] = useState([]);

    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                if (!user || !user.email) {
                    console.error("User object or email is missing.");
                    return;
                }

                const response = await fetch(`http://localhost:3000/books?userEmail=${user.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user books');
                }
                const data = await response.json();
                setUserBooks(data);
            } catch (error) {
                console.error('Error fetching user books:', error);
            }
        };

        if (user) {
            fetchUserBooks();
        }
    }, [user]);

    const handleDeleteBook = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:3000/books/${bookId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Remove the deleted book from the userBooks state
                setUserBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
            } else {
                throw new Error('Failed to delete book');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">My Added Books</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Book Name</th>
                        <th className="px-4 py-2">Author</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userBooks.map((book,idx) => (
                        <tr key={idx}>
                            <td className="border px-4 py-2">{book.name}</td>
                            <td className="border px-4 py-2">{book.author}</td>
                            <td className="border px-4 py-2">{book.quantity}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleDeleteBook(book._id)} className="text-red-500 font-bold hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyAddedBooks;
