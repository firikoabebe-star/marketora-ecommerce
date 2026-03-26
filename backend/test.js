import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "firiko@test.com",
      password: "supersecret123",
      firstName: "Firiko",
      lastName: "Abebe",
      // role is optional because it defaults to USER
      // createdAt and updatedAt are auto-handled
    }
  })

  console.log("Created user:", user)
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())