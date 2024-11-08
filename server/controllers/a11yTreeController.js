const models = require('../models/a11yTreeModels');
const A11ySprout = require('../puppeteer/A11ySprout');

const a11yTreeController = {};

// might want to separate the checking and creation of a tree
// seems odd that a post request might just get something instead of create?

// do not save tree unless request is from logged in user?
// will try and make this change!

a11yTreeController.getTree = async (req, res, next) => {
  const url = req.body.url;
  const id = req.body.id;
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!! A11yTree Controller');
  try {
    if (id) {
      const user = await models.User.findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      const hasTree = user.trees.filter((tree) => {
        return tree.url === url;
      });

      if (hasTree.length) {
        const tree = hasTree[0];
        return res.status(200).json({ user, tree });
      }

      const tree = await A11ySprout.parse(url);

      user.trees.push(tree);

      await user.save();

      console.log('A11yTree successfully added to user:', user.username);
      return res.status(200).json({ user, tree });
    } else {
      // removed tree population unless logged in
      // const foundTree = await models.A11lyTree.findOne({ url: url }).exec();
      // if (foundTree) {
      //   console.log('!!!!!!!!!!FOUND:', url);
      //   return res.status(200).json(foundTree);
      // }
      //otherwise parse doc at target url
      const tree = await A11ySprout.parse(url);
      // then save it to data base
      console.log({ tree });
      //const savedTree = await models.A11lyTree.create(tree);
      //check to see if tree is in data base
      //return res.status(200).json(savedTree);
      return res.status(200).json(tree);
    }
  } catch (err) {
    console.log(err);
    return next({ err: err.message });
  }

  // catch and throw error to next(err)
};

a11yTreeController.deleteTree = async (req, res, next) => {
  const id = req.body.id;
  const url = req.body.url;

  console.log({ id, url });

  try {
    const updatedUser = await models.User.findByIdAndUpdate(
      id,
      { $pull: { trees: { url } } },
      { new: true }
    );

    return res.status(200).json(updatedUser);
    // select trees, filter out tree, save user;
  } catch (err) {
    next(err);
  }
};

a11yTreeController.updateTree = async (req, res, next) => {
  const id = req.body.id;
  const url = req.body.url;
  try {
    const user = await models.User.findById(id);

    const filtered = user.trees.filter((tree) => {
      return tree.url !== url;
    });

    const updatedTree = await A11ySprout.parse(url);

    user.trees = [...filtered, updatedTree];

    await user.save();

    return res.status(200).json(updatedTree);
    // select trees, filter out tree, save user;
  } catch (err) {
    next(err);
  }
};

module.exports = a11yTreeController;
