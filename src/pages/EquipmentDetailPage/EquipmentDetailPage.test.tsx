import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import EquipmentDetailPage from "./EquipmentDetailPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { PropsWithChildren } from "react";

const mockEquipment = {
  id: "eq-1",
  name: "Viscaria",
  brand: "Butterfly",
  category: "blade",
  description: "A legendary blade used by many pros.",
  price_usd: 154.99,
  avg_rating: 4.8,
  review_count: 42,
  release_year: 2012,
  image_url: "/static/equipment/blades/butterfly-viscaria.jpg",
  blade_specs: {
    speed: 85,
    control: 78,
    stiffness: 80,
    hardness: 75,
    plies: "5+2",
    material: "ALC",
    weight_min: 85,
    weight_max: 92,
    thickness: 5.8,
    handle_types: "FL, ST, AN",
  },
};

const mockPosts = [
  {
    id: "post-1",
    title: "Amazing blade!",
    content: "Best control I've ever had.",
    image_url: "/test.jpg",
    likes: 10,
    likedByCurrentUser: false,
    author: "player1",
    timestamp: "2024-01-01T00:00:00Z",
  },
  {
    id: "post-2",
    title: "Great for looping",
    content: "The ALC fiber gives perfect feedback.",
    image_url: "/test2.jpg",
    likes: 5,
    likedByCurrentUser: false,
    author: "player2",
    timestamp: "2024-01-02T00:00:00Z",
  },
];

const mockUseEquipmentDetail = vi.fn();
const mockUsePostsByEquipment = vi.fn();

vi.mock("@/hooks/equipment", () => ({
  useEquipmentDetail: (...args: unknown[]) => mockUseEquipmentDetail(...args),
}));

vi.mock("@/hooks/posts/usePostsByEquipment", () => ({
  usePostsByEquipment: (...args: unknown[]) => mockUsePostsByEquipment(...args),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

describe("EquipmentDetailPage", () => {
  beforeEach(() => {
    queryClient.clear();
    mockUseEquipmentDetail.mockReset();
    mockUsePostsByEquipment.mockReset();
  });

  test("renders loading state", () => {
    mockUseEquipmentDetail.mockReturnValue({
      equipment: null,
      isLoading: true,
      error: null,
    });
    mockUsePostsByEquipment.mockReturnValue({
      posts: [],
      isLoading: false,
      error: null,
    });

    render(<EquipmentDetailPage />, { wrapper });

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  test("renders error state when equipment not found", () => {
    mockUseEquipmentDetail.mockReturnValue({
      equipment: null,
      isLoading: false,
      error: new Error("Not found"),
    });
    mockUsePostsByEquipment.mockReturnValue({
      posts: [],
      isLoading: false,
      error: null,
    });

    render(<EquipmentDetailPage />, { wrapper });

    expect(screen.getByText("Equipment not found")).toBeInTheDocument();
  });

  test("renders equipment details with specs", () => {
    mockUseEquipmentDetail.mockReturnValue({
      equipment: mockEquipment,
      isLoading: false,
      error: null,
    });
    mockUsePostsByEquipment.mockReturnValue({
      posts: [],
      isLoading: false,
      error: null,
    });

    render(<EquipmentDetailPage />, { wrapper });

    expect(screen.getByText("Viscaria")).toBeInTheDocument();
    expect(screen.getByText("Butterfly")).toBeInTheDocument();
    expect(screen.getByText("Blade Specifications")).toBeInTheDocument();
    expect(screen.getByText("Speed")).toBeInTheDocument();
    expect(screen.getByText("85")).toBeInTheDocument();
    expect(screen.getByText("5+2")).toBeInTheDocument();
    expect(screen.getByText("ALC")).toBeInTheDocument();
  });

  test("renders related posts in reviews section", () => {
    mockUseEquipmentDetail.mockReturnValue({
      equipment: mockEquipment,
      isLoading: false,
      error: null,
    });
    mockUsePostsByEquipment.mockReturnValue({
      posts: mockPosts,
      isLoading: false,
      error: null,
    });

    render(<EquipmentDetailPage />, { wrapper });

    expect(screen.getByText("Community Reviews")).toBeInTheDocument();
    expect(screen.getByText("Amazing blade!")).toBeInTheDocument();
    expect(screen.getByText("Great for looping")).toBeInTheDocument();
    expect(screen.getByText("By player1")).toBeInTheDocument();
    expect(screen.getByText("By player2")).toBeInTheDocument();
  });

  test("links to post detail from review card", () => {
    mockUseEquipmentDetail.mockReturnValue({
      equipment: mockEquipment,
      isLoading: false,
      error: null,
    });
    mockUsePostsByEquipment.mockReturnValue({
      posts: mockPosts,
      isLoading: false,
      error: null,
    });

    render(<EquipmentDetailPage />, { wrapper });

    const postLinks = screen.getAllByRole("link");
    expect(postLinks[0]).toHaveAttribute("href", "/post/post-1");
  });

  test("renders empty state when no reviews exist", () => {
    mockUseEquipmentDetail.mockReturnValue({
      equipment: mockEquipment,
      isLoading: false,
      error: null,
    });
    mockUsePostsByEquipment.mockReturnValue({
      posts: [],
      isLoading: false,
      error: null,
    });

    render(<EquipmentDetailPage />, { wrapper });

    expect(screen.getByText("Community Reviews")).toBeInTheDocument();
    expect(screen.getByText("No reviews yet.")).toBeInTheDocument();
    expect(screen.getByText(/Be the first to review/)).toBeInTheDocument();
  });

  test("renders loading spinner for reviews", () => {
    mockUseEquipmentDetail.mockReturnValue({
      equipment: mockEquipment,
      isLoading: false,
      error: null,
    });
    mockUsePostsByEquipment.mockReturnValue({
      posts: [],
      isLoading: true,
      error: null,
    });

    render(<EquipmentDetailPage />, { wrapper });

    expect(screen.getByText("Community Reviews")).toBeInTheDocument();
    const spinner = screen.getByText((_, el) => el?.classList.contains("animate-spin") ?? false);
    expect(spinner).toBeInTheDocument();
  });

  test("renders price and rating when available", () => {
    mockUseEquipmentDetail.mockReturnValue({
      equipment: mockEquipment,
      isLoading: false,
      error: null,
    });
    mockUsePostsByEquipment.mockReturnValue({
      posts: [],
      isLoading: false,
      error: null,
    });

    render(<EquipmentDetailPage />, { wrapper });

    expect(screen.getByText("$154.99")).toBeInTheDocument();
    expect(screen.getByText("4.8")).toBeInTheDocument();
    expect(screen.getByText("(42 reviews)")).toBeInTheDocument();
  });
});
