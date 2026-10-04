import React from "react";
import { motion } from "framer-motion";

const BreadText = () => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mt-40 text-[36px] leading-normal max-w-7xl mx-auto mb-28 font-space-grotesk-h1 text-center px-4 sm:px-6 lg:px-8"
      style={{ color: "var(--abanic-gray)" }}
    >
      COM FÓRMULAS LEVES E CONCENTRADAS EM ATIVOS A LINHA{" "}
      <b style={{ color: "var(--abanic-gray-dark)" }}>RHADYANCE</b> REÚNE OS
      PASSOS ESSENCIAIS PARA SUA ROTINA DE AUTOCUIDADO.
    </motion.p>
  );
};

export default BreadText;
