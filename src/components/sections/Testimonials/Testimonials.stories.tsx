import type { Meta, StoryObj } from '@storybook/react';
import { Testimonials } from './Testimonials';

const meta = {
  title: 'sections/Testimonials',
  component: Testimonials,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Testimonials>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};