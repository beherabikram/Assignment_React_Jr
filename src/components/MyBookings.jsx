import { Container, ListGroup, Alert } from "react-bootstrap";

const MyBookings = ({ bookings }) => (
  <Container className="my-4">
    <h2 className="mb-4 text-center">My Bookings</h2>
    {bookings.length > 0 ? (
      <ListGroup>
        {bookings.map((event, idx) => (
          <ListGroup.Item
            key={idx}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{event.title}</h5>
              <p className="mb-1">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="mb-1">
                <strong>Price:</strong> ${event.price}
              </p>
            </div>
            <p>
              <strong>Seats Booked:</strong> 1
            </p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    ) : (
      <Alert variant="info" className="text-center">
        No bookings yet.
      </Alert>
    )}
  </Container>
);

export default MyBookings;
