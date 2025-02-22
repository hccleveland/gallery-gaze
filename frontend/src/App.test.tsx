import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";

import { store } from "./store/index.ts";
import { Provider } from "react-redux";

describe("App", () => {
    it("Renders gallery gaze", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(screen.getByRole("button")).toHaveTextContent("Gallery Gaze");
    });
});
