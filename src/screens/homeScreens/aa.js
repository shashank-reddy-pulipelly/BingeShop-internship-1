fetchData=  async  ()=>{

    var query= firebase.database().ref('Users/User_1/Favorites').orderByKey();
   var val=null;
   await query.once('value',snapShopt=>{
  
  val=snapShopt.val()
   });
  
     var array=[];
   
     const val2=val;
     console.log(val2)
   for(const keys in val2){
   
     const obj=val2[keys];
  
     const query2 = firebase.database().ref(`ShopProducts/${obj.shop_id}/${obj.prod_id}`)
    await query2.once('value',  snap=>{
     array.push(snap.val())
  
    })
   }
  
  
       return  array;
  
  
   }