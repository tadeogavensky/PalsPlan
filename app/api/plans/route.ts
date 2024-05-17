import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      include: {
        Category: true,
      },
    });
    console.log('plans :>> ', plans);

    return NextResponse.json(plans);
  } catch (error) {
    return NextResponse.json(error);

  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { plan, category } = body;

    const newPlan = await prisma.plan.create({
      data: {
        name: plan,
        categoryId: parseInt(category),
      },
    });
    return NextResponse.json({ newPlan });
  } catch (error) {
    console.log("error :>> ", error);
    return NextResponse.json({ error });
  }
}