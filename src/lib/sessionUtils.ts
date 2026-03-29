import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUserIdFromSession(): Promise<number | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user?.id) {
      return null;
    }

    return parseInt(session.user.id, 10) || null;
  } catch {
    return null;
  }
}

export async function getServerSession() {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch {
    return null;
  }
}
