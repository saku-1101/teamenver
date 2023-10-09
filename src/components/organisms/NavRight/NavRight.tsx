import { TeamListButton } from '@/components/atoms/TeamListButton'
import { DropDown } from '@/components/molecules/DropDown/DropDown'
export const NavRight = ({
  current_team_id,
}: {
  current_team_id: string | undefined
}) => {
  return (
    <div className='flex space-x-4'>
      <TeamListButton current_team_id={current_team_id} />
      <DropDown />
    </div>
  )
}