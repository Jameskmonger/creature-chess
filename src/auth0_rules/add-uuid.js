function addUuid(user, context, callback) {
    if (user && user.app_metadata && user.app_metadata.uuid) {
        callback(null, user, context);
        return;
    }

    const uuid = require('uuid@3.3.2');

    user.app_metadata = user.app_metadata || {};
    user.app_metadata.uuid = user.app_metadata.uuid || uuid();

    auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function() {
            callback(null, user, context);
        })
        .catch(function(err) {
            callback(err);
        });
}
