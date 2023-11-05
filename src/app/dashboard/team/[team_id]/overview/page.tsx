'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { createAlignPlugin } from '@udecode/plate-alignment'
import { createAutoformatPlugin } from '@udecode/plate-autoformat'
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
  createStrikethroughPlugin,
  MARK_STRIKETHROUGH,
  createCodePlugin,
  MARK_CODE,
  createSubscriptPlugin,
  MARK_SUBSCRIPT,
  createSuperscriptPlugin,
  MARK_SUPERSCRIPT,
} from '@udecode/plate-basic-marks'
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote'
import { createExitBreakPlugin, createSoftBreakPlugin } from '@udecode/plate-break'
import { createCaptionPlugin } from '@udecode/plate-caption'
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
} from '@udecode/plate-code-block'
import { createComboboxPlugin } from '@udecode/plate-combobox'
import {
  createCommentsPlugin,
  CommentsProvider,
  MARK_COMMENT,
} from '@udecode/plate-comments'
import {
  createPlugins,
  Plate,
  RenderAfterEditable,
  withProps,
  PlateLeaf,
  Value,
} from '@udecode/plate-common'
import { createDndPlugin } from '@udecode/plate-dnd'
import { createEmojiPlugin } from '@udecode/plate-emoji'
import { createExcalidrawPlugin, ELEMENT_EXCALIDRAW } from '@udecode/plate-excalidraw'
import {
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createFontSizePlugin,
} from '@udecode/plate-font'
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading'
import { createHighlightPlugin, MARK_HIGHLIGHT } from '@udecode/plate-highlight'
import { createHorizontalRulePlugin, ELEMENT_HR } from '@udecode/plate-horizontal-rule'
import { createIndentPlugin } from '@udecode/plate-indent'
import { createIndentListPlugin } from '@udecode/plate-indent-list'
import { createJuicePlugin } from '@udecode/plate-juice'
import { createKbdPlugin, MARK_KBD } from '@udecode/plate-kbd'
import { createLineHeightPlugin } from '@udecode/plate-line-height'
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link'
import { createTodoListPlugin, ELEMENT_TODO_LI } from '@udecode/plate-list'
import {
  createImagePlugin,
  ELEMENT_IMAGE,
  createMediaEmbedPlugin,
  ELEMENT_MEDIA_EMBED,
} from '@udecode/plate-media'
import {
  createMentionPlugin,
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
} from '@udecode/plate-mention'
import { createNodeIdPlugin } from '@udecode/plate-node-id'
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'
import { createResetNodePlugin } from '@udecode/plate-reset-node'
import { createSelectOnBackspacePlugin, createDeletePlugin } from '@udecode/plate-select'
import { createBlockSelectionPlugin } from '@udecode/plate-selection'
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv'
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx'
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md'
import { createTabbablePlugin } from '@udecode/plate-tabbable'
import {
  createTablePlugin,
  ELEMENT_TABLE,
  ELEMENT_TR,
  ELEMENT_TD,
  ELEMENT_TH,
} from '@udecode/plate-table'
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block'
import { useState, useTransition } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import useSWR from 'swr'

import { BlockquoteElement } from '@/components/plate-ui/blockquote-element'
import { Button } from '@/components/plate-ui/button'
import { CodeBlockElement } from '@/components/plate-ui/code-block-element'
import { CodeLeaf } from '@/components/plate-ui/code-leaf'
import { CodeLineElement } from '@/components/plate-ui/code-line-element'
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf'
import { CommentLeaf } from '@/components/plate-ui/comment-leaf'
import { CommentsPopover } from '@/components/plate-ui/comments-popover'
import { Editor } from '@/components/plate-ui/editor'
import { EmojiCombobox } from '@/components/plate-ui/emoji-combobox'
import { ExcalidrawElement } from '@/components/plate-ui/excalidraw-element'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
import { HeadingElement } from '@/components/plate-ui/heading-element'
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf'
import { HrElement } from '@/components/plate-ui/hr-element'
import { ImageElement } from '@/components/plate-ui/image-element'
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf'
import { LinkElement } from '@/components/plate-ui/link-element'
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar'
import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element'
import { MentionCombobox } from '@/components/plate-ui/mention-combobox'
import { MentionElement } from '@/components/plate-ui/mention-element'
import { MentionInputElement } from '@/components/plate-ui/mention-input-element'
import { ParagraphElement } from '@/components/plate-ui/paragraph-element'
import { withPlaceholders } from '@/components/plate-ui/placeholder'
import {
  TableCellElement,
  TableCellHeaderElement,
} from '@/components/plate-ui/table-cell-element'
import { TableElement } from '@/components/plate-ui/table-element'
import { TableRowElement } from '@/components/plate-ui/table-row-element'
import { TodoListElement } from '@/components/plate-ui/todo-list-element'
import { withDraggables } from '@/components/plate-ui/with-draggables'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'

import * as GetProjectOverviewApi from '@/api/get/overview/route'

import { handleProjectOverviewUpdate } from '@/libs/actions/handleProjectOverviewUpdate'
const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createImagePlugin(),
    createMediaEmbedPlugin(),
    createCaptionPlugin({
      options: {
        pluginKeys: [
          // ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
        ],
      },
    }),
    createMentionPlugin(),
    createTablePlugin(),
    createTodoListPlugin(),
    createExcalidrawPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
          ],
        },
      },
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
          ],
        },
      },
    }),
    createIndentListPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
          ],
        },
      },
    }),
    createLineHeightPlugin({
      inject: {
        props: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
          ],
        },
      },
    }),
    createComboboxPlugin(),
    createDndPlugin({
      options: { enableScroller: true },
    }),
    createEmojiPlugin({
      renderAfterEditable: EmojiCombobox,
    }),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: 'mod+enter',
          },
          {
            hotkey: 'mod+shift+enter',
            before: true,
          },
          {
            hotkey: 'enter',
            query: {
              start: true,
              end: true,
              // allow: KEYS_HEADING,
            },
            relative: true,
            level: 1,
          },
        ],
      },
    }),
    createNodeIdPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ],
      },
    }),
    createSelectOnBackspacePlugin({
      options: {
        query: {
          allow: [
            // ELEMENT_IMAGE, ELEMENT_HR
          ],
        },
      },
    }),
    createDeletePlugin(),
    createSoftBreakPlugin({
      options: {
        rules: [
          { hotkey: 'shift+enter' },
          {
            hotkey: 'enter',
            query: {
              allow: [
                // ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
              ],
            },
          },
        ],
      },
    }),
    createTabbablePlugin(),
    createTrailingBlockPlugin({
      options: { type: ELEMENT_PARAGRAPH },
    }),
    createCommentsPlugin(),
    createAutoformatPlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/autoformat
        ],
        enableUndoOnDelete: true,
      },
    }),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0,
        },
      },
    }),
    createDeserializeDocxPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeMdPlugin(),
    createJuicePlugin(),
  ],
  {
    components: withDraggables(
      withPlaceholders({
        [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
        [ELEMENT_CODE_BLOCK]: CodeBlockElement,
        [ELEMENT_CODE_LINE]: CodeLineElement,
        [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
        [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
        [ELEMENT_HR]: HrElement,
        [ELEMENT_IMAGE]: ImageElement,
        [ELEMENT_LINK]: LinkElement,
        [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
        [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
        [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
        [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
        [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
        [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
        [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
        [ELEMENT_MENTION]: MentionElement,
        [ELEMENT_MENTION_INPUT]: MentionInputElement,
        [ELEMENT_PARAGRAPH]: ParagraphElement,
        [ELEMENT_TABLE]: TableElement,
        [ELEMENT_TR]: TableRowElement,
        [ELEMENT_TD]: TableCellElement,
        [ELEMENT_TH]: TableCellHeaderElement,
        [ELEMENT_TODO_LI]: TodoListElement,
        [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
        [MARK_CODE]: CodeLeaf,
        [MARK_COMMENT]: CommentLeaf,
        [MARK_HIGHLIGHT]: HighlightLeaf,
        [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
        [MARK_KBD]: KbdLeaf,
        [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
        [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
        [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
        [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
      }),
    ),
  },
)

export default function OverviewPage() {
  const { user, isLoading } = useUser()
  const [content, setContent] = useState<Value>([])
  const [isPending, startTransition] = useTransition()

  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const res = useSWR<GetProjectOverviewApi.GetType>('/api/get/overview', fetcher)
  const initVal: string = res.data?.project_details[0].project_abstract || ''

  const handleSave = async () => {
    const res = await handleProjectOverviewUpdate(content)
    toast({
      title: '✅ Your changes have been successfully saved.',
    })
  }

  if (isLoading || res.isLoading) {
    return (
      <div className='flex flex-col gap-4'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </div>
    )
  } else if (res.error) {
    return <div>{res.error}</div>
  }
  return (
    <div className='flex flex-col items-end'>
      <DndProvider backend={HTML5Backend}>
        <CommentsProvider users={{}} myUserId={user?.sub}>
          <Plate
            plugins={plugins}
            initialValue={JSON.parse(initVal)}
            onChange={(newValue) => {
              setContent(newValue)
            }}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
            <MentionCombobox items={[]} />
            <CommentsPopover />
          </Plate>
        </CommentsProvider>
      </DndProvider>
      <Button className='m-5' onClick={() => startTransition(() => handleSave())}>
        {isPending ? 'loading...' : 'Save'}
      </Button>
    </div>
  )
}
