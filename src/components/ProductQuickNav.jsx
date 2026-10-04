import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card } from "./design-system/Card";

const ProductQuickNav = ({ products }) => {
  const navigate = useNavigate();

  return (
    <section className="max-w-[1290px] mx-auto px-4 pb-10">
      {/* largura casada com a seção de Princípios Ativos acima (max-w-[1290px], não o --content-max
          padrão do design system) para as bordas continuarem alinhadas na mesma página */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <motion.button
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "block",
              width: "100%",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: index * 0.1 },
            }}
            viewport={{ once: true }}
          >
            <Card
              surface={product.corSurface}
              interactive
              padding="lg"
              footer={
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--weight-medium)",
                    fontSize: "var(--size-body)",
                  }}
                >
                  {index + 1}. {product.nomeCard}
                </span>
              }
              style={{ minHeight: "420px", justifyContent: "space-between" }}
            >
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={product.imagem}
                  alt={product.nomeCard}
                  className="max-h-[320px] object-contain"
                  style={{ width: "auto" }}
                />
              </div>
            </Card>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default ProductQuickNav;
