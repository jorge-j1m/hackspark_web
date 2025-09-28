import z from "zod";

interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

interface FailureResponse {
  success: false;
  message: string;
}

export type ApiResponse<T> = SuccessResponse<T> | FailureResponse;

// Zod schemas for API responses
const SuccessResponseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    success: z.literal(true),
    message: z.string(),
    data: dataSchema,
  });

const FailureResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
});

const ApiResponseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.union([SuccessResponseSchema(dataSchema), FailureResponseSchema]);

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.email(),
});

type User = z.infer<typeof UserSchema>;

export const AuthUserSchema = UserSchema.extend({
  sessionId: z.string(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;

export type LoginData = AuthUser;

export type LoginResponse = ApiResponse<AuthUser>;
export const LoginResponseSchema = ApiResponseSchema(AuthUserSchema);

export const SignupDataSchema = UserSchema.omit({ id: true }).extend({
  password: z.string(),
});

export type SignupData = z.infer<typeof SignupDataSchema>;

export type SignupResponse = ApiResponse<User>;
export const SignupResponseSchema = ApiResponseSchema(UserSchema);

export type UserInfoResponse = ApiResponse<User>;
export const UserInfoResponseSchema = ApiResponseSchema(UserSchema);

// Project types
export const ProjectOwnerSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  like_count: z.number(),
  star_count: z.number(),
  tags: z.array(z.string()),
  owner: ProjectOwnerSchema,
  created_at: z.string(),
  updated_at: z.string(),
});

export type ProjectOwner = z.infer<typeof ProjectOwnerSchema>;
export type Project = z.infer<typeof ProjectSchema>;

export const CreateProjectDataSchema = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});

export type CreateProjectData = z.infer<typeof CreateProjectDataSchema>;

export type CreateProjectResponse = ApiResponse<Project>;
export const CreateProjectResponseSchema = ApiResponseSchema(ProjectSchema);
