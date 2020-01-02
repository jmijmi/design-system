import { Engine, EngineContext } from '@lumx/demo/context/engine';
import React, { Fragment, ReactElement, useContext } from 'react';

import orderBy from 'lodash/orderBy';

import { Alignment, Divider, ExpansionPanel, Grid, GridItem } from '@lumx/react';

// @ts-ignore
import { propsByComponent } from 'props-loader!';

const renderTypeTableRow = ({ type, defaultValue }: IProperty): ReactElement => {
    let formattedType = <>{type}</>;
    const splitType = type.split(defaultValue);

    if (splitType.length > 1) {
        formattedType = (
            <>
                {splitType[0]}
                <strong>{defaultValue}</strong>
                {splitType[1]}
            </>
        );
    } else if (splitType.length === 1 && defaultValue) {
        formattedType = (
            <>
                {type}
                {' (default: '}
                <strong>{defaultValue}</strong>
                {')'}
            </>
        );
    }

    return <code className="lumx-typography-body1">{formattedType}</code>;
};

const PropTable: React.FC<IPropTableProps> = ({ component }: IPropTableProps): ReactElement => {
    const { engine } = useContext(EngineContext);
    if (engine === Engine.angularjs) {
        return <span>Could not load properties of the angular.js {component} component.</span>;
    }

    const propertyList: IProperty[] = propsByComponent[component];

    if (!propertyList) {
        return <span>Could not load properties of the react {component} component.</span>;
    }

    return (
        <div>
            {orderBy(propertyList, ['required', 'name'], ['desc', 'asc']).map((property: IProperty, idx: number) => {
                return (
                    <Fragment key={property.id}>
                        <ExpansionPanel label="Lorem ipsum" isOpen={false}>
                            <header>
                                <Grid hAlign={Alignment.center}>
                                    <GridItem width="4">
                                        {property.required ? (
                                            <span className="lumx-typography-subtitle1">{`${property.name} *`}</span>
                                        ) : (
                                            <span className="lumx-typography-body1">{property.name}</span>
                                        )}
                                    </GridItem>

                                    <GridItem width="8">{renderTypeTableRow(property)}</GridItem>
                                </Grid>
                            </header>

                            <div className="lumx-spacing-padding-vertical">
                                <p className="lumx-typography-body1">{property.description}</p>
                            </div>
                        </ExpansionPanel>

                        {idx < propertyList.length - 1 && <Divider className="lumx-spacing-margin-vertical-regular" />}
                    </Fragment>
                );
            })}
        </div>
    );
};

interface IProperty {
    id: string;
    name: string;
    required: boolean;
    type: string;
    description: string;
    defaultValue: string;
}

interface IPropTableProps {
    component: string;
}

export { PropTable, IProperty };
