import React, { useEffect, useRef, useState } from "react";

export type CombinationLockProps = {
  sequences?: string[]; // at least two strings (component will still work with 1)
  interval?: number; // ms to show a completed string before transitioning to next
  spinDuration?: number; // approximate duration (ms) of a single dial's spin
  cycles?: number; // how many full charset rotations each dial does (min 1)
  loop?: boolean; // repeat forever
  className?: string;
};

const DEFAULT_CHARSET =
  " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const ITEM_HEIGHT = 28; // px - visible height of each character cell

export default function CombinationLock({
  sequences = [],
  interval = 2000,
  spinDuration = 700,
  cycles = 1,
  loop = true,
  className,
}: CombinationLockProps) {
  // Ensure charset contains all characters that appear in the sequences
  const charsetArr = React.useMemo(() => {
    const base = DEFAULT_CHARSET.split("");
    const extras = Array.from(new Set(sequences.join("").split(""))).filter(
      (c) => !base.includes(c),
    );
    return base.concat(extras);
  }, [sequences]);

  const charsetLen = charsetArr.length;

  const maxLen = Math.max(...sequences.map((s) => s.length));
  const padded = sequences.map((s) => s.padEnd(maxLen, " "));

  // current displayed index into charset for each dial
  const [positions, setPositions] = useState<number[]>(() =>
    padded[0].split("").map((ch) => Math.max(0, charsetArr.indexOf(ch))),
  );

  const seqIndexRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const runningRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      // clear timers
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  // helper: spin a single dial from its current index to target index
  const spinDialTo = (dialIndex: number, targetCharIndex: number) => {
    return new Promise<void>((resolve) => {
      const startIndex = (() => {
        const cur = positions[dialIndex];
        return typeof cur === "number" && !Number.isNaN(cur) ? cur : 0;
      })();

      // distance forward in the charset (wrap allowed)
      const relativeDistance =
        (targetCharIndex - startIndex + charsetLen) % charsetLen;
      const totalSteps = relativeDistance + Math.max(1, cycles) * charsetLen;

      // calculate per-step delay so approx spinDuration is used
      const minTick = 12; // ms
      const tick = Math.max(
        minTick,
        Math.floor(spinDuration / Math.max(1, totalSteps)),
      );

      let step = 0;
      const runStep = () => {
        if (!mountedRef.current) return resolve();
        setPositions((prev) => {
          const copy = prev.slice();
          copy[dialIndex] = (copy[dialIndex] + 1) % charsetLen;
          return copy;
        });
        step += 1;
        if (step >= totalSteps) {
          window.setTimeout(resolve, 0);
          return;
        }
        const id = window.setTimeout(runStep, tick);
        timersRef.current.push(id);
      };

      // small stagger so dials don't all finish at exactly same frame (visual polish)
      const initialDelay = Math.floor(Math.random() * 80);
      const id0 = window.setTimeout(() => {
        timersRef.current.push(window.setTimeout(runStep, 0));
      }, initialDelay);
      timersRef.current.push(id0);
    });
  };

  // transition to next sequence (animated)
  const doTransitionTo = async (nextSeqIndex: number) => {
    if (!mountedRef.current) return;
    if (runningRef.current) return; // avoid overlapping
    runningRef.current = true;

    const target = padded[nextSeqIndex];
    const spins: Promise<void>[] = [];

    for (let i = 0; i < maxLen; i++) {
      const ch = target[i] ?? " ";
      const targetIndex = Math.max(0, charsetArr.indexOf(ch));
      spins.push(spinDialTo(i, targetIndex));
    }

    // wait for all dials to finish
    await Promise.all(spins);
    seqIndexRef.current = nextSeqIndex;
    runningRef.current = false;
  };

  // cycle through sequences on an interval
  useEffect(() => {
    if (sequences.length < 2) return undefined;
    let cancelled = false;

    const startCycle = async () => {
      while (
        !cancelled &&
        (loop || seqIndexRef.current < sequences.length - 1)
      ) {
        const next = (seqIndexRef.current + 1) % sequences.length;
        await doTransitionTo(next);
        if (cancelled) break;
        await new Promise((res) => {
          const id = window.setTimeout(res, interval);
          timersRef.current.push(id);
        });
      }
    };

    startCycle();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequences.join("|"), interval, spinDuration, cycles, loop]);

  if (!sequences || sequences.length === 0) {
    return <></>;
  }

  // show characters from charset at current positions
  return (
    <div
      className={className}
      aria-live="polite"
      style={{ display: "inline-flex", gap: 8, alignItems: "center" }}
    >
      {positions.map((pos, i) => (
        <div
          key={i}
          style={{
            width: ITEM_HEIGHT,
            height: ITEM_HEIGHT,
            overflow: "hidden",
            borderRadius: 6,
            background: "var(--bg, #fff)",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
            fontSize: 14,
            color: "var(--fg, #0f172a)",
          }}
          aria-hidden={false}
        >
          <div
            style={{
              transform: `translateY(-${pos * ITEM_HEIGHT}px)`,
              transition: `transform ${Math.max(100, spinDuration)}ms cubic-bezier(.22,1,.36,1)`,
            }}
          >
            {Array.from({ length: 64 })
              .map((_, n) => charsetArr[n % charsetLen])
              .map((ch, k) => (
                <div
                  key={k}
                  style={{
                    height: ITEM_HEIGHT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {ch}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
