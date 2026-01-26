import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider } from "react-i18next";

import i18n from "@/utils/i18n";

import CheatSheet from "./CheatSheet";

const renderCheatSheet = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <CheatSheet />
    </I18nextProvider>,
  );

describe("CheatSheet", () => {
  it("renders section titles", () => {
    renderCheatSheet();
    expect(screen.getByText(/conversation starters/i)).toBeInTheDocument();
  });

  it("triggers print on download", async () => {
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => undefined);
    renderCheatSheet();
    await userEvent.click(screen.getByRole("button", { name: /download cheat sheet/i }));
    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });
});
