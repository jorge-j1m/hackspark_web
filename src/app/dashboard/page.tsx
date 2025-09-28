import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { createAuthenticatedApiClient } from "@/lib/api-client";
import { UserDetailsSchema } from "@/types/users";
import DashboardComponent from "./client-component";

// Server-side fetch function (only used for SSR)
async function fetchUserDetailsServer() {
  const apiClient = await createAuthenticatedApiClient();
  return apiClient.get("/users/me", UserDetailsSchema);
}

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  // Prefetch on server using the server function
  await queryClient.prefetchQuery({
    queryKey: ["user_details"],
    queryFn: fetchUserDetailsServer,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DashboardComponent />
      </HydrationBoundary>
    </div>
  );
}
