const express = require("express");
const router = express.Router();
import { sendJsonResponse } from '../../services/utils';

/**
 * Hello World Test
 */
router.post("/helloWorld", (req, res) => {
    sendJsonResponse(res, 200, 'OK', {})
});

module.exports = router;