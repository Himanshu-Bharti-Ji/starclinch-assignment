import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadedHeading from "../ui/FadedHeading";
import { HERO_IMAGES, HERO_TITLES } from "../../utils/staticData";
gsap.registerPlugin(ScrollTrigger);

const HERO_ARROW = "/images/arrow.png";

const HeroSection = ({
  title = "Singer",
  images = HERO_IMAGES,
  scrollMultiplier = 1200,
  scrub = 1.6,
}) => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const imgCurrentRef = useRef(null);
  const imgNextRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const imgCur = imgCurrentRef.current;
    const imgNext = imgNextRef.current;
    const titleEl = titleRef.current;

    if (!section || !overlay || !imgCur || !imgNext || !titleEl) return;

    // images ko pehle load karwa raha hu
    images.forEach((s) => {
      const im = new Image();
      im.src = s;
    });

    // pichle scroll triggers clean kar raha hu
    ScrollTrigger.getAll().forEach((t) => t.kill());

    imgCur.src = images[0];
    imgNext.src = images[0];

    gsap.set(imgCur, { opacity: 1 });
    gsap.set(imgNext, { opacity: 0 });
    gsap.set(overlay, { yPercent: 140 });

    const totalEnd = `${(images.length - 1) * scrollMultiplier + 100}vh`;

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalEnd}`,
        scrub,
        pin: true,
        anticipatePin: 1,
      },
    });

    // animation timings yaha set kiye
    const coverDur = 0.5;
    const fadeDur = 0.18;
    const exitDur = 0.45;
    const exitY = -220;
    const resetY = 140;

    // images + title ka looped scroll animation
    for (let i = 1; i < images.length; i++) {
      // overlay upar se cover kar raha
      tl.to(overlay, { yPercent: 0, duration: coverDur });

      // title ka rotate + switch animation
      tl.call(() => {
        gsap.fromTo(
          titleEl,
          { rotate: 0, opacity: 1 },
          { rotate: -90, opacity: 0, duration: 0.25, ease: "power1.in" }
        );

        setTimeout(() => {
          titleEl.textContent = HERO_TITLES[i] || "";
          gsap.fromTo(
            titleEl,
            { rotate: 90, opacity: 0 },
            { rotate: 0, opacity: 1, duration: 0.25, ease: "power1.out" }
          );
        }, 250);
      });

      // next image set kar raha hu
      tl.call(() => {
        imgNext.src = images[i];
      });

      // next image fade in ho rahi
      tl.to(imgNext, {
        opacity: 1,
        duration: fadeDur,
        ease: "power1.out",
        onStart: () => {
          imgNext.style.zIndex = 35;
          imgCur.style.zIndex = 30;
        },
      });

      // ab current image ko next se replace kar diya
      tl.call(() => {
        imgCur.src = images[i];
        imgCur.style.opacity = "1";
        imgNext.style.opacity = "0";
      });

      // overlay ko upar bhej raha hu
      tl.to(overlay, {
        yPercent: exitY,
        duration: exitDur,
        ease: "power1.in",
      });

      // overlay ko neeche reset kar diya
      tl.set(overlay, { yPercent: resetY });

      tl.to({}, { duration: 0.01 });
    }

    // last me section ko upward scroll karwa raha
    tl.to(section, { yPercent: -100, duration: 0.8 });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [images, scrollMultiplier, scrub]);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="container mx-auto px-6 pl-60">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-30">
            {/* left side me image + animated title hai */}
            <div className="relative flex items-center justify-center">
              {/* yaha title rotate animation hota */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-64 z-[999]">
                <h1
                  ref={titleRef}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl 
                             font-light text-white leading-tight whitespace-nowrap"
                >
                  {title}
                </h1>
              </div>

              {/* main circular image area */}
              <div
                className="relative"
                style={{
                  height: "clamp(300px, 50vw, 761px)",
                  width: "clamp(300px, 50vw, 761px)",
                  padding: "clamp(6px, 1.2vw, 12px)",
                  borderRadius: "9999px",
                  background:
                    "linear-gradient(135deg, #F16633 0%, #FD2D7D 100%)",
                }}
              >
                <div className="rounded-full overflow-hidden relative w-full h-full">
                  {/* current image */}
                  <img
                    ref={imgCurrentRef}
                    src=""
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                  />

                  {/* next image fade-in wala */}
                  <img
                    ref={imgNextRef}
                    src=""
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-full opacity-0"
                  />

                  {/* scrolling overlay */}
                  <div
                    ref={overlayRef}
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "100%",
                      background:
                        "linear-gradient(180deg, rgba(253,45,125,0.95) 0%, rgba(241,102,51,0.9) 100%)",
                      zIndex: 60,
                      willChange: "transform",
                    }}
                  />

                  {/* light-dark gradient for depth */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-full"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0) 70%)",
                      zIndex: 50,
                    }}
                  />
                </div>
              </div>

              {/* arrow for little decoration */}
              <div
                className="absolute"
                style={{ bottom: -10, right: -25, rotate: "2deg" }}
              >
                <img src={HERO_ARROW} alt="Arrow" />
              </div>
            </div>

            {/* right side content same hi rakh raha */}
            <div className="lg:text-right">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-300">
                <FadedHeading
                  text="Choose from 100+ Categories"
                  fadedWords={["Choose", "from"]}
                  size="xl"
                  width="400px"
                />
              </div>

              <div className="pt-6 text-lg text-gray-400 max-w-lg">
                <a
                  href="#categories"
                  className="mt-12 text-4xl bg-linear-to-r from-[#FF8DB9] to-[#F86E42] 
                             bg-clip-text text-transparent hover:opacity-90"
                >
                  Explore all categories →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
