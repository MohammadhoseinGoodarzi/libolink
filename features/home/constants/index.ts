import type { Post, Story } from '../types';

export const MOCK_USER = {
  name: 'Mehrab Kargardoost',
  handle: '@mehrab',
  role: 'Performance Marketer',
  favoriteBook: 'Harry Potter',
};

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: { name: 'Amara Collins', handle: '@amara' },
    content:
      'Just finished The Legacy of Prairie Winds by Glenda K Clare — an absolute saga. Johann Gehring arrives in Nebraska at sixteen with nothing but hope, and the land nearly breaks him. Tornadoes, prairie fires, brutal winters. And yet he stays.\n\nWhat gets me is how Clare writes the silence between people. The things left unsaid between Johann and his neighbors carry as much weight as the storms. Highly recommend if you enjoy historical fiction with real grit.',
    timestamp: '1 hour ago',
    bookCoverUrl: '/assets/images/mock/book-portrait.jpg',
    likes: 24,
    commentsCount: 8,
  },
  {
    id: '2',
    author: { name: 'Daniel Reyes', handle: '@dreyes' },
    content: 'Currently reading Dune for the third time. It never gets old.',
    timestamp: '2 hours ago',
    bookCoverUrl: '/assets/images/mock/book-square.jpg',
    likes: 57,
    commentsCount: 14,
  },
  {
    id: '3',
    author: { name: 'Sofia Nakamura', handle: '@sofia_reads' },
    content:
      "Unpopular opinion: the movie adaptation of Educated was better than the book.\n\nI know, I know. But the pacing in the film just worked for me in a way the memoir didn't. The book felt like it was trying too hard to be literary in places where raw honesty would've been stronger.\n\nTara Westover's story is extraordinary regardless of format — I just connected with the visual storytelling more. Has anyone else felt this way about an adaptation?",
    timestamp: '3 hours ago',
    likes: 12,
    commentsCount: 31,
  },
  {
    id: '4',
    author: { name: 'Marcus Webb', handle: '@marcuswebb' },
    content: 'Wide landscape book covers are criminally underrated. Look at this one.',
    timestamp: '5 hours ago',
    bookCoverUrl: '/assets/images/mock/book-landscape.jpg',
    likes: 88,
    commentsCount: 5,
  },
  {
    id: '5',
    author: { name: 'Lena Hartmann', handle: '@lena_h' },
    content:
      'Book recommendation thread\n\nDrop your favourite read of the year below. Mine: Tomorrow, and Tomorrow, and Tomorrow by Gabrielle Zevin. I cried three times. On a train. In public.',
    timestamp: '6 hours ago',
    bookCoverUrl: '/assets/images/mock/book-tall.jpg',
    likes: 143,
    commentsCount: 62,
  },
  {
    id: '6',
    author: { name: 'Yusuf Okafor', handle: '@yusuf' },
    content: 'DNF at page 40. Life is too short for bad prose.',
    timestamp: '8 hours ago',
    likes: 209,
    commentsCount: 44,
  },
  {
    id: '7',
    author: { name: 'Eleanor Marsh', handle: '@eleanor_reads' },
    content: `Reading Journal — June 2026

After three months working through the Booker longlist backlist alongside whatever else has caught my eye, I have some thoughts. Not all of them are generous. But I have tried, in every case, to stay honest.

Lincoln in the Bardo — George Saunders

The most formally inventive novel I have read in a decade. The structure — a kind of antiphonal chorus of historical citations, invented testimonies, and fractured consciousness — should not work. Every rule of commercial fiction says a novel cannot survive this level of formal ambition without becoming self-parody. And yet it holds, because Saunders never forgets that grief is the engine underneath all the stylistic machinery. The section where Abraham Lincoln descends into the bardo to hold his dead son is devastating in a way that conventional realism could never achieve. It can only work because the strangeness of the form has already loosened your defenses. You are not reading in the mode of 'this is probably true'; you are reading in the mode of 'anything might be true here', and that is exactly the emotional permission grief requires.

Atonement — Ian McEwan

I know this is beloved. I know it won prizes and sold millions of copies and launched a thousand undergraduate essays about the ethics of fiction. But I find McEwan's precision cold in a way that finally defeats me. His sentences are technically perfect — each one polished to a high sheen, not a word out of place. And that is precisely the problem. Life is not like this. People who have spent thirty years carrying the weight of a catastrophic misidentification do not produce prose that reads like a debut novelist trying to impress a workshop. The retrospective framing device is clever, but cleverness is the book's limitation as much as its achievement. I will grant that the Dunkirk section is extraordinary — physically precise and emotionally raw in a way the rest of the novel rarely manages. But extraordinary passages do not redeem a fundamental coldness at the center.

A Little Life — Hanya Yanagihara

I finished this two weeks ago and have not fully recovered from it. I want to be precise about what this book does and does not do, because the criticism it has attracted — that it is trauma porn, that it aestheticizes suffering, that it is manipulative — is not wrong, exactly, but misses something important.

It is true that the novel accumulates suffering in a way that seems almost willful in its extremity. Jude St. Francis endures more in one fictional lifetime than any realistic claim to probability allows. But Yanagihara is not interested in realism. She is working in something closer to myth — the myth of the person who cannot be saved, whose damage goes all the way down and cannot be reached by the love of others, no matter how extravagant that love becomes. The four male friendships at the center of the novel are rendered with extraordinary care: the texture of long, intimate adult friendship is something almost no novel gets right, and Yanagihara gets it almost perfectly. The conversations about work, the private languages, the years-long threads of in-jokes — these feel true in a way that makes the novel's eventual catastrophes bearable to sit with.

What the critics who call it manipulative are really objecting to, I think, is that the novel is unsparing in its demand that you feel. It does not let you process and move on. It circles back. It reminds you. It refuses the comfort of distance. And that can feel like a kind of violence, especially if you prefer fiction that gives you permission to observe rather than insisting you participate. There are passages in the later sections where accumulation becomes numbing rather than intensifying. But the novel's ambitions are so large, and its successes so real, that I find myself returning to it the way you return to a place where something important happened to you.

The Brothers Karamazov — Fyodor Dostoevsky

I reread this for the fourth time this spring, and I am still finding new things. The Grand Inquisitor chapter remains one of the greatest pieces of sustained philosophical argument in the history of the novel — Ivan's case against God is so devastating, and so honestly rendered, that the reader genuinely does not know how Dostoevsky intends to answer it. The answer Alyosha gives, when it comes, is almost wordless: a kiss. Dostoevsky understood that some arguments can only be answered by an act, not a counter-argument.

What I noticed this time, in a way I had not quite clocked before, is how funny the novel is. The Karamazov family is genuinely comic in its dysfunction. Fyodor Pavlovich, the father, is an embarrassing, leering fool — a man who has survived by making himself too ridiculous to take seriously. The scenes at the monastery with Father Zosima are shot through with a barely suppressed absurdity. Dostoevsky had a ferocious sense of humor, and it is strange how often it is left out of accounts of his work.

Currently reading: The Remains of the Day by Kazuo Ishiguro. Thirty pages in and already understanding why it is considered one of the great English novels of the twentieth century. Stevens the butler is one of the most precisely drawn unreliable narrators in fiction — his evasions are so exact that you can map the shape of what he is hiding from their outline. He talks at length about dignity and professionalism, and every sentence is also about something else entirely. Ishiguro makes it look effortless, which is the most misleading thing about his prose. It is the result of extraordinary control. More next week.`,
    timestamp: '12 hours ago',
    likes: 47,
    commentsCount: 23,
  },
];

export const MOCK_STORIES: Story[] = [
  { id: '1', coverUrl: 'https://picsum.photos/seed/story1/64/96', alt: 'Story 1' },
  { id: '2', coverUrl: 'https://picsum.photos/seed/story2/64/96', alt: 'Story 2' },
  { id: '3', coverUrl: 'https://picsum.photos/seed/story3/64/96', alt: 'Story 3' },
];
