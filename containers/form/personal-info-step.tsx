"use client"

import { UseFormReturn } from "react-hook-form"
import { FormData } from "@/lib/form-schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useMultiStepForm } from "@/hooks/use-multi-step-form"
import { steps } from "@/lib/constants"

interface PersonalInfoStepProps {
  form: UseFormReturn<FormData>
}

export function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  const { getStepHeader } = useMultiStepForm(steps)
  const stepHeader = getStepHeader(0)
  const HeaderIcon = stepHeader.icon

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${stepHeader.iconBg}`}>
          <HeaderIcon className={`h-5 w-5 ${stepHeader.iconColor}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stepHeader.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{stepHeader.description}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-1/3">
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Ad *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Adınızı girin" 
                  {...field} 
                  className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-1/3">
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Soyad *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Soyadınızı girin" 
                  {...field} 
                  className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-1/3">
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email *
            </FormLabel>
            <FormControl>
              <Input 
                type="email"
                placeholder="ornek@email.com" 
                {...field} 
                className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      <div className="flex items-start gap-3">
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Telefon *
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="05XX XXX XX XX" 
                {...field} 
                className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="birthDate"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Doğum Tarihi *
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-11 w-full pl-3 text-left font-normal bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "dd MMMM yyyy", { locale: tr })
                    ) : (
                      <span>Doğum tarihinizi seçin</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                  locale={tr}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
    </div>
  )
} 