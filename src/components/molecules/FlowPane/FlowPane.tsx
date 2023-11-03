'use client'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { selectSettingsStore } from '@/libs/state/selector'

import { Approvers } from '../../atoms/Approvers/Approvers'

export const FlowPane = () => {
  const settingsData = selectSettingsStore.use.settings()

  return (
    // ここでinputを変更することができてもそんなに費用対効果が高くない
    // dependenciesを測っていないもののinputを変更することは割と簡単そうなのでやる

    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Input</CardTitle>
        <CardDescription>You also can change the value from here.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='framework'>Framework</Label>
              <Select>
                <SelectTrigger id='framework'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent position='popper'>
                  <SelectItem value='next'>Next.js</SelectItem>
                  <SelectItem value='sveltekit'>SvelteKit</SelectItem>
                  <SelectItem value='astro'>Astro</SelectItem>
                  <SelectItem value='nuxt'>Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <p>{JSON.stringify(settingsData)}</p>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Approvers />
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}