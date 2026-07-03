import { CARD_GRADIENTS } from '~/constants/theme.constants';

export function getCardColor(index: number) {
  return CARD_GRADIENTS[index % CARD_GRADIENTS.length];
}

export function getCardNoise(index: number) {
  return `/texture/noise${(index % 4) + 1}.jpg`;
}
