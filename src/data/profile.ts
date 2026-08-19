export const profile = {
  name: 'Ali Saad',
  handle: 'SPeeDo',
  title: 'Web Developer & Cybersecurity Enthusiast',
  location: 'Duhok, Iraq',
  email: 'ali2005saad12@gmail.com',
  phone: '+964 770 161 3172',
  github: 'https://github.com/SPeeDoA1',
  linkedin: 'https://www.linkedin.com/in/speedoa1/',
  quote: 'It takes 20 years to build a reputation and five minutes to ruin it.',
} as const;

export type Profile = typeof profile;
