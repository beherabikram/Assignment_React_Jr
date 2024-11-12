// EventDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import { Container, Button, Spinner, Alert } from "react-bootstrap";

const EventDetails = ({ onBook }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents()
      .then(events => {
        const eventData = events.find(e => e.id === parseInt(id));
        setEvent(eventData);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch event details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" role="status" className="my-4" />;
  if (error) return <Alert variant="danger" className="my-4">{error}</Alert>;

  if (!event) return <Alert variant="warning" className="my-4">Event not found.</Alert>;

  return (
    <Container>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Available Seats:</strong> {event.availableSeats}</p>
      <p><strong>Price:</strong> ${event.price}</p>
      <Button 
        variant="primary" 
        onClick={() => onBook(event.id)}  // Fix this line to use event.id
        disabled={event.availableSeats === 0}
      >
        {event.availableSeats > 0 ? "Book Ticket" : "Fully Booked"}
      </Button>
      <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2">Back to Events</Button>
    </Container>
  );
};

export default EventDetails;
