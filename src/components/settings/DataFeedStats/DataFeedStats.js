import React, { Component } from 'react';
import { Accordion, Label } from 'semantic-ui-react';
import { LineChart } from 'react-d3-components';
import _ from 'lodash';

import datautil from '../../../api/data/util';
import queryLibrary from '../../../api/data/queries/query-library';

import NodeLabel from '../../ui/scaffold/NodeLabel/NodeLabel';

const simpleLabel = (key, value) => 
    <Label>
        {key}
        <Label.Detail>{value}</Label.Detail>
    </Label>;

const getDescription = label => {
    const q = queryLibrary[label];
    const defaultDescription = 'No description of this query is available';

    if(q) {
        return q.getDescription() || defaultDescription;
    }

    return defaultDescription;
};

export default class DataFeedStats extends Component {
    state = { activeIndex: null };

    handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
  
      this.setState({ activeIndex: newIndex })
    };

    dataFeedStats() {
        const halin = window.halinContext;
        const feedStats = _.values(halin.dataFeeds).map(feed => {
            // Add a node field so the renderer can figure out where these came from.
            return _.merge({ node: feed.node }, feed.stats());
        });

        return _.sortBy(feedStats, ['address', 'label']);
    }

    lineChartData(timings) {
        return {
            label: 'Response Time',
            values: timings.map((timing, idx) => ({
                x: idx, y: timing,
            })),
        };
    }

    render() {
        const style = { textAlign: 'left' };
        return (
            <Accordion fluid styled exclusive={false}>
                {
                    this.dataFeedStats().map((stats, idx) =>
                        <div key={idx}>
                            <Accordion.Title
                                onClick={this.handleClick}
                                index={idx} style={style}
                                active={this.state.activeIndex === idx}
                            >
                                <NodeLabel node={stats.node} />
                                <Label>{stats.label}</Label>
                                <Label>
                                    Best
                                            <Label.Detail>
                                        {datautil.roundToPlaces(stats.min, 2)}ms
                                            </Label.Detail>
                                </Label>
                                <Label>
                                    Avg. Response Time
                                            <Label.Detail>
                                        {datautil.roundToPlaces(stats.mean, 2)}ms
                                            </Label.Detail>
                                </Label>
                                <Label>
                                    Worst
                                            <Label.Detail>
                                        {datautil.roundToPlaces(stats.max, 2)}ms
                                            </Label.Detail>
                                </Label>
                            </Accordion.Title>
                            <Accordion.Content
                                active={this.state.activeIndex === idx}
                                index={idx}>

                                <p>{ getDescription(stats.label) }</p>

                                { simpleLabel('Listeners', stats.listeners) }
                                { simpleLabel('Augmentation Functions', stats.augFns) }
                                { simpleLabel('Aliases', stats.aliases) }
                                { simpleLabel('Packets', stats.packets) }

                                <h5>Response Timings</h5>

                                <LineChart
                                    data={this.lineChartData(stats.timings)}
                                    width={600}
                                    height={200}
                                    margin={{top: 10, bottom: 50, left: 50, right: 10}}/>

                                <h5>Query</h5>
                                <pre style={style}>{stats.query}</pre>
                            </Accordion.Content>
                        </div>)
                }
            </Accordion>
        )
    }

}