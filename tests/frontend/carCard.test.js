// CarCard.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CarCard from "./CarCard";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockCar = {
  carId: "123",
  image: "test-car.jpg",
  model: "Toyota Corolla",
  year: 2022,
  category: "Sedan",
  transmission_type: "Automatic",
  seats: 5,
  daily_price: 50,
  weekly_price: 300,
  monthly_price: 1200,
  rating: 4.5,
  numberOfReviews: 10,
};

describe("CarCard", () => {
  it("renders car info correctly", () => {
    render(
      <MemoryRouter>
        <CarCard car={mockCar} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Toyota Corolla/i)).toBeInTheDocument();
    expect(screen.getByText("(2022)")).toBeInTheDocument();
    expect(screen.getByText("Sedan")).toBeInTheDocument();
    expect(screen.getByText("Automatic")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("50/Day")).toBeInTheDocument();
    expect(screen.getByText("300/Week")).toBeInTheDocument();
    expect(screen.getByText("1200/Month")).toBeInTheDocument();
  });

  it("renders rating with reviews", () => {
    render(
      <MemoryRouter>
        <CarCard car={mockCar} />
      </MemoryRouter>
    );

    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("(10 reviews)")).toBeInTheDocument();
  });

  it("falls back to N/A if values are missing", () => {
    const incompleteCar = { carId: "999", image: "car.jpg", model: "Unknown", year: 2020 };
    render(
      <MemoryRouter>
        <CarCard car={incompleteCar} />
      </MemoryRouter>
    );

    expect(screen.getAllByText("N/A")).toHaveLength(3); // category, transmission, seats
  });

  it("navigates to booking page on click", () => {
    render(
      <MemoryRouter>
        <CarCard car={mockCar} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("img", { name: /Toyota Corolla/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/carbooking/123");
  });
});
