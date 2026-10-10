import { useParams, useNavigate } from "react-router-dom";
import { articles } from "../data/articles";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const articleIndex = articles.findIndex((a) => a.id === parseInt(id));
  const article = articles[articleIndex];

  useEffect(() => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const timeoutId = setTimeout(scrollToTop, 50);
    return () => clearTimeout(timeoutId);
  }, [id]);

  if (!article) {
    return <p>Artigo não encontrado.</p>;
  }

  const goToNext = () => {
    const nextIndex = (articleIndex + 1) % articles.length;
    navigate(`/blog/${articles[nextIndex].id}`);
  };

  const goToPrev = () => {
    const prevIndex = (articleIndex - 1 + articles.length) % articles.length;
    navigate(`/blog/${articles[prevIndex].id}`);
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-28">
      {/* Imagem flutuante com animação */}
      <motion.img
        key={`img-${id}`}
        src={article.image}
        alt={article.title}
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 lg:w-5/12 md:float-left md:mr-6 mb-6 object-contain shadow-lg"
      />

      {/* Conteúdo animado */}
      <motion.div
        key={`content-${id}`}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        className="text-left text-gray-800 text-[17px] md:text-[18px] leading-relaxed"
      >
        <p className="text-sm text-gray-500 mb-2">{article.category}</p>

        <h1 className="text-[28px] sm:text-[34px] md:text-[42px] font-bold text-gray-800 mb-5 leading-tight font-space-grotesk-h1">
          {article.title}
        </h1>

        {article.content.split("\n").map((p, i) => {
          if (p.trim() === "") return null;
          return (
            <p key={i} className="text-gray-700 mb-5 text-left">
              {p.trim()}
            </p>
          );
        })}
      </motion.div>

      {/* === SETAS DE NAVEGAÇÃO === */}
      {/* Mobile → fixa no meio da tela / Desktop → posicionamento lateral */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrev}
        className="fixed md:absolute left-3 md:left-[-60px] top-1/2 md:top-[180px] -translate-y-1/2 md:translate-y-0 
                   z-20 bg-black/10 hover:bg-black/20 text-gray-700 backdrop-blur-sm rounded-full 
                   w-10 h-10 md:w-12 md:h-12 transition-all"
        aria-label="Artigo anterior"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="fixed md:absolute right-3 md:right-[-60px] top-1/2 md:top-[180px] -translate-y-1/2 md:translate-y-0 
                   z-20 bg-black/10 hover:bg-black/20 text-gray-700 backdrop-blur-sm rounded-full 
                   w-10 h-10 md:w-12 md:h-12 transition-all"
        aria-label="Próximo artigo"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      {/* Indicador de número de artigo */}
      <div className="absolute bottom-6 right-6 text-gray-600 text-sm opacity-70">
        {articleIndex + 1} / {articles.length}
      </div>
    </div>
  );
};

export default BlogPostPage;
