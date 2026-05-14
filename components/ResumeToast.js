'use client';

import * as ToastPrimitive from '@radix-ui/react-toast';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const COLLAPSE_DELAY = 5000;
const SESSION_KEY = 'resumeToastShown';

function safeGetSession(key) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetSession(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch {}
}

function trackEvent(name, source) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, { source });
  }
}

export default function ResumeToast() {
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (pathname === '/resume') {
      return;
    }
    // Reading sessionStorage must happen after hydration (client-only API), so setState
    // inside this mount-only effect is intentional and not a derived-state anti-pattern.

    setPhase(safeGetSession(SESSION_KEY) ? 'collapsed' : 'expanded');
    // pathname intentionally omitted — only run once on mount for session initialization
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== 'expanded') {
      return;
    }
    const timer = setTimeout(() => {
      setPhase('collapsed');
      safeSetSession(SESSION_KEY, '1');
    }, COLLAPSE_DELAY);
    return () => clearTimeout(timer);
  }, [phase]);

  function navigateTo(eventName, source) {
    trackEvent(eventName, source);
    router.push('/resume');
  }

  if (pathname === '/resume' || phase === 'idle') {
    return null;
  }

  const motion2s = reducedMotion ? {} : { transition: { duration: 0.2 } };

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <AnimatePresence>
        {phase === 'expanded' && (
          <ToastPrimitive.Root
            key="resume-toast-expanded"
            open
            duration={Infinity}
            onOpenChange={(open) => {
              if (!open) {
                setPhase('collapsed');
                safeSetSession(SESSION_KEY, '1');
              }
            }}
            asChild
          >
            <motion.button
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? {} : { opacity: 0, y: 10 }}
              {...motion2s}
              onClick={() =>
                navigateTo('resume_prompt_click', 'expanded_prompt')
              }
              aria-label="Click to view Zak Gilliam's resume"
              className="bg-hover focus-visible:ring-cyan flex w-52 cursor-pointer flex-col items-start rounded-lg border border-[rgb(48,50,54)] px-4 py-3 text-left shadow-[0_4px_20px_rgb(0_0_0/30%)] focus:outline-none focus-visible:ring-2"
            >
              <ToastPrimitive.Title className="text-primary block text-sm leading-snug font-medium">
                View my resume
              </ToastPrimitive.Title>
              <ToastPrimitive.Description className="text-secondary mt-0.5 block text-xs leading-snug">
                Click to view Zak Gilliam&apos;s resume →
              </ToastPrimitive.Description>
            </motion.button>
          </ToastPrimitive.Root>
        )}
      </AnimatePresence>
      <ToastPrimitive.Viewport className="fixed right-5 bottom-5 z-50 flex flex-col gap-2 outline-none" />

      <AnimatePresence>
        {phase === 'collapsed' && (
          <motion.button
            key="resume-toast-collapsed"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
            {...motion2s}
            onClick={() => navigateTo('resume_icon_click', 'collapsed_icon')}
            aria-label="View Zak's resume"
            className="bg-hover focus-visible:ring-cyan fixed right-5 bottom-5 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[rgb(48,50,54)] shadow-[0_4px_20px_rgb(0_0_0/30%)] focus:outline-none focus-visible:ring-2"
          >
            <svg
              viewBox="0 0 32 32"
              className="h-5 w-5"
              aria-hidden="true"
              focusable="false"
              style={{ fill: 'oklch(0.961 0 0)' }}
            >
              <path d="M23.5117 7.42871L16.1641 20.9365H22.9736V25H8.5752L15.96 11.4922H9.26172V7.42871H23.5117Z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </ToastPrimitive.Provider>
  );
}
