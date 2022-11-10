var squirrel = require('../models/squirrel');
// List of all squirrels
// List of all squirrels
// List of all squirrels
exports.squirrel_list = async function(req, res) {
    try{
    thesquirrels = await squirrel.find();
    res.send(thesquirrels);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// for a specific squirrel.

exports.squirrel_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: squirrel detail: ' + req.params.id);
};
// Handle squirrel create on POST.

// Handle squirrel delete form on DELETE.
exports.squirrel_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: squirrel delete DELETE ' + req.params.id);
};
// Handle squirrel update form on PUT.
exports.squirrel_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: squirrel update PUT' + req.params.id);
};
exports.squirrel_view_all_Page = async function(req, res) {
    try{
    thesquirrels = await squirrel.find();
    res.render('squirrel', { title: 'squirrel Search Results', results: thesquirrels });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
   // Handle squirrel create on POST.
exports.squirrel_create_post = async function(req, res) {
    console.log(req.body)
    let document = new squirrel();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"squirrel_type":"goat", "cost":12, "size":"large"}
    document.squirrel_color = req.body.squirrel_color;
    document.squirrel_breed = req.body.squirrel_breed;
    document.squirrel_price = req.body.squirrel_price;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };