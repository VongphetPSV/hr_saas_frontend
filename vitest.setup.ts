// vitest.setup.ts
import "@testing-library/jest-dom";
import { vi } from "vitest";


// Polyfill for text-encoding in JSDOM
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock React Query's useQuery globally
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn().mockReturnValue({
    data: null,
    isLoading: false,
    error: null,
  }),
}));

