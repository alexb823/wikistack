const Sequelize = require('sequelize');

//For cloud9 db
// const db = new Sequelize('ubuntu', 'postgres', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: false,
// });

//For my local db
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});


const generateSlug = (title) => {
  // And make whitespace underscore
  // Removes all non-alphanumeric characters from title
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

//Page model
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

//User model
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

//Association
Page.belongsTo(User, { as: 'author' });


//Queries
const findPage = (slug) => {
  return Page.findOne({
    where: { slug: slug }
  })
}

const findOrCreatUse = (name, email) => {
  return User.findOrCreate({ where: { name: name, email: email } })
  .then(instance => instance[0]);
}


module.exports = {
  db,
  Page,
  User,
  findPage,
  findOrCreatUse,
};
