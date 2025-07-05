import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const project = await prisma.project.create({ data });
  return NextResponse.json(project);
} 