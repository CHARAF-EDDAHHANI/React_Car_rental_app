// Login.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import { loginUserAxios } from "../Axios/userAxios";

// Mock loginUserAxios
jest.mock("../Axios/userAxios");

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Remember me/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

  it("updates input values on change", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "pass123" } });
    fireEvent.click(screen.getByLabelText(/Remember me/i));

    expect(screen.getByLabelText(/Email/i).value).toBe("test@example.com");
    expect(screen.getByLabelText(/Password/i).value).toBe("pass123");
    expect(screen.getByLabelText(/Remember me/i).checked).toBe(true);
  });

  it("validates empty fields and shows errors", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Please input your email!/i)).toBeInTheDocument();
      expect(screen.getByText(/Please input your password!/i)).toBeInTheDocument();
    });
  });

  it("submits form successfully", async () => {
    const mockUser = {
      userId: 1,
      userToken: "token123",
      userType: "buyer",
      firstname: "John",
      lastname: "Doe",
      phone: "123",
      email: "john@example.com",
      adress: "123 St"
    };
    loginUserAxios.mockResolvedValueOnce(mockUser);

    const localStorageSetItemSpy = jest.spyOn(Storage.prototype, "setItem");
    const navigateMock = jest.fn();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "pass123" } });

    fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(loginUserAxios).toHaveBeenCalledWith("john@example.com", "pass123");
      expect(localStorageSetItemSpy).toHaveBeenCalledWith(
        "credentials",
        JSON.stringify({
          userId: mockUser.userId,
          userToken: mockUser.userToken,
          userType: mockUser.userType,
        })
      );
    });
  });
});
