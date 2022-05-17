

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
        // every array element contains one package including its extras & dependencies

        let Packages = b.split(/\n\s*\n/);
        let obj = {
          dependencies: {},
          extras: {},
        };

        Packages.map((c) => {
          if (c.startsWith("name")) { //[[package]] 
            
            let defaultPackage = c.split("\n");
      //     defaultPackage.shift();    

            for (let i = 0; i < defaultPackage.length; i++) {
              let key = defaultPackage[i].split(" = ")[0];
              let val = defaultPackage[i].split(" = ")[1].trim();

              obj[key] = JSON.parse(val);
            }
          }

          if (c.startsWith("[package.extras]")) {
            let extrasPackage = c.split("\n");
            extrasPackage.shift();

            for (let i = 0; i < extrasPackage.length; i++) {
              let key = extrasPackage[i].split(" = ")[0];
              let val = extrasPackage[i].split(" = ")[1];
              obj.extras[key] = JSON.parse(val);
            }
          }

          if (c.startsWith("[package.dependencies]")) {
            let dependenciesPackage = c.split("\n");
            dependenciesPackage.shift();

            for (let i = 0; i < dependenciesPackage.length; i++) {
              if (dependenciesPackage[i].includes("= {")) {
                let key = dependenciesPackage[i].split(/=/).shift().trim();
                let val = dependenciesPackage[i]
                  .split(/=/)
                  .slice(1)
                  .join("=")
                  .trim();

                val = val.slice(1, -1).split(",");

                obj.dependencies[key] = JSON.parse(JSON.stringify(val));
              } else {
                let key = dependenciesPackage[i].split(" = ")[0];
                let val = dependenciesPackage[i].split(" = ")[1];
                obj.dependencies[key] = [val];
              }
            }

          }
        });

        return obj;
      })
    )
  //             description: JSON.stringify(splitdata[3])
  //             .split("=")
  //             .pop()
  //             .replace(/[^a-zA-Z ]/g, "")
  //             .trim(),




}

