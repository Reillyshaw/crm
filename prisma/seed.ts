import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    },
  });

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      username: 'demo',
      password: hashedPassword,
      role: 'user',
    },
  });

  // Create projects
  const project1 = await prisma.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'H2 Catering Equipment',
      client: 'H2 Catering',
      status: 'In Progress',
      team: {
        connect: [{ id: adminUser.id }, { id: demoUser.id }],
      },
    },
  });

  const project2 = await prisma.project.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Commercial Kitchen Setup',
      client: 'Kitchen Pro Ltd',
      status: 'Planning',
      team: {
        connect: [{ id: adminUser.id }],
      },
    },
  });

  // Create tasks
  const tasks = await Promise.all([
    prisma.task.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Metadata Batch Processing',
        description: 'Process and update metadata for all product categories',
        status: 'todo',
        projectId: project1.id,
        createdById: adminUser.id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        assignees: {
          connect: [{ id: demoUser.id }],
        },
      },
    }),
    prisma.task.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'Keyword Research',
        description: 'Research and analyze keywords for cooking equipment category',
        status: 'in_progress',
        projectId: project1.id,
        createdById: adminUser.id,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        assignees: {
          connect: [{ id: adminUser.id }],
        },
      },
    }),
    prisma.task.upsert({
      where: { id: 3 },
      update: {},
      create: {
        title: 'Category Structure Review',
        description: 'Review and optimize category hierarchy for better SEO',
        status: 'done',
        projectId: project1.id,
        createdById: adminUser.id,
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        assignees: {
          connect: [{ id: adminUser.id }],
        },
      },
    }),
    prisma.task.upsert({
      where: { id: 4 },
      update: {},
      create: {
        title: 'Competitor Analysis',
        description: 'Analyze competitor websites and keyword strategies',
        status: 'todo',
        projectId: project2.id,
        createdById: adminUser.id,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        assignees: {
          connect: [{ id: demoUser.id }],
        },
      },
    }),
  ]);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Cooking Equipment',
        projectId: project1.id,
        metadata: JSON.stringify({
          pageName: 'Cooking Equipment',
          h1: 'Commercial Cooking Equipment',
          url: '/cooking-equipment',
          mappedUrl: '/cooking-equipment',
        }),
      },
    }),
    prisma.category.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Ovens',
        parentId: 1,
        projectId: project1.id,
        metadata: JSON.stringify({
          pageName: 'Ovens',
          h1: 'Commercial Ovens',
          url: '/cooking-equipment/ovens',
          mappedUrl: '/cooking-equipment/ovens',
        }),
      },
    }),
    prisma.category.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Refrigeration Equipment',
        projectId: project1.id,
        metadata: JSON.stringify({
          pageName: 'Refrigeration Equipment',
          h1: 'Refrigeration Equipment',
          url: '/refrigeration-equipment',
          mappedUrl: '/refrigeration-equipment',
        }),
      },
    }),
  ]);

  // Create keywords
  const keywords = await Promise.all([
    prisma.keyword.upsert({
      where: { id: 1 },
      update: {},
      create: {
        value: 'commercial oven',
        volume: 1600,
        categoryId: 2,
        source: 'google',
      },
    }),
    prisma.keyword.upsert({
      where: { id: 2 },
      update: {},
      create: {
        value: 'professional oven',
        volume: 320,
        categoryId: 2,
        source: 'google',
      },
    }),
    prisma.keyword.upsert({
      where: { id: 3 },
      update: {},
      create: {
        value: 'catering oven',
        volume: 110,
        categoryId: 2,
        source: 'google',
      },
    }),
  ]);

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { id: 1 },
      update: {},
      create: { name: 'SEO' },
    }),
    prisma.tag.upsert({
      where: { id: 2 },
      update: {},
      create: { name: 'High Priority' },
    }),
    prisma.tag.upsert({
      where: { id: 3 },
      update: {},
      create: { name: 'Research' },
    }),
  ]);

  // Connect tags to tasks
  await prisma.task.update({
    where: { id: 1 },
    data: {
      tags: {
        connect: [{ id: 1 }, { id: 2 }], // SEO, High Priority
      },
    },
  });

  await prisma.task.update({
    where: { id: 2 },
    data: {
      tags: {
        connect: [{ id: 3 }], // Research
      },
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 