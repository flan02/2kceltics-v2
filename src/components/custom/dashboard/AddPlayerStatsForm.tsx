'use client'
import LoadingButton from '@/components/reutilizable/LoadingButton'
import { useForm } from 'react-hook-form'

type Props = {}

const AddPlayerStatsForm = (props: Props) => {
  const form = useForm()
  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form
  return (
    <form className='w-full border rounded-lg border-slate-200 mb-16 p-16 b-16 space-y-8'>
      <div className="text-center">
        <LoadingButton type="submit" loading={isSubmitting}>
          Submit
        </LoadingButton>
      </div>
    </form>
  )
}

export default AddPlayerStatsForm