import { cookies } from 'next/headers'
import { json } from 'stream/consumers'

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })


  if(res.ok == true){
    const data = await res.json()
    const jwt = data.token

    // Set HTTP-only cookie
    const cookieStore = await cookies()

    cookieStore.set({
      name: 'jwt',
      value: jwt,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
    })

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } else if(res.status == 401) {
    return Response.json(
      { error: 'Invalid credentials' },
      { status: res.status }
    );

  } else {
    return Response.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
    
  }

}
