const router = require('express').Router();
const Campaign = require('../../controller/Campaign');

router.route('/')
    // .get(Campaign.findAll)
    .post(Campaign.create);

router.route('/user')
    .post(Campaign.createCampaign)
    
router.route('/:id')
    .delete(Campaign.delete)
    .get(Campaign.findAll);

module.exports = router;
