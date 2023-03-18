const notFound = (req,res)=> res.status(404).json({msg : 'not found route check the end point'})

module.exports = notFound