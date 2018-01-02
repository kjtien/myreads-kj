import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../utils/BooksAPI'
import { Debounce } from 'react-throttle';
 


class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    newBooks: [],
    getBook: false
  }

  getAPIBooks = (event) => {

    const query = event.target.value
    this.setState({ query: query })

    // if user input => run the search
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        if(books.length > 0) {
          this.setState({newBooks: books, getBook: false }) 
        }
        else{
          this.setState({ newBooks: [], getBook: true })
        }  
      })

    // if query is empty => reset state to default
  } else this.setState({newBooks: [], getBook: false })
  }

  render() {

    const { newBooks, getBook } = this.state
    const { books, changeShelf } = this.props

      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search"  to="/">Close</Link>
            <div className="search-books-input-wrapper">
              {/*Add Debounce module*/}
              <Debounce time="300" handler="onChange">
                <input type="text"
                  placeholder="Search by title or author"
                  onChange={ this.getAPIBooks } />
              </Debounce>
            </div>
          </div>
          <div className="search-books-results">
            { newBooks.length > 0 && (
              <div>
                <div className='detail'>
                  <h3>We found { newBooks.length } books for you</h3>
                </div>
                <ol className="books-grid">
                  {newBooks.map((book) => (
                    <Book
                      book={ book }
                      books={ books }
                      key={ book.id }
                      changeShelf={ changeShelf }
                    />
                  ))}
                </ol>
              </div>
            )}
            { getBook  && (
              <div>
                <div className=''>
                  <h3>No books found!</h3>
                  </div>
                </div>
            )}
          </div>
        </div>
      )}
}
export default Search
