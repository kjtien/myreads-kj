import React, { Component } from 'react';
import PropTypes from 'prop-types'
//import ShelfChanger from './ShelfChanger'


class Book extends Component {

  static propTypes = {
    //Book: 
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    const {
      book,
      books,
      changeShelf
    } = this.props

    // set current shelf to none as default
    let currentShelf = 'none'

    // if book is in current list, set current shelf to book.shelf
    for (let item of books ) {
      if (item.id === book.id)  {
        currentShelf = item.shelf
        break
      }
    }

    return (
          <li>
            <div className="book">
              <div className="book-top">
                {/*Book Cover*/}
                <div
                  className="book-cover"
                  style={{ backgroundImage: `url(${book.imageLinks.thumbnail })`}}>
                </div>
                {/*Select*/}
                <div className="book-shelf-changer">
                  <select  onChange={(event) => changeShelf(book, event.target.value)}
                    defaultValue={ currentShelf }>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              {/*Book Title*/}
              <div className="book-title">{book.title}</div>
              {/*Book Authors*/}
              <div className="book-authors">{book.authors}</div>
              
            </div>
          </li>
    )
  }

}

export default Book
