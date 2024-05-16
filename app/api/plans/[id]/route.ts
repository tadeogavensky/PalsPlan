import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedPlan = await prisma.plan.delete({
      where: { id: parseInt(params.id) }, // Asegúrate de parsear el ID a entero si es necesario
    });

    return NextResponse.json({ message: "Plan deleted", deletedPlan });
  } catch (error) {
    console.error("Error deleting plan:", error);
    return NextResponse.error();
  }
}
