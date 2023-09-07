import { CustomErrorResponseObject } from "src/utils";

export type UpdateViewsResponse = CustomErrorResponseObject<boolean>;
export type UpdateViews = { fitness?: string[]; coach?: string[] };
