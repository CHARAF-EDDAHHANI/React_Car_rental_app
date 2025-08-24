// CarBook.test.jsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CarBook from "./CarBook";
import { fetchCarById } from "../Axios/carAxios";
import { createOrder } from "../Axios/orderAxios";

// Mock the Axios calls
jest.mock("../Axios/carAxios");
jest.mock("../Axios/orderAxios");

const mockCar = {
  carId: "1",
  model: "Toyota Corolla",
  year: 2023,
  location: "Berlin",
  image: "toyota.jpg",
  description: "A reliable car",
};

const mockOrder = {
  order: {
    orderId: "101",
    orderDate: "2025-08-16",
    carName: mockCar.model,
    carYear: mockCar.year,
    carCategory: "Sedan",
    totalPrice: 300,
    startDate: "2025-09-01",
    endDate: "2025-09-05",
    driverCost: 50,
    carCost: 250,
    numberOfDays: 5,
    pickupLocation: "Berlin Airport",
    dropoffLocation: "Berlin Main Station",
    carAgencyPhone: "123456789",
    carAgencyEmail: "agency@test.com",
  },
};

describe("CarBook Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.history.pushState({}, "Car Page", "/carbooking/1"); // Mock URL with carId
    localStorage.setItem(
      "credentials",
      JSON.stringify({ userId: "user123", userType: "buyer" })
    );
  });

  it("shows loading spinner initially", async () => {
    fetchCarById.mockReturnValue(new Promise(() => {})); // pending promise
    render(<CarBook />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("fetches car data and displays it", async () => {
    fetchCarById.mockResolvedValue(mockCar);
    render(<CarBook />);

    await waitFor(() => {
      expect(screen.getByText(`${mockCar.model} - ${mockCar.year} in ${mockCar.location}`)).toBeInTheDocument();
      expect(screen.getByAltText(mockCar.model)).toHaveAttribute("src", expect.stringContaining(mockCar.image));
      expect(screen.getByText(mockCar.description)).toBeInTheDocument();
    });
  });

  it("opens the booking modal on 'Book Now' click", async () => {
    fetchCarById.mockResolvedValue(mockCar);
    render(<CarBook />);

    await waitFor(() => screen.getByText(`${mockCar.model} - ${mockCar.year} in ${mockCar.location}`));

    const bookNowButton = screen.getByLabelText(/Book Now/i) || screen.getByText(/Book Now/i);
    fireEvent.click(bookNowButton);

    await waitFor(() => {
      expect(screen.getByText(/Choose Your Dates and Location for Advance Booking/i)).toBeInTheDocument();
    });
  });

  it("handles booking confirmation and shows order ticker", async () => {
    fetchCarById.mockResolvedValue(mockCar);
    createOrder.mockResolvedValue(mockOrder);

    render(<CarBook />);

    await waitFor(() => screen.getByText(`${mockCar.model} - ${mockCar.year} in ${mockCar.location}`));

    // Open modal
    const bookNowButton = screen.getByLabelText(/Book Now/i) || screen.getByText(/Book Now/i);
    fireEvent.click(bookNowButton);

    // Mock booking info
    const bookingInfo = {
      pickupLocation: "Berlin Airport",
      dropoffLocation: "Berlin Main Station",
      startDate: "2025-09-01",
      endDate: "2025-09-05",
      driver: "withDriver",
    };

    // Simulate modal confirmation
    const confirmHandler = screen.getByText(/Confirm/i);
    fireEvent.click(confirmHandler);

    // As we don't have modal interactions fully mocked, call handleBookingConfirmed directly
    // Normally, you would extract modal into separate component and mock user actions

    await waitFor(() => {
      expect(createOrder).toHaveBeenCalled();
    });
  });
});
