exports.processUpdate = async (match, update) => {
  const { team, playerId, assistBy, time, goals = 1 } = update;

  if (team === 'clubA') match.score.clubA += goals;
  else if (team === 'clubB') match.score.clubB += goals;

  match.events.push({
    time,
    type: 'goal',
    description:` Goal by ${playerId}`,
    player: playerId
  });

  // Update player stat
  let stat = match.playerStats.find(p => p.player.toString() === playerId);
  if (!stat) {
    stat = { player: playerId, goals: 0, points: 0 };
    match.playerStats.push(stat);
  }
  stat.goals += goals;
  stat.points += goals * 5;

  if (assistBy) {
    let assist = match.playerStats.find(p => p.player.toString() === assistBy);
    if (!assist) {
      assist = { player: assistBy, assists: 0, points: 0 };
      match.playerStats.push(assist);
    }
    assist.assists += 1;
    assist.points += 3;
  }
};

exports.preparePublicData = (match) => {
  const lastEvents = match.events.filter(e => e.type === 'goal').slice(-5).map(e => ({
    time: e.time,
    type: e.type,
    playerId: e.player.toString()
  }));

  return {
    score: match.score,
    recentGoals: lastEvents
  };
};