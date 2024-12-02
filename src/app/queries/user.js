import "server-only";

import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/actions/session";

export const getUser = cache(async () => {
  let token = (await cookies()).get("session")?.value;
  if (!token) return null;

  let sessionData = await decrypt(token);

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, sessionData.userId))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
});