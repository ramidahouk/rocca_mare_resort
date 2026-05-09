import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* Placeholder section that ends the hero — to be replaced with intro section */}
      <section
        style={{
          minHeight: "100vh",
          background: "#FAF7F2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p className="type-label" style={{ color: "#050A30" }}>
          Intro section — coming next
        </p>
      </section>
    </main>
  );
}
