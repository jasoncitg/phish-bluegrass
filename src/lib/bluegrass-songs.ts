export interface BluegrassSong {
  slug: string;       // Phish.net URL slug
  name: string;
  artist?: string;    // original artist if a cover
  type: "cover" | "original";
  note?: string;      // brief descriptor
}

/**
 * Curated list of songs Phish has performed live with a bluegrass feel.
 * Slugs match Phish.net's URL scheme: phish.net/song/{slug}
 */
export const BLUEGRASS_SONGS: BluegrassSong[] = [
  // Confirmed bluegrass covers
  {
    slug: "ginseng-sullivan",
    name: "Ginseng Sullivan",
    artist: "Norman Blake",
    type: "cover",
    note: "Classic Norman Blake picker's tune",
  },
  {
    slug: "uncle-pen",
    name: "Uncle Pen",
    artist: "Bill Monroe",
    type: "cover",
    note: "The Father of Bluegrass himself",
  },
  {
    slug: "foggy-mountain-breakdown",
    name: "Foggy Mountain Breakdown",
    artist: "Flatt & Scruggs",
    type: "cover",
    note: "Earl Scruggs banjo masterpiece",
  },
  {
    slug: "rocky-top",
    name: "Rocky Top",
    artist: "Osborne Brothers",
    type: "cover",
    note: "Tennessee anthem",
  },
  {
    slug: "nellie-kane",
    name: "Nellie Kane",
    artist: "Hot Rize",
    type: "cover",
    note: "Colorado's finest bluegrass band",
  },
  {
    slug: "old-home-place",
    name: "Old Home Place",
    artist: "The Country Gentlemen",
    type: "cover",
    note: "Bluegrass standard",
  },
  {
    slug: "long-journey-home",
    name: "Long Journey Home",
    type: "cover",
    note: "Traditional",
  },
  {
    slug: "bill-bailey",
    name: "Bill Bailey (Won't You Please Come Home)",
    type: "cover",
    note: "Ragtime classic, acoustic style",
  },
  // Phish originals with strong acoustic/bluegrass character
  {
    slug: "my-sweet-one",
    name: "My Sweet One",
    type: "original",
    note: "Penned by Page, pure bluegrass heart",
  },
  {
    slug: "poor-heart",
    name: "Poor Heart",
    type: "original",
    note: "Trey's bluegrass-flavored original",
  },
  {
    slug: "dog-faced-boy",
    name: "Dog Faced Boy",
    type: "original",
    note: "Delicate acoustic gem",
  },
  {
    slug: "fast-enough-for-you",
    name: "Fast Enough for You",
    type: "original",
    note: "Country-tinged ballad",
  },
];
