import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/design-system/Button";
import { Card } from "../components/design-system/Card";
import { Input } from "../components/design-system/Input";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  pt: {
    title: "Faça seu login",
    email: "E-mail",
    password: "Senha",
    placeholderEmail: "Digite seu e-mail",
    placeholderPassword: "Digite sua senha",
    submit: "Entrar",
    submitting: "Entrando...",
    noAccount: "Não tem conta?",
    register: "Cadastre-se",
    errorEmailRequired: "Digite seu e-mail.",
    errorEmailInvalid: "Digite um e-mail válido.",
    errorPasswordRequired: "Digite sua senha.",
    successToast: "Login realizado (prévia de interface — sem conta real ainda).",
  },
  en: {
    title: "Log in",
    email: "E-mail",
    password: "Password",
    placeholderEmail: "Type your email",
    placeholderPassword: "Type your password",
    submit: "Sign in",
    submitting: "Signing in...",
    noAccount: "Don't have an account?",
    register: "Sign up",
    errorEmailRequired: "Enter your email.",
    errorEmailInvalid: "Enter a valid email.",
    errorPasswordRequired: "Enter your password.",
    successToast: "Logged in (interface preview — no real account yet).",
  },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { language } = useLanguage();
  const t = translations[language];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.email) nextErrors.email = t.errorEmailRequired;
    else if (!EMAIL_REGEX.test(formData.email)) nextErrors.email = t.errorEmailInvalid;
    if (!formData.senha) nextErrors.senha = t.errorPasswordRequired;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Sem backend de autenticação ainda — simula a chamada para validar a interface
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    toast.success(t.successToast);
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 mt-12"
      style={{ backgroundColor: "var(--abanic-cream)" }}
    >
      <Card surface="plain" padding="lg" style={{ width: "100%", maxWidth: "28rem", gap: "var(--space-5)" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-light)",
            fontSize: "var(--size-heading-1)",
            lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-heading)",
          }}
        >
          {t.title}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <Input
            type="email"
            id="email"
            name="email"
            label={t.email}
            value={formData.email}
            onChange={handleChange}
            placeholder={t.placeholderEmail}
            error={errors.email}
          />

          <Input
            type="password"
            id="senha"
            name="senha"
            label={t.password}
            value={formData.senha}
            onChange={handleChange}
            placeholder={t.placeholderPassword}
            error={errors.senha}
          />

          <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
            {isSubmitting ? t.submitting : t.submit}
          </Button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-text)",
            fontSize: "var(--size-body-sm)",
            color: "var(--text-muted)",
          }}
        >
          {t.noAccount}{" "}
          <Link to="/register" style={{ color: "var(--text-link)" }}>
            {t.register}
          </Link>
        </p>
      </Card>
    </section>
  );
};

export default LoginPage;
