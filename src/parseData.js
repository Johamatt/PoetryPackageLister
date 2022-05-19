

export default async function parseData(props) {
    return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsText(props);
  })
    .then((a) => a.slice(0, a.indexOf("[metadata]"))) // remove metadata section
    .then((a) => a.split("[[package]]")) //todo include delimiter   ---    /(\[\[.package\]\])/   "[[package]]"
    .then((a) => a.filter((a) => a !== "" || a === undefined)) // remove empty arrays ( use shift() ?)
    .then((a) => a.map((a) => a.replace(/^\s+|\s+$/g, ""))) // remove linebreak from start and end string
    .then((a) =>
      a.map((b) => {
        // every array element contains one package including its dependencies

        let obj = {
          dependencies: [],
        };


        let Packages = b.split(/\n\s*\n/);
        Packages.map((c) => {
          if (c.startsWith("name")) { // [[package]]
         let defaultPackage = c.split("\n");
    //      defaultPackage.shift();    
            for (let i = 0; i < defaultPackage.length; i++) {
              let key = defaultPackage[i].split(" = ")[0];
              let val = defaultPackage[i].split(" = ")[1].trim();

              obj[key] = JSON.parse(val);
            }
          }

       
          if (c.startsWith("[package.dependencies]") ) {
            let dependenciesPackage = c.split("\n");
            dependenciesPackage.shift();
            for (let i = 0; i < dependenciesPackage.length; i++) {
              let key = dependenciesPackage[i].split(" = ")[0];
              obj.dependencies.push((JSON.parse(JSON.stringify(key))));
            }
         }

   
          if (c.startsWith("[package.extras]")) {
            let dependenciesPackage = c.split("\n");
            dependenciesPackage.shift()
            for (let i = 0; i < dependenciesPackage.length; i++) {
              let key = dependenciesPackage[i].split(" = ")[1].replace(/ *\([^)]*\) */g, ""); // remove text in brackets (version)            
              let arr = JSON.parse(key)
              for (let y = 0; y < arr.length; y++) {              
                   obj.dependencies.push(arr[y]);
              }        
            }
          }
        });

        // remove all duplicates from list
        obj.dependencies = obj.dependencies.filter((e, i) => {
          return obj.dependencies.indexOf(e) === i
        })
        return obj;
      })
    )



}

