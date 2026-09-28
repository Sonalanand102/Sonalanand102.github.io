import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

type Product = {
  name: string;
  description: string;
  contribution: string;
  tech: string[];
  liveUrl?: string;
  screenshotCount: number;
};

const PRODUCTS: Product[] = [
  {
    name: "Compatibility App",
    description:
      "A React Native app that walks users through a compatibility flow and shows a personality-archetype based result.",
    contribution:
      "Built end-to-end — UI, navigation, and API integration with a Node.js/Prisma backend.",
    tech: ["React Native", "TypeScript", "APIs", "Backend/Database"],
    screenshotCount: 3,
  },
];

/** Abstract phone-shaped placeholder — never a fake screenshot. */
function PhoneMockup({ variant = 0, front = false }: { variant?: number; front?: boolean }) {
  return (
    <div
      className={`flex aspect-[9/19.5] w-[126px] flex-none flex-col overflow-hidden rounded-[20px] border bg-paper sm:w-[148px] ${
        front ? "border-line-strong shadow-md" : "border-line shadow-sm"
      }`}
    >
      <div className="flex justify-center border-b border-line py-2">
        <span className="h-1.5 w-8 rounded-full bg-line-strong" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-2.5">
        <div className="h-2 w-3/5 rounded-full bg-line-strong" />
        <div className="mt-1 flex-1 rounded-md bg-paper-subtle" />
        {variant === 1 ? (
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-8 rounded bg-paper-subtle" />
            <div className="h-8 rounded bg-paper-subtle" />
          </div>
        ) : (
          <div className="h-2 w-4/5 rounded-full bg-line" />
        )}
        <div className="h-2 w-2/5 rounded-full bg-line" />
      </div>
      <div className="flex justify-around border-t border-line py-2.5">
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
      </div>
    </div>
  );
}

/**
 * A layered, slightly fanned composition of screenshots rather than a grid
 * of identical cards — reads as "a real product," not a placeholder gallery.
 * Purely CSS: each phone's base position comes in via custom properties,
 * and the whole stack gently un-fans further on hover.
 */
function PhoneStack({ count }: { count: number }) {
  const items = Array.from({ length: count });
  const mid = (count - 1) / 2;

  return (
    <div
      className="group/stack relative mx-auto flex h-[280px] w-full max-w-[340px] items-center justify-center sm:h-[320px]"
      style={{ perspective: "900px" }}
      aria-hidden="true"
    >
      {/* A soft, colorful shape behind the stack — the one "playful" touch
          the products section gets, per the brief. Restrained: one blurred
          blob, brand accents, well behind the phones themselves. */}
      <div
        className="absolute h-40 w-40 rounded-full bg-accent-coral/25 blur-2xl sm:h-48 sm:w-48"
        style={{ zIndex: 0 }}
      />
      <div
        className="absolute right-4 top-2 h-24 w-24 rounded-full bg-accent-warm/30 blur-2xl sm:h-28 sm:w-28"
        style={{ zIndex: 0 }}
      />
      {items.map((_, index) => {
        const offset = index - mid;
        const rotate = offset * 9;
        const translateX = offset * 58;
        const rotateY = offset * -6;
        const isFront = offset === 0;
        return (
          <div
            key={index}
            className="phone-stack-item absolute transition-transform duration-500 ease-signal [transform:translateX(var(--tx))_rotate(var(--rot))_rotateY(var(--ry))] group-hover/stack:[transform:translateX(var(--tx))_translateY(-10px)_rotate(var(--rot))_rotateY(0deg)]"
            style={{
              ["--tx" as string]: `${translateX}px`,
              ["--rot" as string]: `${rotate}deg`,
              ["--ry" as string]: `${rotateY}deg`,
              zIndex: 10 - Math.abs(offset),
            }}
          >
            <PhoneMockup variant={index} front={isFront} />
          </div>
        );
      })}
    </div>
  );
}

/** Small status pill — mirrors the one used in Selected Work for consistency. */
function StatusPill({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "signal" }) {
  const isSignal = tone === "signal";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] ${
        isSignal
          ? "border-signal/40 bg-signal-wash text-signal"
          : "border-line-strong text-ink-faint"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${isSignal ? "bg-signal" : "bg-ink-faint"}`}
      />
      {label}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <TiltCard
      maxTilt={1.5}
      className="grid grid-cols-1 gap-10 rounded-lg border border-line p-6 transition-colors duration-300 hover:border-line-strong sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-8 lg:p-10"
    >
      <PhoneStack count={product.screenshotCount} />

      <div className="flex min-w-0 flex-col justify-center">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-[26px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[28px]">
            {product.name}
          </h3>
          <StatusPill
            label={product.liveUrl ? "Live" : "Not published yet"}
            tone={product.liveUrl ? "signal" : "neutral"}
          />
        </div>
        <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-muted">
          {product.description}
        </p>

        <div className="mt-8 border-t border-line pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            My contribution
          </p>
          <p className="mt-2 max-w-[46ch] text-[14.5px] leading-relaxed text-ink-muted">
            {product.contribution}
          </p>
        </div>

        <p className="mt-6 text-[13px] leading-relaxed text-ink-faint">
          {product.tech.map((item, index) => (
            <span key={item} className="font-mono">
              {item}
              {index < product.tech.length - 1 && <span aria-hidden="true">{" · "}</span>}
            </span>
          ))}
        </p>

        {product.liveUrl && (
          <div className="mt-8">
            <a
              href={product.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-ink transition-colors duration-150 hover:text-signal"
            >
              Visit live app
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
          </div>
        )}
      </div>
    </TiltCard>
  );
}

function ComingSoonCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line-strong px-6 py-16 text-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
        More products shipping soon
      </span>
      <p className="max-w-[38ch] text-[14px] leading-relaxed text-ink-faint">
        This section grows as new React Native products go live.
      </p>
    </div>
  );
}

export default function ProductsShipped() {
  return (
    <section id="products" className="relative bg-surface-warm">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-28 lg:py-32">
        <Reveal>
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-ink-muted">
            <span className="text-signal" aria-hidden="true">&#9642;</span> Products
          </p>
          <h2 className="mt-5 max-w-[18ch] text-balance font-display text-[clamp(1.9rem,1.2rem+2.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-ink">
            Products I&rsquo;ve Shipped
          </h2>
          <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-muted">
            Beyond AI, I enjoy building complete products — from interfaces to APIs
            and deployment.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6 sm:mt-16">
          {PRODUCTS.map((product) => (
            <Reveal key={product.name}>
              <ProductCard product={product} />
            </Reveal>
          ))}
          <Reveal>
            <ComingSoonCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
