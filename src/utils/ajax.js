export default {
  get: function(query){
    return fetch(query).then(response=>{
      //console.log(response)
      return response.json()
    })
  }
}
