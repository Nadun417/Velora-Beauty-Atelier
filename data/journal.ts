import type { JournalArticle } from "@/types";
import { unsplash } from "@/lib/utils";

export const journal: JournalArticle[] = [
  {
    id: "jnl-01",
    slug: "the-return-of-the-bob",
    title: "The Return of the Bob",
    category: "Editorial",
    readTime: 5,
    excerpt:
      "It never really left. But the version walking out of the atelier this season is softer, longer at the front and cut to move.",
    image: unsplash("1506863530036-1efeddceb993", 1400),
    size: "feature",
    date: "2026-08-28",
    body: [
      "Every few years the bob is declared back, as if it had been somewhere else. The truth is that it never leaves; it just changes its posture. The version we are cutting this season sits a little longer at the front, is taken away underneath so it collapses softly, and is designed to be worn without a round brush.",
      "What makes a bob feel modern is not the length but the weight distribution. Too much bulk at the perimeter and it reads as a helmet; too much removed and it loses the line that makes it a bob at all. We cut most of ours dry, watching how each section falls before it is touched.",
      "If you are considering one, bring photographs of your hair as it dries naturally rather than photographs of other people. The best bob for you is the one that works with the way your hair already wants to move.",
    ],
  },
  {
    id: "jnl-02",
    slug: "colour-without-compromise",
    title: "Colour Without Compromise",
    category: "Technique",
    readTime: 4,
    excerpt:
      "How we plan lightening around the health of the hair, and why we will sometimes ask you to wait.",
    image: unsplash("1529626455594-4ff0802cfb7e", 1200),
    size: "standard",
    date: "2026-08-14",
    body: [
      "The most useful thing a colourist can say is sometimes 'not today'. Hair that has been lightened repeatedly, or coloured at home with box dye, has a history that needs to be read before anything else is layered on top.",
      "We begin every colour appointment with a strand test and an honest conversation about where the hair is and where it can realistically go in one visit. Bond builders, lower-volume developers and longer processing times are not slower for the sake of it; they are how colour is achieved without leaving the hair worse than we found it.",
      "The result is colour that still looks intentional three months later, which is the only kind worth paying for.",
    ],
  },
  {
    id: "jnl-03",
    slug: "how-to-keep-curls-healthy",
    title: "How to Keep Curls Healthy",
    category: "Care",
    readTime: 7,
    excerpt:
      "Noah on hydration, the case against daily washing and why your towel is probably the problem.",
    image: unsplash("1508002366005-75a695ee2d17", 1200),
    size: "tall",
    date: "2026-07-30",
    body: [
      "Curly hair is dry hair almost by definition. The natural oils produced at the scalp struggle to travel down a spiral, so the ends are chronically under-nourished while the roots may feel perfectly fine. Every routine should start from that fact.",
      "Wash less, condition more, and lose the cotton towel. Cotton lifts the cuticle and creates frizz before you have even started; a microfibre or an old T-shirt does the job gently. Apply products to soaking wet hair, scrunch upward and then leave it alone. Touching curls while they dry is how definition is lost.",
      "In the salon we cut curls dry, one at a time, so each spiral sits where it should. It takes longer. It is also the only way to do it properly.",
    ],
  },
  {
    id: "jnl-04",
    slug: "behind-the-chair-amara",
    title: "Behind the Chair: Amara",
    category: "People",
    readTime: 6,
    excerpt:
      "Our Creative Director on editorial work, coming home to Colombo and why she spends the first ten minutes just looking.",
    image: unsplash("1580489944761-15a19d654956", 1200),
    size: "standard",
    date: "2026-07-12",
    body: [
      "Amara Silva did not set out to open a salon. She set out to cut hair for magazines, and for ten years she did, moving between shoots in London and shows in Colombo. What changed was a growing sense that the most interesting hair was not on set at all.",
      "'Editorial teaches you to see,' she says. 'But nobody lives in an editorial. The real skill is taking that eye and using it on someone who has to get up on Monday and go to work.' Velora was built as a place where that translation could happen.",
      "Her appointments start slowly. Ten minutes of conversation, sometimes more, before scissors are picked up. 'If I understand how you talk, how you move, what you do with your hands, I already know what the cut needs to be.'",
    ],
  },
  {
    id: "jnl-05",
    slug: "summer-hair-without-the-damage",
    title: "Summer Hair, Without the Damage",
    category: "Care",
    readTime: 5,
    excerpt:
      "Salt, sun and chlorine are not the enemy if you plan for them. A short, practical guide to the season.",
    image: unsplash("1516726817505-f5ed825624d8", 1200),
    size: "wide",
    date: "2026-06-20",
    body: [
      "Sun fades colour, salt dehydrates and chlorine strips. None of that is news. What is less discussed is that most summer damage is done in the hour after swimming, when hair is left to dry with everything still in it.",
      "Rinse in fresh water before you swim so the hair absorbs less of what comes next, and again immediately after. A leave-in conditioner with UV protection is a small habit that makes a visible difference by September. Save the heavy masks for once a week and let hair air-dry as often as the weather allows.",
      "Book a gloss towards the end of the season rather than the start. It will bring colour back to where it was and add the shine that sun quietly takes away.",
    ],
  },
  {
    id: "jnl-06",
    slug: "the-new-copper",
    title: "The New Copper",
    category: "Colour",
    readTime: 4,
    excerpt:
      "Warmer, softer and closer to skin than the orange of a few years ago. Maya on the shade we cannot stop mixing.",
    image: unsplash("1516575150278-77136aed6920", 1200),
    size: "standard",
    date: "2026-06-02",
    body: [
      "Copper has spent a few years being loud. The version leaving our colour room this season is quieter: more rose, more brown, mixed to sit close to the skin tone rather than fight with it.",
      "Maya builds it in two stages. A soft lift to a warm base, then a gloss mixed on the day to the client's complexion. 'Copper is one of the few shades that improves as it fades,' she says, 'as long as it was warm enough to begin with.'",
      "It suits far more people than it is given credit for. The trick is in the depth, not the brightness.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return journal.find((article) => article.slug === slug);
}
