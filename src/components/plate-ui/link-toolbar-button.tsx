import { useLinkToolbarButton, useLinkToolbarButtonState } from '@udecode/plate-link'
import React from 'react'

import { Icons } from '@/components/ui/icons'

import { ToolbarButton } from './toolbar'

export function LinkToolbarButton() {
  const state = useLinkToolbarButtonState()
  const { props } = useLinkToolbarButton(state)

  return (
    <ToolbarButton tooltip='Link' {...props}>
      <Icons.link />
    </ToolbarButton>
  )
}
