import {NextRequest, NextResponse} from 'next/server';

const BACKEND_URL= process.env.BACKEND_API_URL || 'http://192.168.1.97:8003';
'';

export async function POST(request: NextRequest){
    try {
        const formData= await request.formData();
        const response= await fetch(`${BACKEND_URL}/api/v1/auth-app/auth/signup`,{
            method: 'POST',
            body: formData,
        });

        const data= await response.json();

        if(!response.ok){
            return NextResponse.json(
                {success: false, message: data.message || 'Registration Failed!'},
                {status: response.status}
            );
        }

        return NextResponse.json({success: true, ...data});
    } catch (error: any) {
        console.error("Registeraton API Error: ", error);
        return NextResponse.json(
            {success: false, message: 'Something Went Wrong'},
            {status: 500}
        );
        
    }
}