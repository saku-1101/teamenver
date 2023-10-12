import supabaseClient from '@/libs/supabase/supabaseClient'

import { getCheckedLibraries, WhichLibrary } from '@/services/client/GetCheckedLibraries'

const categories = [
  null,
  'framework',
  'css_library',
  'ui_library',
  'linter',
  'formatter',
  'lint_staged_husky',
  'hygen',
  'builder',
  'manager',
  'vscode',
  'volta',
  'isGit',
]

export const fetchData = async (
  prevCategory: string | null,
  board_detail_id: string,
  isTeamBoard: boolean,
) => {
  const prevCategoryId = categories.indexOf(prevCategory) // prevCategoryがframeworkの場合はcategoryIdを-1で返させたいため
  const nextCategory = categories[prevCategoryId + 1]

  if (nextCategory == 'framework') {
    // framework
    const get = async () => {
      try {
        const { data: frameworks, error } = await supabaseClient
          .from('frameworks')
          .select('name')
          .order('webframe_want_to_work_with_count', { ascending: false })
          .eq('ableToSetWithNode', true)
        return frameworks
      } catch (error) {
        console.log(error)
      }
    }

    const sidebarState = await get()
    return JSON.stringify({
      category: nextCategory,
      nodes: sidebarState,
    })
  } else if (nextCategory == 'css_library' || nextCategory == 'ui_library') {
    const nodes =
      (
        await getCheckedLibraries(
          nextCategory as WhichLibrary,
          board_detail_id,
          isTeamBoard,
        )
      )?.data || []
    const data = JSON.stringify({ category: nextCategory, nodes: nodes })
    return data
  } else {
    switch (nextCategory) {
      case 'builder':
        return JSON.stringify({
          category: nextCategory,
          nodes: [{ name: 'vite' }, { name: 'already using different builder' }],
        })
      case 'manager':
        return JSON.stringify({
          category: nextCategory,
          nodes: [{ name: 'npm' }, { name: 'yarn' }, { name: 'pnpm' }, { name: 'bun' }],
        })
      case 'isGit':
        return JSON.stringify({
          category: nextCategory,
          nodes: [{ name: 'true' }, { name: 'false' }],
        })
      default:
        return JSON.stringify({
          category: nextCategory,
          nodes: [{ name: 'yes' }, { name: 'no' }, { name: 'template' }],
        })
    }
  }
}
