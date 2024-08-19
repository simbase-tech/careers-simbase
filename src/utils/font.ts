import localFont from 'next/font/local'

export const sfMono = localFont({
  src: [
    {
      path: './fonts/SFMono-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/SFMono-Medium.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/SFMono-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
})
