import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const task = await prisma.task.create({ data });
  return NextResponse.json(task);
} 