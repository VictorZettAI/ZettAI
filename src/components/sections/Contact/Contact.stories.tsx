import type { Meta, StoryObj } from '@storybook/react';
import { Contact } from './Contact';

const meta = {
  title: 'sections/Contact',
  component: Contact,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};