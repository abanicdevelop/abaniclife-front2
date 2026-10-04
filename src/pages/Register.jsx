import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/design-system/Button";
import { Card } from "../components/design-system/Card";
import { Input } from "../components/design-system/Input";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  pt: {
    title: "Crie sua conta",
    name: "Nome completo",
    email: "E-mail",
    password: "Senha",
    placeholderName: "Digite seu nome completo",
    placeholderEmail: "Digite seu e-mail",
    placeholderPassword: "Crie uma senha",
    submit: "Criar conta",
    submitting: "Criando conta...",
    hasAccount: "Já tem conta?",
    login: "Entrar",
    errorNameRequired: "Digite seu nome completo.",
    errorEmailRequired: "Digite seu e-mail.",
    errorEmailInvalid: "Digite um e-mail válido.",
    errorPasswordRequired: "Crie uma senha.",
    errorPasswordLength: "A senha precisa ter pelo menos 6 caracteres.",
    successToast: "Conta criada (prévia de interface — sem conta real ainda).",
  },
  en: {
    title: "Create your account",
    name: "Full name",
    email: "E-mail",
    password: "Password",
    placeholderName: "Type your full name",
    placeholderEmail: "Type your email",
    placeholderPassword: "Create a password",
    submit: "Sign up",
    submitting: "Creating account...",
    hasAccount: "Already have an account?",
    login: "Log in",
    errorNameRequired: "Enter your full name.",
    errorEmailRequired: "Enter your email.",
    errorEmailInvalid: "Enter a valid email.",
    errorPasswordRequired: "Create a password.",
    errorPasswordLength: "Password must be at least 6 characters.",
    successToast: "Account created (interface preview — no real account yet).",
  },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterPage = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", senha: "" });
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
    if (!formData.nome.trim()) nextErrors.nome = t.errorNameRequired;
    if (!formData.email) nextErrors.email = t.errorEmailRequired;
    else if (!EMAIL_REGEX.test(formData.email)) nextErrors.email = t.errorEmailInvalid;
    if (!formData.senha) nextErrors.senha = t.errorPasswordRequired;
    else if (formData.senha.length < 6) nextErrors.senha = t.errorPasswordLength;
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
            type="text"
            id="nome"
            name="nome"
            label={t.name}
            value={formData.nome}
            onChange={handleChange}
            placeholder={t.placeholderName}
            error={errors.nome}
          />

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
          {t.hasAccount}{" "}
          <Link to="/login" style={{ color: "var(--text-link)" }}>
            {t.login}
          </Link>
        </p>
      </Card>
    </section>
  );
};

export default RegisterPage;
