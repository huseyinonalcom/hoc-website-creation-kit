import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef, useState } from "react";
const DEFAULT_CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const ITEM_HEIGHT = 28; // px - visible height of each character cell
const fillEmptySequences = (seqs) => {
    const filled = [];
    for (let i = 0; i < seqs.length; i++) {
        if (seqs[i] && seqs[i].length > 0) {
            filled.push(seqs[i]);
        }
        else if (i > 0) {
            filled.push(filled[i - 1]);
        }
        else {
            filled.push("code");
        }
    }
    return filled;
};
export default function CombinationLock({ sequences = ["code", "lock"], interval = 2000, spinDuration = 700, cycles = 1, loop = true, className, }) {
    if (sequences.length == 1) {
        sequences.push(sequences[0]); // ensure at least 2 sequences for cycling logic
    }
    sequences = fillEmptySequences(sequences);
    // Ensure charset contains all characters that appear in the sequences
    const charsetArr = React.useMemo(() => {
        const base = DEFAULT_CHARSET.split("");
        const extras = Array.from(new Set(sequences.join("").split(""))).filter((c) => !base.includes(c));
        return base.concat(extras);
    }, [sequences]);
    const charsetLen = charsetArr.length;
    const maxLen = Math.max(...sequences.map((s) => s.length));
    const padded = sequences.map((s) => s.padEnd(maxLen, " "));
    // current displayed index into charset for each dial
    const [positions, setPositions] = useState(() => padded[0].split("").map((ch) => Math.max(0, charsetArr.indexOf(ch))));
    const seqIndexRef = useRef(0);
    const timersRef = useRef([]);
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
    const spinDialTo = (dialIndex, targetCharIndex) => {
        return new Promise((resolve) => {
            const startIndex = (() => {
                const cur = positions[dialIndex];
                return typeof cur === "number" && !Number.isNaN(cur) ? cur : 0;
            })();
            // distance forward in the charset (wrap allowed)
            const relativeDistance = (targetCharIndex - startIndex + charsetLen) % charsetLen;
            const totalSteps = relativeDistance + Math.max(1, cycles) * charsetLen;
            // calculate per-step delay so approx spinDuration is used
            const minTick = 12; // ms
            const tick = Math.max(minTick, Math.floor(spinDuration / Math.max(1, totalSteps)));
            let step = 0;
            const runStep = () => {
                if (!mountedRef.current)
                    return resolve();
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
    const doTransitionTo = async (nextSeqIndex) => {
        if (!mountedRef.current)
            return;
        if (runningRef.current)
            return; // avoid overlapping
        runningRef.current = true;
        const target = padded[nextSeqIndex];
        const spins = [];
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
        if (sequences.length < 2)
            return undefined;
        let cancelled = false;
        const startCycle = async () => {
            while (!cancelled &&
                (loop || seqIndexRef.current < sequences.length - 1)) {
                const next = (seqIndexRef.current + 1) % sequences.length;
                await doTransitionTo(next);
                if (cancelled)
                    break;
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
        return _jsx(_Fragment, {});
    }
    // show characters from charset at current positions
    return (_jsx("div", { className: className, "aria-live": "polite", style: { display: "inline-flex", gap: 8, alignItems: "center" }, children: positions.map((pos, i) => (_jsx("div", { style: {
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
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
                fontSize: 14,
                color: "var(--fg, #0f172a)",
            }, "aria-hidden": false, children: _jsx("div", { style: {
                    transform: `translateY(-${pos * ITEM_HEIGHT}px)`,
                    transition: `transform ${Math.max(100, spinDuration)}ms cubic-bezier(.22,1,.36,1)`,
                }, children: Array.from({ length: 64 })
                    .map((_, n) => charsetArr[n % charsetLen])
                    .map((ch, k) => (_jsx("div", { style: {
                        height: ITEM_HEIGHT,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }, children: ch }, k))) }) }, i))) }));
}
//# sourceMappingURL=Component.js.map