import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FormData as FormDataType } from "@/lib/form-schema";
import { CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { countries, cities, hobbies, socialPlatforms } from "@/lib/constants";

function SubmittedDataDialog({
    isOpen,
    onClose,
    submittedData,
    handleNewForm,
    setShowSuccessDialog,
}: {
    isOpen: boolean;
    onClose: () => void;
    submittedData: FormDataType;
    handleNewForm: () => void;
    setShowSuccessDialog: (value: boolean) => void;
}) {
  const findLabel = (type: string, value: string, parent?: string) => {
    const sources: any = {
        country: countries,
        city: parent ? cities[parent as keyof typeof cities] : [],
        hobby: hobbies,
        platform: socialPlatforms
      };
    const label = sources[type].find((item: any) => item.value === value)?.label;
    return label;
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl min-w-1/2 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-6 h-6" />
              Form Başarıyla Gönderildi!
            </DialogTitle>
            <DialogDescription>
              Gönderdiğiniz bilgiler aşağıda görüntülenmektedir.
            </DialogDescription>
          </DialogHeader>
          
          {submittedData && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Kişisel Bilgiler</h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div><strong>Ad:</strong> {submittedData.firstName}</div>
                  <div><strong>Soyad:</strong> {submittedData.lastName}</div>
                  <div><strong>Email:</strong> {submittedData.email}</div>
                  <div><strong>Telefon:</strong> {submittedData.phone}</div>
                  <div><strong>Doğum Tarihi:</strong> {format(submittedData.birthDate, "dd MMMM yyyy", { locale: tr })}</div>
                  <div><strong>Cinsiyet:</strong> {submittedData.gender === 'male' ? 'Erkek' : submittedData.gender === 'female' ? 'Kadın' : 'Diğer'}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Adres Bilgileri</h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div><strong>Ülke:</strong> {findLabel('country', submittedData.country)}</div>
                  <div><strong>Şehir:</strong> {findLabel('city', submittedData.city, submittedData.country)}</div>
                  <div><strong>Adres:</strong> {submittedData.address || 'Belirtilmemiş'}</div>
                  <div><strong>Posta Kodu:</strong> {submittedData.postalCode || 'Belirtilmemiş'}</div>
                </div>
              </div>

              {submittedData.hobbies && submittedData.hobbies.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Hobiler</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {submittedData.hobbies.map((hobby, index) => (
                        <Badge key={index} variant="secondary">{findLabel('hobby', hobby)}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {submittedData.biography && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Biyografi</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm">{submittedData.biography}</p>
                  </div>
                </div>
              )}

              {submittedData.socialLinks && submittedData.socialLinks.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sosyal Medya</h3>
                  <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {submittedData.socialLinks.map((link, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium">{findLabel('platform', link.platform)}:</span>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {link.url}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Onaylar</h3>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${submittedData.kvkkConsent ? 'text-green-600' : 'text-red-600'}`} />
                      <span>KVKK Onayı</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${submittedData.marketingConsent ? 'text-green-600' : 'text-gray-400'}`} />
                      <span>Pazarlama Onayı</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleNewForm} className="flex-1">
                  Yeni Form Doldur
                </Button>
                <Button variant="outline" onClick={() => setShowSuccessDialog(false)}>
                  Kapat
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
  )
}

export default SubmittedDataDialog
