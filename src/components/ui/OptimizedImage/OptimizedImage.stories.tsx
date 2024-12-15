import type { Meta, StoryObj } from '@storybook/react';
import { OptimizedImage } from './OptimizedImage';

const meta = {
  title: 'ui/OptimizedImage',
  component: OptimizedImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OptimizedImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};