import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

/**
 * Retrieves the numeric user ID from the current session.
 * @returns {Promise<number | null>} The user ID if authenticated, otherwise null.
 */
export async function getUserIdFromSession(): Promise<number | null> {
  const session = await getServerSession(authOptions);
  // The user object in the session might have an 'id' property which is a string.
  const userIdString = (session?.user as { id?: string })?.id;

  if (!userIdString) {
    return null; // User is not authenticated or id is not in session
  }

  const userId = parseInt(userIdString, 10);
  if (isNaN(userId)) {
    console.error('Failed to parse user ID from session:', userIdString);
    return null; // Parsed ID is not a number
  }

  return userId;
}
