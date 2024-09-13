import arrowDown from '@/assets/icons/arrow-down.png';
import arrowUp from '@/assets/icons/arrow-up.png';
import backArrow from '@/assets/icons/back-arrow.png';
import chat from '@/assets/icons/chat.png';
import checkmark from '@/assets/icons/check.png';
import close from '@/assets/icons/close.png';
import dollar from '@/assets/icons/dollar.png';
import email from '@/assets/icons/email.png';
import eyecross from '@/assets/icons/eyecross.png';
import google from '@/assets/icons/google.png';
import home from '@/assets/icons/home.png';
import list from '@/assets/icons/list.png';
import lock from '@/assets/icons/lock.png';
import map from '@/assets/icons/map.png';
import marker from '@/assets/icons/marker.png';
import out from '@/assets/icons/out.png';
import person from '@/assets/icons/person.png';
import pin from '@/assets/icons/pin.png';
import point from '@/assets/icons/point.png';
import profile from '@/assets/icons/profile.png';
import search from '@/assets/icons/search.png';
import selectedMarker from '@/assets/icons/selected-marker.png';
import star from '@/assets/icons/star.png';
import target from '@/assets/icons/target.png';
import to from '@/assets/icons/to.png';
import check from '@/assets/images/check.png';
import getStarted from '@/assets/images/get-started.png';
import auralogo from '@/assets/images/logo.png';
import message from '@/assets/images/message.png';
import noResult from '@/assets/images/no-result.png';
import onboard1 from '@/assets/images/onboard1.png';
import onboard2 from '@/assets/images/onboard2.png';
import onboard3 from '@/assets/images/onboard4.png';
import onboarding1 from '@/assets/images/onboarding1.png';
import onboarding2 from '@/assets/images/onboarding2.png';
import onboarding3 from '@/assets/images/onboarding3.png';
import signUpCar from '@/assets/images/signup-car.png';
import { S3 } from 'aws-sdk';

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  getStarted,
  signUpCar,
  check,
  noResult,
  message,
  auralogo,
  onboard1,
  onboard2,
  onboard3,
};

export const icons = {
  arrowDown,
  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  dollar,
  email,
  eyecross,
  google,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  profile,
  search,
  selectedMarker,
  star,
  target,
  to,
};

export const onboarding = [
  // {
  //   id: 1,
  //   title: "welcome to aura",
  //   description:
  //     "congratulations on taking the first step towards becoming the main character.",
  //   image: images.auralogo,
  // },
  {
    id: 2,
    title: `the official way to calculate aura points`,
    description: 'how many aura points did i lose when i...we have the answer!',
    image: images.onboard1,
  },
  {
    id: 3,
    title: 'level up your aura through daily challenges',
    description: 'we curate a list of tasks to help you gain aura points.',
    image: images.onboard2,
  },
  {
    id: 4,
    title: 'personalized self improvement coaches',
    description:
      'AI coaches at the tips of your finger ready to help you level up.',
    image: images.onboard3,
  },
];

export const data = {
  onboarding,
};

export const s3Bucket = new S3({
  accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.EXPO_PUBLIC_AWS_REGION,
});
