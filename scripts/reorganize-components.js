import fs from 'fs/promises';
import path from 'path';

const COMPONENTS_DIR = path.join(process.cwd(), 'src', 'components');

const COMPONENT_CATEGORIES = {
  ui: ['Button', 'Input', 'Card', 'Icon', 'OptimizedImage'],
  layout: ['Header', 'Footer', 'Container', 'Section'],
  features: ['Chatbot', 'ContactForm', 'TestimonialCard', 'TeamMemberCard', 'ServiceCard', 'BlogCard'],
  sections: ['Hero', 'Services', 'Team', 'Contact', 'Testimonials', 'Blog', 'CaseStudies', 'IAS', 'DemoSection'],
};

async function createComponentStructure(componentName, category) {
  const componentDir = path.join(COMPONENTS_DIR, category, componentName);
  
  // Create component directory
  await fs.mkdir(componentDir, { recursive: true });

  // Create types.ts
  const typesContent = `export interface ${componentName}Props {
  // Add your props here
}`;
  await fs.writeFile(path.join(componentDir, 'types.ts'), typesContent);

  // Create stories file
  const storiesContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta = {
  title: '${category}/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add your default props here
  },
};`;
  await fs.writeFile(path.join(componentDir, `${componentName}.stories.tsx`), storiesContent);

  // Create test file
  const testContent = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName} />);
    // Add your test assertions here
  });
});`;
  await fs.writeFile(path.join(componentDir, `${componentName}.test.tsx`), testContent);

  // Create index file
  const indexContent = `export * from './types';
export { ${componentName} } from './${componentName}';`;
  await fs.writeFile(path.join(componentDir, 'index.ts'), indexContent);

  // Move and update component file if it exists
  const oldPath = path.join(COMPONENTS_DIR, `${componentName}.tsx`);
  const newPath = path.join(componentDir, `${componentName}.tsx`);
  
  try {
    const componentExists = await fs.access(oldPath).then(() => true).catch(() => false);
    if (componentExists) {
      let content = await fs.readFile(oldPath, 'utf8');
      
      // Update imports
      content = content.replace(/from '\.\./g, "from '@/");
      content = content.replace(/export default/g, 'export');
      
      await fs.writeFile(newPath, content);
      await fs.unlink(oldPath);
    }
  } catch (error) {
    console.log(`Component ${componentName} not found in root directory`);
  }
}

async function createCategoryIndex(category, components) {
  const indexContent = `${components
    .map(comp => `export * from './${comp}';`)
    .join('\n')}`;
  
  await fs.writeFile(
    path.join(COMPONENTS_DIR, category, 'index.ts'),
    indexContent
  );
}

async function main() {
  try {
    // Create category directories
    for (const [category, components] of Object.entries(COMPONENT_CATEGORIES)) {
      await fs.mkdir(path.join(COMPONENTS_DIR, category), { recursive: true });
      
      // Create component structure for each component
      for (const component of components) {
        await createComponentStructure(component, category);
      }
      
      // Create category index file
      await createCategoryIndex(category, components);
    }

    // Create root components index
    const rootIndexContent = Object.keys(COMPONENT_CATEGORIES)
      .map(category => `export * from './${category}';`)
      .join('\n');
    
    await fs.writeFile(
      path.join(COMPONENTS_DIR, 'index.ts'),
      rootIndexContent
    );

    console.log('✓ Components reorganized successfully!');
  } catch (error) {
    console.error('✗ Error reorganizing components:', error);
    process.exit(1);
  }
}

main();
