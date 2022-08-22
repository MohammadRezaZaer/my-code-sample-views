import { MutableRefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap'

//  const [q, ref] = useSelector();
export function useSelector() {
  const ref = useRef();
  const q = useMemo(() => gsap.utils.selector(ref), [ref]);
  return [q, ref];
}

//  const [refs, setRef] = useArrayRef();
function useArrayRef(): [MutableRefObject<any[]>, (ref: any) => void] {
  const refs = useRef<any[]>([]);
  refs.current = [];
  return [refs, (ref: any) => ref && refs.current.push(ref)];
}


// const [count, setCount, countRef] = useStateRef(5);

export function useStateRef(defaultValue) {
  const [state, setState] = useState(defaultValue);
  const ref = useRef(state);

  const dispatch = useCallback((value) => {
    ref.current = typeof value === "function" ? value(ref.current) : value;
    setState(ref.current);
  }, []);

  return [state, dispatch, ref];
}

// useIsomorphicLayoutEffect(() => {
//   gsap.from(box.current, { opacity: 0 });
// }, []);
export const useIsomorphicLayoutEffect = typeof window !== "undefined"
  ? useLayoutEffect
  : useEffect;