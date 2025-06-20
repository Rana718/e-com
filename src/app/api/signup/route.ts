import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/prisma";


export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Please fill all the fields' });
        }
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' });
        }
        const hashedPassword = await hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({
            message: "User created successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Something went wrong' });
    }
}