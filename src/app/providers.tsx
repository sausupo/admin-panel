import { queryClient } from "@/shared/api/query-client";
import { ThemeProvider } from "@/shared/ui/theme/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
