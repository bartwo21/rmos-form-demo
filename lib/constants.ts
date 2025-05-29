import { AddressInfoStep, PersonalInfoStep, PreferencesStep, SecurityStep, FilesInfoStep, AgreementsStep } from "@/components/form";
import { User, MapPin, Heart, Shield, FileText, FileCheck } from "lucide-react"
export const stepHeaders = [
  {
    icon: User,
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    title: "Kişisel Bilgiler",
    description: "Temel bilgilerinizi girin"
  },
  {
    icon: MapPin,
    iconBg: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    title: "Adres Bilgileri",
    description: "İletişim adresinizi girin"
  },
  {
    icon: Heart,
    iconBg: "bg-purple-100 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    title: "Tercihler",
    description: "Kişisel tercihlerinizi belirtin"
  },
  {
    icon: Shield,
    iconBg: "bg-red-100 dark:bg-red-900/20",
    iconColor: "text-red-600 dark:text-red-400",
    title: "Güvenlik",
    description: "Güvenli bir şifre oluşturun"
  },
  {
    icon: FileText,
    iconBg: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    title: "Dosya & Ek Bilgiler",
    description: "Profil fotoğrafı ve ek bilgilerinizi ekleyin"
  },
  {
    icon: FileCheck,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    title: "Anlaşmalar",
    description: "Son adım! Anlaşmaları onaylayın"
  }
]

export const defaultFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  postalCode: "",
  hobbies: [],
  password: "",
  confirmPassword: "",
  biography: "",
  socialLinks: [],
  kvkkConsent: false,
  marketingConsent: false,
}

export const steps = [
  {
    id: "personal",
    title: "Kişisel Bilgiler",
    description: "Temel bilgilerinizi girin",
    component: PersonalInfoStep,
  },
  {
    id: "address",
    title: "Adres Bilgileri",
    description: "İletişim adresinizi girin",
    component: AddressInfoStep,
  },
  {
    id: "preferences",
    title: "Tercihler",
    description: "Kişisel tercihlerinizi belirtin",
    component: PreferencesStep,
  },
  {
    id: "security",
    title: "Güvenlik",
    description: "Güvenli bir şifre oluşturun",
    component: SecurityStep,
  },
  {
    id: "files",
    title: "Dosya & Ek Bilgiler",
    description: "Ek bilgilerinizi ekleyin",
    component: FilesInfoStep,
  },
  {
    id: "agreements",
    title: "Anlaşmalar",
    description: "Anlaşmaları onaylayın",
    component: AgreementsStep,
  },
]


export const phoneRegex = new RegExp(
  /([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/
);

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

export const passwordRules = [
  {
    id: "minLength",
    label: "En az 8 karakter",
    regex: /.{8,}/,
    test: (password: string) => password.length >= 8
  },
  {
    id: "uppercase",
    label: "En az 1 büyük harf",
    regex: /[A-Z]/,
    test: (password: string) => /[A-Z]/.test(password)
  },
  {
    id: "lowercase",
    label: "En az 1 küçük harf",
    regex: /[a-z]/,
    test: (password: string) => /[a-z]/.test(password)
  },
  {
    id: "number",
    label: "En az 1 rakam",
    regex: /\d/,
    test: (password: string) => /\d/.test(password)
  },
  {
    id: "special",
    label: "En az 1 özel karakter",
    regex: /[@$!%*?&]/,
    test: (password: string) => /[@$!%*?&]/.test(password)
  }
];