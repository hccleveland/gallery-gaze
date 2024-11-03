import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
    it("Renders gallery gaze", () => {
        render(<App />);
        expect(
            screen.getByRole("heading", {
                level: 1,
            })
        ).toHaveTextContent("Gallery Gaze");
    });
});
