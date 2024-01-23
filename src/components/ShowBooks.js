import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteBook, fetchBooks } from "../features/bookSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBooksStatus } from "../features/bookSlice";

const ShowBooks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booksStatus = useSelector(getBooksStatus);
  const { books } = useSelector((state) => {
    return state.app;
  });

  const EditOnClick = (id) =>{
    navigate("/editbook/" + id, { state: { id: id } });
  }
  
  const ViewBookOnClick = (id) => {
    navigate("/viewbook/" + id, { state: { id: id } });
  };

  const DeleteOnClick = (book) => {
    if(alert("Do you want to delete this book?")){
      
    dispatch(DeleteBook(book));
    }
  };

  useEffect(() => {
    dispatch(fetchBooks());
    // eslint-disable-next-line
  }, []);

  if (booksStatus === "succeeded") {
    console.log(booksStatus);
    return (
      <div className="container-fluid main ">
        <h1 className="text-center my-2" id="booksheading">All Books</h1>
        <div className="d-flex container-fluid flex-wrap justify-content-center ">
          {books.map((book) => (
            <div
              className="card BookCard m-3 border-1 border-info overflow-hidden"
              key={book.id}
              style={{ width: "250px" }}
            >
              <div className="position-relative ">
                <img
                  className="card-img-top BookCardImage"
                  src={book.cover_image}
                  alt="Card Banner"
                />
                <div className="dropdown position-absolute top-0 end-0 m-1">
                  <button
                    className="btn bg-white opacity-50 rounded-circle"
                    data-bs-toggle="dropdown"
                    id="threedots"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="25"
                      fill="currentColor"
                      className="bi bi-three-dots"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                    </svg>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark dm">
                    <li className="di">
                      <button className="dropdown-item btn " id={book.id}
                    onClick={() => ViewBookOnClick(book.id)}>View</button>
                    </li>
                    <li className="di">
                      <button className="dropdown-item btn di" onClick={() => EditOnClick(book.id)} >Edit</button>
                    </li> 
                    <li className="di">
                      <button className="dropdown-item btn di" onClick={() => DeleteOnClick({ book })}>Delete</button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card-body">
                <div className="d-flex justify-content-center">
                  <h6 className="card-title">{book.title}</h6>
                </div>
                {/* <div className="d-flex justify-content-center ">
                  <button
                    className="btn btn-primary mx-2"
                    id={book.id}
                    onClick={() => ViewBookOnClick(book.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => DeleteOnClick({ book })}
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid main ">
        <h1 className="text-center">All books</h1>
        <h1 className="text-center">Loading books</h1>
      </div>
    );
  }
};

export default ShowBooks;
