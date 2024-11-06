const models = require('../models/a11yTreeModels');
const A11ySprout = require('../puppeteer/A11ySprout');

const a11yTreeController = {};

// might want to separate the checking and creation of a tree
// seems odd that a post request might just get something instead of create?

a11yTreeController.getTree = async (req, res, next) => {
  const url = req.body.url;
  try {
    const foundTree = await models.A11lyTree.findOne({ url: url }).exec();
    if (foundTree) {
      console.log('!!!!!!!!!!FOUND:', url);
      return res.status(200).json(foundTree);
    }
    //otherwise parse doc at target url
    const tree = await A11ySprout.parse(url);
    // then save it to data base
    console.log({ tree });
    const savedTree = await models.A11lyTree.create({ url, ...tree });
    //check to see if tree is in data base
    return res.status(200).json(savedTree);
  } catch (err) {
    console.log(err);
    return next({ err: err.message });
  }

  // catch and throw error to next(err)
};

//try {
//     //console.log('req.body.url: ', req.body.url);
//     const tree = await A11ySprout.parse(req.body.url);
//     console.log({ tree });
//     return res.status(200).json(tree);
//   } catch (e) {
//     console.log(e);
//     return e;
//   }

module.exports = a11yTreeController;
