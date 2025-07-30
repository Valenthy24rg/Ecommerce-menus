import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre es requerido"),
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
    )
    .required("La contraseña es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Confirma tu contraseña"),
});

const Register = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (
    values: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    {
      setSubmitting,
      setFieldError,
    }: FormikHelpers<{
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  ) => {
    const result = await register({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (result.success) {
      setSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setFieldError("email", result.error || "Error al registrar");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">¡Registro exitoso!</strong>
            <span className="block sm:inline">
              {" "}
              Tu cuenta ha sido creada correctamente. Redirigiendo al login...
            </span>
          </div>
        )}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Regístrate para acceder a tu cuenta de postres
          </p>
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <Field
                    name="name"
                    type="text"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#c73a0f] focus:border-[#c73a0f] focus:z-10 sm:text-sm ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Nombre completo"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="email"
                    type="email"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#c73a0f] focus:border-[#c73a0f] focus:z-10 sm:text-sm ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    type="password"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#c73a0f] focus:border-[#c73a0f] focus:z-10 sm:text-sm ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Contraseña"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#c73a0f] focus:border-[#c73a0f] focus:z-10 sm:text-sm ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-500"
                    }`}
                    placeholder="Confirmar contraseña"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#c73a0f] hover:bg-[#a62d0c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c73a0f] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
                </button>
              </div>

              <div className="text-center">
                <Link to="/login" className="text-[#c73a0f] hover:underline">
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </Link>
              </div>

              <div className="text-center text-sm text-gray-600 bg-gray-100 p-4 rounded-md">
                <p className="font-semibold mb-2">Requisitos de contraseña:</p>
                <ul className="text-xs space-y-1">
                  <li>• Mínimo 6 caracteres</li>
                  <li>• Al menos una mayúscula</li>
                  <li>• Al menos una minúscula</li>
                  <li>• Al menos un número</li>
                </ul>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
