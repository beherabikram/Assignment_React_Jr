import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import EventCard from "./EventCard";
import Pagination from "./Pagination";
import { fetchEvents } from "../services/api";

const EventList = ({ onBook }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(""); // New state for category filter
  const [searchQuery, setSearchQuery] = useState(""); // New state for search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        // Extract categories from the events
        const uniqueCategories = [...new Set(data.map((event) => event.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch events. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Filter events based on category and search query
  useEffect(() => {
    let filtered = events;

    if (category) {
      filtered = filtered.filter((event) => event.category === category);
    }

    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [category, searchQuery, events]);

  const [page, setPage] = useState(1);

  const paginatedEvents = useMemo(() => {
    const start = (page - 1) * 10;
    return filteredEvents.slice(start, start + 10);
  }, [filteredEvents, page]);

  if (loading) {
    return <Alert variant="info">Loading events...</Alert>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <h1 className="my-4 text-center">Discover Events</h1>

      {/* Filter and Search Inputs */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search for events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>

      {/* Event Cards */}
      <Row>
        {paginatedEvents.map((event) => (
          <Col key={event.id} md={6} lg={4}>
            <EventCard event={event} onBook={onBook} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={Math.ceil(filteredEvents.length / 10)}
      />
    </Container>
  );
};

export default EventList;
