function addStats(user, context, callback) {
    if (user && user.app_metadata && user.app_metadata.stats) {
        callback(null, user, context);
        return;
    }

    user.app_metadata = user.app_metadata || {};
    user.app_metadata.stats = {
        gamesPlayed: 0,
        wins: 0
    };

    auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function() {
            callback(null, user, context);
        })
        .catch(function(err) {
            callback(err);
        });
}
