import type { Meta, StoryObj } from '@storybook/react';
import { Services } from './Services';

const meta = {
  title: 'sections/Services',
  component: Services,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Services>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};