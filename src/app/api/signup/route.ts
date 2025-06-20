import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/prisma";

export async function POST(req: Request) {
    try {
        console.log('Signup API called');
        
        const body = await req.json();
        console.log('Request body:', body);
        
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Please fill all the fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        console.log('User created successfully:', user.email);

        return NextResponse.json({
            message: "User created successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Signup API error:', error);
        
        // Return a proper JSON error response
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}