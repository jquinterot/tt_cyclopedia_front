import { describe, test, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInputValue } from "./useInputValue";

describe("useInputValue", () => {
  test("returns empty string initially", () => {
    const { result } = renderHook(() => useInputValue());

    expect(result.current.value).toBe("");
  });

  test("updates value when updateInputValue is called", () => {
    const { result } = renderHook(() => useInputValue());

    act(() => {
      result.current.updateInputValue("hello");
    });

    expect(result.current.value).toBe("hello");
  });

  test("can update value multiple times", () => {
    const { result } = renderHook(() => useInputValue());

    act(() => {
      result.current.updateInputValue("first");
    });
    expect(result.current.value).toBe("first");

    act(() => {
      result.current.updateInputValue("second");
    });
    expect(result.current.value).toBe("second");

    act(() => {
      result.current.updateInputValue("");
    });
    expect(result.current.value).toBe("");
  });
});
