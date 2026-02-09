import { useLocalStorageState } from '../../../hooks/useLocalStorageState';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

const MOTION_SETTINGS_KEY = 'valentine-motion-settings';
const MOTION_SETTINGS_VERSION = 1;

export function useMotionSettings() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { state: motionEnabled, setState: setMotionEnabled } = useLocalStorageState<boolean>(
    MOTION_SETTINGS_KEY,
    !prefersReducedMotion,
    MOTION_SETTINGS_VERSION
  );

  return {
    motionEnabled: motionEnabled && !prefersReducedMotion,
    setMotionEnabled: (value: boolean) => {
      setMotionEnabled(value);
    },
  };
}
