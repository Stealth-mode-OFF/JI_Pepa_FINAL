import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";
import { LeadMagnet } from "./LeadMagnet";

const insertMock = vi.fn().mockResolvedValue({ error: null });
const fromMock = vi.fn(() => ({ insert: insertMock }));

vi.mock("@/utils/supabase/client", () => ({
  supabase: { from: fromMock },
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const renderLeadMagnet = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <LeadMagnet />
    </I18nextProvider>,
  );

describe("LeadMagnet", () => {
  it("submits email to Supabase", async () => {
    renderLeadMagnet();
    const input = screen.getByPlaceholderText(/name@company.com/i);
    await userEvent.type(input, "test@example.com");
    await userEvent.click(screen.getByRole("button", { name: /get the cheat sheet/i }));

    await waitFor(() => {
      expect(fromMock).toHaveBeenCalledWith("lead_magnet_signups");
      expect(insertMock).toHaveBeenCalledWith({
        email: "test@example.com",
        source: "lead_magnet",
      });
    });
  });
});
