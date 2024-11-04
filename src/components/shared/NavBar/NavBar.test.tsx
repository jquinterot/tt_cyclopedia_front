
import NavBar from './NavBar';
import { describe, test, expect } from "vitest";
import {render, screen} from "@testing-library/react";

describe("NavBar", () => {
    test("should render NavBar", () => {
        render(
            <NavBar/>
        )
        expect(screen.getByText("TT Cyclopedia")).toBeDefined();
        expect(screen.getByText("Menu")).toBeDefined();
    })
})