import React, { Fragment } from 'react';

import { LxButton, LxIcon } from 'LumX';
import { mdiMenuDown, mdiPencil, mdiPlus } from 'LumX/icons';

export default {
    view: () => (
        <Fragment>
            {/* Theme light (m) */}

            <div className="p++ lx-theme-background-dark-L6">
                <LxButton>Default</LxButton>
                <LxButton disabled={true}>Disabled</LxButton>

                <LxButton>
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton>
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                {/* <LxButton-group>
                <LxButton>Split</LxButton>

                <LxButton variant="icon">
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>
             </LxButton-group> */}

                <LxButton variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>

            <div className="p++ lx-theme-background-dark-L6">
                <LxButton emphasis="medium">Default</LxButton>
                <LxButton emphasis="medium" disabled={true}>
                    Disabled
                </LxButton>

                <LxButton emphasis="medium">
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton emphasis="medium">
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                {/* <LxButton-group>
                <LxButton emphasis="medium">Split</LxButton>

                <LxButton emphasis="medium" variant="icon">
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>
            </LxButton-group> */}

                <LxButton emphasis="medium" variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>

            <div className="p++ lx-theme-background-dark-L6">
                <LxButton emphasis="low">Default</LxButton>
                <LxButton emphasis="low" disabled={true}>
                    Disabled
                </LxButton>

                <LxButton emphasis="low">
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton emphasis="low">
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                <LxButton emphasis="low" variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>

            <div className="p++ lx-theme-background-dark-L6">
                <LxButton size="s">Default</LxButton>
                <LxButton size="s" disabled={true}>
                    Disabled
                </LxButton>

                <LxButton size="s">
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton size="s">
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                {/* <LxButton-group>
                <LxButton size="s">Split</LxButton>

                <LxButton size="s" variant="icon">
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>
            </LxButton-group> */}

                <LxButton size="s" variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>

            {/* Theme light (s) */}

            <div className="p++ lx-theme-background-dark-L6">
                <LxButton emphasis="medium" size="s">
                    Default
                </LxButton>
                <LxButton emphasis="medium" size="s" disabled={true}>
                    Disabled
                </LxButton>

                <LxButton emphasis="medium" size="s">
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton emphasis="medium" size="s">
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                {/* <LxButton-group>
                <LxButton emphasis="medium" size="s">
                    Split
                </LxButton>

                <LxButton emphasis="medium" size="s" variant="icon">
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>
            </LxButton-group> */}

                <LxButton emphasis="medium" size="s" variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>

            <div className="p++ lx-theme-background-dark-L6">
                <LxButton emphasis="low" size="s">
                    Default
                </LxButton>
                <LxButton emphasis="low" size="s" disabled={true}>
                    Disabled
                </LxButton>

                <LxButton emphasis="low" size="s">
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton emphasis="low" size="s">
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                <LxButton emphasis="low" size="s" variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>

            {/* Theme dark (m) */}

            <div className="p++ lx-theme-background-dark-N">
                <LxButton theme="dark">Default</LxButton>
                <LxButton theme="dark" disabled={true}>
                    Disabled
                </LxButton>

                <LxButton theme="dark">
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton theme="dark">
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                {/* <LxButton-group>
                <LxButton theme="dark">Split</LxButton>

                <LxButton theme="dark" variant="icon">
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>
            </LxButton-group> */}

                <LxButton theme="dark" variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>

            <div className="p++ lx-theme-background-dark-N">
                <LxButton lx-color="light" emphasis="medium">
                    Default
                </LxButton>
                <LxButton lx-color="light" emphasis="medium" disabled={true}>
                    Disabled
                </LxButton>

                <LxButton lx-color="light" emphasis="medium">
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton lx-color="light" emphasis="medium">
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                {/* <LxButton-group>
                <LxButton lx-color="light" emphasis="medium">
                    Split
                </LxButton>

                <LxButton lx-color="light" emphasis="medium" variant="icon">
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>
            </LxButton-group> */}

                <LxButton lx-color="light" emphasis="medium" variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>

            <div className="p++ lx-theme-background-dark-N">
                <LxButton lx-color="light" emphasis="low">
                    Default
                </LxButton>
                <LxButton lx-color="light" emphasis="low" disabled={true}>
                    Disabled
                </LxButton>

                <LxButton lx-color="light" emphasis="low">
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton lx-color="light" emphasis="low">
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                <LxButton lx-color="light" emphasis="low" variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>

            {/* Theme dark (s) */}

            <div className="p++ lx-theme-background-dark-N">
                <LxButton size="s" theme="dark">
                    Default
                </LxButton>
                <LxButton size="s" theme="dark" disabled={true}>
                    Disabled
                </LxButton>

                <LxButton size="s" theme="dark">
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton size="s" theme="dark">
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                {/* <LxButton-group>
                <LxButton size="s" theme="dark">
                    Split
                </LxButton>

                <LxButton size="s" theme="dark" variant="icon">
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>
            </LxButton-group> */}

                <LxButton size="s" theme="dark" variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>

            <div className="p++ lx-theme-background-dark-N">
                <LxButton lx-color="light" emphasis="medium" size="s">
                    Default
                </LxButton>
                <LxButton lx-color="light" emphasis="medium" size="s" disabled={true}>
                    Disabled
                </LxButton>

                <LxButton lx-color="light" emphasis="medium" size="s">
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton lx-color="light" emphasis="medium" size="s">
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                {/* <LxButton-group>
                <LxButton lx-color="light" emphasis="medium" size="s">
                    Split
                </LxButton>

                <LxButton lx-color="light" emphasis="medium" size="s" variant="icon">
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>
            </LxButton-group> */}

                <LxButton lx-color="light" emphasis="medium" size="s" variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>

            <div className="p++ lx-theme-background-dark-N">
                <LxButton lx-color="light" emphasis="low" size="s">
                    Default
                </LxButton>
                <LxButton lx-color="light" emphasis="low" size="s" disabled={true}>
                    Disabled
                </LxButton>

                <LxButton lx-color="light" emphasis="low" size="s">
                    <LxIcon icon={mdiPencil} />
                    <span>With Icon</span>
                </LxButton>

                <LxButton lx-color="light" emphasis="low" size="s">
                    <span>Dropdown</span>
                    <LxIcon icon={mdiMenuDown} />
                </LxButton>

                <LxButton lx-color="light" emphasis="low" size="s" variant="icon">
                    <LxIcon icon={mdiPlus} />
                </LxButton>
            </div>
        </Fragment>
    ),
};