const User = require('../models/User');
const Project = require('../models/Project');
const Review = require('../models/Review');

const seedUsers = async () => {
    const users = [
        {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'client',
            skills: ['React', 'Node.js'],
            verification: { level: 'Verified', status: 'approved', documents: ['doc1.pdf'] },
        },
        {
            name: 'Jane Smith',
            email: 'jane@example.com',
            password: 'password456',
            role: 'freelancer',
            skills: ['UI/UX Design', 'Figma'],
            verification: { level: 'Basic', status: 'pending', documents: [] },
        },
    ];

    await User.deleteMany({});
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded');

    return createdUsers; // Return created users to get their IDs
};

const seedProjects = async (createdUsers) => {
    const clientId1 = createdUsers[0]._id; // John Doe
    const freelancerId1 = createdUsers[1]._id; // Jane Smith

    const projects = [
        {
            title: 'E-commerce Website',
            description: 'A full-stack e-commerce site',
            clientId: clientId1, // Assign John Doe as the client
            status: 'in progress',
            deadline: new Date('2023-12-31'),
            bids: [
                {
                    freelancerId: freelancerId1, // Assign Jane Smith as the freelancer
                    amount: 500,
                    message: 'I can complete the project for you.',
                    status: 'pending',
                },
            ],
        },
        {
            title: 'Mobile App Design',
            description: 'Design a mobile app for fitness tracking',
            clientId: clientId1,
            status: 'completed',
            deadline: new Date('2023-11-15'),
            bids: [
                {
                    freelancerId: freelancerId1,
                    amount: 300,
                    message: 'I can design the app with a modern UX.',
                    status: 'accepted',
                },
            ],
        },
    ];

    await Project.deleteMany({});
    const createdProjects = await Project.insertMany(projects);
    console.log('Projects seeded');

    return createdProjects; // Return created projects to get their IDs
};

const seedReviews = async (createdUsers, createdProjects) => {
    const projectId1 = createdProjects[0]._id; // First project ID
    const clientId1 = createdUsers[0]._id; // John Doe
    const freelancerId1 = createdUsers[1]._id; // Jane Smith

    const review = new Review({
        projectId: projectId1, // Use actual project ID
        clientId: clientId1,
        freelancerId: freelancerId1,
        rating: 5,
        comment: 'Great work!',
    });

    await review.save();
    console.log('Review seeded');
};

const seedDatabase = async (req, res) => {
    try {
        const createdUsers = await seedUsers(); // Get created user IDs
        const createdProjects = await seedProjects(createdUsers); // Get created project IDs
        await seedReviews(createdUsers, createdProjects); // Use valid IDs for review seeding
        res.status(200).json({ message: 'Seeding complete' });
    } catch (error) {
        console.error('Error during seeding', error);
        res.status(500).json({ error: 'Error during seeding' });
    }
};

module.exports = { seedDatabase };
