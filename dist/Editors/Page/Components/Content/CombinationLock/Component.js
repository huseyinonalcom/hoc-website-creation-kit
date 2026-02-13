"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";
const DEFAULT_CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const BASE_HEIGHT = 28;
export default function CombinationLock({ sequences = ["Code", "Lock", "Sync"], interval = 3000, spinDuration = 1500, cycles = 1, scale = 1, activeSequence, className, }) {
    const charset = useMemo(() => {
        const base = DEFAULT_CHARSET.split("");
        const uniqueFromSeqs = Array.from(new Set(sequences.join("").split("")));
        return Array.from(new Set([...base, ...uniqueFromSeqs]));
    }, [sequences]);
    const maxLen = Math.max(...sequences.map((s) => s.length));
    const paddedSequences = useMemo(() => sequences.map((s) => s.padEnd(maxLen, " ")), [sequences, maxLen]);
    // We track the raw cumulative indices here
    const [targetIndices, setTargetIndices] = useState(() => paddedSequences[0].split("").map((ch) => charset.indexOf(ch)));
    const [internalIndex, setInternalIndex] = useState(0);
    // Function to calculate the next cumulative step
    const moveToSequence = useCallback((index) => {
        const nextWord = paddedSequences[index % paddedSequences.length];
        setTargetIndices((prev) => nextWord.split("").map((char, i) => {
            const charIndex = charset.indexOf(char);
            const currentPos = prev[i];
            const currentMod = currentPos % charset.length;
            let diff = charIndex - currentMod;
            // Always force forward motion (spinning "down")
            if (diff <= 0)
                diff += charset.length;
            return currentPos + diff + cycles * charset.length;
        }));
    }, [charset, cycles, paddedSequences]);
    // Effect for Manual Control: Watch the activeSequence prop
    useEffect(() => {
        if (activeSequence !== undefined) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            moveToSequence(activeSequence);
        }
    }, [activeSequence, moveToSequence]);
    // Effect for Auto-Cycling: Only runs if activeSequence is undefined
    useEffect(() => {
        if (activeSequence !== undefined)
            return;
        const timer = setTimeout(() => {
            const nextIndex = (internalIndex + 1) % paddedSequences.length;
            moveToSequence(nextIndex);
            setInternalIndex(nextIndex);
        }, interval + spinDuration);
        return () => clearTimeout(timer);
    }, [
        internalIndex,
        activeSequence,
        interval,
        spinDuration,
        paddedSequences,
        moveToSequence,
    ]);
    return (_jsx("div", { className: `inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-gray-100 p-2 shadow-inner dark:border-slate-700 dark:bg-slate-900 ${className}`, style: {
            transform: `scale(${scale})`,
            transformOrigin: "center center",
        }, children: targetIndices.map((targetIdx, i) => (_jsxs("div", { className: "relative w-7 overflow-hidden rounded-md border border-gray-400/30 bg-white shadow-sm dark:border-slate-600 dark:bg-slate-800", style: { height: BASE_HEIGHT }, children: [_jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 z-20 h-2 bg-gradient-to-b from-black/10 to-transparent dark:from-black/50" }), _jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 z-20 h-2 bg-gradient-to-t from-black/10 to-transparent dark:from-black/50" }), _jsx("div", { className: "pointer-events-none absolute inset-x-0 top-[40%] z-20 h-[20%] bg-white/20 dark:bg-white/5" }), _jsx("div", { className: "flex flex-col items-center justify-start transition-transform", style: {
                        transform: `translateY(-${targetIdx * BASE_HEIGHT}px)`,
                        transitionDuration: `${spinDuration}ms`,
                        transitionTimingFunction: "cubic-bezier(0.45, 0, 0.55, 1)",
                        transitionDelay: `${i * 80}ms`,
                    }, children: Array.from({
                        length: Math.ceil((targetIdx + charset.length) / charset.length) *
                            charset.length,
                    }).map((_, k) => (_jsx("div", { className: "flex items-center justify-center font-mono text-lg font-bold text-slate-700 dark:text-slate-200", style: { height: BASE_HEIGHT }, children: charset[k % charset.length] }, k))) })] }, i))) }));
}
//# sourceMappingURL=Component.js.map