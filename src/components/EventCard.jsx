import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, onBook }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    if (event.availableSeats > 0) {
      onBook(event.id);
    }
  };

  return (
    <Card className="mb-4 shadow border-light">
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>Available Seats: {event.availableSeats}</Card.Text>
        <Card.Text>Price: ${event.price}</Card.Text>
        <Button variant="primary" onClick={() => navigate(`/event/${event.id}`)}>
          View Details
        </Button>
        <Button
          variant="success"
          onClick={handleBooking}
          disabled={event.availableSeats === 0}
          className="ms-2"
        >
          {event.availableSeats > 0 ? "Book Ticket" : "Fully Booked"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
