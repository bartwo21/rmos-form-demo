"use client"

import { UseFormReturn } from "react-hook-form"
import { FormData } from "@/lib/form-schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, FileCheck } from "lucide-react"

interface AgreementsStepProps {
  form: UseFormReturn<FormData>
}

export function AgreementsStep({ form }: AgreementsStepProps) {
  const kvkkConsent = form.watch("kvkkConsent")
  const marketingConsent = form.watch("marketingConsent")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/20">
          <FileCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Anlaşmalar</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Son adım! Anlaşmaları onaylayın</p>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                KVKK Aydınlatma Metni ve Onay
              </CardTitle>
              <Badge variant="destructive" className="text-xs">
                Zorunlu
              </Badge>
            </div>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              Kişisel verilerinizin işlenmesi hakkında bilgilendirme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="kvkkConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                      KVKK Aydınlatma Metnini okudum, anladım ve kişisel verilerimin işlenmesini onaylıyorum. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                Pazarlama İzni
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
                İsteğe bağlı
              </Badge>
            </div>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              Kampanya ve yeniliklerden haberdar olmak için
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="marketingConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium mt-[1px] text-gray-700 dark:text-gray-300 cursor-pointer">
                      Pazarlama amaçlı iletişim kurulmasını ve kişiselleştirilmiş içerik almasını onaylıyorum.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 