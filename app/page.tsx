import { MultiStepForm } from "@/components/form/containers/multi-step-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full">
        <MultiStepForm />
      </div>
    </div>
  );
}
