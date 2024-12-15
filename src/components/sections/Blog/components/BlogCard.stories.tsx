import type { Meta, StoryObj } from '@storybook/react';
import { BlogCard } from './BlogCard';

const meta = {
  title: 'features/BlogCard',
  component: BlogCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};