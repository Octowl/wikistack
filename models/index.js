var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistackdb', {
    logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        defaultValue: 'open'
    }
}, {
    getterMethods : {
        route: function(){
            return "/wiki/" + this.urlTitle;
        }
    }
});

Page.hook('beforeValidate', function(user, options) {
    if (user.title) user.urlTitle = user.title.replace(/\s+/g, '_').replace(/\W/g,'');
    else user.urlTitle = Math.random().toString(36).substring(2,7);
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        unique: true,
        allowNull: false
    }
});

Page.belongsTo(User, {as: 'author'});

module.exports = {
    Page: Page,
    User: User
}
