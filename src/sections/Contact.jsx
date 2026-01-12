import { useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Astra from "../assets/Astra.png";
import { CiMail } from "react-icons/ci";
import { MdWavingHand } from "react-icons/md";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact(){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((p) => ({...p, [name] : value}));
    if(errors[name]) setErrors((p) => ({...p, [name] : ""}));
  }

  const validateForm = () => {
    const required = ["name", "email", "message"];
    const newErrors = {};
    required.forEach((f) => !formData[f].trim() && (newErrors[f] = "Required"));
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY,
      );
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS Error: ", err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white
    py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
      <ParticlesBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        <motion.div className="w-full md:w-1/2 flex justify-center"
        initial={{opacity: 0, x: -50}}
        whileInView={{opacity: 1, x: 0}}
        transition={{duration: 0.6}}
        >
          <motion.img src={Astra} alt="contact" 
          className="w-72 md:w-[560px] rounded-2xl shadow-lg object-cover"
          animate={{y: [0, -10, 0]}}
          transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
          />
        </motion.div>

        <motion.div className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
        initial={{opacity: 0, x: 50}}
        whileInView={{opacity: 1, x: 0}}
        transition={{duration: 0.6}}
        >
          <h2 className="flex items-center gap-3 text-4xl font-bold mb-2">
            Contact Me
            <CiMail className="text-5xl" />
          </h2>

          <p className="flex text-lg text-gray-400 mb-6 gap-2">
            Let's Work Together or Just Say Hii... <MdWavingHand className="text-2xl text-amber-300"/>
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="mb-1">Your Name <span className="text-red-500">*</span></label>
              <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${errors.name ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Your Email <span className="text-red-500">*</span></label>
              <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${errors.email ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Your Message <span className="text-red-500">*</span></label>
              <textarea name="message" rows={5} placeholder="Enter your Message" value={formData.message} onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${errors.message ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            {status && (
              <p className={`text-sm ${status === "success" ? "text-green-400" : status === "error" ? "text-red-400" : "text-yellow-400"}`}>
                {status === "sending" ? "Sending..." : status === "success" ? "Message sent successfully ✅" : "Something went wrong ❌"}
              </p>
            )}

            <motion.button className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition"
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            disabled={status === "sending"}
            type="submit"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}