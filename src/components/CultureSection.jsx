import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { articles } from "../data/articles";
import { motion } from "framer-motion";

const CultureSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const containerRef = useRef(null);

  // 🔥 Variants iguais ao BrandAndFounders
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const fadeScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  // Atualiza quantidade por tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex =
    window.innerWidth < 768
      ? articles.length - 1
      : articles.length - itemsPerView;

  const scrollContainerByIndex = (index) => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;

    const scrollAmount =
      window.innerWidth < 768
        ? containerWidth * index
        : (containerWidth / itemsPerView) * index;

    containerRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.min(prev + 1, maxIndex);
      scrollContainerByIndex(newIndex);
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.max(prev - 1, 0);
      scrollContainerByIndex(newIndex);
      return newIndex;
    });
  };

  const goToSlide = (index) => {
    const newIndex = Math.min(index, maxIndex);
    setCurrentIndex(newIndex);
    scrollContainerByIndex(newIndex);
  };

  return (
    <section
      className="py-16"
      id="cultura"
      style={{ backgroundColor: "var(--abanic-cream)" }}
    >
      <div className="page-container">
        {/* 🔥 Header animado */}
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h1
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight font-space-grotesk-h1"
            style={{ color: "var(--abanic-gray-dark)" }}
          >
            ABANIC LIFE
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: "var(--abanic-gray)" }}
          >
            Acompanhe com a ABANIC as últimas novidades sobre cultura e
            tendências.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Arrows — só aparecem quando há mais conteúdo do que cabe na tela */}
          {maxIndex > 0 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl disabled:opacity-50 rounded-full w-12 h-12"
              >
                <ChevronLeft className="h-6 w-6 text-abanic-gray" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl disabled:opacity-50 rounded-full w-12 h-12"
              >
                <ChevronRight className="h-6 w-6 text-abanic-gray" />
              </Button>
            </>
          )}

          {/* Cards */}
          <div className="overflow-hidden" ref={containerRef}>
            <div className="flex">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  className="shrink-0 px-1.5"
                  variants={fadeScale}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: maxIndex > 0 ? index * 0.1 : 0 }}
                  style={{
                    width:
                      window.innerWidth < 768
                        ? "100%"
                        : `${100 / itemsPerView}%`,
                  }}
                >
                  <Card className="group overflow-hidden rounded-none shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                    <Link to={`/blog/${article.id}`} className="flex flex-col h-full">
                      <div className="relative w-full">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-white/90 text-abanic-gray text-xs font-medium px-2 py-1 rounded-full shadow">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-white flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-abanic-gray-dark mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-abanic-gray text-sm leading-relaxed line-clamp-2">
                          {article.description}
                        </p>
                        <div className="mt-auto pt-2">
                          <span className="text-orange-600 text-sm font-medium group-hover:text-orange-700 transition-colors">
                            Ler mais →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bullets */}
        {maxIndex > 0 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-orange-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default CultureSection;
