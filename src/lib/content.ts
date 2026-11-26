export const LINKS = {
  paypal: "https://paypal.me/LwobawoShafic",
  stream: "https://tr.ee/AWrQQrpfB8",
  story: "https://mbu.ug/2024/10/20/jenva-music-magical-song/",
  designer: "https://fahaddeartist.com",
};

export const BOOKING_EMAIL = "bookingsslfiq@gmail.com";

/** mailto: with a short enquiry template, so promoters send what is needed. */
export const BOOKING_MAILTO =
  `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent("Booking enquiry: Jenva Eyo")}` +
  `&body=${encodeURIComponent("Hi,\n\nEvent:\nDate:\nCity and venue:\nSet length:\nBudget / fee:\n\nThanks,\n")}`;

/** Profiles, in the order shown in the footer. `sameAs` feeds the JSON-LD in Step 6. */
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/jenvaa_/" },
  { label: "TikTok", href: "https://www.tiktok.com/@jenvaofficial" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCIk-8VSdUkCnyP6rFASukwQ" },
  { label: "X", href: "https://x.com/Jenvaa_" },
  { label: "Spotify", href: "https://open.spotify.com/artist/1pWcaVS7oJ3XLjKMk3dm11" },
  { label: "Audiomack", href: "https://audiomack.com/jenvaa" },
  { label: "Mx3", href: "https://mx3.ch/jenvaeyo" },
] as const;

/**
 * Upcoming shows. Only names are confirmed so far; add date, city, venue and
 * a ticket link as they come in. The list hides itself when this is empty.
 */
export type UpcomingShow = { name: string; date?: string; city?: string; venue?: string; tickets?: string };
export const UPCOMING: UpcomingShow[] = [
  { name: "Afro Summer Jam 2027" },
  { name: "Afro-Pfingsten" },
  { name: "Ghana Festival" },
];

/** `alt` only for photos that carry meaning; decorative ones stay empty. */
export type Img = { src: string; w: number; h: number; alt?: string };

const m = (name: string, w: number, h: number, alt?: string): Img => ({
  src: `/media/${name}`,
  w,
  h,
  alt,
});

/** In-page sections, in page order. `key` matches the nav-link-bg progress fill in Motion.tsx. */
export const NAV = [
  { label: "About", href: "#base", key: "base" },
  { label: "Music", href: "#makes", key: "makes" },
  { label: "Live", href: "#skills", key: "skills" },
  { label: "Story", href: "#story", key: "story" },
] as const;

export const VIBE_PHRASES = [
  { label: "IT'S", text: "More than a Sound", doodle: { src: "/media/wavy-line-svg.svg", cls: "wave-svg" } },
  { label: "ME", text: "A world of expression", doodle: { src: "/media/eye-svg.svg", cls: "eye-svg" } },
  { label: "JENVA", text: "Born from rhythm", doodle: { src: "/media/wavy-line-svg.svg", cls: "gsap-svg" } },
  { label: "EYO", text: "Rooted in pure soul", doodle: { src: "/media/smiley-svg.svg", cls: "smiley-svg" } },
];

/** Scattered photos in the Vibe section, in the same order and slots as the original layout. */
export const VIBE_IMAGES: { slot: string; img: Img }[] = [
  { slot: "scroll-image-large _1", img: m("img-9.jpg", 640, 640, "Jenva on stage, shirtless, reaching out to a dancer") },
  { slot: "scroll-image-vertical _1", img: m("img-3.jpg", 640, 640, "Jenva in a leather jacket in a snowy landscape") },
  { slot: "scroll-image-small _1", img: m("img-1.jpg", 640, 640, "Jenva in a red shuka among tall grass") },
  { slot: "scroll-image-large _2", img: m("img-5.jpg", 640, 640, "Jenva in a sequinned white coat") },
  { slot: "scroll-image-large _3", img: m("img-4.jpg", 640, 640, "Jenva in sunglasses and a cropped leather jacket") },
  { slot: "scroll-image-large heading-404", img: m("img-10.jpg", 640, 800, "Jenva singing into a microphone") },
  { slot: "scroll-image-small _2", img: m("img-13.jpg", 640, 800, "Jenva in a dark green suit") },
];

export const VIBE_ROWS: { row: string; items: { slot: string; img: Img }[] }[] = [
  {
    row: "scroll-row _1",
    items: [
      { slot: "scroll-image-small _5", img: m("img-14.jpg", 640, 800, "Jenva walking a runway") },
      { slot: "scroll-image-horizontall _1", img: m("img-12.jpg", 640, 640, "Jenva in a white robe, hand raised to the head") },
    ],
  },
  {
    row: "scroll-row _2",
    items: [
      { slot: "scroll-image-small _6", img: m("img-7.jpg", 640, 640, "Jenva at a radio studio microphone") },
      { slot: "scroll-image-large _4", img: m("img-11.jpg", 640, 800, "Jenva on a black leather sofa") },
    ],
  },
];

export const TRACKS: { title: string; img: Img }[] = [
  { title: "Genva's Musics", img: m("design-1-copy.jpg", 2000, 1226, "Genva's Musics cover art") },
  { title: "Mapenzi", img: m("design-2.jpg", 2000, 1125, "Mapenzi cover art") },
  { title: "I Don't", img: m("design-3.jpg", 1424, 1064, "I Don't cover art") },
];

export type Show = {
  city: string;
  caption: string;
  mention?: { text: string; href: string; after: string };
  insta: string;
  video: string;
};

export const SHOWS: Show[] = [
  {
    city: "Berlin",
    caption: "Berlin Energy Hits different, I felt so much love there❤️ many thanks to ",
    mention: { text: "@humboldtforum", href: "https://www.instagram.com/humboldtforum/", after: " for having me." },
    insta: "https://www.instagram.com/reel/DMVqOJHqHUl/",
    video: "ins-1",
  },
  {
    city: "Zurich",
    caption:
      "It has been a long way from where we started to where we are now, but it still feels like we haven’t gotten anywhere yet so we stay hungry and hungrier.",
    insta: "https://www.instagram.com/reel/DL8BALQNdKm/",
    video: "ins-2",
  },
  {
    city: "Geneva",
    caption: "Geneva stop was just impossible to imagine ",
    mention: { text: "@lateenaplummer", href: "https://www.instagram.com/lateenaplummer/", after: " she the real Diva." },
    insta: "https://www.instagram.com/reel/DLNdrX-qHWu/",
    video: "ins-3",
  },
];

export const STATS = [
  { value: "8", title: "Cities performed", note: "none forgotten, all inspired" },
  { value: "327", title: "Beats dropped", note: "each one louder than the last" },
  { value: "21", title: "Songs released", note: "5 acoustic, 2 unforgettable" },
  { value: "100%", title: "Made from the soul", note: "under lights, over pure passion" },
];

export const RING_IMAGES: Img[] = [
  m("97aec48c-b06e-498c-8070-3129d485923b.jpg", 1067, 1600),
  m("d576836c-d5b0-4cf0-aeb2-1fb26f8c019e.jpg", 1440, 1681),
  m("a778e0cc-1afc-42ae-96fe-bbb2677c7914.jpg", 2000, 1334),
  m("47bff7d3-0e4d-4676-955e-03a803a9a330.jpg", 1333, 2000),
  m("0a89b07c-026d-4b0e-8a66-66ed2d5c5048.jpg", 938, 1367),
  m("becb5a0f-e06e-46dc-bc6a-fd5a2351883d.jpg", 1500, 2000),
  m("205f9815-3f07-43cf-a256-57cd9efe4c53.jpg", 1500, 2000),
  m("0f9614ea-1f45-40d1-a147-b9929a20a4cb.jpg", 848, 1184),
  m("cc57fe20-f8d5-4d4f-81cc-e2d158593dd1.jpg", 1440, 1800),
  m("ff313c44-0fe7-46ad-84f0-f8784b740da9.jpg", 848, 1184),
  m("e7afb1d3-41e0-4306-b5ca-689f5ad53c28.jpg", 1500, 2000),
  m("eb23b46b-cb8b-4e28-af96-9c3f4a5d7b03.jpg", 848, 1184),
  m("img-11.jpg", 640, 800),
  m("img-14.jpg", 640, 800),
  m("img-12.jpg", 640, 640),
  m("img-13.jpg", 640, 800),
  m("img-10.jpg", 640, 800),
  m("img-8.jpg", 640, 640),
  m("img-3.jpg", 640, 640),
  m("img-1.jpg", 640, 640),
  m("img-7.jpg", 640, 640),
  m("img-5.jpg", 640, 640),
  m("img-9.jpg", 640, 640),
  m("becb5a0f-e06e-46dc-bc6a-fd5a2351883d.jpg", 1500, 2000),
];
