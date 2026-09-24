// scripts/seed-data/kessler.mjs — the original #16 prototype tree, kept as
// the alternative seed: SEED_FAMILY=kessler. Three generations, three MARRIED
// partnerships, markdown bios, and three real warm JPEG swatches (photoDir).
// Content extracted verbatim from the pre-#21 inline seed.

export const name = 'The Kessler Family';
export const photoDir = './swatches/';

export const people = [
  {
    slug: 'walter',
    fullName: 'Walter Kessler',
    gender: 'Male',
    birthDate: '1941-05-02',
    deathDate: '2016-11-30',
    birthPlace: 'Kraków, Poland',
    photo: 'sand.jpg',
    bio: 'Kept the **family ledgers** — every birth, marriage and rumour, in pencil, in one exercise book.',
  },
  {
    slug: 'ruth',
    fullName: 'Ruth Kessler',
    gender: 'Female',
    birthDate: '1940-01-15',
    deathDate: '2021-06-04',
    birthPlace: 'Malmö, Sweden',
    photo: 'clay.jpg',
    bio: null,
  },
  { slug: 'daniel', fullName: 'Daniel Kessler', gender: 'Male', birthDate: '1965-02-12', deathDate: null, birthPlace: 'Bristol, England', photo: null, bio: null },
  { slug: 'anita', fullName: 'Anita Kessler', gender: 'Female', birthDate: '1968-07-03', deathDate: null, birthPlace: 'Accra, Ghana', photo: null, bio: null },
  {
    slug: 'maya',
    fullName: 'Maya Kessler',
    gender: 'Female',
    birthDate: '1994-03-14',
    deathDate: null,
    birthPlace: 'Bristol, England',
    photo: 'sage.jpg',
    bio: "Third-generation Bristolian, **heads the history department**, and insists the family sourdough starter is older than the house.\n\n- Kept every letter Grandma Ruth sent from Malmö, 1961–1978.\n- The one who remembers everyone's birthday — use her as the date check.",
  },
  { slug: 'sam', fullName: 'Sam Ortega', gender: 'Male', birthDate: '1992-11-02', deathDate: null, birthPlace: 'Porto, Portugal', photo: null, bio: null },
  { slug: 'theo', fullName: 'Theo Kessler', gender: 'Male', birthDate: '1997-09-27', deathDate: null, birthPlace: 'Bristol, England', photo: null, bio: null },
];

// Flat [child, parent] pairs; the seed turns each into a BIOLOGICAL edge.
export const parents = [
  ['daniel', 'walter'],
  ['daniel', 'ruth'],
  ['maya', 'daniel'],
  ['maya', 'anita'],
  ['theo', 'daniel'],
  ['theo', 'anita'],
];

// Canonical personAId < personBId is applied by the seed; all MARRIED.
export const partnerships = [
  ['walter', 'ruth'],
  ['daniel', 'anita'],
  ['maya', 'sam'],
];
