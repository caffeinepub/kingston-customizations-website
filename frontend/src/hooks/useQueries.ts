import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob, ImageType } from '../backend';
import type { UserProfile } from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Admin Check
export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Helper function to determine image type from filename
function getImageType(filename: string): ImageType {
  const ext = filename.toLowerCase().split('.').pop();
  switch (ext) {
    case 'png':
      return ImageType.png;
    case 'webp':
      return ImageType.webp;
    case 'jpg':
    case 'jpeg':
    default:
      return ImageType.jpeg;
  }
}

// Image Upload Mutations
export function useUploadHomepageImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bytes, filename }: { bytes: Uint8Array; filename: string }) => {
      if (!actor) throw new Error('Actor not available');
      // Cast to Uint8Array<ArrayBuffer> to match ExternalBlob.fromBytes signature
      const typedBytes = new Uint8Array(bytes.buffer) as Uint8Array<ArrayBuffer>;
      const blob = ExternalBlob.fromBytes(typedBytes);
      const timestamp = BigInt(Date.now());
      const imageType = getImageType(filename);
      return actor.uploadHomepageImage(blob, filename, timestamp, imageType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homepageImage'] });
    },
  });
}

export function useUploadLogo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bytes, filename }: { bytes: Uint8Array; filename: string }) => {
      if (!actor) throw new Error('Actor not available');
      // Cast to Uint8Array<ArrayBuffer> to match ExternalBlob.fromBytes signature
      const typedBytes = new Uint8Array(bytes.buffer) as Uint8Array<ArrayBuffer>;
      const blob = ExternalBlob.fromBytes(typedBytes);
      const timestamp = BigInt(Date.now());
      const imageType = getImageType(filename);
      return actor.uploadLogo(blob, filename, timestamp, imageType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logoImage'] });
    },
  });
}

// Image Retrieval Queries
export function useGetHomepageImage() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ExternalBlob | null>({
    queryKey: ['homepageImage'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getHomepageImage();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000 * 60 * 10, // 10 minutes - cache longer for images
  });
}

export function useGetLogoImage() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ExternalBlob | null>({
    queryKey: ['logoImage'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLogoImage();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000 * 60 * 10, // 10 minutes - cache longer for images
  });
}
