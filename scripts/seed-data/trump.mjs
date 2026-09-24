// scripts/seed-data/trump.mjs — the default demo family (#21; the human's
// verdict on #19: "I prefer Trump's family cause I am used to see it as demo").
// Generated from the retired cubie2 `familyverse.db` dump: 28 people,
// 33 parent edges (flat child→parent pairs — the old parentId1/parentId2
// data, all BIOLOGICAL), 6 partnerships derived from shared-child
// couples (the old app had no partnerships table — this is exactly what it
// showed), dates incl. pre-1900 births, birth places, and 11 photos
// externalized to ../trump-pictures/.
// One board data slip corrected: Elisabeth Christ was recorded with
// father=Friedrich Trumpf although she is his wife — that single edge is
// dropped here (their partnership is kept), so she roots beside him.

export const name = 'Trump Family';
export const photoDir = './trump-pictures/';

export const people = [
  { slug: 'friedrich-trumpf', fullName: 'Friedrich Trumpf', gender: 'Male', birthDate: '1869-03-14', deathDate: '1918-04-27', birthPlace: 'Kallstadt, Bavaria, German Empire', photo: null, bio: 'German-American **barber and restaurateur** from Kallstadt, Bavaria.\n\n- Emigrated to New York in 1885, at sixteen.\n- Worked his way from barber to property owner in Queens.' },
  { slug: 'elisabeth-christ', fullName: 'Elisabeth Christ', gender: 'Female', birthDate: '1875-04-05', deathDate: '1966-06-22', birthPlace: 'Kallstadt, Bavaria, German Empire', photo: null, bio: null },
  { slug: 'frederick-christ-trump', fullName: 'Frederick Christ Trump', gender: 'Male', birthDate: '1905-10-11', deathDate: '1999-06-25', birthPlace: 'Queens, New York, USA', photo: null, bio: 'Born in Queens. Served in the **US Army Air Corps** during the Second World War, then joined the family building business.' },
  { slug: 'mary-macleod', fullName: 'Mary MacLeod', gender: 'Female', birthDate: '1912-05-12', deathDate: '2000-08-05', birthPlace: 'Tong, Scotland', photo: null, bio: null },
  { slug: 'frederick-fred-trump', fullName: 'Frederick "Fred" Trump', gender: 'Male', birthDate: '1918-10-11', deathDate: '1999-06-25', birthPlace: 'Queens, New York, USA', photo: '6.jpg', bio: 'Manhattan and Queens **real-estate developer**; built thousands of housing units across New York.' },
  { slug: 'mary-anne-macleod-trump', fullName: 'Mary Anne MacLeod Trump', gender: 'Female', birthDate: '1937-05-10', deathDate: null, birthPlace: 'Tong, Scotland', photo: null, bio: null },
  { slug: 'maryanne-trump-barry', fullName: 'Maryanne Trump Barry', gender: 'Female', birthDate: '1937-04-05', deathDate: null, birthPlace: 'Queens, New York, USA', photo: null, bio: null },
  { slug: 'elizabeth-trump-grau', fullName: 'Elizabeth Trump Grau', gender: 'Female', birthDate: '1942-01-05', deathDate: null, birthPlace: 'Queens, New York, USA', photo: null, bio: null },
  { slug: 'robert-trump', fullName: 'Robert Trump', gender: 'Male', birthDate: '1948-05-15', deathDate: '2020-08-15', birthPlace: 'Queens, New York, USA', photo: '10.jpg', bio: null },
  { slug: 'fred-trump-jr', fullName: 'Fred Trump Jr.', gender: 'Male', birthDate: '1958-01-18', deathDate: '1981-09-26', birthPlace: 'Queens, New York, USA', photo: null, bio: null },
  { slug: 'ivana-trump', fullName: 'Ivana Trump', gender: 'Female', birthDate: '1949-02-20', deathDate: '2022-07-14', birthPlace: 'Gottwaldov, Czechoslovakia', photo: '12.jpg', bio: null },
  { slug: 'marla-maples', fullName: 'Marla Maples', gender: 'Female', birthDate: '1963-10-27', deathDate: null, birthPlace: 'Canton, Ohio, USA', photo: '13.jpg', bio: null },
  { slug: 'melania-trump', fullName: 'Melania Trump', gender: 'Female', birthDate: '1970-04-26', deathDate: null, birthPlace: 'Sevnica, Slovenia, Yugoslavia', photo: '14.jpg', bio: null },
  { slug: 'donald-trump-jr', fullName: 'Donald Trump Jr.', gender: 'Male', birthDate: '1970-01-03', deathDate: null, birthPlace: 'Cleveland, Ohio, USA', photo: '15.jpg', bio: null },
  { slug: 'ivanka-trump', fullName: 'Ivanka Trump', gender: 'Female', birthDate: '1970-01-05', deathDate: null, birthPlace: 'New York, USA', photo: '16.jpg', bio: null },
  { slug: 'eric-trump', fullName: 'Eric Trump', gender: 'Male', birthDate: '1970-01-06', deathDate: null, birthPlace: 'New York, USA', photo: '17.jpg', bio: null },
  { slug: 'tiffany-trump', fullName: 'Tiffany Trump', gender: 'Female', birthDate: '1993-10-27', deathDate: null, birthPlace: 'West Palm Beach, Florida, USA', photo: '18.jpg', bio: null },
  { slug: 'barron-trump', fullName: 'Barron Trump', gender: 'Male', birthDate: '2006-03-20', deathDate: null, birthPlace: 'New York, USA', photo: '19.jpg', bio: null },
  { slug: 'donald-trump', fullName: 'Donald Trump', gender: 'Male', birthDate: '1946-06-14', deathDate: null, birthPlace: 'Queens, New York, USA', photo: '20.jpg', bio: null },
  { slug: 'donald-trump-iii', fullName: 'Donald Trump III', gender: 'Male', birthDate: '2009-03-18', deathDate: null, birthPlace: 'New York, USA', photo: null, bio: null },
  { slug: 'tristan-trump', fullName: 'Tristan Trump', gender: 'Male', birthDate: '2011-10-02', deathDate: null, birthPlace: 'New York, USA', photo: null, bio: null },
  { slug: 'spencer-trump', fullName: 'Spencer Trump', gender: 'Male', birthDate: '2012-06-14', deathDate: null, birthPlace: 'New York, USA', photo: null, bio: null },
  { slug: 'chloe-trump', fullName: 'Chloe Trump', gender: 'Female', birthDate: '2014-08-16', deathDate: null, birthPlace: 'New York, USA', photo: null, bio: null },
  { slug: 'arabella-rose-kushner', fullName: 'Arabella Rose Kushner', gender: 'Female', birthDate: '2011-06-17', deathDate: null, birthPlace: 'New York, USA', photo: null, bio: null },
  { slug: 'joseph-frederick-kushner', fullName: 'Joseph Frederick Kushner', gender: 'Male', birthDate: '2013-10-08', deathDate: null, birthPlace: 'New York, USA', photo: null, bio: null },
  { slug: 'theodore-james-kushner', fullName: 'Theodore James Kushner', gender: 'Male', birthDate: '2016-09-27', deathDate: null, birthPlace: 'New York, USA', photo: null, bio: null },
  { slug: 'luke-trump', fullName: 'Luke Trump', gender: 'Male', birthDate: '2017-09-27', deathDate: null, birthPlace: 'New York, USA', photo: null, bio: null },
  { slug: 'carolina-dawn-trump', fullName: 'Carolina Dawn Trump', gender: 'Female', birthDate: '2019-08-19', deathDate: null, birthPlace: 'New York, USA', photo: null, bio: null },
];

// Flat [child, parent] pairs; the seed turns each into a BIOLOGICAL edge.
export const parents = [
  ['frederick-christ-trump', 'friedrich-trumpf'],
  ['frederick-christ-trump', 'elisabeth-christ'],
  ['frederick-fred-trump', 'frederick-christ-trump'],
  ['frederick-fred-trump', 'mary-macleod'],
  ['maryanne-trump-barry', 'frederick-fred-trump'],
  ['maryanne-trump-barry', 'mary-anne-macleod-trump'],
  ['elizabeth-trump-grau', 'frederick-fred-trump'],
  ['elizabeth-trump-grau', 'mary-anne-macleod-trump'],
  ['robert-trump', 'frederick-fred-trump'],
  ['robert-trump', 'mary-anne-macleod-trump'],
  ['fred-trump-jr', 'frederick-fred-trump'],
  ['fred-trump-jr', 'mary-anne-macleod-trump'],
  ['donald-trump-jr', 'donald-trump'],
  ['donald-trump-jr', 'ivana-trump'],
  ['ivanka-trump', 'donald-trump'],
  ['ivanka-trump', 'ivana-trump'],
  ['eric-trump', 'donald-trump'],
  ['eric-trump', 'ivana-trump'],
  ['tiffany-trump', 'donald-trump'],
  ['tiffany-trump', 'marla-maples'],
  ['barron-trump', 'donald-trump'],
  ['barron-trump', 'melania-trump'],
  ['donald-trump', 'frederick-fred-trump'],
  ['donald-trump', 'mary-anne-macleod-trump'],
  ['donald-trump-iii', 'donald-trump-jr'],
  ['tristan-trump', 'donald-trump-jr'],
  ['spencer-trump', 'donald-trump-jr'],
  ['chloe-trump', 'donald-trump-jr'],
  ['arabella-rose-kushner', 'ivanka-trump'],
  ['joseph-frederick-kushner', 'ivanka-trump'],
  ['theodore-james-kushner', 'ivanka-trump'],
  ['luke-trump', 'eric-trump'],
  ['carolina-dawn-trump', 'eric-trump'],
];

// Canonical personAId < personBId is applied by the seed; all MARRIED.
export const partnerships = [
  ['donald-trump', 'ivana-trump'],
  ['donald-trump', 'marla-maples'],
  ['donald-trump', 'melania-trump'],
  ['elisabeth-christ', 'friedrich-trumpf'],
  ['frederick-christ-trump', 'mary-macleod'],
  ['frederick-fred-trump', 'mary-anne-macleod-trump'],
];
