import { FaJava, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiJavascript, SiTailwindcss, SiPython, SiGithub, SiMysql, SiDocker, SiMongodb, } from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Skills(){

  const skills = [
    { icon: <FaJava /> , name: "Java" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiJavascript />, name: "Javascript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiMysql />, name: "Mysql" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiGithub />, name: "Github" },
  ];

  const repeated = [...skills, ...skills];

  const [dir, setDir] = useState(-1); // direction of move (currently on left)
  const [active, setActive] = useState(false); // states the visibility of the skills section
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => { // for checking that section is visible or not on the screen
    const el = sectionRef.current;
    if(!el) return;

    const io = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
    }, {threshold: [0.1]})

    io.observe(el); 
    return () => io.disconnect();
  }, [])

  useEffect(() => { // states the direction of move by detacting scroll/move
    if(!active) return;

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);

    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if(touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY
    };

    window.addEventListener('wheel', onWheel, {passive: true});
    window.addEventListener('touchstart', onTouchStart, {passive: true});
    window.addEventListener('touchmove', onTouchMove, {passive: true});

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    }
  }, [active]);

  useEffect(() => { // for animation
    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last)/1000;
      last = now;
      let next = x.get() + SPEED*dt*dir;
      const loop = trackRef.current?.scrollWidth/2 || 0;

      if(loop){
        if(next <= -loop) next += loop;
        if(next >= 0) next -= loop;
      }
      x.set(next)
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id);
  }, [dir, x]);

  return (
    <section id="skills" ref={sectionRef}
    className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">
      <motion.h2 className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] to-[#00bf8f] z-10"
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay: 0.1}}
      viewport={{once:true, amount:0.4}}
      >
        My Skills
      </motion.h2>
      <motion.p className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
      initial={{opacity: 0, y: 10}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay: 0.1}}
      viewport={{once:true, amount:0.4}}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div className="realtive w-full overflow-hidden">
        <motion.div ref={trackRef}
        className="flex gap-10 text-6xl text-[#1cd8d2]"
        style={{x, whiteSpace: "nowrap", willChange: "transform"}}
        >
          {repeated.map((s,i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[120px]" aria-label={s.name} title={s.name}>
              <span className="hover:scale-125 transition-transform duration-300">
                {s.icon}
              </span>
              <p className="text-sm pt-3">
                {s.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}