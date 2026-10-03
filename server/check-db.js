const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lessons = await prisma.lesson.findMany({ take: 5 });
  console.log("Lessons in DB:");
  lessons.forEach(l => console.log(l.title, "=>", l.interactive));
}

main().catch(console.error).finally(() => prisma.$disconnect());
