import type { Meta, StoryObj } from '@storybook/react';
import { TeamMemberCard } from './TeamMemberCard';

const meta = {
  title: 'features/TeamMemberCard',
  component: TeamMemberCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TeamMemberCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};