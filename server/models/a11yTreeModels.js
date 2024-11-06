const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'a11ySprout',
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const UserSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  profileUrl: String,
  avatarUrl: String,
});

const User = mongoose.model('user', UserSchema);

const ElementSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  level: {
    type: Number,
    default: null,
  },
});

const LinkSchema = new mongoose.Schema({
  text: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
});

const A11YTreeSchema = new mongoose.Schema({
  url: { type: String, required: [true, 'Url is required'] },
  tree: {
    type: [ElementSchema],
    required: [true, 'A tree property of elements is required'],
  },
  headers: {
    type: [ElementSchema],
    required: [true, 'A headers property of elements is required'],
  },
  tabIndex: { type: [], required: [true, 'Url is required'] },
  links: {
    type: [LinkSchema],
    required: [true, 'A links property of links is required'],
  },
  nonSemanticLinks: {
    type: [LinkSchema],
    required: [true, 'A nonSemanticLinks property of links is required'],
  },
  skipLink: {
    type: LinkSchema,
    required: [true, 'A skip link must be present'],
  },
});

const A11lyTree = mongoose.model('a11y-tree', A11YTreeSchema);

module.exports = { A11lyTree, User };
