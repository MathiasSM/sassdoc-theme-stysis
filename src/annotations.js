import parseColor from "parse-color";

function getYiq(rgb){
  var yiq = ((rgb[0]*299)+(rgb[1]*587)+(rgb[3]*114))/1000;
  return (yiq >= 128) ? 'dark-text' : 'light-text';
}

const annotations = [];
annotations.push(function color () {
  const re_type = /^\s*(?:{\s*([^}]*)\s*}\s+)?(.*)/;                              // [1]:Type , [2]:...
  const re_name = /^((?:[a-zA-Z0-9]+(?:\s+[a-zA-Z0-9]+)*))(?:\s*:(.*))/;          // [1]:Name , [2]:...
  const re_code = /^((?:[^-\s]|-(?!\d))+(?:\s+[^-\s]+)*)(?:\s*-\s*(.*))?/;        // [1]:Code , [2]:-...
  // const re_codSpecific = /^((?:#(?:(?:[0-9a-fA-F]{2}){2,4}|(?:[0-9a-fA-F]{3}))|(?:rgb|hsl)a?\((?:(?:-?(?:\d+(?:\.\d+)?|.\d+)(?:%|deg|rad|turn)?)(?:(?:\s+)?,(?:\s+)?|\s+))(?:(?:-?(?:\d+(?:\.\d+)?|.\d+)(?:%|deg|rad|turn)?)(?:(?:\s+)?,(?:\s+)?|\s+))(?:(?:-?(?:\d+(?:.\d+)?|.\d+)(?:%|deg|rad|turn)?)(?:(?:(?:\s+)?,\s+?|\s+\/\s+)(?:-?(?:\d+(?:.\d+)?|.\d+)%?))?)?\s*\)))(.*)/ 
  const re_desc = /^\s*-\s*(.*)/;                                                 // [1]:Desc
  return {
    name: "color",
    parse: (comment, parsed, fileName) => {
      let exe;
      exe = re_type.exec(comment); 
      const type = exe[1];

      if(!exe[2]) throw "@color tags must have a name"
      exe = re_name.exec(exe[2]);  
      const name = exe[1];

      if(!exe[2]) throw "@color tags must have a color code (any css valid color)"
      exe = re_code.exec(exe[2]);  
      const code = exe[1];
      let textColor = getYiq(parseColor(code).rgb);

      if(exe[2]) exe = re_desc.exec(exe[2]);  const desc = exe && exe[1];

      const ret = {type: type, name: name, code: code, description: desc, text_color: textColor};
      return ret;
    },
    default: (parsed, a, b) => false,
    autofill: (comment, a, b ) => {
      console.log("AUTOFILL", comment);
      console.log("AUTOFILL 2...", a, b);
    },
    multiple: true,
    alias: ["addcolor"]
  };
});

export default annotations;