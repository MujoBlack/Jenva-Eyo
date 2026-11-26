/**
 * Text that GSAP SplitText animates. The visible copy is the one that gets
 * split into lines/words/chars and is hidden from assistive tech; a plain
 * screen-reader-only copy sits next to it, so the text is read once, whole.
 * Motion.tsx splits `.split-target` with `aria: "none"`.
 */
export default function SplitTarget({ children }: { children: string }) {
  return (
    <>
      <span className="split-target" aria-hidden="true">
        {children}
      </span>
      <span className="sr-only">{children}</span>
    </>
  );
}
