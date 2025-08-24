// SignUp.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("SignUp Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Sign Up form", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Buyer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Seller/i })).toBeInTheDocument();
  });

  it("allows user to toggle user type", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const buyerBtn = screen.getByRole("button", { name: /Buyer/i });
    const sellerBtn = screen.getByRole("button", { name: /Seller/i });

    fireEvent.click(buyerBtn);
    expect(buyerBtn).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(sellerBtn);
    expect(sellerBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("validates required fields and prevents submission", async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    window.alert = jest.fn();

    const registerBtn = screen.getByRole("button", { name: /Register/i });
    fireEvent.click(registerBtn);

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        "Please select a user type (Seller or Buyer) to proceed."
      )
    );
  });

  it("submits buyer form successfully", async () => {
    const mockResponse = {
      data: { newBuyer: { buyerId: 1, buyerToken: "abc", firstname: "John", lastname: "Doe", phone: "123", email: "john@example.com", adress: "123 St" } }
    };
    axios.post.mockResolvedValueOnce(mockResponse);
    const navigateMock = jest.fn();

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Buyer/i }));

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "pass123" } });

    // Mock localStorage
    const localStorageSetItemSpy = jest.spyOn(Storage.prototype, "setItem");

    fireEvent.submit(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/api/register-buyer",
        expect.objectContaining({
          firstname: "John",
          lastname: "Doe",
          phone: "123",
          email: "john@example.com",
          password: "pass123",
          userType: "buyer",
          plan: null,
        })
      );
      expect(localStorageSetItemSpy).toHaveBeenCalled();
    });
  });
});
