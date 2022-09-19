/*
	This file needs to be added to:
		Auth0 portal > Auth Pipeline > Rules > Create Rule > Empty Rule > Paste Code > Save
*/

function (user, context, callback) {
  const namespace = 'https://creaturechess.jamesmonger.com/';

  if (!user || !user.app_metadata) {
    context.idToken[namespace + 'playerPicture'] = null;
  	context.idToken[namespace + 'playerNickname'] = null;
  	context.idToken[namespace + 'playerId'] = null;

  	callback(null, user, context);
    return;
  }

  const app_metadata = user.app_metadata;

  const nickname = app_metadata.playerNickname || null;
  const playerId = app_metadata.playerId || null;
  const playerPicture = app_metadata.playerPicture || null;

  context.idToken[namespace + 'playerPicture'] = playerPicture;
  context.idToken[namespace + 'playerNickname'] = nickname;
  context.idToken[namespace + 'playerId'] = playerId;

  callback(null, user, context);
}
