const express = require('express');
const router = express.Router();

const a11yTreeController = require('../controllers/a11yTreeController');

// Sample route
router.post('/', a11yTreeController.getTree);

// router.post('/', async (req, res) => {
//   try {
//     //console.log('req.body.url: ', req.body.url);
//     const tree = await A11ySprout.parse(req.body.url);
//     console.log({ tree });
//     return res.status(200).json(tree);
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// });

// const authorized = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   }
//   return res.status(401).json({ message: 'Unauthorized' });
// };

router.delete('/', a11yTreeController.deleteTree);

module.exports = router;
