import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";
import { Header } from "./Header";

const renderHeader = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <Header />
    </I18nextProvider>,
  );

describe("Header", () => {
  it("renders primary navigation links", () => {
    renderHeader();
    expect(screen.getByText("Method")).toBeInTheDocument();
    expect(screen.getByText("Courses")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("opens language menu", async () => {
    renderHeader();
    const button = screen.getByLabelText(/change language/i);
    await userEvent.click(button);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("opens mobile menu dialog", async () => {
    renderHeader();
    const mobileButton = screen.getByLabelText(/open menu/i);
    await userEvent.click(mobileButton);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
