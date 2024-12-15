import type { Meta, StoryObj } from '@storybook/react';
import { Chatbot } from './Chatbot';

const meta = {
  title: 'features/Chatbot',
  component: Chatbot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chatbot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};