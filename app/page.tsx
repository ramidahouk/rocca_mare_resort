import Hero from "@/components/Hero";
import HomeCTA from "@/components/HomeCTA";
import HomeExperience from "@/components/HomeExperience";
import HomeGallery from "@/components/HomeGallery";
import HomeIntro from "@/components/HomeIntro";
import HomeRooms from "@/components/HomeRooms";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HomeIntro />
      <HomeRooms />
      <HomeExperience />
      <HomeGallery />
      <HomeCTA />
    </main>
  );
}
