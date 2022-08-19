import { URLS } from '../constants';

export interface TwitchClipGenerateUrlOptions {
  autoplay?: boolean
  muted?: boolean,
  enableMigration?: boolean
}

export const generateUrlDefaultOptions: TwitchClipGenerateUrlOptions = {
  autoplay: false,
  muted: false,
  enableMigration: true
};

export const generateUrl = (
  clip: string,
  parent: string | string[],
  options = generateUrlDefaultOptions
): string => {
  const fullOptions = { ...generateUrlDefaultOptions, ...options };
  const params = new URLSearchParams();
  params.append('clip', clip);

  params.append('autoplay', fullOptions.autoplay!.toString());
  params.append('muted', fullOptions.muted!.toString());
  params.append('migration', fullOptions.enableMigration!.toString());

  if (Array.isArray(parent)) {
    parent.forEach((parent) => params.append('parent', parent));
  } else {
    params.append('parent', parent);
  }

  return `${URLS.TWITCH_CLIP_URL}?${params.toString()}`;
};
