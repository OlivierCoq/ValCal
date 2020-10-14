import db from './components/firebaseInit'

const OseeyoFireBase = {}
    // constructor(){}
    export const OseeyoFirePull = (Targetcollection, idCallback) => {
        let DocArray = []
        db.collection(Targetcollection).get().then((snapshot) => {
           for( let i = 0; i < snapshot.docs.length; i++)
           {
               DocArray[i] = snapshot.docs[i].data();
               idCallback(snapshot.docs[i].id, snapshot.docs[i].data());
               console.log("this is being returned by the oseeyofirepull function");
           }
        });
        console.log("DocArray", DocArray)
        return DocArray;

    }

    export const OsseeyoFirePush = (Targetcollection, NewRecordObject) => {
        db.collection(Targetcollection).add(NewRecordObject);
    }

    export const OseeyoUpdate = (Targetcollection, param, paramValue, postObj) => {
      db.collection(Targetcollection).where(param, '==', paramValue).get()
        .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update(postObj) })
      })
    }

    export const OseeyoGet = (Targetcollection, param, paramValue) => {

      db.collection(Targetcollection).where(param, '==', paramValue).get().then((querySnapshot)=> {
        let returnObj
        querySnapshot.forEach((doc) =>{
          returnObj = doc.data()
        })
        return returnObj
        // console.log("Your query, sir:", returnObj)
        // return returnObj
        // querySnapshot.forEach((doc) => {
        //   console.log(doc);
        // })
      })
    }

    export const connection = () => {
      console.log("Fuck Yes motherfucker!")
    }

//Example Usage:
  // var connector = new OseeyoFireBase();
  // connector.OseeyoFirePull("albums", (id,data)=>{
  //     document.write("<div class='"+ id +"'><h1>"+ data.name +"</h1>")
  // });
