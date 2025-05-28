import { AddressInfoStep, PersonalInfoStep, PreferencesStep, SecurityStep, FilesInfoStep, AgreementsStep } from "@/containers";
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