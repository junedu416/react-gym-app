export const gymClasses = [
  {
    name: "BodyAttack",
    description:
      "BodyAttack is a high-energy, calorie burning fitness class suitable for all ages and fitness levels. The class will begin with easy movements to warm up the areas of your body that you'll be working. \n\nClasses will typically have 2 main blocks, Plyometrics and Power, which will get your heart rate peaking. \n\nBenefits of BodyAttack \n\n- Tones and shapes your body \n- Builds stamina \n- Improves cardiovascular health \n- Improves coordination and agility \n\nDrink plenty of water before you get to class and be prepared to sweat. Don't need to bring anything besides your water bottle, a towel, and a mat for core work.",
  },
  {
    name: "BodyCombat",
    description: "BodyCombat features science-backed combos of some of the most effective and empowering martial arts moves. With amazing music and awesome motivating instructors that will push you to your true training potential, this empowering calorie-burning cardio session will get you into shape in no time. \n\nBodyCombat features moves from a wide array of disciplines such as Taekwondo, Karate, Boxing, Muay Thai, Kung Fu, and Tai Chi. You don't need any martial arts experience. During the warm up, your instructor will coach you through all the different movements. \n\nBenefits \n\n- Tones and shapes key muscle groups \n- Improves posture, core strength and stability \n- Develops coordination and agility \n- Maximizes calorie burn during and after your workout \n- Build confidence and strength \n\n* We DO NOT recommend BodyCombat during pregnancy as the release of hormones such as osetrogen and relaxin can result in joints being less stable, the kicks in BodyCombat may aggravate the hip and pelvis.",
  },
  {
    name: "BodyPump",
    description: "BodyPump is a total body workout barbell class. Focusing on low weight loads and high repetition movements, you'll be burning fat, gaining strength and quickly get lean muscle conditioning. \n\nBenefits: \n\n- Increased muscle strength \n- Improved flexibility \n- Increased core muscle strength \n- Better overall body definition \n- Burn up to 600 calories in one workout",
  },
  {
    name: "Boxing",
    description: "This entire body cardio and strength training workout will help develop core strength with boxing techniques and drills, and combination of punching and kicking pad work. \n\nBenefits \n\n- Improve your endurance, coordination and stamina \n- Improve upper body and core strength \n- Improve agility and posture \n- Weight loss",
  },
  {
    name: "Circuit",
    description: "Circuit training is a fast-paced class where you do one exercise for 30-seconds to 5-minutes and move on to another exercise. This class is an intensive, rigorous sequence of interval training with high-intensity exercises and builds cardiovascular fitness while improving muscular strength and endurance. \n\n* Recommended for intermediate and advance fitness levels",
  },
  {
    name: "Cycle",
    description:
      "A fun, heart-pumping workout ride on the flats, up hills, through rolling hills led by a certified instructor motivated by fantastic music. \n\nCycle is perfect for everyone since you control the resistance and pedal speed creating just the right intensity for you. Beginners are welcome at all classes. We’ll help fit your bike and get you started so you'll feel comfortable.",
  },
  {
    name: "HIIT",
    description: "HIIT, which stands for High Intensity Interval Training class, is a training technique where you go all-out, 100% effort intense bursts of exercise, followed by short recovery periods. This training will get and maintain your heart rate up and burn more fat in less time. \n\nBenefits \n\n- Build cardiovascular fitness \n- Improve strength \n- Build lean muscle \n- Maximize calorie burn \n\n* Recommended for medium to advance fitness levels.",
  },
  {
    name: "Pilates",
    description: "Our pilates classes focus on stabilizing the core, improving posture and strengthening the whole body. With over 40 different exercises, using a combination of traditional pilates postures and low-impact cardio techniques with varying degrees of difficulty for beginners, intermediate and advanced fitness levels.  \n\nBenefits \n\n- Tone and engage every muscle in your body \n- Improve overall cardivascular fitness \n- Improve postural alignment and flexibility \n- Improve core muscles and strength",
  },
  {
    name: "Yoga",
    description:
      "This class is for those new to yoga or those who are interested in a gentle practice. Gentle Flow Yoga class incorporates simple flowing sequences to warm up the body and slower paced movements focusing on alignment, balance, flexibility and strength. Class will end with an extended period of relaxation, suitable for all ages, shape or size, no experience or flexibility required.",
  },
  {
    name: "Zumba",
    description: "Get your groove on with our signature Zumba dance fitness party that combines low and high intensity moves. You'll burn lots of calories and have a great time doing it as you move to the rhythm with Latin-inspired dance moves. \n\nBenefits \n\n- Great for cardiovascular health \n- Improve muscle tone and definition \n- Improve balance and flexibility \n\nBe QUICK and register now to secure your spot as these classes fill up fast!",
  },
];

export const eventCategories = ["Class", "Competition", "Personal Training"];

export const weekdays = [
  { key: "mon", label: "Monday" },
  { key: "tues", label: "Tuesday" },
  { key: "weds", label: "Wednesday" },
  { key: "thurs", label: "Thursday" },
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
];

export const trainers = [
  { key: "amy", name: "Amy Williams" },
  { key: "brian", name: "Brian Jones" },
  { key: "jenny", name: "Jenny Bourke" },
  { key: "kathryn", name: "Kathryn Wheeler" },
  { key: "mark", name: "Mark Hill" },
  { key: "mike", name: "Mike Thompson" },
];

export const competitionFilters = [
  { key: 0, label: "Cardio" },
  { key: 1, label: "Cycling" },
  { key: 2, label: "Lifting" },
  { key: 3, label: "Rowing" },
  { key: 4, label: "Running" },
  { key: 5, label: "Weight Loss" },
];

export const allFilters = [
  {
    id: 0,
    label: "Monday",
    category: "Day",
    filter: false,
  },
  {
    id: 1,
    label: "Tuesday",
    category: "Day",
    filter: false,
  },
  {
    id: 2,
    label: "Wednesday",
    category: "Day",
    filter: false,
  },
  {
    id: 3,
    label: "Thursday",
    category: "Day",
    filter: false,
  },
  {
    id: 4,
    label: "Friday",
    category: "Day",
    filter: false,
  },
  {
    id: 5,
    label: "Saturday",
    category: "Day",
    filter: false,
  },
  {
    id: 6,
    label: "Sunday",
    category: "Day",
    filter: false,
  },
  {
    id: 7,
    label: "BodyAttack",
    category: "Class",
    filter: false,
  },
  {
    id: 8,
    label: "BodyCombat",
    category: "Class",
    filter: false,
  },
  {
    id: 9,
    label: "BodyPump",
    category: "Class",
    filter: false,
  },
  {
    id: 10,
    label: "Bootcamp",
    category: "Class",
    filter: false,
  },
  {
    id: 11,
    label: "Boxing",
    category: "Class",
    filter: false,
  },
  {
    id: 12,
    label: "Circuit",
    category: "Class",
    filter: false,
  },
  {
    id: 13,
    label: "Cycle",
    category: "Class",
    filter: false,
  },
  {
    id: 14,
    label: "HIIT",
    category: "Class",
    filter: false,
  },
  {
    id: 15,
    label: "Pilates",
    category: "Class",
    filter: false,
  },
  {
    id: 16,
    label: "Yoga",
    category: "Class",
    filter: false,
  },
  {
    id: 17,
    label: "Zumba",
    category: "Class",
    filter: false,
  },
  {
    id: 18,
    label: "Amy Williams",
    category: "Instructor",
    filter: false,
  },
  {
    id: 19,
    label: "Brian Jones",
    category: "Instructor",
    filter: false,
  },
  {
    id: 19,
    label: "Jenny Bourke",
    category: "Instructor",
    filter: false,
  },
  {
    id: 20,
    label: "Kathryn Wheeler",
    category: "Instructor",
    filter: false,
  },
  {
    id: 21,
    label: "Mark Hill",
    category: "Instructor",
    filter: false,
  },
  {
    id: 22,
    label: "Mike Thompson",
    category: "Instructor",
    filter: false,
  },
  {
    id: 23,
    label: "Cardio",
    category: "competition",
    filter: false,
  },
  {
    id: 22,
    label: "Mike Thompson",
    category: "Instructor",
    filter: false,
  },
  {
    id: 24,
    label: "Cardio",
    category: "Comp. Category",
    filter: false,
  },
  {
    id: 24,
    label: "Cycling",
    category: "Comp. Category",
    filter: false,
  },
  {
    id: 24,
    label: "Lifting",
    category: "Comp. Category",
    filter: false,
  },
  {
    id: 24,
    label: "Rowing",
    category: "Comp. Category",
    filter: false,
  },
  {
    id: 24,
    label: "Running",
    category: "Comp. Category",
    filter: false,
  },
  {
    id: 24,
    label: "Weight Loss",
    category: "Comp. Category",
    filter: false,
  },
  {
    id: 24,
    label: "",
    category: "Comp. Category",
    filter: false,
  },
];
