import { z } from "zod";

import { ZJsState } from "./js";
import { ZPersonAttributes } from "./people";
import { ZResponseUpdate } from "./responses";

export const ZRNConfig = z.object({
  environmentId: z.string().cuid(),
  apiHost: z.string(),
  userId: z.string(),
  state: ZJsState,
  expiresAt: z.date(),
});

export type TRNConfig = z.infer<typeof ZRNConfig>;

export const ZRNConfigInput = z.object({
  environmentId: z.string().cuid(),
  apiHost: z.string(),
  debug: z.boolean().optional(),
  errorHandler: z.function().args(z.any()).returns(z.void()).optional(),
  userId: z.string(),
  attributes: ZPersonAttributes.optional(),
});

export type TRNConfigInput = z.infer<typeof ZRNConfigInput>;

export const ZRNConfigUpdateInput = z.object({
  environmentId: z.string().cuid(),
  apiHost: z.string(),
  userId: z.string(),
  state: ZJsState,
});

export type TRNConfigUpdateInput = z.infer<typeof ZRNConfigUpdateInput>;

// force user identification
export const ZRNSyncParams = z.object({
  environmentId: z.string().cuid(),
  apiHost: z.string(),
  userId: z.string(),
});

export type TRNSyncParams = z.infer<typeof ZRNSyncParams>;

export const ZRNWebViewOnMessageData = z.object({
  onFinished: z.boolean().nullish(),
  onDisplay: z.boolean().nullish(),
  onResponse: z.boolean().nullish(),
  responseUpdate: ZResponseUpdate.nullish(),
  onRetry: z.boolean().nullish(),
  onClose: z.boolean().nullish(),
});

export type TRNWebViewOnMessageData = z.infer<typeof ZRNWebViewOnMessageData>;
