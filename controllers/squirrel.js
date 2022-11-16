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
   exports.squirrel_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await squirrel.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };
   exports.squirrel_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
   ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await squirrel.findById( req.params.id)
    // Do updates of properties
    if(req.body.squirrel_color)
    toUpdate.squirrel_color = req.body.squirrel_color;
    if(req.body.squirrel_breed) toUpdate.squirrel_breed = req.body.squirrel_breed;
    if(req.body.squirrel_price) toUpdate.squirrel_price = req.body.squirrel_price;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
   failed`);
    }
   };
   // Handle squirrel delete on DELETE.
exports.squirrel_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await squirrel.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };
   exports.squirrel_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await squirrel.findById( req.query.id)
    res.render('squirreldetail',
   { title: 'squirrel Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
   // Handle building the view for creating a squirrel.
// No body, no in path parameter, no query.
// Does not need to be async
exports.squirrel_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('squirrelcreate', { title: 'squirrel Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
   // Handle building the view for updating a squirrel.
// query provides the id
exports.squirrel_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await squirrel.findById(req.query.id)
    res.render('squirrelupdate', { title: 'squirrel Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
   // Handle a delete one view with id from query
exports.squirrel_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await squirrel.findById(req.query.id)
    res.render('squirreldelete', { title: 'squirrel Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };