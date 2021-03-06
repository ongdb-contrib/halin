import React, { Component } from 'react';
import ClusterTimeseries from '../../timeseries/ClusterTimeseries';
import uuid from 'uuid';
import queryLibrary from '../../../api/data/queries/query-library';
import HalinCard from '../../ui/scaffold/HalinCard/HalinCard';

class ClusterMemory extends Component {
    state = {
        key: uuid.v4(),
        rate: 1000,
        query: queryLibrary.JMX_MEMORY_STATS.query,
    };

    render() {
        const header = 'Heap Size (' + 
            (window.halinContext.getWriteMember().dbms.maxHeap || 'unknown') + ' max)';

        return (
            <HalinCard header={header} knowledgebase='ClusterMemory' owner={this}>
                <ClusterTimeseries key={this.state.key}
                    query={this.state.query} 
                    rate={this.state.rate}
                    displayProperty='heapUsed'
                />
            </HalinCard>
        )
    }
}

export default ClusterMemory;
