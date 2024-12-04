import type { Type } from "@/utils/types";

export default function Work({ style, ...rest }: Type<"svg">) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      preserveAspectRatio="xMidYMid meet"
      style={style}
      {...rest}
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M1990 4634 c-14 -2 -65 -9 -115 -15 -420 -53 -856 -265 -1189 -580
-348 -329 -574 -751 -662 -1234 -21 -118 -30 -470 -15 -591 57 -442 222 -849
471 -1158 68 -84 221 -233 305 -297 427 -324 896 -367 1250 -114 128 91 265
272 326 428 65 169 70 212 60 537 -5 143 15 205 84 269 50 46 77 59 147 70 44
7 154 -1 165 -13 3 -3 -26 -65 -64 -138 -233 -445 -315 -722 -250 -848 50 -99
147 -133 260 -90 161 61 465 360 822 808 l89 113 111 54 c133 65 217 126 309
226 153 165 230 344 243 564 l5 100 93 150 c52 83 127 206 167 275 l74 125 83
41 c181 90 313 283 350 514 16 95 13 282 -5 385 -20 118 -79 297 -104 320 -40
36 -74 24 -148 -51 -76 -78 -126 -106 -328 -183 -153 -57 -215 -87 -306 -148
-160 -106 -263 -283 -244 -421 l6 -44 -47 63 c-327 446 -813 749 -1373 855
-111 22 -171 27 -340 29 -113 2 -216 2 -230 -1z m15 -594 c196 -85 238 -350
78 -490 -85 -75 -217 -98 -314 -53 -60 27 -125 92 -152 152 -32 70 -30 180 5
246 77 146 239 207 383 145z m1146 -273 c184 -95 218 -331 69 -476 -139 -135
-380 -92 -464 82 -74 152 -16 320 135 396 89 45 172 44 260 -2z m1041 -372
c25 -19 75 -50 111 -68 l66 -32 -118 -190 c-344 -556 -694 -1046 -1052 -1470
-135 -160 -395 -432 -404 -423 -18 18 195 461 363 753 174 303 408 671 608
958 144 205 367 507 375 507 3 0 26 -16 51 -35z m-3098 -23 c239 -106 237
-438 -3 -545 -70 -31 -171 -28 -238 6 -111 57 -167 147 -167 267 -1 62 4 84
26 125 78 148 239 210 382 147z m-33 -1148 c57 -32 100 -80 130 -150 30 -67
24 -182 -14 -246 -58 -100 -150 -152 -267 -153 -65 0 -82 4 -129 30 -172 95
-214 318 -84 456 100 107 238 131 364 63z"
        />
      </g>
    </svg>
  );
}
