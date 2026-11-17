/**
 * All figures verified against ESPNcricinfo / Wikipedia career statistics,
 * current to 1 November 2026. Where a record has since been broken, the
 * archive says so rather than pretending otherwise.
 */

export const profile = {
  name: 'Ishan Kishan',
  fullName: 'Ishan Pranav Kumar Pandey Kishan',
  tagline: 'The Pocket Dynamo',
  born: '18 July 1998',
  birthplace: 'Patna, Bihar, India',
  village: 'Goridiha, Daudnagar, Aurangabad district',
  height: '5 ft 6 in / 168 cm',
  role: 'Wicketkeeper-batter',
  batting: 'Left-handed',
  bowling: 'Leg break / off break',
  jersey: '32',
  teams: 'India · Jharkhand · Sunrisers Hyderabad',
  ipl: 'SRH (2025–) · Mumbai Indians (2018–24) · Gujarat Lions (2016–17)',
  father: 'Pranav Kumar Pandey, a builder in Patna',
  mother: 'Suchitra Singh',
};

export const heroStats = [
  {
    value: 210,
    sup: 'runs',
    label: 'Highest ODI score',
    note: 'vs Bangladesh, Chattogram — 10 December 2022.',
  },
  {
    value: 126,
    sup: 'balls',
    label: 'Balls to ODI 200',
    note: 'The fastest double century in ODI history at the time.',
  },
  {
    value: 2016,
    sup: 'runs',
    label: 'T20I runs for India',
    note: 'Across 69 matches, with one century and 14 fifties.',
  },
];

export const careerStats = [
  {
    format: 'Test',
    span: '2023',
    matches: 2,
    runs: 78,
    average: '78.00',
    strikeRate: '—',
    hundreds: 0,
    fifties: 1,
    highest: '52*',
    dismissals: '5 ct · 0 st',
  },
  {
    format: 'ODI',
    span: '2021–2026',
    matches: 32,
    runs: 1107,
    average: '42.57',
    strikeRate: '—',
    hundreds: 2,
    fifties: 7,
    highest: '210',
    dismissals: '17 ct · 3 st',
  },
  {
    format: 'T20I',
    span: '2021–2026',
    matches: 69,
    runs: 2016,
    average: '31.01',
    strikeRate: '—',
    hundreds: 1,
    fifties: 14,
    highest: '103',
    dismissals: '33 ct · 5 st',
  },
  {
    format: 'First-class',
    span: '2013–2026',
    matches: 67,
    runs: 4302,
    average: '42.17',
    strikeRate: '—',
    hundreds: 10,
    fifties: 20,
    highest: '273',
    dismissals: '138 ct · 14 st',
  },
];

export type TimelineEntry = {
  year: string;
  title: string;
  body: string;
  tag?: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: '1998',
    title: 'A boy from Patna',
    body: 'Ishan Pranav Kumar Pandey Kishan is born on 18 July in Patna, Bihar. The family’s roots sit in Goridiha village in the Daudnagar block of Aurangabad district. His father, Pranav Kumar Pandey, builds houses for a living.',
    tag: 'Patna, Bihar',
  },
  {
    year: '2013',
    title: 'A state away',
    body: 'Registration friction between the Bihar Cricket Association and the BCCI pushes a 15-year-old towards neighbouring Jharkhand. He begins playing age-group cricket there — the move that quietly makes his career possible.',
    tag: 'Jharkhand',
  },
  {
    year: '2016',
    title: 'Captain of India’s Under-19s',
    body: 'Kishan leads India at the ICC Under-19 World Cup in Bangladesh. India reach the final in Mirpur, where the West Indies chase down 146 to win by five wickets. He finishes the tournament as one of its most watchable wicketkeeper-batters.',
    tag: 'U-19 World Cup',
  },
  {
    year: '2016',
    title: '273 against Delhi',
    body: 'On 6 November, in the Ranji Trophy, the 18-year-old makes 273 against Delhi — the highest individual score by a Jharkhand batter in the competition. Weeks later he is bought by Gujarat Lions for his first IPL season.',
    tag: 'First-class record',
  },
  {
    year: '2018',
    title: 'Mumbai',
    body: 'Bought by the Mumbai Indians, he scores 275 runs at a strike rate of 150 in his first season. Mumbai becomes home for seven years, and the franchise’s belief in him becomes the spine of his white-ball development.',
    tag: 'IPL',
  },
  {
    year: '2020',
    title: 'The breakthrough season',
    body: 'In the UAE he makes 516 runs — Mumbai’s highest in the 2020 season — and wins the award for most sixes. His 99 from 58 balls against Royal Challengers Bengaluru forces a Super Over in a chase that still ends in defeat.',
    tag: '516 runs · IPL 2020',
  },
  {
    year: '2021',
    title: 'India',
    body: 'A maiden international call-up arrives in February. On 14 March he debuts in T20Is against England at Ahmedabad and makes 56 from 32 balls, Player of the Match. On 18 July — his 23rd birthday — he debuts in ODIs at Colombo and makes 59.',
    tag: 'Debut caps 84 & 235',
  },
  {
    year: '2022',
    title: 'Two hundred and ten',
    body: 'On 10 December, in the third ODI at Chattogram, he turns a maiden ODI hundred into 210 off 131 balls. Two hundred arrives in 126 balls: the fastest in ODI history to that point, and the youngest man ever to reach the mark.',
    tag: '210 · Chattogram',
  },
  {
    year: '2023',
    title: 'A final, then a pause',
    body: 'He plays a part in India’s Asia Cup win and is in the squad that reaches the World Cup final in Ahmedabad. The year ends with a break from the game: he speaks later of mental fatigue, of being benched through good form, and of finding his footing again through the Bhagavad Gita.',
    tag: 'Mental health',
  },
  {
    year: '2024',
    title: 'Captain of Jharkhand',
    body: 'In October he is appointed captain of Jharkhand for the 2024–25 Ranji Trophy after Saurabh Tiwary’s retirement, having led the side once before in 2018–19. In November, Mumbai Indians release him; Sunrisers Hyderabad buy him at the auction.',
    tag: 'Ranji captain',
  },
  {
    year: '2025',
    title: 'A hundred on debut, a summer at Trent Bridge',
    body: 'He scores his first IPL century in his first innings for Sunrisers, against Rajasthan Royals. In June he joins Nottinghamshire for two County Championship matches, making 87 off 98 balls on debut against Yorkshire and taking a catch off his very first ball behind the stumps.',
    tag: 'SRH · Nottinghamshire',
  },
  {
    year: '2026',
    title: 'A world title, and a second home hundred',
    body: 'He is part of India’s T20 World Cup–winning squad, then leads Jharkhand to their first Syed Mushtaq Ali Trophy, making 101 from 49 in the final and finishing as the tournament’s leading scorer. In June he ends a three-year wait for an ODI hundred with 125 from 79 balls against Afghanistan in Lucknow. In the IPL he stands in as Sunrisers captain for the first half of the season.',
    tag: 'World Cup · SMAT · 125',
  },
];

export type Milestone = {
  runs: number;
  balls: number;
  label: string;
  note: string;
};

export const milestones: Milestone[] = [
  {
    runs: 50,
    balls: 49,
    label: 'Fifty',
    note: 'Measured at first: fifty from 49 balls, opening in place of the injured Rohit Sharma.',
  },
  {
    runs: 100,
    balls: 85,
    label: 'Maiden hundred',
    note: 'A maiden ODI century, from 85 balls. The first of many records to fall.',
  },
  {
    runs: 150,
    balls: 103,
    label: 'One fifty',
    note: 'The next fifty takes 18 balls — the quickest 150 by an Indian batter at the time.',
  },
  {
    runs: 200,
    balls: 126,
    label: 'Double hundred',
    note: '200 in 126 balls: faster than anyone in ODI history had done it before.',
  },
];

/**
 * Scoring curve reconstructed from the verified milestone splits
 * (50 off 49, 100 off 85, 150 off 103, 200 off 126, out for 210 off 131).
 * Intermediate points are interpolated to show tempo, not ball-by-ball fact.
 */
export const progression: Array<[number, number]> = [
  [0, 0],
  [6, 2],
  [12, 7],
  [18, 12],
  [24, 19],
  [30, 26],
  [36, 34],
  [42, 42],
  [49, 50],
  [56, 58],
  [62, 66],
  [70, 76],
  [78, 88],
  [85, 100],
  [89, 108],
  [94, 120],
  [99, 134],
  [103, 150],
  [108, 160],
  [113, 170],
  [118, 181],
  [122, 190],
  [126, 200],
  [129, 206],
  [131, 210],
];

export const records = [
  {
    title: 'Fastest ODI double century',
    detail: '200 from 126 balls — quicker than Chris Gayle’s 138-ball effort in 2015.',
    status: 'surpassed',
    statusLabel: 'Held until 2026',
  },
  {
    title: 'Youngest ODI double centurion',
    detail: '24 years and 145 days old on the day he reached 200 at Chattogram.',
    status: 'held',
    statusLabel: 'Held',
  },
  {
    title: 'First to convert a maiden ODI hundred into a double',
    detail: 'No batter had turned their first ODI century into 200 before.',
    status: 'held',
    statusLabel: 'Held',
  },
  {
    title: 'First 200+ score in ODIs against Bangladesh',
    detail: 'The previous best against them was Charles Coventry’s unbeaten 194 in 2009.',
    status: 'held',
    statusLabel: 'Held',
  },
  {
    title: 'Highest ODI score in Bangladesh',
    detail: '210 at the Zahur Ahmed Chowdhury Stadium, Chattogram.',
    status: 'held',
    statusLabel: 'Held',
  },
  {
    title: 'Most sixes by an Indian in ODIs in Bangladesh',
    detail: 'Ten sixes in the innings, alongside 24 fours.',
    status: 'held',
    statusLabel: 'Held',
  },
  {
    title: 'Fourth Indian to score an ODI double hundred',
    detail: 'After Sachin Tendulkar, Virender Sehwag and Rohit Sharma.',
    status: 'held',
    statusLabel: 'Held',
  },
];

export const knockFacts = [
  { label: 'Match', value: 'Bangladesh vs India · 3rd ODI' },
  { label: 'Date', value: '10 December 2022' },
  { label: 'Venue', value: 'Zahur Ahmed Chowdhury Stadium, Chattogram' },
  { label: 'Innings', value: '210 from 131 balls · 24 fours · 10 sixes' },
  { label: 'Strike rate', value: '160.31' },
  { label: 'Partnership', value: '290 for the 2nd wicket with Virat Kohli (113)' },
  { label: 'Result', value: 'India 409/8 beat Bangladesh 182 by 227 runs' },
  { label: 'Award', value: 'Player of the Match' },
];
