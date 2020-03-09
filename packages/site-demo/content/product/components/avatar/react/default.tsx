import React from 'react';

import { mdiDelete, mdiEye, mdiPencil } from '@lumx/icons';
import { Avatar, Emphasis, IconButton, Size } from '@lumx/react';

const App = ({ theme }: any) => (
    <div className="demo-grid">
        <Avatar theme={theme} image="http://i.pravatar.cc/40" size={Size.xs} />
        <Avatar theme={theme} image="http://i.pravatar.cc/48" size={Size.s} />
        <Avatar theme={theme} image="http://i.pravatar.cc/72" size={Size.m} />
        <Avatar theme={theme} image="http://i.pravatar.cc/128" size={Size.l} />
        <Avatar
            theme={theme}
            image="http://i.pravatar.cc/256"
            size={Size.xl}
            actions={
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="lumx-spacing-margin-right-regular">
                        <IconButton color="dark" emphasis={Emphasis.low} hasBackground icon={mdiPencil} size={Size.s} />
                    </div>

                    <div className="lumx-spacing-margin-right-regular">
                        <IconButton color="dark" emphasis={Emphasis.low} hasBackground icon={mdiEye} size={Size.s} />
                    </div>

                    <div>
                        <IconButton color="dark" emphasis={Emphasis.low} hasBackground icon={mdiDelete} size={Size.s} />
                    </div>
                </div>
            }
        />
    </div>
);

export default App;
