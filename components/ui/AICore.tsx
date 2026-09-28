"use client";

import { useEffect, useRef } from "react";

// The hero's signature visual — a premium "AI product workspace" rather than
// an architecture diagram: a handful of real, independent product
// interfaces floating together (a knowledge-assistant chat, a document
// being processed, a small application), with a few tech tags scattered
// around them as metadata, not as a wiring diagram. Nothing here is
// connected by a line — the interfaces themselves tell the story.
export default function AICore() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const chatWrapRef = useRef<HTMLDivElement>(null);
  const invoiceWrapRef = useRef<HTMLDivElement>(null);
  const appWrapRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    // Touch devices and reduced-motion keep the calm, CSS-only idle motion
    // already baked into the cards below — no pointer tracking, no rAF
    // loop, nothing to clean up. This is also the whole "graceful static
    // fallback": the composition is already complete without any JS.
    if (reduceMotion || !canHover) return;

    const section = wrap.closest("section");
    let visible = false;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.1 });
    io.observe(wrap);

    const target = { dx: 0, dy: 0 };
    const smooth = { dx: 0, dy: 0 };
    let raf = 0;

    function handleMove(e: MouseEvent) {
      if (!visible) return;
      const rect = wrap!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Clamped so a cursor far from the visual still only produces the
      // small maximum movement described in the brief — never a large jump.
      target.dx = Math.max(-300, Math.min(300, e.clientX - cx));
      target.dy = Math.max(-300, Math.min(300, e.clientY - cy));
    }

    function handleLeave() {
      target.dx = 0;
      target.dy = 0;
    }

    function tick() {
      // Spring-like easing: each frame closes ~10% of the remaining gap,
      // so movement is smooth and trails the cursor rather than snapping.
      smooth.dx += (target.dx - smooth.dx) * 0.09;
      smooth.dy += (target.dy - smooth.dy) * 0.09;

      // Depth-only parallax (translate, never rotate) — extremely subtle,
      // and every layer moves at its own small factor so the composition
      // reads as physically layered without a single spinning or lurching
      // element. The focal chat card and the small app card (both
      // "foreground") drift a little more than the document tucked behind
      // them (background); the tags drift least of all.
      if (chatWrapRef.current) {
        chatWrapRef.current.style.transform = `translate(${(smooth.dx * 0.018).toFixed(2)}px, ${(smooth.dy * 0.018).toFixed(2)}px)`;
      }
      if (appWrapRef.current) {
        appWrapRef.current.style.transform = `translate(${(smooth.dx * 0.02).toFixed(2)}px, ${(smooth.dy * 0.02).toFixed(2)}px)`;
      }
      if (invoiceWrapRef.current) {
        invoiceWrapRef.current.style.transform = `translate(${(smooth.dx * 0.01).toFixed(2)}px, ${(smooth.dy * 0.01).toFixed(2)}px)`;
      }
      tagRefs.current.forEach((el, i) => {
        if (!el) return;
        const factor = 0.006 + i * 0.002;
        el.style.transform = `translate(${(smooth.dx * factor).toFixed(2)}px, ${(smooth.dy * factor).toFixed(2)}px)`;
      });

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", handleMove, { passive: true });
    section?.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      section?.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="ai-core-wrap" aria-hidden="true">
      <div className="ai-core-glow" />
      <div className="ai-core-scene">
        <span className="ai-core-particle particle-blue" style={{ top: "52%", left: "6%", animationDelay: "0s" }} />
        <span className="ai-core-particle particle-lavender" style={{ top: "6%", left: "58%", animationDelay: "1.4s" }} />
        <span className="ai-core-particle particle-sage" style={{ top: "78%", left: "48%", animationDelay: "2.6s" }} />

        {/* 2 — Document intelligence: a real invoice being processed,
            tucked behind the assistant as a quieter, blurred back layer. */}
        <div ref={invoiceWrapRef} className="ai-core-invoice-wrap" style={{ top: "0%", left: "0%" }}>
          <div className="ai-core-invoice">
            <div className="ai-core-invoice-head">
              <span className="ai-core-doc-fold" />
              <span className="ai-core-invoice-file">INVOICE.pdf</span>
            </div>
            <div className="ai-core-invoice-row">
              <span className="ai-core-invoice-label">Vendor</span>
              <span className="ai-core-invoice-value">Acme Co.</span>
            </div>
            <div className="ai-core-invoice-row">
              <span className="ai-core-invoice-label">Amount</span>
              <span className="ai-core-invoice-value">$1,240.00</span>
            </div>
            <div className="ai-core-invoice-row">
              <span className="ai-core-invoice-label">Date</span>
              <span className="ai-core-invoice-value">Mar 14</span>
            </div>
            <span className="ai-core-invoice-badge">&#10003; Processed</span>
          </div>
        </div>

        {/* 1 — AI knowledge assistant: the focal point, front and sharp. */}
        <div ref={chatWrapRef} className="ai-core-chat-wrap" style={{ top: "22%", left: "20%" }}>
          <div className="ai-core-chat">
            <div className="ai-core-chat-bar">
              <span className="ai-core-chat-dot" />
              <span className="ai-core-chat-title">Ask your knowledge base</span>
            </div>
            <div className="ai-core-chat-msg chat-user">
              <span className="ai-core-chat-text">What is our refund policy?</span>
            </div>
            <div className="ai-core-chat-msg chat-ai">
              <span className="ai-core-chat-text">Customers can request a refund within 30 days of purchase.</span>
            </div>
          </div>
        </div>

        {/* 3 — A small application card: structured, AI-powered, alive. */}
        <div ref={appWrapRef} className="ai-core-appcard-wrap" style={{ top: "62%", left: "62%" }}>
          <div className="ai-core-appcard">
            <span className="ai-core-appcard-bar" />
            <span className="ai-core-appcard-pill">Live</span>
            <div className="ai-core-appcard-row">
              <span className="ai-core-appcard-dot dot-blue" />
              <span className="ai-core-appcard-line" />
            </div>
            <div className="ai-core-appcard-row">
              <span className="ai-core-appcard-dot dot-sage" />
              <span className="ai-core-appcard-line short" />
            </div>
          </div>
        </div>

        {/* 4 — A few tech tags, scattered as metadata — never a wiring
            diagram, never connected to anything by a line. */}
        {[
          { label: "RAG", cls: "tag-blue", top: "0%", left: "78%" },
          { label: "LLM", cls: "tag-lavender", top: "88%", left: "2%" },
          { label: "Agents", cls: "tag-sage", top: "0%", left: "50%" },
          { label: "API", cls: "tag-peach", top: "92%", left: "68%" },
        ].map((tag, i) => (
          <span
            key={tag.label}
            ref={(el) => { tagRefs.current[i] = el; }}
            className="ai-core-tag-wrap"
            style={{ top: tag.top, left: tag.left }}
          >
            <span className={`ai-core-tag ${tag.cls}`}>{tag.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
