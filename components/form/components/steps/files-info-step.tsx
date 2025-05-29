"use client"

import { UseFormReturn, useFieldArray } from "react-hook-form"
import { FormData } from "@/lib/form-schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Upload, Plus, Trash2, Camera } from "lucide-react"
import { useStepForm } from "@/components/form/hooks/use-multi-step-form"
import { steps, socialPlatforms } from "@/lib/constants"

interface IFilesInfoStepProps {
  form: UseFormReturn<FormData>
}

export function FilesInfoStep({ form }: IFilesInfoStepProps) {
  const { uploadedFile, handleFileUpload } = useStepForm(steps)
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
          <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dosya & Ek Bilgiler</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Profil fotoğrafı ve ek bilgilerinizi ekleyin</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
      <FormField
        control={form.control}
        name="profilePhoto"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Profil Fotoğrafı
            </FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="profile-photo"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Fotoğraf yüklemek için tıklayın</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG veya JPEG (MAX. 5MB)</p>
                    </div>
                    <input
                      id="profile-photo"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, form.setValue)}
                    />
                  </label>
                </div>
                {uploadedFile && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <Camera className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      Yüklendi: {uploadedFile}
                    </span>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="biography"
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
              Biyografi
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Kendinizi tanıtın, ilgi alanlarınız, deneyimleriniz hakkında bilgi verin..."
                className="min-h-[120px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-500 resize-none"
                {...field} 
              />
            </FormControl>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {field.value?.length || 0} karakter (minimum 10)
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
            Sosyal Medya Linkleri
          </FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ platform: "", url: "" })}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Link Ekle
          </Button>
        </div>
        
        {fields.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sosyal medya hesaplarınızı ekleyebilirsiniz (isteğe bağlı)
          </p>
        )}

        <div className="space-y-3">
          {fields.map((field, index) => (
            <Card key={field.id} className="border border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name={`socialLinks.${index}.platform`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Platform</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Platform seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {socialPlatforms.map((platform) => (
                                <SelectItem key={platform.value} value={platform.value}>
                                  {platform.label}
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
                      name={`socialLinks.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://..." 
                              {...field} 
                              className="h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="mt-6 p-2 h-10 w-10 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 