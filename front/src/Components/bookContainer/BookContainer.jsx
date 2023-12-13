import React, { useState, useEffect } from 'react'
import "./bookContainer.css"
import Book from "../Book/Book.jsx"
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function BookContainer({title , category , orderType}) {

    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch books from the server when the component mounts
    const fetchBooks = async () => {
        let response
      try {
        {!category 
            ? 
             response = await axios.get(`http://localhost:5000/books/${orderType}`
            , {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            }
            )
            :
             response = await axios.get(`http://localhost:5000/books/filter/category/${category}`
            , {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            }
            ); // Adjust the API endpoint as needed
        }
        const averageRatingsPromises = response.data.map(async (book) => {
            const averageRatingResponse = await axios.get(`http://localhost:5000/users/${book._id}/average-rating`, {
                headers: {
                  Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
              });
              const averageRating = averageRatingResponse.data.averageRating;

              // Round the average rating to the nearest whole number
              const roundedRating = Math.round(averageRating);
    
              return {
                ...book,
                averageRating: roundedRating,
              };
          });
        const booksWithRatings = await Promise.all(averageRatingsPromises);
        setBooks(booksWithRatings);
      } catch (error) {
        console.error(`Error fetching ${orderType} books:`, error);
      }
    };

    fetchBooks();
  }, [token , orderType , category  ]);   
  

  return (
    <div className='bookContainer'>

        <div className="categorie">
            <h2 className="title">{title}</h2>
            <div className="books">
            {books.map((book) => (
            <Link key={book._id} to={`/books/${book._id}`}>
                <Book
                    title={book.title}
                    author={book.author}
                    rating={book.averageRating}
                />
            </Link>
            
            ))}
            </div>
            {category &&
                <div className="seeMoreBtn">
                    <button className="seeMore">See More</button>
                </div>        
            }
        </div>


    </div>
  )
}
