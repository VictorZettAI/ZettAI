import type { Meta, StoryObj } from '@storybook/react';
import { Team } from './Team';

const meta = {
  title: 'sections/Team',
  component: Team,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Team>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};