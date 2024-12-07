import Image from "next/image";

import type { HEX } from "@/utils/color/types";
import type { StaticImageData } from "next/image";
import type { CSSProperties } from "react";

import JoineeLogo from "@/assets/icons/Logo";
import ComebuyBackground from "@/assets/images/comebuy background.png";
import ComebuyLogo from "@/assets/images/comebuy logo.png";
import JoineeBackground from "@/assets/images/joinee background.png";
import LogoshotLogo from "@/assets/images/logoshot logo.png";

interface ImageSource {
  backgroundType: "image";
  backgroundSource: StaticImageData;
}

interface VideoSource {
  backgroundType: "video";
  backgroundSource: string;
}

type Source = VideoSource | ImageSource;

interface ProjectProps {
  backgroundColor: HEX;
  backgroundImageStyle?: CSSProperties;
  content: string;
  href: string;
  logo: JSX.Element;
  source: Source;
  tags: string[];
  title: string;
}

export const projects: ProjectProps[] = [
  {
    backgroundColor: "#44279f",
    backgroundImageStyle: {
      aspectRatio: `${JoineeBackground.width} / ${JoineeBackground.height}`,
    },
    content: "Want to find a partner for badminton? Jöinee, go on a journey!",
    href: "https://joinee-ee017.web.app/entry",
    logo: <JoineeLogo fontSize={50} />,
    source: { backgroundSource: JoineeBackground, backgroundType: "image" },
    tags: ["Web", "TypeScripts", "Vite", "Google Map API", "Framer Motion"],
    title: "Jöinee",
  },
  {
    backgroundColor: "#2c7594",
    backgroundImageStyle: {
      bottom: 0,
      height: "75%",
      borderLeft: "white solid 10px",
      borderTop: "white solid 10px",
      borderRadius: 0,
      borderTopLeftRadius: 10,
      aspectRatio: `16 / 9`,
    },
    content:
      "Spot trademarks instantly, protect your ideas, and unleash creativity with lightning-fast, AI-powered trademark recognition!",
    href: "https://github.com/LogoShot-IM/frontend",
    logo: (
      <Image
        src={LogoshotLogo}
        alt="logoshot logo"
        width={50}
        height={50}
        style={{ borderRadius: "10px" }}
      />
    ),
    source: { backgroundSource: "logoshot.mp4", backgroundType: "video" },
    tags: ["Mobile", "React Native", "Expo SDK", "IOS Development"],
    title: "Logoshot",
  },
  {
    backgroundColor: "#A00F16",
    backgroundImageStyle: {
      right: 10,
      bottom: 10,
      height: "75%",
      aspectRatio: `${ComebuyBackground.width} / ${ComebuyBackground.height}`,
    },
    content:
      "Academia-Industry collaboration with COMEBUY, a Taiwanese beverage company! Let's beautify our data visualization and facilitate the routine workflows!",
    href: "https://come-buy.vercel.app/",
    source: { backgroundSource: ComebuyBackground, backgroundType: "image" },
    logo: <Image src={ComebuyLogo} alt="Comebuy logo" width={50} height={50} />,
    tags: [
      "Web",
      "React",
      "JavaScripts",
      "Recharts.js",
      "Recursive Components",
    ],
    title: "COMEBUY",
  },
];
