import * as React from 'React'
export default ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)
