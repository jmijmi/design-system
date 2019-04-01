const kebabCase = require('lodash/kebabCase');

const MainGenerator = require('../app');

/////////////////////////////

module.exports = class extends MainGenerator {
    constructor(args, opts) {
        super(args, opts);

        this.option('validations-given', { hide: true, type: Boolean });
        this.option('say-hi', { hide: true, type: Boolean });
    }

    prompting() {
        return super.prompting(Boolean(this.options['say-hi']));
    }

    writing() {
        const path = `src/components/${kebabCase(this.options.name || this.answers.name)}/react`;

        this.fs.copyTpl(
            this.templatePath('Component.test.tsx.ejs'),
            this.destinationPath(`${path}/${this.options.name || this.answers.name}.test.tsx`),
            {
                componentName: this.options.name || this.answers.name,

                ...this._getValidationsOptions(),
            },
        );
    }
};
