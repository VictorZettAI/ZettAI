import type { Meta, StoryObj } from '@storybook/react';
import { IAS } from './IAS';

const meta = {
  title: 'sections/IAS',
  component: IAS,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IAS>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};