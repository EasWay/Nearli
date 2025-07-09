import { Business } from '@/types/business';
import business1Img1 from '@/assets/images/chopbar.jpg';
import business1Img2 from '@/assets/images/electrician.jpg';
import business1Img3 from '@/assets/images/koko.jpg';

export const businesses: Business[] = [
  {
    id: '1',
    name: 'Aunty Ama Chop bar',
    description: 'Traditional Ghanaian chop bar serving local foods that satisfies the stomach and the soul.',
    categoryId: 'restaurant',
    address: 'Oxford Street, Osu, Accra',
    phone: '+233 24 123 4567',
    email: 'info@kofiscoffee.com',
    website: 'www.kofiscoffee.com',
    rating: 4.7,
    reviewCount: 128,
    priceLevel: 2,
    currency: 'GHS',
    images: [business1Img1, business1Img2, business1Img3],
    latitude: 5.5557,
    longitude: -0.1963,
    hours: [
      { day: 'Monday', open: '7:00 AM', close: '6:00 PM' },
      { day: 'Tuesday', open: '7:00 AM', close: '6:00 PM' },
      { day: 'Wednesday', open: '7:00 AM', close: '6:00 PM' },
      { day: 'Thursday', open: '7:00 AM', close: '6:00 PM' },
      { day: 'Friday', open: '7:00 AM', close: '8:00 PM' },
      { day: 'Saturday', open: '8:00 AM', close: '8:00 PM' },
      { day: 'Sunday', open: '8:00 AM', close: '5:00 PM' }
    ],
    features: ['Wi-Fi', 'Outdoor Seating', 'Local Coffee', 'Air Conditioning'],
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Ama Asante',
        userAvatar: require('../assets/images/14.jpeg'),
        rating: 5,
        comment: "Best Fufu in Osu! The local soup is amazing and the staff is very friendly.",
        date: '2023-05-15'
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Kwame Boateng',
        rating: 4,
        comment: "Great place to eat when you're in town. The staff is reliable and they have good drinks.",
        date: '2023-04-22'
      }
    ]
  },
  {
    id: '2',
    name: 'Joel Electrician',
    description: 'Professional electrical services for your homes and offices.',
    categoryId: 'services',
    address: 'East Legon, Accra',
    phone: '+233 30 987 6543',
    email: 'hello@brojoel.com',
    website: 'www.brajoel.com',
    rating: 4.5,
    reviewCount: 89,
    priceLevel: 3,
    currency: 'GHS',
    images: [
      require('@/assets/images/electrician.jpg'),
      require('@/assets/images/electrician.jpg'),
      require('@/assets/images/koko.jpg')
    ],
    latitude: 5.6037,
    longitude: -0.1870,
    hours: [
      { day: 'Monday', open: '5:00 AM', close: '10:00 PM' },
      { day: 'Tuesday', open: '5:00 AM', close: '10:00 PM' },
      { day: 'Wednesday', open: '5:00 AM', close: '10:00 PM' },
      { day: 'Thursday', open: '5:00 AM', close: '10:00 PM' },
      { day: 'Friday', open: '5:00 AM', close: '10:00 PM' },
      { day: 'Saturday', open: '7:00 AM', close: '8:00 PM' },
      { day: 'Sunday', open: '7:00 AM', close: '8:00 PM' }
    ],
    features: ['Personal Training', 'Group Classes', 'Towel Service', 'Locker Rooms', 'Sauna'],
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Akosua Mensah',
        userAvatar: require('../assets/images/39113529_NjIwLTQ2NS1hOWY4YmMzMTFj.webp'),
        rating: 5,
        comment: "Best gym in East Legon! The trainers are very knowledgeable and equipment is always clean.",
        date: '2023-06-01'
      },
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Yaw Osei',
        rating: 4,
        comment: "Love the variety of classes they offer. The aerobics class is my favorite!",
        date: '2023-05-10'
      }
    ]
  },
  {
    id: '3',
    name: 'Elohim OTC Pharmacy',
    description: 'Licensed Over-The-Counter distributor of medicines and health products.',
    categoryId: 'health',
    address: 'Labone, Accra',
    phone: '+233 24 456 7890',
    email: 'reservations@mamafatis.com',
    website: 'www.mamafatis.com',
    rating: 4.8,
    reviewCount: 215,
    priceLevel: 2,
    currency: 'GHS',
    images: [
      require('@/assets/images/6b780-img_8747-2-.jpg'),
      require('@/assets/images/bankutilapia.jpg'),
      require('@/assets/images/39113529_NjIwLTQ2NS1hOWY4YmMzMTFj.webp')
    ],
    latitude: 5.5679,
    longitude: -0.1781,
    hours: [
      { day: 'Monday', open: '11:30 AM', close: '10:00 PM' },
      { day: 'Tuesday', open: '11:30 AM', close: '10:00 PM' },
      { day: 'Wednesday', open: '11:30 AM', close: '10:00 PM' },
      { day: 'Thursday', open: '11:30 AM', close: '10:00 PM' },
      { day: 'Friday', open: '11:30 AM', close: '11:00 PM' },
      { day: 'Saturday', open: '11:30 AM', close: '11:00 PM' },
      { day: 'Sunday', open: '12:00 PM', close: '9:00 PM' }
    ],
    features: ['Takeaway', 'Outdoor Seating', 'Local Dishes', 'Family Friendly', 'Vegetarian Options'],
    reviews: [
      {
        id: 'r5',
        userId: 'u5',
        userName: 'Nana Adjei',
        userAvatar: require('../assets/images/703637798.png'),
        rating: 5,
        comment: "The jollof rice here is the best in Accra! Mama Fati knows how to cook traditional food.",
        date: '2023-06-15'
      },
      {
        id: 'r6',
        userId: 'u6',
        userName: 'Efua Darko',
        rating: 4,
        comment: "Lovely atmosphere and delicious banku with tilapia. Service was a bit slow but worth the wait.",
        date: '2023-05-28'
      }
    ]
  },
  {
    id: '4',
    name: 'Serenity Home Cleaning Services',
    description: 'Luxurious home cleaning services for your home. Make a schedule with us!',
    categoryId: 'services',
    address: 'Airport Residential Area, Accra',
    phone: '+233 30 789 0123',
    email: 'appointments@serenityspa.com',
    website: 'www.serenityspa.com',
    rating: 4.9,
    reviewCount: 156,
    priceLevel: 4,
    currency: 'GHS',
    images: [
      require('@/assets/images/cleaning.jpg'),
      require('@/assets/images/hospitals.jpg'),
      require('@/assets/images/recipies-around-the-world.webp')
    ],
    latitude: 5.6037,
    longitude: -0.1870,
    hours: [
      { day: 'Monday', open: '9:00 AM', close: '8:00 PM' },
      { day: 'Tuesday', open: '9:00 AM', close: '8:00 PM' },
      { day: 'Wednesday', open: '9:00 AM', close: '8:00 PM' },
      { day: 'Thursday', open: '9:00 AM', close: '8:00 PM' },
      { day: 'Friday', open: '9:00 AM', close: '9:00 PM' },
      { day: 'Saturday', open: '8:00 AM', close: '9:00 PM' },
      { day: 'Sunday', open: '10:00 AM', close: '6:00 PM' }
    ],
    features: ['Couples Massage', 'Steam Room', 'Sauna', 'Aromatherapy', 'Organic Products'],
    reviews: [
      {
        id: 'r7',
        userId: 'u7',
        userName: 'Abena Owusu',
        userAvatar: require('../assets/images/Picture1-thumb2.png'),
        rating: 5,
        comment: "The most relaxing experience I have ever had in Accra. The hot stone massage was incredible!",
        date: '2023-06-10'
      },
      {
        id: 'r8',
        userId: 'u8',
        userName: 'Kofi Asante',
        rating: 5,
        comment: "Treated my wife to a spa day and she came back completely rejuvenated. Will definitely book again.",
        date: '2023-05-20'
      }
    ]
  },
  {
    id: '5',
    name: 'Hajia Koko Special',
    description: 'Kooko and Koose with bread.',
    categoryId: 'restaurant',
    address: 'Accra Mall, Tetteh Quarshie',
    phone: '+233 24 234 5678',
    email: 'support@techhubgh.com',
    website: 'www.techhubgh.com',
    rating: 4.3,
    reviewCount: 78,
    priceLevel: 3,
    currency: 'GHS',
    images: [
      require('@/assets/images/maxresdefault.jpg'),
      require('@/assets/images/703637798.png'),
      require('@/assets/images/IMG-20231228-WA0035.jpg')
    ],
    latitude: 5.6108,
    longitude: -0.2070,
    hours: [
      { day: 'Monday', open: '10:00 AM', close: '8:00 PM' },
      { day: 'Tuesday', open: '10:00 AM', close: '8:00 PM' },
      { day: 'Wednesday', open: '10:00 AM', close: '8:00 PM' },
      { day: 'Thursday', open: '10:00 AM', close: '8:00 PM' },
      { day: 'Friday', open: '10:00 AM', close: '9:00 PM' },
      { day: 'Saturday', open: '10:00 AM', close: '9:00 PM' },
      { day: 'Sunday', open: '11:00 AM', close: '6:00 PM' }
    ],
    features: ['Repair Services', 'Trade-In Program', 'Extended Warranty', 'Tech Support', 'Custom Orders'],
    reviews: [
      {
        id: 'r9',
        userId: 'u9',
        userName: 'Kwaku Appiah',
        userAvatar: require('../assets/images/use.jpg'),
        rating: 4,
        comment: "Great selection of products and knowledgeable staff. Prices are reasonable for Accra.",
        date: '2023-06-05'
      },
      {
        id: 'r10',
        userId: 'u10',
        userName: 'Adwoa Frimpong',
        rating: 5,
        comment: "They fixed my laptop in just a day when other places quoted me a week. Excellent service!",
        date: '2023-05-15'
      }
    ]
  },
  {
    id: '6',
    name: 'UniBank Central Bank',
    description: 'The Bank for your money.',
    categoryId: 'services',
    address: 'Community 1, Tema',
    phone: '+233 30 345 6789',
    email: 'grow@greengarden.com',
    website: 'www.greengarden.com',
    rating: 4.6,
    reviewCount: 112,
    priceLevel: 2,
    currency: 'GHS',
    images: [
      require('@/assets/images/bank-3-620x330.jpg'),
      require('@/assets/images/14.jpeg'),
      require('@/assets/images/Picture1-thumb2.png')
    ],
    latitude: 5.6698,
    longitude: -0.0166,
    hours: [
      { day: 'Monday', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Tuesday', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Wednesday', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Thursday', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Friday', open: '8:00 AM', close: '6:00 PM' },
      { day: 'Saturday', open: '7:00 AM', close: '7:00 PM' },
      { day: 'Sunday', open: '9:00 AM', close: '5:00 PM' }
    ],
    features: ['Gardening Workshops', 'Landscape Design', 'Plant Guarantee', 'Organic Products', 'Delivery Service'],
    reviews: [
      {
        id: 'r11',
        userId: 'u11',
        userName: 'Nana Osei',
        userAvatar: require('../assets/images/14.jpeg'),
        rating: 5,
        comment: "The staff really knows their tropical plants! They helped me choose the perfect varieties for my compound.",
        date: '2023-06-20'
      },
      {
        id: 'r12',
        userId: 'u12',
        userName: 'Akua Sarpong',
        rating: 4,
        comment: "Great selection of local plants. The weekend workshops are very informative.",
        date: '2023-05-30'
      }
    ]
  }
];