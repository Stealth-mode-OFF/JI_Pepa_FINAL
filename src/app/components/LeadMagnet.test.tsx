import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18n from "@/utils/i18n";
import { LeadMagnet } from "./LeadMagnet";

const mocks = vi.hoisted(() => {
  const insertMock = vi.fn().mockResolvedValue({ error: null });
  const fromMock = vi.fn(() => ({ insert: insertMock }));
  return { insertMock, fromMock };
});

vi.mock("@/utils/supabase/client", () => ({
  supabase: { from: mocks.fromMock },
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const renderLeadMagnet = () =>
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <LeadMagnet />
      </I18nextProvider>
    </MemoryRouter>,
  );

describe("LeadMagnet", () => {
  it("submits email to Supabase", async () => {
    renderLeadMagnet();
    const input = screen.getByPlaceholderText(/name@company.com/i);
    await userEvent.type(input, "test@example.com");
    await userEvent.click(screen.getByRole("button", { name: /get the cheat sheet/i }));

    await waitFor(() => {
      expect(mocks.fromMock).toHaveBeenCalledWith("lead_magnet_signups");
      expect(mocks.insertMock).toHaveBeenCalledWith({
        email: "test@example.com",
        source: "lead_magnet",
      });
    });
  });
});
