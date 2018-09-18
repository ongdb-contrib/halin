import React, { Component } from 'react';
import "semantic-ui-css/semantic.min.css";
import { Grid } from 'semantic-ui-react';
// import HeapComponent from './HeapComponent';
import MemoryMonitor from './MemoryMonitor';
import SystemLoad from './SystemLoad';
import GCMonitor from './GCMonitor';
import ActiveQueries from './ActiveQueries';
import PageCache from '../diagnostic/PageCache';
import uuid from 'uuid';

class PerformancePane extends Component {
    render() {
        const key = uuid.v4();

        return (
            <div className="PerformancePane">
                <h3>System Performance</h3>
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <SystemLoad key={key} node={this.props.node} driver={this.props.driver}/>
                        </Grid.Column>

                        <Grid.Column>
                            <MemoryMonitor key={key} node={this.props.node} driver={this.props.driver}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <ActiveQueries key={key} node={this.props.node} driver={this.props.driver}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <PageCache key={key} node={this.props.node} driver={this.props.driver}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <GCMonitor key={key} node={this.props.node} driver={this.props.driver}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>  
            </div>
        );
    }
}

export default PerformancePane;