// OrderTicker.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import OrderTicker from "./OrderTicker";
import generateBookingPDF from "../utils/generateBookingPDF";

// Mock the PDF generator
vi.mock("../utils/generateBookingPDF", () => ({
  default: vi.fn(),
}));

describe("OrderTicker", () => {
  const mockData = {
    orderId: "ORD123",
    orderDate: "2025-01-15",
    carName: "Tesla Model S",
    carYear: 2023,
    carCategory: "Electric",
    totalPrice: 1500,
    startDate: "2025-01-10",
    endDate: "2025-01-15",
    driverCost: 200,
    carCost: 1300,
    numberOfDays: 5,
    pickupLocation: "Airport",
    dropoffLocation: "Hotel",
    carAgencyPhone: "123-456-7890",
    carAgencyEmail: "agency@example.com",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders fallback message when no data provided", () => {
    render(<OrderTicker orderticketData={null} />);
    expect(screen.getByText(/No orders created yet/i)).toBeInTheDocument();
  });

  it("renders booking confirmation header", () => {
    render(<OrderTicker orderticketData={mockData} />);
    expect(
      screen.getByText(/Booking Confirmation Ticket/i)
    ).toBeInTheDocument();
  });

  it("displays ticket details from order data", () => {
    render(<OrderTicker orderticketData={mockData} />);

    expect(
      screen.getByText(/Desired Car/i).nextSibling.textContent
    ).toContain("Tesla Model S (2023) - Electric");

    expect(screen.getByText(/Number of Days/i).nextSibling.textContent).toBe(
      "5"
    );
    expect(screen.getByText(/Car Cost/i).nextSibling.textContent).toBe("$1300");
    expect(screen.getByText(/Driver Cost/i).nextSibling.textContent).toBe(
      "$200"
    );
    expect(screen.getByText(/Total Price/i).nextSibling.textContent).toBe(
      "$1500"
    );
    expect(screen.getByText(/Pickup Location/i).nextSibling.textContent).toBe(
      "Airport"
    );
    expect(screen.getByText(/Dropoff Location/i).nextSibling.textContent).toBe(
      "Hotel"
    );
    expect(screen.getByText(/Car Agency Phone/i).nextSibling.textContent).toBe(
      "123-456-7890"
    );
    expect(screen.getByText(/Car Agency Email/i).nextSibling.textContent).toBe(
      "agency@example.com"
    );
    expect(screen.getByText(/Ticket ID/i).nextSibling.textContent).toBe(
      "ORD123"
    );
  });

  it("calls generateBookingPDF when download button is clicked", () => {
    render(<OrderTicker orderticketData={mockData} />);
    fireEvent.click(screen.getByText(/Download Ticket/i));
    expect(generateBookingPDF).toHaveBeenCalledWith(
      mockData,
      expect.any(Array) // ticketList passed as second argument
    );
  });
});
