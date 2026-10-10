import React from "react";
import { motion } from "framer-motion";

const ProductActive = () => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
      COM ATIVOS <b style={{ color: "var(--abanic-gray-dark)" }}>PRÓ-AGING,</b>{" "}
      <b style={{ color: "var(--abanic-gray-dark)" }}>HIDRATANTES</b> QUE
      REVELAM A{" "}
      <b style={{ color: "var(--abanic-gray-dark)" }}>LUMINOSIDADE</b> DA SUA
      PELE. DESENVOLVIDOS ATRAVÉS DA{" "}
      <b style={{ color: "var(--abanic-gray-dark)" }}>
        CIÊNCIA E SUSTENTABILIDADE.
      </b>
    </motion.p>
  );
};

export default ProductActive;
