import type { Meta, StoryObj } from '@storybook/react';
import { DemoSection } from './DemoSection';

const meta = {
  title: 'sections/DemoSection',
  component: DemoSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DemoSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};