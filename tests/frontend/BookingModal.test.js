// BookingModal.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import BookingModal from "./BookingModal";

// Mock BookingDate to simplify date selection
vi.mock("./BookingDate", () => ({
  default: ({ onDateChange, role }) => (
    <button onClick={() => onDateChange({ format: () => "2025-01-01" }, role)}>
      MockDate-{role}
    </button>
  ),
}));

describe("BookingModal", () => {
  const onOk = vi.fn();
  const onCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders when open is true", () => {
    render(<BookingModal open={true} onOk={onOk} onCancel={onCancel} />);
    expect(
      screen.getByText(/Choose Your Dates and Location/i)
    ).toBeInTheDocument();
  });

  it("calls onCancel when Cancel button clicked", () => {
    render(<BookingModal open={true} onOk={onOk} onCancel={onCancel} />);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(onCancel).toHaveBeenCalled();
  });

  it("shows alert if required fields are missing", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<BookingModal open={true} onOk={onOk} onCancel={onCancel} />);

    fireEvent.click(screen.getByText(/Confirm/i));
    expect(alertMock).toHaveBeenCalledWith(
      "Please select a date range and both pickup & dropoff locations."
    );
    alertMock.mockRestore();
  });

  it("submits booking info when all fields are filled", () => {
    render(<BookingModal open={true} onOk={onOk} onCancel={onCancel} />);

    // Mock select dates
    fireEvent.click(screen.getByText("MockDate-start"));
    fireEvent.click(screen.getByText("MockDate-end"));

    // Fill pickup/dropoff
    fireEvent.change(screen.getByLabelText(/Pickup Location/i), {
      target: { value: "Airport" },
    });
    fireEvent.change(screen.getByLabelText(/Dropoff Location/i), {
      target: { value: "Hotel" },
    });

    // Change driver option
    fireEvent.click(screen.getByLabelText(/No Driver/i));

    // Confirm booking
    fireEvent.click(screen.getByText(/Confirm/i));

    expect(onOk).toHaveBeenCalledWith({
      bookingInfo: {
        pickupLocation: "Airport",
        dropoffLocation: "Hotel",
        startDate: "2025-01-01",
        endDate: "2025-01-01",
        driver: "NoDriver",
      },
    });
  });
});
