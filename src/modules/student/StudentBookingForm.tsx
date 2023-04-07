import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import DatePicker from 'react-datepicker'
import { setHours, setMinutes } from 'date-fns'

import { api } from '@utils/api'
import { Button, FormInput, FormSelect, Input } from '@components/form'

type StudentBookingFormProps = {
  onCompleted: () => void
}

type StudentBookingFormFields = {
  description: string
  startDate: Date
  endDate: Date
  room: string
}

const StudentBookingForm = ({ onCompleted }: StudentBookingFormProps) => {
  const [submitText, setSubmitText] = useState('Submit booking request')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<StudentBookingFormFields>({ mode: 'onChange' })

  const utils = api.useContext()

  const addBooking = api.booking.add.useMutation({
    async onSuccess() {
      await utils.booking.invalidate()
    }
  })

  const { data: rooms } = api.room.getAll.useQuery()

  const { data: userData } = useSession()

  const onSubmit = handleSubmit(async (data) => {
    setSubmitText('Submitting...')
    await addBooking.mutateAsync({
      createdBy: userData?.user?.id,
      room: data.room,
      data
    })
    onCompleted()
  })

  const filterPassedTime = (time: any) => {
    const currentDate = new Date()
    const selectedDate = new Date(time)
    return currentDate.getTime() < selectedDate.getTime()
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4'>
      <FormSelect<StudentBookingFormFields>
        id='room'
        name='room'
        label='Room'
        register={register}
        rules={{ required: 'You must select a room.' }}
        errors={errors}
      >
        {rooms?.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </FormSelect>

      <FormInput<StudentBookingFormFields>
        id='description'
        name='description'
        label='Description'
        register={register}
        rules={{ required: 'You must enter a description.' }}
        errors={errors}
      />

      <div className='flex gap-4'>
        <Controller
          name='startDate'
          control={control}
          render={({ field }) => (
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-medium text-gray-700'>
                Start Date
              </label>
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                customInput={
                  <Input id='startDate' name='startDate' label='Start Date' />
                }
                showTimeSelect
                timeIntervals={15}
                dateFormat='MM/dd/yyyy h:mm aa'
                popperPlacement='top'
                minTime={setHours(setMinutes(new Date(), 0), 8)}
                maxTime={setHours(setMinutes(new Date(), 59), 23)}
                filterTime={filterPassedTime}
              />
            </div>
          )}
        />

        <Controller
          name='endDate'
          control={control}
          render={({ field }) => (
            <div className='flex flex-col gap-1'>
              <label className='block text-sm font-medium text-gray-700'>
                End Date
              </label>
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                customInput={
                  <Input id='endDate' name='endDate' label='End Date' />
                }
                showTimeSelect
                timeIntervals={15}
                dateFormat='MM/dd/yyyy h:mm aa'
                popperPlacement='top'
              />
            </div>
          )}
        />
      </div>

      <Button type='submit' disabled={!isDirty || !isValid}>
        {submitText}
      </Button>
    </form>
  )
}

export default StudentBookingForm
