function dateValidation (date) {
    console.log(date)
    if(new Date().toISOString().substring(0, 10) <= date){
        return true
    }
    else return false
}


module.exports = dateValidation