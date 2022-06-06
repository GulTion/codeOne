import { customAlphabet } from "nanoid";
import { store } from "../App";
const nanoid = customAlphabet("1234567890abcdef", 10);
// model.id = nanoid() //=> "4f90d13a42"
export const ad_loBuilder = (f, ad, lo) => {
  //   console.log(f);
  if (f.type === "folder") {
    f.address = ad;
    f.location = lo;
    f.id = nanoid();
    f.files.forEach((e, i) => {
      ad_loBuilder(e, [...ad, e.name], [...lo, i]);
    });
  } else {
    f.id = nanoid();

    f.address = ad;
    f.location = lo;
  }
};

export const Saver = () => {
  //   console.log(file);
  document.setEv((k) => {
    console.log(k);
    if (k.id) {
      let str = "files";

      k?.location.forEach((e, i) => {
        str += `.files[${e}]`;
      });
      console.log(str);
      str += `.content = action.data.content;`;
      const content = k.content;
      // eval(str);
      // t.content = k.content;
      store.dispatch({
        type: "SAVE_FILE",
        data: {
          content,
          location: str,
        },
      });
      return k;
    }
  });
};

// Saver();
