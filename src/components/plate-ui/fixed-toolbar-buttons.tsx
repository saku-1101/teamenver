import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks'
import { useEditorReadOnly } from '@udecode/plate-common'
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font'
import { ListStyleType } from '@udecode/plate-indent-list'
import { ELEMENT_UL, ELEMENT_OL } from '@udecode/plate-list'
import { ELEMENT_IMAGE } from '@udecode/plate-media'
import React from 'react'

import { Icons, iconVariants } from '@/components/ui/icons'

import { AlignDropdownMenu } from './align-dropdown-menu'
import { ColorDropdownMenu } from './color-dropdown-menu'
import { EmojiDropdownMenu } from './emoji-dropdown-menu'
import { IndentListToolbarButton } from './indent-list-toolbar-button'
import { IndentToolbarButton } from './indent-toolbar-button'
import { InsertDropdownMenu } from './insert-dropdown-menu'
import { LineHeightDropdownMenu } from './line-height-dropdown-menu'
import { LinkToolbarButton } from './link-toolbar-button'
import { ListToolbarButton } from './list-toolbar-button'
import { MarkToolbarButton } from './mark-toolbar-button'
import { MediaToolbarButton } from './media-toolbar-button'
import { ModeDropdownMenu } from './mode-dropdown-menu'
import { OutdentToolbarButton } from './outdent-toolbar-button'
import { TableDropdownMenu } from './table-dropdown-menu'
import { ToolbarGroup } from './toolbar'
import { ToolbarDropdownMenu } from './toolbar-dropdown'
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu'

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly()

  return (
    <div className='w-full overflow-hidden'>
      <div
        className='flex flex-wrap'
        style={{
          transform: 'translateX(calc(-1px))',
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton tooltip='Bold (⌘+B)' nodeType={MARK_BOLD}>
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip='Italic (⌘+I)' nodeType={MARK_ITALIC}>
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip='Underline (⌘+U)' nodeType={MARK_UNDERLINE}>
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip='Strikethrough (⌘+⇧+M)'
                nodeType={MARK_STRIKETHROUGH}
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip='Code (⌘+E)' nodeType={MARK_CODE}>
                <Icons.code />
              </MarkToolbarButton>
              <>
                <ColorDropdownMenu nodeType={MARK_COLOR} tooltip='Text Color'>
                  <Icons.color className={iconVariants({ variant: 'toolbar' })} />
                </ColorDropdownMenu>
                <ColorDropdownMenu nodeType={MARK_BG_COLOR} tooltip='Highlight Color'>
                  <Icons.bg className={iconVariants({ variant: 'toolbar' })} />
                </ColorDropdownMenu>
              </>
            </ToolbarGroup>
            <ToolbarGroup>
              <AlignDropdownMenu />

              <LineHeightDropdownMenu />

              <>
                <IndentListToolbarButton nodeType={ListStyleType.Disc} />
                <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
              </>

              <>
                <ListToolbarButton nodeType={ELEMENT_UL} />
                <ListToolbarButton nodeType={ELEMENT_OL} />
              </>

              <>
                <OutdentToolbarButton />
                <IndentToolbarButton />
              </>
            </ToolbarGroup>
            <ToolbarGroup>
              <LinkToolbarButton />

              <MediaToolbarButton nodeType={ELEMENT_IMAGE} />

              <TableDropdownMenu />

              <EmojiDropdownMenu />
              <ToolbarDropdownMenu />
            </ToolbarGroup>
          </>
        )}

        <div className='grow' />

        <ToolbarGroup noSeparator>
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  )
}
