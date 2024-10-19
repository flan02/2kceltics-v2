import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { seasonTypes, teamTypes } from '@/lib/types'
import React from 'react'

type Props = {
  control: any
  pos: string
  conference: string
  types: string[]
}

const SelectSeed = ({ control, pos, conference, types }: Props) => {
  // console.log(conference, pos)
  return (
    <FormField

      control={control}
      name={`seed_${conference}_${pos}`}
      render={({ field }) => (
        <FormItem className="flex items-end">
          <FormLabel className="text-lg mr-2">seed {pos}:</FormLabel>
          <FormControl>
            <Select {...field} defaultValue=""
              onValueChange={(value) => field.onChange(value)}
              value={field.value}
            >
              <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[150px] w-[220px] rounded-md">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className='dark:bg-night-80 dark:text-gray-600 text-muted-foreground'>
                <SelectGroup className=''>
                  {types.map((type, index) => (
                    <SelectItem key={index} value={type} >{type}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SelectSeed