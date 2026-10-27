import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion, useTheme } from '@/hooks';
import { cn } from '@/utils/cn';
import styles from './ConnectionDiagram.module.css';

/* ------------------------------------------------------------------
   The one animated moment on the page.

   It replays the actual lifecycle of the peer-to-peer transport built at
   EaseMyAI: a client outside a locked-down network finds an on-premises
   server, uses a circuit relay as a fallback, then attempts to upgrade
   to a direct connection by hole punching through NAT.

   Drawn on a canvas rather than assembled from DOM nodes because the
   packets move continuously along a path; a DOM version would be dozens
   of elements animating every frame.
   ------------------------------------------------------------------ */

export type PhaseId = 'discover' | 'relay' | 'punch' | 'direct';

interface Phase {
  id: PhaseId;
  label: string;
  caption: string;
  duration: number;
  /** Connection state shown below the diagram — no synthetic latency values. */
  path: '—' | 'Relay' | 'Direct';
}

const PHASES: Phase[] = [
  {
    id: 'discover',
    label: 'discover',
    caption:
      'The client asks a public bootstrap node where the on-premises server is. Nothing on the customer network has been opened.',
    duration: 1600,
    path: '—',
  },
  {
    id: 'relay',
    label: 'relay reserved',
    caption:
      'A circuit relay carries traffic straight away, so a session is never unreachable — it is just slower than it needs to be.',
    duration: 2900,
    path: 'Relay',
  },
  {
    id: 'punch',
    label: 'hole punch',
    caption:
      'Both sides fire outbound packets at the same instant. Each one opens a return path in its own NAT for the other.',
    duration: 1800,
    path: '—',
  },
  {
    id: 'direct',
    label: 'direct',
    caption:
      'Traffic now moves peer to peer. No open port, no public IP, no VPN. On symmetric NAT it stays relayed rather than failing.',
    duration: 4000,
    path: 'Direct',
  },
];

const TOTAL_DURATION = PHASES.reduce((sum, phase) => sum + phase.duration, 0);

interface Palette {
  ink: string;
  inkSoft: string;
  inkFaint: string;
  line: string;
  accent: string;
  relay: string;
  surface: string;
}

function readPalette(): Palette {
  const styleMap = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    styleMap.getPropertyValue(name).trim() || fallback;

  return {
    ink: read('--ink', '#111a19'),
    inkSoft: read('--ink-2', '#3c4a47'),
    inkFaint: read('--ink-3', '#6c7a75'),
    line: read('--line-strong', '#b0bfb8'),
    accent: read('--accent', '#0b6b60'),
    relay: read('--relay', '#99763a'),
    surface: read('--bg-raised', '#f9fbf9'),
  };
}

function phaseAt(elapsed: number): { index: number; progress: number } {
  let remaining = elapsed % TOTAL_DURATION;

  for (let index = 0; index < PHASES.length; index += 1) {
    const phase = PHASES[index]!;
    if (remaining < phase.duration) {
      return { index, progress: remaining / phase.duration };
    }
    remaining -= phase.duration;
  }

  return { index: PHASES.length - 1, progress: 1 };
}

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

interface Point {
  x: number;
  y: number;
}

/** Position along a polyline at progress t (0–1). */
function pointOnPath(points: Point[], t: number): Point {
  const segments: number[] = [];
  let total = 0;

  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i]!;
    const b = points[i + 1]!;
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    segments.push(length);
    total += length;
  }

  let target = Math.max(0, Math.min(1, t)) * total;

  for (let i = 0; i < segments.length; i += 1) {
    const length = segments[i]!;
    if (target <= length) {
      const ratio = length === 0 ? 0 : target / length;
      const a = points[i]!;
      const b = points[i + 1]!;
      return { x: a.x + (b.x - a.x) * ratio, y: a.y + (b.y - a.y) * ratio };
    }
    target -= length;
  }

  return points[points.length - 1]!;
}

export function ConnectionDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<number>(0);
  const paletteRef = useRef<Palette | null>(null);

  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [phaseIndex, setPhaseIndex] = useState(prefersReducedMotion ? 3 : 0);
  const [isVisible, setIsVisible] = useState(true);
  const [replayKey, setReplayKey] = useState(0);

  const replay = useCallback(() => {
    startRef.current = performance.now();
    setReplayKey((key) => key + 1);
  }, []);

  /* Pause the loop when the diagram is scrolled away. */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.1 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  /* Re-read colours whenever the theme flips. */
  useEffect(() => {
    paletteRef.current = readPalette();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    paletteRef.current = readPalette();

    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawNode = (
      centre: Point,
      label: string,
      sublabel: string,
      active: boolean,
      palette: Palette
    ) => {
      const boxWidth = Math.max(54, Math.min(width * 0.155, 96));
      const boxHeight = 34;
      const x = centre.x - boxWidth / 2;
      const y = centre.y - boxHeight / 2;

      roundedRect(ctx, x, y, boxWidth, boxHeight, 5);
      ctx.fillStyle = palette.surface;
      ctx.fill();
      ctx.lineWidth = active ? 1.6 : 1;
      ctx.strokeStyle = active ? palette.accent : palette.line;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '600 11px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillStyle = active ? palette.ink : palette.inkSoft;
      ctx.fillText(label, centre.x, centre.y);

      ctx.font = '400 10px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillStyle = palette.inkFaint;
      ctx.fillText(sublabel, centre.x, centre.y + boxHeight / 2 + 12);
    };

    const drawPacket = (
      position: Point,
      colour: string,
      radius: number,
      palette: Palette
    ) => {
      ctx.beginPath();
      ctx.arc(position.x, position.y, radius + 2.5, 0, Math.PI * 2);
      ctx.fillStyle = palette.surface;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = colour;
      ctx.fill();
    };

    const render = (now: number) => {
      const palette = paletteRef.current ?? readPalette();
      const elapsed = prefersReducedMotion
        ? TOTAL_DURATION - PHASES[3]!.duration / 2
        : now - startRef.current;

      const { index, progress } = phaseAt(elapsed);
      const phase = PHASES[index]!;

      ctx.clearRect(0, 0, width, height);

      /* ---- Geometry ---------------------------------------------- */
      const client: Point = { x: width * 0.13, y: height * 0.68 };
      const server: Point = { x: width * 0.87, y: height * 0.68 };
      const relay: Point = { x: width * 0.5, y: height * 0.2 };
      const boundaryX = width * 0.685;
      const crossing: Point = { x: boundaryX, y: height * 0.68 };

      const relayPath: Point[] = [client, relay, server];
      const directPath: Point[] = [client, server];

      const relayActive = index >= 1;
      const punching = index === 2;
      const directActive = index === 3;

      /* ---- Customer network boundary ------------------------------ */
      const apertureHalf = directActive ? 16 * easeInOut(Math.min(1, progress * 3)) : 0;

      ctx.save();
      ctx.setLineDash([3, 5]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = palette.line;

      ctx.beginPath();
      ctx.moveTo(boundaryX, height * 0.05);
      ctx.lineTo(boundaryX, crossing.y - apertureHalf);
      ctx.moveTo(boundaryX, crossing.y + apertureHalf);
      ctx.lineTo(boundaryX, height * 0.95);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(boundaryX + 8, height * 0.08);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.font = '400 10px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillStyle = palette.inkFaint;
      ctx.fillText('customer network', 0, 0);
      ctx.fillText('no open ports', 0, 13);
      ctx.restore();

      /* ---- Relay path --------------------------------------------- */
      if (relayActive) {
        const fade = index === 3 ? 1 - easeInOut(Math.min(1, progress * 1.6)) : 1;

        ctx.save();
        ctx.globalAlpha = 0.25 + 0.55 * fade;
        ctx.setLineDash([5, 6]);
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = palette.relay;
        ctx.beginPath();
        ctx.moveTo(client.x, client.y);
        ctx.lineTo(relay.x, relay.y);
        ctx.lineTo(server.x, server.y);
        ctx.stroke();
        ctx.restore();

        if (fade > 0.15) {
          const packetCount = 3;
          for (let i = 0; i < packetCount; i += 1) {
            const t = ((elapsed / 2100 + i / packetCount) % 1 + 1) % 1;
            const position = pointOnPath(relayPath, t);
            ctx.save();
            ctx.globalAlpha = fade;
            drawPacket(position, palette.relay, 3, palette);
            ctx.restore();
          }
        }
      }

      /* ---- Discovery pulse ---------------------------------------- */
      if (index === 0) {
        const pulse = easeInOut(progress);
        ctx.save();
        ctx.globalAlpha = 0.45;
        ctx.setLineDash([2, 6]);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = palette.inkFaint;
        ctx.beginPath();
        ctx.moveTo(client.x, client.y);
        ctx.lineTo(
          client.x + (relay.x - client.x) * pulse,
          client.y + (relay.y - client.y) * pulse
        );
        ctx.stroke();
        ctx.restore();

        const ring = 10 + 26 * pulse;
        ctx.save();
        ctx.globalAlpha = 0.5 * (1 - pulse);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = palette.accent;
        ctx.beginPath();
        ctx.arc(client.x, client.y, ring, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      /* ---- Hole punch --------------------------------------------- */
      if (punching) {
        const t = easeInOut(progress);
        const meet = Math.min(1, t * 1.25);

        ctx.save();
        ctx.setLineDash([2, 4]);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = palette.accent;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(client.x, client.y);
        ctx.lineTo(client.x + (crossing.x - client.x) * meet, client.y);
        ctx.moveTo(server.x, server.y);
        ctx.lineTo(server.x - (server.x - crossing.x) * meet, server.y);
        ctx.stroke();
        ctx.restore();

        drawPacket(
          { x: client.x + (crossing.x - client.x) * meet, y: client.y },
          palette.accent,
          3.2,
          palette
        );
        drawPacket(
          { x: server.x - (server.x - crossing.x) * meet, y: server.y },
          palette.accent,
          3.2,
          palette
        );

        if (t > 0.78) {
          const burst = (t - 0.78) / 0.22;
          ctx.save();
          ctx.globalAlpha = 0.6 * (1 - burst);
          ctx.lineWidth = 1.4;
          ctx.strokeStyle = palette.accent;
          ctx.beginPath();
          ctx.arc(crossing.x, crossing.y, 6 + 30 * burst, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      /* ---- Direct path -------------------------------------------- */
      if (directActive) {
        const draw = easeInOut(Math.min(1, progress * 2.2));

        ctx.save();
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = palette.accent;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(client.x, client.y);
        ctx.lineTo(client.x + (server.x - client.x) * draw, client.y);
        ctx.stroke();
        ctx.restore();

        if (draw > 0.9) {
          const packetCount = 4;
          for (let i = 0; i < packetCount; i += 1) {
            const t = ((elapsed / 900 + i / packetCount) % 1 + 1) % 1;
            drawPacket(pointOnPath(directPath, t), palette.accent, 3.2, palette);
          }
        }

        /* Aperture brackets, so the gap in the boundary reads as deliberate. */
        ctx.save();
        ctx.globalAlpha = draw;
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = palette.accent;
        ctx.beginPath();
        ctx.moveTo(boundaryX - 4, crossing.y - apertureHalf);
        ctx.lineTo(boundaryX + 4, crossing.y - apertureHalf);
        ctx.moveTo(boundaryX - 4, crossing.y + apertureHalf);
        ctx.lineTo(boundaryX + 4, crossing.y + apertureHalf);
        ctx.stroke();
        ctx.restore();
      }

      /* ---- Nodes --------------------------------------------------- */
      drawNode(relay, 'relay', 'public', relayActive && !directActive, palette);
      drawNode(client, 'client', 'mobile / desktop', true, palette);
      drawNode(server, 'server', 'on-premises', true, palette);

      /* ---- Readout ------------------------------------------------- */
      setPhaseIndex((current) => (current === index ? current : index));


      if (!prefersReducedMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    resize();
    startRef.current = performance.now();

    const observer = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) render(performance.now());
    });
    observer.observe(wrapper);

    if (prefersReducedMotion) {
      render(performance.now());
    } else if (isVisible) {
      frame = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [prefersReducedMotion, isVisible, theme, replayKey]);

  const phase = PHASES[phaseIndex]!;

  return (
    <figure className={styles.figure}>
      <div ref={wrapperRef} className={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          role="img"
          aria-label="Diagram of a client reaching an on-premises server: it discovers the server through a public bootstrap node, routes through a circuit relay, then hole punches through NAT to a direct peer-to-peer connection."
        />
      </div>

      <figcaption className={styles.readout}>
        <ol className={styles.phases}>
          {PHASES.map((item, index) => (
            <li key={item.id}>
              <span
                className={cn(
                  styles.phase,
                  index === phaseIndex && styles.phaseActive,
                  index < phaseIndex && styles.phaseDone
                )}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ol>

        <p className={styles.caption} aria-live="polite">
          {phase.caption}
        </p>

        <div className={styles.footerRow}>
          <p className={styles.rtt}>
            <span className={styles.rttLabel}>connection path</span>
            <span className={styles.rttValue}>{phase.path}</span>
          </p>
          <button type="button" className={styles.replay} onClick={replay}>
            Replay
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
