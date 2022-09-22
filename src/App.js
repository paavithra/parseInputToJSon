import "./styles.css";

const input = {
  id: 2,
  fullName: "Name",
  extendedProperties: {
    height: 172,
    modded: true
  }
};

/*
  Expected Output:

  {
    "id": 2,
    "fullName": "Name",
    "extendedProperties": {
      "height": 172,
      "modded": true,
    }
  }
*/

export default function App() {
  const input = {
    id: 2,
    fullName: "Name",
    extendedProperties: [
      {
        height: 172,
        modded: true
      },
      {
        height: 172,
        modded: true
      }
    ]
  };

  let space = 2;
  let output = [`<div style="padding-left: 1px;">{</div>`];

  const arrayElem = (val) => {
    recurObj(val, space + 1);
    output.push(`<div style="padding-left: ${space * 10}px;">}</div>`);
  };

  const recurObj = (obj, space) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      let val = obj[key];
      if (typeof val == "object") {
        let temp = `<div style="padding-left: ${
          space * 10
        }px;">"${key}": {</div>`;
        output.push(temp);
        if (Array.isArray(val)) {
          let temp = `<div style="padding-left: ${space * 10}px;">{</div>`;
          output.push(temp);
          val.forEach((item) => arrayElem(item));
        } else {
          arrayElem(val);
        }
      } else {
        let valData = typeof val == "string" ? `"${val}"` : val;
        console.log(space);
        let temp = `<div style="padding-left: ${
          space * 10
        }px;">"${key}": ${valData},</div>`;
        output.push(temp);
      }
    });
  };

  recurObj(input, space);
  output.push(`<div style="padding-left: 1px;">}</div>`);

  return (
    <div className="App">
      {output.map((item) => (
        <div dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </div>
  );
}
