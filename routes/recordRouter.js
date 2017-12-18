let express = require('express');
let bodyParser = require('body-parser');
import records from '../controllers/recordController';

// Initialize the router
const router = express.Router();

// Parse body as JSON
router.use(bodyParser.json())

router.route('/records')
  .get(records.list_all_records);

router.route('/record/add')
  .post(records.add_a_record);

router.route('/record/:id')
  .get(records.get_record_by_id)
  .put(records.update_record_by_id);

router.route('/record/:id/remove')
  .post(records.remove_record_by_id);

//get record by story number
//get record by date

export default router;