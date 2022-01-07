import { VrRenderer } from './renderer/vrRenderer';
import type { Format } from './format';
import type { Layout } from './layout';
import type { XRSession } from 'webxr';

export const play = (
  xrSession: XRSession,
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  layout: Layout,
  format: Format,
) => {
  const renderer = new VrRenderer(xrSession, video, canvas, layout, format);
  void renderer.start();
};
