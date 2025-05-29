// Sample Users
export const sampleUsers = [
  {
    id: '1',
    name: 'Emma',
    avatar: 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=150',
    ageGroup: '6-10',
    points: 350,
    level: 5,
    choreHistory: [
      {
        id: '101',
        choreId: '1',
        choreName: 'Make Bed',
        points: 10,
        completedAt: '2023-07-15T08:30:00Z'
      },
      {
        id: '102',
        choreId: '3',
        choreName: 'Feed Pets',
        points: 15,
        completedAt: '2023-07-14T17:15:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Liam',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    ageGroup: '11-15',
    points: 520,
    level: 7,
    choreHistory: [
      {
        id: '201',
        choreId: '5',
        choreName: 'Mow Lawn',
        points: 50,
        completedAt: '2023-07-15T14:00:00Z'
      },
      {
        id: '202',
        choreId: '4',
        choreName: 'Take Out Trash',
        points: 15,
        completedAt: '2023-07-14T19:30:00Z'
      }
    ]
  },
  {
    id: '3',
    name: 'Sophia',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    ageGroup: '16-20',
    points: 780,
    level: 10,
    choreHistory: [
      {
        id: '301',
        choreId: '8',
        choreName: 'Clean Bathroom',
        points: 40,
        completedAt: '2023-07-15T10:45:00Z'
      },
      {
        id: '302',
        choreId: '12',
        choreName: 'Wash Car',
        points: 45,
        completedAt: '2023-07-13T16:20:00Z'
      }
    ]
  },
  {
    id: '4',
    name: 'Noah',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    ageGroup: '11-15',
    points: 420,
    level: 6,
    choreHistory: []
  },
  {
    id: '5',
    name: 'Olivia',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150',
    ageGroup: '6-10',
    points: 290,
    level: 4,
    choreHistory: []
  },
  {
    id: '6',
    name: 'Ethan',
    avatar: 'https://images.pexels.com/photos/1462980/pexels-photo-1462980.jpeg?auto=compress&cs=tinysrgb&w=150',
    ageGroup: '0-5',
    points: 120,
    level: 2,
    choreHistory: []
  },
  {
    id: '7',
    name: 'Ava',
    avatar: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=150',
    ageGroup: '16-20',
    points: 650,
    level: 8,
    choreHistory: []
  },
  {
    id: '8',
    name: 'Lucas',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150',
    ageGroup: '0-5',
    points: 85,
    level: 1,
    choreHistory: []
  },
  {
    id: '9',
    name: 'Isabella',
    avatar: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=150',
    ageGroup: '11-15',
    points: 480,
    level: 6,
    choreHistory: []
  },
  {
    id: '10',
    name: 'Mason',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
    ageGroup: '6-10',
    points: 310,
    level: 4,
    choreHistory: []
  }
];

// Sample Chores
export const sampleChores = [
  {
    id: '1',
    name: 'Make Bed',
    description: 'Straighten sheets, fluff pillows, and arrange blankets neatly.',
    points: 10,
    difficulty: 'easy',
    category: 'bedroom',
    ageGroup: '0-5',
    estimatedTime: '5 min',
    image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Set Table',
    description: 'Place plates, utensils, and napkins for everyone in the family.',
    points: 10,
    difficulty: 'easy',
    category: 'kitchen',
    ageGroup: '0-5',
    estimatedTime: '5 min',
    image: 'https://images.pexels.com/photos/5824883/pexels-photo-5824883.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Feed Pets',
    description: 'Give food and fresh water to pets according to their schedule.',
    points: 15,
    difficulty: 'easy',
    category: 'pets',
    ageGroup: '0-5',
    estimatedTime: '5 min',
    image: 'https://images.pexels.com/photos/6568501/pexels-photo-6568501.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Take Out Trash',
    description: 'Empty indoor trash bins and take bags to outdoor containers.',
    points: 15,
    difficulty: 'easy',
    category: 'kitchen',
    ageGroup: '6-10',
    estimatedTime: '5 min',
    image: 'https://images.pexels.com/photos/4099278/pexels-photo-4099278.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Mow Lawn',
    description: 'Cut grass to an even height throughout the yard.',
    points: 50,
    difficulty: 'hard',
    category: 'outdoor',
    ageGroup: '16-20',
    estimatedTime: '45 min',
    image: 'https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    name: 'Dust Furniture',
    description: 'Wipe dust from all surfaces, shelves, and decorative items.',
    points: 20,
    difficulty: 'medium',
    category: 'living room',
    ageGroup: '6-10',
    estimatedTime: '15 min',
    image: 'https://images.pexels.com/photos/4107274/pexels-photo-4107274.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '7',
    name: 'Vacuum Floors',
    description: 'Vacuum carpets, rugs, and hard floors throughout the house.',
    points: 25,
    difficulty: 'medium',
    category: 'living room',
    ageGroup: '11-15',
    estimatedTime: '20 min',
    image: 'https://images.pexels.com/photos/4107098/pexels-photo-4107098.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '8',
    name: 'Clean Bathroom',
    description: 'Scrub toilet, sink, shower/tub, and wipe mirrors and counters.',
    points: 40,
    difficulty: 'hard',
    category: 'bathroom',
    ageGroup: '11-15',
    estimatedTime: '30 min',
    image: 'https://images.pexels.com/photos/4107290/pexels-photo-4107290.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '9',
    name: 'Fold Laundry',
    description: 'Fold clean clothes and linens and put them away in proper places.',
    points: 20,
    difficulty: 'medium',
    category: 'laundry',
    ageGroup: '6-10',
    estimatedTime: '15 min',
    image: 'https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '10',
    name: 'Water Plants',
    description: 'Give appropriate amount of water to indoor and outdoor plants.',
    points: 10,
    difficulty: 'easy',
    category: 'outdoor',
    ageGroup: '0-5',
    estimatedTime: '10 min',
    image: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '11',
    name: 'Wash Dishes',
    description: 'Clean all dirty dishes, utensils, and cookware.',
    points: 20,
    difficulty: 'medium',
    category: 'kitchen',
    ageGroup: '11-15',
    estimatedTime: '15 min',
    image: 'https://images.pexels.com/photos/4108720/pexels-photo-4108720.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '12',
    name: 'Wash Car',
    description: 'Clean exterior and interior of family vehicle.',
    points: 45,
    difficulty: 'hard',
    category: 'outdoor',
    ageGroup: '16-20',
    estimatedTime: '45 min',
    image: 'https://images.pexels.com/photos/3354648/pexels-photo-3354648.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '13',
    name: 'Clean Windows',
    description: 'Wash interior and exterior of windows until streak-free.',
    points: 30,
    difficulty: 'medium',
    category: 'living room',
    ageGroup: '11-15',
    estimatedTime: '30 min',
    image: 'https://images.pexels.com/photos/4107276/pexels-photo-4107276.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '14',
    name: 'Organize Toys',
    description: 'Sort and put away toys in their designated storage areas.',
    points: 15,
    difficulty: 'easy',
    category: 'bedroom',
    ageGroup: '0-5',
    estimatedTime: '15 min',
    image: 'https://images.pexels.com/photos/3933027/pexels-photo-3933027.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '15',
    name: 'Rake Leaves',
    description: 'Gather fallen leaves from yard into piles or bags.',
    points: 35,
    difficulty: 'medium',
    category: 'outdoor',
    ageGroup: '11-15',
    estimatedTime: '30 min',
    image: 'https://images.pexels.com/photos/5759191/pexels-photo-5759191.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '16',
    name: 'Clean Refrigerator',
    description: 'Remove old food, wipe shelves, and organize contents.',
    points: 35,
    difficulty: 'medium',
    category: 'kitchen',
    ageGroup: '16-20',
    estimatedTime: '30 min',
    image: 'https://images.pexels.com/photos/5591664/pexels-photo-5591664.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '17',
    name: 'Sweep Floors',
    description: 'Sweep all hard floor surfaces to remove dirt and debris.',
    points: 15,
    difficulty: 'easy',
    category: 'living room',
    ageGroup: '6-10',
    estimatedTime: '15 min',
    image: 'https://images.pexels.com/photos/4108714/pexels-photo-4108714.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '18',
    name: 'Weed Garden',
    description: 'Remove weeds from garden beds and around plants.',
    points: 30,
    difficulty: 'medium',
    category: 'outdoor',
    ageGroup: '11-15',
    estimatedTime: '30 min',
    image: 'https://images.pexels.com/photos/7728082/pexels-photo-7728082.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '19',
    name: 'Clean Gutters',
    description: 'Remove leaves and debris from roof gutters.',
    points: 50,
    difficulty: 'hard',
    category: 'outdoor',
    ageGroup: '16-20',
    estimatedTime: '45 min',
    image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '20',
    name: 'Sort Recycling',
    description: 'Separate recyclables by type and prepare for collection.',
    points: 15,
    difficulty: 'easy',
    category: 'kitchen',
    ageGroup: '6-10',
    estimatedTime: '10 min',
    image: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '21',
    name: 'Clean Microwave',
    description: 'Wipe interior and exterior of microwave to remove food residue.',
    points: 15,
    difficulty: 'easy',
    category: 'kitchen',
    ageGroup: '11-15',
    estimatedTime: '10 min',
    image: 'https://images.pexels.com/photos/4108773/pexels-photo-4108773.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '22',
    name: 'Organize Bookshelf',
    description: 'Arrange books neatly by size, topic, or alphabetically.',
    points: 20,
    difficulty: 'medium',
    category: 'living room',
    ageGroup: '11-15',
    estimatedTime: '20 min',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '23',
    name: 'Clean Pet Area',
    description: 'Clean pet beds, litter boxes, or cages and surrounding areas.',
    points: 25,
    difficulty: 'medium',
    category: 'pets',
    ageGroup: '11-15',
    estimatedTime: '20 min',
    image: 'https://images.pexels.com/photos/6568478/pexels-photo-6568478.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '24',
    name: 'Shovel Snow',
    description: 'Clear snow from walkways, driveway, and steps.',
    points: 45,
    difficulty: 'hard',
    category: 'outdoor',
    ageGroup: '16-20',
    estimatedTime: '45 min',
    image: 'https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

// Sample Rewards
export const sampleRewards = [
  {
    id: '1',
    name: 'Extra Screen Time',
    description: '30 minutes of additional screen time',
    points: 50,
    ageGroup: 'all',
    image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 95
  },
  {
    id: '2',
    name: 'Choose Dinner',
    description: 'Pick what the family eats for dinner',
    points: 75,
    ageGroup: 'all',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 88
  },
  {
    id: '3',
    name: 'Movie Night Pick',
    description: 'Choose the movie for family movie night',
    points: 100,
    ageGroup: 'all',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 92
  },
  {
    id: '4',
    name: 'Toy Store Trip',
    description: '$10 to spend at the toy store',
    points: 200,
    ageGroup: '0-5',
    image: 'https://images.pexels.com/photos/207891/pexels-photo-207891.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 98
  },
  {
    id: '5',
    name: 'Playdate',
    description: 'Host a friend for a playdate',
    points: 150,
    ageGroup: '6-10',
    image: 'https://images.pexels.com/photos/3933239/pexels-photo-3933239.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 85
  },
  {
    id: '6',
    name: 'Video Game Time',
    description: '1 hour of video game time',
    points: 125,
    ageGroup: '6-10',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 96
  },
  {
    id: '7',
    name: 'Sleepover',
    description: 'Host a sleepover with friends',
    points: 250,
    ageGroup: '11-15',
    image: 'https://images.pexels.com/photos/5256142/pexels-photo-5256142.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 94
  },
  {
    id: '8',
    name: 'Mall Trip',
    description: '$20 to spend at the mall',
    points: 300,
    ageGroup: '11-15',
    image: 'https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 91
  },
  {
    id: '9',
    name: 'Concert Tickets',
    description: 'Ticket to a local concert',
    points: 500,
    ageGroup: '16-20',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 89
  },
  {
    id: '10',
    name: 'Driving Lesson',
    description: 'Extra driving practice session',
    points: 200,
    ageGroup: '16-20',
    image: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=400',
    popularity: 87
  },
  {
    id: '11',
    name: 'Skip One Chore',
    description: 'Get out of one assigned chore',
    points: 150,
    ageGroup: 'all',
    image: 'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 93
  },
  {
    id: '12',
    name: 'Late Bedtime',
    description: 'Stay up 1 hour past bedtime',
    points: 100,
    ageGroup: '0-5',
    image: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 90
  },
  {
    id: '13',
    name: 'Ice Cream Outing',
    description: 'Trip to get ice cream',
    points: 75,
    ageGroup: '0-5',
    image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 97
  },
  {
    id: '14',
    name: 'Craft Supplies',
    description: '$15 for new craft supplies',
    points: 175,
    ageGroup: '6-10',
    image: 'https://images.pexels.com/photos/159644/art-supplies-brushes-rulers-scissors-159644.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 83
  },
  {
    id: '15',
    name: 'Theme Park Day',
    description: 'Day trip to a theme park',
    points: 1000,
    ageGroup: 'all',
    image: 'https://images.pexels.com/photos/784916/pexels-photo-784916.jpeg?auto=compress&cs=tinysrgb&w=400',
    popularity: 99
  }
];
