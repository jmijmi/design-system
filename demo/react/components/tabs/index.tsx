import { Categories, Category, DemoObject } from 'LumX/demo/react/constants';

/////////////////////////////

/**
 * The title of the demo.
 */
const title: string = 'Tabs';

/**
 * The category of the demo.
 */
const category: Category = Categories.components;

/**
 * The description of the component.
 */
const description: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu sem et mauris convallis tempor. Mauris placerat enim eget ligula fermentum, in aliquam lorem congue. Vivamus lacinia consectetur mollis.';

const demos: { [demoName: string]: DemoObject } = {
    /* tslint:disable: object-literal-sort-keys */
    default: {
        description: 'Lorem ipsum ...',
        title: 'Default',
    },
    clustered: {
        description: 'Lorem ipsum ...',
        title: 'Clustered',
    },
    'clustered-center': {
        description: 'Lorem ipsum ...',
        title: 'Clustered and centered',
    },
    /* tslint:enable: object-literal-sort-keys */
};

/////////////////////////////

export { category, description, title, demos };
