import React from "react";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      type: "spring",
      stiffness: 50,
    },
  }),
};

const About = () => {
  const aboutTexts = [
    "Welcome to iNotebook, your personal note-taking application designed to help you organize your thoughts, ideas, and tasks efficiently.",
    "With iNotebook, you can create, edit, and delete notes seamlessly. Our intuitive interface ensures that you can focus on what matters most without any distractions.",
    "Secure user authentication with JWT tokens.",
    "Create, read, update, and delete your notes.",
    "Responsive design for use on any device.",
    "Easy navigation with a clean and simple UI.",
    "This application is built using the MERN stack:",
    "MongoDB: For storing your notes and user data securely.",
    "Express.js: Backend framework to handle API requests.",
    "React.js: Frontend library for building a dynamic user interface.",
    "Node.js: Server environment to run the backend.",
    "Sign up or log in to start managing your notes effectively. We hope you enjoy using iNotebook!",
  ];

  return (
    <motion.div
      className="container my-5"
      initial="hidden"
      animate="visible"
    >
      <h1 className="mb-4">About iNotebook</h1>
      {aboutTexts.map((text, index) => (
        <motion.p
          key={index}
          custom={index}
          variants={textVariants}
          className={index === 0 ? "lead" : ""}
        >
          {text}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default About;
