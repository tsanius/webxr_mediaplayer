import { Control } from './Control';
import { GroupControl } from './GroupControl';
import { GroupControlElement } from './GroupControlElement';
import {
  autoDetectAtom,
  autoPlayAtom,
  debugAtom,
  detectingAtom,
  flipLayoutAtom,
  formatAtom,
  layoutAtom,
} from 'atoms/controls';
import { useAtom, useAtomValue } from 'jotai';
import { useXRSession } from 'hooks/useXRSession';
import clsx from 'clsx';
import type { DropzoneInputProps } from 'react-dropzone';

export function UI({ fileInputProps }: { fileInputProps: DropzoneInputProps }) {
  const [autoPlay, setAutoPlay] = useAtom(autoPlayAtom);
  const [autoDetect, setAutoDetect] = useAtom(autoDetectAtom);

  const detecting = useAtomValue(detectingAtom);

  const [layout, setLayout] = useAtom(layoutAtom);
  const [flipLayout, setFlipLayout] = useAtom(flipLayoutAtom);
  const [format, setFormat] = useAtom(formatAtom);

  const [debug, setDebug] = useAtom(debugAtom);

  const [xrSupported, xrSession, requestXrSession] = useXRSession();

  return (
    <div
      data-nosnippet
      className="flex flex-wrap items-start whitespace-nowrap"
    >
      <Control
        aria-current={Boolean(xrSession)}
        disabled={!xrSupported}
        onClick={() => {
          if (xrSession) {
            void xrSession.end();
          } else {
            requestXrSession();
          }
        }}
      >
        {
          // eslint-disable-next-line no-nested-ternary
          xrSupported
            ? xrSession
              ? 'Exit VR'
              : 'Enter VR'
            : 'VR Not Supported'
        }
      </Control>

      <label
        htmlFor="file-input"
        className="cursor-pointer flex m-2 py-2 px-4 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg shadow-sm"
      >
        Select File
        <input id="file-input" {...fileInputProps} />
      </label>

      <label
        htmlFor="file-input"
        className="cursor-pointer flex m-2 py-2 px-4 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg shadow-sm"
      >
        Youtube URL
        <input id="file-input" {...fileInputProps} />
      </label>

      <Control aria-current={autoPlay} onClick={() => setAutoPlay(!autoPlay)}>
        Autoplay
      </Control>

      <div className="flex relative">
        {detecting && (
          <span className="absolute top-1 right-1 h-3 w-3" role="status">
            <span className="sr-only">Loading...</span>
            <span
              role="presentation"
              className="absolute h-full w-full rounded-full bg-white shadow-sm"
            />
            <span
              role="presentation"
              className="animate-ping absolute h-full w-full rounded-full bg-white"
            />
          </span>
        )}
        <Control
          aria-current={autoDetect}
          onClick={() => setAutoDetect(!autoDetect)}
        >
          Detect Video Settings
        </Control>
      </div>

      <div className="flex flex-col items-center">
        <GroupControl>
          <GroupControlElement
            aria-current={layout === 'mono'}
            onClick={() => setLayout('mono')}
          >
            Mono
          </GroupControlElement>
          <GroupControlElement
            aria-current={layout === 'stereoLeftRight'}
            onClick={() => setLayout('stereoLeftRight')}
          >
            Left | Right
          </GroupControlElement>
          <GroupControlElement
            aria-current={layout === 'stereoTopBottom'}
            onClick={() => setLayout('stereoTopBottom')}
          >
            Top | Bottom
          </GroupControlElement>
        </GroupControl>

        <div
          className={clsx({
            hidden: !(
              layout === 'stereoLeftRight' || layout === 'stereoTopBottom'
            ),
          })}
        >
          <label htmlFor="flip-orientation-input" className="flex items-center">
            <input
              id="flip-orientation-input"
              type="checkbox"
              className="block w-4 h-4 mr-2"
              checked={flipLayout}
              onChange={() => {
                setFlipLayout(!flipLayout);
              }}
            />

            <div>Flip Layout</div>
          </label>
        </div>
      </div>

      <GroupControl>
        <GroupControlElement
          aria-current={format === 'screen'}
          onClick={() => setFormat('screen')}
        >
          Screen
        </GroupControlElement>
        <GroupControlElement
          aria-current={format === '180'}
          onClick={() => setFormat('180')}
        >
          180°
        </GroupControlElement>
        <GroupControlElement
          aria-current={format === '360'}
          onClick={() => setFormat('360')}
        >
          360°
        </GroupControlElement>
      </GroupControl>

      <Control aria-current={debug} onClick={() => setDebug(!debug)}>
        Preview
      </Control>
    </div>
  );
}
