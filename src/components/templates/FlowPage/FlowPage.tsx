'use client'
import { useEffect } from 'react'

import { Flow } from '@/components/molecules/Flow'
import { FlowPane } from '@/components/molecules/FlowPane'

import { settingsStore } from '@/libs/state/store'

import { ReturnGetTeamBoardDetailType } from '@/services/server/GetTeamBoardDetail'

type FlowPageProps = {
  board_detail_id: string
  prevFirstNullKey: string | null
  teamBoardDetailWithoutTypename: ReturnGetTeamBoardDetailType['teamBoardDetailWithoutTypename']
  isAdmin: boolean
}
export const FlowPage = ({
  board_detail_id,
  prevFirstNullKey,
  teamBoardDetailWithoutTypename,
  isAdmin,
}: FlowPageProps) => {
  const updateSettings = settingsStore((s) => s.updateSettings)

  useEffect(() => {
    updateSettings(teamBoardDetailWithoutTypename)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full h-full grid grid-cols-5 gap-5'>
      <div className='col-span-4'>
        <Flow
          board_detail_id={board_detail_id}
          toFirstOneIndicator={prevFirstNullKey}
          isTeamBoard={true}
          board_detail={teamBoardDetailWithoutTypename}
          isAdminOfTheBoard={isAdmin}
        />
      </div>
      <div className='col-span-1'>
        <FlowPane isAdmin={isAdmin} />
      </div>
    </div>
  )
}
