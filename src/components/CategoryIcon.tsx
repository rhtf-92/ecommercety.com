import {
  IconBaby,
  IconBasket,
  IconBlocks,
  IconBook,
  IconBriefcase,
  IconCamera,
  IconCar,
  IconCpu,
  IconDumbbell,
  IconGamepad,
  IconHeartPulse,
  IconHome,
  IconLeaf,
  IconMusic,
  IconPaw,
  IconPhone,
  IconPlug,
  IconPrinter3D,
  IconShirt,
  IconSparkles,
  IconTrending,
  IconWatch,
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
    case "toys-games":
      return <IconBlocks className={cls} />;
    case "baby-products":
      return <IconBaby className={cls} />;
    case "fashion-accessories":
      return <IconShirt className={cls} />;
    case "automotive":
      return <IconCar className={cls} />;
    case "office-products":
      return <IconBriefcase className={cls} />;
    case "video-games":
      return <IconGamepad className={cls} />;
    case "health-household":
      return <IconHeartPulse className={cls} />;
    case "grocery-gourmet":
      return <IconBasket className={cls} />;
    case "books":
      return <IconBook className={cls} />;
    case "jewelry":
      return <IconSparkles className={cls} />;
    case "watches":
      return <IconWatch className={cls} />;
    case "musical-instruments":
      return <IconMusic className={cls} />;
    case "arts-crafts":
      return <IconSparkles className={cls} />;
    case "cell-phones-accessories":
      return <IconPhone className={cls} />;
    case "computers":
      return <IconCpu className={cls} />;
    case "garden":
      return <IconLeaf className={cls} />;
    case "luggage":
      return <IconBriefcase className={cls} />;
    case "appliances":
      return <IconPlug className={cls} />;
    case "cameras-photo":
      return <IconCamera className={cls} />;
    case "3d-printers":
      return <IconPrinter3D className={cls} />;
    default:
      return <IconTrending className={cls} />;
  }
}
