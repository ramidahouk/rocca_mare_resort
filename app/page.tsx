import Hero from "@/components/Hero";
import HomeExperience from "@/components/HomeExperience";
import HomeIntro from "@/components/HomeIntro";
import HomeRooms from "@/components/HomeRooms";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HomeIntro />
      <HomeRooms />
      <HomeExperience />
    </main>
  );
}
