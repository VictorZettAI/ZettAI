import type { Meta, StoryObj } from '@storybook/react';
import { CaseStudies } from './CaseStudies';

const meta = {
  title: 'sections/CaseStudies',
  component: CaseStudies,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CaseStudies>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};