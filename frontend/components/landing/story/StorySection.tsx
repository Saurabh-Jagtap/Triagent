import { Container } from "../shared/Container";
import { StoryHeader } from "./StoryHeader";
import { StoryTimeline } from "./StoryTimeline";

export function StorySection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40">
      <Container>
        <StoryHeader />

        <StoryTimeline />
      </Container>
    </section>
  );
}