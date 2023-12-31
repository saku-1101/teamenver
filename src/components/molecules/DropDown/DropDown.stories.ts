import { Meta, StoryObj } from '@storybook/react'

import { DropDown } from './DropDown'

const meta = {
  title: 'DropDown',
  component: DropDown,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof DropDown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
