"use client"

import { UseFormReturn } from "react-hook-form"
import { FormData } from "@/lib/form-schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Shield, Eye, EyeOff, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useStepForm } from "@/components/form/hooks/use-multi-step-form"
import { steps } from "@/lib/constants"
import { getPasswordChecks } from "../../helpers/password-validate"

interface SecurityStepProps {
  form: UseFormReturn<FormData>
}

export function SecurityStep({ form }: SecurityStepProps) {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useStepForm(steps)
  
  const password = form.watch("password") || ""
  const confirmPassword = form.watch("confirmPassword") || ""

  const checks = getPasswordChecks(password)
  const passwordsMatch = password && confirmPassword && password === confirmPassword

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Güvenlik</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Güvenli bir şifre oluşturun</p>
        </div>
      </div>

      
      <div className="flex items-start gap-3">
        <div className="w-1/2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Şifre *
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Güvenli bir şifre oluşturun" 
                    {...field} 
                    className="h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-red-500 focus:ring-red-500 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {password && (
          <div className="space-y-2 mt-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Şifre Güvenlik Kontrolü:</p>
            <div className="space-y-1">
              {checks.map((check, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {check.valid ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                  <span className={cn(
                    check.valid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>

      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Şifre Tekrar *
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Şifrenizi tekrar girin" 
                  {...field} 
                  className={cn(
                    "h-11 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-red-500 focus:ring-red-500 pr-10",
                    confirmPassword && !passwordsMatch && "border-red-500 focus:border-red-500",
                    confirmPassword && passwordsMatch && "border-green-500 focus:border-green-500"
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
            {confirmPassword && passwordsMatch && (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <Check className="h-4 w-4" />
                <span>Şifreler eşleşiyor</span>
              </div>
            )}
          </FormItem>
        )}
      />
      </div>
    </div>
  )
} 