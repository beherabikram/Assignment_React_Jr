import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import EventList from "./components/EventList";
import MyBookings from "./components/MyBookings";
import Login from "./pages/Login";
import EventDetails from "./pages/EventDetails";
import { Navbar, Nav, Container } from "react-bootstrap";

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([
    { id: 1, title: "Music Festival", description: "A fun music event", category: "Music", date: "2024-11-15", availableSeats: 30, price: 50 },
    { id: 2, title: "Art Exhibition", description: "Exquisite artworks on display", category: "Art", date: "2024-12-05", availableSeats: 20, price: 30 },
    { id: 3, title: "Tech Conference", description: "Innovations and tech talks", category: "Technology", date: "2024-12-10", availableSeats: 50, price: 100 },
    { id: 4, title: "Food Fest", description: "Delicious food from around the world", category: "Food", date: "2024-12-12", availableSeats: 40, price: 20 },
    { id: 5, title: "Book Fair", description: "Browse and buy books", category: "Literature", date: "2024-12-15", availableSeats: 15, price: 10 },
    { id: 6, title: "Charity Run", description: "Run for a cause", category: "Sports", date: "2024-12-20", availableSeats: 100, price: 0 },
    { id: 7, title: "Comedy Show", description: "Laugh out loud", category: "Entertainment", date: "2024-12-23", availableSeats: 25, price: 40 },
    { id: 8, title: "Photography Workshop", description: "Improve your photography skills", category: "Workshop", date: "2024-12-27", availableSeats: 10, price: 75 },
    { id: 9, title: "Film Screening", description: "A special screening of a classic", category: "Entertainment", date: "2024-12-30", availableSeats: 50, price: 20 },
    { id: 10, title: "Dance Performance", description: "Enjoy a live dance show", category: "Dance", date: "2025-01-05", availableSeats: 30, price: 60 },
    { id: 11, title: "Cooking Class", description: "Learn to cook like a chef", category: "Workshop", date: "2025-01-10", availableSeats: 12, price: 50 },
    { id: 12, title: "Yoga Retreat", description: "Relax and rejuvenate", category: "Health", date: "2025-01-15", availableSeats: 8, price: 100 },
    { id: 13, title: "Rock Concert", description: "Feel the energy live", category: "Music", date: "2025-01-20", availableSeats: 50, price: 120 },
    { id: 14, title: "Poetry Slam", description: "Expressive and impactful poetry", category: "Literature", date: "2025-01-22", availableSeats: 18, price: 15 },
    { id: 15, title: "Chess Tournament", description: "Test your chess skills", category: "Sports", date: "2025-01-30", availableSeats: 20, price: 5 }
    // Event data
  ]);

  const handleBooking = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId && event.availableSeats > 0
          ? { ...event, availableSeats: event.availableSeats - 1 }
          : event
      )
    );

    setBookings((prevBookings) => {
      const existingBooking = prevBookings.find((b) => b.id === eventId);
      if (existingBooking) {
        return prevBookings.map((b) =>
          b.id === eventId ? { ...b, count: b.count + 1 } : b
        );
      } else {
        const bookedEvent = events.find((event) => event.id === eventId);
        return [...prevBookings, { ...bookedEvent, count: 1 }];
      }
    });
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Eventify</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link href="/">Events</Nav.Link>
              <Nav.Link href="/my-bookings">My Bookings</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<EventList events={events} onBook={handleBooking} />} />
          <Route path="/my-bookings" element={<MyBookings bookings={bookings} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event/:id" element={<EventDetails onBook={handleBooking} events={events} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
