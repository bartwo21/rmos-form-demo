import { z } from "zod"

export const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  birthDate: z.date(),
  country: z.string(),
  city: z.string(),
  address: z.string(),
  postalCode: z.string(),

  gender: z.enum(["male", "female", "other"], {
    required_error: "Cinsiyet seçiniz",
  }),
  hobbies: z.array(z.string()),

  password: z.string(),
  confirmPassword: z.string(),

  profilePhoto: z.string(),
  biography: z.string(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string(),
  })),

  kvkkConsent: z.boolean(),
  marketingConsent: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
})

export type FormData = z.infer<typeof formSchema>

export const countries = [
  { value: "tr", label: "Türkiye" },
  { value: "us", label: "Amerika Birleşik Devletleri" },
  { value: "de", label: "Almanya" },
  { value: "fr", label: "Fransa" },
  { value: "gb", label: "İngiltere" },
]

export const cities = {
  tr: [
    { value: "istanbul", label: "İstanbul" },
    { value: "ankara", label: "Ankara" },
    { value: "izmir", label: "İzmir" },
    { value: "bursa", label: "Bursa" },
    { value: "antalya", label: "Antalya" },
  ],
  us: [
    { value: "new-york", label: "New York" },
    { value: "los-angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
  ],
  de: [
    { value: "berlin", label: "Berlin" },
    { value: "munich", label: "Munich" },
    { value: "hamburg", label: "Hamburg" },
  ],
  fr: [
    { value: "paris", label: "Paris" },
    { value: "marseille", label: "Marseille" },
    { value: "lyon", label: "Lyon" },
  ],
  gb: [
    { value: "london", label: "London" },
    { value: "manchester", label: "Manchester" },
    { value: "birmingham", label: "Birmingham" },
  ],
}

export const hobbies = [
  { value: "reading", label: "Okuma" },
  { value: "sports", label: "Spor" },
  { value: "music", label: "Müzik" },
  { value: "travel", label: "Seyahat" },
  { value: "cooking", label: "Yemek Yapma" },
  { value: "gaming", label: "Oyun" },
  { value: "photography", label: "Fotoğrafçılık" },
  { value: "art", label: "Sanat" },
]

export const socialPlatforms = [
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
] 