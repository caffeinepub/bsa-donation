import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Donation, Sponsorship } from "../backend.d";
import { SponsorshipTier } from "../backend.d";
import { useActor } from "./useActor";

export { SponsorshipTier };

export function useTopDonors() {
  const { actor, isFetching } = useActor();
  return useQuery<Donation[]>({
    queryKey: ["topDonors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopDonors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllDonations() {
  const { actor, isFetching } = useActor();
  return useQuery<Donation[]>({
    queryKey: ["allDonations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDonations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllSponsorships() {
  const { actor, isFetching } = useActor();
  return useQuery<Sponsorship[]>({
    queryKey: ["allSponsorships"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSponsorships();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useNotificationEmail() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["notificationEmail"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getNotificationEmail();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitDonation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (donation: Omit<Donation, "timestamp">) => {
      if (!actor) throw new Error("Not connected");
      const full: Donation = {
        ...donation,
        timestamp: BigInt(Date.now()) * 1_000_000n,
      };
      return actor.submitDonation(full);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topDonors"] });
      queryClient.invalidateQueries({ queryKey: ["allDonations"] });
    },
  });
}

export function useSubmitSponsorship() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sponsorship: Omit<Sponsorship, "timestamp">) => {
      if (!actor) throw new Error("Not connected");
      const full: Sponsorship = {
        ...sponsorship,
        timestamp: BigInt(Date.now()) * 1_000_000n,
      };
      return actor.submitSponsorship(full);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSponsorships"] });
    },
  });
}

export function useUpdateNotificationEmail() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateNotificationEmail(email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationEmail"] });
    },
  });
}
