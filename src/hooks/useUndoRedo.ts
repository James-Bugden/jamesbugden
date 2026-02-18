import { useState, useCallback, useRef } from "react";

export function useUndoRedo<T>(initial: T, maxHistory = 50) {
  const [state, setState] = useState<T>(initial);
  const pastRef = useRef<T[]>([]);
  const futureRef = useRef<T[]>([]);

  const set = useCallback((next: T | ((prev: T) => T)) => {
    setState((prev) => {
      const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      pastRef.current = [...pastRef.current.slice(-(maxHistory - 1)), prev];
      futureRef.current = [];
      return resolved;
    });
  }, [maxHistory]);

  const undo = useCallback(() => {
    setState((prev) => {
      if (pastRef.current.length === 0) return prev;
      const previous = pastRef.current[pastRef.current.length - 1];
      pastRef.current = pastRef.current.slice(0, -1);
      futureRef.current = [prev, ...futureRef.current];
      return previous;
    });
  }, []);

  const redo = useCallback(() => {
    setState((prev) => {
      if (futureRef.current.length === 0) return prev;
      const next = futureRef.current[0];
      futureRef.current = futureRef.current.slice(1);
      pastRef.current = [...pastRef.current, prev];
      return next;
    });
  }, []);

  const canUndo = pastRef.current.length > 0;
  const canRedo = futureRef.current.length > 0;

  return { state, set, undo, redo, canUndo, canRedo, setState };
}
