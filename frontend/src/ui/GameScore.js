import React from 'react';

import CompetitorFlag from './CompetitorFlag';
import ScoreInput from './ScoreInput';
import { withClassNames } from './utils';


const GameScore = ({ className, competitor_name, id, locked, name, autoFocus, }) => (
  <div className={className}>
    <div className="competitor">
      <CompetitorFlag name={competitor_name} />
      <div className="competitor-name">{competitor_name}</div>
    </div>
    <ScoreInput name={name} gameId={id} disabled={locked} autoFocus={autoFocus} />
  </div>
);

export default withClassNames('score')(GameScore);
