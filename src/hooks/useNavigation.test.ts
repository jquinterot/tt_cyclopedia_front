import { describe, test, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useNavigation } from "./useNavigation";
import { ROUTES } from "@/config/routes";

const mockNavigate = vi.fn();
const mockLocation = { pathname: "/posts" };

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

describe("useNavigation", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("goToHome navigates to home route", () => {
    const { result } = renderHook(() => useNavigation());

    result.current.goToHome();

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME);
  });

  test("goToLogin navigates to login route", () => {
    const { result } = renderHook(() => useNavigation());

    result.current.goToLogin();

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
  });

  test("goToSignup navigates to signup route", () => {
    const { result } = renderHook(() => useNavigation());

    result.current.goToSignup();

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.SIGNUP);
  });

  test("goToAbout navigates to about route", () => {
    const { result } = renderHook(() => useNavigation());

    result.current.goToAbout();

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.ABOUT);
  });

  test("goToCreatePost navigates to create post route", () => {
    const { result } = renderHook(() => useNavigation());

    result.current.goToCreatePost();

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.CREATE_POST);
  });

  test("goToPost navigates to post with id", () => {
    const { result } = renderHook(() => useNavigation());

    result.current.goToPost("post-123");

    expect(mockNavigate).toHaveBeenCalledWith("/posts/post-123");
  });

  test("goBack navigates back", () => {
    const { result } = renderHook(() => useNavigation());

    result.current.goBack();

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("goForward navigates forward", () => {
    const { result } = renderHook(() => useNavigation());

    result.current.goForward();

    expect(mockNavigate).toHaveBeenCalledWith(1);
  });

  test("isCurrentPath checks current path", () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.isCurrentPath("/posts")).toBe(true);
    expect(result.current.isCurrentPath("/forums")).toBe(false);
  });

  test("isCurrentRoute checks current route", () => {
    mockLocation.pathname = "/login";
    const { result } = renderHook(() => useNavigation());

    expect(result.current.isCurrentRoute("LOGIN")).toBe(true);
    expect(result.current.isCurrentRoute("HOME")).toBe(false);
  });

  test("exposes currentPath", () => {
    mockLocation.pathname = "/equipment";
    const { result } = renderHook(() => useNavigation());

    expect(result.current.currentPath).toBe("/equipment");
  });

  test("exposes ROUTES constant", () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.ROUTES).toEqual(ROUTES);
  });
});
