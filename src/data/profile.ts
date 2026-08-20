export const profile = {
  name: 'Ali Saad Ezzaldeen',
  handle: 'SPeeDo',
  title: 'Full-Stack Software Engineer',
  secondaryTitle: 'Cybersecurity Engineering Senior',
  location: 'Duhok, Iraq',
  emails: ['ali@ninuva.io', 'ali2005saad12@gmail.com'],
  phones: ['+964 770 161 3172', '+964 783 140 8529'],
  github: 'https://github.com/SPeeDoA1',
  linkedin: 'https://www.linkedin.com/in/speedoa1/',
  ninuva: {
    main: 'https://ninuva.io',
    cast: 'https://cast.ninuva.io',
    menu: 'https://menu.ninuva.io',
  },
  quote: 'It takes 20 years to build a reputation and five minutes to ruin it.',
} as const;

export type Profile = typeof profile;
