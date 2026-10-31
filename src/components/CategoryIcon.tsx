import {
  IconCpu,
  IconDumbbell,
  IconHome,
  IconPaw,
  IconSparkles,
  IconTrending,
  IconWrench,
} from "@/components/icons";

export default function CategoryIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const cls = className ?? "h-6 w-6";
  switch (slug) {
    case "home-kitchen":
      return <IconHome className={cls} />;
    case "tech-smart-home":
      return <IconCpu className={cls} />;
    case "beauty-personal-care":
      return <IconSparkles className={cls} />;
    case "pet-supplies":
      return <IconPaw className={cls} />;
    case "sports-outdoors":
      return <IconDumbbell className={cls} />;
    case "tools-home-improvement":
      return <IconWrench className={cls} />;
    default:
      return <IconTrending className={cls} />;
  }
}
