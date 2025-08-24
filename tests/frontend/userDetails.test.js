// UserDetails.test.jsx
import { render, screen } from "@testing-library/react";
import UserDetails from "./UserDetails";

describe("UserDetails Component", () => {
  const buyer = {
    firstname: "John",
    lastname: "Doe",
    email: "john@example.com",
    phone: "1234567890",
  };

  const seller = {
    ...buyer,
    adress: "123 Main St",
    plan: "Premium",
    companyName: "Cars Inc.",
    companyAddress: "456 Commerce Rd",
    companyPhone: "0987654321",
    companyEmail: "contact@carsinc.com",
  };

  it("renders nothing when user is null", () => {
    const { container } = render(<UserDetails user={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders base details for buyer", () => {
    render(<UserDetails user={buyer} profileType="buyer" />);
    expect(screen.getByText("Firstname")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Lastname")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
  });

  it("renders additional seller details", () => {
    render(<UserDetails user={seller} profileType="seller" />);
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
    expect(screen.getByText("Company Name")).toBeInTheDocument();
    expect(screen.getByText("Cars Inc.")).toBeInTheDocument();
    expect(screen.getByText("Company Address")).toBeInTheDocument();
    expect(screen.getByText("456 Commerce Rd")).toBeInTheDocument();
    expect(screen.getByText("Company Phone")).toBeInTheDocument();
    expect(screen.getByText("0987654321")).toBeInTheDocument();
    expect(screen.getByText("Company Email")).toBeInTheDocument();
    expect(screen.getByText("contact@carsinc.com")).toBeInTheDocument();
  });
});
