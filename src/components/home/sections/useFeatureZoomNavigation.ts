"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type TransitionSession = {
  overlay: HTMLDivElement;
  animations: Animation[];
  previousOverflow: string;
  previousScrollBehavior: string | null;
  cancelled: boolean;
  navigating: boolean;
  destination: HTMLElement | null;
  previousDestinationVisibility: string;
};

function waitForDetailImage(featureId: string) {
  return new Promise<HTMLElement | null>((resolve) => {
    let observer: MutationObserver | null = null;
    const timeout = window.setTimeout(() => finish(null), 15000);

    function finish(element: HTMLElement | null) {
      observer?.disconnect();
      window.clearTimeout(timeout);
      resolve(element);
    }

    function check() {
      const element = document.querySelector<HTMLElement>(`[data-feature-detail-image="${featureId}"]`);
      if (element) finish(element);
    }

    observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    check();
  });
}

async function waitForImageToPaint(frame: HTMLElement) {
  const image = frame.querySelector("img");
  if (image && (!image.complete || !image.naturalWidth)) {
    await Promise.race([
      image.decode().catch(() => undefined),
      new Promise<void>((resolve) => window.setTimeout(resolve, 2000)),
    ]);
  }
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
  });
}

async function waitForDetailPageTop() {
  const deadline = performance.now() + 2500;
  while (window.scrollY > 1 && performance.now() < deadline) {
    await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
  }

  // Next normally positions the new route. This handles a delayed restoration
  // on a cached visit while the full-screen dashboard is still covering it.
  if (window.scrollY > 1) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
  });
}

export function useFeatureZoomNavigation() {
  const router = useRouter();
  const sessionRef = useRef<TransitionSession | null>(null);

  useEffect(() => {
    return () => {
      const session = sessionRef.current;
      if (!session) return;
      if (session.navigating) return;
      session.cancelled = true;
      session.animations.forEach((animation) => animation.cancel());
      if (session.destination) session.destination.style.visibility = session.previousDestinationVisibility;
      session.overlay.remove();
      document.body.style.overflow = session.previousOverflow;
      if (session.previousScrollBehavior !== null) {
        document.documentElement.style.scrollBehavior = session.previousScrollBehavior;
      }
      sessionRef.current = null;
    };
  }, []);

  const navigate = useCallback(
    async (href: string, frame: HTMLDivElement | null, image: HTMLImageElement | null) => {
      if (sessionRef.current) return;
      router.prefetch(href);

      if (
        !frame ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        typeof frame.animate !== "function"
      ) {
        router.push(href);
        return;
      }

      let readyImage = image ?? frame.querySelector("img");
      if (!readyImage) {
        await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
        readyImage = frame.querySelector("img");
      }
      if (readyImage && (!readyImage.complete || !readyImage.naturalWidth)) {
        await Promise.race([
          readyImage.decode().catch(() => undefined),
          new Promise<void>((resolve) => window.setTimeout(resolve, 4000)),
        ]);
      }
      if (sessionRef.current) return;
      if (!frame.isConnected || !readyImage?.isConnected || !readyImage.complete || !readyImage.naturalWidth) {
        router.push(href);
        return;
      }

      const rect = frame.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) {
        router.push(href);
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const original = {
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        borderRadius: getComputedStyle(frame).borderRadius || "18px",
      };
      const fullScreen = {
        left: "0px",
        top: "0px",
        width: `${viewportWidth}px`,
        height: `${viewportHeight}px`,
        borderRadius: "0px",
      };

      const overlay = document.createElement("div");
      Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        zIndex: "2147483647",
        overflow: "hidden",
        backgroundColor: "rgba(248, 248, 246, 0)",
        pointerEvents: "auto",
      });

      const viewport = document.createElement("div");
      Object.assign(viewport.style, {
        position: "absolute",
        ...original,
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 18px 50px rgba(20, 36, 28, 0.18)",
        willChange: "left, top, width, height, border-radius",
      });

      const imageCopy = document.createElement("img");
      imageCopy.src = readyImage.currentSrc || readyImage.src;
      imageCopy.alt = "";
      Object.assign(imageCopy.style, {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transformOrigin: "center center",
        willChange: "transform",
      });
      viewport.append(imageCopy);
      overlay.append(viewport);
      const preventScroll = (event: Event) => event.preventDefault();
      overlay.addEventListener("wheel", preventScroll, { passive: false });
      overlay.addEventListener("touchmove", preventScroll, { passive: false });
      document.body.append(overlay);

      const session: TransitionSession = {
        overlay,
        animations: [],
        previousOverflow: document.body.style.overflow,
        previousScrollBehavior: null,
        cancelled: false,
        navigating: false,
        destination: null,
        previousDestinationVisibility: "",
      };
      sessionRef.current = session;
      document.body.style.overflow = "hidden";

      try {
        const zoom = viewport.animate([original, fullScreen], {
          duration: 620,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          fill: "forwards",
        });
        const fadeIn = overlay.animate(
          [{ backgroundColor: "rgba(248, 248, 246, 0)" }, { backgroundColor: "rgba(248, 248, 246, 1)" }],
          { duration: 620, easing: "ease-out", fill: "forwards" },
        );
        session.animations.push(zoom, fadeIn);
        await Promise.all([zoom.finished, fadeIn.finished]);
        if (session.cancelled) return;

        const mobile = viewportWidth < 768;
        const scale = mobile ? 1.25 : 1.55;
        const x = viewportWidth * (mobile ? 0.09 : 0.17);
        const y = viewportHeight * (mobile ? 0.08 : 0.17);
        const pan = imageCopy.animate(
          [
            { transform: "translate3d(0, 0, 0) scale(1)", offset: 0 },
            { transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`, offset: 0.16 },
            { transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`, offset: 0.27 },
            { transform: `translate3d(${-x}px, ${y}px, 0) scale(${scale})`, offset: 0.43 },
            { transform: `translate3d(${-x}px, ${y}px, 0) scale(${scale})`, offset: 0.54 },
            { transform: `translate3d(${x * 0.25}px, ${-y}px, 0) scale(${scale})`, offset: 0.7 },
            { transform: `translate3d(${x * 0.25}px, ${-y}px, 0) scale(${scale})`, offset: 0.82 },
            { transform: "translate3d(0, 0, 0) scale(1)", offset: 1 },
          ],
          { duration: 2050, easing: "cubic-bezier(0.45, 0, 0.25, 1)", fill: "forwards" },
        );
        session.animations.push(pan);
        await pan.finished;
        if (session.cancelled) return;

        session.previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        session.navigating = true;
        router.push(href);

        const featureId = href.slice(href.lastIndexOf("/") + 1);
        const destination = await waitForDetailImage(featureId);
        if (!destination || session.cancelled) {
          const fadeAway = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 280,
            fill: "forwards",
          });
          session.animations.push(fadeAway);
          await fadeAway.finished;
          return;
        }

        await waitForImageToPaint(destination);
        await waitForDetailPageTop();
        const finalRect = destination.getBoundingClientRect();
        if (finalRect.top >= viewportHeight || finalRect.bottom <= 0) {
          const fadeAway = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 280,
            fill: "forwards",
          });
          session.animations.push(fadeAway);
          await fadeAway.finished;
          return;
        }

        session.destination = destination;
        session.previousDestinationVisibility = destination.style.visibility;
        destination.style.visibility = "hidden";
        const finalPosition = {
          left: `${finalRect.left}px`,
          top: `${finalRect.top}px`,
          width: `${finalRect.width}px`,
          height: `${finalRect.height}px`,
          borderRadius: getComputedStyle(destination).borderRadius || "18px",
        };

        const zoomOut = viewport.animate([fullScreen, finalPosition], {
          duration: 1000,
          easing: "cubic-bezier(0.65, 0, 0.2, 1)",
          fill: "forwards",
        });
        const fadeOut = overlay.animate(
          [
            { backgroundColor: "rgba(248, 248, 246, 1)", offset: 0 },
            { backgroundColor: "rgba(248, 248, 246, 1)", offset: 0.3 },
            { backgroundColor: "rgba(248, 248, 246, 0)", offset: 1 },
          ],
          { duration: 1000, easing: "ease-in", fill: "forwards" },
        );
        session.animations.push(zoomOut, fadeOut);
        await Promise.all([zoomOut.finished, fadeOut.finished]);
      } catch {
        if (!session.cancelled && !session.navigating) router.push(href);
      } finally {
        if (session.destination) session.destination.style.visibility = session.previousDestinationVisibility;
        overlay.remove();
        document.body.style.overflow = session.previousOverflow;
        if (session.previousScrollBehavior !== null) {
          document.documentElement.style.scrollBehavior = session.previousScrollBehavior;
        }
        if (sessionRef.current === session) sessionRef.current = null;
      }
    },
    [router],
  );

  return navigate;
}
