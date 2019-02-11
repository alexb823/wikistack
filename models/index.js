const Sequelize = require('sequelize');

//For cloud9 db
const db = new Sequelize('ubuntu', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

//For my local db
// const db = new Sequelize('postgres://localhost:5432/wikistack', {
//   logging: false,
// });


const generateSlug = (title) => {
  // And make whitespace underscore
  // Removes all non-alphanumeric characters from title
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  }
}, {
    hooks: {
      beforeValidate: (page, options) => {
        page.slug = generateSlug(page.title);
      }
    }
    });
    
const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
});



module.exports = { db, Page, User };
