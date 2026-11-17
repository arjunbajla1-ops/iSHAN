export type Chapter = {
  no: string;
  slug: string;
  title: string;
  navTitle: string;
  module: 1 | 2 | 3 | 4;
  desc: string;
  built: boolean;
};

export const modules = [
  { moduleNo: 1, no: 'I', name: 'Core & Story' },
  { moduleNo: 2, no: 'II', name: 'Career' },
  { moduleNo: 3, no: 'III', name: 'Data Lab' },
  { moduleNo: 4, no: 'IV', name: 'Media & Fans' },
] as const;

export const chapterList: Chapter[] = [
  {
    no: '01',
    slug: '/',
    title: 'Home',
    navTitle: 'Home',
    module: 1,
    desc: 'A full-screen introduction to the archive.',
    built: true,
  },
  {
    no: '02',
    slug: '/biography',
    title: 'Biography',
    navTitle: 'Biography',
    module: 1,
    desc: 'Patna, Jharkhand, Dhoni, India. A timeline.',
    built: true,
  },
  {
    no: '03',
    slug: '/u19-2016',
    title: 'U-19 Captaincy, 2016',
    navTitle: 'U-19 Captaincy',
    module: 1,
    desc: 'A teenager leading India to a World Cup final.',
    built: false,
  },
  {
    no: '04',
    slug: '/team-india',
    title: 'Team India Hub',
    navTitle: 'Team India',
    module: 2,
    desc: 'Three debuts. Three formats. One birthday.',
    built: false,
  },
  {
    no: '05',
    slug: '/odi',
    title: 'ODI Analytics',
    navTitle: 'ODI Analytics',
    module: 2,
    desc: 'Average, strike rate, hundreds — measured.',
    built: false,
  },
  {
    no: '06',
    slug: '/the-210',
    title: 'The 210 Masterclass',
    navTitle: 'The 210',
    module: 2,
    desc: 'Chattogram, 10 December 2022. 131 balls.',
    built: true,
  },
  {
    no: '07',
    slug: '/t20i',
    title: 'T20I Hub',
    navTitle: 'T20I Hub',
    module: 2,
    desc: 'Powerplay, middle, death — phase by phase.',
    built: false,
  },
  {
    no: '08',
    slug: '/test',
    title: 'Test Archive',
    navTitle: 'Test Archive',
    module: 2,
    desc: 'The West Indies tour and a maiden fifty.',
    built: false,
  },
  {
    no: '09',
    slug: '/ipl',
    title: 'IPL Journey',
    navTitle: 'IPL Journey',
    module: 2,
    desc: 'Gujarat, Mumbai, Hyderabad. ₹15.25 crore.',
    built: false,
  },
  {
    no: '10',
    slug: '/domestic',
    title: 'Domestic Vault',
    navTitle: 'Domestic Vault',
    module: 2,
    desc: 'Jharkhand, Ranji, Vijay Hazare, Duleep.',
    built: false,
  },
  {
    no: '11',
    slug: '/scorecards',
    title: 'Scorecard Vault',
    navTitle: 'Scorecard Vault',
    module: 3,
    desc: 'Fifty innings, searchable and expandable.',
    built: false,
  },
  {
    no: '12',
    slug: '/top-knocks',
    title: 'Top 10 Knocks',
    navTitle: 'Top 10 Knocks',
    module: 3,
    desc: 'The ten that mattered most, ranked.',
    built: false,
  },
  {
    no: '13',
    slug: '/wagon-wheel',
    title: 'Shot & Wagon Wheel Lab',
    navTitle: 'Wagon Wheel Lab',
    module: 3,
    desc: 'Where the runs went, zone by zone.',
    built: false,
  },
  {
    no: '14',
    slug: '/head-to-head',
    title: 'Head-to-Head',
    navTitle: 'Head-to-Head',
    module: 3,
    desc: 'Five bowlers. Runs, balls, dismissals.',
    built: false,
  },
  {
    no: '15',
    slug: '/keeping',
    title: 'Keeping & Fielding',
    navTitle: 'Keeping & Fielding',
    module: 3,
    desc: 'Catches, stumpings, dismissals per match.',
    built: false,
  },
  {
    no: '16',
    slug: '/records',
    title: 'Records & Trophy Wall',
    navTitle: 'Records',
    module: 3,
    desc: 'A cabinet of firsts and fastest.',
    built: false,
  },
  {
    no: '17',
    slug: '/gallery',
    title: 'Photo Gallery',
    navTitle: 'Photo Gallery',
    module: 4,
    desc: 'India, IPL, domestic — framed.',
    built: false,
  },
  {
    no: '18',
    slug: '/off-field',
    title: 'Off-Field',
    navTitle: 'Off-Field',
    module: 4,
    desc: 'Kit, ink, fitness, friendships.',
    built: false,
  },
  {
    no: '19',
    slug: '/videos',
    title: 'Video Zone',
    navTitle: 'Video Zone',
    module: 4,
    desc: 'Curated cuts, including Arjun’s edits.',
    built: false,
  },
  {
    no: '20',
    slug: '/wallpapers',
    title: 'Wallpapers',
    navTitle: 'Wallpapers',
    module: 4,
    desc: '4K frames for desktop and mobile.',
    built: false,
  },
  {
    no: '21',
    slug: '/quotes',
    title: 'Quotes Wall',
    navTitle: 'Quotes Wall',
    module: 4,
    desc: 'What they say about the pocket dynamo.',
    built: false,
  },
  {
    no: '22',
    slug: '/fan-zone',
    title: 'Arjun’s Fan Zone',
    navTitle: 'Fan Zone',
    module: 4,
    desc: 'The creator, a trivia quiz, a fan wall.',
    built: false,
  },
];

export const builtChapters = chapterList.filter((c) => c.built);

export const chapterBySlug = (slug: string) =>
  chapterList.find((c) => c.slug === slug);

export const nextBuiltChapter = (slug: string) => {
  const index = chapterList.findIndex((c) => c.slug === slug);
  for (let i = index + 1; i < chapterList.length; i += 1) {
    if (chapterList[i].built) return chapterList[i];
  }
  return builtChapters[0];
};
