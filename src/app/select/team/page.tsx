'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

import { Button } from '@/components/ui/button'

import * as GetJoinedTeamsApi from '@/api/get/joined_teams/route'

import { createTeamHandler } from '@/libs/actions/createTeamHandler'
import { handleSetCookies } from '@/libs/actions/handleSetCookies'

// million-ignore
export default function Join() {
  const { user, isLoading, error } = useUser()
  const router = useRouter()
  // fetch created teams and update the team_member of that if the user selects the team from select box

  // fetch the teams that the user already joined in and redirect them to the designated team page.
  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      return res.json()
    })

  const joined_teams = useSWR<GetJoinedTeamsApi.GetType>(
    `/api/get/joined_teams?user_id=${user?.sub}`,
    fetcher,
  ).data?.teams

  const handleSelectTeam = (
    team_id: string,
    boards: GetJoinedTeamsApi.GetType['teams'][0]['boards'][0],
  ) => {
    handleSetCookies(team_id, boards)
    router.push(`/dashboard/team/${team_id}`)
  }

  return (
    <main className={'p-[5%]'}>
      <p className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Hello, {user?.nickname}
      </p>
      <form action={createTeamHandler} method='POST'>
        <input type='text' name='name' placeholder='Input a team name' />
        <Button type='submit'>Crate Team</Button>
      </form>
      <div className='text-lg font-semibold'>
        or, you can join the team that you already joined in.
      </div>
      {joined_teams &&
        joined_teams?.map((team) => (
          <Button onClick={() => handleSelectTeam(team.id, team.boards[0])} key={team.id}>
            {team.name}
          </Button>
        ))}
    </main>
  )
}
