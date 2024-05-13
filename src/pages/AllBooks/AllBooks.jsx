import { useEffect, useState } from 'react';
import BookCard from './BookCard'; // Assuming you have a BookCard component for rendering individual books
import { Helmet } from 'react-helmet-async';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/books'); 
                if (response.ok) {
                    const data = await response.json();
                    setBooks(data); 
                } else {
                    console.error('Failed to fetch books');
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks(); 
    }, []); 

    // Filter books based on the selected category
    const filteredBooks = selectedCategory
    ? books.filter(book => book.category === selectedCategory)
    : books;

    // Function to handle category selection change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        console.log('Selected Category:', e.target.value);
    };
    
    console.log('Filtered Books:', filteredBooks);

    return (
        <div>
            <Helmet>Your App Name | All Books</Helmet>
            <h2 className="text-2xl font-bold mb-4 text-center">All Books</h2>
            <div className="flex justify-center mb-4">
                <select
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Select a category</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-fiction">Non-fiction</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Science fiction">Science fiction</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Historical fiction">Historical fiction</option>
                    <option value="Biography">Biography</option>
                    <option value="Self-help">Self-help</option>
                </select>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.map((book,idx) => (
                    <BookCard key={idx} book={book} />
                ))}
            </div>
        </div>
    );
};

export default AllBooks;
