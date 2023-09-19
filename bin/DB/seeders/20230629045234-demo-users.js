'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        full_name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user_nbcc',
        level: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more user data if needed
    ], {});

    await queryInterface.bulkInsert('Competitions', [
      {
        competition_name: 'Competition 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more competition data if needed
    ], {});

    await queryInterface.bulkInsert('teams', [
      {
        team_name: 'Team 1',
        active: true,
        user_id: 1, // Assign a valid user_id
        competition_id: 1, // Assign a valid competition_id
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more team data if needed
    ], {});

    await queryInterface.bulkInsert('participants', [
      {
        full_name: 'John Doe',
        institution: 'Example University',
        major_faculty: 'Computer Science',
        email: 'john.doe@example.com',
        mobile_number: '1234567890',
        id_line: 'johndoe',
        student_id_image: 'image_url',
        team_roles: 'member',
        team_id: 1, // Assign a valid team_id
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more participant data if needed
    ], {});

    await queryInterface.bulkInsert('payments', [
      {
        price: 100,
        paid: true,
        team_id: 1, // Assign a valid team_id
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more payment data if needed
    ], {});

    await queryInterface.bulkInsert('submissions', [
      {
        paper_doc: 'document_url',
        link: 'submission_link',
        phase: 1,
        score: 80,
        team_id: 1, // Assign a valid team_id
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more submission data if needed
    ], {});

    await queryInterface.bulkInsert('exams', [
      {
        phase: 1,
        competition_id: 1, // Assign a valid competition_id
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more exam data if needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Competitions', null, {});
    await queryInterface.bulkDelete('teams', null, {});
    await queryInterface.bulkDelete('participants', null, {});
    await queryInterface.bulkDelete('payments', null, {});
    await queryInterface.bulkDelete('submissions', null, {});
    await queryInterface.bulkDelete('exams', null, {});
  },
};
