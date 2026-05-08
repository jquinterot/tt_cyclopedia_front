import { describe, test, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useImage } from "./useImage";

describe("useImage", () => {
  test("returns default image initially", () => {
    const { result } = renderHook(() => useImage());

    expect(result.current.image).toBeDefined();
    expect(typeof result.current.image).toBe("string");
  });

  test("updates image when updateImage is called", () => {
    const { result } = renderHook(() => useImage());

    act(() => {
      result.current.updateImage("/new-image.jpg");
    });

    expect(result.current.image).toBe("/new-image.jpg");
  });

  test("can update image multiple times", () => {
    const { result } = renderHook(() => useImage());

    act(() => {
      result.current.updateImage("/image-1.jpg");
    });
    expect(result.current.image).toBe("/image-1.jpg");

    act(() => {
      result.current.updateImage("/image-2.jpg");
    });
    expect(result.current.image).toBe("/image-2.jpg");
  });
});
