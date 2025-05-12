import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies();
  
  // Remove the JWT cookie
  cookieStore.delete('jwt');

  return NextResponse.json({ message: 'Logged out' });
}
