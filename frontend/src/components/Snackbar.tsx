import { createContext, useContext, useState, useCallback, useRef } from 'react';

interface SnackbarCtx {
  show: (message: string, undoFn?: () => void) => void;
}

const SnackbarContext = createContext<SnackbarCtx>({ show: () => {} });

export function useSnackbar() {
  return useContext(SnackbarContext);
}

interface SnackbarState {
  message: string;
  visible: boolean;
  undoFn?: () => void;
}

let _show: ((msg: string, undo?: () => void) => void) | null = null;

export function showSnackbar(message: string, undoFn?: () => void) {
  _show?.(message, undoFn);
}

export default function Snackbar() {
  const [state, setState] = useState<SnackbarState>({ message: '', visible: false });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((message: string, undoFn?: () => void) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState({ message, visible: true, undoFn });
    timerRef.current = setTimeout(() => {
      setState((s) => ({ ...s, visible: false }));
    }, 4000);
  }, []);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setState((s) => ({ ...s, visible: false }));
  }, []);

  _show = show;

  return (
    <div id="jh-snackbar" className={`jh-snackbar${state.visible ? ' show' : ''}`}>
      <span className="jh-snackbar-message">{state.message}</span>
      {state.undoFn && (
        <button
          className="jh-snackbar-undo"
          onClick={() => {
            state.undoFn?.();
            hide();
          }}
        >
          UNDO
        </button>
      )}
      <button className="jh-snackbar-close" onClick={hide}>&times;</button>
    </div>
  );
}
