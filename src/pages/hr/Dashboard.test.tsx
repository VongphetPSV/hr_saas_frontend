// src/tests/hr/Dashboard.test.tsx
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LeaveBalanceCard } from "@/components/hr/LeaveBalanceCard";
import { AnnouncementsList } from "@/components/hr/AnnouncementsList";
import { HRDashboard } from "@/pages/hr/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// LeaveBalanceCard Tests
describe("LeaveBalanceCard", () => {
  it("renders leave balance correctly", () => {
    render(<LeaveBalanceCard total={12} used={4} remaining={8} />);

    expect(screen.getByText("Total Leave")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Used Leave")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("Remaining Leave")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("renders skeleton when loading", () => {
    render(
      <LeaveBalanceCard total={0} used={0} remaining={0} isLoading={true} />
    );

    const skeletonElement = screen.getByTestId("leave-balance-skeleton");
    expect(skeletonElement).toBeInTheDocument();
  });

  it("renders error state", () => {
    const mockError = new Error("Test error");
    render(
      <LeaveBalanceCard total={0} used={0} remaining={0} error={mockError} />
    );

    expect(screen.getByText("Error loading leave balance")).toBeInTheDocument();
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

    expect(screen.getByText("New HR policy update")).toBeInTheDocument();
    expect(screen.getByText("HR Team")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<AnnouncementsList items={[]} total={0} />);

    expect(screen.getByText("No announcements yet")).toBeInTheDocument();
  });

  it("renders skeleton when loading", () => {
    render(<AnnouncementsList items={[]} total={0} isLoading={true} />);

    const skeletonElement = screen.getByTestId("announcements-skeleton");
    expect(skeletonElement).toBeInTheDocument();
  });
});

// Full Dashboard Test
describe("HRDashboard", () => {
  it("renders dashboard with mock data", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HRDashboard />
      </QueryClientProvider>
    );

    expect(screen.getByText("HR Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Leave Balance")).toBeInTheDocument();
    expect(screen.getByText("Announcements")).toBeInTheDocument();
  });
});
