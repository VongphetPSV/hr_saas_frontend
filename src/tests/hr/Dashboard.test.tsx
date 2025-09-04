// src/tests/hr/Dashboard.test.tsx
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { QueryClient } from "@tanstack/react-query";

// Mock the hooks before importing the components
vi.mock("@/hooks/useLeaveBalance", () => ({
  useLeaveBalance: () => ({
    data: { total: 12, used: 4, remaining: 8 },
    isLoading: false,
    error: null,
  }),
}));

vi.mock("@/hooks/useAnnouncements", () => ({
  useAnnouncements: () => ({
    data: {
      items: [
        {
          id: 1,
          title: "New HR policy update",
          created_at: "2025-08-25T09:00:00Z",
          author: "HR Team",
        },
      ],
      total: 1,
    },
    isLoading: false,
    error: null,
  }),
}));

// Now import the components
import { LeaveBalanceCard } from "@/components/hr/LeaveBalanceCard";
import { AnnouncementsList } from "@/components/hr/AnnouncementsList";
import { HRDashboard } from "@/pages/hr/Dashboard";

// Simplified QueryClient mock
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    QueryClient: vi.fn().mockImplementation(() => ({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
      // Add minimal mock methods to prevent errors
      mount: vi.fn(),
      unmount: vi.fn(),
    })),
    useQuery: actual.useQuery,
    QueryClientProvider: actual.QueryClientProvider,
  };
});

// LeaveBalanceCard Tests
describe("LeaveBalanceCard", () => {
  it("renders leave balance correctly", () => {
    render(<LeaveBalanceCard total={12} used={4} remaining={8} />);

    expect(screen.getByText("Total Leave")).toBeTruthy();
    expect(screen.getByText("12")).toBeTruthy();
    expect(screen.getByText("Used Leave")).toBeTruthy();
    expect(screen.getByText("4")).toBeTruthy();
    expect(screen.getByText("Remaining Leave")).toBeTruthy();
    expect(screen.getByText("8")).toBeTruthy();
  });

  it("renders skeleton when loading", () => {
    render(
      <LeaveBalanceCard total={0} used={0} remaining={0} isLoading={true} />
    );

    const skeletonElement = screen.getByRole("alert", { name: /loading/i });
    expect(skeletonElement).toBeTruthy();
  });

  it("renders error state", () => {
    const mockError = new Error("Test error");
    render(
      <LeaveBalanceCard total={0} used={0} remaining={0} error={mockError} />
    );

    expect(screen.getByText("Error loading leave balance")).toBeTruthy();
  });
});

// AnnouncementsList Tests
describe("AnnouncementsList", () => {
  const mockAnnouncements = [
    {
      id: 1,
      title: "New HR policy update",
      created_at: "2025-08-25T09:00:00Z",
      author: "HR Team",
    },
  ];

  it("renders announcements correctly", () => {
    render(<AnnouncementsList items={mockAnnouncements} total={1} />);

    expect(screen.getByText("New HR policy update")).toBeTruthy();
    expect(screen.getByText("HR Team")).toBeTruthy();
  });

  it("renders empty state", () => {
    render(<AnnouncementsList items={[]} total={0} />);

    expect(screen.getByText("No announcements yet")).toBeTruthy();
  });

  it("renders skeleton when loading", () => {
    render(<AnnouncementsList items={[]} total={0} isLoading={true} />);

    const skeletonElement = screen.getByRole("alert", { name: /loading/i });
    expect(skeletonElement).toBeTruthy();
  });
});

// Full Dashboard Test
describe("HRDashboard", () => {
  it("renders dashboard with mock data", () => {
    // Create a QueryClient without wrapping
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(<HRDashboard />);

    expect(screen.getByText("HR Dashboard")).toBeTruthy();
    expect(screen.getByText("Leave Balance")).toBeTruthy();
    expect(screen.getByText("Announcements")).toBeTruthy();
  });
});
