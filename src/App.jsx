import React from "react";
import ListOfBooks from "./views/ListOfBooks";
import { Routes, Route } from "react-router-dom";
import Book from "./views/Book";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListOfBooks />} />
        <Route path="/book/:id" element={<Book />} />
      </Routes>
    </div>
  );
}

export default App;
