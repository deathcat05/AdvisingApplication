import React, { Component } from 'react'
import AdviseeCalendar from './AdviseeCalendar'
import CenteredTabs from './Tabs'


class AdviseeView extends Component {

    state = {
        boolvalue : false
    }
    render() {

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '2px',
            }}>
                <div style={{ flex: 1, paddingRight: '10px' }}>
                    <CenteredTabs />
                </div>
                <div style={{ flex: 5 }}>
                    {this.state.boolvalue ? <SelectAdvisor/>: <AdviseeCalendar />}
                </div>
            </div>
        )
    }
}

export default AdviseeView;

