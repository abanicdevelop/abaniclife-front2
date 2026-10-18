import React from "react";
import { motion } from "framer-motion";
import { DURACAO } from "../utils/motion";

const BreadText = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: DURACAO, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mt-40 max-w-7xl mx-auto mb-28 text-center px-4 sm:px-6 lg:px-8"
    >
      <p className="text-[36px] leading-normal font-space-grotesk-h1" style={{ color: "var(--abanic-gray)" }}>
        TRÊS PASSOS, TODOS OS DIAS, PARA UMA PELE MAIS REVITALIZADA, HIDRATADA E LUMINOSA. NO CENTRO DA
        LINHA <b style={{ color: "var(--abanic-gray-dark)" }}>RHADYANCE</b>, A ALGA VERMELHA DO MAR BÁLTICO
        PRESENTE EM TODOS OS PASSOS.
      </p>
    </motion.div>
  );
};

export default BreadText;
