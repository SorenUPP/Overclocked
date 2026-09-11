'use client';

/**
 * The image slot for a component/build card. No product photography exists in
 * the data yet — sourcing verified per-SKU photos hit a hard wall (manufacturer
 * sites are JS shells that won't render for a fetch, and free image archives
 * only cover a handful of flagship SKUs) — so every part renders a generated,
 * monochrome schematic glyph for its category instead. The moment a real
 * `image` URL is added to a part in the data, this swaps to it automatically;
 * no other code changes.
 *
 * Click (or Enter/Space) opens `ImageLightbox` for a larger look — the
 * "preview" interaction, real photo or glyph alike.
 */

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { glass as glassChrome } from '@/components/ui/primitives';

/** Stroke-based schematic per category. Pure geometry, no photography. */
function CategoryGlyph({ category }) {
  switch (category) {
    case 'CPU':
      return (
        <g>
          <rect x="7" y="7" width="18" height="18" rx="1.5" />
          <rect x="12" y="12" width="8" height="8" rx="0.5" />
          {[10, 14, 18, 22].map((p) => (
            <g key={p}>
              <line x1={p} y1="2" x2={p} y2="7" />
              <line x1={p} y1="25" x2={p} y2="30" />
              <line x1="2" y1={p} x2="7" y2={p} />
              <line x1="25" y1={p} x2="30" y2={p} />
            </g>
          ))}
        </g>
      );
    case 'GPU':
      return (
        <g>
          <rect x="3" y="10" width="26" height="14" rx="2" />
          <circle cx="10.5" cy="17" r="4" />
          <circle cx="21.5" cy="17" r="4" />
          <line x1="3" y1="27" x2="8" y2="27" />
          <line x1="3" y1="6" x2="12" y2="6" />
          <line x1="3" y1="6" x2="3" y2="10" />
        </g>
      );
    case 'Motherboard':
      return (
        <g>
          <rect x="3" y="3" width="26" height="26" rx="1.5" />
          <rect x="7" y="7" width="9" height="9" rx="0.5" />
          <circle cx="7.5" cy="7.5" r="0.6" style={{ fill: 'currentColor', stroke: 'none' }} />
          {[20, 22.5, 25].map((x) => (
            <line key={x} x1={x} y1="6" x2={x} y2="17" />
          ))}
          <rect x="6.5" y="21" width="19.5" height="3" rx="0.5" />
        </g>
      );
    case 'Memory':
      return (
        <g>
          <path d="M8 4h16v22.5a1.5 1.5 0 0 1-1.5 1.5H9.5A1.5 1.5 0 0 1 8 26.5z" />
          <line x1="12" y1="4" x2="12" y2="9" />
          <line x1="16" y1="4" x2="16" y2="9" />
          <line x1="20" y1="4" x2="20" y2="9" />
          <rect x="10.5" y="12" width="11" height="6" rx="0.5" />
        </g>
      );
    case 'Storage':
      return (
        <g>
          <rect x="4" y="10" width="24" height="12" rx="1.5" />
          <circle cx="9.5" cy="16" r="1.4" style={{ fill: 'currentColor', stroke: 'none' }} />
          <line x1="14" y1="16" x2="24.5" y2="16" />
          <line x1="4" y1="14.5" x2="8" y2="14.5" />
          <line x1="4" y1="17.5" x2="8" y2="17.5" />
        </g>
      );
    case 'Power Supply':
      return (
        <g>
          <rect x="4" y="6" width="24" height="20" rx="1.5" />
          <circle cx="16" cy="16" r="6" />
          <circle cx="16" cy="16" r="1.3" style={{ fill: 'currentColor', stroke: 'none' }} />
          <line x1="16" y1="10" x2="16" y2="11.6" />
          <line x1="16" y1="20.4" x2="16" y2="22" />
          <line x1="10" y1="16" x2="11.6" y2="16" />
          <line x1="20.4" y1="16" x2="22" y2="16" />
        </g>
      );
    case 'Case':
    default:
      return (
        <g>
          <rect x="8" y="2" width="16" height="28" rx="1.5" />
          <line x1="8" y1="9" x2="24" y2="9" />
          <circle cx="12" cy="5.5" r="1" style={{ fill: 'currentColor', stroke: 'none' }} />
          {[13, 16, 19, 22, 25].map((y) => (
            <line key={y} x1="11" y1={y} x2="21" y2={y} />
          ))}
        </g>
      );
  }
}

/**
 * A flat matte tile with a faint radial sheen for depth, matching `glassCard`
 * elsewhere on the site. `$flush` drops the tile's own border/radius when a
 * parent card already draws one (the tile just fills the card's top edge
 * instead of doubling up).
 */
const Tile = styled.button`
  all: unset;
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio || '4 / 3'};
  border-radius: ${({ theme, $flush }) => ($flush ? 0 : theme.radiusSmall)};
  overflow: hidden;
  cursor: ${({ $static }) => ($static ? 'default' : 'zoom-in')};
  border: ${({ $flush, theme }) =>
    $flush ? 'none' : `1px solid ${theme.colors.glassBorder}`};
  border-bottom: ${({ $flush, theme }) =>
    $flush ? `1px solid ${theme.colors.border}` : undefined};
  background: radial-gradient(
      130% 160% at 28% 15%,
      rgba(255, 255, 255, 0.1),
      transparent 65%
    ),
    ${({ theme }) => theme.colors.glass};
  transition:
    transform ${({ theme }) => theme.motion.base},
    background ${({ theme }) => theme.motion.base},
    border-color ${({ theme }) => theme.motion.base},
    box-shadow ${({ theme }) => theme.motion.base};

  &:hover,
  &:focus-visible {
    background: radial-gradient(
        130% 160% at 28% 15%,
        rgba(255, 255, 255, 0.14),
        transparent 65%
      ),
      ${({ theme }) => theme.colors.glassHover};
    border-color: ${({ theme }) => theme.colors.glassBorderStrong};
  }

  &:hover svg,
  &:focus-visible svg {
    color: ${({ theme }) => theme.colors.text};
    transform: translate(-50%, -50%) scale(1.06);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform ${({ theme }) => theme.motion.base};
  }

  &:hover img,
  &:focus-visible img {
    transform: scale(1.04);
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48%;
    height: 48%;
    color: ${({ theme }) => theme.colors.textDim};
    fill: rgba(255, 255, 255, 0.045);
    stroke: currentColor;
    stroke-width: 1.15;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.4));
    transition:
      color ${({ theme }) => theme.motion.base},
      transform ${({ theme }) => theme.motion.base};
  }
`;

const ZoomHint = styled.span`
  position: absolute;
  right: 6px;
  bottom: 6px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textGhost};
  opacity: 0;
  transition: opacity ${({ theme }) => theme.motion.base};

  ${Tile}:hover &,
  ${Tile}:focus-visible & {
    opacity: 1;
  }
`;

/**
 * `part` needs `category`, and may carry `image` (a real photo URL, once one
 * exists), `brand` and `name` (used as alt text / lightbox caption).
 *
 * Omit `onOpen` to render a non-interactive thumbnail — for spots (like a
 * build card that is itself one big link) where nesting a clickable preview
 * would mean a button inside a link.
 */
export function PartImage({ part, ratio, flush, onOpen, className }) {
  const label = [part.brand, part.name].filter(Boolean).join(' ');
  const interactive = Boolean(onOpen);

  return (
    <Tile
      as={interactive ? 'button' : 'div'}
      type={interactive ? 'button' : undefined}
      $ratio={ratio}
      $flush={flush}
      $static={!interactive}
      className={className}
      onClick={interactive ? () => onOpen(part) : undefined}
      aria-label={interactive ? `Preview image of ${label || part.category}` : undefined}
      aria-hidden={interactive ? undefined : true}
    >
      {part.image ? (
        <img src={part.image} alt={label} loading="lazy" />
      ) : (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <CategoryGlyph category={part.category} />
        </svg>
      )}
      {interactive && <ZoomHint>PREVIEW</ZoomHint>}
    </Tile>
  );
}

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.z.overlay};
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(4, 4, 5, 0.9);
  animation: ${riseIn} ${({ theme }) => theme.motion.slow} both;
`;

const Frame = styled.div`
  position: relative;
  border: 1px solid;
  ${glassChrome}
  border-color: ${({ theme }) => theme.colors.glassBorderStrong};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowLift};
  width: min(420px, 100%);
  overflow: hidden;
`;

const FrameImage = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  background: radial-gradient(
      130% 160% at 28% 15%,
      rgba(255, 255, 255, 0.1),
      transparent 65%
    ),
    ${({ theme }) => theme.colors.glass};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 40%;
    color: ${({ theme }) => theme.colors.textDim};
    fill: rgba(255, 255, 255, 0.045);
    stroke: currentColor;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.4));
  }
`;

const FrameBody = styled.div`
  padding: 16px 18px;
`;

const FrameName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
`;

const FrameMeta = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textDim};
  margin-top: 6px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radiusSmall};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  background: ${({ theme }) => theme.colors.glassChrome};
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.motion.base},
    background ${({ theme }) => theme.motion.base},
    border-color ${({ theme }) => theme.motion.base},
    transform ${({ theme }) => theme.motion.base};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.glassHover};
    border-color: ${({ theme }) => theme.colors.glassBorderStrong};
    transform: rotate(90deg);
  }
`;

/** Pass the `part` being previewed, or `null` to render nothing. */
export function ImageLightbox({ part, onClose }) {
  useEffect(() => {
    if (!part) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [part, onClose]);

  if (!part) return null;

  const label = [part.brand, part.name].filter(Boolean).join(' ');

  return (
    <Backdrop
      role="dialog"
      aria-modal="true"
      aria-label={`${label} preview`}
      onClick={onClose}
    >
      <Frame onClick={(e) => e.stopPropagation()}>
        <FrameImage>
          {part.image ? (
            <img src={part.image} alt={label} />
          ) : (
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <CategoryGlyph category={part.category} />
            </svg>
          )}
          <CloseBtn onClick={onClose} aria-label="Close preview">
            ✕
          </CloseBtn>
        </FrameImage>
        <FrameBody>
          <FrameName>{label || part.category}</FrameName>
          <FrameMeta>
            {part.category}
            {part.specs ? ` · ${part.specs}` : ''}
          </FrameMeta>
        </FrameBody>
      </Frame>
    </Backdrop>
  );
}

/** Small hook so cards don't each re-implement open/close state. */
export function useImagePreview() {
  const [part, setPart] = useState(null);
  return { previewed: part, open: setPart, close: () => setPart(null) };
}
