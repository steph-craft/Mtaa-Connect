import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ServiceCard from "./ServiceCard";

const service = {
  id: "1",
  name: "Home Cleaning",
  category: "Cleaning",
  location: "Kilimani, Nairobi",
  price: 2500,
  image: "https://example.com/cleaning.jpg",
  ownerId: "user1",
};

describe("ServiceCard", () => {
  it("displays service information", () => {
    render(
      <ServiceCard
        service={service}
        user={null}
        onBook={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("Home Cleaning")).toBeInTheDocument();
    expect(screen.getByText("Cleaning")).toBeInTheDocument();
    expect(screen.getByText("Kilimani, Nairobi")).toBeInTheDocument();
    expect(screen.getByText(/2,500/)).toBeInTheDocument();
  });

  it("calls the booking function when Book Now is clicked", () => {
    const onBook = vi.fn();

    render(
      <ServiceCard
        service={service}
        user={null}
        onBook={onBook}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /book now/i }));

    expect(onBook).toHaveBeenCalledWith(service);
  });

  it("shows Edit and Delete buttons to the service owner", () => {
    render(
      <ServiceCard
        service={service}
        user={{ uid: "user1" }}
        onBook={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("hides Edit and Delete buttons from other users", () => {
    render(
      <ServiceCard
        service={service}
        user={{ uid: "user2" }}
        onBook={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.queryByRole("button", { name: "Edit" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Delete" })).not.toBeInTheDocument();
  });
});