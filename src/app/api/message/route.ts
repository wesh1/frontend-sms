import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
    const cookieStore = await cookies()
    const jwt = cookieStore.get('jwt')?.value

    if (!jwt) {
        // Redirect to login
        return Response.redirect(process.env.URL + '/login')
    }

    const body = await req.json()

    const res = await fetch('http://localhost:8080/api/protected/send-sms', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        cache: 'no-store',
    })

    
    const data = await res.json()
        return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
    })

}
