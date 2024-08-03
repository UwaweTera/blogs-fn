import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot be longer than 50 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});


export const createPostSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
    image: yup
      .mixed()
      .required("Image is required")
      .test("fileType", "Unsupported File Format", (value) => {
        return (
          value &&
          value[0] &&
          ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
        );
      }),
  });