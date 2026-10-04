import React from "react";
import { motion } from "framer-motion";
import Produto from "../assets/produto.png";
import MulherCreme from "../assets/home/MulherCreme.jpg";
import CouplePicture from "../assets/Produtoladodireito.png";
import LinhaCompleta from "../assets/home/LinhaCompleta.png";

const MosaicoProdutos = () => {
  const products = [
    {
      id: 1,
      name: "Linha RHADYANCE",
      brand: "Minimalist",
      image: LinhaCompleta,
    },
    {
      id: 2,
      name: "Hidratante com FPS75",
      brand: "Minimalist",
      image: CouplePicture,
    },
    {
      id: 3,
      name: "Hidratante com FPS75",
      brand: "Minimalist",
      image: MulherCreme,
    },
  ];

  return (
    <div className="py-12" style={{ backgroundColor: "var(--abanic-cream)" }}>
      <div className="max-w-7xl mx-auto w-full text-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 w-full">
          {/* Imagens de cima */}
          <div className="flex flex-col w-full gap-6">
            {products.slice(0, 2).map((product, index) => (
              <motion.div
                key={product.id}
                className="w-full h-[280px] sm:h-80 md:h-[380px] lg:h-[480px] overflow-hidden rounded-xl"
                initial={{
                  opacity: 0,
                  x: index === 0 ? -100 : 100,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { duration: 0.8, ease: "easeOut" },
                }}
                viewport={{ once: true }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover lg:object-bottom lg:max-h-[480px] rounded-lg shadow-xl transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          {/* Card grande */}
          <motion.div
            className="relative w-full rounded-lg"
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.8, ease: "easeOut" },
            }}
            viewport={{ once: true }}
          >
            {/* Conteúdo interno */}
            <div
              className="
        flex flex-col lg:flex-row 
        justify-between 
        items-center lg:items-start 
        w-full mx-auto 
        pt-2 pb-8 lg:pb-10 gap-0
      "
            >
              {/* Texto */}
              <motion.div
                className="
    flex flex-col justify-center 
    w-full lg:w-[60%] text-left
    px-0
    pt-4 lg:pt-12
  "
                initial={{ opacity: 0, x: -100, scale: 0.95 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { duration: 0.9, ease: "easeOut" },
                }}
                viewport={{ once: true }}
              >
                <p
                  className="text-base lg:text-[22px] leading-loose lg:pt-0 lg:pr-10"
                  style={{ color: "var(--abanic-gray)" }}
                >
                  <b style={{ color: "var(--abanic-gray-dark)" }}>
                    Três passos
                  </b>{" "}
                  essenciais que reúnem múltiplos benefícios para os cuidados
                  necessários com sua pele. Fórmulas desenvolvidas com ativos
                  naturais de alta performance, extraídos de{" "}
                  <b style={{ color: "var(--abanic-gray-dark)" }}>
                    algas vermelhas, flores de margaridas e esqualano vegetal,
                  </b>{" "}
                  reconhecidos por suas propriedades
                  <b style={{ color: "var(--abanic-gray-dark)" }}>
                    {" "}
                    antioxidantes, clareadoras e iluminadoras.
                  </b>{" "}
                  <br />
                  Além de ativos que promovem,
                  <b style={{ color: "var(--abanic-gray-dark)" }}>
                    {" "}
                    regeneração, equilíbrio da oleosidade e fortalecem a
                    barreira cutânea
                  </b>{" "}
                  contra agressões externas como poluição, luz visível e
                  radicais livres.
                </p>
              </motion.div>

              {/* Imagem */}
              <motion.div
                className="
          flex justify-center lg:justify-end 
          items-center 
          w-full lg:w-[50%] 
          mt-6 lg:mt-0
        "
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { duration: 0.9, ease: "easeOut" },
                }}
                viewport={{ once: true }}
              >
                <div className="relative w-full flex justify-center lg:justify-end">
                  <img
                    src={products[2].image}
                    alt={products[2].name}
                    className="
              w-full max-w-none
              lg:max-w-[520px]   /* ligeiramente menor em notebooks */
              lg:max-h-[480px]
              object-cover lg:object-contain
              transition-transform duration-500
              rounded-lg shadow-sm
            "
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MosaicoProdutos;
