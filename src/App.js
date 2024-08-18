import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import AddBook from './components/AddBook';
import BookReport from './components/BookReport';
import BookRequests from './components/BookRequests';
import AddStudent from './components/AddStudent';
import StudentReport from './components/StudentReport';
import IssueBook from './components/IssueBook';
import LoginPage from './components/AdminLoginPage';
import ChoicePage from './components/ChoicePage'; // Import the ChoicePage component
import StudentPage from './components/StudentPage';  
import StudentAuthPage from './components/Studentauth'; // Import the StudentAuthPage component
import AvailableBooksPage from './components/AvailableBooksPage'; // Import the AvailableBooksPage component
import AcceptedBooksPage from './components/AcceptedBooksPage'; 
import StudentDetailsPage from './components/StudentDetailsPage';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false); // Manage student login state

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const issueBook = ({ studentId, bookIsbn }) => {
    const student = students.find((s) => s.StudentID === studentId);
    const book = books.find((b) => b.ISBN === bookIsbn);

    if (student && book) {
      setRequests([...requests, { studentName: student.Name, bookTitle: book.Title }]);
    } else {
      alert('Invalid student ID or book ISBN');
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Library Management System</h1>
        {isAdminLoggedIn ? (
          <>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/add-book">Add Book</Link>
              <Link to="/book-report">Book Report</Link>
              <Link to="/book-requests">Book Requests</Link>
              <Link to="/add-student">Add Student</Link>
              <Link to="/student-report">Student Report</Link>
              <Link to="/issue-book">Issue Book</Link>
              <button onClick={() => setIsAdminLoggedIn(false)}>Logout</button>
            </nav>
            <Routes>
              <Route path="/" element={
                <div className="container home">
                  <h2>Welcome to the Library Management System</h2>
                  <p>
                    Our Library Management System helps manage the day-to-day operations of a library with ease. You can
                    add books, manage students, handle book requests, and much more.
                  </p>
                  <div className="features">
                    <div className="feature">
                      <img src="https://www.seekpng.com/png/detail/11-118492_add-book-icon-add-book-icon-png.png" alt="Add Book" />
                      <h3>Add Books</h3>
                      <p>Add new books to the library collection.</p>
                    </div>
                    <div className="feature">
                      <img src="book-report-icon.png" alt="Book Report" />
                      <h3>Book Reports</h3>
                      <p>View detailed reports of books available in the library.</p>
                    </div>
                    <div className="feature">
                      <img src="https://timetracko.com/src/assets/images/knowledge-base/hero-img-1.png" alt="Book Requests" />
                      <h3>Book Requests</h3>
                      <p>Manage book requests from students.</p>
                    </div>
                    <div className="feature">
                      <img src="add-student-icon.png" alt="Add Student" />
                      <h3>Add Students</h3>
                      <p>Register new students to the library system.</p>
                    </div>
                    <div className="feature">
                      <img src="student-report-icon.png" alt="Student Report" />
                      <h3>Student Reports</h3>
                      <p>View detailed reports of students registered in the library.</p>
                    </div>
                    <div className="feature">
                      <img src="issue-book-icon.png" alt="Issue Book" />
                      <h3>Issue Books</h3>
                      <p>Issue books to students efficiently.</p>
                    </div>
                  </div>
                </div>
              } />
              <Route path="/add-book" element={<AddBook addBook={addBook} />} />
              <Route path="/book-report" element={<BookReport books={books} />} />
              <Route path="/book-requests" element={<BookRequests requests={requests} />} />
              <Route path="/add-student" element={<AddStudent addStudent={addStudent} />} />
              <Route path="/student-report" element={<StudentReport students={students} />} />
              <Route path="/issue-book" element={<IssueBook issueBook={issueBook} />} />

            </Routes>
          </>
        ) : isStudentLoggedIn ?(
          <>
            <Route path="/studentpage" element={<StudentPage />} />  {/* Route for StudentPage */}
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home if no match */}
          </>
        ) : (
          <Routes>
            <Route path="/" element={<ChoicePage />} />
            <Route path="/" element={<ChoicePage />} />
          <Route path="/login/admin" element={<LoginPage setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
          <Route path="/login/student" element={<StudentAuthPage setIsStudentLoggedIn={setIsStudentLoggedIn} />} />
          <Route path="/studentpage" element={<StudentPage />} />
          <Route path="/available-books" element={<AvailableBooksPage />} />
          <Route path="/accepted-books" element={<AcceptedBooksPage />} />
          <Route path="/student-details" element={<StudentDetailsPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
