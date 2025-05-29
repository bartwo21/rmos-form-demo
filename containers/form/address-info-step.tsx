"use client"

import { UseFormReturn } from "react-hook-form"
import { FormData } from "@/lib/form-schema"
import { countries } from "@/lib/constants"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin } from "lucide-react"
import { useMultiStepForm } from "@/hooks/use-multi-step-form"
import { steps } from "@/lib/constants"

interface AddressInfoStepProps {
  form: UseFormReturn<FormData>
}

export function AddressInfoStep({ form }: AddressInfoStepProps) {
  const { getAvailableCities } = useMultiStepForm(steps)
  const selectedCountry = form.watch("country")
  const availableCities = getAvailableCities(selectedCountry)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Adres Bilgileri</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">İletişim adresinizi girin</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-5">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Ülke *
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  form.setValue("city", "")
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-11 w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500">
                    <SelectValue placeholder="Ülke seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Şehir *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger 
                    className="h-11 w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500"
                    disabled={!selectedCountry}
                  >
                    <SelectValue placeholder={selectedCountry ? "Şehir seçin" : "Önce ülke seçin"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
        control={form.control}
        name="postalCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Posta Kodu
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="34000" 
                {...field} 
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500 max-w-xs"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Adres
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Detaylı adresinizi girin (mahalle, sokak, bina no vb.)" 
                className="min-h-[100px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500 resize-none"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  )
} 