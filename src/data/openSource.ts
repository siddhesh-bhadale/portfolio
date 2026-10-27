import type { EducationItem, OpenSourceItem } from '@/types';

export const openSource: OpenSourceItem[] = [
  {
    id: 'androidusbcamera-753',
    repo: 'jiangdongguo/AndroidUSBCamera',
    title: 'Add 16 KB page size support and rebuild native libraries',
    pullRequest: '#753',
    href: 'https://github.com/jiangdongguo/AndroidUSBCamera/pull/753',
    summary:
      'The AndroidUSBCamera UVC library gated a body-camera feature in our inspection platform. I opened an upstream PR to update its Android build tooling and rebuild native libraries from source for 16 KB memory-page compatibility. The PR remains open, and a downstream project references the fix.',
    details: [
      'Upgraded Gradle from 6.7.1 to 8.13 and moved the project to NDK 27, SDK 36 and Kotlin 2.0.21.',
      'Dropped the prebuilt .so blobs and rebuilt libuvc, libnative and libausbc from source through externalNativeBuild, enabling ANDROID_SUPPORT_16K_PAGES for the 16 KB memory page size Play Store now requires.',
      'Used jniLibs.pickFirst to resolve duplicate-native conflicts introduced by building from source.',
      'Verified in a production Android app on Realme Narzo N55, Realme Narzo 80x, Samsung Galaxy S24 Ultra and Galaxy A15.',
      'Referenced downstream by nolte/kamerplanter-android #19, merged August 2026, which cites this PR as the upstream fix for the same alignment failure.',
    ],
    stats: [
      { label: 'Diff', value: '+316 / −197' },
      { label: 'Files', value: '63' },
      { label: 'Issues addressed', value: '4' },
      { label: 'Repo stars', value: '2.7k' },
    ],
    status: 'Open — awaiting maintainer review',
  },
];

export const education: EducationItem[] = [
  {
    id: 'sppu',
    qualification: 'B.E. Computer Engineering',
    institution: 'Savitribai Phule Pune University (SPPU)',
    location: 'Pune, India',
    period: '2020 — 2024',
  },
];

export const languages = ['English', 'Hindi', 'Marathi'];
