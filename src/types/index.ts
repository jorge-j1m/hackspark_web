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
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
});

type User = z.infer<typeof UserSchema>;

export const AuthUserSchema = UserSchema.extend({
  sessionId: z.string(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;

export type LoginData = AuthUser;

export type LoginResponse = ApiResponse<AuthUser>;
export const LoginResponseSchema = ApiResponseSchema(AuthUserSchema);

export type UserInfoResponse = ApiResponse<User>;
export const UserInfoResponseSchema = ApiResponseSchema(UserSchema);

