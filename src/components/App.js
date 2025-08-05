import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBook } from "../bookslice/bookslice";
// import { divide } from "cypress/types/lodash";

const App = () => {
  /*
  
  Sorting Functionality	Implement sorting by 
  Title, Author, or Publisher in Ascending or Descending order
  
  */

  const books = useSelector((state) => state.main.books)
  // console.log("Books from Redux:", books)
  const dispatch = useDispatch();
  let [sortKey, setSortKey] = useState('title');
  let [sortOrder, setSortOrder] = useState('asc');

  /*now we have manipulate the dom  using react useffect */

  useEffect(() => {
    fetch("https://www.dbooks.org/api/recent")
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("API error");
      })
      .then((data) => {
        data.books.forEach(book => {
          dispatch(addBook(book));
        });
      })
      .catch(error => console.error('Fetch error:', error));
  }, [dispatch]);
  //  console.log(books) ok response hai bro 

  const sortedBooks = [...books].sort((a, b) => {
    let key = sortKey.toLowerCase()
    const aVal = a[key]?.toLowerCase() || '';
    const bVal = b[key]?.toLowerCase() || '';
    if (sortOrder === 'asc') return aVal.localeCompare(bVal)
    else if (sortOrder === 'dsc') return bVal.localeCompare(aVal)
    return 0
  })
    .slice(0, 15);
  return (
    <div>
      <h1>Books List</h1>
      <div>
      {/* this is the one part  sort key  */}
      <label htmlFor='sort' >Sort by:
        <select id="sort" onChange={(e) => { (setSortKey(e.target.value)) }} >
          <option value="title">Title</option>
          <option value="authors">Author</option>
          <option value="subtitle">Publisher</option>
        </select>
      </label>


      {/* this is the part 2nf assecnding order or decensdign order  */}
      <label htmlFor='orderBy' >Order:
        <select id="orderBy" onChange={(e) => { (setSortOrder(e.target.value)) }} >
          <option value="asc">Ascending</option>
          <option value="dsc">Descending</option>
        </select>
      </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.authors}</td>
              <td>{book.subtitle}</td>
              <td>{book.id}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default App;