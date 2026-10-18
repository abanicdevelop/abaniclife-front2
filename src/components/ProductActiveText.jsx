import React from "react";
import { motion } from "framer-motion";
import { DURACAO } from "../utils/motion";

const ProductActive = () => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: DURACAO, ease: "easeOut" }}
      viewport={{ once: true }}
      className="
           mt-40
           text-[36px]
           leading-normal
           max-w-4xl
           mx-auto
           mb-28
           font-space-grotesk-h1
           text-center
           px-6           /* adiciona margem lateral no mobile */
           sm:px-8        /* um pouco mais em tablets */
           md:px-0        /* remove no desktop */
         "
      style={{ color: "var(--abanic-gray)" }}
    >
      LINHA DE CUIDADOS FACIAIS <b style={{ color: "var(--abanic-gray-dark)" }}>RHADYANCE</b>: ATIVOS
      ANTIOXIDANTES, QUE PROTEGEM A BARREIRA DA PELE, HIDRATAM E UNIFORMIZAM.{" "}
      <b style={{ color: "var(--abanic-gray-dark)" }}>CIÊNCIA</b> PARA REVELAR A SUA{" "}
      <b style={{ color: "var(--abanic-gray-dark)" }}>LUMINOSIDADE</b> NATURAL.
    </motion.p>
  );
};

export default ProductActive;
