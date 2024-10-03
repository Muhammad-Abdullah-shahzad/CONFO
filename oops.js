//  let user1={
//     firstname:'abdullah',
//     age:18,
//      lastname:'shahzad',
//      getFullName :function(){
//        return 18
//      }
// }
var a='hello'


function createUser(name1,name2,a)
{
 let user={
    firstname: name1, 
    age:a,
     lastname:name2,
     getFullName:function(){
      return user.firstname+user.lastname
     }
    }
return user    
    }

    user1=createUser('abdullah','shahzad',18)
    user2=createUser('mia','khalifa',19)

