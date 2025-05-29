import { z } from "zod"
import { phoneRegex } from "./constants";
import { validatePassword } from "@/components/form/helpers/password-validate";


export const formSchema = z.object({
  firstName: z.string().min(1, { message: "Adınızı giriniz" }),
  lastName: z.string().min(1, { message: "Soyadınızı giriniz" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  phone: z
    .string()
    .min(1, { message: "Telefon numarası gereklidir" })
    .refine((value) => phoneRegex.test(value), {
      message: "Geçerli bir telefon numarası giriniz",
    }),
  birthDate: z.date({ message: "Doğum tarihi gereklidir" }),

  country: z.string().min(1, { message: "Ülke seçiniz" }),
  city: z.string().min(1, { message: "Şehir seçiniz" }),
  address: z.string(),
  postalCode: z.string(),

  gender: z.enum(["male", "female", "other"], {
    required_error: "Cinsiyet seçiniz",
  }),
  hobbies: z.array(z.string()),

  password: z
    .string()
    .min(1, { message: "Şifre gereklidir" })
    .refine((password) => validatePassword(password), {
      message: "",
    }),
  confirmPassword: z.string().min(1, { message: "Şifre tekrarı gereklidir" }),

  profilePhoto: z.string().optional(),
  biography: z.string(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string(),
  })),

  kvkkConsent: z.boolean(),
  marketingConsent: z.boolean(),
})

export type FormData = z.infer<typeof formSchema>

