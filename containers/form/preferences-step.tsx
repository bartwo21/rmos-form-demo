"use client"

import { UseFormReturn } from "react-hook-form"
import { FormData, hobbies } from "@/lib/form-schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, User2, Users2 } from "lucide-react"

interface PreferencesStepProps {
  form: UseFormReturn<FormData>
}

export function PreferencesStep({ form }: PreferencesStepProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
          <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tercihler</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Kişisel tercihlerinizi belirtin</p>
        </div>
      </div>

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <User2 className="h-4 w-4" />
              Cinsiyet *
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value="male" id="male" />
                  <label 
                    htmlFor="male" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    Erkek
                  </label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value="female" id="female" />
                  <label 
                    htmlFor="female" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    Kadın
                  </label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value="other" id="other" />
                  <label 
                    htmlFor="other" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    Diğer
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hobbies"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Users2 className="h-4 w-4" />
                Hobiler *
              </FormLabel>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">En az bir hobi seçiniz</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {hobbies.map((hobby) => (
                <FormField
                  key={hobby.value}
                  control={form.control}
                  name="hobbies"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={hobby.value}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full">
                            <Checkbox
                              id={hobby.value}
                              checked={field.value?.includes(hobby.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, hobby.value])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== hobby.value
                                      )
                                    )
                              }}
                            />
                            <label htmlFor={hobby.value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1">
                              {hobby.label}
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  )
} 