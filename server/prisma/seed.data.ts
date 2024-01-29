import { PrismaClient } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();

const generateRandomProjet = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    isRead: faker.random.boolean(),
    createdDate: faker.date.past(),
    updatedDate: faker.date.future(),
    messages: {
      create: {
        content: faker.lorem.paragraph(),
        createdDate: faker.date.past(),
      },
    },
  };
};

async function createAndSaveRandomProjects() {
  try {
    for (let i = 0; i < 10; i++) {
      const randomProjet = generateRandomProjet();
      const newProjet = await prisma.projet.create({ data: randomProjet });
      console.log('Projet enregistré avec succès :', newProjet);
    }
  } catch (error) {
    console.error("Erreur lors de la création et de l'enregistrement des projets :", error);
  } finally {
    await prisma.$disconnect(); // Déconnectez-vous de la base de données une fois terminé
  }
}

createAndSaveRandomProjects();
