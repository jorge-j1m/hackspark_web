import z from "zod";
import type { ApiResponse } from ".";

export const UserTechSchema = z.object({
  name: z.string(),
  slug: z.string(),
  skill_level: z.string(),
});

export const UserProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  like_count: z.number(),
  star_count: z.number(),
  added_at: z.string(),
});

export const UserDetailsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  // technologies: z.optional(z.array(UserTechSchema)), these may be null
  // projects: z.optional(z.array(UserProjectSchema)),
  technologies: z.array(UserTechSchema).optional(),
  projects: z.array(UserProjectSchema).optional(),
});

export type UserDetails = z.infer<typeof UserDetailsSchema>;
export type UserDetailsApiResponse = ApiResponse<UserDetails>;
