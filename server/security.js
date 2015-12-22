//Security.permit(['insert', 'update']).collections([Words, Languages, Urls]).apply();

Security.permit(['insert', 'update', 'remove']).collections([ Meteor.users ]).never().apply();
