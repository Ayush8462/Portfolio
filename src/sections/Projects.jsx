import { motion } from "framer-motion";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";

const projects = [
  {
    title: "Trip Heaven - Travel with Comfort",
    desc: "Full-stack web application using REST APIs to list, browse, and manage accommodations with a smooth booking experience.",
    tags: ["MERN", "RESTful APIs"],
    image: img1,
    link: "https://trip-heaven-x0pi.onrender.com/listings",
  },
  {
    title: "Talk Buddy - Video Calling Web Application",
    desc: "Real-time video calling platform integrating ZegoCloud’s Prebuilt UI for high-quality group video communication.",
    tags: ["React", "ZegoCloud"],
    image: img2,
    link: "https://talkbuddy01.netlify.app/",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const projectVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? -120 : 120,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  },
};

export default function ProjectSection() {
  return (
    <section
      id="projects"
      className="w-full py-10 bg-black text-white overflow-hidden"
    >
      {/* Section Heading */}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] to-[#00bf8f]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>

      {/* Projects */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        className="max-w-7xl mx-auto px-6 space-y-28"
      >
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            custom={i}
            variants={projectVariants}
            whileHover={{ y: -6 }}
            tabIndex={0}
            role="article"
            className={`group grid grid-cols-1 md:grid-cols-2 gap-14 items-center ${
              i % 2 !== 0
                ? "md:[&>div:first-child]:order-2"
                : ""
            }`}
          >
            {/* Project Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Project Content */}
            <div>
              <span className="block text-sm font-mono text-blue-400 mb-4">
                0{i + 1}
              </span>

              <h3 className="text-3xl font-semibold mb-5">
                {project.title}
              </h3>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 font-medium hover:underline"
              >
                View Project →
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
