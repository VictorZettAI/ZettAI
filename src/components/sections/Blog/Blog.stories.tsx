import type { Meta, StoryObj } from '@storybook/react';
import { Blog } from './Blog';

const meta = {
  title: 'sections/Blog',
  component: Blog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Blog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};