import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLabel } from "../design-system/SectionLabel";
import { necessidades } from "../../data/necessidades";
import { DURACAO } from "../../utils/motion";

// Navegação por necessidade da pele + convite para o teste "Encontre sua rotina"
const HomeNecessidades = () => (
  <section style={{ background: "var(--abanic-cream)" }}>
    <div className="page-container py-24">
      <SectionLabel meta="Teste de 1 minuto">Encontre sua rotina</SectionLabel>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
        <motion.div
          className="lg:col-span-5 flex flex-col"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: DURACAO } }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-light)",
              fontSize: "var(--size-display-3)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
              color: "var(--text-body)",
            }}
          >
            O que a sua pele pede hoje?
          </h2>
          <p
            style={{
              marginTop: "var(--space-4)",
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body)",
              lineHeight: "var(--leading-body)",
              color: "var(--text-muted)",
              maxWidth: "44ch",
            }}
          >
            Escolha uma necessidade ou responda três perguntas rápidas e veja a rotina RHADYANCE
            indicada para você.
          </p>
          <Link
            to="/encontre-sua-rotina"
            className="mt-8 inline-flex items-center justify-center transition-colors hover:bg-[var(--action-primary-bg-hover)]"
            style={{
              width: "fit-content",
              height: "48px",
              padding: "0 var(--space-6)",
              background: "var(--action-primary-bg)",
              color: "var(--action-primary-fg)",
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body-sm)",
              fontWeight: "var(--weight-medium)",
            }}
          >
            Fazer o teste
          </Link>
        </motion.div>

        <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {necessidades.map((n, i) => (
            <motion.li
              key={n.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: DURACAO, delay: i * 0.06 } }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link
                to={`/encontre-sua-rotina?necessidade=${n.slug}`}
                className="group flex flex-col justify-between h-full p-6 transition-colors hover:border-[var(--abanic-orange)]"
                style={{ border: "var(--border-hairline) solid var(--neutral-900)", minHeight: "140px" }}
              >
                <span
                  className="transition-colors group-hover:text-[var(--abanic-orange)]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--weight-light)",
                    fontSize: "var(--size-heading-3)",
                    color: "var(--text-body)",
                  }}
                >
                  {n.nome} →
                </span>
                <span
                  style={{
                    marginTop: "var(--space-3)",
                    fontFamily: "var(--font-text)",
                    fontSize: "var(--size-body-sm)",
                    lineHeight: "var(--leading-body)",
                    color: "var(--text-muted)",
                  }}
                >
                  {n.descricao}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default HomeNecessidades;
