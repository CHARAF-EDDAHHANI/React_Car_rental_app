// UploadCar.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UploadCar from "./UploadCar";
import axios from "axios";

jest.mock("axios");

describe("UploadCar Component", () => {
  const handleCloseMock = jest.fn();
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal when open is true", () => {
    render(
      <UploadCar open={true} handleClose={handleCloseMock} onSubmit={onSubmitMock} />
    );
    expect(screen.getByText(/Upload Car Details/i)).toBeInTheDocument();
  });

  it("renders file input and text fields", () => {
    render(
      <UploadCar open={true} handleClose={handleCloseMock} onSubmit={onSubmitMock} />
    );

    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Availability/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Transmission/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
  });

  it("updates form state on input change", () => {
    render(
      <UploadCar open={true} handleClose={handleCloseMock} onSubmit={onSubmitMock} />
    );

    const modelInput = screen.getByLabelText(/Model/i);
    fireEvent.change(modelInput, { target: { value: "Toyota Corolla" } });
    expect(modelInput.value).toBe("Toyota Corolla");

    const yearInput = screen.getByLabelText(/Year/i);
    fireEvent.change(yearInput, { target: { value: "2023" } });
    expect(yearInput.value).toBe("2023");
  });

  it("handles file input", () => {
    render(
      <UploadCar open={true} handleClose={handleCloseMock} onSubmit={onSubmitMock} />
    );

    const file = new File(["dummy content"], "car.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByRole("textbox", { hidden: true }) || screen.getByLabelText(/image/i);
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(fileInput.files[0]).toStrictEqual(file);
  });

  it("submits the form and calls axios.post", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <UploadCar open={true} handleClose={handleCloseMock} onSubmit={onSubmitMock} />
    );

    const modelInput = screen.getByLabelText(/Model/i);
    fireEvent.change(modelInput, { target: { value: "Toyota Corolla" } });

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/api/uploadCar",
        expect.any(FormData)
      );
      expect(handleCloseMock).toHaveBeenCalled();
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });
});
