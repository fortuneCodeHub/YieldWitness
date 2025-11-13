import CategoryContent from '@/components/ui/CategoryContent'

export const metadata = {
    title: "Personal Finance Posts",
}

export default function PersonalFinance() {

  return (
    <>
        <CategoryContent
            category='finance'
            name="Personal Finance"
        />
    </>
  )
}

