import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://192.168.1.97:8003';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(`${BACKEND_URL}/api/v1/auth-app/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: data.message || 'Login Failed!' },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true, ...data });
    } catch (error: any) {
        console.error('Login API Error: ', error);
        return NextResponse.json(
            { success: false, message: 'Something Went Wrong' },
            { status: 500 }
        );
    }
}