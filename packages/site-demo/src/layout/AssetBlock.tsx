import React, { ReactElement } from 'react';

import { mdiDownload, mdiFile } from '@lumx/icons';
import { Button, Emphasis, Icon, Size } from '@lumx/react';

interface IAssetBlock {
    /**
     * Asset download URL.
     */
    downloadURL: string;
    /**
     * Asset file name.
     * If not provided, the file name will be extracted from the download URL (with varying result quality).
     */
    fileName?: string;
    /**
     * Asset thumbnail preview image URL.
     * If not provided, a generic file icon will be displayed.
     */
    thumbnailURL?: string;
}

/**
 * Extract file name (last path part) from URL.
 * Else returns the unchanged URL.
 * @param url The input URL
 * @return The file name.
 */
function getFileName(url: string): string {
    const match = url.match(/\/([^\/]+$)/);
    if (match) {
        const [, fileName] = match;

        return fileName;
    }

    return url;
}

/**
 * Component used to present an asset in the documentation site.
 *
 * @param props Components props.
 * @return ReactElement.
 */
const AssetBlock: React.FC<IAssetBlock> = (props: IAssetBlock): ReactElement => {
    const { downloadURL, fileName, thumbnailURL } = props;

    return (
        <div className="asset-block">
            <div className="asset-block__content">
                {thumbnailURL ? (
                    <img
                        alt="File download thumbnail"
                        className="asset-block__thumbnail"
                        src={thumbnailURL}
                        srcSet={`${thumbnailURL} 2x`}
                    />
                ) : (
                    <Icon className="asset-block__thumbnail" icon={mdiFile} size={Size.xl} />
                )}
            </div>

            <div className="asset-block__toolbar">
                <div className="asset-block__filename">{fileName || getFileName(downloadURL)}</div>

                <div className="asset-block__download-button">
                    <Button emphasis={Emphasis.low} leftIcon={mdiDownload} href={downloadURL} target="_blank">
                        Download
                    </Button>
                </div>
            </div>
        </div>
    );
};

export { AssetBlock };
