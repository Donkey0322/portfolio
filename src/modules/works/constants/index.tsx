import Image from "next/image";

import type { HEX } from "@/utils/color/types";
import type { StaticImageData } from "next/image";
import type { CSSProperties } from "react";

import JoineeLogo from "@/assets/icons/Logo";
import ComebuyBackground from "@/assets/images/comebuy background.png";
import ComebuyLogo from "@/assets/images/comebuy logo.png";
import JoineeBackground from "@/assets/images/joinee background.png";
import LogoshotBackground from "@/assets/images/logoshot background.png";
import LogoshotLogo from "@/assets/images/logoshot logo.png";

interface ProjectProps {
  backgroundColor: HEX;
  backgroundImage: StaticImageData;
  backgroundImageStyle?: CSSProperties;
  content: string;
  href: string;
  logo: JSX.Element;
  tags: string[];
  title: string;
}

export const projects: ProjectProps[] = [
  {
    backgroundColor: "#44279f",
    backgroundImage: JoineeBackground,
    content: "Want to find a partner for badminton? Jöinee, go on a journey!",
    href: "https://joinee-ee017.web.app/entry",
    logo: <JoineeLogo fontSize={50} />,
    tags: ["Web", "Typescript", "Vite", "Google Map API"],
    title: "Jöinee",
  },
  {
    backgroundColor: "#2c7594",
    backgroundImage: LogoshotBackground,
    backgroundImageStyle: {
      transform: "translateX(25%)",
      bottom: 0,
      height: "75%",
      borderLeft: "white solid 10px",
      borderTop: "white solid 10px",
      borderRadius: 0,
      borderTopLeftRadius: 10,
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
    tags: ["Mobile", "React Native", "Expo SDK"],
    title: "Logoshot",
  },
  {
    backgroundColor: "#A00F16",
    backgroundImage: ComebuyBackground,
    backgroundImageStyle: {
      right: 10,
      bottom: 10,
      height: "75%",
    },
    content: "Want to find a partner for badminton? Jöinee, go on a journey!",
    href: "https://come-buy.vercel.app/",
    logo: <Image src={ComebuyLogo} alt="Comebuy logo" width={50} height={50} />,
    tags: ["Web", "Typescript", "Vite", "Google Map API"],
    title: "Comebuy",
  },
];
