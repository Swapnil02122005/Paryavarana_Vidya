import { storage } from "./storage";

const indianNames = [
  { name: "Aarav Sharma", username: "aarav_sharma", location: "Mumbai, Maharashtra" },
  { name: "Diya Patel", username: "diya_patel", location: "Ahmedabad, Gujarat" },
  { name: "Arjun Singh", username: "arjun_singh", location: "Delhi" },
  { name: "Ananya Reddy", username: "ananya_reddy", location: "Hyderabad, Telangana" },
  { name: "Vivaan Kumar", username: "vivaan_kumar", location: "Bangalore, Karnataka" },
  { name: "Saanvi Gupta", username: "saanvi_gupta", location: "Pune, Maharashtra" },
  { name: "Aditya Verma", username: "aditya_verma", location: "Kolkata, West Bengal" },
  { name: "Ishaan Iyer", username: "ishaan_iyer", location: "Chennai, Tamil Nadu" },
  { name: "Kiara Mehta", username: "kiara_mehta", location: "Surat, Gujarat" },
  { name: "Reyansh Nair", username: "reyansh_nair", location: "Kochi, Kerala" },
  { name: "Myra Joshi", username: "myra_joshi", location: "Jaipur, Rajasthan" },
  { name: "Kabir Desai", username: "kabir_desai", location: "Indore, Madhya Pradesh" },
  { name: "Aadhya Rao", username: "aadhya_rao", location: "Mysore, Karnataka" },
  { name: "Shaurya Bhat", username: "shaurya_bhat", location: "Mangalore, Karnataka" },
  { name: "Anvi Agarwal", username: "anvi_agarwal", location: "Lucknow, Uttar Pradesh" },
  { name: "Vihaan Pandey", username: "vihaan_pandey", location: "Varanasi, Uttar Pradesh" },
  { name: "Navya Chopra", username: "navya_chopra", location: "Chandigarh" },
  { name: "Atharva Mishra", username: "atharva_mishra", location: "Bhopal, Madhya Pradesh" },
  { name: "Aarohi Kapoor", username: "aarohi_kapoor", location: "Amritsar, Punjab" },
  { name: "Dhruv Malhotra", username: "dhruv_malhotra", location: "Gurgaon, Haryana" },
];

const teacherNames = [
  { name: "Dr. Priya Krishnan", username: "priya_krishnan", location: "Mumbai, Maharashtra", institution: "Green Valley School" },
  { name: "Prof. Rajesh Menon", username: "rajesh_menon", location: "Bangalore, Karnataka", institution: "Eco-Tech Institute" },
  { name: "Ms. Anita Deshmukh", username: "anita_deshmukh", location: "Pune, Maharashtra", institution: "Environmental Academy" },
  { name: "Mr. Suresh Pillai", username: "suresh_pillai", location: "Chennai, Tamil Nadu", institution: "Nature Learning Center" },
  { name: "Dr. Kavita Shah", username: "kavita_shah", location: "Ahmedabad, Gujarat", institution: "Sustainable Future School" },
];

const games = [
  {
    title: "Indian Rivers Clean-up Challenge",
    description: "Clean and restore the Ganges, Yamuna, and other sacred Indian rivers",
    category: "Water Conservation",
    difficulty: "Medium",
    points: 150,
  },
  {
    title: "Monsoon Water Harvesting",
    description: "Learn to collect and conserve rainwater during monsoon season",
    category: "Water Management",
    difficulty: "Easy",
    points: 100,
  },
  {
    title: "Western Ghats Biodiversity Quest",
    description: "Explore and protect the rich biodiversity of Western Ghats",
    category: "Biodiversity",
    difficulty: "Hard",
    points: 250,
  },
  {
    title: "Solar Energy in Rajasthan",
    description: "Harness solar power in India's sunniest state",
    category: "Renewable Energy",
    difficulty: "Medium",
    points: 180,
  },
  {
    title: "Mumbai Beach Cleanup",
    description: "Clean Juhu and Marine Drive beaches",
    category: "Waste Management",
    difficulty: "Easy",
    points: 120,
  },
  {
    title: "Delhi Air Quality Improver",
    description: "Reduce air pollution in India's capital",
    category: "Air Quality",
    difficulty: "Hard",
    points: 220,
  },
  {
    title: "Kerala Backwaters Protector",
    description: "Preserve the unique ecosystem of Kerala backwaters",
    category: "Ecosystem Protection",
    difficulty: "Medium",
    points: 160,
  },
  {
    title: "Sundarbans Mangrove Saver",
    description: "Protect mangrove forests and tigers in Sundarbans",
    category: "Forest Conservation",
    difficulty: "Hard",
    points: 280,
  },
];

const ecoClubs = [
  {
    name: "Green Warriors of India",
    description: "Students dedicated to environmental conservation across India",
    category: "General Conservation",
    memberCount: 156,
  },
  {
    name: "Mumbai Clean Seas Initiative",
    description: "Protecting Mumbai's coastal ecosystems",
    category: "Ocean Conservation",
    memberCount: 89,
  },
  {
    name: "Delhi Green Lungs",
    description: "Increasing green cover in Delhi NCR",
    category: "Urban Forestry",
    memberCount: 124,
  },
  {
    name: "Bangalore Water Savers",
    description: "Rainwater harvesting and lake restoration",
    category: "Water Conservation",
    memberCount: 203,
  },
  {
    name: "Chennai Solar Champions",
    description: "Promoting solar energy adoption in Tamil Nadu",
    category: "Renewable Energy",
    memberCount: 67,
  },
  {
    name: "Himalayan Eco Warriors",
    description: "Protecting Himalayan ecology and glaciers",
    category: "Mountain Conservation",
    memberCount: 145,
  },
];

const quizzes = [
  {
    title: "Indian Biodiversity Quiz",
    description: "Test your knowledge about India's rich biodiversity",
    category: "Biodiversity",
    difficulty: "Medium",
    points: 100,
    questions: [
      {
        question: "Which is the national animal of India?",
        options: ["Lion", "Tiger", "Elephant", "Peacock"],
        correctAnswer: 1,
      },
      {
        question: "Which biome is found in Western Ghats?",
        options: ["Desert", "Tropical Rainforest", "Tundra", "Grassland"],
        correctAnswer: 1,
      },
      {
        question: "How many biodiversity hotspots are in India?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
      },
    ],
  },
  {
    title: "Water Conservation in India",
    description: "Learn about India's water resources and conservation",
    category: "Water Conservation",
    difficulty: "Easy",
    points: 80,
    questions: [
      {
        question: "Which is the longest river in India?",
        options: ["Ganges", "Brahmaputra", "Godavari", "Indus"],
        correctAnswer: 0,
      },
      {
        question: "What is rainwater harvesting?",
        options: ["Collecting rainwater for reuse", "Making artificial rain", "Cloud seeding", "Water purification"],
        correctAnswer: 0,
      },
    ],
  },
  {
    title: "Renewable Energy in India",
    description: "Understand India's renewable energy initiatives",
    category: "Renewable Energy",
    difficulty: "Hard",
    points: 150,
    questions: [
      {
        question: "Which state in India produces the most solar energy?",
        options: ["Gujarat", "Rajasthan", "Karnataka", "Tamil Nadu"],
        correctAnswer: 1,
      },
      {
        question: "What is India's target for renewable energy by 2030?",
        options: ["250 GW", "350 GW", "450 GW", "550 GW"],
        correctAnswer: 2,
      },
    ],
  },
];

const challenges = [
  {
    title: "30-Day Plastic-Free Challenge",
    description: "Eliminate single-use plastics from your daily life for 30 days",
    category: "Waste Reduction",
    difficulty: "Medium",
    points: 200,
    duration: "30 days",
  },
  {
    title: "Plant 10 Trees Challenge",
    description: "Plant and nurture 10 native trees in your locality",
    category: "Reforestation",
    difficulty: "Easy",
    points: 150,
    duration: "60 days",
  },
  {
    title: "Zero Water Waste Week",
    description: "Minimize water wastage for one week",
    category: "Water Conservation",
    difficulty: "Easy",
    points: 100,
    duration: "7 days",
  },
  {
    title: "Community Beach Cleanup",
    description: "Organize a beach cleanup drive with 20+ participants",
    category: "Community Action",
    difficulty: "Hard",
    points: 300,
    duration: "1 day",
  },
];

async function seed() {
  console.log("🌱 Starting database seed with Indian data...");

  try {
    // Create students
    console.log("Creating students...");
    const students = [];
    for (const student of indianNames) {
      const user = await storage.createUser({
        username: student.username,
        password: "student123",
        name: student.name,
        email: `${student.username}@example.com`,
        location: student.location,
        role: "student",
        institution: "Indian Environmental School",
        gender: "prefer not to say",
      });
      students.push(user);
      console.log(`  ✓ Created student: ${user.name}`);
    }

    // Create teachers
    console.log("\nCreating teachers...");
    const teachers = [];
    for (const teacher of teacherNames) {
      const user = await storage.createUser({
        username: teacher.username,
        password: "teacher123",
        name: teacher.name,
        email: `${teacher.username}@example.com`,
        location: teacher.location,
        role: "teacher",
        institution: teacher.institution,
        gender: "prefer not to say",
      });
      teachers.push(user);
      console.log(`  ✓ Created teacher: ${user.name}`);
    }

    // Assign students to teachers
    console.log("\nAssigning students to teachers...");
    for (let i = 0; i < students.length; i++) {
      const teacher = teachers[i % teachers.length];
      await storage.addStudentToTeacher(teacher.id, students[i].id);
    }
    console.log("  ✓ Students assigned to teachers");

    // Create games
    console.log("\nCreating games...");
    for (const game of games) {
      const createdGame = await storage.createGame({
        ...game,
        createdById: teachers[0].id,
      });
      await storage.authenticateItem("games", createdGame.id, true);
      console.log(`  ✓ Created game: ${createdGame.title}`);
    }

    // Create quizzes
    console.log("\nCreating quizzes...");
    for (const quiz of quizzes) {
      const createdQuiz = await storage.createQuiz(quiz);
      await storage.authenticateItem("quizzes", createdQuiz.id, true);
      console.log(`  ✓ Created quiz: ${createdQuiz.title}`);
    }

    // Create challenges
    console.log("\nCreating challenges...");
    for (const challenge of challenges) {
      const createdChallenge = await storage.createChallenge(challenge);
      await storage.authenticateItem("challenges", createdChallenge.id, true);
      console.log(`  ✓ Created challenge: ${createdChallenge.title}`);
    }

    // Create eco-clubs
    console.log("\nCreating eco-clubs...");
    for (const club of ecoClubs) {
      const createdClub = await storage.createEcoClub(club);
      await storage.authenticateItem("eco_clubs", createdClub.id, true);
      console.log(`  ✓ Created eco-club: ${createdClub.name}`);
    }

    console.log("\n✨ Database seeded successfully with Indian environmental data!");
    console.log(`\n📊 Summary:`);
    console.log(`  - ${students.length} students created`);
    console.log(`  - ${teachers.length} teachers created`);
    console.log(`  - ${games.length} games created`);
    console.log(`  - ${quizzes.length} quizzes created`);
    console.log(`  - ${challenges.length} challenges created`);
    console.log(`  - ${ecoClubs.length} eco-clubs created`);
    console.log(`\n🔑 Login credentials:`);
    console.log(`  Students: username (e.g., aarav_sharma), password: student123`);
    console.log(`  Teachers: username (e.g., priya_krishnan), password: teacher123`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("\n✅ Seed completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  });
