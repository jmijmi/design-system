import React, { ReactElement } from 'react';

import { useHighlightedCode } from '@lumx/demo/layout/utils/useHighlightedCode';

interface ICodeBlock {
    /**
     * Source code.
     */
    children: string;
    /**
     * Language.
     */
    language: string;
}

/**
 * Component used to display code in the documentation site.
 *
 * @param props Components props.
 * @return ReactElement.
 */
const CodeBlock: React.FC<ICodeBlock> = (props: ICodeBlock): ReactElement => {
    const { children, language } = props;
    const highlightedCode = useHighlightedCode(children, language);

    if (!highlightedCode) {
        return <></>;
    }

    return (
        <div className="demo-block__code">
            <pre>
                <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
        </div>
    );
};

export { CodeBlock };
