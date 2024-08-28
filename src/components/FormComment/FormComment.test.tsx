
import FormComment from './FormComment';
import { describe, test, expect } from "vitest";
import {render, screen} from "@testing-library/react";


describe("FormComment", () => {
    test("should render FormComment", () => {
        render(
            <FormComment/>
        )
        expect(screen.getByRole('button', { name: 'Add Comment' }));
        expect(screen.getByRole('button', { name: 'Cancel' }));
   
        const paragraph = screen.getByRole('paragraph');
        expect(paragraph.textContent).toContain("Add Comment");
    })
})