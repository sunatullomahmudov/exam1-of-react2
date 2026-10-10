import type { UserZ } from "./zustand";
import type { ReduxUser } from "./dataSlice";
import type { JotaiUser } from "./jotai";

// One user = Zustand (name, image) + Redux (job, status) + Jotai (phone, city)
export type CombinedUser = UserZ & Partial<ReduxUser> & Partial<JotaiUser>;
